const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require("http");

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV === 'production'){

    //static folder
    app.use(express.static(__dirname + '/public'));

    //handle SPA
    app.get(/.*/, (req,res) =>res.sendFile(__dirname + '/public/index.html'));

}


const port = process.env.PORT || 5000; //general port for receiving OSC data

///////////////////////////////////////
            // webRTC socket.io broadcasting
////////////////////////////////////////
// broadcasting video on port 4000
const server = http.createServer(app);
let broadcaster;
const socketPort = 4000;
const io = require("socket.io")(server);

io.sockets.on("error", e => console.log(e));
io.sockets.on("connection", socket => {
  socket.on("broadcaster", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
  });
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });
});
server.listen(socketPort, () => console.log(`socket.io Server is running on port ${socketPort}`));



///////////////////////////////////////
            // Database
////////////////////////////////////////
const mongodb_URI = 'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI || 'mongodb://localhost/circusfamily',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MonogDB is connected');
});

/// OSC websocket//
//--------------------------------------------------
//  Bi-Directional OSC messaging Websocket <-> UDP
//--------------------------------------------------
var osc = require("osc"),
WebSocket = require("ws");

var getIPAddresses = function () {
    var os = require("os"),
    interfaces = os.networkInterfaces(),
    ipAddresses = [];

    for (var deviceName in interfaces){
        var addresses = interfaces[deviceName];

        for (var i = 0; i < addresses.length; i++) {
            var addressInfo = addresses[i];

            if (addressInfo.family === "IPv4" && !addressInfo.internal) {
                ipAddresses.push(addressInfo.address);
            }
        }
    }

    return ipAddresses;
};

var udp = new osc.UDPPort({
    localAddress: "0.0.0.0", // this is the server side /0.0.0.0.0
    localPort: 5000,
    remoteAddress: "62.238.120.14", // local 127.0.0.1 online Ip where the OSC data should be sended to 
    remotePort: 7500
});

udp.on("ready", function () {
    var ipAddresses = getIPAddresses();
    console.log("Listening for OSC over UDP.");
    ipAddresses.forEach(function (address) {
        console.log(" Host:", address + ", Port:", udp.options.localPort);
    });
    console.log("Broadcasting OSC over UDP to", udp.options.remoteAddress + ", Port:", udp.options.remotePort);
});

udp.open();

var wss = new WebSocket.Server({
    port: 8083
});

wss.on("connection", function (socket) {
    console.log("A Web Socket connection has been established!");
    var socketPort = new osc.WebSocketPort({
        socket: socket
    });

    var relay = new osc.Relay(udp, socketPort, {
        raw: true
    });
});




// end OSC websocket 

app.listen(port,()=>console.log(`Server started on port ${port}`));
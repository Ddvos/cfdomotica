const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//socket.io 
var http = require('http').Server(app);
var io = require('socket.io')(http);


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


const port = process.env.PORT || 5000;

// database
const mongodb_URI = 'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI || 'mongodb://localhost/circusfamily',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MonogDB is connected');
});

// Socket.io stream
io.on('connection', function (socket) {

    socket.on('broadcaster', function () {
       //id of the broadcaster
       broadcaster = socket.id;
       socket.broadcast.emit('broadcaster');
    });
    //Default room
    // Each Socket in Socket.IO is identified by a random, unguessable, unique identifier Socket#id. 
    //For your convenience, each socket automatically joins a room identified by this id.
    broadcaster =0;
    socket.on('watcher', function () {
       //tell to broadcast there is a watcher
       broadcaster && socket.to(broadcaster).emit('watcher', socket.id);
    });
 
    //send sdp to the client
    socket.on('offer', function (id /* of the watcher */, message) {
       socket.to(id).emit('offer', socket.id /* of the broadcaster */, message);
    });
    //send sdp of the client to broad caster
    socket.on('answer', function (id /* of the broadcaster */, message) {
       socket.to(id).emit('answer', socket.id /* of the watcher */, message);
    });
 
    //exchange ice candidate
    socket.on('candidate', function (id, message) {
       socket.to(id).emit('candidate', socket.id, message);
    });
 
    socket.on('disconnect', function () {
       broadcaster && socket.to(broadcaster).emit('bye', socket.id);
    });
 
 });

 http.listen(4000, function () {
    console.log('WebRTC socket.io is listining on port: 4000');
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
    remoteAddress: "94.168.120.14", // local 127.0.0.1 online Ip where the OSC data should be sended to thuis 62.238.120.14 studio 94.168.120.14
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
    port: 8084
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
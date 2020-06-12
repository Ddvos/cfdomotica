const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
//const path = require('path');
const WebSocket = require('ws');
//var FileSaver = require('file-saver');
//let img = '';


const app = express();
//const socketApp = express(); // for socoket.io


// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);

// Handle production
if(process.env.NODE_ENV === 'production'){

    //static folder
    app.use(express.static(__dirname + '/public'));
    //socketApp.use(express.static(__dirname + '/public'))  //socket.io

    //handle SPA
    app.get(/.*/, (req,res) =>res.sendFile(__dirname + '/public/index.html'));
    //socketApp.get(/.*/, (req,res) =>res.sendFile(__dirname + '/public/index.html')); //socket.io

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

//////////////////////////////////
    //timelapse upload esp32-cam
/////////////////////////////////////

const WS_PORT  = 6083;

const wsUploadServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS upload Server is listening at ${WS_PORT}`));

let connectedClients = [];
let urlParameter = '';


var lookup = {};

wsUploadServer.on('connection', (ws, req)=>{

  //console.log(req.url);
  connectedClients.push(ws);

  userID = parseInt(req.url.substring(4), 10); // make from example "/car1" only 1
  ///console.log('userID: ' + userID);
  lookup[userID] = ws;
 
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(lookup))
  

   
  ws.on('message', data => {
      //console.log(req.url);
      if(lookup[userID] == parseInt(req.url.substring(4), 10)){
        connectedClients.forEach((ws,i)=>{
             if(ws.readyState === ws.OPEN){
              lookup[userID].send(data);
             
             
             }else{
                 connectedClients.splice(i ,1);
             }
         })
        }
     });
    
});

//app.get('/client',(req,res)=>res.sendFile(path.resolve(__dirname, './client.html')));
  
//////////////////////////////////////
    // end timelapse upload esp32-cam
//////////////////////////////////////////


////////////////////////////////////
       // begin livestream test
//////////////////////////////////
const debug = require('debug');
const http = require('http');

const info = debug('app:server:info');
const warn = debug('app:server:warn');


const wsport = 4083; // live stream port
const server = http.createServer(app);

const sockets = new Map();
const cameras = new Set();
const screens = new Set();
const setByType = {
  camera: cameras,
  screen: screens,
};

server.listen(
    wsport,
  () => info(`listening on port ${wsport}`)
);

const wsServer = new WebSocket.Server({ server });

wsServer.on('connection', (socket) => {
  let peerId;

  const onMessage = (e) => {
    const msg = JSON.parse(e);

    if (msg.type === 'register') {
      peerId = msg.peerId;
      const { peerType } = msg;

      info(`${peerType} registered, id: ${peerId}`);

      setByType[peerType].add(peerId);
      sockets.set(peerId, socket);

      if (peerType === 'camera') {
        socket.send(JSON.stringify({
          type: 'screens',
          screens: Array.from(screens),
        }));
      }

      if (peerType === 'screen') {
        for (let cameraId of cameras) {
          const cameraSocket = sockets.get(cameraId);
          cameraSocket.send(JSON.stringify({
            type: 'screens',
            screens: [ peerId ],
          }));
        }
      }
    }

    if (msg.type === 'offer') {
      info(`camera ${msg.from} sent offer to screen ${msg.to}`);
      if (!screens.has(msg.to)) {
        warn(`offer sent to screen ${msg.to} that's not registered`);
        return;
      }

      const socket = sockets.get(msg.to);
      socket.send(e);
    }

    if (msg.type === 'answer') {
      info(`screen ${msg.from} sent answer to camera ${msg.to}`);
      if (!cameras.has(msg.to)) {
        warn(`offer sent to camera ${msg.to} that's not registered`);
        return;
      }

      const socket = sockets.get(msg.to);
      socket.send(e);
    }

    if (msg.type === 'candidate') {
      info(`ice candidate from ${msg.from} to ${msg.to}`);
      const socketTo = sockets.get(msg.to);

      if (!socketTo) {
        warn(`candidate sent to ${msg.to}, that's not registered`);
        return;
      }

      socketTo.send(e);
    }
  };


  const onClose = () => {
    info(`socket closed ${peerId}`);

    let sendDisconnectTo;
    if (screens.has(peerId)) {
      sendDisconnectTo = cameras;
    }

    if (cameras.has(peerId)) {
      sendDisconnectTo = screens;
    }

    for (let targetId of sendDisconnectTo) {
      sockets.get(targetId).send(JSON.stringify({
        type: 'disconnect',
        from: peerId
      }));
    }

    socket.off('message', onMessage);
    socket.off('close', onClose);

    cameras.delete(peerId);
    screens.delete(peerId);
    sockets.delete(peerId);
  };

  socket.on('message', onMessage);
  socket.on('close', onClose);
});


////////////////////////////////////
       // einde live stream test
//////////////////////////////////
     
var osc = require("osc");
//WebSocket = require("ws");
 

/// OSC websocket//
//--------------------------------------------------
//  Bi-Directional OSC messaging Websocket <-> UDP
//--------------------------------------------------


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
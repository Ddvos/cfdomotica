const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');
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
const mongodb_URI = 'mongodb+srv://Circus_Family:mYIz6bPl1ZRfhbtF@circusfamily.vehzf.mongodb.net/circusfamily?retryWrites=true&w=majority' //'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI || 'mongodb://localhost/circusfamily',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MonogDB is connected');
});

// convert incoming data to json
app.use(express.json());
app.use(express.urlencoded());

//////////////////////////////////
    //timelapse upload esp32-cam
/////////////////////////////////////

// const WS_PORT  = 6083;

// const wsUploadServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log(`WS upload Server is listening at ${WS_PORT}`));

// let connectedClientss = [];


// wsUploadServer.on('connection', (ws, req)=>{

//   //console.log(req.url);
//   //var webURL =req.url
//   connectedClientss.push( ws);


  
// //console.log(connectedClients);

// // connectedClients.forEach((obj,) => {

// //   console.log(obj.webURL);
// //  });
   
//   ws.on('message', data => {
//      //var cameraURL =req.url


//      connectedClientss.forEach((ws,i)=>{
//       if(ws.readyState === ws.OPEN){
//           ws.send(data);
//       }else{
//           connectedClientss.splice(i ,1);
//       }
//      })


   
//         // connectedClients.forEach((obj,i)=>{
//         //      if(obj.ws.readyState === obj.ws.OPEN){ //controleerd of er een verbinding is
//         //       if(obj.webURL == cameraURL){ // kijkt of de webURL uit de array overeen komt met de inkomende url data (camera beeld url)
//         //           obj.ws.send(data); // send img to 

//         //           //console.log(obj.webURL+"is gelijk aan inkomnde video: "+ cameraURL);
//         //       }
             
//         //      }else{
//         //          connectedClients.splice(i ,1);
//         //      }
//         //  })
        
//      });
    
// });

//app.get('/client',(req,res)=>res.sendFile(path.resolve(__dirname, './client.html')));
  
//////////////////////////////////////
    // end timelapse upload esp32-cam
//////////////////////////////////////////



////////////////////////////////////
       // begin livestream test
//////////////////////////////////
const debug = require('debug');

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

let connectedClients = [];
wsServer.on('connection', (socket,req) => {
  let peerId;

  var webURL =req.url
  
  //connectedClients.push({ socket,webURL});


  const onMessage = (e) => {
    connectedClients.push(e);
   
      //var cameraURL =req.url
         // console.log(cameraURL);
      //  connectedClients.forEach((obj,i)=>{
      //          if(obj.socket.readyState === obj.socket.OPEN){ //controleerd of er een verbinding is
      //           if(obj.webURL == cameraURL){ // kijkt of de webURL uit de array overeen komt met de inkomende url data (camera beeld url)
                    //obj.socket.send(e); // send img to 

                   // console.log(obj.webURL+"is gelijk aan inkomnde video: "+ cameraURL);
         

         // code hierboven toegevoegd
    const msg = JSON.parse(e);
    console.log("client is connected to server: "+ msg.from)

    if (msg.type === 'register') {
      peerId = msg.peerId;
      const { peerType } = msg;

      info(`${peerType} registered, id: ${peerId}`);

      setByType[peerType].add(peerId);
      sockets.set(peerId, socket);

     // console.log( sockets);

      if (peerType === 'camera') {
        socket.send(JSON.stringify({
          type: 'screens',
          screens: Array.from(screens), // send evry body who is watching to the tream
        }));
      }

      if (peerType === 'screen') {
        console.log("peertype is screen")
        for (let cameraId of cameras) {
          const cameraSocket = sockets.get(cameraId);
          if (cameraId == peerId.slice(0, 4)){ // als de camera id en  car id het zelfde zijn stuur dan de screenId (broadcast car)
            console.log("camera id is het zelfde als van de livestream")
            cameraSocket.send(JSON.stringify({
              type: 'screens',
              screens: [ peerId ],
            }));
          }
           else{
            console.log("camera ID "+cameraId +"is niet het zelfde als " + peerId.slice(0, 4));
            }
        
        }
      }
    }

    if (msg.type === 'offer') {
      var selectedCar = msg.to
      if(msg.from == selectedCar.slice(0, 4) ){ /// vergelijkt het camera beeld met de geselcteerde auto
         console.log("camera en beeld zijn het zelfde");
        info(`camera ${msg.from} sent offer to screen ${msg.to}`);
        if (!screens.has(msg.to)) {
          warn(`offer sent to screen ${msg.to} that's not registered`);
          return;
        }

        var selectedCar = msg.to

        console.log(`camera ${msg.from} sent offer to screen ${selectedCar.slice(0, 4)}`);
        const socket = sockets.get(msg.to);
        socket.send(e);
      }
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
      console.log("ice candidate is connected")
      const socketTo = sockets.get(msg.to);

      if (!socketTo) {
        warn(`candidate sent to ${msg.to}, that's not registered`);
        return;
      }

      socketTo.send(e);
    }

  // }
             
  //   }else{
  //     console.log(obj.webURL+"is niet gelijk aan: "+ cameraURL);
  //       connectedClients.splice(i ,1);
  //   }
  //   })
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
     remoteAddress: "217.100.186.202", // local 127.0.0.1 online Ip where the OSC data should be sended to thuis 62.238.120.14 studio 94.168.120.14 raum 217.100.186.202
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

     //console.log(socketPort)

     var relay = new osc.Relay(udp, socketPort, {
         raw: true
     });

    socket.on("close", function () {
      console.log(">>WebSocket is closed now1.<<");
      relay.close();
      socket.close();
     
    });

    socket.on("error", function() {
      console.log(">>WebSocket connection error");
      //socket.emit("my error", "Something bad happened!");
  });

    
});

wss.on("close", function () {
  console.log(">>WebSocket is closed now2.<<");
  relay.close();
  wss.close();

});



wss.onclose = function() {
  relay.close();
  wss.close();
  console.log("WebSocket is closed now3.");
};

wss.onerror = function(event) {
  console.error("WebSocket error observed:", event);
};

wss.on("error", function() {
  console.log(">>WebSocket connection error");
  //socket.emit("my error", "Something bad happened!");
});

// will handell warnings
process.on('warning', e => console.warn(e.stack))

// will handell errors
process.on('uncaughtException', function(err) { 
  
  // Handle the error safely 
  console.log('Caught exception:'+err) 
}) 

/// conncection to own server
var porttoserver = new osc.WebSocketPort({
  url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
}); 

porttoserver.open();

///////////////////////////////////////
  // registratie bezoekers Raum
//////////////////////////////
const userCountserver = http.createServer(app);
const io = require("socket.io")(userCountserver); 

const raumRooms = ["clientRoom"]

io.of("/raum").on("connection",(socket)=>{

 //var room = io.sockets.adapter.rooms[''];
  socket.emit("welcome", "Hello and welcome to the RAUM Area");

  socket.on("joinRaum",(room)=>{
    if(raumRooms.includes(room)){
       socket.join(room);
       io.of("/raum").to(room).emit("newUser", "new visistor has joined the room " + room)  //melding nieuwe deelnemer

       io.of('/raum').in(room).clients((error, clients) => { // get all the clients which are connected with the room: clientRoom
         if (error) throw error;
         io.of("/raum").to(room).emit("clientList", clients)  // sends/emits a array with all the clients
        // console.log(clients); // => [Anw2LatarvGVVXEIAAAD]
       });
     
       /// enf of code get all users in room

       return socket.emit("succes","You have succesfully joined the room " + room);
    }else{
      return socket.emit("err","Error: No room named " + room);
    }
 });

  //socket.disconnect();
   socket.on('disconnect', () => {
     io.of('/raum').in("clientRoom").clients((error, clients) => { // get all the clients which are connected with the room: clientRoom
       if (error) throw error;
       io.of("/raum").to("clientRoom").emit("clientList", clients)  // sends/emits a array with all the clients
       console.log(clients); // => [Anw2LatarvGVVXEIAAAD]

         // maakt verbinidng met deze server en stuurt via OSC de huidige lijst met klanten naar de studio in amsterdam
      porttoserver.send({
        address: "/clientsID",
        args:  clients
      });
      //console.log('user disconnected');
     });

    
 });
});  





userCountserver.listen(6583,() => console.log('vister counter RAUM is listening on port: 6500'))

/// einde registratie bezoekers



// end OSC websocket 
app.listen(port,()=>console.log(`Server started on port ${port}`));
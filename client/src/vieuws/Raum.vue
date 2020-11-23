<template>
<div class="background"  ref="mouseEvent"> <!-- v-hammer:pan="onPan"  v-on:mousemove="onMouseMovePc"  -->


          <div class="cursor" >  <!--if cursor is not in webGL element mouse vissible-->
      <div ref="ballBig" class="cursor__ball cursor__ball--big ">

          <svg   height="30" width="30" display= "none" >     <!--display= "none" -->
              <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
          </svg>

      </div>

      <div ref="ballSmall" class="cursor__ball cursor__ball--small">
         <transition name="fade" v-on:enter="enter">
          <svg  v-if="show" height="10" width="10"  v-bind:style="{ 'display': this.visibility}" >
            <circle cx="5" cy="5" r="3" stroke-width="0"></circle>
          </svg>
         </transition>
      </div>
    </div>

     <transition name="splashfade" v-on:click="enter">
         <Raumstart class="splashscreen" @start="mainstart" @mobileoverlayhide="infobutton" v-if="splashscreen" v-bind:raumid="raumid"> </Raumstart>
   </transition>
    <div class="row" v-if="desktop" >
          
          <Vragen class="vragen" @closeForm="sluitFormulier" v-if="vragen"> </Vragen>
          <!-- WebGL -->
          <div class="col-8"  ref="webGLSpeelveld" v-if="mainpage">
            <div  id="speelveld">
                  <WebGLRaum  v-bind:bigBallPosition="ballposition" v-bind:smallBallPosition="smalBallposition" v-bind:raumid="raumid"></WebGLRaum>
              </div>

          </div>
            <!-- video livestream -->
          <div class="col-4" id="stream" v-if="mainpage">

       
              <div class="overlay" v-on:click="infobutton">
                <div class="tekst">
                     <!-- <p> Totaal online bezoekers: {{totalClients}}</p> -->
                     <br>
                  <h1 id="info-title"> HARMONIE</h1>
                  <p>Living apart together installation</p>

                  <p class="info-tekst">
                     Het stimuleren van sociale interacties en het maken van meer intieme plekken kan een bijdrage leveren aan een minder eenzame stad.
                     Design in de publieke ruimte prikkelt de verbeelding en nodigt op subtiele manieren uit tot ontmoeting en verbinding.Het zorgt ervoor dat je even vertraagt.
                     <br> <br>
                     Harmonie is een uitnodiging om een onbekende ruimte te ontdekken en open te staan voor een gedeelde ervaring en verbondenheid. Circus Family vroeg zich af: 
                     kan deze installatie bijdragen aan interactie tussen mensen en zo een gevoel van sociale eenzaamheid verminderen? 
                     <br> <br>
                     De interactieve installatie bestaat uit zestien pilaren waarin licht en geluid elkaar ontmoeten. De pilaren staan op precies anderhalve meter afstand van elkaar.
                     Het maakt niet uit van welke kant je komt aanlopen: sensoren registreren je beweging waardoor de kleuren en geluiden in de zuilen op je reageren. 
                     Zodra de sensoren je ‘zien’, begint er als het ware een orkest te spelen. Des te meer mensen zich rondom en tussen de pilaren bewegen, des te grootser
                     de symfonie wordt. Ga een dialoog aan met Harmonie - alleen of door anderen te verzamelen - en ervaar het effect!
                     <br> <br>
                     Mogen we je een aantal vragen stellen voor het onderzoek dat gekoppeld is aan “Harmonie”?
                </p>
                <button @click="vragen = true">Ja</button>
                <div class="logos">
                  <img src="../assets/raum/RAUM.svg" alt="logo Raum" height="67" width="80" />
                  <img src="../assets/raum/CIRCUS_FAMILY.svg" alt="logo Raum" height="67" width="80" />
               </div>
                </div>


                  <div class="info-button"></div>


              </div>
              <video id='v'></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->

          </div>

   </div>
  <div v-if="mobile" >
    <div class="overlay" v-on:click="infobutton" >
               <div class="tekst">
                  <!-- <p> Totaal online bezoekers: {{totalClients}}</p> -->
                  <h1 id="info-title"> HARMONIE</h1>
                  <p>Living apart together installation</p>

                  <p class="info-tekst">
                       Het stimuleren van sociale interacties en het maken van meer intieme plekken kan een bijdrage leveren aan een minder eenzame stad.
                     Design in de publieke ruimte prikkelt de verbeelding en nodigt op subtiele manieren uit tot ontmoeting en verbinding.Het zorgt ervoor dat je even vertraagt.
                     <br> <br>
                     Harmonie is een uitnodiging om een onbekende ruimte te ontdekken en open te staan voor een gedeelde ervaring en verbondenheid. Circus Family vroeg zich af: 
                     kan deze installatie bijdragen aan interactie tussen mensen en zo een gevoel van sociale eenzaamheid verminderen? 
                     <br> <br>
                     De interactieve installatie bestaat uit zestien pilaren waarin licht en geluid elkaar ontmoeten. De pilaren staan op precies anderhalve meter afstand van elkaar.
                     Het maakt niet uit van welke kant je komt aanlopen: sensoren registreren je beweging waardoor de kleuren en geluiden in de zuilen op je reageren. 
                     Zodra de sensoren je ‘zien’, begint er als het ware een orkest te spelen. Des te meer mensen zich rondom en tussen de pilaren bewegen, des te grootser
                     de symfonie wordt. Ga een dialoog aan met Harmonie - alleen of door anderen te verzamelen - en ervaar het effect!
                     <br> <br>
                </p>
                </div>

                   <div class="logos">
                      <img src="../assets/raum/RAUM.svg" alt="logo Raum" height="67" width="80" />
                      <img src="../assets/raum/CIRCUS_FAMILY.svg" alt="logo Raum" height="67" width="80" />
                   </div>
                
                <div class="info-button"></div>
          </div>

      <!-- video livestream -->
        <div class="row" id="video" >
             <video playsinline webkit-playsinline id='v'></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
            <!-- <div v-on:click="playvideo"> {{this.videocheck}}</div> -->
        </div>
      <!-- WebGL -->
        <div class="row">
          <div ref="webGLSpeelveld" id="speelveld">
               <WebGLRaum  v-bind:bigBallPosition="ballposition" v-bind:smallBallPosition="smalBallposition" v-bind:raumid="raumid"></WebGLRaum>
          </div>
        </div>

   </div>


</div>

</template>
<script>
 import { TweenMax} from 'gsap'
// import raumSVGgrid from '../assets/raum/raumSVGgrid';
// import pilaar from '../assets/raum/pilaar';
 import WebGLRaum from '../assets/raum/WebGLRaum';
 import Raumstart from '../assets/raum/Raumstart'
 import Vragen from '../assets/raum/Vragen'
 import osc from "osc";
import io from "socket.io-client";
//const $hoverables = document.querySelectorAll('.hoverable');
 // for sending osc
 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        });

 port.open();

//connect to server
let raum = io.connect("https://circusfamilyprojects.nl:6500/raum") // poort to connect with
//let allUsers = socket.adapter.rooms;


export default {

  data() {
  return{
    bigBall: null,
    smallBall: null,
    clientcolor: '#f2ff00',
    ballposition:{x: 0, y:0},
    smalBallposition: {x: 0, y:0},
    ballpositionmobile:null,
    mouseX: null,
    mouseY: null,
    mousecolor:[],
   visibility: 'block',
   show: true,
   splash: false,
   mainpage: true,
   desktop: true,
   mobile: false,
   windowWidth: 0,
   totalClients: null,
   raumid: "3423",
   splashscreen: true,
   videocheck: "uit",
   muisxtransition: 0,
   vragen: false,

  }
  },
  components: {
  // 'raumSVGgrid': raumSVGgrid,
  //'pilaar': pilaar,
  'WebGLRaum': WebGLRaum,
  'Raumstart': Raumstart,
  'Vragen': Vragen,

  },
  created() {
     this.siteVisitor();
     //this.videoStream()



    },
    beforeDestroy() {
      document.addEventListener('mousemove',this.mousePCinput);
      document.addEventListener('touchmove',this.mouseMobile);
  },
    mounted(){
      this.$refs.mouseEvent.addEventListener('mousemove', (event)=>{this.mousePC(event)});
      this.$refs.mouseEvent.addEventListener('touchmove',(event) =>{
          event.preventDefault();
          event.stopImmediatePropagation();
          this.mouseMobile(event)
        },{ passive: false });

      this.bigBall = document.querySelector('.cursor__ball--big');
      this.smallBall = document.querySelector('.cursor__ball--small');


      //window.addEventListener('touchmove',this.mouseMobile);


        this.windowWidth = window.innerWidth;
      if (this.windowWidth < 700){
        //console.log("device is mobile")
        this.mobile = true
        this.desktop = false
      } else{
        // console.log("device is desktop")

        this.mobile = false
        this.desktop = true
      }



      //console.log(this.windowWidth)
    },

  methods:{
    siteVisitor: function(){

       raum.on("welcome",(data)=>{
         this.siteVisitors(data);
        })

         raum.on("clientList",(clients)=>{
         this.someAllClients(clients);
        })

        raum.emit("joinRaum", "clientRoom");

        raum.on("newUser",(res) =>{
          console.log(res)
          this.newUser = true;

          setTimeout(() => this.newUser= false, 3000);
        })

       ///raum.on("err",(err)=> console.log(err))
       //raum.on("succes",(res)=> console.log(res))
     },

       siteVisitors: function(data) {

      console.log(data);

       this.raumid = raum.id;
      console.log(this.raumid)
           port.send({
            address: "/newID",
            args:  this.raumid
        });

     },
     someAllClients: function(clients){
       this.totalClients = clients.length
       this.clientsIDArray =clients
      // console.log(this.clientsIDArray)

          port.send({
           address: "/clientsID",
            args:  this.clientsIDArray
         });


     },
     mainstart: function(){
      // console.log("spalshscreen uit")
       this.videoStream()
      //window.v.play();
             this.infobutton();
           this.splashscreen = false
          setTimeout(function() {

        }, 100); // hide the message after 0.5 seconds
     },

    mousePC: function(event){

        this.mouseX = event.x;
        this.mouseY = event.y;

         //console.log(this.mouseX)
         TweenMax.to(this.bigBall, 0.1,{
           x: event.x -10,
           y: event.y - 10
           })
           TweenMax.to(this.smallBall, .001, {
             x: event.x -0,
            y: event.y - 0
          })

          this.ballXYposition()
    },
      mouseMobile: function()  {

        let touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;

         TweenMax.to(this.bigBall, 0.1,{
          x: touch.clientX + 0,
          y: touch.clientY + 0
          })
          TweenMax.to(this.smallBall, .1, {
            x: touch.clientX ,
           y: touch.clientY
         })

        this.ballXYposition()
      },
      ballXYposition: function(){

          // hiermee zet hij de XY waardes van de muis in het speelveld
        if (this.splashscreen ==false){
        this.ballposition = {x: this.$refs.ballBig.getBoundingClientRect().x, y: this.$refs.ballBig.getBoundingClientRect().y}// [this.$refs.ballBig.getBoundingClientRect().x,this.$refs.ballBig.getBoundingClientRect().y]//positie bigball
        this.smalBallposition ={x:this.$refs.ballSmall.getBoundingClientRect().x,y:this.$refs.ballSmall.getBoundingClientRect().y}
      

       this.muisxtransition= this.$refs.ballSmall.getBoundingClientRect() // dit is de X en y posistie voor het uitfaden in het speeldveld

        const rect2 = this.$refs.webGLSpeelveld.getBoundingClientRect()  //positie webgl speelveld
        //console.log( this.ballposition)
        const isInHoriztonalBounds = this.muisxtransition.x < rect2.x + rect2.width &&  this.muisxtransition.x -  this.muisxtransition.width > rect2.x;
        const isInVerticalBounds = this.muisxtransition.y < rect2.y + rect2.height && this.muisxtransition.y - this.muisxtransition.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;

        if(isOverlapping== true && this.splashscreen==false){ // muis gaat uit
        this.show = false
        console.log("muis uit")
              this.visibility = 'none'
        }else if(isOverlapping== false){ // muis gaat aan
           this.show = true
           this.visibility = 'block'
        }
        }

      },
      enter: function() {
       // console.log("fade")

       if(this.splashscreen==false){
          setTimeout(function() {
            this.show = false;
          }, 500); // hide the message after 3 seconds
       }
    },

    infobutton: function(){
      console.log("knop is gedrukt")
      //hiermee wordt de animatie voor de overlay gestart
      var  abox = document.getElementsByClassName("overlay")[0];
       abox.classList.toggle("overlayhide");

       // hiermee wordt de animatie van de cursor gestart en gaat de knop naat links
         var  knop = document.getElementsByClassName("info-button")[0];
       knop.classList.toggle("info-button-hide");
     },
     sluitFormulier: function(){
       console.log("sluit formulier parent")
        this.vragen = false; // sluit het formulier
     },
       /// begin live videostream
       async videoStream(){

              /// websocket WebRTC for live stream


      const config = {
        iceServers: [{
           urls: 'turn:turn.circusfamilyprojects.nl:3478', //'stun:stun.l.google.com:19302'  turn:178.62.209.37:3478
          username: 'Dominique',
           credential: 'WS7Yq_jT'
         
        }]
      };

      const getRandomId = () => {
        return Math.floor(Math.random() * 10000);
      };

      const peerId = 'raum'+getRandomId();
      const peerType = 'screen';
      const connections = new Map();

      //console.log("peerId is: " +peerId)

      let ws;
      const getSocket = async (peerId, peerType) => {
        if (ws) return ws;

        return new Promise((resolve, reject) => {
          try {


            ws = new WebSocket('wss://circusfamilyprojects.nl:4084/raum');  // ws://localhost:4083 online server wss://circusfamilyprojects.nl:4084

          //console.log(">>nieuwe verbinding wordt opgezet<<")

           const onOpen = () => {

              ws.send(JSON.stringify({
                type: 'register',
                peerType,
                peerId,
              }));

              ws.removeEventListener('open', onOpen);
               //console.log("open");
              resolve(ws);
            };

            ws.addEventListener('open', onOpen);
          } catch (e) {
            reject(e);
          }
        });
      };

      try {
      console.log('in screen');
        const socket = await getSocket(peerId, peerType);

        socket.addEventListener('message', async (e) => {
          try {
            const msg = JSON.parse(e.data);
              //console.log("camera and selected car are the same "+ msg.from)
                this.Camconnected = true;
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);
             // console.log( peerConnection)
              peerConnection.ontrack = (e) => {
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                window.v.muted = true;
                window.v.play();
               //this.videocheck = "camera is aan" + e.streams[0].active
               // window.wait.classList.add('hidden');
                //window.controls.classList.remove('hidden');
              };

              peerConnection.onicecandidate = (e) => {
                if (e.candidate) {
                  socket.send(JSON.stringify({
                    type: 'candidate',
                    from: peerId,
                    to: msg.from,
                    data: e.candidate,
                  }));
                }
              };

              await peerConnection.setRemoteDescription(msg.data);
              const sdp = await peerConnection.createAnswer();
              await peerConnection.setLocalDescription(sdp);

             // console.log('sending answer');
              socket.send(JSON.stringify({
                to: msg.from,
                from: peerId,
                type: 'answer',
                data: peerConnection.localDescription
              }));
            }

            if (msg.type === 'disconnect') {
              const connection = connections.get(msg.from);
              if (connection) {
                //console.log('Disconnecting from', msg.from);
                connection.ontrack = null;
                connection.onicecandidate = null;
                connection.close();
                connections.delete(msg.from);
              }
            }

            if (msg.type === 'candidate') {
              const connection = connections.get(msg.from);
              if (connection) {
               // console.log('Adding candidate to', msg);
                connection.addIceCandidate(new RTCIceCandidate(
                  msg.data
                ));

                  this.videocheck = "candidate added to RTCIce" + msg.data
              }
            }

          } catch (e) {
            console.error(e);
                 console.log("error niewe verbiding openen lukt niet")
                  this.videocheck= "error verbinding "+e
          }
        });

       } catch (e) {
          console.error(e);
          console.log("error niewe verbiding openen lukt niet")
              this.videocheck= "error verbinding " +e
          }
      }, // einde live videostream





    }
}
</script>

<style lang="scss" scoped>

.background {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #1e3a42;
  color: white;
  cursor: none;

  .cursor {
    pointer-events: none;

    &__ball {
      position: fixed;
      top: 0;
      left: 0;
     // mix-blend-mode: difference;
      z-index: 1000;


      circle {
        fill: #ffffff;
      }
    }
  }
  .splashscreen{
     z-index:5;
  }

  .vragen{
     z-index:4;
     position:absolute;
     display: 1;
     width: 80vw;
     height: 80vh;
     margin-left:10vw;
     margin-top:10vh;
    background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
    backdrop-filter: blur(3px);

  }

  #info{
    position: relative;
  }
  #title{
    color: white;
  }
  #speelveld{
     width: 100%;
  height: 100vh;
  background: #474141;
  color: white;

  }

  .row,.col-8,.col-4{
    margin: 0;
    padding:0;
  }

  #stream{
      position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  }

  .tekst{
    flex: 10% 0 90%;
      text-align: left;
        margin-top: 5%;
    margin-left: 9%;
     margin-right: 9%;
  }
  #info-title{
    font-size:350%;
     margin-bottom: -2%;
    font-family: 'Prompt', sans-serif;
    font-weight: bold;
   font-style: italic;

  }

  .info-tekst{
       padding-top: 5%;
     font-size: 75%;
      font-family: 'Roboto', sans-serif;


  }

  .logos{
   margin-left: 31%;
     margin-top: 37vh;
  }



  .overlay{
      display: flex;
      position: absolute;
     background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
     width: 100%;
    height: 100%;
    animation: myfirst 3s 1;
    animation-direction: alternate;
     clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
    z-index:3;
  }

  @keyframes myfirst { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {right: 100%;
       clip-path: polygon(0 0, 95% 0, 95% 40%, 100% 50%, 95% 60%, 95% 100%, 0 100%)}
      to{right:0%;
         clip-path: polygon(0 0, 100% 0, 100% 40%, 100% 50%, 100% 60%, 100% 100%, 0 100%);
      }

}

   .info-button{
     position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: 100vh;
  animation: button 3s 1;
    animation-direction: alternate;
    clip-path: polygon(98% 47.5%, 96.5% 50%, 98% 52.5%, 97.5% 52.5%, 96% 50%, 97.5% 47.5%);
 background-color:  rgb(255, 255, 255);
  }

    @keyframes button { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {
       clip-path: polygon(96.5% 47.5%, 98% 50%, 96.5% 52.5%, 96% 52.5%, 97.5% 50%, 96% 47.5%)}
      to{
       clip-path: polygon(98% 47.5%, 96.5% 50%, 98% 52.5%, 97.5% 52.5%, 96% 50%, 97.5% 47.5%);
      }
   }

    .info-button-hide{
     position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: 100vh;
  animation: buttonhide 3s 1;
    animation-direction: alternate;
    clip-path: polygon(96.5% 47.5%, 98% 50%, 96.5% 52.5%, 96% 52.5%, 97.5% 50%, 96% 47.5%);
 background-color:  rgb(255, 255, 255);
  }

     @keyframes buttonhide { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {
       clip-path: polygon(98% 47.5%, 96.5% 50%, 98% 52.5%, 97.5% 52.5%, 96% 50%, 97.5% 47.5%)}
      to{
       clip-path: polygon(96.5% 47.5%, 98% 50%, 96.5% 52.5%, 96% 52.5%, 97.5% 50%, 96% 47.5%);
      }
   }



  .overlayhide{
       position:absolute;
       background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
       width: 100%;
       height: 100%;
       animation: overlayhide 3s ;
       animation-fill-mode: forwards;
       animation-direction: alternate;
  }

@keyframes overlayhide { //hiermee gaat de overlay van rechts naar links en vervormt hij
      from {right: 0%;
       clip-path: polygon(0 0, 100% 0, 100% 40%, 100% 50%, 100% 60%, 100% 100%, 0 100%);
      }
      to{right:95%;
      clip-path: polygon(0 0, 95% 0, 95% 40%, 100% 50%, 95% 60%, 95% 100%, 0 100%)}
}


  video{
  position: absolute;
     width: auto;
     margin-left: 50%;
     transform: translateX(-50%);
     height: 100vh;
    background-color: rgb(0, 0, 0);
    z-index:1;

}

/////////////////////////////////////////////////////////
 // code bellow is for mobile
/////////////////////////////////////////////////////////

@media screen and (max-width: 700px) {

 .row,.col-8{
    margin: 0;
    padding:0;
  }
  #speelveld{
     width: 100%;
    height: 59vh;
    background: #0d0d0d;
    color: white;
      z-index:3;
  }

  .tekst{
    flex: 0% 0 100vh;
  }

  .logos{
     position: absolute;
    margin-left: 25%;
   margin-top: 65vh;
  
     
  }



   .overlay{
       z-index:4;
      display: flex;
      position:absolute;
     //background: rgb(35,100,233);
     background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
     width: 100%;

     height: -webkit-fill-available;
    animation: myfirst 3s 1;
    animation-direction: alternate;
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%);
   
  }


@keyframes myfirst {
      from {bottom: 95%;
      clip-path: polygon(0% 0%,   100% 0%,   100% 95%,   65% 95%,   50% 100%,   35% 95%,   0 95%);}
      to{bottom:0%;
       clip-path: polygon(0% 0%,   100% 0%,   100% 100%,   60% 100%,   50% 100%,   40% 100%,   0 100%);;
      }
}

   .info-button{
  z-index:4;
    position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: -webkit-fill-available;

  animation: button 3s 1;
    animation-direction: alternate;
    //clip-path: polygon(98% 47.5%,    96.5% 50%,    98% 52.5%,   97.5% 52.5%,   96% 50%,   97.5% 47.5%);
    clip-path: polygon(53% 95.5%,    53% 96%,    50% 94.5%,   47% 96%,   47% 95.5%,   50% 94%);
 background-color:  rgb(255, 255, 255);
  }

    @keyframes button { //hiermee gaat de overlay van links naar rechts en vervormt hij
      from {
       clip-path: polygon(53% 96%,    53% 96.5%,    50% 98%,   47% 96.5%,   47% 96%,   50% 97.5%)}
      to{
       clip-path: polygon(53% 95.5%,    53% 96%,    50% 94.5%,   47% 96%,   47% 95.5%,   50% 94%);
      }
   }

     .info-button-hide{
         z-index:4;
     position:absolute;
     display: 1;
     margin-left: 0%;
     width: 100%;
	height: -webkit-fill-available;
  animation: buttonhide 2s 1;
    animation-direction: alternate;
    clip-path: polygon(53% 96%,    53% 96.5%,    50% 98%,   47% 96.5%,   47% 96%,   50% 97.5%);
 background-color:  rgb(255, 255, 255);
  }

     @keyframes buttonhide { //hiermee gaat de overlay van onder naar boven
      from {
       clip-path: polygon(53% 97.5%,    53% 98%,    50% 96.5%,   47% 98%,   47% 97.5%,   50% 96%)}
      to{
       clip-path: polygon(53% 96%,    53% 96.5%,    50% 98%,   47% 96.5%,   47% 96%,   50% 97.5%);
      }
   }


  .overlayhide{
      z-index:4;
       position:absolute;
       background: linear-gradient(0deg, rgba(35,100,233,0.7) 0%, rgba(202,26,47,0.7) 100%);
       width: 100%;
       height: -webkit-fill-available;
       animation: overlayhide 3s ;
       animation-fill-mode: forwards;
       animation-direction: alternate;
  }

@keyframes overlayhide {
      from {bottom: 0%;
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 60% 100%, 50% 100%, 40% 100%, 0 100%);}
      to{bottom:95%;
      clip-path: polygon(0% 0%, 100% 0%, 100% 95%, 65% 95%, 50% 100%, 35% 95%, 0 95%);
      }
}



  video {
        z-index:2;
      position: static;
        object-fit: cover;
        margin-left: 0px;
        padding: 0px;
       width: 100vw;
      //   padding-top: 50px;
      //  padding-bottom: 50px;
       height: 30vh;
       background-color: #0d0d0d; //#0d0d0d;

        -moz-transform:scale(2);
        -webkit-transform:scale(2);
        -o-transform:scale(2);
        -ms-transform:scale(2);
        transform:scale(2);
  }
}

}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}

.splashfade-enter-active,
.splashfade-leave-active {
  transition: opacity 2s
}

.splashfade-enter,
.splashfade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}


</style>

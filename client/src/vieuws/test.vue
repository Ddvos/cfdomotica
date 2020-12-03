<template>
    <!-- test -->
  <div class="background"  ref="mouseEvent">

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
    <div class="row" v-if="desktop" >
          <div class="vragenBackground" v-if="vragen">
  
          </div>
          <!-- WebGL -->
          <div class="col-8"  ref="webGLSpeelveld" v-if="mainpage">
            <div  id="speelveld">
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
                <div class="buttonvragen" @click="vragen = true" >Deelnemen</div>
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
    
      <div class="vragenBackground">
      <div class="d3">
        <div class="d3-1">
          HEADER
        </div>
        <div class="d3-2">
          <div class="d4">
            <div class="d5">test</div>
          </div>
        </div>
      </div>
      </div>
  </div>

<!-- einde -->
  
</template>

            
<script>
 import { TweenMax} from 'gsap'
// import raumSVGgrid from '../assets/raum/raumSVGgrid';
// import pilaar from '../assets/raum/pilaar';


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

       raum.on("welcome",()=>{  //data kan worden toegevoegd als parameter
       
        console.log("dit is mijn id: " +this.raumid)
         this.siteVisitors();
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

       siteVisitors: function() {
        this.raumid = raum.id;
     // console.log(data);   
      //console.log(this.raumid)
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

        if(isOverlapping== true && this.splashscreen==false && this.vragen == false){ // muis gaat uit
        this.show = false
       // console.log("muis uit")
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
      //console.log("knop is gedrukt")
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
            console.log("error "+e)
          }
        });
      };

      try {
      console.log('in screen');
        const socket = await getSocket(peerId, peerType);

        socket.addEventListener('message', async (e) => {
          try {
            const msg = JSON.parse(e.data);
              console.log("camera and selected car are the same "+ msg.from)
                //this.Camconnected = true;
            if (msg.type === 'offer') {
              const peerConnection = new RTCPeerConnection(config);
              connections.set(msg.from, peerConnection);
             // console.log( peerConnection)
              peerConnection.ontrack = (e) => {
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                window.v.muted = false;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

 input{
      margin-left:10%;
      width: 70%;
        z-index: 1; 
    }

.wrapper{
  padding-top: 20px;
}

.btn-primary{
    margin-top: 20px;
}

.color {
  margin: auto;
  width: 50%;
  width: 80px;
  background-color: rgba(71, 255, 178, 0.699);
  height: 80px;
  
}

@media screen and (max-width: 700px) {
.background {
  overflow: scroll;
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
      z-index: 5;


      circle {
        fill: #ffffff;
      }
    }
  }
}
 .vragenBackground{
     z-index:5;
     position:absolute;
     background: rgba(0,0,0,0.5);
     display: 1;
     width: 100vw;
     height: 100vh;
     backdrop-filter: blur(2px);
  }


.d3 {
   height:200px; 
   position: relative;
    border:2px solid red;
}
.d3-1 {
   height:50px;
}
.d3-2{
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 50px;
    width: 100%;
    position: absolute;
    top: 0;
}
.d4
{
  position: relative;
  height:100%; ;
  overflow: auto;
}
.d5 {
    height:3000px
}

.d3-1{
    border:2px solid yellow;
}
}




</style>
<template>
<div class="background"  ref="mouseEvent"> <!-- v-hammer:pan="onPan"  v-on:mousemove="onMouseMovePc"  -->


 

    <div class="cursor" >  <!--if cursor is not in webGL element mouse vissible-->
      <div ref="ballBig" class="cursor__ball cursor__ball--big ">
         <transition name="fade" v-on:enter="enter">
          <svg  v-if="show"  height="30" width="30" >     <!--display= "none" -->
              <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
          </svg>
       </transition>
      </div>
      
      <div ref="ballSmall" class="cursor__ball cursor__ball--small">
        <svg height="10" width="10"  v-bind:style="{ 'display': this.visibility}" >  
          <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
        </svg>
      </div>
    </div>

 
    <div class="row" v-if="desktop" >   
        <!-- WebGL -->
        <div class="col-8">
           <div ref="webGLSpeelveld"  id="speelveld"> 
                <WebGLRaum  v-bind:bigBallPosition="ballposition" v-bind:smallBallPosition="smalBallposition"></WebGLRaum> 
            </div>

        </div>
          <!-- video livestream -->
        <div class="col-4" id="video" >
          <div class="livefeed">            
             <video mute='muted'  autoplay="true" playsinline id='v'></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
          </div>
        </div>  
   </div>
    <div v-if="mobile" > 

      <!-- video livestream -->
        <div class="row" id="video" >
                  
             <video mute='muted'  autoplay="true" playsinline id='v'></video> <!--  //v-bind:style="{ 'border': '7px solid'+color1.hex+'' }" -->
      
        </div>   
      <!-- WebGL -->
        <div class="row">
          <div ref="webGLSpeelveld" id="speelveld"> 
               <WebGLRaum  v-bind:bigBallPosition="ballposition" v-bind:smallBallPosition="smalBallposition"></WebGLRaum> 
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

//const $hoverables = document.querySelectorAll('.hoverable');



export default {
   
  data() {
  return{
    bigBall: null,
    smallBall: null,
    clientcolor: '#f2ff00',
    ballposition: null,
    smalBallposition: null,
    ballpositionmobile:[],
    mouseX: null,
    mouseY: null,
   visibility: 'block',
   show: true,
   desktop: true,
   mobile: false,
   windowWidth: 0,
       
  }
  },
  components: {
  // 'raumSVGgrid': raumSVGgrid,
  //'pilaar': pilaar,
  'WebGLRaum': WebGLRaum,
  
  },
  created() {
     this.videoStream()
    
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
        console.log("device is mobile")
        this.mobile = true
        this.desktop = false
      } else{
         console.log("device is desktop")
        this.mobile = false
        this.desktop = true
      }

      //console.log(this.windowWidth)
    },
 
  methods:{
    

    mousePC: function(event){
        
        this.mouseX = event.x;
        this.mouseY = event.y;
         
         //console.log(this.mouseX)
         TweenMax.to(this.bigBall, 0.1,{
           x: event.x -10,
           y: event.y - 10      
           })
           TweenMax.to(this.smallBall, .1, {
             x: event.x -2,
            y: event.y - 1
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
         

        this.ballposition = this.$refs.ballBig.getBoundingClientRect()  //positie bigball
        this.smalBallposition = this.$refs.ballSmall.getBoundingClientRect()

        
      
        const rect2 = this.$refs.webGLSpeelveld.getBoundingClientRect()  //positie bigball
        //console.log( this.ballposition)
        const isInHoriztonalBounds = this.ballposition.x < rect2.x + rect2.width &&  this.ballposition.x -  this.ballposition.width > rect2.x;
        const isInVerticalBounds = this.ballposition.y < rect2.y + rect2.height && this.ballposition.y - this.ballposition.height > rect2.y;
        const isOverlapping = isInHoriztonalBounds && isInVerticalBounds;
        
        if(isOverlapping== true){ // muis gaat uit
        this.show = false
              this.visibility = 'none'
        }else if(isOverlapping== false){ // muis gaat aan
           this.show = true
           this.visibility = 'block'
        }

      
      },
      enter: function() {
        setTimeout(function() {
          this.show = false;
        }, 1000); // hide the message after 3 seconds
    },
      startlivestream: function(){
          this.videoStream()
          window.v.play();
         // window.controls.classList.add('hidden');


      },
       /// begin live videostream
       async videoStream(){

              /// websocket WebRTC for live stream
        

      const config = {
        iceServers: [{
          urls: ['stun:stun.l.google.com:19302']
        }]
      };

      const getRandomId = () => {
        return Math.floor(Math.random() * 10000);
      };

      const peerId = 'raum'+getRandomId();
      const peerType = 'screen';
      const connections = new Map();

      console.log("peerId is: " +peerId)

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

              peerConnection.ontrack = (e) => {
                console.log('on track', e);
                window.v.srcObject = e.streams[0];
                window.v.muted = true;
                window.v.play();
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
                console.log('Disconnecting from', msg.from);
                connection.ontrack = null;
                connection.onicecandidate = null;
                connection.close();
                connections.delete(msg.from);
              }
            }

            if (msg.type === 'candidate') {
              const connection = connections.get(msg.from);
              if (connection) {
                console.log('Adding candidate to', msg.from);
                connection.addIceCandidate(new RTCIceCandidate(
                  msg.data
                ));
              }
            }
           
          } catch (e) {
            console.error(e);
                 console.log("error niewe verbiding openen lukt niet")
          }
        });

       } catch (e) {
          console.error(e);
          console.log("error niewe verbiding openen lukt niet")
          }
      }, // einde live videostream
      
      
  


    }
}
</script>

<style lang="scss" scoped>

.background {
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
      mix-blend-mode: difference;
      z-index: 1000;
      
      
      circle {
        fill: #f7f8fa;
      }
    }      
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

  video{
    
      width: 100%;
    height: 99vh;
      background-color: rgb(87, 87, 87);
}

@media screen and (max-width: 700px) {

 .row,.col-8,.col-4{
    margin: 0;
    padding:0;
  }
  #speelveld{
     width: 100%;
    height: 59vh;
    background: #0d0d0d;
    color: white;
  }
  video {
       width: 100%;
       height: 30vh;
       background-color: rgb(87, 87, 87);
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
       

</style>

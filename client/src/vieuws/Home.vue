<template>

<div class="hello">
  <div class="navbar navbar-dark bg-dark shadow-sm">
    <div class="container">
      <a href="#" class="navbar-brand d-flex align-items-center">
        <strong>Circus Family</strong>
      </a>
    </div>
  </div>

  <div class="row py-lg-5">
      <div class="col-lg-6 col-md-8 mx-auto">
        <h1 class="font-weight-light">Domotica Control</h1>
        <p class="lead text-muted">Via this page you can transmit and receive OSC data.</p>
        <p>
  
        </p>
      </div>
  </div>

  <div class="album py-5 bg-light">
    <div class="transmit">
      <h3>Transmit OSC data</h3>
      <a href="#" class="btn btn-primary">Turn something on</a>

      <br>
      <div class="wrapper">
        <input type="range" min="1" max="10" step="1" v-model="value"> 
        <span v-text="total"></span>
      </div>

      
    </div>
    <div class="receive">
      <h3>Receive OSC data</h3>
       <div id="messageArea">
            <p id="messageLabel">Remote OSC Message:</p>

            <div class="row">
              <div class="col-2"></div>
              <div class="col-4">
                       <!-- <span v-text="OSCMessage"></span>  -->
                    <p>{{this.address}}</p>
                      <!-- <p>{{this.message}}</p>  -->
                    <div class="color" v-bind:style="{ 'background-color': this.message }"></div> 
              </div>
              <div class="col-4">
                 <p>{{this.address2}}</p>
                 <p>{{this.message2}}</p> 
              </div>
               <div class="col-2"></div>
            </div>
      </div>
    </div>
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
    <div class="container">
      <div class="broadcasting">

      </div>

       <div class="animation">
          <video  v-on:mousemove="updateCoordinates" id="myVideo" ref="myVideo" width="650" height="360">
              <source src="../assets/WORLD_50fps.mp4" type="video/mp4"> 
                  Your browser does not support the video tag.
              </video>
             <p >
              Coordinates: {{ x }} <br /> 
             </p>

      </div>

    </div>
  </div>
  <div class="text-muted py-5">
  <div class="container">
    <p class="mb-1">Domotica control is &copy; Circus family</p>
  </div>
</div>
<button v-on:click="greet">send</button>
</div>
  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";
import $ from 'jquery';


 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" // ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
    value: 5,
    addressen:[],
    message:'',
    address:'',
    message2:'',
    address2:'',
    videoTime: 30,
    x: 0,
    
    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  computed: {
   

   
    total: function () {
        
      return this.value 
    }
  },
  methods:{
    updateCoordinates: function(event) {

      var rect = myVideo.getBoundingClientRect(); // postion of video element 
      console.log(rect.right, rect.left);
     
      this.x =(event.clientX-rect.left)*((5)/(rect.right-rect.left));
      this.x =  this.x.toFixed(2)
   console.log( this.x);
      //
       this.$refs.myVideo.currentTime =this.x; 
        //this.$refs.myVideo.play();

        //sending mouse postion value over OSC to the studio
         port.send({
          address: "/mousePosition ",
          args: [this.x]
         });
    
    },
     videoPlayBack: function () {
        //var vid = document.getElementById("myVideo");
     
           //this.$refs.myVideo.currentTime=10;
           // vid.play();
  
    },
    greet: function(){
      
      port.send({
        address: "/hello",
          args: ["De slider werkt!"]
         });
    },
      sendSlider: function(){

        port.send({
        address: "/hello",
          args: [this.value]
         });

     },
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {
          
            // console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
      OSCMessages: function(oscMessage){ 
  
         
        var n = this.addressen.includes(oscMessage.address) // looks if address exist in the array if not N false otherwise it is true
         
        //console.log(oscMessage);
        if(n == false) {   // if n is false address dont exist en will add new adress in the array                    
            this.addressen.push(oscMessage.address);            
        }

        // first address with data
      if(oscMessage.address == this.addressen[0] ){
          this.message= 'rgb('+oscMessage.args+')'
          this.address= oscMessage.address
          //console.log(this.message); 
        }

    // second address with data
      if(oscMessage.address == this.addressen[1] ){
          this.message2= oscMessage.args
          this.address2= oscMessage.address
          //console.log(this.message); 
        }
         
     }, 
   
  },
  
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
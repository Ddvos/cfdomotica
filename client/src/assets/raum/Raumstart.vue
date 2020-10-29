<template>


  <div class="parentBackground">
    <div ref="mouseEvent" class="backgroundGradient" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+color1+' '+color1Position+'%, '+color2+' '+color2Position+'%)' }">

      <div class="boog"   @mouseover="hover = true" @mouseleave="hover = false" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+color2+' '+color2BoogPosition+'%, '+color1+' 120%)' }">
      </div>  

      <div class="row" v-if="desktop" > 
        <div class="tekst">
                      <h1 id="info-title"> HARMONIE</h1>
                      <p>Living apart together installation</p>
                        <transition name="fade" v-on:enter="enter">
                          <div class="enterbutton" v-if="mouseOpBoog">
                            <div class="pijl"></div>
                            <br>
                            <p class="enter"> Enter the experience</p>
                          </div>
                        </transition>
        </div>
      </div>
      <div v-if="mobile" > 
        <div class="tekst">
                      <h1 id="info-title"> HARMONIE</h1>
                      <p class="underlinemobile">Living apart together installation</p>
                
                          <div class="enterbutton" v-if="mouseOpBoog"> 
                              <div class="pijl"></div>
                              <br>
                              <p class="enter" > Enter the experience </p>
                          </div>
                    
        </div>
        
      </div>   
    </div>   
</div>


  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>
import osc from "osc";

 var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();


export default {
  

  data() {
  return{
    color1: 'rgb(35,100,233)', // blauw
    color2: 'rgba(202,26,47)', // rood
    color1Position: 0,
    color2Position: 0,
    color1BoogPosition: 0,
    color2BoogPosition:100,
    desktopXpostion: null,
    windowWidth: null,
    hover: false,
    mouseOpBoog: false,
    desktop: true,
    mobile: false,
    starttransition:null,
    mainpage: false,

    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  mounted: function(){

        // check if device is desktop or mobile
      if ( window.innerWidth < 700){
        //console.log("device is mobile")
        this.mobile = true
        this.desktop = false

      this.mouseMobile();
        
      } else{
        // console.log("device is desktop")
        this.mobile = false
        this.desktop = true

        this.$refs.mouseEvent.addEventListener('mousemove', (event)=>{this.mousePC(event)});
      }
      
  },
  methods:{

   
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {     
           //  console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },

     OSCMessages: function(oscMessage){

         if(oscMessage.address == "/raumcolors" ){
          // console.log(oscMessage)

           this.color1 = "rgb("+oscMessage.args[0]+","+oscMessage.args[1]+","+oscMessage.args[2]+")"
           this.color2 = "rgb("+oscMessage.args[3]+","+oscMessage.args[4]+","+oscMessage.args[5]+")"
         }

     },
   
       
    mousePC: function(event){
        
      // console.log(event.x)
      // console.log(window.innerWidth)
       
       this.desktopXpostion = event.x


       var mouseX = (event.x/ window.innerWidth);
       //console.log(mouseX)


       // kijkt of muis in het midden is van het scherm
       if(mouseX >= 0.3 && mouseX <= 0.6){
         this.mouseOpBoog = true
         window.addEventListener("click",()=>{ 
              this.mainpage = true;
               this.$emit('start')
           console.log(this.mainpage)
           });
       }else{
         this.mouseOpBoog = false
       }
     
        // linker kant scherm background transitie
        if (mouseX >= 0 && mouseX <= 0.5) {
             this.color2Position = (event.x/ window.innerWidth *200)
             this.color2BoogPosition  = (event.x / window.innerWidth * -200 + 100);
        } else{// rechterkantscherm background transitie
           this.color2Position = 200+ (event.x/ window.innerWidth *-200)
            this.color2BoogPosition  = 200+(event.x / window.innerWidth * 200 -300);
        }
    },
     mouseMobile: function(){

         
              this.starttransition =setInterval(()=>{
                
                if( this.color2Position<100 && this.color2BoogPosition >1){
                    this.color2Position +=0.06
                    this.color2BoogPosition  -=0.06

                    if( this.color2Position>50){
                      
                       setTimeout(()=>{
                          this.mouseOpBoog = true
                        }, 1500); // hide the message after 0.5 seconds
                      
                     
                    
                        window.addEventListener("click",()=>{ 
                          
                            this.mainpage = true;
                            this.$emit('start')
                        console.log(this.mainpage)
                        });
                    }
                    
                  }else{
                  console.log("jaa")
                    clearInterval( this.starttransition)
                }
             },0.0001)       
        

     },

       enter: function() {
       // console.log("fade")
        setTimeout(function() {
         this.mouseOpBoog = false;
        }, 500); // hide the message after 0.5 seconds
    },
        


  
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.parentBackground{
    position: relative;
    z-index: 1; 

}

.backgroundGradient {
 
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 2; 
  
}

.boog{
    display: flex;
      position: relative;
     clip-path: polygon(0 0, 100% 0, 100% 100%, 67% 100%, 67% 20%, 33% 20%, 33% 100%, 0 100%);
      margin-left: 35%;
     width: 30%;
    height: 100vh;
    z-index:3;
}

 .tekst{ 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(255, 255, 255);
  z-index:4;
  }

  #info-title{
    font-size: 620%;
    font-family: 'Prompt', sans-serif;
    font-weight: bold;
   font-style: italic;
   margin-bottom: 0px;

  } 
  p{
      font-size: 130%;
      margin-top: -10px;
      padding-top: 0px;
  }

  .enterbutton {
     margin-top: 3%;
     font-size: 110%;
    position: absolute;
    top: 110%;
    left: 50%;
   opacity: 0.57;
    color: rgb(255,255,255);
    z-index:5;
 
  }

  .enter{
   font-size: 110%;
  margin-top: 5%;
    top: 110%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: rgb(255,255,255);
    z-index:5;
  }
  

   .pijl{
      margin-top: 5%;
        margin-bottom: 2%;
    position:absolute;
     display: 1;
     margin-left: -8%;
     padding: 0%;
     width: 2vw;
	height: 4vh; 
clip-path: polygon(50% 0, 100% 44%, 93% 53%, 50% 15%, 7% 53%, 0 44%);


 background-color:  rgb(255, 255, 255);
  }

  
  @media screen and (max-width: 700px) {

     #info-title{
    font-size: 330%;
    font-family: 'Prompt', sans-serif;
    font-weight: bold;
   font-style: italic;

  } 

  .boog{
    display: flex;
      position: absolute;
     clip-path: polygon(0 0, 100% 0, 100% 100%, 67% 100%, 67% 10%, 33% 10%, 33% 100%, 0 100%);
      margin-left: 25%;
     width: 50%;
    height: 100vh;
    z-index:3;
}

  .tekst{ 
  position: absolute;
  text-align: center;
  white-space: nowrap;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgb(255, 255, 255);
  z-index:4;
  }

  .underlinemobile{
   font-size: 100%;
  }
  .p{
     overflow: hidden;
    white-space: nowrap;;
  }

     .pijl{
      margin-top: 5%;
        margin-bottom: 2%;
    position:absolute;
     display: 1;
     margin-left: -5%;
     padding: 0%;
     width: 5vw;
	height: 4vh; 
clip-path: polygon(50% 0, 100% 44%, 93% 53%, 50% 15%, 7% 53%, 0 45%);

 background-color:  rgb(255, 255, 255);
  }

  .enterbutton{
   
  animation: fadeIn ease-in 4s;
  -webkit-animation: fadeIn ease 4s;
  -moz-animation: fadeIn ease 4s;
  -o-animation: fadeIn ease 4s;
  -ms-animation: fadeIn ease 4s;
  }
  
  @keyframes fadeIn {
      0% {opacity:0;}
      100% {opacity:0.70;}
      }
  }



.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active in <2.1.8 */

{
  opacity: 0
}









</style>
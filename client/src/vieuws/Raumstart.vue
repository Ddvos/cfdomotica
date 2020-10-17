<template>


  <div class="parentBackground">
    <div ref="mouseEvent" class="backgroundGradient" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+color1+' '+color1Position+'%, '+color2+' '+color2Position+'%)' }">

      <div class="boog" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+color2+' '+color1BoogPosition+'%, '+color1+' '+color2BoogPosition+'%)' }">

    </div>  

     <div class="tekst">
                  <h1 id="info-title"> HARMONIE</h1>
                  <p>Living apart together installation</p>
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
    color2Position: 60,
    color1BoogPosition: 0,
    color2BoogPosition: 60,
    desktopXpostion: null,
    windowWidth: null

    
    
     
    
  }},
   created: function(){
             this.OSCMessage();      
          //console.log(message);

     },
  mounted: function(){
       this.$refs.mouseEvent.addEventListener('mousemove', (event)=>{this.mousePC(event)});

      
  },
  methods:{

   
      OSCMessage: function(){ 
               
        port.on("message", (oscMessage) => {     
            // console.log(oscMessage);
             this.OSCMessages(oscMessage);
          
      });
     },
   
       
    mousePC: function(event){
        
      // console.log(event.x)
      // console.log(window.innerWidth)
       
       this.desktopXpostion = event.x


       var mouseX = (event.x/ window.innerWidth);
       console.log(mouseX)
       // is het aantal procent
     
        // linker kant scherm background transitie
        if (mouseX >= 0 && mouseX <= 0.5) {
             this.color2Position = (event.x/ window.innerWidth *200)
             this.color2BoogPosition  = (event.x / window.innerWidth * -200 + 100);
        } else{// rechterkantscherm background transitie
           this.color2Position = 200+ (event.x/ window.innerWidth *-200)
            this.color2BoogPosition  = 200+(event.x / window.innerWidth * 200 -300);
        }
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
    font-size: 550%;
    font-family: 'Prompt', sans-serif;
    font-weight: bold;
   font-style: italic;

  } 

  .info-tekst{
      font-family: 'Roboto', sans-serif;
    font-weight: bold;

  }









</style>
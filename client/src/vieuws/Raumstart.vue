<template>


  <div class="parentBackground">
    <div ref="mouseEvent" class="backgroundGradient" v-bind:style="{ 'background-image': 'linear-gradient(0deg,'+color1.hex+' '+color1Position+'%, '+color2.hex+' '+color2Position+'%)' }">
    </div>     <!-- <chrome-picker :value="colors" @input="updateValue"></chrome-picker> -->      
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

let color1Props = {
  hex: '#2364e9',
}

let color2Props = {
  hex: '#ca1a2f',
}

export default {
  

  data() {
  return{
    color1: color1Props,
    color2: color2Props,
    color1Position: 0,
    color2Position: 60,
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
        } else{// rechterkantscherm background transitie
           this.color2Position = 200+ (event.x/ window.innerWidth *-200)
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
  /* background-color: rgba(71, 255, 178, 0.699); */
    height: 100vh;
  
      position: absolute;
       z-index: 2; 
  
}
.row{
   width: 100%;
  /* background-color: rgba(71, 255, 178, 0.699); */
    height: 50vh;

}

.colorPicker {
   position: absolute;
  margin: auto;

/* background: linear-gradient(0deg, rgba(0,255,64,1) 0%, rgba(0,255,64,1) 32%, rgba(0,212,255,1) 64%, rgba(0,212,255,1) 100%); */
  /* //background-image: linear-gradient(#25BA70E6, #FF09F7); */
   height: 50%;
    
  
  
}
.colorSelector1{
   position: absolute;
  width: 100vh;
   height: 45vh;
     z-index: 3; 

}
.colorSelector2{
   position: absolute;
   margin: 10px;
  width:  100vh;
   height: 45vh;
    z-index: 3;  

}

.vc-chrome { 
  margin-top: 50px;
 position: relative;
     z-index: 4; 


 
}

@media screen and (max-width: 600px) {
  .col-1 {
    visibility: hidden;
    display: none;
  }
}

</style>
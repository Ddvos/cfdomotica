<template>
<div class="background"  ref="mouseEvent"> <!-- v-hammer:pan="onPan"  v-on:mousemove="onMouseMovePc"  -->
<div class="row" id="info">
  <div class="col-6">
    <p>X posistie pc: {{ mouseX }}  X posistie mobile: {{ mouseX }}</p>
    <p>Y posistie pc: {{ mouseY }}  Y posistie mobile: {{ mouseY }}</p>
    <p></p>
  </div>
  <div class="col-6"></div>
  <br>
</div>

<div class="cursor">
  <div ref="ballBig" class="cursor__ball cursor__ball--big ">
    <svg  height="30" width="30" display= "none" >
      <circle cx="15" cy="15" r="12" stroke-width="0"></circle>
    </svg>
  </div>
  
  <div class="cursor__ball cursor__ball--small">
    <svg height="10" width="10">
      <circle cx="5" cy="5" r="4" stroke-width="0"></circle>
    </svg>
  </div>
</div>
   <div class="row" id="title">
        <div class="col-3"></div>
            <div class="col-6"> RAUM - living apart together</div>
        <div class="col-3"></div>
   </div>
   <!-- canvas -->
     <!-- <div class="row" >
        <div class="col-1"></div>
        <div class="col-10" id="speelveld"> Canvas
                <raumSVGgrid v-bind:bigBallPosition="ballposition" v-bind:clientcolor="clientcolor"></raumSVGgrid> 
                <pilaar></pilaar> 
         </div>
        <div class="col-1"></div>
   </div> -->
 <!-- WebGL -->
     <div class="row" >
        <div class="col-1"></div>
        <div class="col-10" id="speelveld"> WebGl
               
                <WebGLRaum v-bind:bigBallPosition="ballposition"></WebGLRaum> 
            </div>
        <div class="col-1"></div>
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
    ballpositionmobile:[],
    mouseX: null,
    mouseY: null,
   
       
  }
  },
  components: {
  // 'raumSVGgrid': raumSVGgrid,
  //'pilaar': pilaar,
  'WebGLRaum': WebGLRaum,
  
  },
  created() {
    
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
    
    },
 
  methods:{
    

    mousePC: function(event){
        
        this.mouseX = event.x;
        this.mouseY = event.y;
         
         //console.log(this.mouseX)
         TweenMax.to(this.bigBall, 0.1,{
           x: event.x - 10,
           y: event.y - 10      
           })
           TweenMax.to(this.smallBall, .1, {
             x: event.x - 5,
            y: event.y - 7
          }) 

          this.ballXYposition()
    },
      mouseMobile: function()  {

        let touch = event.touches[0];
        this.mouseX = touch.clientX;
        this.mouseY = touch.clientY;

         TweenMax.to(this.bigBall, 0.1,{
          x: touch.clientX - 10,
          y: touch.clientY - 10      
          })
          TweenMax.to(this.smallBall, .1, {
            x: touch.clientX - 5,
           y: touch.clientY - 7
         }) 

        this.ballXYposition()
      },
      ballXYposition: function(){
        this.ballposition = this.$refs.ballBig.getBoundingClientRect()  //positie bigball
        //console.log(this.ballposition)
      }
      
  


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
  height: 80vh;
  background: #474141;
  color: white;
  cursor: none;
  }

  .row{
    margin: 0;
  }
}
       

</style>

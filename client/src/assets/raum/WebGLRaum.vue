<template>   
 <div id="container"></div>

</template>
<script>
import osc from "osc";
 import { TweenMax} from 'gsap'
//import * as Three from 'three';

var port = new osc.WebSocketPort({
          url: "wss://circusfamilyprojects.nl:8084" //  ws://localhost:8083 online server wss://circusfamilyprojects.nl:8084
        }); 

 port.open();

export default {

  props: {
        bigBallPosition: Array,
     },
   
  data() {
  return{
      camera: null,
      scene: null,
      renderer: null,
      mesh1: null, // vlak bovenkant
      mesh2: null, // vlak rechterkant
      mesh3: null, // vlak onderkant
      mesh4: null, // vlak linkerkant
      testMesh: null, // vlak linkerkant
      groundMesh: null,
      meshPilaar: null, // kruis pilaar
      light: null,
      mouseMesh: null,
       bigBall: null,
      smallBall: null,
      //colorvlakken
      vlak1color1: '#de3c31',
      vlak1color2: '#42f5b3',
      vlak2color2: '#6ca18d',
      vlak3color1: '#5c4909',
      vlak3color2: '#de3c31',
      vlak4color1: '#de3c31',
      vlak4color2: '#31c7de',
      // detection
      mesh1Detection: null,

   }
  },
  computed: {
  
  },
  created() {
    
    },
  mounted(){
   // this.Three = window.Three = require('Three');
    this.init();
    this.animate();


    },
  methods:{
    

    init: function() {
       
        let container = document.getElementById('container');
         // renderer
         this.renderer = new this.$three.WebGLRenderer({antialias: true});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = this.$three.PCFShadowMap;

        this.renderer.setSize(container.clientWidth, container.clientHeight);
        container.appendChild(this.renderer.domElement);

        //camera
        this.camera = new this.$three.PerspectiveCamera(100, container.clientWidth/container.clientHeight, 0.1, 100);
        this.camera.position.z = 10;
console.log(container.clientWidth)
        //scene
        this.scene = new this.$three.Scene();
        

         var ground = new this.$three.BoxGeometry( 20,20, 0 );
         var Color1Geometry = new this.$three.Geometry();
         var Color2Geometry = new this.$three.Geometry();
         var Color3Geometry = new this.$three.Geometry();
         var Color4Geometry = new this.$three.Geometry();
         var PilaarGeometry = new this.$three.Geometry();


          //detection
         var detection1 = new this.$three.PlaneGeometry( 4, 2.5, 1);
        
      
       // var normal = triangle1.normal();

         // grote bal
        var mouseGeometry = new this.$three.CircleGeometry( 0.8, 100 );

      
    

         //vlak bovenkant kleur
        Color1Geometry.vertices.push(new this.$three.Vector3(0, 0,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color1Geometry.vertices.push(new this.$three.Vector3(4, 4,  0.0));  // x,y,z  1
        Color1Geometry.vertices.push(new this.$three.Vector3(-4, 4,  0.0));  // x,y,z  2

        // rechterkant
        Color2Geometry.vertices.push(new this.$three.Vector3(0, 0,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color2Geometry.vertices.push(new this.$three.Vector3(4, 4,  0.0));  // x,y,z  3
        Color2Geometry.vertices.push(new this.$three.Vector3(4, -4,  0.0));  // x,y,z  4

        // onderkant 
        Color3Geometry.vertices.push(new this.$three.Vector3(0, 0,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color3Geometry.vertices.push(new this.$three.Vector3(-4, -4,  0.0));  // x,y,z  3
        Color3Geometry.vertices.push(new this.$three.Vector3(4, -4,  0.0));  // x,y,z  4

        // linkerkant
        Color4Geometry.vertices.push(new this.$three.Vector3(0, 0,  0.0));  // x,y,z  0  // 0 is de hoogte
        Color4Geometry.vertices.push(new this.$three.Vector3(-4, -4,  0.0));  // x,y,z  3
        Color4Geometry.vertices.push(new this.$three.Vector3(-4, 4,  0.0));  // x,y,z  4
        
             //vlak bovenkant paal outline
        PilaarGeometry.vertices.push(new this.$three.Vector3(0, 0,  1));  // x,y,z  0  // 0 is de hoogte
        PilaarGeometry.vertices.push(new this.$three.Vector3(2, 2,  1));  // x,y,z  1
        PilaarGeometry.vertices.push(new this.$three.Vector3(-2, 2,  1));  // x,y,z  2
        PilaarGeometry.vertices.push(new this.$three.Vector3(2, -2,  1));  // x,y,z  3
        PilaarGeometry.vertices.push(new this.$three.Vector3(-2, -2,  1));  // x,y,z  4


        Color1Geometry.faces.push(
        // top
        new this.$three.Face3(0, 1, 2), // vlak 1
              )
        Color2Geometry.faces.push(
          // rechterkant
          new this.$three.Face3(0, 2, 1), // vlak 1
              )
        Color3Geometry.faces.push(
            // onderkant
            new this.$three.Face3(0, 1, 2), // vlak 1
              )
        Color4Geometry.faces.push(
            // onderkant
            new this.$three.Face3(0, 2, 1), // vlak 1
              )

               
              // top outline
            PilaarGeometry.faces.push(
              // top
              new this.$three.Face3(0, 1, 2), // vlak 1
              new this.$three.Face3(0, 3, 1), // vlak 2
              new this.$three.Face3(0, 4, 3), // vlak 3
              new this.$three.Face3(0, 2, 4), //vlak 4

              )
          

             Color1Geometry.colorsNeedUpdate = true;
             Color1Geometry.computeFaceNormals();
             Color1Geometry.computeVertexNormals();

             Color2Geometry.colorsNeedUpdate = true;
             Color2Geometry.computeFaceNormals();
             Color2Geometry.computeVertexNormals();

             Color3Geometry.colorsNeedUpdate = true;
             Color3Geometry.computeFaceNormals();
             Color3Geometry.computeVertexNormals()

             Color4Geometry.colorsNeedUpdate = true;
             Color4Geometry.computeFaceNormals();
             Color4Geometry.computeVertexNormals()

            // pilaar kleur 
          //var material = new this.$three.MeshBasicMaterial({ vertexColors: this.$three.VertexColors, side: this.$three.DoubleSide});  //vertexColors: this.$three.FaceColors, side: this.$three.DoubleSide 

          
          /// test vertexshader en fragmentshader
      var custom1Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak1color1: { value: new this.$three.Color(this.vlak1color1)},
                   vlak1color2: { value: new this.$three.Color(this.vlak1color2)},
                   positionVlak1: {value: 1.0},
                  // lightRadius: {value: 0.8},
                 },
                 vertexShader: `
                
                  varying vec3 vUv; 

                   void main() {
                     vUv = position; 

                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                fragmentShader: `
                   uniform vec3 vlak1color1;
                   uniform vec3 vlak1color2;
                   uniform float positionVlak1;

                
                   varying vec3 vUv;
                  
                   void main() {     
                    
                       float alpha = smoothstep(2.0, 0.0, vUv.y-2.0);

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(1.0, 2.0, vUv.y);

                        gl_FragColor = vec4(mix(vlak1color1, vlak1color2, colorMix), alpha);
                   }
                   `,transparent: true,
               });
               /// vertexshader en fragmentshader rechterkant
         var custom2Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak2color1: { value: new this.$three.Color(this.vlak2color1)},
                   vlak2color2: {type: 'vec2', value: new this.$three.Color(this.vlak2color2)},
                   positionVlak2: {value: 1.0},
                 },
                 vertexShader: `
                
                   varying vec3 vUv; 

                   void main() {
                     vUv = position; 

                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                 fragmentShader: `
                    
                  uniform vec3 vlak2color1;
                   uniform vec3 vlak2color2;
                   uniform float positionVlak2;

                
                   varying vec3 vUv;
                  
                   void main() {     
                      float alpha = smoothstep(2.0, 0.0, vUv.x-1.0);

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(1.0, 2.0, vUv.x+0.5);

                        gl_FragColor = vec4(mix(vlak2color1, vlak2color2, colorMix), alpha);
                   }
                   `,transparent: true,
              });
                /// vertexshader en fragmentshaderonderkant
               var custom3Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak3color1: { value: new this.$three.Color('#31c7de')},
                   vlak3color2: {type: 'vec2', value: new this.$three.Color('#de3c31')},
                   positionVlak3: {value: -3.5},
                 },
                 vertexShader: `
                
                   varying vec3 vUv; 

                   void main() {
                     vUv = position; 

                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                 fragmentShader: `
                    
                  uniform vec3 vlak3color1;
                   uniform vec3 vlak3color2;
                   uniform float positionVlak3;

                
                   varying vec3 vUv;
                  
                   void main() {     
                    
                      float alpha = smoothstep(0.0, 2.0, vUv.y+3.5);

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(1.0, 2.0, vUv.y+4.0);

                        gl_FragColor = vec4(mix(vlak3color1, vlak3color2, colorMix), alpha);
                   }
                   `,transparent: true,
              });
               /// vertexshader en fragmentshaderonderkant
               var custom4Material = new this.$three.ShaderMaterial({
                 uniforms: {
                   vlak4color1: { value: new this.$three.Color('#31c7de')},
                   vlak4color2: {type: 'vec2', value: new this.$three.Color('#de3c31')},
                   positionVlak4: {value: -4},
                 },
                 vertexShader: `
                
                   varying vec3 vUv; 

                   void main() {
                     vUv = position; 

                  
                     gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
                   }
                 `,
                 fragmentShader: `
                    
                  uniform vec3 vlak4color1;
                   uniform vec3 vlak4color2;
                   uniform float positionVlak4;

                
                   varying vec3 vUv;
                  
                   void main() {     
                    
                       float alpha = smoothstep(0.0, 2.0, vUv.x+4.0);

                        // y < 1 = color1, > 2 = color2
                        float colorMix = smoothstep(0.0, 2.0, vUv.x+3.0);

                        gl_FragColor = vec4(mix(vlak4color1, vlak4color2, colorMix), alpha);
                   }
                   `,transparent: true,
              });
         

         /// einde test vertexshader en fragmentshade

         //detection material/field
        var materialDetection = new this.$three.MeshLambertMaterial( {color: 0xffff00, transparent: true, opacity: 0.0   } );
        
     
        this.mesh1Detection = new this.$three.Mesh( detection1, materialDetection );
          this.mesh1Detection.position.y = 3;
        

        this.mesh1 = new this.$three.Mesh( Color1Geometry,  custom1Material );
        this.mesh2 = new this.$three.Mesh( Color2Geometry,  custom2Material );
        this.mesh3 = new this.$three.Mesh( Color3Geometry,  custom3Material );
        this.mesh4 = new this.$three.Mesh( Color4Geometry,  custom4Material );

       // console.log(this.mesh1.Color1Geometry.computeBoundingBox())

          //this.mesh.rotation.x += -0.8
          //this.mesh.rotation.y += 3.1

           // pilaar outline
          var materialPilaar = new this.$three.MeshBasicMaterial({ color: '#FFFFFF',    wireframe: true, linewidth: 4 });  //vertexColors: this.$three.FaceColors, side: this.$three.DoubleSide
          this.meshPilaar = new this.$three.Mesh( PilaarGeometry, materialPilaar  );

           // grond
          var groundMaterial = new  this.$three.MeshBasicMaterial( {color: '#484a4a'} );
          this.groundMesh = new this.$three.Mesh( ground, groundMaterial );
          this.groundMesh.position.set(0, 0, -1)
          //this.groundMesh.rotation.x += -0.2
          //this.groundMesh.rotation.y += 3.1
         

          // mouse
          var mouseMaterial = new  this.$three.MeshBasicMaterial( { color: 0xffff00 } );
         this.mouseMesh = new  this.$three.Mesh( mouseGeometry, mouseMaterial );
          
           

          this.scene.add(this.mesh1,this.mesh2,this.mesh3, this.mesh4,this.groundMesh,this.meshPilaar,this.mouseMesh,this.mesh1Detection);

  
    },

    mousePosition:function(){
       let container = document.getElementById('container');
      //console.log(this.$props.bigBallPosition.x)
        if(this.$props.bigBallPosition !=null){ // als bigball niet 0 is
              // standaard code om 2de muis positie om te zetten naar een 3D object in three.js
              var vector = new this.$three.Vector3(((this.$props.bigBallPosition.x/container.clientWidth)* 2 -1), (this.$props.bigBallPosition.y/container.clientHeight) *2-1, 0.1);
                vector.unproject( this.camera );
                  var dir = vector.sub( this.camera.position ).normalize();
                  var distance = - this.camera.position.z / dir.z;
                  var pos = this.camera.position.clone().add( dir.multiplyScalar( distance ) );
                 // console.log(pos.x)
                  // geeft de grote ball in three.js vertraging
                  TweenMax.to(this.mouseMesh.position, 3
                  ,{
                      x: pos.x -5.5,
                      y: (pos.y - 4.8)*-1     
                      })
                  //this.mouseMesh.position.copy(pos);

          /// collision detection

          
          //collision detection ball with vlak1
           var mesh1Collision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mesh1Collision.setFromObject(this.mesh1Detection);

            
              // console.log(  testmesh.intersectsTriangle(testmesh))
               
          var mouseCollision = new this.$three.Box3(new this.$three.Vector3(), new this.$three.Vector3());
               mouseCollision.setFromObject(this.mouseMesh)
              //console.log(  testmesh)
               if(mouseCollision.intersectsBox( mesh1Collision)){
                  this.mesh1.material.uniforms.vlak1color2.value = new this.$three.Color('#0a3df5')
                  
               }
               else{
                 this.mesh1.material.uniforms.vlak1color2.value = new this.$three.Color('#6ca18d')
               }
            //console.log(  mouseCollision.isIntersectionBox(mesh1Collision))
          }
      
    },
    animate: function() {
        requestAnimationFrame(this.animate);
      
       //this.mesh.rotation.x += 0.01;    
      //this.mesh.rotation.y += 0.02;
       this.mousePosition()
      
        this.renderer.render(this.scene, this.camera);
    }


    }
}
</script>

<style lang="scss" scoped>

#container {
  
  height: 100%;
  width: 100%;

}




 

</style>
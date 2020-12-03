<template>


  <div class="vragenBackground" ref="vraagEvent">
  <a href="#" class="close" v-on:click="closeForm"></a>
    <br> 
      <h2>Onderzoek eenzaamheid</h2>
       <p>De antwoorden zijn op een schaal van 1 tot 10. Waarbij 1 negatief en 10 positief is.</p>
       <div class="scroll">
          <div class="realscroll">
          <form id="form">
              <label class="label">In hoeverre werd je nieuwsgierigheid geprikkeld door wat je ontdekt?</label>
              <br>   
              <input type="range" min="0" max="10" step="1" v-model="value1"> 
              <span v-text="this.value1"></span>   <br> 

              <label class="label">Zou je de offline omgeving / de fysieke installatie gaan bezoeken door deze online kennismaking?</label>
              <br>   
              <input type="range" min="0" max="10" step="1" v-model="value2"> 
              <span v-text="this.value2"></span>   <br> 

              <label class="label">Ervaar je zelf een vorm van eenzaamheid gedurende deze Covid-19 pandemie?</label>
              <br>   
              <input type="range" min="0" max="10" step="1" v-model="value3"> 
              <span v-text="this.value3"></span>   <br> 

              <label class="label">Kan je je vinden in de omschrijving en het doel van dit werk?</label>
              <br>   
              <input type="range" min="0" max="10" step="1" v-model="value4"> 
              <span v-text="this.value4"></span>   <br> 

                <label class="label">Heb je nog opmerkingen of tips voor de makers?</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="value5"></textarea>
              
              <br>

              <div class="verzend" v-on:click="createVraag" >Verstuur</div>
              <p class="response">{{response}}</p>

          </form>
          </div>
      </div>
     
</div>


  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>

import VraagService from '../../VraagService'
import axios from 'axios';

const url = 'https://circusfamilyprojects.nl:5010/api/posts'
export default {


  data() {
  return{
     value1: 5,
     value2: 5,
     value3: 5,
     value4: 5,
     value5: '',
     sendstatus: false,
     response:''
    
    
  }},
   created: function(){

     // create scroll bar
     var container = this.$el.querySelector("#form");
     container.scrollTop = container.scrollHeight;

     },
  mounted: function(){

     this.$refs.vraagEvent.addEventListener('touchmove',(event) =>{
    console.log("hello")
        },{passive: true });
      
  },
  computed:{

           total: function () {
        
      return [this.value1, this.value2, this.value3, this.value4]
    }
  },
  methods:{
    closeForm(){
       this.$emit('closeForm')
    },
     async createVraag(){

        return axios.post(url,{
              method: 'POST',
              vraag1: this.value1,
              vraag2: this.value2,
              vraag3: this.value3,
              vraag4: this.value4,
              vraag5: this.value5,
              responseType: 'json',
          })
          .then(response=>{
                   
              console.log("sluit formulier child" +response)

              this.response= "Bedankt voor je tijd. Je antwoorden zijn goed aangekomen!"

                setTimeout(() => {
                         this.$emit('closeForm')
                 }, 3000); // close form after 2.5 second
            
             
          })
          .catch(error=>{
            console.log('Error data is niet aangekomen: ',error)

            this.response= "Er is helaas iets fout gegaan, probeer het nog eens."
          //  res.json(error)
          })

      

    
           
      },
   
  },
  
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.vragenBackground{
    position: relative;
    z-index: 1; 
    height: 100%;

}

p{
  text-align: left;
    margin-left: 35%;
}


form{
    text-align: left;

}

span{
    margin-left: 10px;
   width: 80%
}
label{
    margin-top: 10px;
    margin-left: 35%;
    cursor: none;
}
input{
      margin-left:35%;
      width: 20%;
      cursor: none;
}

textarea{
    margin-left: 35%;
    width: 30%
}

.verzend{
     margin-left: 35%;
		border: 1px solid rgba(46, 184, 55,1);
    border-radius: 5px;
		width: 95px;
		padding: 10px 0;
		text-align: center;
		display: inline-block;
     margin-right: 10px;
}

 .verzend:hover{
     background-color: rgba(46, 184, 55,0.5)
  }

 .response {
    position:relative;
    margin-left:2%;
    display: inline-block;
 }

 .close {
  cursor: none;
  position:absolute;
  margin-top:0.3%;
  margin-left:45%;
  display: inline-block;
  right: 32px;
  top: 32px;
  width: 32px;
  height: 32px;
  opacity: 1;
}

.close:before, .close:after {
  position: absolute;
  left: 15px;
  content: ' ';
  height: 33px;
  width: 2px;
  background-color: rgb(255, 255, 255);
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}


  /* Mobile version  */

  @media screen and (max-width: 700px) {

.vragenBackground{
    position: relative;
    z-index: 1; 
    height: 400px;
}

.scroll{
     height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 50px;
    width: 100%;
    position: absolute;
    top: 0;
}

.realscroll{
 position: relative;
  height:100%; ;
  overflow: auto;
   z-index: 7;
}

#form{
  height: 800px;
  /* overflow-x:hidden;
  overflow-y:scroll;
  -webkit-overflow-scrolling: auto;
    z-index: 7;  */
}
    
    h2{
        font-size:150%;
        text-align: left;
        margin-left:5%;
    }
    p{
      font-size:80%;
      margin-left:5%;
    }

    label{
      font-size:80%;
      margin-top: 5px;
      margin-left:5%;
     
    }
    input{
      margin-left:10%;
      width: 70%;
     
    }
    textarea{
      margin-left:5%;
      width: 90%
    }
    .verzend{
       font-size:80%;
      margin-left: 5%;
      border: 1px solid rgba(46, 184, 55,1);
      border-radius: 5px;
      width: 80px;
      padding: 10px 0;
      text-align: center;
      display: inline-block;
      margin-right: 10px;
    }

    .response {
       font-size:65%;
       text-align: left;
        position:absolute;
        margin-left:1%;
        width: 60%;
        display: inline-block;
    }

     .close {
        cursor: none;
        position:absolute;
        margin-left:50%;
        display: inline-block;
        right: 25px;
        top: 10px;
        width: 15px;
        height: 15px;
        opacity: 1;
      }
      .close:before, .close:after {
          position: absolute;
          left: 15px;
          content: ' ';
          height: 25px;
          width: 1.5px;
          background-color: rgb(255, 255, 255);
        }


  }
 






</style>
<template>


  <div class="vragenBackground">
    <br> 
      <h2>Onderzoek eenzaamheid</h2>

      <form>
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

          <button v-on:click="createVraag" class="btn btn-primary mb-2">Verzend</button>
          <p class="response">{{response}}</p>

      </form>
      
     
</div>


  
</template>
<script src="../../node_modules/osc/dist/osc-browser.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

            
<script>

import VraagService from '../../VraagService'
import axios from 'axios';

const url = 'http://circusfamilyprojects.nl:5000/api/posts'
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

     },
  mounted: function(){
      
  },
  computed:{

           total: function () {
        
      return [this.value1, this.value2, this.value3, this.value4]
    }
  },
  methods:{
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

}

span{
    margin-left: 10px;
   
}
label{
    margin-top: 10px;
}

textarea{
    margin-left: 35%;
    width: 30%;
}

.response{
    
}

  /* Mobile version  */

  @media screen and (max-width: 700px) {

  }
 






</style>
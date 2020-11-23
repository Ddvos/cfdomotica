import axios from 'axios';

const url = 'http://circusfamilyprojects.nl:5000/api/posts'

class vraagService {
    //get Vraag

    //create Vraag

    static insertVraag(vraag1, vraag2,vraag3,vraag4,vraag5){
      return axios.post(url,{
            method: 'POST',
            vraag1: vraag1,
            vraag2: vraag2,
            vraag3: vraag3,
            vraag4: vraag4,
            vraag5: vraag5,
        })
        .then((response)=>{
            console.log('Data is succesvol gestuurd: ')
            return response.data['searchResults']; 
        })
        .catch((error)=>{
           console.log('Error data is niet aangekomen: ',error)
         //  res.json(error)
        })
    }

    //Delete Post
}

export default vraagService
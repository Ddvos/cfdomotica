import axios from 'axios';

const url = 'http://circusfamilyprojects.nl:5000/api/posts'

class vraagService {
    //get Vraag

    //create Vraag

    static insertVraag(vraag1){
        return axios.post(url,{
            vraag1
        });
    }

    //Delete Post
}

export default vraagService
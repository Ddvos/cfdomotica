const express = require('express');
//const mongodb = require('mongodb');
const mongoose = require('mongoose');

const router = express.Router();

const mongodb_URI = 'mongodb+srv://Circus_Family:mYIz6bPl1ZRfhbtF@circusfamily.vehzf.mongodb.net/circusfamily?retryWrites=true&w=majority' //'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

 
mongoose.connect(mongodb_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MonogDB is connected with online database');
});

mongoose.connection.on('error',(error)=>{
    console.log('MonogDB error'+error);
});



// schema
const Schema = mongoose.Schema;
const VragenRaum = new Schema({
    title: String,
    body: String,
    date:{
        type: String,
        default: Date.now()
    }
});

 // model
 const AntwoordenRaum = mongoose.model('BlogPost',VragenRaum);


//Get Posts
router.get('/', async (req,res)=>{
    //res.send('hello')
    AntwoordenRaum.find({})
        .then((data)=>{
            //console.log('Data: ',data)
            res.json(data)
        })
        .catch((error)=>{
           // console.log('Error: ',error)
           res.json(error)
        })
});

//Add Posts

router.post('/', async (req,res)=>{   

        // data is incomg data from axios
         const data = req.body;

        const newAntwoord = new AntwoordenRaum(data)  // instance of model

        newAntwoord.save((error)=>{
            if(error){
                console.log("Ooops, something happend")
            }else{
                console.log("Data has been saved!!")
            }
        })
});

// Delete Posts


   
 
module.exports = router;
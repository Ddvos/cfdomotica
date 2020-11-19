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
const VragenModel = mongoose.model('BlogPost',VragenRaum);

// data to save in database
const data = {
    title: "eerste post",
    body: "dit is een test"
}

const newVragenModel = new VragenModel(data)  // instance of model

newVragenModel.save((error)=>{
    if(error){
        console.log("Ooops, something happend")
    }else{
        console.log("Data has been saved!!")
    }
})


//Get Posts
router.get('/', async (req,res)=>{
    //res.send('hello')
    mongoose.model('posts').find(function(err, posts){
        res.send( posts);
    });
});

//Add Posts

router.post('/', async (req,res)=>{
    //res.send('hello')
    mongoose.model('posts').find(function(err, posts){
        res.send( posts);
    });
});

// Delete Posts


   
 
module.exports = router;
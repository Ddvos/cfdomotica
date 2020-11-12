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

mongoose.model('posts',{name: String});
//Get Posts
router.get('/', async (req,res)=>{
    //res.send('hello')
    mongoose.model('posts').find(function(err, posts){
        res.send( posts);
    });
    
  
});

//Add Posts

// Delete Posts


   
 
module.exports = router;
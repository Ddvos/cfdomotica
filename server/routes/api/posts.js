const express = require('express');
//const mongodb = require('mongodb');
const mongoose = require('mongoose');

const router = express.Router();

const mongodb_URI = 'mongodb+srv://Circus_Family:mYIz6bPl1ZRfhbtF@circusfamily.vehzf.mongodb.net/circusfamily?retryWrites=true&w=majority' //'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

//Get Posts
router.get('/', async (req,res)=>{
    //res.send('hello')
     const posts = await loadPostsCollection();
     res.send(await posts.find({}).toArray());
});

//Add Posts

// Delete Posts

 async function loadPostsCollection(){
    const client = await mongoose.connect(mongodb_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on('connected',()=>{
        console.log('MonogDB is connected with online database');
    });

    mongoose.connection.on('error',(error)=>{
        console.log('MonogDB error'+error);
    });
     return client;
 }
module.exports = router;
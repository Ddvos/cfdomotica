const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Posts
router.get('/', async (req,res)=>{
    //res.send('hello')
     const posts = await loadPostsCollection();
     res.send(await posts.find({}).toArray());
});

//Add Posts

// Delete Posts


 async function loadPostsCollection(){
    const client = await mongodb.MongoClient('mongodb+srv://Circus_Family:mYIz6bPl1ZRfhbtF@circusfamily.vehzf.mongodb.net/circusfamily?retryWrites=true&w=majority',{
             useNewUrlParser: true,
         });
     return client.db('circusfamily').collection('posts');
 }
module.exports = router;
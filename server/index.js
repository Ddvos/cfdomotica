const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

const posts = require('./routes/api/posts');

app.use('/api/posts', posts);


const port = process.env.PORT || 5000;

const mongodb_URI = 'mongodb+srv://CircusFamily:mYIz6bPl1ZRfhbtF@cluster0-7znii.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodb_URI || 'mongodb://localhost/circusfamily',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected',()=>{
    console.log('MonogDB is connected');
});

app.listen(port,()=>console.log(`Server started on port ${port}`));
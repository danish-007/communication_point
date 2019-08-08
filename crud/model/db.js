const mongoose = require('mongoose');
require('./postSchema');
require('./commentSchema');
mongoose.connect('mongodb://localhost:27017/Center',{useNewUrlParser:true},(err)=>{
    if(err){
        console.log('Error in connecting to db');
    }else{
        console.log('Connected to db');
    }
});


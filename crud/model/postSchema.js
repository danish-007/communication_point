const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    name:{
        type:String
    },
    title:{
        type:String
    },
    description:{
        type:String
    }
});
mongoose.model('Post',postSchema);
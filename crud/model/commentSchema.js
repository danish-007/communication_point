const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    id:{
        type:String
    },
    name:{
        type:String
    },
    description:{
        type:String
    }
});
mongoose.model('Comment',commentSchema);
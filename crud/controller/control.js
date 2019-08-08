const express = require('express');
const app=express();
const router = express.Router();
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');

router.get('/',(req,res)=>{
    Post.find( (err,docs)=>{
        if(!err){
            res.render('postview/allposts',{
                list:docs
            })
        }else{
            console.log('Error in getting posts');
        }
    })
})

router.get('/post',(req,res)=>{
    res.render('postview/postview');
});

router.get('/postdetail/:id',(req,res)=>{

    Post.findById(req.params.id,(err,doc)=>{
        if(err) console.log("error")
        else{
            //console.log(doc);
            Comment.find({'id':req.params.id},(err,doc2)=>{
            //console.log(doc2);
             res.render('postview/postdetail',{
                 list:doc,
                 comment_list:doc2,
                 viewid:doc._id
                 });
            //console.log(doc);
            });
        }
    });
});

router.post('/post',(req,res)=>{
    insertpost(req,res);
});
function insertpost(req,res){
    var post = new Post();
    post.name=req.body.name;
    post.title = req.body.title;
    post.description = req.body.description;
    post.save((err,doc)=>{
        if(!err){
            res.redirect('/');
        }
    });
}


router.post('/comment/:id',(req,res)=>{
    insertcomment(req,res);
});
function insertcomment(req,res){
    var comment = new Comment();
    console.log(req.params);
    console.log(req.body);
    comment.id = req.params.id;
    comment.name = req.body.name;
    comment.description = req.body.description;
    comment.save((err,doc)=>{
        if(!err){
            res.redirect('../postdetail/'+req.params.id);
        }
    });
}
router.get('/list',(req,res)=>{
    res.json('from new');
});
module.exports=router;

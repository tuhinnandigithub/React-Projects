const express = require('express');
const auth = require('../../middleware/auth');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const router = express.Router();

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post('/',[auth,[
    check('text',"Text is requird").not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            user:req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        });
        await post.save();
        res.json(post);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/posts
// @desc    Get all the posts
// @access  Private

router.get('/',auth, async (req,res)=>{
    try{
        const posts = await Post.find().sort({date:-1})   //sort by date most recent first
        res.json(posts);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post not found"});
        }
        res.json(post);
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg:"Post not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/posts/:id
// @desc    Delete post by id
// @access  Private
router.delete('/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post not found"});
        }
        if(post.user.toString() !== req.user.id){
            return res.status(400).json({msg:"You are not authorized to delete this post"});
        }
        await Post.findByIdAndDelete(req.params.post_id);
        res.json({message:"Post Deleted"});
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg:"Post not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   Put api/posts/like:id
// @desc    Like a post
// @access  Private

router.put('/like/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post not found"});
        }
        // Check if the post already been liked by the user
        if(post.likes.filter(p=>p.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg:"Post already liked"});
        }
        post.likes.unshift({user:req.user.id});
        await post.save();
        res.json(post.likes);
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg:"Post not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   Put api/posts/unlike:id
// @desc    Like a post
// @access  Private

router.put('/unlike/:post_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post not found"});
        }
        // Check if the post already been liked by the user
        const index = post.likes.findIndex(p=>p.user.toString() === req.user.id);
        if(index === -1){
            return res.status(400).json({msg:"Post has not yet been liked"});
        }
        post.likes.splice(index,1); 
        await post.save();
        res.json(post.likes);
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg:"Post not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/posts/comment/:post_id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:post_id',[auth,[
    check('text',"Text is requird").not().isEmpty()
]], async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);
        const newComment = {
            user:req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar
        };
        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELEE api/posts/comment/:post_id/:comment_id
// @desc    Like a post
// @access  Private

router.delete('/comment/:post_id/:comment_id',auth, async (req,res)=>{
    try{
        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg:"Post not found"});
        }
        //get the index of the comment
        const comment_Index = post.comments.findIndex(p=>p.id.toString() === req.params.comment_id);
        //console.log(comment_Index);
        if(comment_Index === -1){
            return res.status(400).json({msg:"Comment not found!"});
        }
        // Check if the comment added by the by same user
       if(post.comments[comment_Index].user.toString() !== req.user.id){
            return res.status(400).json({msg:"You are not authorized to delete this comment"});
        }
        post.comments.splice(comment_Index,1); 
        await post.save();
        res.json(post.comments);
    }catch(err){
        if(err.kind ==='ObjectId'){
            return res.status(400).json({msg:"Post /Comment not found"});
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});
module.exports= router;
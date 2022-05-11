const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const {check,validationResult} = require('express-validator');
const request = require('request');
const config = require ('config');
// @route   GET api/profile/me
// @desc    Get the current user profile
// @access  Private
router.get('/me', auth, async(req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            res.status(400).json({msg:'There is no profile for the user'});
        }
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/profile
// @desc    Create or Update user profile
// @access  Private
router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
] ], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {
        company,
        website,
        location,
        status,
        skills,
        bio,
        githubusername,
        experience,
        education,
        youtube,
        twiter,
        facebook,
        linkedin,
        instagram
    } = req.body;
    // Build profile object
    const profileFields ={};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if(skills){
        profileFields.skills = skills.split(',').map(p=>p.trim());
    }
    //Build social object
    profileFields.social ={};
    if(youtube) profileFields.social.youtube = youtube;
    if(twiter) profileFields.social.twiter = twiter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    try{
        let profile = await Profile.findOne({user:req.user.id});
        if(profile){
            //Update
            profile = await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true }
                );
            return res.json(profile);    
        }
        // Create
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/profile
// @desc    Get all profiles
// @access  public

router.get('/' ,async (req,res)=>{
    try{
        const profiles = await Profile.find().populate('user',['name','avatar']);
        res.json(profiles);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/profile/user/:user_id
// @desc    Get  profile by user id
// @access  public

router.get('/user/:user_id', async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',
        ['name','avatar']);
        if(!profile){
          return  res.status(400).json({msg:'Profile not found'});
        }
        res.json(profile);
    }catch(err){
        if(err.kind == 'ObjectId'){
            return  res.status(400).json({msg:'Profile not found'}); 
        }
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   DELETE api/profile
// @desc    Delete login user profile
// @access  private

router.delete('/',auth, async (req,res)=>{
    try{
        // To do remove users posts
        await Post.deleteMany({user:req.user.id});
        // Delete user profile
       await Profile.findOneAndDelete({user:req.user.id});
       // Delete user
       await User.findOneAndDelete({_id:req.user.id});
        res.status(200).json({message:"User Deleted!"});
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
});


// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  private

router.put('/experience', [auth,[
    check('title','Title is required').not().isEmpty(),
    check('company', ' Company name is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});  
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;
    // creating experience object
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };
    try{
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience by Id
// @access  private

router.delete('/experience/:exp_id', auth, async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        // Get remove index
        const index = profile.experience.findIndex((p)=>p.id == req.params.exp_id);
        //console.log(index);
        profile.experience.splice(index,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  private

router.put('/education', [auth,[
    check('school','School is required').not().isEmpty(),
    check('degree', ' Degree is required').not().isEmpty(),
    check('fieldofstudy', ' Field Of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
]], async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});  
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;
    // creating experience object
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    };
    try{
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   DELETE api/profile/education/:exp_id
// @desc    Delete profile experience by Id
// @access  private

router.delete('/education/:edu_id', auth, async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id});
        // Get remove index
        const index = profile.education.findIndex((p)=>p.id == req.params.edu_id);
        //console.log(index);
        profile.education.splice(index,1);
        await profile.save();
        res.json(profile);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error");
    }
})

// @route   GET api/profile/github/:usename
// @desc    Grt User reepos fron github
// @access  public
router.get('/github/:username', (req,res)=>{
    try{
        const options ={
            uri :`http://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get("gitHubSecret")},`,
            method:"GET",
            headers:{'user-agent':'node.js'}
        }
         request(options, (error,response,body)=>{
            if(error){
                console.error(error);
            }
            if(response.statusCode !==200){
             return   res.status(404).json({msg: "No github profile found"});
            }
            res.json(JSON.parse(body));
        })

    }catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports= router;
const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User');
const {check,validationResult} = require('express-validator');
const bcript  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
// @route   GET api/auth
// @desc    Get user using token
// @access  Public
router.get('/' ,auth, async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.log(err.message);
        res.status(500).send("Server Error!!");
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
] ,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {email,password} = req.body;

    try{
        // Check if user exists with the given email
        let user = await User.findOne({email});
        if(!user){
           return res.status(400).json({errors:[{msg:"User not found"}]});
        }
       // Match the credential
        const isMatch = await bcript.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({errors:[{msg:"Invalid credentilas"}]});
         }

        // Return jsowebtoken
        const payLoad = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payLoad,config.get("jwtSecret"),{
            expiresIn:36000
        },(err,token)=>{
            if(err){
                throw new Error({err});
            }
            res.json({token});
        });

    }catch(err){
        console.log(err.message);
        res.send(500).send('Server Error')
    }
});

module.exports= router;
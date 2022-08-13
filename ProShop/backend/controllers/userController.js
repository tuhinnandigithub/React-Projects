import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'


//@desc Auth user & get Token
//@desc POST /api/users/login
//@access public

const authUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body

   const user = await User.findOne({email})

   if(user && (await user.matchPassword(password))){
        return res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
   }else{
    res.status(401)
    throw(new Error('Invalid Email/Password'))
   }
})


//@desc Register a new User
//@desc POST /api/users/
//@access public

const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

   const userExists = await User.findOne({email})

   if(userExists){
    res.status(400)
    throw(new Error('User Already Exists'))
   }

   const user = await User.create({
    name,
    email,
    password
   })

   if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
   }else{
        res.status(400)
        throw new Error("Invalid User Data")
   }
})

//@desc Get user profile
//@desc GETu /api/users/profile
//@access private

const getUserProfile = asyncHandler(async(req, res) => {
const user = await User.findById(req.user._id)

   if(user){
        return res.json({
            _id : user._id,
            name : user.name,
            email : user.email,
            isAdmin : user.isAdmin,
        })
   }else{
    res.status(404)
    throw(new Error('User not Found'))
   }
})

export default {authUser, getUserProfile, registerUser }
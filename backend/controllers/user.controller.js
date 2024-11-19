const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

exports.register =async(req,res)=>{
   try {
      const {email,password,name} = req.body

      const ExistingUser = await User.findOne({email})
      if(ExistingUser){
         throw new Error("Email already exist !")
      }
       if(!email || !password || !name){
          throw new Error("All fields are required !")
       } 
       const salt = bcrypt.genSaltSync(10);
       const hashPassword = await bcrypt.hashSync(password,salt)
       if(!hashPassword){
         throw new Error("Something wrong in hashing !")
       }
       const payload = {
         ...req.body,
         password:hashPassword,
         role:"USER"
       }
       const user = new User(payload)
       const saveUser = user.save();

       res.status(201).json({
         data:user,
         success:true,
         error:false,
         message:"User created successfully !"
       })
   } catch (error) {
     res.json({
        message : error.message,
        error : true,
        success : false
     })
   }
}

exports.login = async(req,res)=>{
   try {
     const {email,password} = req.body
     if(!email || !password){
      throw new Error("All fields are required !");
     }
     const user = await User.findOne({email})
     if(!user){
      throw new Error("User not found !");
     }
     const validPassword = await bcrypt.compare(password,user.password)
     if(validPassword){
       const tokenData = {
         _id:user._id,
         email:user.email,
       }
       const token = jwt.sign(
         tokenData,
         process.env.JWT_SECRET,
         {expiresIn:60*60*48}
       )
       const tokenOption={
         httpOnly:true,
         secure:true
       }
       res.cookie("token",token,tokenOption).status(200).json({
         data:token,
         success:true,
         error:false,
         message:"Logged in successfully"
       })
     }else{
      throw new Error("Wrong password !");
     }
   } catch (error) {
      res.json({
         message : error.message,
         error : true,
         success : false
      })
   }
}
exports.getUser = async(req,res)=>{
   try {
    console.log(req.userId);
    const user = await User.findById(req.userId);
    res.status(200).json({
      user:user,
      success:true,
      error:false,
      message:"User Details"
    })
   } catch (error) {
    res.json({
      message : error.message,
      error : true,
      success : false
   })
}
}
exports.userLogout = async(req,res)=>{
  try {
    res.clearCookie("token")
    res.json({
      message : "Logged out",
      error : false,
      success : true,
      data:[]})
  } catch (error) {
    res.json({
      message : error.message,
      error : true,
      success : false
   })
  }
}

exports.getAllUsers = async(req,res)=>{
  try {
    const allUsers = await User.find()
    res.json({
    message : "Fetch success",
    data:allUsers,
    error : false,
    success : true
}) 
  } catch (error) {
    res.json({
      message : error.message,
      error : true,
      success : false
  })
} }

exports.updateUser = async(req,res)=>{

  try {
    const sessionUser = req.userId
    const {userId,role,email,name} = req.body
    const payload = {
      ...(email && {email:email}),
      ...(name && {name:name}),
      ...(role && {role:role})
    }
    console.log(userId);
    const updateUser = await User.findByIdAndUpdate(userId,payload)

    const user = await User.findById(sessionUser)
    console.log("userRole",user.role);
    res.json({
      message : 'user updated',
      error : false,
      success : true,
      data: user})
  } catch (error) {
    res.json({
      message : error.message,
      error : true,
      success : false
  })
  }
}
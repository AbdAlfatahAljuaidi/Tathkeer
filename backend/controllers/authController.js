const express = require('express')
const {User,userValidation}= require('../models/User')
const jwt = require('jsonwebtoken')


const Signup = async (req,res) => {
   try{

const {error} = userValidation(req.body)
if(error){
    return res.status(400).json({error:true,message:error.details[0].message})
}

     const {email,password} = req.body
    // if(email=="" || password==""){
    //     return res.status(400).json({error:true,message:"كل الحقول مطلوبة"})
    // }

    const existEmail = await User.findOne({email})
    if(existEmail){
        return res.status(400).json({error:true,message:"Email is exist"})
    }

    const user = await User.create({
        email,
        password
    })

    return res.status(200).json({error:false,message:"تم انشاء حساب جديد"})


   }catch(error){
       console.log(error);
    return res.status(500).json({error:true,message:"Internal server error"})
    
   }
    
}

const Login = async (req,res) => {
 try{
    const {email,password} = req.body
    if(email=="" || password==""){
        return res.status(400).json({error:true,message:"كل الحقول مطلوبة"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({error:true,message:"Email does not exist"})
    }

    if(password != user.password){
        return res.status(400).json({error:true,message:"incorrect password"})
    }

    
  const token = jwt.sign(
    { id: user._id, email: user.email }
,process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN}  )
res.cookie('token', token, {
  httpOnly: true,
  secure: true, // ضروري إذا تستخدم https
  sameSite: 'None', // يسمح بالإرسال عبر النطاقات
  maxAge: 24 * 60 * 60 * 1000 // 1 يوم مثلاً
});




    return res.status(200).json({error:false,message:"welcome"})
 }catch(error){
    console.log(error);
    return res.status(500).json({error:true,message:"Internal server error"})
    
 }

}






module.exports={
    Signup,
    Login
}
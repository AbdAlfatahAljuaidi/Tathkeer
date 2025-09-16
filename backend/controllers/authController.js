const express = require('express')
const {User,userValidation}= require('../models/User')
const Document= require("../models/Document")
const jwt = require('jsonwebtoken')
const activeEmail = require('../utils/active')
const forgotPassword = require('../utils/passord')
const {Suggest,suggestValidation} = require("../models/Suggest")
const cron = require('node-cron')
const tathkeerEmail = require('../utils/tathkeer')
const shell = require('shelljs')

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

    // const link = `http://localhost:5173/Active/${email}`;

    // console.log("testones");
    
    
    // await activeEmail(
    //     email,
    //     link,
    //     "Activate Your Account",
    //     "active",
    // )
    
    console.log("testtow");
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

    // if(user.active==false){
    //     return res.status(400).json({error:true,message:"You must active your acount via email"})
    // }
    if(!user){
        return res.status(404).json({error:true,message:"Email does not exist"})
    }

    if(password != user.password){
        return res.status(400).json({error:true,message:"incorrect password"})
    }

    
  const token = jwt.sign(
    { id: user._id, email: user.email }
,process.env.JWT_SECRET)

// ,{expiresIn:process.env.JWT_EXPIRES_IN}


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



const sendEmail = async (req,res) => {
try{
  
  const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const email = decoded.email;


  
     const link = `http://localhost:5173/Active/${email}`;
    
    await activeEmail(
        email,
        link,
        "Activate Your Account",
        "active",
    )

    return res.status(200).json({error:false,message:"تم ارسال الايميل لتفعيل حسابك"})
}catch(error){
  console.log(error);
  return res.status(200).json({error:false,message:"Internal server error"})
}

}




const ActiveAccount = async (req,res) => {
   try{
    const {email} = req.params

    if (!email) {
        return res.status(400).json({ message: "email is required" });
      }

    const user = await User.findOne({email})

    if(!user){
        return res.status(404).json({error:true,message:"الايميل غير موجود"})
    }
    user.active=1
    await user.save()
    return res.status(200).json({error:false,message:"تم تفعيل الحساب بنجاح"})
   }
   catch(error){
    console.log(error);
    return res.status(500).json({error:true,message:"Internal server error"})
   }

} 



const generateRandomPassword = (length = 10) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  };
  
  const ForgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      if (!email) {
        return res.status(400).json({
          error: true,
          message: "Please fill the email field",
        });
      }
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User does not exist",
        });
      }


if(user.active==false){
  return res.status(400).json({error:true,message:"يجب عليك تفعيل حسابك اولا "})
}

  
      const newPassword = generateRandomPassword();
  
      user.password = newPassword;
      await user.save();
  

      console.log("test");
      
  await forgotPassword(
    email,
    newPassword,
    "Reset Your Password",
    "password",
  )

  console.log("hello");
  
  
      return res.status(200).json({
        error: false,
        message: "New password has been generated and saved. Please check your email.",
      });
  
    } catch (error) {
      console.error('ForgotPassword Error:', error);
      return res.status(500).json({
        error: true,
        message: "Server error",
      });
    }
  };




  const suggestSubmit = async (req,res) => {
   try{
    

const {error}= suggestValidation(req.body)

if(error){
  return res.status(400).json({error:true,message:error.details[0].message})
}


const token = req.cookies.token
if (!token) {
    return res.status(401).json({ error: true, message: "يرجى الذهاب لتسجيل الدخول اولا بعد ذلك يمكنك عمل اقتراح" });
  }

    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    const email = decoded.email



const user = await User.findOne({email})

if(user.active==false){
  return res.status(400).json({error:true,message:"يجب عليك تفعيل حسابك اولا "})
}

    
    const {name,type,details} = req.body


    const suggest = await Suggest.create({
      name,email,type,details
    })


    return res.status(200).json({error:false , message:"تم ارسال اقتراحك بنجاح" })
   }catch(error){
    console.log(error);
    return res.status(500).json({error:true , message:"Internal server error" })
    
   }

  }




  const Logout = async (req,res) => {
  
try{
  console.log("الكوكيز قبل الحذف:", req.cookies);
  res.clearCookie("token",{
    httpOnly:true,
    secure:true,
    sameSite:'None',


  })

  console.log("الكوكيز fu] الحذف:", req.cookies);
  return res.status(200).json({error:false,message:"تم تسجل الخروج"}) 
}catch(error){
  console.log(error);
  return res.status(500).json({error:true,message:"Internal server error"}) 
  
}
  
  }

  cron.schedule("* * 23 * * *", async () => {
    console.log("🚀 بدء فحص الوثائق المنتهية اليوم أو خلال أسبوع...");
  
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const weekLater = new Date(today);
      weekLater.setDate(weekLater.getDate() + 7);
  
      // الوثائق اللي تنتهي اليوم أو بعد أسبوع
      const expiringDocs = await Document.find({
        $or: [
          {
            endDate: {
              $gte: today, // بداية اليوم
              $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) // نهاية اليوم
            }
          },
          {
            endDate: {
              $gte: weekLater, // بداية يوم بعد 7 أيام
              $lt: new Date(weekLater.getTime() + 24 * 60 * 60 * 1000) // نهاية اليوم بعد 7 أيام
            }
          }
        ]
      }, { userId: 1, name: 1, endDate: 1 });
  
      if (expiringDocs.length === 0) {
        console.log("✅ لا يوجد وثائق تنتهي اليوم أو بعد أسبوع.");
        return;
      }
  
      // IDs المستخدمين الفريدة
      const userIds = [...new Set(expiringDocs.map(doc => doc.userId.toString()))];
  
      // الإيميلات
      const users = await User.find({ _id: { $in: userIds } }, { email: 1 });
      const userMap = new Map(users.map(u => [u._id.toString(), u.email]));
  
      // إرسال إشعارات
      for (const doc of expiringDocs) {
        const email = userMap.get(doc.userId.toString());
  
        if (!email) {
          console.warn(`⚠️ لا يوجد إيميل مرتبط بوثيقة ${doc._id}`);
          continue;
        }
  
        let subject = "";
        if (doc.endDate.getTime() === today.getTime()) {
          subject = `وثيقتك "${doc.name}" تنتهي اليوم`;
        } else if (doc.endDate.getTime() === weekLater.getTime()) {
          subject = `تنبيه: وثيقتك "${doc.name}" ستنتهي خلال أسبوع`;
        }
  console.log("========================================");
  
  
        await tathkeerEmail(email, doc.name, subject, "tathkeerTemplate");
        console.log(`📩 تم إرسال إشعار إلى: ${email} - الموضوع: "${subject}"`);
      }
    } catch (error) {
      console.error("❌ خطأ أثناء تنفيذ المهمة المجدولة:", error);
    }
  });
  





module.exports={
    Signup,
    Login,
    ActiveAccount,
    ForgotPassword,
    suggestSubmit,
    sendEmail,
    Logout
}
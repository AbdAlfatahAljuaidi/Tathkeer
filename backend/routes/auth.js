const express = require('express')
const router = require('express').Router()
const {Signup,Login,ActiveAccount,ForgotPassword,suggestSubmit,sendEmail,Logout} = require('../controllers/authController')


router.post('/SignUser',Signup)
router.post("/Login",Login)
router.get("/sendEmail",sendEmail)
router.get("/ActiveAccount/:email",ActiveAccount)
router.post("/ForgotPassword",ForgotPassword)
router.post("/suggestSubmit",suggestSubmit)
router.post("/Logout",Logout)



module.exports=router

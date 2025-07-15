const express = require('express')
const router = require('express').Router()
const {Signup,Login,ActiveAccount,ForgotPassword} = require('../controllers/authController')


router.post('/SignUser',Signup)
router.post("/Login",Login)
router.get("/ActiveAccount/:email",ActiveAccount)
router.post("/ForgotPassword",ForgotPassword)



module.exports=router

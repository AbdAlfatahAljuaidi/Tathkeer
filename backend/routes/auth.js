const express = require('express')
const router = require('express').Router()
const {Signup,Login} = require('../controllers/authController')


router.post('/SignUser',Signup)
router.post("/Login",Login)



module.exports=router

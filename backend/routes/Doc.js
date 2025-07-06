const express = require('express')
const docRouter = require('express').Router()
const {addDocument,getDocuments} =require('../controllers/docController')

docRouter.post('/addDoc',addDocument)
docRouter.get('/getDocuments',getDocuments)

module.exports = docRouter

const express = require('express')
const docRouter = require('express').Router()
const {addDocument,getDocuments,deleteDocument} =require('../controllers/docController')

docRouter.post('/addDoc',addDocument)
docRouter.get('/getDocuments',getDocuments)
docRouter.delete('/deleteDocument',deleteDocument)

module.exports = docRouter

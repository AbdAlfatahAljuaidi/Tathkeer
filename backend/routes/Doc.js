const express = require('express')
const docRouter = require('express').Router()
const {addDocument,getDocuments,deleteDocument,getDocument,updateDocument} =require('../controllers/docController')

docRouter.post('/addDoc',addDocument)
docRouter.get('/getDocuments',getDocuments)
docRouter.delete('/deleteDocument',deleteDocument)
docRouter.get('/getDocument/:id',getDocument)
docRouter.put('/updateDocument',updateDocument)

module.exports = docRouter

const express = require("express")
const Document= require("../models/Document")
const jwt = require('jsonwebtoken')


const addDocument = async (req,res) => {
try{
const token = req.cookies.token
if (!token) {
    return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
  }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    
    
    const {name,startDate,endDate} = req.body
if(name=="" || startDate==""||endDate==""){
    return res.status(400).json({error:true,message:"كل الحقول مطلوبة"})
}

const newDocument = await Document.create({
    name,startDate,endDate,userId:id
})

return res.status(200).json({error:false,message:"New document has been created successfully",newDocument})

}catch(error){
    console.log(error);
    
}
}


const getDocuments = async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: true, message: "Unauthorized: No token provided" });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id;
  
      // جلب المستندات المرتبطة بهذا المستخدم
      const documents = await Document.find({ userId });
  
      return res.status(200).json({ error: false, documents });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: true, message: "Internal server error" });
    }
  };
  



module.exports={
    addDocument,
    getDocuments
}















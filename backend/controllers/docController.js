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


  const deleteDocument = async (req,res) => {
    try{
      
const {id} = req.body;
console.log("id",id);

const document = await Document.findById(id)
if(!document){
  res.status(404).json({error:true,message:"Document not found"})
}



await Document.deleteOne({_id:id})
res.status(200).json({error:false,message:"تم حذف البيانات بنجاح"})

    }catch(error){
      console.log(error);
      res.status(500).json({error:true,message:"حدث خطأ"})
      
    }
  }



  const getDocument = async (req,res) => {
    try{
      
const {id} = req.params;
if(!id){
  return res.status(404).json({error:true,message:"ID not found"})
}

const document = await Document.findById(id)

if(!document){
  return res.status(404).json({error:true,message:"Document not found"})
}

return res.status(200).json({error:false,message:"Get Document Successfully" , document})


    }catch(error){
      console.log(error);
      
    }


  }



  const updateDocument = async (req,res) => {
    try{
      
const {id,name,startDate,endDate} = req.body
if(!id){
  return res.status(400).json({error:true,message:"ID is not found"})
}

const document = await Document.findById(id)
if(!document){
  return res.status(404).json({error:true,message:"Document is not found"})
}

document.name=name||document.name
document.startDate=startDate||document.startDate
document.endDate=endDate||document.endDate

await document.save()


return res.status(200).json({error:false,message:"تم تحديث البيانات بنجاح"})


    }catch(error){
      console.log(error);
      
return res.status(500).json({error:true,message:"Internl server error"})

      
    }
  }
  



module.exports={
    addDocument,
    getDocuments,
    deleteDocument,
    getDocument,
    updateDocument,
}
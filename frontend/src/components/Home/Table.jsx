import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const Table = ({ documents }) => {
 

useEffect(()=>{
const getDocuments = async () => {
try{
  const {data} = await axios.get(`${apiUrl}/getDocuments`,{withCredentials:true}) 
if(data.error==false){
setDocuments(data.documents)
}

}catch(error){
  toast.error(error.response.data.message)
  console.log(error.response.data.message);
  
}
}
getDocuments()
},[])

const deleteDocument = async (id) => {
  console.log(id);
  
  try{
    const {data} = await axios.delete(`${apiUrl}/deleteDocument`,{
      id
    })
  
    if(data.error==false){
      toast.success(data.message)
    }
  }catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    
  }
}

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-right mb-4 text-blue-600">المستندات</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-right border border-gray-300 rounded-md bg-white">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-2 border"> احداث</th>
              <th className="px-4 py-2 border">تاريخ الانتهاء</th>
              <th className="px-4 py-2 border">تاريخ الابتداء</th>
              <th className="px-4 py-2 border">تاريخ النشر</th>
              <th className="px-4 py-2 border">اسم المستند</th>
            </tr>
          </thead>
          <tbody>
          {documents.map((doc, index) => (
  <tr key={index} className="hover:bg-gray-100 transition">
    <td className="px-4 py-2 border">
      <div className='flex justify-center items-center'>
        <button onClick={()=>deleteDocument(doc._id)} className='mx-2 bg-red-400 text-white py-2 px-4 rounded-md hover:cursor-pointer'>حذف </button>
        <button className='bg-green-400 text-white py-2 px-4 rounded-md hover:cursor-pointer'>تعديل </button>

      </div>
    </td>
    <td className="px-4 py-2 border">{new Date(doc.endDate).toLocaleDateString('ar-JO')}</td>
    <td className="px-4 py-2 border">{new Date(doc.startDate).toLocaleDateString('ar-JO')}</td>
    <td className="px-4 py-2 border">{new Date(doc.createdAt).toLocaleDateString('ar-JO')}</td>
    <td className="px-4 py-2 border">{doc.name}</td>
  </tr>
))}


          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Table

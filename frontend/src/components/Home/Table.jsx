import React, { useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const Table = ({ documents }) => {
 

useEffect(()=>{
const getDocuments = async () => {
try{
  const {data} = await axios.get("http://localhost:4001/getDocuments",{withCredentials:true}) 
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-right mb-4 text-blue-600">المستندات</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-right border border-gray-300 rounded-md bg-white">
          <thead className="bg-blue-100 text-blue-800">
            <tr>
              <th className="px-4 py-2 border">تاريخ الانتهاء</th>
              <th className="px-4 py-2 border">تاريخ الابتداء</th>
              <th className="px-4 py-2 border">تاريخ النشر</th>
              <th className="px-4 py-2 border">اسم المستند</th>
            </tr>
          </thead>
          <tbody>
          {documents.map((doc, index) => (
  <tr key={index} className="hover:bg-gray-100 transition">
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

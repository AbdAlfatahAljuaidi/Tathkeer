import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import {motion} from 'framer-motion'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


const Form = ({setDocuments}) => {

const [name, setName] = useState("")
const [startDate, setStartDate] = useState("")
const [endDate, setEndDate] = useState("")
const [x,setX] = useState(0)
const [y,setY] = useState(0)




useEffect(() => {
  const handleCursor = (e) => {
    console.log(e.clientX,e.clientY);
    setX(e.clientX -20)
    setY(e.clientY - 20)
  
  }
  window.addEventListener("mousemove",handleCursor)
  
  return () => {
    
   window.removeEventListener("mousemove",handleCursor)
  }
  },[])


const addDocument = async () => {
try{
  const {data} = await axios.post(`${apiUrl}/addDoc`,{
    name,startDate,endDate
  },{withCredentials:true})
  if(data.error==false){

    toast.success("تم اضافة المستند")
    setStartDate("")
    setName("")
    setEndDate("")
    setDocuments(prevDocs => [...prevDocs, data.newDocument]);
    console.log(data);
  }
}catch(error){
  toast.error(error.response.data.message)
  console.log(error);
  
}

}



  return (
    <div
      className="shadow-lg rounded-xl p-6 mt-10 w-[90%] md:w-[50%] ml-auto mr-7 bg-white"
      dir="rtl"
    >
         <motion.div
      animate={{
        x,
        y
      }}
      className='cursor  !border-black'></motion.div>
      <h1 className="text-xl font-bold border-b border-gray-300 pb-2 w-fit text-blue-600">
        إضافة مستند جديد
      </h1>

      <div className="mt-6 space-y-6">
        {/* اسم المستند */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            اسم المستند
          </label>
          <input
          onChange={(e)=>setName(e.target.value)}
          value={name}
            type="text"
            placeholder="مثلاً: جواز سفر"
            className="w-full md:w-80 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* التواريخ */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              تاريخ الابتداء
            </label>
            <input
            value={startDate}
            onChange={(e)=>setStartDate(e.target.value)}
              type="date"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              تاريخ الانتهاء
            </label>
            <input
            value={endDate}
            onChange={(e)=>setEndDate(e.target.value)}
              type="date"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

          </div>
        </div>
            <button  onClick={()=>addDocument()} className='bg-blue-600 text-white px-6 py-2 text-sm rounded-sm hover:cursor-pointer'>اضافة المستند</button>
         
       
      </div>
    </div>
  )
}

export default Form

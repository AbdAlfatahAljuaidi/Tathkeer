import React,{useEffect, useState} from 'react';
import Menu from '../Info/Menu';
import { toast } from 'react-toastify';
import axios from 'axios';
import{motion} from 'framer-motion'

const Suggest =  () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [details, setDetails] = useState("")
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


  const suggest = async () => {
    try{
      
  const {data} = await axios.post(`${apiUrl}/suggestSubmit`,{
    name,type,details
  },{
    withCredentials:true
  }
)
  if(data.error==false){
    setName("")
    setType("")
    setDetails("")
    toast.success(data.message)
  }
    }catch(error){
      console.log(error);
      toast.error(error.response.data.message)
      
    }

  }

  return (
<motion.div 

initial={{x:"-100vw"}}
animate={{x:0}}
exit={{y:"-100vh"}}

transition={{
  duration:0.3
}}
          dir='rtl'>
    <Menu />
    <div className="max-w-3xl mx-auto px-4 py-10">

        <motion.div
            animate={{
              x,
              y
            }}
            className='cursor  !border-black hidden md:block'></motion.div>
      <h1 className="text-3xl font-bold mb-6 text-right">أرسل اقتراحك</h1>

      <div className="space-y-5 text-right">
        <div>
          <label className="block mb-1 font-medium">الاسم *</label>
          <input
          value={name}
          onChange={(e)=>setName(e.target.value)}
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اكتب اسمك"
          />
        </div>


        <div>
          <label className="block mb-1 font-medium">نوع الاقتراح *</label>
          <select
          value={type}
          onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">اختر نوع الاقتراح</option>
            <option value="مشكلة">مشكلة</option>
            <option value="ميزة جديدة">ميزة جديدة</option>
            <option value="تحسين تصميم">تحسين تصميم</option>
            <option value="أخرى">أخرى</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">نص الاقتراح *</label>
          <textarea
          value={details}
          onChange={(e)=> setDetails(e.target.value)}
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="اكتب اقتراحك بالتفصيل هنا..."
          ></textarea>
        </div>

        <button
        onClick={()=> suggest()}
         
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          إرسال الاقتراح
        </button>
      </div>
    </div>
    </motion.div>
  );
};

export default Suggest;

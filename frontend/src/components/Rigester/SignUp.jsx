import React,{useEffect, useState} from 'react'
import { Link ,useNavigate } from 'react-router-dom'
import SignUpPhoto from '../../assets/SignUp.jpg'
import axios from 'axios'
import{toast} from 'react-toastify'
import {motion} from 'framer-motion'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


const SignUp = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [x,setX] = useState(0)
  const [y,setY] = useState(0)

  const navigate = useNavigate()


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



  const Sign = async () => {
  try{
    const {data} = await axios.post(`${apiUrl}/SignUser`,{
      email,
      password
     })
     console.log(data);
     if(data.error==false){
      toast.success("User signup successfully")
      console.log("signup");
      navigate("/login")
      
      
     }
     
  }catch(error){
    toast.error(error.response.data.message)
    console.log(error);
    
  }
    
  }
  return (
    <motion.div
    initial={{
      x:"-100vw"
    }}
    animate={{
      x:0
    }}
    transition={{
      duration:0.3
    }}
    exit={{
      y:"-100vh"
    }}
      className="flex justify-center items-center h-screen"
      dir="rtl"
      style={{
        backgroundImage: `url(${SignUpPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
      animate={{
        x,
        y
      }}
      className='cursor'></motion.div>
      <div
      
      className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-lg w-[320px] md:w-[420px]">
        <h1 className="text-blue-600 text-center text-2xl font-extrabold mb-6">
          تسجيل حساب
        </h1>

        <div className="space-y-4">
          <input
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="البريد الإلكتروني"
            className="w-full h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />

          <input
          onChange={(e)=>setPassword(e.target.value)}
            type="password"
            placeholder="كلمة المرور"
            className="w-full h-11 px-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>

        <p className="mt-5 text-sm text-gray-700">
          لدي حساب بالفعل؟{" "}
          <Link to="/Login" className="text-blue-700 font-semibold hover:underline">
            تسجيل الدخول
          </Link>
        </p>

        <motion.button
        transition={{
          duration:0.5,
          typr:"spring",
          stiffness:200,
          mass:0.5,
          damping:5
        }}
      // whileHover={{
      //   scale:1.1
      // }}
      whileTap={{
        scale:0.5
      }}
        onClick={()=>Sign()}
          className="mt-6 w-full bg-blue-600 py-2 text-white text-lg rounded-xl hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600 transition-all duration-300"
        >
          تسجيل
        </motion.button>
      </div>
    </motion.div>
  )
}

export default SignUp

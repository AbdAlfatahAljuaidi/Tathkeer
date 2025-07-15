import React, { useState } from 'react';
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const ForgotPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [disable, setDisable] = useState(false);

  const handleSubmit = async () => {
  try{
    setDisable(true)
    const {data} = await axios.post(`${apiUrl}/ForgotPassword`,{
      email
     })
     if(data.error==false){
      toast.success(data.message)
      navigate("/Login")
     }
  }catch(error){
    setDisable(false)
    toast.error(error.response.data.message)
    console.log(error);
    
  }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-700">
          نسيت كلمة المرور
        </h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1 text-right">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button
        disabled={disable}
        onClick={()=>handleSubmit()}
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 ${disable ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
         ارسال كلمة سر جديدة
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;

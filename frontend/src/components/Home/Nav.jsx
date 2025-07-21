import axios from 'axios';
import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Nav = () => {

  const navigate= useNavigate()
 
  const Logout = async () => {
  try{
    const {data} = await axios.post(`${apiUrl}/Logout`,{credentials: 'include'})
    if(data.error==false){

      toast.success(data.message)
      navigate('/Login')
    }
  }catch(error){
    toast.error(error.response.data.message)
    
  }
  }
  return (
    <div className='flex justify-between items-center py-5 px-10 bg-blue-500 text-white' dir='rtl'>
      <div>
        <Link to={"/"}><h1 className='text-3xl font-bold'>تذكير</h1></Link>

      </div>

       <nav>
                 <ul className='flex gap-5 items-center'>
                     <li><Link className='text-lg' to={"/Suggest"}>الاقتراحات</Link></li>
                     <Link onClick={()=>Logout()}> <li className='bg-white text-blue-500 py-2 px-5 rounded-sm hover:cursor-pointer'>تسجيل خروج</li></Link>
                 </ul>
             </nav>
    </div>
  )
}

export default Nav
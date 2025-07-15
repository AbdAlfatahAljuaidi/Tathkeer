import axios from 'axios'
import React, { useEffect } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
const Active = () => {

    const {email} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
const ActiveAccount = async () => {
  try{
    const {data} = await axios.get(`${apiUrl}/ActiveAccount/${email}`)
    if(data.error==false){
        toast.success(data.message)
        navigate("/Login")
    }
  }catch(error){
    toast.error(error.response.data.message)
    console.log(error);
    
  }

}
ActiveAccount()
    },[])

  return (
    <div>Active</div>
  )
}

export default Active
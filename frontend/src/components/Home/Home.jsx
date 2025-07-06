import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import Form from './Form'
import Table from './Table'
import {motion} from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const Home = () => {
  const [documents, setDocuments] = useState([]);

   // جلب المستندات عند تحميل الصفحة
   useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}getDocuments`, { withCredentials: true });
        if (!data.error) {
          setDocuments(data.documents);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "خطأ في تحميل المستندات");
      }
    };
    fetchDocuments();
  }, []);
  return (
    <motion.div className=''
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
    >
      <Nav />
      <Form setDocuments={setDocuments} />
      <Table documents={documents} />
    </motion.div>
  )
}

export default Home
import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const apiURL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

const UpdateDocument = () => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {
    const getDocument = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/getDocument/${id}`);
        if (data.error === false) {
          setFormData({
            name: data.document.name || '',
            startDate: data.document.startDate
              ? new Date(data.document.startDate).toISOString().split('T')[0]
              : '',
            endDate: data.document.endDate
              ? new Date(data.document.endDate).toISOString().split('T')[0]
              : '',
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getDocument();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const updateDocument = async () => {
    try {
      const { data } = await axios.put(`${apiURL}/updateDocument`, {
        id,
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate,
      });
      if (data.error === false) {
        toast.success(data.message);
        navigate("/home")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'حدث خطأ ما');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Nav />
      <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">تحديث الوثيقة</h2>

        <div className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            type="text"
            placeholder="اسم الوثيقة"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            type="date"
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <div className="flex justify-center items-center">
            <button
              onClick={updateDocument}
              className="w-28 mx-auto bg-blue-500 text-white px-2 py-1 rounded-sm hover:cursor-pointer"
            >
              حدث
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDocument;

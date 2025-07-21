import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivePage = () => {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  
const apiUrl = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;


  useEffect(() => {
    const sendActivationEmail = async () => {
      try {
        const res = await axios.get(`${apiUrl}/sendEmail`, { withCredentials: true });
        setMessage(res.data.message);
      } catch (err) {
        console.error(err);
        setMessage("حدث خطأ أثناء إرسال البريد الإلكتروني");
      } finally {
        setLoading(false);
      }
    };

    sendActivationEmail();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">مرحبًا بك!</h1>
        {loading ? (
          <p className="text-gray-700 text-lg">جاري إرسال رابط التفعيل إلى بريدك الإلكتروني...</p>
        ) : (
          <p className="text-gray-700 text-lg">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ActivePage;

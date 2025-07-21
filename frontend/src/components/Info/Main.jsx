import React from 'react'

import Info from '../../assets/Info.jpg'
import {Link} from 'react-router-dom'
import { SlCalender } from "react-icons/sl";
import { FaComments } from "react-icons/fa";
import { AiFillSafetyCertificate } from "react-icons/ai";




const Main = () => {


  const features = [
    {
      title: "تذكيرات تلقائية",
      description: "استقبل تذكيرات تلقائية عبر البريد الالكتروني",
      icon: <SlCalender className="text-primary" />
    },
    {
      title: "اقتراحات ذكية",
      description: "يتيح لك النظام تقديم اقتراحات لتطوير وتحسين الموقع",
      icon: <FaComments  className="text-primary" />
    },

    {
      title: "تخزين آمن",
      description: "يتم حفظ بياناتك بأعلى معايير الأمان والتشفير",
      icon: <AiFillSafetyCertificate className="text-primary" />
    },
  ];
  
  return (
    <div dir='rtl' className='md:mt-20 mt-7'>
        <div className='flex justify-evenly items-center'>
        <div >
      <h1 className='text-3xl font-bold'> لا تفوت مواعيد التجديد </h1>
      <h1 className='text-3xl font-bold'>الوثائق الخاصة بك ابدا</h1>
      <p className='w-[600px] mt-4'>يساعدك تطبيق تذكير بانتهاء الوثائق على البقاء منظما و في الوقت المحدد مع تذكيرات تلقائية تساعدك على تجنب تاخر تجديد الوثائق و تحسين الالتزام بالقانون</p>
     <Link to={"/SignUp"}> <button className='bg-blue-500 text-white py-3 px-7 rounded-sm mt-5 hover:cursor-pointer'>جرب الأن</button></Link>

        </div>

        <div>
            <img src={Info} className='w-[500px] h-[300px]' alt="" />
        </div>
        </div>

       
        <div className="px-4 md:px-[150px] py-8">
  <h1 className="text-2xl font-bold mb-6 text-right">المميزات الرئيسية</h1>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map((feature, index) => (
    <div
      key={index}
      className="border border-gray-300 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300"
    >
      <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-2">
        {feature.icon} {feature.title}
      </h2>
      <p className="text-gray-600">{feature.description}</p>
    </div>
  ))}
</div>

</div>


      
    </div>
  )
}

export default Main
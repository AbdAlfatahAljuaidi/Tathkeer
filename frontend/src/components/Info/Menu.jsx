import React from 'react'
import {Link} from 'react-router-dom'


const Menu = () => {
  return (
    <div className='flex justify-between items-center py-5 px-10 border border-gray-b' dir='rtl'>
      <Link to={"/"}>
      <h1 className='text-2xl font-bold'>تذكير</h1>
      </Link> 
        <nav>
            <ul className='flex gap-5 items-center'>
                <li><Link className='text-lg' to={"/Suggest"}>الاقتراحات</Link></li>
                <Link to={"/Login"} > <li className='bg-blue-500 text-white py-2 px-5 rounded-sm hover:cursor-pointer'>تسجيل حساب</li></Link>
            </ul>
        </nav>
    </div>
  )
}

export default Menu
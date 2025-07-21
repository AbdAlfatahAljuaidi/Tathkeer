import React, { useEffect, useState } from 'react'
import Main from './Main'
import Menu from './Menu'
import {motion} from 'framer-motion'

const Info = () => {


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



  return (
    <motion.div
    
initial={{x:"-100vw"}}
animate={{x:0}}
exit={{y:"-100vh"}}

transition={{
  duration:0.3
}}
    >
       <motion.div
                  animate={{
                    x,
                    y
                  }}
                  className='cursor  !border-black hidden md:block'></motion.div>
           
        <Menu />
        <Main />
    </motion.div>
  )
}

export default Info
import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";

const DisplayImage = ({imgUrl,onClose}) => {
  return (
    <div className='flex justify-center w-full h-full p-[100px] z-5 absolute top-0 left-0 bg-[rgba(0,0,0,0.7)]' >
        <div className='w-full h-full bg-white relative'>
        < IoIosCloseCircle className='absolute top-2 right-2 text-2xl' onClick={onClose}/>
        <img src={imgUrl} alt='' className='w-full h-full z-6 object-contain'/>
        </div>
    </div>
  )
}

export default DisplayImage
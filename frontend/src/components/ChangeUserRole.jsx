import React, { useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from 'react-toastify';

const ChangeUserRole = ({userID,name,email,role,onClose,fetchUsers}) => {
  const [userRole,setUserRole]=useState(role)

  const closeTab =()=>{
    onClose()
  }
  const handleOnChangeSelect=(e)=>{
     setUserRole(e.target.value)
     console.log(e.target.value);
  }
  const updateUserRole=async()=>{
     try {
      const response = await fetch('http://localhost:8000/api/update-user',{
       method:'POST',
       credentials:'include',
       headers:{
        'content-type':'application/json'
       },
       body:JSON.stringify({
        role:userRole,
        userId:userID
       })
      })
      const responseData = await response.json()
      if(responseData.success){
        toast.success(responseData.message, {
          className: 'custom-toast',
        });
        closeTab();
        fetchUsers();
      }
      if(responseData.error){
        toast.error(responseData.message, {
          className: 'custom-toast',
        });
        closeTab()
      }

     } catch (error) {
      
     }
  }
  return (
    <div className='absolute flex items-center justify-center top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] '>
  <div className='absolute  bg-[#fbf3ed] customShadow2 rounded-[10px] w-[300px] py-8 px-12 flex flex-col gap-4'>
      <div className='absolute cursor-pointer right-2 top-2 text-[20px] hover:text-[#353535]' onClick={()=>{onClose()}}><IoIosCloseCircle /></div>
        <h1 className='text-lg font-medium'>Change User Role</h1>
        <p className='text-sm'>Name : {name}</p>
        <p className='text-sm'>Email : {email}</p>
        <div className='flex justify-between items-center h-full w-full'>
        <p className='text-sm font-medium'>Role :</p>
        <select value={userRole} onChange={handleOnChangeSelect} className='text-center px-0 py-1 w-[110px] border border-gray-500 focus:outline-none'>
  <option value="ADMIN">ADMIN</option>
  <option value="USER">USER</option>
  </select>
        </div>
        <button onClick={updateUserRole} className='text-sm py-1 w-[120px]   text-[#ffff] bg-[#3e3d3d] hover:bg-[#5c5c5c]'>Submit</button>
    </div>
    </div> 
  )
}

export default ChangeUserRole
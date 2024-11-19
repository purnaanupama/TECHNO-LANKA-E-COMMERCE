import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { RiShoppingBag3Fill } from "react-icons/ri";
import { HiUsers } from "react-icons/hi";

const Admin = () => {
  const user = useSelector(state=>state.user.user);
  const navigate = useNavigate();
  useEffect(()=>{
   if(user?.role !== 'ADMIN'){
     navigate("/")
   }
  },[user])
  return (
    <div className='min-h-[calc(100vh-80px)] flex'>
      <aside className='bg-[#fcefe7] min-h-full w-full max-w-[270px] customShadow1'>
        <div className='w-full pt-7 flex items-center justify-center flex-col gap-3'>
        <img className="h-[100px] cursor-pointer rounded-full mx-auto" src={user.profileImage?user.profileImage:"assets/user.png"} alt={user.name} />
        <p className='capitalize '>{user.name}</p>
        <p className='text-sm'>{user?.role}</p>
        </div>
        {/*Navigation*/}
        <div>
        <nav className='flex flex-col items-center p-4 w-[100%] gap-4'>
           <Link to={'all-users'} className='px-5 py-3 w-[200px] text-sm text-slate-800 rounded flex items-center justify-between bg-[#f7b380] hover:bg-[#fdc896] customShadow2'>All Users <HiUsers className='text-xl'/></Link>
           <Link to={'products'} className='px-5 py-3 text-sm w-[200px] text-slate-800 rounded flex items-center justify-between bg-[#f7b380] hover:bg-[#fdc896] customShadow2' >Products <RiShoppingBag3Fill className='text-xl'/></Link>
        </nav>
        </div>
      </aside>
      <main className='px-7 py-5'>
       <Outlet/>
      </main>
    </div>
  )
}

export default Admin
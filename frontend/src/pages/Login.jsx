import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Context from '../context/context';

const Login = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const {fetchUserDetails,fetchCartItemCount} = useContext(Context)


  const [data,setData]=useState({
    email:"",
    password:""
  });
  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setData((prev)=>{
      return{
        ...prev,
         [name]:value
      }})
      console.log("data",data);
    }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('http://localhost:8000/api/login',{
        method:'POST',
        credentials:'include',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(data)
      })
      const responseData = await response.json()
      if(responseData.success){
        toast.success("logged in successfully", {
          className: 'custom-toast',
        });
        navigate("/");
        fetchUserDetails()
        fetchCartItemCount()
        setLoading(false)
      }
      if(responseData.error){
        toast.error(responseData.message, {
          className: 'custom-toast',
        });
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
   
  }
 

  return (
    <section id='login'>
        <div className='mx-auto container p-4'>
           <div className=' p-2 w-full shadow-lg bg-slate-200 max-w-md mx-auto rounded mt-12'>
              <div className='w-full flex items-center justify-center'>
              <p className='text-2xl text-center w-[320px] p-4 mt-5 font-normal border-2 border-gray-400'>Login to Techno Lanka</p> 
              </div>
              <form>
                <div className='flex flex-col gap-10 p-10'>
                    <input className='shadow-md pl-4 pr-4 pt-2 text-sm pb-2 outline-none bg-slate-200' 
                    type="email" 
                    placeholder='Enter email'
                    value={data.email}
                    name='email'
                    onChange={handleOnChange}/>
                    <div className='relative h-full w-full' >
                    <input className='shadow-md w-[100%] pl-4 pr-4 text-sm  cursor-pointer pt-2 pb-2 outline-none bg-slate-200' 
                    type={showPassword?'text':'password'} 
                    placeholder='Enter password'
                    value={data.password}
                    name='password'
                    onChange={handleOnChange}
                    />
                    {showPassword? <img className='absolute right-2 top-2 h-6' src="assets/openEye.png" alt="open" onClick={()=>setShowPassword(prev=>!prev)}/>
                    : <img className='absolute right-2 top-2 h-6' src="assets/closeEye.png" alt="close" onClick={()=>setShowPassword(prev=>!prev)}/>}
                      <Link to={'/reset-password'}><p className='mt-4 pl-2 text-right text-sm cursor-pointer text-gray-600'>Forgot password</p></Link>
                    </div>
                    <button onClick={handleSubmit} className='bg-gray-700 text-gray-200 w-[200px] cursor-pointer h-10 rounded shadow-2xl mx-auto font-medium text-via-red-950 hover:bg-gray-600'>{loading? 'Loading...':'Login'}</button>
                    <p className='mt-4 pl-2 text-sm text-gray-600'>Dont have an account ? <Link to={'/register'}><span className='text-gray-800 cursor-pointer'>Register</span></Link></p>
                </div>
              </form>
           </div>
        </div>
    </section>
  )
}

export default Login
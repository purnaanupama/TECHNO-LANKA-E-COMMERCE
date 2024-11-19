import {useState} from 'react'
import { Link } from 'react-router-dom';
import ImageToBase64 from "../utils/imageUpload"
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';

const Register = () => {
  const [showPassword,setShowPassword]=useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();
  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    profileImage:""
  });
  const handleOnChange=(e)=>{
    const {name,value}=e.target
    setData((prev)=>{
      return{
        ...prev,
         [name]:value
      }})
    }
  const handleUploadImage=async(e)=>{
     const file =e.target.files[0]
     const imagePic = await ImageToBase64(file)

     setData((prev)=>{
      return{
        ...prev,
        profileImage:imagePic
      }
     })
     console.log("file",data);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(data.confirmPassword !== data.password){
     return toast.error("passwords do not match", {
        className: 'custom-toast',
      });
    }
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        setLoading(false);
        throw new Error('Network response was not ok');
      }
      
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        toast.success("registration success", {
          className: 'custom-toast',
        });
        setLoading(false);
        navigate("/login");
      }
      if (responseData.error) {
        toast.error(responseData.message, {
          className: 'custom-toast',
        });
        setLoading(false);
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      setLoading(false);
    }
  };


  return (
    <section id='register'>
    <div className='mx-auto mb-10 container p-4'>
       <div className=' p-2 w-full shadow-lg bg-slate-200 max-w-md mx-auto rounded mt-12'>
          <div className='w-full flex items-center justify-center'>
          <p className='text-2xl text-center w-[350px] p-4 mt-5 font-normal border-2 border-gray-400'>Register to Techno Lanka</p> 
          </div>
          <div className='mt-5 flex flex-col items-center gap-3'>
          <img className='rounded-full w-[80px] h-[80px] object-cover cursor-pointer' src={data.profileImage || "/assets/user.png"} alt="profile-image" />
          <form>
          <label for="upload" className="w-[170px] p-2 bg-slate-600 text-white rounded text-xs hover:bg-slate-700 text-center cursor-pointer inline-block">
           Upload profile Image
         </label>
           <input type="file" id="upload" className="hidden" onChange={handleUploadImage}/>
          </form>
        </div>
          <form>
            <div className='flex flex-col gap-10 p-10'>
            <input className='shadow-md pl-4 pr-4 pt-2 text-sm pb-2 outline-none bg-slate-200' 
                type="text" 
                required
                placeholder='Enter your name'
                value={data.name}
                name='name'
                onChange={handleOnChange}/>
                <input className='shadow-md pl-4 pr-4 pt-2 text-sm pb-2 outline-none bg-slate-200' 
                type="email" 
                placeholder='Enter email'
                required
                value={data.email}
                name='email'
                onChange={handleOnChange}/>
                <div className='relative h-full w-full' >
                <input className='shadow-md w-[100%] pl-4 pr-4 text-sm  cursor-pointer pt-2 pb-2 outline-none bg-slate-200' 
                type={showPassword?'text':'password'} 
                placeholder='Enter password'
                value={data.password}
                required
                name='password'
                onChange={handleOnChange}
                />
                {showPassword? <img className='absolute right-2 top-2 h-6' src="assets/openEye.png" alt="open" onClick={()=>setShowPassword(prev=>!prev)}/>
                : <img className='absolute right-2 top-2 h-6' src="assets/closeEye.png" alt="close" onClick={()=>setShowPassword(prev=>!prev)}/>}
                </div>
                <input className='shadow-md w-[100%] pl-4 pr-4 text-sm  cursor-pointer pt-2 pb-2 outline-none bg-slate-200' 
                type='password'
                placeholder='Confirm password'
                value={data.confirmPassword}
                required
                name='confirmPassword'
                onChange={handleOnChange}
                />
                <button className='bg-gray-700 text-gray-200 w-[200px] cursor-pointer h-10 rounded shadow-2xl mx-auto text-via-red-950 hover:bg-gray-600' onClick={handleSubmit}>{loading?'Loading...':'Register'}</button>
                <p className='mt-4 pl-2 text-sm text-gray-600'>Have an account ? <Link to={'/login'}><span className='text-gray-800 cursor-pointer'>Login</span></Link></p>
            </div>
          </form>
       </div>
    </div>
</section>
  )
}

export default Register

import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CSS/toast.css'
import { useEffect, useState } from 'react';
import Context from './context/context';
import {useDispatch} from 'react-redux'
import { setUserDetails } from './store/userSlice';

function App() {
const [cardItemCount,setCardItemCount]=useState(0)
const dispatch = useDispatch();
  const fetchUserDetails = async()=>{
    try {
      const response = await fetch("http://localhost:8000/api/user",{
        method:'GET',
        credentials:'include'
      });
      const responseData = await response.json();
       if(responseData.success){
        dispatch(setUserDetails(responseData.user))
       }
    } catch (error) {
       console.log(error);
    }

  }
  const fetchCartItemCount = async()=>{
    const response = await fetch('http://localhost:8000/api/cart/get-item-count',{
      method:'get',
      headers:{
        'content-type':'application/json'
      },
      credentials:'include'
    })
    const responseData = await response.json()
    if(responseData.data?.count){
      setCardItemCount(responseData?.data.count)
    }
    
  }
  useEffect(()=>{
    /*user details*/
    fetchUserDetails();
    /*user cart item count*/
    fetchCartItemCount();
  },[])
  //addition of two number
   
  return (
   <div>
   <Context.Provider value={{fetchUserDetails,cardItemCount,fetchCartItemCount}}>
   <ToastContainer />
   <Header/>
   <main className='min-h-[calc(100vh-68px)] pt-16'>
   <Outlet/>
   </main>
   <Footer/>
   </Context.Provider>
   </div>
  );
}

export default App;

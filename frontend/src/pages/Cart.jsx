import {useEffect, useState,useContext} from 'react'
import Context from '../context/context';
import { IoMdTrash } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";

const Cart = () => {
  const [data,setData]= useState([]);
  const [loading,setLoading]=useState(false);
  const {fetchCartItemCount} = useContext(Context)

  const fetchData = async()=>{
    
    const response = await fetch('http://localhost:8000/api/cart/get-cart-items',{
    method:'GET',
    headers:{
        'content-type':'application/json'
    },
    credentials:'include'
    });
    const responseData = await response.json()
    if(responseData.success){
        setData(responseData.data)
        console.log(responseData);  
    }
    if(responseData.error){
        console.log(responseData.message);
    }
  }
  const handleLoading=async()=>{
    await fetchData();
  }
  useEffect(()=>{
    setLoading(true)
    handleLoading();
    setLoading(false)
  },[])

  const increaseQty = async(id,qty)=>{
    const response = await fetch('http://localhost:8000/api/cart/update-cart',{
      method: 'POST',
      credentials:'include',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        _id:id,
        quantity: qty+1
      })
    })
    const responseData = await response.json();
    console.log(responseData);
    
    if(responseData.success){
      fetchData();
    }
  }



  const decreaseQty = async(id,qty)=>{
   if(qty >= 2){
    const response = await fetch('http://localhost:8000/api/cart/update-cart',{
      method: 'POST',
      credentials:'include',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify({
        _id:id,
        quantity: qty-1
      })
    })
    const responseData = await response.json();
    console.log(responseData);
    
    if(responseData.success){
      fetchData();

    }
   }
  }

  const deleteCartProduct = async(id)=>{

      const response = await fetch('http://localhost:8000/api/cart/delete-cart-item',{
        method: 'DELETE',
        credentials:'include',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify({
          _id:id,
        })
      })
      const responseData = await response.json();
      console.log(responseData);
      
      if(responseData.success){
        fetchData();
        fetchCartItemCount();
      }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  const totalQty = data.reduce((prev,curr)=>prev+curr.quantity,0)
  const totalPrice = data.reduce((prev,curr)=>prev+(curr.quantity*curr?.productId?.sellingPrice),0)
 

  return (
    <div className='container mx-auto'>
       <div className='text-center text-lg my-3'>
      {
           data.length===0 && !loading &&(
        <p className='bg-white py-5 border-[1px] border-[#cacaca]  font-light text-[#838383]'>Your Cart Items Will Display Here</p>
    )
         }
       </div>
      <div className='p-[20px]'>
        {
            loading?(
                <div className='flex w-[100%] h-[500px] gap-[20px] p-[20px] customShadow1 bg-[#ffffff]'>
                       {/*All cart items display*/}
                 <div className='flex flex-col w-[60%] h-[100%] bg-slate-200 animate-pulse'>

                 </div>
                       {/*Cart other details*/}
                 <div className='flex flex-col gap-6 '>
                 <p className='py-3 bg-slate-200 w-[450px] h-[10px] flex items-center animate-pulse'></p>
                 <p className='py-3 bg-slate-200 w-[450px] h-[10px] flex items-center animate-pulse'></p>
                 <p className='py-3 bg-slate-200 w-[450px] h-[10px] flex items-center animate-pulse'></p>
                 <p className='py-3 bg-slate-200 w-[450px] h-[10px] flex items-center animate-pulse'></p>
                 <p className='py-3 bg-slate-200 w-[450px] h-[10px] flex items-center animate-pulse'></p>
                 <p className='py-3 bg-slate-200 w-[450px] h-[10px] flex items-center animate-pulse'></p>
                 <p className='py-3 bg-slate-200 w-[450px] h-[200px] flex items-center animate-pulse'></p>
                 </div>
                </div>
            ):(
            <div className='flex w-[100%] h-[100%] gap-[70px] p-[20px]'>
                {/*All cart items display*/}
               
             <div className='flex flex-col w-[60%] h-[100%] bg-[#fff] gap-4'>
             <p className='mb-[10px]'>Cart Products[{data.length}]</p>
             {data &&
                data.map((item,index)=>(
                    <div className='bg-[#fff] cardShadow h-[150px] p-2 flex gap-[10px]' key={index}>
                    <div className='h-full w-[150px] p-2'>
                    <img className='h-full w-full object-contain' src={item.productId.productImage[0]} alt="phone" />
                    </div>
                    <div className='w-full h-full px-4 py-3 flex flex-col justify-between'>
                     <div className='w-full flex items-center justify-between'>
                       <p>{item.productId.productName}</p>
                       <div className='p-1 rounded hover:bg-[#fa6464]' onClick={()=>{deleteCartProduct(item._id)}}><IoMdTrash className='text-xl cursor-pointer'/></div>
                     </div>
                     <p className='text-sm text-[#868585]'>{item.productId.category}</p>
                     <div className='w-full flex items-center justify-between'>
                        <p className='font-bold'>{formatCurrency(item.productId.sellingPrice)}</p>
                        <p className='text-[#f35303]'>{formatCurrency(item.productId.sellingPrice * item.quantity)}</p>
                     </div>
                     <div className='flex items-center gap-4 mt-[1px]'>
                     <div className='bg-[#ffffff] border border-[#c3c3c3] cursor-pointer p-[2px] hover:bg-slate-200' onClick={()=>increaseQty(item._id,item.quantity)}><FiPlus/></div>
                     <p>{item.quantity}</p>
                     <div className='bg-[#ffffff] border border-[#c3c3c3] p-[2px] cursor-pointer hover:bg-slate-200' onClick={()=>decreaseQty(item._id,item.quantity)}><LuMinus/></div>
                     </div>
                    </div>
                  </div>
                )
               )
             
             }
            </div>
                {/*Cart other details*/}
            <div className='w-[40%]'>
              <div className='w-full] p-4 bg-[#f9a27f]'>Cart Summary</div>
              <div className='flex items-center justify-between p-4'>
                <p>Quantity</p>
                <span>{totalQty}</span>
              </div>
              <div className='flex items-center justify-between p-4 border border-b-2'>
                <p>Total Price</p>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className='flex items-center justify-between text-center cursor-pointer p-4 bg-[#96a6fe] hover:bg-[#828dcb]'>
                <p className='text-center w-full font-semibold'>Proceed to payment</p>
              </div>
            </div>
            </div>
            )

         
            
        }
      </div>
    </div>
  )
}

export default Cart
import React from 'react'
import { toast } from 'react-toastify';

const DeleteDialog = ({onClose, productData,fetchData}) => {

 const handleDeleteProduct=async()=>{
    try {
        const response = await fetch(`http://localhost:8000/api/product/delete-product/${productData._id}`,{
            method: 'DELETE',
            credentials:'include',
            headers: {
             'Content-Type': 'application/json'
             },  
        })
        const responseData = await response.json()
        if(responseData.success){
            onClose();
            toast.success("Product deleted", {
                className: 'custom-toast',
              });
            fetchData();
        }
        if(responseData.error){
            onClose();
            toast.success("Failed to delete", {
                className: 'custom-toast',
              });
              console.log(responseData.message);
               }   
     } catch (error) {
        console.log(error);
     }
 }

    
  return (
    <div className='fixed bg-[rgba(0,0,0,0.5)] left-0 right-0 top-0 h-full w-full flex justify-center items-center'>
      <div className='max-w-[500px] max-h-[400px] h-[200px] bg-white p-[50px] rounded flex justify-center items-center flex-col gap-[30px]'>
        <p>
            Are you sure you want to delete this product ?
        </p>
        <div className='flex justify-center items-center gap-10'>
            <button className='py-2 px-1 bg-black w-[100px] text-white hover:bg-[#333]' onClick={handleDeleteProduct}>Yes</button>
            <button className='py-2 px-1 bg-black w-[100px] text-white hover:bg-[#333]' onClick={()=>{onClose()}}>No</button>
        </div>
      </div>
    </div>
  )
}

export default DeleteDialog
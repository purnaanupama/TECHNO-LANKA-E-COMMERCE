import React, { useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
import SearchResultCard from '../components/SearchResultCard'

const SearchProduct = () => {
 
 const query = useLocation()
 const [data,setData]=useState([])
 const [loading, setLoading]=useState(false)


 
 const fetchProduct=async()=>{
    try {
        setLoading(true)
        const response = await fetch(`http://localhost:8000/api/product/search${query.search}`,{
        method:'GET',
        headers:{
            'content-type':'application/json'
          },
        });
        const responseData = await response.json();
        if(responseData.success){
            console.log(responseData);
            setLoading(false)
            setData(responseData.data)
        } 
        if(responseData.error){
            console.log(responseData.message);
            setLoading(false)
        }
         
    } catch (error) {
       console.log(error);
       setLoading(false)
    }
 }
 useEffect(()=>{
    fetchProduct();
 },[query.search])
  return (
    <div className='container w-full h-full mx-auto p-4'>
        {
          loading && (
            <div className='w-[100%] h-[100vh] flex justify-center mt-[260px]'>
            <img src="assets\spinner.gif" alt="" className='flex items-center justify-center h-[100px] w-[100px] object-cover'/>
            </div>
          )
        }
        {!loading &&
             <p className='w-full text-left p-6'>Search Results : {data.length}</p>
        }
        {
         data.length===0 && !loading &&(
            <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
         )
        }
        {
            !loading && data.length > 0 &&(
                 <SearchResultCard loading={loading} data={data}/>
            )
        }
   
    </div>
  )
}

export default SearchProduct
import React, { useCallback, useEffect, useState, useContext } from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import AddToCart from '../helpers/AddToCart';
import Context from '../context/context';


const ProductDetails = () => {
  const [data,setData]=useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: 0,
    sellingPrice: 0,
  })
  const [loading,setLoading]=useState(false)
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage,setActiveImage] = useState("")
  const params = useParams();
  const [zoomImageCoordinates,setZoomImageCoordinates]=useState({
    x:0,
    y:0
  })
  const [zoomImage,setZoomImage]=useState(false)
  const {fetchCartItemCount} = useContext(Context)
  const navigate = useNavigate()

  const fetchProductDetails=async()=>{
    try {
        setLoading(true)
        const response = await fetch('http://localhost:8000/api/product/get-product-details',{
        method:'POST',
        headers:{
          'content-type':'application/json',
        },
        body:JSON.stringify({
          productId:params?.id
        })
      })
      const responseData = await response.json();
      console.log(responseData);
      
      if(responseData.success){
        setLoading(false)
        setData(responseData.data)
        setActiveImage(responseData.data.productImage[0])
      }
      else{
        setLoading(false)
        console.log(responseData.message);
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
   fetchProductDetails();
  },[params])

  const handleMouseEnterProduct=(imageURL)=>{
    setActiveImage(imageURL)
  }
  const handleZoomImage=useCallback((e)=>{
    setZoomImage(true)
    const {left, top, width, height} = e.target.getBoundingClientRect()
    const x = (e.clientX - left)/width
    const y = (e.clientY - top)/height
    setZoomImageCoordinates({
      x:x,
      y:y
    })
  },[zoomImageCoordinates])

  const handleLeaveImageZoom = ()=>{
    setZoomImage(false)
  }
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };
  
  const handleAddToCart = async(e,id)=>{
     await AddToCart(e,id)
     fetchCartItemCount()
  }
  const handleBuyItem = async(e,id)=>{
     await AddToCart(e,id)
     fetchCartItemCount()
     navigate('/cart')
  }

  return (
    <div className='container mx-auto p-4 mt-5 mb-5'>
      <div className='min-h-[200px] flex flex-col lg:flex-row gap-10'>
        {/*product image*/}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
           <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 customShadow2 relative'>
                <img src={activeImage} alt="img" className='h-full w-full object-scale-down mix-blend-multiply p-10' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>
                {/*product zoom*/}
                {zoomImage &&(
                   <div className='absolute min-w-[500px] min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0 overflow-hidden'>
                        <div  
                           className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply object-scale-down p-[20px] scale-80'
                             style={{
                               backgroundImage:`url(${activeImage})`,
                               backgroundPosition: `${zoomImageCoordinates.x*100}% ${zoomImageCoordinates.y*100}%`,
                               backgroundRepeat:'no-repeat'
                                    }}>
                                 </div>
                             </div>
                )}
               
           </div>
           <div className='h-full'>
            {loading?
            (<div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
              {productImageListLoading.map((el,index)=>{
              return (
                <div key={index} className='h-20 w-20 bg-slate-200 rounded animate-pulse'>

                </div>
              )
            })}
            </div>)
            :
            (<div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
              {data.productImage.map((image,index)=>{
              return (
                <div key={index} className='h-20 w-20 bg-slate-200 rounded p-1 cursor-pointer'>
                   <img className='w-full h-full object-scale-down mix-blend-multiply' src={image} onClick={()=>{handleMouseEnterProduct(image)}} alt="img"/>
                </div>
              )
            })}
            </div>)}
           </div>
        </div>
         {/*product details*/}
         <div className='flex flex-col justify-center gap-4'>
          <p className='text-2xl px-6 py-3 font-semibold bg-[#ffa167] rounded'>{data.productName}<br/>
          <span className='text-sm font-medium px-2 py-1 text-[#f6eae4] bg-[#f86910]'>{data.brandName}</span>
          </p>
          <p className='text-[#464545] text-sm'>{data.category}</p>
          <div className='flex gap-2 items-center'>
            <p>Ratings :</p>
            <div className='flex text-[#e86006]'><FaStar/><FaStar/><FaStar/><FaStar/><FaRegStarHalfStroke/></div>
          </div>
          <p className='text-lg font-semibold'>{formatCurrency(data.sellingPrice)}<span className='ml-4 font-normal text-[#565656] line-through'>{formatCurrency(data.price)} </span></p>
          <div className='text-md flex gap-4'>
          <button className='py-1 px-2 bg-[#f86910] w-[100px] text-white hover:bg-[#f98943]' onClick={(e)=>handleBuyItem(e,data._id)}>Buy now</button>
          <button className='py-1 px-2 border border-black bg-[#ffffff] text-black hover:border-white hover:bg-[#1f1f1f] hover:text-white' onClick={(e)=>handleAddToCart(e,data?._id)}>Add to Cart</button>
          </div>
          <div className='mt-2 flex flex-col gap-2'>
          <p className='font-semibold'>Description :</p>
          <p>{data.description} </p>
          </div>
         
         </div>
      </div>
      {data.category &&  <CategoryWiseProductDisplay category={data.category} heading={"Recommended Products"} slice={6} />}
     <Link className='px-6 py-1 text-sm text-white rounded-md bg-[#262626]' to={`/category-product?category=${data.category}`}>View more products...</Link>
    </div>
  )
}

export default ProductDetails
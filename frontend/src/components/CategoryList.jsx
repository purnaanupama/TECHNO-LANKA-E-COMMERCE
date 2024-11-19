import {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'


const CategoryList = () => {

const [categoryProduct,setCategoryProduct]=useState([])
const [categoryProductLoading,setCategoryProductLoading]=useState(false)

const fetchCategoryProduct = async()=>{
  setCategoryProductLoading(true)
  const response = await fetch('http://localhost:8000/api/product/product-category',{

  })

  const responseData = await response.json()
  if(responseData.success){
    setCategoryProductLoading(false)
    setCategoryProduct(responseData.data)
    console.log(categoryProduct);
  }
  else{
    setCategoryProductLoading(false)
    console.log(responseData.message);
  }

}
useEffect(()=>{
  fetchCategoryProduct();
},[])
  return (
    <div className='w-full items-center justify-center'>
      {
        categoryProductLoading?
        <div className='w-full flex items-center justify-center h-[100px]'>
        <img src='assets/loader.gif' alt="loadingAnimation" key={categoryProduct+1}/>
        </div>:(<div className='flex items-center gap-4 p-[20px] justify-around'>{
           categoryProduct.map((product,index)=>{
            return(
              <Link to={`/category-product?category=${product.category}`} index={index}>
               <div
              className='p-2 w-full flex flex-col gap-3 items-center cursor-pointer transform transition duration-300 hover:scale-105'
              style={{ boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.1), -1px -1px 5px rgba(0, 0, 0, 0.05)' }}
            >
              <div className='w-20 h-20 flex items-center justify-center overflow-hidden'>
                <img src={product?.productImage[0]} alt='productImage' className='h-full w-full object-contain' />
              </div>
              <p className='text-sm capitalize'>{product.category}</p>
            </div>
            
              </Link>
             
            )
          })}
        </div>
          
        )
       
      }
    </div>
  )
}

export default CategoryList
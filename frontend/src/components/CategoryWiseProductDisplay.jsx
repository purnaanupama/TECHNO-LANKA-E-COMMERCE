import React, { useEffect, useState, useRef, useContext } from 'react';
import '../App.css';
import fetchCategoryWiseProduct from '../helpers/GetProductWiseCategory';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import { useParams } from 'react-router-dom';
import Context from '../context/context';
import scrollTop from '../helpers/ScrollToTop';


const CategoryWiseProductDisplay = ({ category, heading, slice }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null)
  const { id } = useParams();
  const {fetchCartItemCount} = useContext(Context)

  const handleAddToCart = async(e,id)=>{
    await AddToCart(e,id)
    fetchCartItemCount();
  }

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    if (categoryProduct.success) {
      setLoading(false);
      setData(categoryProduct.data);
    }
    if (categoryProduct.error) {
      setLoading(false);
      console.log(categoryProduct.message);
    }
  };

  useEffect(() => {
    fetchData();
  },[id]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  return (
    <div className="relative mx-auto px-4 my-6 w-full">
      <div className="relative">
        <div className="text-1xl w-[300px] font-semibold py-[5px] px-4 bg-[#f6933d] slanted">
          {heading}
        </div>
        <div className="w-full h-[2px] bg-[#f6933d]"></div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center p-4 gap-4">
         {
          loading?(
            loadingList.map((product, index) => (
              <div key={index} className=" flex-shrink-0 cursor-pointer cardShadow hover:customShadowHover">
                  <div className='flex w-[350px]'>
                  <div className="w-[175px] h-[200px] bg-slate-300 m-4  animate-pulse overflow-hidden">
                 
                </div>
                <div className="h-[170px] w-[175px] relative">
                  <p className="pt-6 px-4 line-clamp-2 bg-slate-300  animate-pulse mt-4 mr-4"></p>
                  <p className="text-sm px-4 text-[#9c4d15] bg-slate-300  animate-pulse mt-4 mr-4"></p>
                  <button className='text-xs mb-4 bottom-[40px] right-4 absolute rounded animate-pulse bg-slate-300 p-4 w-[100px]'></button>
                  <p className="p-4 right-4  bottom-2 font-semibold w-[120px]  animate-pulse bg-slate-300 text-[#2d2d2d] absolute">
                    
                  </p>
                </div>
                  </div>
               
              </div>
            ))   
          ):(
            data.slice(0,`${slice}`).map((product, index) => (
              <Link to={`/product/${product._id}`}  key={index} className=" flex-shrink-0 cursor-pointer cardShadow hover:customShadowHover" onClick={scrollTop}>
                  <div className='flex w-[350px]'>
                  <div className="w-[175px] h-[200px] overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="w-full h-full object-contain transform transition py-6 duration-300 hover:scale-105"
                  />
                </div>
                <div className="h-[170px] w-[175px] relative">
                  <p className="pt-6 px-4 line-clamp-2">{product.productName}</p>
                  <p className="text-sm px-4 text-[#9c4d15]">{product.brandName}</p>
                  <button className='px-4 py-1 text-xs bg-[#f0873c] bottom-[40px] right-4 absolute rounded hover:bg-[#f89a57] ' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                  <p className="px-4 bottom-2 font-semibold w-full text-right text-[#2d2d2d] absolute">
                    {formatCurrency(product.sellingPrice)}
                  </p>
                </div>
                  </div>
          </Link>
            ))
          )
        }
        </div>

      
      </div>
  );
};

export default CategoryWiseProductDisplay ;

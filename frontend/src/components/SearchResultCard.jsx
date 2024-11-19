import React, {useContext } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import Context from '../context/context';
import scrollTop from '../helpers/ScrollToTop';

const SearchResultCard = ({ loading, data=[] }) => {
  const loadingList = new Array(13).fill(null)
  const {fetchCartItemCount} = useContext(Context)

  const handleAddToCart = async(e,id)=>{
    await AddToCart(e,id)
    fetchCartItemCount();
  }


  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  return (
      <div className='flex w-[100%] flex-wrap justify-center p-6 items-center gap-10 mb-[20px]'>
      {
          loading?
          (   loadingList.map((product, index) => (
            <div key={index} className="h-[350px] w-[200px] flex-shrink-0 cursor-pointer cardShadow hover:customShadowHover">
              <div className="w-full h-[200px] overflow-hidden bg-slate-300 animate-pulse">
               
              </div>
              <div className="h-[150px] bg-white relative">
                <p className="text-sm mt-2 pt-5 px-4 mx-4 line-clamp-2 bg-slate-300 animate-pulse">{}</p>
                <p className="text-xs px-4 text-[#9c4d15] bg-slate-300">{}</p>
                <button className='px-2 py-6 w-[100px] text-xs bottom-10 right-4 bg-slate-300 absolute rounded animate-pulse hover:bg-[#f89a57] '></button>
                <p className="px-4 bottom-2 font-semibold w-full text-right bg-slate-200 text-[#2d2d2d] absolute">
                  {}
                </p>
              </div>
            </div>
          ))):
          (
            data.map((product, index) => (
              <Link to={`/product/${product._id}`} key={index} className="h-[350px] w-[200px] flex-shrink-0 cursor-pointer cardShadow hover:customShadowHover">
                <div className="w-full h-[200px] overflow-hidden">
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="w-full h-full object-contain transform transition py-6 duration-300 hover:scale-105"
                  />
                </div>
                <div className="h-[150px] bg-white relative">
                  <p className="text-sm pt-2 px-4 line-clamp-2">{product.productName}</p>
                  <p className="text-xs px-4 text-[#9c4d15]">{product.brandName}</p>
                  <button className='px-2 py-1 text-xs bg-[#f0873c] bottom-10 right-4 absolute rounded hover:bg-[#f89a57]' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                  <p className="px-4 bottom-2 font-semibold w-full text-right text-[#2d2d2d] absolute">
                    {formatCurrency(product.sellingPrice)}
                  </p>
                </div>
              </Link>
            ))
          )
        }
        </div>
  );
};

export default SearchResultCard;

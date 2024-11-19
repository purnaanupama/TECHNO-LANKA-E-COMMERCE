import React, { useEffect, useState, useRef,useContext } from 'react';
import '../App.css';
import fetchCategoryWiseProduct from '../helpers/GetProductWiseCategory';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AddToCart from '../helpers/AddToCart';
import Context from '../context/context';

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(13).fill(null)
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);
  const containerRef = useRef("");

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
    checkScroll();
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  const scrollLeft = () => {
    containerRef?.current.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 300);
  };

  const scrollRight = () => {
    containerRef?.current.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 300);
  };

  const checkScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setShowPrev(scrollLeft > 0);
    setShowNext(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    checkScroll();
  }, [data]);

  return (
    <div className="relative mx-auto px-4 my-6 w-full">
      <div className="relative">
        <div className="text-1xl w-[300px] font-semibold py-[5px] px-4 bg-[#f6933d] slanted">
          {heading}
        </div>
        <div className="w-full h-[2px] bg-[#f6933d]"></div>
      </div>

      <div className="relative">
        {showPrev && (
          <div
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 text-lg text-white hover:text-[#c5c5c5] cursor-pointer"
            style={{ backgroundColor: '#f6933d', padding: '6px', }}
            onClick={scrollLeft}
          >
            <FaAngleLeft />
          </div>
        )}

        <div
          ref={containerRef}
          className="flex overflow-x-scroll scrollbar-none gap-4 p-4"
          onScroll={checkScroll}
        >
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

        {showNext && (
          <div
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 text-lg text-white hover:text-[#c5c5c5] cursor-pointer"
            style={{ backgroundColor: '#f6933d', padding: '6px',}}
            onClick={scrollRight}
          >
            <FaAngleRight />
          </div>
        )}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;

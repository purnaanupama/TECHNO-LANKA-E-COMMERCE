import React, { useState, useEffect } from 'react';
import image1 from '../assets/banner/banner3.jpg';
import image2 from '../assets/banner/banner2.jpg';
import image3 from '../assets/banner/banner1.jpg';
import image4 from '../assets/banner/banner4.jpg';
import image5 from '../assets/banner/banner5.jpg';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const BannerSlider = () => {
  const bannerImages = [image5, image2, image1, image3, image4];
  const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to show the first image correctly
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    let interval;
    if (!isMouseOver) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % (bannerImages.length + 2));
      }, 3000); // Change slide every 3 seconds
    }
    return () => clearInterval(interval);
  }, [bannerImages.length, isMouseOver]);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + (bannerImages.length + 2)) % (bannerImages.length + 2)
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (bannerImages.length + 2)
    );
  };

  return (
    <div className="mx-auto px-4">
      <div
        className="h-[350px] max-h-[450px] w-full bg-red-600 relative overflow-hidden"
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <div
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex - 1) * 100}%)`,
          }}
        >
          {/* Clone the first and last images to create the infinite effect */}
          <div className="flex-shrink-0 w-full h-full">
            <img src={bannerImages[bannerImages.length - 1]} alt="image" className="w-full h-full object-cover" />
          </div>
          {bannerImages.map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full"
            >
              <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="flex-shrink-0 w-full h-full">
            <img src={bannerImages[0]} alt="image" className="w-full h-full object-cover" />
          </div>
        </div>
        <div
          className="bg-[#ec823c] h-[40px] w-[50px] flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer"
          onClick={handlePrevClick}
        >
          <FaAngleLeft className="text-[35px] text-[#fff]" />
        </div>
        <div
          className="bg-[#ec823c] h-[40px] w-[50px] flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer"
          onClick={handleNextClick}
        >
          <FaAngleRight className="text-[35px] text-[#fff]" />
        </div>
      </div>
    </div>
  );
};

export default BannerSlider;

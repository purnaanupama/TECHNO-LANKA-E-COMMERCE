import React from 'react'
import BannerSlider from '../components/BannerSlider'
import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'




const Home = () => {
  return (
    <div className=''>
       <CategoryList/>
       <BannerSlider/>
       <HorizontalCardProduct heading={"Latest Mobile Phones"} category={"mobile"}/>
       <HorizontalCardProduct heading={"Popular Airpods"} category={"airpod"}/>
       <VerticalCardProduct heading={"Smart Watches"} category={"watch"}/>
       <VerticalCardProduct heading={"Televisions"} category={"television"}/>
       <VerticalCardProduct heading={"Earphone"} category={"earphone"}/>
    </div>
  )
}

export default Home
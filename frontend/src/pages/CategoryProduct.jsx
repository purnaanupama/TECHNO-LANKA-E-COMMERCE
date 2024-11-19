import React,{useEffect, useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/ProductCategory'
import SearchResultCard from '../components/SearchResultCard'

const CategoryProduct = () => {
    const [data,setData]= useState([])
    const [loading,setLoading]=useState(false)
    const navigate  = useNavigate();
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListInArray = urlSearch.getAll("category")
    const [sortBy,setSortBy] = useState("")

   
    const urlCategoryListObject = {}
    urlCategoryListInArray.forEach(el=>{
      urlCategoryListObject[el]=true
    })

    const [selectCategory,setSelectCategory]=useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList]=useState([])
  
    const fetchData = async()=>{
      const response = await fetch('http://localhost:8000/api/product/filter-product',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          category:filterCategoryList
        })
      })
      const responseData = await response.json()
      setData(responseData?.data || [])
    }

    const handleSelectCategory=(e)=>{
      const {name,value,checked}=e.target
      setSelectCategory((prev)=>{
          return{
            ...prev,
            [value]:checked
          }
      }) 
    }

    useEffect(()=>{
       const arrayOfCategory = Object.keys(selectCategory).map(categoryName=>{
        if(selectCategory[categoryName]){
          return categoryName
        }
        return null;
       }).filter(el=>el)
       setFilterCategoryList(arrayOfCategory)

       //format for url change when checkbox
       const urlFormat = arrayOfCategory.map((el,index)=>{
        if((arrayOfCategory.length-1) === index){
           return `category=${el}`
        }
        return `category=${el}&&`
       })
       navigate(`/category-product?${urlFormat.join("")}`)
      },[selectCategory])

    useEffect(()=>{
      fetchData()
      },[filterCategoryList])

    const handleSortBy=(e)=>{
      const {value} = e.target
      setSortBy(value)
      if(value === 'asc'){
        setData(prev=>prev.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }
      if(value === 'desc'){
        setData(prev=>prev.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }
    
    useEffect(()=>{

    },[sortBy])
     

  return (
    <div className='h-[800px]'>
        <div className='flex'>

          <div className='bg-[#221f1f] min-w-[250px] h-[calc(800px-0px)]'>
          <div className=''>
            <h3 className='text-lg uppercase pl-[20px] font-normal text-[#ffffff] border-b border-[#828181] pb-4 pt-4'>Sort By</h3>
            <form className='text-sm py-5 pl-[20px] flex flex-col gap-3 text-[#ffffff]'>
              <div className='flex gap-4'>
                <input 
                 onChange={handleSortBy} 
                 type="radio"
                 checked={sortBy==='asc'}
                 name='sortBy' 
                 value={'asc'}/>
                <label>Price Low to High</label>
              </div >
              <div className='flex gap-4'>
                <input 
                onChange={handleSortBy} 
                type="radio" 
                name='sortBy' 
                value={'desc'}
                checked={sortBy==='desc'}
                />
                <label>Price High to Low</label>
              </div>
            </form>
            </div>

            <div className=''>
            <h3 className='text-lg uppercase pl-[20px] font-normal text-[#ffffff] border-b border-t border-[#828181] pb-4 pt-4'>Filter By</h3>
            <form className='text-sm py-5 pl-[20px] flex flex-col gap-3 text-[#ffffff]'>
             {
              productCategory.map((product,index)=>{
                return(
                  <div key={index} className='flex gap-4'>
                    <input value={product?.value} checked={selectCategory[product?.value]}  type="checkbox" name={"category"} id={product?.value} onChange={handleSelectCategory}/>
                    <label htmlFor={product?.value}>{product?.label}</label>
                  </div>
                )
              })
             }
            </form>
            </div>
           
          </div>
          

          <div className='h-[calc(100vh)] overflow-y-scroll  pb-[60px] '>
            <p className='p-4'>Search Results : {data.length}</p>
            <div>
            {
           data.length!==0 &&(
              <SearchResultCard data={data} loading={loading}/>
           ) }
            </div>
       
          </div>
        </div>
    </div>
  )
}

export default CategoryProduct
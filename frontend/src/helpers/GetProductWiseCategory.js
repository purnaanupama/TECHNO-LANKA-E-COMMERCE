const fetchCategoryWiseProduct = async(category)=>{
    const response = await fetch('http://localhost:8000/api/product/single-category-product',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({
           category:category
        })
    })
    const responseData = await response.json()
    return responseData;
}
export default fetchCategoryWiseProduct;
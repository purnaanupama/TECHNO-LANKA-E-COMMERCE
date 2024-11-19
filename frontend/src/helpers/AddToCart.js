import { toast } from "react-toastify";


const AddToCart=async(e,id)=>{
 e.stopPropagation();
 e.preventDefault();
 const response = await fetch('http://localhost:8000/api/cart/add-to-cart',{
    method:'POST',
    headers:{
        'content-type':'application/json'
    },
    credentials:'include',
    body:JSON.stringify({productId:id})
 })
 const responseData = await response.json()
 if(responseData.success){
    console.log(responseData?.data);
    toast.success("Item added to cart", {
        className: 'custom-toast',
      });
 }
 if(responseData.message==="user not logged in" && responseData.error){
   toast.error("Login to add product to cart", {
      className: 'custom-toast',
    });
  console.log(responseData.message);
 }
 if(responseData.error && !responseData.message==="user not logged in"){
    toast.error("Something went wrong", {
        className: 'custom-toast',
      });
    console.log(responseData.message);
    
 }
 if(responseData.error && responseData.message==="Product already available"){
   toast.error("Product already added to cart", {
      className: 'custom-toast',
    });
  console.log(responseData.message);
 }

 return responseData;

}

export default AddToCart;
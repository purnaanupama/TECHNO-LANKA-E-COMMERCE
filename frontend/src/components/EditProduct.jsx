
import { useEffect, useState } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import { MdDriveFolderUpload } from "react-icons/md";
import uploadImage from '../helpers/UploadImage';
import DisplayImage from '../helpers/DisplayImage';
import { RiDeleteBack2Fill } from "react-icons/ri";
import { toast } from 'react-toastify';

const EditProduct = ({onClose,productData,fetchData}) => {
  const [data, setData] = useState({
    ...productData,
    productName: productData.productName,
    brandName: productData.brandName,
    category: productData.category,
    productImage:productData.productImage || [],
    description: productData.description,
    price: productData.price,
    sellingPrice: productData.sellingPrice,
  });


  const [uploadImageProductInput, setUploadImageProductInput] = useState("");
  const [fullScreenImage,setFullScreenImage]=useState("")
  const [productSave,setProductSave]=useState(false);
  const [openFullScreenImage,setOpenFullScreenImage]=useState(false)
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadProduct = async (e) => {
    const file = e.target.files[0];
    setUploadImageProductInput(file.name);

    const uploadImageCloudinary = await uploadImage(file);
    console.log("upload image", uploadImageCloudinary);

    setData((prev) => ({
      ...prev,
      productImage: [...prev.productImage, uploadImageCloudinary.url]
    }));
  };

  const handleImageRemove=async(index)=>{
     console.log("index",index);
     const newProductImage = [...data.productImage];
     newProductImage.splice(index,1)
     setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));

  }
  const handleUpdateProductData=async(e)=>{
    e.preventDefault();
    setProductSave(true)
    const response = await fetch('http://localhost:8000/api/product/update-product',{
      method: 'POST',
      credentials:'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const responseData = await response.json()
    if(responseData.success){
      setProductSave(false)
      onClose();
       toast.success("changes saved", {
        className: 'custom-toast',
      });
      fetchData();
    }
    if(responseData.error){
      setProductSave(false)
        toast.error(responseData.message, {
        className: 'custom-toast',
      });
      console.log(responseData.message);
      console.log("hello");
      
    }
    
  
  }
  return (

      <div className='fixed w-full h-full bg-[rgba(0,0,0,0.5)] top-0 p-[120px] right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-white relative p-6 rounded-md w-full h-[565px] min-w-[700px]'>
          <h1 className='px-6 py-2 bg-[#d4d4d4] w-[300px] mb-[5px] text-lg'>Edit Product</h1>
          <IoIosCloseCircle onClick={()=>{onClose(false)}} className='absolute top-2 right-2 text-2xl cursor-pointer hover:text-[#383737]' />
          <form className='flex flex-row w-[100%] gap-4 h-full'>
            <div className='p-[10px] w-[50%] flex flex-col gap-2'>
              <label htmlFor="productName">Product Name :</label> 
              <input
                className='grid py-1 px-5 w-[100%] outline outline-[#b3b3b3]'
                type="text"
                id='productName'
                name='productName'
                placeholder='Enter product name'
                value={data.productName}
                onChange={handleOnChange} 
                required
                /> 
  
              <label htmlFor="brandName">Brand Name :</label> 
              <input
                className='grid py-1 px-5 w-[100%] outline outline-[#b3b3b3]'
                type="text"
                id='brandName'
                name='brandName'
                placeholder='Enter brand name'
                value={data.brandName}
                onChange={handleOnChange} 
                required/>
  
              <label htmlFor='category'>Category :</label>
              <select 
                value={data.category} 
                name="category" 
                id="category"
                required
                className='grid py-1 px-5 w-[100%] outline outline-[#b3b3b3]'
                onChange={handleOnChange}>
                <option id='0' value="">Select Category</option>
                <option id='1' value="airpod">Airpod</option>
                <option id='2' value="camera">Camera</option>
                <option id='3' value="earphone">Earphone</option>
                <option id='4' value="mobile">Mobile Phone</option>
                <option id='5' value="mouse">Mouse</option>
                <option id='6' value="printer">Printer</option>
                <option id='7' value="processor">Processor</option>
                <option id='8' value="refrigerator">Refrigerator</option>
                <option id='9' value="speaker">Speaker</option>
                <option id='10' value="trimmer">Trimmer</option>
                <option id='11' value="television">Television</option>
                <option id='12' value="watch">Watch</option>
              </select>
  
              <label htmlFor='productImage'>Product Image :</label>
              <div className='grid py-4 h-[200px] px-5 w-[100%] outline outline-[#b3b3b3]'>
              <div className=' relative flex items-center gap-2 group w-[600px]'>
                    {data.productImage.map((image, index) => (                   
                      <div className='flex gap-2'>
                      <img 
                      key={index} 
                      className='w-[80px] h-[80px] object-cover' 
                      src={image} 
                      alt={`Product ${index + 1}`} 
                      onClick={()=>{setOpenFullScreenImage(true)
                                    setFullScreenImage(image)}}/>
                      <RiDeleteBack2Fill className='z-20 text-lg cursor-pointer hidden group-hover:block'
                      onClick={()=>{handleImageRemove(index)}}/>
                      </div>
                          
                    ))}
                  </div>
                  <div className={uploadImageProductInput?`flex flex-col items-center mt-[10px] cursor-pointer`:`flex flex-col items-center cursor-pointer`}>
                  <label htmlFor="uploadImageInput">
               {data.productImage.length < 5 && 
            <div className='flex flex-col items-center mt-[10px] mr-[90px]'>
            <MdDriveFolderUpload className='text-[50px] text-gray-600' /> 
            <p className='text-xs text-gray-600'>Upload Product Image</p>
            <input required type="file" className='hidden' id="uploadImageInput" onChange={handleUploadProduct} /> 
            </div>
           
            }
                </label>    
              </div>
  
                
              </div>
            </div>
            <div className='p-[10px] w-[50%] flex flex-col gap-2'>
              
            <label htmlFor="price">Product price :</label> 
              <input
                className='grid py-1 px-5 w-[100%] outline outline-[#b3b3b3]'
                type="number"
                id='price'
                required
                name='price'
                placeholder='Enter price'
                value={data.price}
                onChange={handleOnChange} /> 
            <label htmlFor="sellingPrice">Product selling price :</label> 
              <input
                className='grid py-1 px-5 w-[100%] outline outline-[#b3b3b3]'
                type="number"
                id='sellingPrice'
                name='sellingPrice'
                required
                placeholder='Enter selling price'
                value={data.sellingPrice}
                onChange={handleOnChange} /> 
  
            <label htmlFor="description">Description :</label> 
              <textarea
                rows={5}
                className='grid py-1 px-5 w-[100%] outline outline-[#b3b3b3] resize-none'
                type="text"
                id='description'
                name='description'
                required
                placeholder='Enter description'
                value={data.description}
                onChange={handleOnChange} /> 
  
              <button type='submit' disabled={productSave} className='py-2 customShadow2 px-2 text-xs bg-[#363636] mt-4 text-white hover:bg-[#515151]' onClick={handleUpdateProductData}>{productSave?"Saving...":"Save Changes"}</button>
            </div>
          </form>
        </div>
        {/*display image full*/}
        {openFullScreenImage &&
         <DisplayImage onClose={()=>{setOpenFullScreenImage(false)}} imgUrl={fullScreenImage}/>}
      </div>
    );
}

export default EditProduct
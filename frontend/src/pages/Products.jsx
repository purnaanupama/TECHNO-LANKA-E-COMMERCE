import React, { useEffect, useState } from 'react';
import { IoMdAddCircle } from "react-icons/io";
import UploadProduct from '../components/UploadProduct.jsx';
import { BiSolidEdit } from "react-icons/bi";
import EditProduct from '../components/EditProduct.jsx';
import { IoMdTrash } from "react-icons/io";
import DeleteDialog from '../components/DeleteDialog.jsx';

const Products = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [openDeleteProduct, setOpenDeleteProduct] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState(null);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    const dateTimeWithoutSeconds = isoString.substring(0, 16).replace('T', ' ');
    return dateTimeWithoutSeconds;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  const fetchAllProduct = async () => {
    const response = await fetch('http://localhost:8000/api/product/get-product', {
      method: 'get',
      credentials: 'include'
    });
    const responseData = await response.json();
    if (responseData.error) {
      return console.log("error", responseData.message);
    }
    setAllProducts(responseData.data);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setOpenEditProduct(true);
  };
  const handleDeleteProduct = (product)=>{
    setCurrentProduct(product);
    setOpenDeleteProduct(true)
  }


  return (
    <div>
      <div className='py-2 px-4 mb-[15px] flex justify-between ribbonGradient w-[calc(100vw-340px)]'>
        <p className='text-lg text-white'>Products</p>
        <button
          className='px-5 bg-[#cecbcb] customShadow2 text-[#201f1f] flex items-center justify-between gap-2 rounded-sm text-xs hover:bg-[#b7b7b7] transition-all'
          onClick={() => { setOpenUploadProduct(true); }}>Upload Product <IoMdAddCircle className='text-lg' /></button>
      </div>
      {/* product table */}
      <div className='px-[30px] h-[600px] overflow-y-auto'>
        <table className="table-auto w-full bg-[#f0ab66] rounded border border-[#ffffff] border-[10px]">
          <thead>
            <tr className='text-left'>
              <th className='p-4'>Image</th>
              <th className='p-4'>ID</th>
              <th className='p-4'>Name</th>
              <th className='p-4'>Category</th>
              <th className='p-4'>Price</th>
              <th className='p-4'>Created At</th>
              <th className='p-4'></th>
            </tr>
          </thead>
          <tbody>
            {allProducts.map((product, index) => (
              <tr key={product._id} className='border-b border-[#ffffff] border-[10px] text-sm'>
                <td className='py-2 px-4'>
                  <div className='w-[50px] h-[50px] p-[1px] bg-[#e9e6e3]'>
                    <img className='w-[100%] h-[100%] object-contain' src={product.productImage[0]} alt={product.productName}/>
                  </div>
                </td>
                <td className='p-2'>{index + 1}</td>
                <td className='p-2'>
                  <div>
                  {product.productName}
                  <p className='text-xs text-[#994321]'>{product.brandName}</p>
                  </div>
                  </td>
                <td className='p-2'>{product.category}</td>
                <td className='p-2'>{formatCurrency(product.sellingPrice)}</td>
                <td className='p-2'>{formatDateTime(product.createdAt)}</td>
                <td className='p-2 text-right h-full bg-[#f0ab66]'>
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <label className='text-xl cursor-pointer hover:bg-white rounded-full p-1 bg-[#ffffff]' onClick={() => handleEditProduct(product)}>
                      <BiSolidEdit />
                    </label>
                    <label className='text-xl cursor-pointer hover:bg-white rounded-full p-1 bg-[#ffffff]' 
                    onClick={()=>{ 
                      handleDeleteProduct(product)}}>
                      <IoMdTrash/>
                    </label>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openEditProduct &&
        <EditProduct onClose={() => { setOpenEditProduct(false); setCurrentProduct(null); }} productData={currentProduct} fetchData={fetchAllProduct}/>
      }
      {openUploadProduct &&
        <UploadProduct onClose={() => { setOpenUploadProduct(false); }} fetchData={fetchAllProduct}/>
      }
      {
        openDeleteProduct &&
        <DeleteDialog onClose={()=>{setOpenDeleteProduct(false)}} productData={currentProduct} fetchData={fetchAllProduct}/>
      }
      
    </div>
  );
}

export default Products;


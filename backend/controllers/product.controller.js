const uploadProductPermission = require("../helper/permissions");
const Product = require("../models/product.model")


exports.createProduct=async(req,res)=>{
 try {
    const sessionUserId = req.userId;
    const result = await uploadProductPermission(sessionUserId);
    
    if(!result){
       return res.status(401).json({
            message: "You are not an ADMIN",
            error: true,
            success: false
        });
    }
    const product = new Product(req.body);
    const save = await product.save();
    res.status(201).json({
        data:save,
        success:true,
        error:false,
        message:"Product created successfully !",
        
      })

 } catch (error) {
    res.json({
        message : error.message,
        error : true,
        success : false
     })
 }
}

exports.getProduct=async(req,res)=>{
 try {
    const products = await Product.find().sort({createdAt : -1});
    res.status(200).json({
        data:products,
        success:true,
        error:false,
        message:"Product list!",
        
      })
 } catch (error) {
    res.json({
        message : error.message,
        error : true,
        success : false
     })
 }
}
exports.updateProduct=async(req,res)=>{
  try {
    const sessionUserId = req.userId;
    const result = await uploadProductPermission(sessionUserId);
    
    if(!result){
       return res.status(401).json({
            message: "You are not an ADMIN",
            error: true,
            success: false
        });
    }
    const {_id,...resBody} = req.body
    const updateProduct = await Product.findByIdAndUpdate(_id,resBody)
    res.status(200).json({
        data:updateProduct,
        success:true,
        error:false,
        message:"Product updated successfully!",
        
      })
  } catch (error) {
    res.json({
        message : error.message,
        error : true,
        success : false
     })
  }
}

exports.deleteProduct=async(req,res)=>{
  const productId = req.params.id;
  const product = await Product.findById(productId)
  if(!product){
    return res.status(404).json({
        success:false,
        error:true,
        message:"Product not found!",
      })}
   await Product.findByIdAndDelete(req.params.id)
   res.status(200).json({
    success:true,
    error:false,
    message:"Product deleted successfully!", 
   })
  
}

exports.getProductCategory = async(req,res)=>{
  try{
    const productCagtegory = await Product.distinct("category")

    //Store one product from each category
    const productByCategory = []

    for(const category of productCagtegory){
      const product = await Product.findOne({category : category});
      if(product){
        productByCategory.push(product)
      }
    }
    
    res.status(200).json({
     message:'category product',
     data : productByCategory,
     success:true,
     error:false
    })

 
  }catch(err){
    res.json({
      message : err.message || err,
      error : true,
      success : false
   })
  }
}

exports.getProductForEachCategory = async(req,res)=>{
  try {
    const {category} = req?.body || req?.query
    const product = await Product.find({category})
    res.json({
      data:product,
      message:"Product Data Fetched",
      success:true,
      error:false
    })
  } catch (error) {
     res.status(400).json({
      message:err.message || err,
      error : true,
      success : false
     })
  }
}

exports.getProductById=async(req,res)=>{
  try {
    const {productId}= req.body;
    const product = await Product.findById(productId)

    res.status(200).json({
      message:"Data fetched successfully",
      error:false,
      success:true,
      data:product
    })
  } catch (error) {
    res.json({
      message:error.message || err,
      error:true,
      success:false,
      data:"Something went wrong"
    })
  }
}

//Search endpoint
exports.searchProduct=async(req,res)=>{
  try {
    const query = req.query.q;
    const regex = new RegExp(query, 'i'); // Use only 'i' flag

    const products = await Product.find({
      "$or": [
        { productName: regex },
        { category: regex }
      ]
    });

    if (products.length === 0) {
      return res.status(404).json({
        data: [],
        message: "No products found",
        error: false,
        success: true
      });
    }

    res.status(200).json({
      data: products,
      message: "Search Product List",
      error: false,
      success: true
    });
  } catch (err) {
    res.json({
      message:err.message||err,
      error:true,
      success:false
    })
  }
}

exports.filterProduct=async(req,res)=>{
  try {
     const categoryList = req?.body?.category || []
     const product = await Product.find({
       category:{
        "$in":categoryList
       }
     })
     res.status(200).json({
      data:product,
      message:'Products Filtered',
      error:false,
      success:true
    })
  } catch (error) {
    res.json({
      message:err.message||err,
      error:true,
      success:false
    })
  }
}
const Cart = require("../models/cart.model")



exports.addToCart = async(req,res)=>{
    try {
     const {productId}= req?.body
     const currentUser = req.userId
     
     const isProductAvailable = await Cart.findOne({productId,  userId:currentUser})
     if(isProductAvailable){
        return res.json({
            message:'Product already available',
            success:false,
            error:true
        })
     }

     const payload = {
        productId:productId,
        quantity:1,
        userId:currentUser
     }
     
     const newAddToCart = new Cart(payload)
     const saveProduct = await newAddToCart.save();

     res.status(201).json({
        data:saveProduct,
        message:'Product added',
        success:true,
        error:false
     })
     }
     catch (error) {
       res.json({
        message : error.message||error,
        error:true,
        success:false
     }) 
    }
}

exports.countCartItems = async(req,res)=>{
   try {
      const userId = req.userId
      const count = await Cart.countDocuments({
         userId:userId
      })
      res.status(200).json({
         error:false,
         success:true,
         data:{
            count:count
         },
         message:'counted'
      })
   } catch (error) {
      res.json({
         message : error.message||error,
         error:true,
         success:false
      }) 
   }
}

exports.getCartItems = async(req,res)=>{
   try {
      const currentUser = req.userId

      const Items = await Cart.find(
         {userId:currentUser}).populate("productId")

      res.status(200).json({
         message:"Current items in cart",
         error:false,
         success:true,
         data:Items
      })
   } catch (error) {
      res.json({
         message : error.message||error,
         error:true,
         success:false
      }) 
   }
}

exports.updateCart = async(req,res)=>{
   try {
     const cartId = req.body._id
     const qty = req.body.quantity
      // Update the cart product by matching the _id field
      const updateCartProduct = await Cart.updateOne(
         { _id: cartId },
         {
             ...(qty && { quantity: qty }),
         }
     );
     res.json({
      message : "Product updated",
      error:false,
      success:true,
      data:updateCartProduct
   })

   } catch (error) {
      res.json({
         message : error.message||error,
         error:true,
         success:false
      }) 
   }
}

exports.deleteCartItem=async(req,res)=>{
 try {
   const productId = req.body._id
   
   const deleteProduct = await Cart.deleteOne({_id: productId });

   res.status(200).json({
      message : "Product deleted",
      error:false,
      success:true,
      data:deleteProduct
   })

 } catch (error) {
   res.json({
      message : error.message||error,
      error:true,
      success:false
   }) 
 }
}
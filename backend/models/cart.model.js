const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
      productId:{
        ref:'Product',
        type:String
      },
      quantity:Number,
      userId:String
},{
    timestamps:true
})

const Cart = mongoose.model('Cart',cartSchema);

module.exports = Cart;
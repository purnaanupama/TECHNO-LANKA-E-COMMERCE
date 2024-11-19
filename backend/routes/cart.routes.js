const express = require('express')
const { authToken } = require('../middlewares/userDetails')
const { addToCart, countCartItems, getCartItems, updateCart, deleteCartItem } = require('../controllers/cart.controller')

const cart_router = express.Router()

cart_router.post('/add-to-cart',authToken,addToCart)
cart_router.get('/get-item-count',authToken,countCartItems)
cart_router.get('/get-cart-items',authToken,getCartItems)
cart_router.post('/update-cart',authToken,updateCart)
cart_router.delete('/delete-cart-item',authToken,deleteCartItem)

module.exports = cart_router;
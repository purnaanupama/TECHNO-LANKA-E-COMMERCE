const express = require('express')
const { authToken } = require('../middlewares/userDetails')
const { 
    createProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct, 
    getProductCategory, 
    getProductForEachCategory, 
    getProductById, 
    searchProduct, 
    filterProduct} = require('../controllers/product.controller')


const product_router = express.Router()

product_router.post('/create-product',authToken,createProduct)
product_router.get('/get-product',authToken,getProduct)
product_router.post('/update-product',authToken,updateProduct)
product_router.delete('/delete-product/:id',authToken,deleteProduct)
product_router.get('/product-category',getProductCategory)
product_router.post('/single-category-product',getProductForEachCategory)
product_router.post('/get-product-details',getProductById)
product_router.get('/search',searchProduct)
product_router.post('/filter-product',filterProduct)

module.exports = product_router
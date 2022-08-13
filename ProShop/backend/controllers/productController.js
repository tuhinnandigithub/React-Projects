import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'


//@desc Fetch all products
//@desc GET /api/products
//@access public

const getProducts = asyncHandler(async(req, res) => {
    const products = await Product.find({})

    res.json(products)
})

//@desc Fetch single product
//@desc GET /api/products/:id
//@access public

const getProductById = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("product not Found")
    }
})


export {getProductById, getProducts}

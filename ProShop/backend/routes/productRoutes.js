import express from "express";
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@desc Fetch all products
//@desc GET /api/products
//@access public

router.get('/', asyncHandler(async(req, res) => {
    const products = await Product.find({})
    res.json(products)
}))

//@desc Fetch single product
//@desc GET /api/products/:id
//@access public

router.get('/:id', asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error("product not Found")
    }
    
}))

export default router

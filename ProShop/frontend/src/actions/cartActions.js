import axios from 'axios'
import { CART_ADD_ITEM } from '../constants/cartConstants'

export const addToCart = (id, qty) => async( dispatch, getState) => {
    const {data} = await axios.get(`/api/products/${id}`)
    console.log(data)

    dispatch({ 
        type : CART_ADD_ITEM, 
        paylaod : {
            product : data._id,
            name : data.name,
            price : data.price,
            image : data.image,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

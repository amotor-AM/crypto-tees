import Axios from "axios";
import * as constants from "../constants/cartConstants";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
    const {data} = await Axios.get(`/api/products/${productId}`)
    dispatch({
        type: constants.ADD_ITEM_TO_CART,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: constants.REMOVE_ITEM_FROM_CART, payload: productId})
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


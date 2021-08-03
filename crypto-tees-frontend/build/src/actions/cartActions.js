import * as constants from "../constants/cartConstants";

export const addToCart = (data) => (dispatch, getState) => {
    dispatch({
        type: constants.ADD_ITEM_TO_CART,
        payload: {
            name: data.product.name,
            image: data.product.main_image,
            price: data.product.price,
            id: data._id,
            qty: data.qty,
            size: data.size,
            gender: data.gender,
            countInStock: data.stock,
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({type: constants.REMOVE_ITEM_FROM_CART, payload: productId})
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({type: constants.SAVE_SHIPPING_ADDRESS, payload: data})
    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

export const setPaymentMethod = (data) => (dispatch) => {
    dispatch({type: constants.UPDATE_PAYMENT_INFO, payload: {data}})
}
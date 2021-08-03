import * as constants from "../constants/cartConstants"

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch(action.type) {
        case constants.ADD_ITEM_TO_CART:
            const item = action.payload
            const itemExists = state.cartItems.find((newItem) => newItem.id === item.id)
            if(itemExists) {
                // update the amount of items in the cart. Replace existing items with new item qty
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.id === itemExists.id ? item : cartItem)
                }
            } else {
                return {...state, cartItems: [...state.cartItems, item]}
            }
        case constants.REMOVE_ITEM_FROM_CART:
            return {...state, cartItems: state.cartItems.filter((item) => item.id !== action.payload)}
        case constants.SAVE_SHIPPING_ADDRESS: 
            return {...state, shippingAddress: action.payload}
        case constants.CART_EMPTY:
            return {...state, cartItems: []}
        case constants.UPDATE_PAYMENT_INFO:
            const cartPrice = action.payload
            return {...state, price: {
                paymentMethod: cartPrice.paymentMethod,
                items: cartPrice.items,
                shipping: cartPrice.shipping,
                tax: cartPrice.tax,
                total: cartPrice.total
            }}
        default:
            return state
    }
}
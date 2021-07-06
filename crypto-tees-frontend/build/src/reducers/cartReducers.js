import * as constants from "../constants/cartConstants"

export const cartReducer = (state = {cartItems:[]}, action) => {
    switch(action.type) {
        case constants.ADD_ITEM_TO_CART:
            const item = action.payload
            const itemExists = state.cartItems.find((newItem) => newItem.product === item.product)
            if(itemExists) {
                // update the amount of items in the cart. Replace existing items with new item qty
                return {
                    ...state,
                    cartItems: state.cartItems.map(cartItem => cartItem.product === itemExists.product ? item : cartItem)
                }
            } else {
                return {...state, cartItems: [...state.cartItems, item]}
            }
        case constants.REMOVE_ITEM_FROM_CART:
            return {...state, cartItems: state.cartItems.filter((item) => item.product !== action.payload)}
        default:
            return state
    }
}
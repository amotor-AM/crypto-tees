import * as constants from "../constants/productConstants";

const productListReducer = (state = {loading: true, products: []}, action) => {
    switch(action.type) {
        case constants.PRODUCT_LIST_REQUEST:
            return {loading: true}
        case constants.PRODUCT_LIST_SUCCESSFUL:
            return {loading: false, products: action.payload}
        case constants.PRODUCT_LIST_FAILED:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}

const productDetailsReducer = (state = {product: {}, loading: true}, action) => {
   switch(action.type) {
        case constants.PRODUCT_DETAILS_REQUEST:
           return {loading: true}
        case constants.PRODUCT_DETAILS_SUCCESSFUL:
            return {loading: false, product: action.payload}
        case constants.PRODUCT_DETAILS_FAILED:
            return {loading: false, error: action.payload}
        default:
            return state
   } 
}

export {
    productListReducer,
    productDetailsReducer,
}
import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers"
import * as product from "./reducers/productReducers"
import * as users from "./reducers/userReducer"

const cartItems = localStorage.getItem("cartItems")
const user = localStorage.getItem("userInfo")
const address = localStorage.getItem("shippingAddress")

const initialState = {
    userSignin: {
        userInfo: user ? JSON.parse(user) : null
    },
    cart: {
        cartItems: cartItems ? JSON.parse(cartItems) : [],
        shippingAddress: address ? JSON.parse(address) : {}
    }
}

const reducer = combineReducers({
    productList: product.productListReducer,
    productDetails: product.productDetailsReducer,
    cart: cartReducer,  
    userSignin: users.userSigninReducer,
    userRegister: users.userRegisterReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
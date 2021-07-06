import {createStore, compose, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import { cartReducer } from "./reducers/cartReducers"
import * as productReducers from "./reducers/productReducers"

const cartItems = localStorage.getItem("cartItems")

const initialState = {
    cart: {
        cartItems: cartItems ? JSON.parse(cartItems) : []
    }
}

const reducer = combineReducers({
    productList: productReducers.productListReducer,
    productDetails: productReducers.productDetailsReducer,
    cart: cartReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))

export default store
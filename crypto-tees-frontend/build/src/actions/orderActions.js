import * as Order from "../constants/orderConstants";
import {CART_EMPTY} from "../constants/cartConstants";
import Axios from "axios";

export const createOrder = (orderInfo) => async (dispatch, getState) => {
    dispatch({type: Order.NEW_ORDER_REQUEST, payload: orderInfo})
    try {
        const {data} = Axios.post("/api/orders/new", orderInfo)
        dispatch({type: Order.NEW_ORDER_SUCCESS, payload: data.orderInfo})
        dispatch({type: CART_EMPTY})
        localStorage.removeItem("cartItems")
    } catch(err) {
        dispatch({
            type: Order.NEW_ORDER_FAILED,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        })
    }
}
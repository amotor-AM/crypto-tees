import Axios from "axios"
import * as constants from "../constants/productConstants"

export const listProducts = () => async(dispatch) => {
    dispatch({type: constants.PRODUCT_LIST_REQUEST})
    try {
        const {data} = await Axios.get("/api/products")
        dispatch({type: constants.PRODUCT_LIST_SUCCESSFUL, payload: data})
    } catch(err) {
        dispatch({type: constants.PRODUCT_LIST_FAILED, payload: err.message})
    }
}

export const productInfo = (productId) => async (dispatch) => {
    dispatch({type: constants.PRODUCT_DETAILS_REQUEST, payload: productId})
    try{
        const {data} = await Axios.get(`/api/products/${productId}`)       
        dispatch({type: constants.PRODUCT_DETAILS_SUCCESSFUL, payload: data})
    } catch(err) {
        dispatch({type: constants.PRODUCT_DETAILS_FAILED, 
        payload: err.response && err.response.data.message 
        ? err.response.data.message 
        : err.message
    })
    }
}
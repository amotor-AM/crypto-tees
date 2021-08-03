import axios from "axios";
import * as user from "../constants/userConstants";

export const signin = (email, password) => async (dispatch) => {
    dispatch({type: user.USER_SIGNIN_REQUEST, payload: {email, password}})
    try {
        const {data} = await axios.post("/api/users/login", {email, password})
        dispatch({type: user.USER_SIGNIN_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch(err) {
        dispatch({
            type: user.USER_SIGNIN_ERROR, 
            payload: err.response && err.response.data.message 
                ? err.response.data.message 
                : err.message
        })
    }
}

export const signout = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({type: user.USER_SIGNIN_SUCCESS})
}

export const register = (name, password, email) => async (dispatch) => {
    dispatch({type: user.USER_REGISTER_REQUEST, payload: {name, password, email}})
    try {
        const {data} = await axios.post("/api/users/register", {name, password, email})
        dispatch({type: user.USER_REGISTER_SUCCESS, payload: data})
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch(err) {
        dispatch({
            type: user.USER_REGISTER_ERROR,
            payload: err.response && err.response.data.message
            ? err.response.data.message
            : err.message    
        })
    }
}
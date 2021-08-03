import * as user from "../constants/userConstants";

export const userSigninReducer = (state = {}, action) => {
    switch(action.type) {
        case user.USER_SIGNIN_REQUEST:
           return {loading: true}
        case user.USER_SIGNIN_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case user.USER_SIGNIN_ERROR:
            return {loading: false, err: action.payload} 
        case user.USER_SIGNOUT:
            return {}
        default: 
            return state
    } 
}

export const userRegisterReducer = (state = {}, action) => {
    switch(action.type) {
        case user.USER_REGISTER_REQUEST:
            return {loading: true}
        case user.USER_REGISTER_SUCCESS:
            return {loading: false, userInfo: action.payload}
        case user.USER_REGISTER_ERROR:
            return {loading: false, err: action.payload}
        default: 
            return state
    }
}
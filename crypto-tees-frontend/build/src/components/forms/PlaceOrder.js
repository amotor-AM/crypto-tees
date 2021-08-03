import React from 'react';
import {createOrder} from "../../actions/orderActions";
import {useDispatch, useSelector} from "react-redux";

function PlaceOrder() {
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.userSignin)
    const {userInfo} = user

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.price.paymentMethod,
            itemsPrice: cart.price.items,
            shippingPrice: cart.price.shipping,
            taxPrice: cart.price.tax,
            totalPrice: cart.price.total,
            user: userInfo
                ? userInfo.id
                : 1
        }))
    }

    return (
        <div>
            
        </div>
    )
}

export default PlaceOrder

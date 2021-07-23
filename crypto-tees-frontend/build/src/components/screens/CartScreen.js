import React, {useEffect, useState} from 'react';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import {useDispatch, useSelector} from "react-redux";
import {Link,BrowserRouter} from "react-router-dom";
import ShippingInfo from "../forms/shippingInfo";
import PaymentInfo from "../forms/paymentInfo";

function CartScreen(props) {
    const productId = props.match.params.id
    const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const signInHandler = () => {
        props.history.push("/signin?redirect=cart")
    }
    return (
        <BrowserRouter>
        <div className="wrapper">
            <div className="row top cart">
                <div className="col-2">
                    <div className="col">
                        <h1 className="checkout-header">CHECKOUT</h1>
                        <div clasName="checkout-tabs">
                            {/*Shipping tab*/}
                            <div className="checkout-tab">
                                <input type="checkbox" id="chck1" defaultChecked="true"/>
                                    <label className="checkout-tab-label" for="chck1">
                                        Shipping
                                    </label>
                                    <div className="checkout-tab-content">
                                        <ShippingInfo/>
                                    </div>
                            </div>
                            {/*Payment tab*/}
                            <div className="checkout-tab">
                                <input type="checkbox" id="chck2" className="cartCheckBox"/>
                                    <label className="checkout-tab-label" for="chck2">
                                        Payment
                                    </label>
                                    <div className="checkout-tab-content">
                                        <PaymentInfo/>
                                    </div>
                            </div>
                            {/*Order Review tab*/}
                            <div className="checkout-tab">
                                <input type="checkbox" id="chck3" className="cartCheckBox"/>
                                    <label className="checkout-tab-label" for="chck3">
                                        Review
                                    </label>
                                    <div className="checkout-tab-content">
                                        Place order review here
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <h1 className="checkout-header">CART</h1>
                    <div className="cart-box">
                        <div className="cart-order-details">
                            <ul>
                                <li>
                                    <h2>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) 
                                    : ${cartItems.reduce((a, c) => a + c.price * c.qty, 0)}</h2>
                                </li>
                            </ul>
                            <button type="button" onClick={signInHandler} className="primary block" disabled={false} //make this disabled when user is signed in
                            >Sign In</button> 
                        </div>
                        <ul>
                            {
                                cartItems.map((item) => (
                                   <li key={item.product}>
                                        <div className="row product">
                                            <div>
                                               <img src={item.image} alt={item.name} className="small"/>     
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>    
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(addToCart(item.product), Number(e.target.value))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))}    
                                                </select>   
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                            <button type="button" className="remove-from-cart-button" onClick={() => removeFromCartHandler(item.product)}>
                                                <i class="fa fa-trash-o" aria-hidden="true" style={{fontSize: "2rem", border: "none", backgroundColor: "#f8f8f8"}}/>
                                            </button>
                                            </div>
                                        </div>
                                   </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        </BrowserRouter>
    )
}

export default CartScreen

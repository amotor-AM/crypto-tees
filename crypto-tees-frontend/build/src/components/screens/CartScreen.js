import React, {useEffect, useState} from 'react';
import { addToCart, removeFromCart } from '../../actions/cartActions';
import {useDispatch, useSelector} from "react-redux";
import {Link,BrowserRouter} from "react-router-dom";
import ShippingInfo from "../forms/shippingInfo";
import PaymentInfo from "../forms/paymentInfo";
import Axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import dotenv from "dotenv";

/* 
Order endpoint accepts the following keys
{
    "orderItems": {"name": "test"},
    "shippingAddress": "123 fake street",
    "paymentMethod": "Paypal",
    "itemsPrice": 24.99,
    "shippingPrice": 10,
    "taxPrice": 0.89,
    "totalPrice":35.88,
    "user": id
}
*/

function CartScreen(props) {
    const [active, setActive] = useState("shipping")
    const [sdkReady, setSdkReady] = useState(false)
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.userSignin)
    const {userInfo} = user
    const {cartItems} = cart
    console.log(cartItems)

    // Set variables for price and amount of items
    const amountInCart = cartItems.reduce((a, c) => a + c.qty, 0)
    const subtotal = Number((cartItems.reduce((a, c) => a + c.price * c.qty, 0)).toFixed(2))
    const shippingCost = Number((5).toFixed(2))
    const taxCost = Number((Math.round(subtotal * 0.075 * 100) / 100).toFixed(2))
    const totalPrice = Number(((subtotal + shippingCost + taxCost) * 100) / 100)

    //stripe 
    dotenv.config()
    const promise = loadStripe(process.env.STRIPE_PRIVATE_KEY)

    useEffect(() => {
        const addPaypalScript = async () => {
            const {data} = await Axios.get("api/config/paypal")
            const paypalScript = document.createElement("script")
            paypalScript.type = "text/javascript"
            paypalScript.src = `https://www.paypal.com/sdk/js?client-id=${data}`
            paypalScript.async = true
            paypalScript.onload = () => {
                setSdkReady(true)
            }
            document.appendChild(paypalScript)
        }
    })

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const signInHandler = () => {
        props.history.push("/signin?redirect=cart")
    }

    const registerHandler = () => {
        props.history.push("/register?redirect=cart")
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
                                <input type="checkbox" id="chck1" checked={active === "shipping" ? true : false} onClick={e => setActive("shipping")}/>
                                    <label className="checkout-tab-label" for="chck1">
                                        Shipping
                                    </label>
                                    <div className="checkout-tab-content">
                                        <ShippingInfo active={active} setActive={setActive}/>
                                    </div>
                            </div>
                            {/*Payment tab*/}
                            <div className="checkout-tab">
                                <input type="checkbox" id="chck2" className="cartCheckBox" checked={active === "payment" ? true : false} onClick={e => setActive("payment")}/>
                                    <label className="checkout-tab-label" for="chck2">
                                        Payment
                                    </label>
                                    <div className="checkout-tab-content">
                                        <Elements stripe={promise}>
                                            <PaymentInfo active={active} setActive={setActive}/>
                                        </Elements>
                                    </div>
                            </div>
                            {/*Order Review tab*/}
                            <div className="checkout-tab">
                                <input type="checkbox" id="chck3" className="cartCheckBox" checked={active === "review" ? true : false} onClick={e => setActive("review")}/>
                                    <label className="checkout-tab-label" for="chck3">
                                        Review
                                    </label>
                                    <div className="checkout-tab-content">
                                        
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <h1 className="checkout-header">CART</h1>
                    <div className="cart-box">
                        <div className="cart-order-details">
                            <div className="row">
                                    <h2>{`Subtotal (${amountInCart} ${amountInCart === 1 ? "item" : "items"})`}</h2> 
                                    <h2>{subtotal}</h2>
                            </div>
                            <div className="row">
                                    <h2>Shipping</h2> 
                                    <h2>{shippingCost}</h2>
                            </div>
                            <div className="row">
                                    <h2>Estimated Tax</h2> 
                                    <h2>{taxCost}</h2>
                            </div>
                            <div className="row" style={{paddingBottom: "2rem"}}>
                                    <h2 style={{fontWeight: "bold"}}>Total</h2> 
                                    <h2>{totalPrice}</h2>
                            </div>
                            {!userInfo
                            ?   <div className="row">
                                <div className="column">
                                    <h1 style={{"paddingBottom": "0"}}>Sign in for faster checkout and order updates</h1>
                                    <p style={{fontSize: "1.2rem", "paddingBottom": "1rem"}}>If you checkout as a guest you will recieve order updates via email only!</p>
                                    <p style={{fontSize: "1.2rem"}}>Don't have an account yet? <span onClick={registerHandler} style={{color: "#4D4DFF", cursor: "pointer"}}>Join the Crypto Tees Family</span></p>
                                </div>  
                                    <button type="button" onClick={signInHandler} className="checkout-button" disabled={false}
                                    >Sign In</button>   
                                </div>
                            :   ""
                            }
                        </div>
                        <ul>
                            {
                                cartItems.map((item) => (
                                   <li key={item.id}>
                                        <div className="row product">
                                            <div>
                                               <img src={item.image} alt={item.name} className="small"/>     
                                            </div>
                                            <div className="min-30">
                                                {item.name}
                                                <div className="sizing">
                                                    {`${item.gender} ${item.size}`}
                                                </div>    
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(addToCart(item.id), Number(e.target.value))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    ))}    
                                                </select>   
                                            </div>
                                            <div>${item.price}</div>
                                            <div>
                                            <button type="button" className="remove-from-cart-button" onClick={() => removeFromCartHandler(item.id)}>
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

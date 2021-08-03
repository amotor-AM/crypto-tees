import React, {useState, useEffect} from 'react';
import chip from "./cardChip.png";
import signature from "./signature.png";
import {useDispatch, useSelector} from "react-redux";
import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import dotenv from "dotenv";

function PaymentInfo(props) {
    const date = new Date(Date.now())
    const formattedDate = date.toLocaleDateString().split("/")
    const [focus, setFocus] = useState("")
    const {setActive} = props
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    //stripe
    dotenv.config()
    console.log(process.env.STRIPE_SECRET_KEY)
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const stripe = useStripe()
    const elements = useElements()

    useEffect(() => {
        window.fetch("/api/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: cart.cartItems})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
    }, [])

    const handleChange = async (event) => {
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }


    const paymentSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement)
            }
        });
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
          } else {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
          }
        

        setActive("review")
        
    }
    return (
        <div className="container">
            <form className="paymentForm" id="payment-form" onSubmit={paymentSubmit}>
                <div className="card-wrapper">
                    <div className="card-section">
                        <div className="checkoutCard">
                            <div className="face front">
                                <h3 className="debit">Debit Card</h3>
                                <h3 className="bank">Bank Name</h3>
                                <img src={chip} className="chip" alt="card chip"/>
                                <h3 className="number" id={focus === "cardNum" ? "red" : ""}>0123 4567 8901 2345</h3>
                                <h5 className="valid"><span>Valid<br/>Through:</span><span id={focus === "expiration" ? "red" : ""}>{`${formattedDate[0]}/${formattedDate[2]}`}</span></h5>
                                <h5 className="cardHolder">Jane Doe</h5>
                            </div>
                            <div className="face back">
                                <div className="security-strip"></div>
                                <div className="ccv-text">
                                    <h5>Authorized Signature. Not valid unless signed</h5>
                                    <div className="signatureBar"><img className="signature" src={signature} alt="signature"/></div>
                                    <div className="ccv" id={focus === "securityCode" ? "red" : ""}>456</div>
                                    <div className="ccv-details-text">
                                        <p>For customer service please call 1-888-123-4567 or visit www.bankname.com. Sign card immediately.
                                            Use of this card by you will be used as your acceptance of the terms of the cardholder agreement and any associated
                                            program benefits or materials. If found send to Cardholder Services at P.O. Box 123 anywhere USA. This Card
                                            is issued by Bank Name, NA persuant to a licence from the payment processor and must be returned upon request.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="one-col"> 
                    <div className="input-box">
                        <CardElement name="cardNum" className="inputBox" onClick={e => setFocus("cardNum")} onChange={handleChange}/>
                        <label className="labelName" htmlFor="cardNum">
                            <span className="contentName">Card Number</span>
                        </label>
                    </div>
                </div>
                <div className="two-col">
                    <div className="input-box">
                        <CardElement name="expiration" className="inputBox" onClick={e => setFocus("expiration")} onChange={handleChange}/>
                        <label className="labelName" htmlFor="expiration">
                            <span className="contentName">Expiration Date</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <CardElement name="security" className="inputBox" id="cvv" onClick={e => setFocus("securityCode")} onChange={handleChange}/>
                        <label className="labelName" htmlFor="security">
                            <span className="contentName">Security Code</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="billing">
                        <span><input type="checkbox" id="chck1" defaultChecked="true"></input></span>Billing address same as shipping address?
                    </div>  
                </div>
                <div className="one-col">
                    <div className="billingInfo">
                        <p>{shippingAddress.customerName}</p>
                        <p>{shippingAddress.street}</p>
                        <p>{shippingAddress.city}</p>
                        <p>{shippingAddress.state}</p>
                        <p>{shippingAddress.zip}</p>
                        <p>{shippingAddress.email}</p>
                    </div>
                </div>
                <div className="one-col">
                    {error && (
                        <span className="alert" role="alert">{error}</span>
                    )}
                    {succeeded && (
                        <span className="min-30">
                            Payment successful, you can view the transaction in your 
                            <a href={"https://dashboard.stripe.com/payments"}>
                                {" "}
                                Stripe dashboard
                                </a> Refresh the page to pay again
                        </span>
                    )}
                    <div className="button">
                        <button disabled={processing || disabled || succeeded} className="checkout-button" type="submit" onClick={paymentSubmit}>Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PaymentInfo

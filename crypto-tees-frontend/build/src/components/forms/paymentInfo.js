import React from 'react';
import chip from "./cardChip.png";
import signature from "./signature.png";

function PaymentInfo(props) {
    let date = new Date(Date.now())
    let formattedDate = date.toLocaleDateString().split("/")
    return (
        <div className="container">
            <form action="#">
                <div className="card-wrapper">
                    <div className="card-section">
                        <div className="card">
                            <div className="face front">
                                <h3 className="debit">Debit Card</h3>
                                <h3 className="bank">Bank Name</h3>
                                <img src={chip} className="chip" alt="card chip"/>
                                <h3 className="number">0123 4567 8901 2345</h3>
                                <h5 className="valid"><span>Valid<br/>Through:</span><span>{`${formattedDate[0]}/${formattedDate[2]}`}</span></h5>
                                <h5 className="cardHolder">Jane Doe</h5>
                            </div>
                            <div className="face back">
                                <div className="security-strip"></div>
                                <div className="ccv-text">
                                    <h5>Authorized Signature. Not valid unless signed</h5>
                                    <div className="signatureBar"><img className="signature" src={signature} alt="signature"/></div>
                                    <div className="ccv">456</div>
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
                        <input type="text" name="cardNum" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="cardNum">
                            <span className="contentName">Card Number</span>
                        </label>
                    </div>
                </div>
                <div className="two-col">
                    <div className="input-box">
                        <input type="text" name="expiration" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="expiration">
                            <span className="contentName">Expiration Date</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="security" className="inputBox" autocomplete="off" required/>
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
                    <div className="button">
                        <button className="checkout-button" type="submit">Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default PaymentInfo

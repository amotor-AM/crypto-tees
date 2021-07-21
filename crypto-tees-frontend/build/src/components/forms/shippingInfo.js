import React from 'react'

function ShippingInfo(props) {
    return (
        <div className="container">
            <form action="#">
                <div className="two-col"> 
                    <div className="input-box">
                        <input type="text" name="fName" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="fName">
                            <span className="contentName">First Name</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="lName" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="lName">
                            <span className="contentName">Last Name</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="input-box">
                        <input type="text" name="address" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="address">
                            <span className="contentName">Address</span>
                        </label>
                    </div>
                </div>
                <div className="three-col">
                    <div className="input-box">
                        <input type="text" name="city" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="city">
                            <span className="contentName">City</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="state" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="state">
                            <span className="contentName">State</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="zip" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="zip">
                            <span className="contentName">Zip</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="input-box">
                        <input type="email" name="email" className="inputBox" autocomplete="off" required/>
                        <label className="labelName" htmlFor="email">
                            <span className="contentName">Email</span>
                        </label>
                    </div>
                </div>
            </form>
            
        </div>
    )
}

export default ShippingInfo

import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {saveShippingAddress} from "../../actions/cartActions";

function ShippingInfo(props) {
    const {setActive} = props
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const user = useSelector(state => state.userSignin)
    const {userInfo} = user

    const [address, setAddress] = useState({fName: "", lName: "", street: "", city: "", state: "", zip: "", email: ""})

    useEffect(() => {
        if(userInfo) {
            setAddress({
                ...address,
                fName: userInfo.name.split(" ")[0],
                lName: userInfo.name.split(" ")[1],
                email: userInfo.email,
            })
        }
        
        if(shippingAddress) {
            setAddress({
                ...address,
                fName: shippingAddress.customerName.split(" ")[0],
                lName: shippingAddress.customerName.split(" ")[1],
                street: shippingAddress.street, 
                city: shippingAddress.city, 
                state: shippingAddress.state, 
                zip: shippingAddress.zip,
                email: shippingAddress.email
            })
        }
    }, [userInfo, shippingAddress, setAddress])
    
    
    const addressSubmit = (e) => {
        e.preventDefault()
        setActive("payment")
        const {fName, lName, street, city, state, zip, email} = address
        const customerName = fName + " " + lName
        dispatch(saveShippingAddress({customerName, street, city, state, zip, email}))
    }
    return (
        <div className="container">
            <form action="#">
                <div className="two-col"> 
                    <div className="input-box">
                        <input type="text" name="fName" value={address.fName} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, fName: e.target.value})}
                        />
                        <label className="labelName" htmlFor="fName">
                            <span className="contentName">First Name</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="lName" value={address.lName} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, lName: e.target.value})}
                        />
                        <label className="labelName" htmlFor="lName">
                            <span className="contentName">Last Name</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="input-box">
                        <input type="text" name="address"  value={address.street} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, street: e.target.value})}
                        />
                        <label className="labelName" htmlFor="address">
                            <span className="contentName">Address</span>
                        </label>
                    </div>
                </div>
                <div className="three-col">
                    <div className="input-box">
                        <input type="text" name="city"  value={address.city} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, city: e.target.value})}
                        />
                        <label className="labelName" htmlFor="city">
                            <span className="contentName">City</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="state"  value={address.state} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, state: e.target.value})}
                        />
                        <label className="labelName" htmlFor="state">
                            <span className="contentName">State</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="zip"  value={address.zip} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, zip: e.target.value})}
                        />
                        <label className="labelName" htmlFor="zip">
                            <span className="contentName">Zip</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="input-box">
                        <input type="email" name="email"  value={address.email} className="inputBox" autocomplete="off" required
                            onChange={e => setAddress({...address, email: e.target.value})}
                        />
                        <label className="labelName" htmlFor="email">
                            <span className="contentName">Email</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="button">
                        <button className="checkout-button" type="submit" onClick={addressSubmit}>Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ShippingInfo

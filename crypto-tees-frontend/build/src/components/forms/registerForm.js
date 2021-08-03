import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {register} from "../../actions/userActions";
import {Link, useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import LoadingHex from '../LoadingHex';
import MessageBox from '../MessageBox';

function RegisterForm(props) {
    const [userCredentials, setUserCredentials] = useState({firstName: "", lastName: "", password: "", confirmPw: "", email: ""})
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const {redirect} = props
    const userRegister = useSelector(state => state.userRegister)
    const {userInfo, loading, err} = userRegister
    const lastPage = useHistory()

    const handleSubmit = (e) => {
        console.log(userCredentials)
        e.preventDefault()
        const {firstName, lastName, password, confirmPw, email} = userCredentials
        const name = firstName + " " + lastName
        if(password !== confirmPw) {
            setError("Passwords do not match")
            return;
        }
        dispatch(register(name, password, email))
    }

    useEffect(() => {
        if(err) setError(err)
        if(userInfo) lastPage.push(redirect)
    })
    return (
        <div className="container half">
            <div className="one-col">
                {loading && <LoadingHex/>}
                {error && <MessageBox variant="danger">{error}</MessageBox>}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="two-col">
                    <div className="input-box">
                        <input type="text" name="firstName" className="inputBox" autocomplete="off" required
                        onChange={(e) => setUserCredentials({...userCredentials, firstName: e.target.value})}/>
                        <label className="labelName" htmlFor="firstName">
                            <span className="contentName">First Name</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="text" name="lastName" className="inputBox" autocomplete="off" required
                        onChange={(e) => setUserCredentials({...userCredentials, lastName: e.target.value})}/>
                        <label className="labelName" htmlFor="lastName">
                            <span className="contentName">Last Name</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="input-box">
                        <input type="email" name="email" className="inputBox" autocomplete="off" required
                        onChange={(e) => setUserCredentials({...userCredentials, email: e.target.value})}/>
                        <label className="labelName" htmlFor="email">
                            <span className="contentName">Email</span>
                        </label>
                    </div>
                </div>
                <div className="two-col">
                    <div className="input-box">
                        <input type="password" name="password" className="inputBox" autocomplete="off" required
                        onChange={(e) => setUserCredentials({...userCredentials, password: e.target.value})} min="8"/>
                        <label className="labelName" htmlFor="password">
                            <span className="contentName">Password</span>
                        </label>
                    </div>
                    <div className="input-box">
                        <input type="password" name="confirmPassword" className="inputBox" autocomplete="off" required
                        onChange={(e) => setUserCredentials({...userCredentials, confirmPw : e.target.value})}/>
                        <label className="labelName" htmlFor="confirmPassword">
                            <span className="contentName">Confirm Password</span>
                        </label>
                    </div>
                </div>
                <div className="two-col">
                    <div className="button">
                        <button className="checkout-button" type="submit">Register</button>
                    </div>
                    <span className="signin-register-span">
                        Already have an account? <Link to={`/signin?redirect=${redirect}`}>Sign in instead!</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default RegisterForm

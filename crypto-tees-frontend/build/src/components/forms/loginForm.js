import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {signin} from "../../actions/userActions";
import { useSelector } from 'react-redux';
import {useHistory, Link} from "react-router-dom";
import LoadingHex from '../LoadingHex';
import MessageBox from '../MessageBox';


function LoginForm(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {redirect} = props
    const userSignin = useSelector(state => state.userSignin)
    const {userInfo, loading, err} = userSignin
    const lastPage = useHistory()

    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(signin(email, password))
    }

    useEffect(() => {
        if(userInfo) lastPage.push(redirect)
    }, [userInfo, lastPage, redirect])
    return (
        <div className="container half">
            <div className="one-col">
                {loading && <LoadingHex/>}
                {err && <MessageBox variant="danger">{err}</MessageBox>}
            </div>
            <form onSubmit={submitHandler}>
                <div className="one-col">
                    <div className="input-box">
                        <input type="email" name="email" className="inputBox" autocomplete="off" required
                        onChange={(e) => setEmail(e.target.value)}/>
                        <label className="labelName" htmlFor="email">
                            <span className="contentName">Email</span>
                        </label>
                    </div>
                </div>
                <div className="one-col">
                    <div className="input-box">
                        <input type="password" name="password" className="inputBox" autocomplete="off" required
                        onChange={(e) => setPassword(e.target.value)}/>
                        <label className="labelName" htmlFor="password">
                            <span className="contentName">Password</span>
                        </label>
                    </div>
                </div>
                <div className="two-col">
                    <div className="button">
                        <button className="checkout-button" type="submit">Login</button>
                    </div>
                    <span className="signin-register-span">
                        Don't have an account? <Link to={`/register?redirect=${redirect}`}>Join the Crypto Tees family!</Link>
                    </span>
                </div>
            </form>
        </div>
    )
}

export default LoginForm

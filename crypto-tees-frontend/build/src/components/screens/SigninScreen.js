import React from 'react';
import LoginForm from "../forms/loginForm";



function SigninScreen(props) {
    const redirect = props.location.search.split("=")[1] ?? "/"
    return (
        <div className="row top">
            <div className="col-2 noSp">
                <img className="loginImage" src="../../../images/login_page_image.png" alt="login page"/>
            </div>
            <div className="col-2 noSp flex">
                <div className="loginFormWrapper">
                    <LoginForm redirect={redirect}/>
                </div>
            </div>
        </div>
    )
}

export default SigninScreen

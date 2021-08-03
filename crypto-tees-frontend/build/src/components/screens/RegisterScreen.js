import React from 'react';
import RegisterForm from "../forms/registerForm";


function RegisterScreen(props) {
    const redirect = props.location.search.split("=")[1] ?? "/"

    return (
        <div className="row top">
            <div className="col-2 noSp">
                <img className="loginImage" src="../../../images/login_page_image.png" alt="login page"/>
            </div>
            <div className="col-2 noSp flex">
                <div className="registerFormWrapper">
                    <RegisterForm redirect={redirect}/>
                </div>
            </div> 
        </div>
    )
}

export default RegisterScreen

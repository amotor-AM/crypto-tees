import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Formik} from "formik";
import * as yup from "yup";
import Form from "../utils/Form";

const formSchema = yup.object().shape({
    name: yup.string().required("Name can not be blank"),  
    email: yup.string().email("Email must be valid").required("Email Required"),
    password: yup.string().required("Password Needed").min(8, "Password must be 8 or more characters"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Verify Your Password")
})

function RegisterScreen() {
    const [userInfo, setUserInfo] = useState({})
    const registerHandler = (e) => {

    }
    return (
        <div className="row top">
            <div className="col-2 noSp">
                <img className="loginImage" src="../../../images/login_page_image.png" alt="login page"/>
            </div>
            <div className="col-2 noSp flex">
                <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }} 
                validationSchema={formSchema}
                onSubmit={data => console.log(data)}>
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        touched
                    }) => {
                        return (
                            <div className="formBackground">
                                <h1>Register</h1>
                                <form className="registerForm" onSubmit={handleSubmit}>
                                    <Form name="name" label="name" onChange={handleChange} onBlur={handleBlur}/>
                                    <Form name="email" label="email" onChange={handleChange} onBlur={handleBlur}/>
                                    <Form name="password" label="password" onChange={handleChange} onBlur={handleBlur}/>
                                    <Form name="confirmPassword" label="Confirm Password" onChange={handleChange} onBlur={handleBlur}/>
                                    <div>
                                        <label />
                                        <button className="primary" type="submit">Register</button>    
                                    </div>
                                </form>
                                <div className="login">
                                    Already have an account? <Link to="/signin">Sign in instead</Link>
                                </div>
                            </div>
                        )
                    }}    
                </Formik>   
            </div> 
        </div>
    )
}

export default RegisterScreen

import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import {Formik} from "formik";
import * as yup from "yup";
import Form from "../utils/Form";

const formSchema = yup.object().shape({
    email: yup.string().email("Email must be valid").required("Email Required"),
    password: yup.string().required("Password Needed")
})

function SigninScreen() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault() 
    }
    return (
        <div className="row top">
            <div className="col-2 noSp">
                <img className="loginImage" src="../../../images/login_page_image.png" alt="login page"/>
            </div>
            <div className="col-2 noSp flex">
                <Formik
                initialValues={{ email: "", password: ""}}
                validationSchema={formSchema}
                onSubmit={data => {
                    console.log(data)
                }}>
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
                                <h1>Sign In</h1>
                                <form className="loginForm" onSubmit={handleSubmit}>
                                    <Form name="email" label="email" onChange={handleChange} onBlur={handleBlur}/>
                                    <Form name="password" label="password" onChange={handleChange} onBlur={handleBlur}/>
                                    <div>
                                        <label />
                                        <button className="primary" type="submit">Sign In</button>    
                                    </div>
                                </form>
                                <div className="loginRegister">
                                    Don't have an account yet? <Link to="/register">Join the Crypto Tees family</Link>
                                </div>
                            </div>
                        )
                    }}
                </Formik>
            </div>
        </div>
    )
}

export default SigninScreen

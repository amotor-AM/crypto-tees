import React from "react";
import { useField } from "formik";

const Form = (props) => {
  const [field, meta] = useField(props.name);
  return (
      <>
    <div className="inputForm">
        <input className="inputBox" {...field} {...props} autocomplete="off" required/>
        {props.label && <label className="labelName" htmlFor={props.name}>
            <span className="contentName">{props.name}</span>        
        </label>}  
    </div>
    <div className="errorBox">
        {meta.error && meta.touched && <p className="error">{meta.error}</p>}
    </div>
    </>
  );
};

export default Form;
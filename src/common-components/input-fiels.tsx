import React from "react";

const Input = ({name, value, label, onChange, error, type} : any ) => {
    
    return (
        <React.Fragment>
            <label htmlFor={name} className="form-label">{label}</label>
            <input className="form-control"
             id={name} aria-describedby="username" name={name}
             value={value}
             type={type}
             onChange={onChange}/> 
             { error && <div className="alert alert-danger">{error}</div>}
        </React.Fragment>
    );
}

export default Input;
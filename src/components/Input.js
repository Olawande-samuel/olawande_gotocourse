import React from "react";

const Input = ({ label, type, name, handleChange, errorMessage, myclassname, readOnly, required=false, pattern, value, placeholder, ...props }) => {

  return (
    <div className="form-group my-1" {...props}>
      <label htmlFor={name} className="form-label generic_label">
        {label}
      </label>
      <div className="input-group input_wrapper">
        <input
          type={type ? type: "text"}
          id={name}
          name={name}
          readOnly={readOnly}
          className={`${myclassname} form-control generic_input`}
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
          pattern={pattern}
          required={required}
          autoComplete="new-password"
        />
        <span className="text-danger passError" style={{fontSize:"11px"}}>{errorMessage}</span>
      </div>
    </div>
  );
};

export default Input;

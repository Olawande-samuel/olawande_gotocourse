import React from "react";

const Input = ({ label, type, name, handleChange, readOnly, value,placeholder, ...props }) => {
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
          className="form-control generic_input"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;

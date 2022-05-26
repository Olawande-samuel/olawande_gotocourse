import React from "react";

const Input = ({ label, type, name, handleChange, value }) => {
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label generic_label">
        {label}
      </label>
      <div className="input-group input_wrapper">
        <input
          type={type ? type: "text"}
          id={name}
          name={name}
          className="form-control generic_input"
          placeholder={name}
          onChange={handleChange}
          value={value}
        />
      </div>
    </div>
  );
};

export default Input;

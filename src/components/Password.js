import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
const Password = ({ label, password, name, handleChange, value, placeholder }) => {
  const [type, setType] = useState(false);
  return (
    <div className="form-group mb-3">
      <label htmlFor={name} className="form-label generic_label">
        {label}
      </label>
      <div className="input-group input_wrapper">
        <input
          type={type ? "text" : "password"}
          id={name}
          name={name}
          className="form-control generic_input"
          placeholder={placeholder}
          onChange={handleChange}
          value={value}
        />
        {password === "password" ? (
          <span className="eye">
            {type === true ? (
              <i>
                <BsEyeSlash onClick={() => setType(false)} />
              </i>
            ) : (
              <i>
                <BsEye onClick={() => setType(true)} />
              </i>
            )}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Password
;

import React, { useState } from "react";
import { BsEyeSlash, BsEye } from "react-icons/bs";
const Password = (props) => {
  const {label, password, errorMessage, myclassname, handleChange,  id, ...inputProps } = props
  const [type, setType] = useState(false);
  return (
    <div className="form-group mb-3">
      <label htmlFor={id} className="form-label generic_label">
        {label}
      </label>
      <div className="input-group input_wrapper flex-column">
        <input
          type={type ? "text" : "password"}
          id={id}
          className={`${myclassname} form-control generic_input`}
          onChange={handleChange}
          autoComplete="new-password"
          {...inputProps}
         
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
        <span className="text-danger passError" style={{fontSize:"11px"}}>{errorMessage}</span>
      </div>
      
    </div>
  );
};

export default Password
;

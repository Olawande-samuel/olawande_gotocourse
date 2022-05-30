import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";


import avif from "../../images/alogin.avif"
import webp from "../../images/alogin.webp"
import png from "../../images/alogin.png"
const AdminLogin = () => {

  const image ={
    avif,
    webp,
    png
  }
  return (
    <SignInWrapper image={image}>
      <div className="form-wrapper">
        <div className="log_navigate">
          <span>
            <Link to="/admin/signup">Sign Up</Link>
          </span>
          <span>|</span>
          <span className="selected">
            <Link to="/admin/login">Log in</Link>
          </span>
        </div>
        <form action="" className="form">
          <Input label="Email" name="Email" type="email" placeholder="Email" />
          <Password label="Password" name="Password" password="password" placeholder="Password" />
          <button className="button button-lg log_btn w-100 mb-4">
            Log in
          </button>
          <div className="forgot">
            <p>
              Forget password?{" "}
              <span>
                <Link to="/">Click here to reset password</Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </SignInWrapper>
  );
};

export default AdminLogin;

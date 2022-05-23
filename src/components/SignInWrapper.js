import React from "react";
import Logo from "../images/Logo.png";
import Log from "../images/hands.png";
import Input from "./Input";
import Password from "./Password";
import { Link } from "react-router-dom";

const SignInWrapper = ({ image, children }) => {
  return (
    <section className="signWrapper">
      <header className="log_header">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
        </Link>
      </header>
      <main className="d-flex">
        <div className="log_left">
          <img src={image ? image : Log} alt="" />
        </div>
        <div className="log_right">
          <div className="log_top">
            <h1 className="log_title">
            Learn high in demand skills from industry experts from any part of the world
            </h1>
            <span>
              Already have an account? <Link to="/">Sign in</Link>
            </span>
          </div>
          {children}
        </div>
      </main>
    </section>
  );
};

export default SignInWrapper;

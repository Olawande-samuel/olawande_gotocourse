import React from "react";
import Logo from "../images/Logo.png";
import Log from "../images/hands.webp";
import Input from "./Input";
import Password from "./Password";
import { Link } from "react-router-dom";

const SignInWrapper = ({ image, children }) => {
  return (
    <section className="signWrapper">
      <div className="h-100">
      <header className="log_header">
        <Link to="/">
          <img src={Logo} alt="" className="logo" />
        </Link>
      </header>

      <main className="d-flex ">
        <div className="log_left">
          <picture>
            <source srcset={image.avif} type="image/avif" />
            <source srcset={image.webp} type="image/webp" />
            <img src={image.png} alt="hands on laptop"  />
          </picture>

        </div>
        <div className="log_right">
          <div className="log_top">
            <h1 className="log_title">
              Learn high in demand skills from industry experts from any part of
              the world
            </h1>
            <span style={{fontSize:"14px"}}>
              Already have an account? <Link to="/login">Sign in</Link>
            </span>
          </div>
          {children}
        </div>
      </main>
      </div>
    </section>
  );
};

export default SignInWrapper;

import React from "react";
import {Link} from "react-router-dom";
import Logo from "../images/Logo.png";
import {BiArrowBack} from "react-icons/bi"
const SignInWrapper = ({ image, children }) => {
  return (
    <section className="signWrapper">
      <div className="back">
        <Link to="/">
          <i><BiArrowBack style={{fontSize:"30px"}} /></i>
        </Link>
      </div>
      <div style={{display:"grid", placeItems:"center", width:"min(100% - .5rem, 600px)"}}>
        <header>
          <Link to="/" >
          <img src={Logo} alt="" />
          </Link>
        </header>
        <main className="mt-4">{children}</main>
      </div>
    </section>
  );
};

export default SignInWrapper;

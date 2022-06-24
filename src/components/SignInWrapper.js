import React from "react";
import {Link, useNavigate} from "react-router-dom";
import Logo from "../images/Logo.png";
import {BiArrowBack} from "react-icons/bi"
const SignInWrapper = ({ image, children }) => {
  const navigate = useNavigate()
  return (
    <section className="signWrapper">
      <div className="back">
        <div onClick={()=>{
          navigate(-1)
        }}>
          <i><BiArrowBack style={{fontSize:"30px"}} /></i>
        </div>
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

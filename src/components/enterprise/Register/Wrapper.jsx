import React from "react";
import {Link, useNavigate} from "react-router-dom";
//  import Logo from "../images/Logo.png";
import {BiArrowBack} from "react-icons/bi"
// import {Logo as ImageLogo, Logosm} from "../images/components/svgs"
// import {ToastContainer} from "react-toastify"

const Wrapper = ({ image, children }) => {
  const navigate = useNavigate()
  return (
    <section className="enterpriseWrapper">

      <div className="back">
        <div onClick={()=>{
          navigate("/")
        }}>
          <i><BiArrowBack style={{fontSize:"30px", cursor:"pointer"}} color="#ffffff" /></i>
        </div>
      </div>


      <div className="enterpriseWrapper_background">
        <div className="signWrapper_logo_container">
              <div className="signWrapper_logo">
                <Link to="/" >
                <div className="signWrapper_logo_text text-center text-white">
                  <h1>GO<span>2</span>COURSE</h1>
                </div>
                </Link>
              </div>
              
        </div>
      </div>

      <div>
        <div style={{display:"grid", placeItems:"center", width:"min(100% - .5rem, 600px)",  height:"100%", margin:"auto"}}>
        
          <header className="signWrapper_header">
            <Link to="/" >
            <div className="signWrapper_logo_text text-center text-white">
                  <h1>GO<span>2</span>COURSE</h1>
                </div>   
            </Link>
          </header>
          <main className="mt-4">{children}</main>
        </div>
      </div>
    </section>
  );
};

export default Wrapper;

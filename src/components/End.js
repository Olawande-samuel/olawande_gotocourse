import React from 'react'
import {useLocation} from "react-router-dom"
import {FaInstagram, FaFacebook, FaTwitter, FaEnvelope} from "react-icons/fa"
import { useAuth } from "../contexts/Auth"
const End = () => {
  const {otherFunctions:{validateURL}} = useAuth()
  const location = useLocation();
  const celebRoute = location.pathname.split("/")[1] === "lounge"
  const landing = location.pathname.split("/")[1] === "" ||location.pathname.split("/")[1] ==="become-a-teacher" || location.pathname.split("/")[1] ==="classes";
  const  facebook = "https://www.facebook.com/realztechinstitute/";
  const  insta = "https://instagram.com/mygotocourse?igshid=YmMyMTA2M2Y=";
  const  twitter = "https://twitter.com/mygotocourse?s=09";


  return (
    <div className="end" style={{
       background: "var(--blue-ish)", color: "var(--theme-blue)" 
      }}>
      <div className="container box d-flex  mx-auto" style={{color:  "var(--theme-blue)"}}>
        <div className="end_left">
          <span> All rights reserved |</span>
          <span>&copy; 2022 Gotocourse Inc.</span>
        </div>
        <div className="end_right d-flex" style={{color: "var(--theme-blue)"}} color={ "var(--theme-blue)"} >
          <a href={validateURL(facebook) ? facebook : ""}>
           <FaFacebook color={ "var(--theme-blue)"} />
          </a>
          <a href={validateURL(insta) ? insta : ""}>
           <FaInstagram color={ "var(--theme-blue)"}  />
          </a>
          <a href={validateURL(twitter) ? twitter : ""}>
           <FaTwitter color={ "var(--theme-blue)"}  />
          </a> 
          <a href="mailto:info@gotocourse.com">
           <FaEnvelope color={ "var(--theme-blue)"}  />
          </a>
        </div>
      </div>
    </div>
  )
}

export default End
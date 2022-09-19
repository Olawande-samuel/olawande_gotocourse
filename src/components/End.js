import React from 'react'
import {useLocation} from "react-router-dom"
import {FaInstagram, FaFacebook, FaTwitter, FaEnvelope} from "react-icons/fa"
import { useAuth } from "../contexts/Auth"
const End = () => {
  const {otherFunctions:{validateURL}} = useAuth()
  const location = useLocation();
  const celebRoute = location.pathname.split("/")[1] === "lounge"
  const landing = location.pathname.split("/")[1] === ""
  const  facebook = "https://www.facebook.com/realztechinstitute/";
  const  insta = "https://instagram.com/mygotocourse?igshid=YmMyMTA2M2Y=";
  const  twitter = "https://twitter.com/mygotocourse?s=09";


  return (
    <div className="end" style={{
       background: celebRoute ?  "#000F62" : landing ?"var(--blue-ish)" :"var(--theme-blue)", color: landing ?  "var(--theme-blue)" :  "#fffff"
      }}>
      <div className="container box d-flex  mx-auto" style={{color: landing ?  "var(--theme-blue)" :  "#fffff"}}>
        <div className="end_left">
          <span> All rights reserved |</span>
          <span>&copy; 2022 Gotocourse Inc.</span>
        </div>
        <div className="end_right d-flex" style={{color: landing ?  "var(--theme-blue)" :  "#fffff"}} color={landing ? "var(--theme-blue)":"#FFF"} >
          <a href={validateURL(facebook) ? facebook : ""}>
           <FaFacebook color={landing ? "var(--theme-blue)":"#FFF"} />
          </a>
          <a href={validateURL(insta) ? insta : ""}>
           <FaInstagram color={landing ? "var(--theme-blue)":"#FFF"}  />
          </a>
          <a href={validateURL(twitter) ? twitter : ""}>
           <FaTwitter color={landing ? "var(--theme-blue)":"#FFF"}  />
          </a>
          <a href="mailto:info@gotocourse.us">
           <FaEnvelope color={landing ? "var(--theme-blue)":"#FFF"}  />
          </a>
        </div>
      </div>
    </div>
  )
}

export default End
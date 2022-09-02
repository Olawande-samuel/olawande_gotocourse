import React from 'react'
import {useLocation} from "react-router-dom"
import {FaInstagram, FaFacebook, FaTwitter, FaEnvelope} from "react-icons/fa"
import { useAuth } from "../contexts/Auth"
const End = () => {
  const {otherFunctions:{validateURL}} = useAuth()
  const location = useLocation();
  const celebRoute = location.pathname.split("/")[1] === "lounge"

  return (
    <div className="end" style={{
       background: celebRoute ?  "#191046" :"var(--theme-blue)", color:  "#fffff"
      }}>
      <div className="container box d-flex  mx-auto text-light">
        <div className="end_left">
          <span> All rights reserved |</span>
          <span>&copy; 2022 Gotocourse Inc.</span>
        </div>
        <div className="end_right d-flex ">
          <a href={validateURL("https://www.facebook.com/realztechinstitute/") ? "https://www.facebook.com/realztechinstitute/" : ""}>
           <FaFacebook />
          </a>
          <a href={validateURL("https://instagram.com/mygotocourse?igshid=YmMyMTA2M2Y=") ? "https://instagram.com/mygotocourse?igshid=YmMyMTA2M2Y=" : ""}>
           <FaInstagram />
          </a>
          <a href={validateURL("https://twitter.com/mygotocourse?s=09") ? "https://twitter.com/mygotocourse?s=09" : ""}>
           <FaTwitter />
          </a>
          <a href="mailto:info@gotocourse.us">
           <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  )
}

export default End
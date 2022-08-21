import React from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaEnvelope} from "react-icons/fa"
import {MdAlternateEmail} from "react-icons/md"
import { useAuth } from "../contexts/Auth"
const End = () => {
  const {otherFunctions:{validateURL}} = useAuth()
  return (
    <div className="end">
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
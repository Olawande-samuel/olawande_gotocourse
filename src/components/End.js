import React from 'react'
import {FaInstagram, FaFacebook, FaTwitter, FaEnvelope} from "react-icons/fa"
import {MdAlternateEmail} from "react-icons/md"
const End = () => {
  return (
    <div className="end">
      <div className="container box d-flex  mx-auto text-light">
        <div className="end_left">
          <span> All rights reserved |</span>
          <span>&copy; 2022 Gotocourse Inc.</span>
        </div>
        <div className="end_right d-flex ">
        <FaFacebook />
        <FaInstagram />
        <FaTwitter />
        <FaEnvelope />
        </div>
      </div>
    </div>
  )
}

export default End
import React from 'react'
import {FaInstagram, FaFacebook} from "react-icons/fa"
import {MdAlternateEmail} from "react-icons/md"
const End = () => {
  return (
    <div className="end">
      <div className="box d-flex  mx-auto text-light">
        <FaFacebook />
        <FaInstagram />
        <MdAlternateEmail />
        <span>GotoCourse@gmail.com</span>
      </div>
    </div>
  )
}

export default End
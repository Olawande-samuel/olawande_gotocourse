import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Password from '../../components/Password'
import SignInWrapper from '../../components/SignInWrapper'
import Admin from "../../images/Admin.webp"

import avif from "../../images/asignup.avif"
import webp from "../../images/asignup.webp"
import png from "../../images/asignup.png"
const AdminSignup = () => {
  const image ={
    avif,
    webp,
    png
  }
  return (
    <SignInWrapper image={image}>
      <div className="form-wrapper">
      <header>
          <h3 className="title">
          Register
          </h3>
        </header>
        <form action="" className="form">
          <Input label="Fullname" name="Fullname" placeholder="Fullname" />
          <Input label="Email" name="Email" type="email" placeholder="Email" />
          <Password label="Password" name="Password" password="password" placeholder="Password" />
          <Password
            label="Confirm Password"
            name="Confirm Password"
            password="password"
            placeholder="Confirm Password"
          />
          <div>
            <button className="button button-md log_btn w-100">Register</button>
          </div>
        </form>
        <p className="mt-4">
          <span>Already have an account? </span>
        <Link to="/admin/login"> Sign in</Link></p>
      </div>
    </SignInWrapper>
  )
}

export default AdminSignup
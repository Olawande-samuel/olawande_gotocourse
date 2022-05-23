import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Password from '../../components/Password'
import SignInWrapper from '../../components/SignInWrapper'
import Admin from "../../images/Admin.png"

const AdminSignup = () => {
  return (
    <SignInWrapper image={Admin}>
      <div className="form-wrapper">
        <div className="log_navigate">
          <span className="selected">
            <Link to="/admin/signup">Sign Up</Link>
          </span>
          <span>|</span>
          <span className="">
            <Link to="/admin/login">Log in</Link>
          </span>
        </div>
        <form action="" className="form">
          <Input label="Fullname" name="Fullname" />
          <Input label="Email" name="Email" type="email" />
          <Password label="Password" name="Password" password="password" />
          <Password
            label="Confirm Password"
            name="Confirm Password"
            password="password"
          />
          <div>
            <button className="button button-lg log_btn w-100">Register</button>
          </div>
        </form>
      </div>
    </SignInWrapper>
  )
}

export default AdminSignup
import React from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/Input'
import Password from '../../components/Password'
import SignInWrapper from '../../components/SignInWrapper'

const Login = () => {
  return (
      <SignInWrapper>
        <div className="form-wrapper">
            <div className="log_navigate">
            <span >
            <Link to="/signup">Sign Up</Link>
          </span>
          <span>|</span>
          <span className="selected">
            <Link to="/login">Log in</Link>
          </span>
            </div>
            <form action="" className="form">
              <Input label="Email" name="Email" type="email" />
              <Password label="Password" name="Password" password="password" />
              <div className="form-check ">
                <input className="form-check-input me-4" type="radio" name="type" id="flexRadioDefault1" checked value="student" />
                <label className="form-check-label" for="flexRadioDefault1">
                 Student
                </label>
              </div>
                <div className="form-check mb-5">
                  <input className="form-check-input me-4" type="radio" name="type" id="flexRadioDefault2" value="teacher"  />
                  <label className="form-check-label" for="flexRadioDefault2">
                   Teacher
                  </label>
                </div>
                <button className="button button-lg log_btn w-100">
                  Log in
                </button>
            </form>
          </div>
      </SignInWrapper>
    // <div>Login</div>
  )
}

export default Login
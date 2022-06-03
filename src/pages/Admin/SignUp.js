import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'


import { AdvancedError } from '../../classes'
import Input from '../../components/Input'
import Password from '../../components/Password'
import SignInWrapper from '../../components/SignInWrapper';
import {useAuth} from "../../contexts/AuthContext";





const AdminSignup = () => {
  const {authFunctions: {register}} = useAuth();
  const [loading, setLoading] = useState(false)
  const [formstate, setFormstate] = useState({
    fullname: "",
    email: "",
    password: "",
    retype_password: ""
  })

  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function submitHandler(e){
    e.preventDefault();
    setLoading(_ => true);
    try{
      if(formstate.password !== formstate.retype_password) throw new Error("Passwords don't match", 0);
      if(formstate.email.trim() === "" || formstate.fullname === "" || formstate.password === "") throw new AdvancedError("All fields are required", 0);
      const {retype_password, ...data} = formstate;
      const res = await register({...data, userType: 'admin'}, 'admin');
      console.log(res);
    }catch(err){
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }finally{
      setLoading(_ => false);
    }
  }


  return (
    <SignInWrapper>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="form-wrapper">
      <header>
          <h2 className="register_title">Become a GO<span>2</span>COURSE teacher</h2>
          <small className="register_subtitle">Become a part of a supportive community, creative course and earn while at it. To join our growing trainers community, turn your passion to courses and we'll make earning easier</small>
          <h3 className="title">
          Register
          </h3>
        </header>
        <form action="" className="form" onSubmit={submitHandler}>
          <Input label="Fullname" handleChange={changeHandler} value={formstate.fullname} name="fullname" placeholder="Fullname" />
          <Input label="Email" handleChange={changeHandler} value={formstate.email} name="email" type="email" placeholder="Email" />
          <Password label="Password" handleChange={changeHandler} value={formstate.password} name="password" placeholder="Password" />
          <Password
            label="Confirm Password" 
            handleChange={changeHandler} 
            value={formstate.retype_password}
            name="retype_password"
            placeholder="Confirm Password"
          />
          {loading ? (
            <button className="button button-lg log_btn w-100">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
          <div>
            <button className="button button-md log_btn w-100" type="submit">Register</button>
          </div>
          )}
        </form>
        <p className="mt-4">
          <span>Already have an account? </span>
        <Link to="/admin/login"> Sign in</Link></p>
      </div>
    </SignInWrapper>
  )
}

export default AdminSignup
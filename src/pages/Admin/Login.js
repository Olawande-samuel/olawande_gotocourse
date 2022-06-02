import React, {useState} from "react";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import { AdvancedError } from "../../classes";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";


import avif from "../../images/alogin.avif"
import webp from "../../images/alogin.webp"
import png from "../../images/alogin.png"
const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const {authFunctions: {login}} = useAuth();
  const [formstate, setFormstate] = useState({
    email: "",
    password: ""
  })

  const image ={
    avif,
    webp,
    png
  }

  async function submitHandler(e){
    console.log(e);
    e.preventDefault();
    setLoading(_ => true);
    try{
      if(formstate.email.trim() === "" || formstate.password.trim() === "") throw new AdvancedError("Both email and password are required fields", 0);
      //do some code
      console.log(formstate);
      const res = await login(formstate, "admin");
      console.log(res);
      const {message, success, statusCode} = res;
      if(!success) throw new AdvancedError(message, statusCode);
      else {
        const {data} = res;

        //check if the keys gotocourse-userdata gotocourse-usertype exists then clear them

        console.log(data);
      }
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

  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  
 
  return (
    <SignInWrapper image={image}>
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
          <h3 className="title">
          Sign In
          </h3>
        </header>
        <form className="form" onSubmit={submitHandler}>
          <Input label="Email" name="email" type="email" value={formstate.email} placeholder="Email" handleChange={changeHandler} />
          <Password label="Password" name="password" value={formstate.password} password="password" placeholder="Password" handleChange={changeHandler} />
          <p className="mt-3">
             <span>Forgot password? </span>
             <Link to="/reset-password">Click here to reset</Link>
            </p>
          {loading ? (
            <button className="button button-lg log_btn w-100">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="button button-md log_btn w-100"
              type="submit"
            >
              Sign In
            </button>
          )}
          <div className="forgot my-4">
          <p className="mt-5">
          <span>Do not have an account? </span>
        <Link to="/admin/signup"> Register</Link></p>
          </div>
        </form>
      </div>
    </SignInWrapper>
  );
};

export default AdminLogin;

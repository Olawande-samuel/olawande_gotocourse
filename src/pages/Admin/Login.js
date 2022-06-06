import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import { AdvancedError } from "../../classes";
import { useAuth } from "../../contexts/Auth";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import { useCookie } from "../../hooks";



const AdminLogin = () => {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const {authFunctions: {login}, setGeneralState} = useAuth();

  const {saveCookie, removeCookie, isCookie} = useCookie();
  const [formstate, setFormstate] = useState({
    email: "",
    password: ""
  })

  

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
          const {data: d} = res;
  
          //before navigating
          //save some thing to cookie and state
          if(isCookie('gotocourse-userdata') || isCookie('gotocourse-usertype')){
            removeCookie('gotocourse-userdata');
            removeCookie('gotocourse-usertype');
          }
          saveCookie('gotocourse-userdata', d);
          saveCookie('gotocourse-usertype', d.userType);
          setGeneralState(old => {
            return {
              ...old,
              notification: res.message,
            }
          })
          navigate("/admin");

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

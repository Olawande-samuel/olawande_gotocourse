import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";


import { useLocalStorage } from "../../hooks";
import { useAuth } from "../../contexts/Auth";
import { ToastContainer, toast } from "react-toastify";
import { AdvancedError } from "../../classes";


const KEY = 'gotocourse-userdata';
const Login = () => {
  const navigate = useNavigate()
  const {authFunctions: {login}, generalState:{pledre}, setGeneralState} = useAuth();
  const {getItem, removeItem} = useLocalStorage();

  const [data, setData] = useState({
    email: "",
    password: "",
    userType: ""
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setData(old => {
      return {
        ...old,
        [name]: value
      }
    })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(data.email.trim() === "" || data.password.trim() === "") return;
    setLoading(true);
    try {
      const response = await login(data, "user");
      console.log(response)
      const {success, statusCode, message} = response;
      
      if(success) {
        const {data: d} = response;
        removeItem(KEY);
        getItem(KEY, d);
        setGeneralState(old => {
          return {
            ...old,
            notification: response.message
          }
        })
        navigate(`${d.userType === 'student' ? "/student" : "/teacher"}`);
      }else throw new AdvancedError(message, statusCode);

    } catch (err) {
      console.error(err.message);
      if (err.statusCode === 0 || err.statusCode === undefined) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }finally{
      setLoading(false);
    }
  };
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
      
      <div className="form-wrapper w-100">
        <header>
          <h3 className="title">
          Sign In
          </h3>
        </header>
        <form className="form" onSubmit={onSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            handleChange={handleChange}
            value={data.email}
            placeholder="Email"
          />
          <Password
            label="Password"
            name="password"
            password="password"
            handleChange={handleChange}
            value={data.password}
            placeholder="Password"
          />
          <p className="mt-3">
             <span>Forgot password? </span>
             <Link to="/forgot-password">Click here to reset</Link>
            </p>
          {loading ? (
            <button className="button button-md log_btn w-100" 
            disabled={loading}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="button button-md log_btn w-100" 
              disabled={loading}
              type="submit"
            >
              Sign In
            </button>
          )}
        </form>
        <p className="mt-5">
          <span>Do not have an account? </span>
        <Link to="/signup"> Register</Link></p>
      </div>
    </SignInWrapper>
    // <div>Login</div>
  );
};

export default Login;

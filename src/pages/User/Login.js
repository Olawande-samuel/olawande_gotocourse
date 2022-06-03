import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";


import { useCookie } from "../../hooks";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { AdvancedError } from "../../classes";


const Login = () => {
  const navigate = useNavigate()
  const {authFunctions: {login}, setGeneralState} = useAuth();
  const {saveCookie} = useCookie();

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
      // if(data.userType.trim() === "") throw new AdvancedError("Missing user type", 0);
      const response = await login(data, "user");

      console.log(response)
      const {success, statusCode, message} = response;
      
      if(success) {
        const {data: d} = response;

        //before navigating
        //save some thing to cookie and state
        saveCookie('gotocourse-userdata', d);
        saveCookie('gotocourse-usertype', d.userType);
        setGeneralState(old => {
          return {
            ...old,
            notification: response.message
          }
        })
        d.userType === "student" ? navigate("/students") : navigate("/teacher");
      }else throw new AdvancedError(message, statusCode);

    } catch (err) {
      console.error(err);
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
             <Link to="/reset-password">Click here to reset</Link>
            </p>
          {/* <div className="form-check ">
            <input
              className="form-check-input me-4"
              type="radio"
              name="userType"
              id="flexRadioDefault1"
              value="student"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              Student
            </label>
          </div>
          <div className="form-check mb-5">
            <input
              className="form-check-input me-4"
              type="radio"
              name="userType"
              id="flexRadioDefault2"
              value="teacher"
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              Teacher
            </label>
          </div> */}
          {loading ? (
            <button className="button button-md log_btn w-100">
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

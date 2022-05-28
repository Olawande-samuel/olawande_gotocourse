import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";


import { useCookie } from "../../hooks";
import { useAuth } from "../../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
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
    setLoading(true);
    try {
      const response = await login(data);

      console.log(response.data)
      const {success} = response;
      if(success) {
        const {data, message, statusCode} = response.data;
        //before navigating
        //save some thing to cookie and state
        saveCookie('gotocourse-token', data.token);
        setGeneralState(oldstate => {
          let {token, ...userdata} = data;
          return {
            ...oldstate,
            userdata
          }
        })
        navigate("/students");
      }else {
        toast.error(response.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    //   if(response.data.statusCode !== 0){
    //     window.location.replace("https://gotocourse.com/dashboard")
    // }
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error(err);
      if (err.response.data.statusCode === 0) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
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
      <div className="form-wrapper">
        <div className="log_navigate">
          <span>
            <Link to="/signup">Sign Up</Link>
          </span>
          <span>|</span>
          <span className="selected">
            <Link to="/login">Log in</Link>
          </span>
        </div>
        <form className="form">
          <Input
            label="Email"
            name="email"
            type="email"
            handleChange={handleChange}
            value={data.email}
          />
          <Password
            label="Password"
            name="password"
            password="password"
            handleChange={handleChange}
            value={data.password}
          />
          <div className="form-check ">
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
          </div>
          {loading ? (
            <button className="button button-lg log_btn w-100">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="button button-lg log_btn w-100"
              onClick={onSubmit}
            >
              Log in
            </button>
          )}
        </form>
      </div>
    </SignInWrapper>
    // <div>Login</div>
  );
};

export default Login;

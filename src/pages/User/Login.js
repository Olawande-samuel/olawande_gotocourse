import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://gotocourse.loftywebtech.com:9000/user/signin",
        JSON.stringify(data),
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      toast.success(response.data.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    navigate("https://gotocourse.com/dashboard")

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
            <label className="form-check-label" for="flexRadioDefault1">
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
            <label className="form-check-label" for="flexRadioDefault2">
              Teacher
            </label>
          </div>
          {loading ? (
            <button className="button button-lg log_btn w-100">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
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

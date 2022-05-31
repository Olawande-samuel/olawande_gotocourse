import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { AdvancedError } from "../../classes";
import {useCookie} from "../../hooks";

import avif from "../../images/signup.avif";
import webp from "../../images/signup.webp";
import png from "../../images/signup.png";
const SignUp = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    retype_password: "",
    userType: ""
  })

const image = {
  avif,
  webp,
  png,
};
const {saveCookie} = useCookie();
  const {authFunctions: {register}, setGeneralState} = useAuth();
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const handleChange=(e)=>{
    const {name, value} = e.target;
    setData(old => {      
return {
        ...old,
        [name]: value,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { retype_password, ...others } = data;
      if (
        others.firstName.trim() === "" ||
        others.lastName.trim() === "" ||
        others.email.trim() === "" ||
        others.phoneNumber.trim() === "" ||
        others.password.trim() === ""
      )
        return;
      if (others.userType.trim() === "")
        throw new AdvancedError("User type is required", 0);
      if (retype_password !== others.password)
        throw new AdvancedError("Passwords don't match", 0);
      console.log(others);
      const response = await register(others, "user");

      console.log(response);
      let { success, message, statusCode } = response;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        //successfully done
        //update the cookie
        const {data} = response;
        saveCookie('gotocourse-userdata', data);
        saveCookie('gotocourse-usertype', others.userType);
        setGeneralState(old => {
          return {
            ...old,
            notification: message
          }
        })
        others.userType === "student" ? navigate("/students") : navigate("/teachers");
      }
    } catch (err) {
      console.error(err.message, err.statusCode);
      if (err.statusCode === 0) {
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
    } finally {
      setLoading(false);
    }
  };
  return (
    <SignInWrapper image={image}>
      <ToastContainer
        position="top-right"
        autoClose={4000}
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
          <span className="selected">
            <Link to="/signup">Sign Up</Link>
          </span>
          <span>|</span>
          <span className="">
            <Link to="/login">Log in</Link>
          </span>
        </div>

        <form action="" className="form" onSubmit={onSubmit}>
          <div className="row">
            <div className="col-sm-6">
              <Input
                label="Firstname"
                name="firstName"
                value={data.firstName}
                handleChange={handleChange}
                placeholder="Firstname"
              />
            </div>
            <div className="col-sm-6">
              <Input
                label="Lastname"
                name="lastName"
                value={data.lastName}
                handleChange={handleChange}
                placeholder="Lastname"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8">
              <Input
                label="Email"
                name="email"
                type="email"
                value={data.email}
                handleChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="col-sm-4">
              <Input
                label="Phone"
                name="phoneNumber"
                type="phone"
                value={data.phoneNumber}
                handleChange={handleChange}
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <Password
                label="Password"
                name="password"
                password="password"
                value={data.password}
                handleChange={handleChange}
                placeholder="Password"
              />
            </div>
            <div className="col-sm-6">
              <Password
                label="Confirm Password"
                name="retype_password"
                password="password"
                placeholder="Confirm Password"
                value={data.retype_password}
                handleChange={handleChange}
              />
            </div>
          </div>
          <div>
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
            <div className="form-check">
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
            <div className="form-check">
              <input
                className="form-check-input me-4"
                type="radio"
                name="userType"
                id="flexRadioDefault2"
                value="mentor"
                onChange={handleChange}
              />
              <label className="form-check-label" for="flexRadioDefault2">
                Mentor
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
                className="button button-md log_btn w-100"
                onClick={onSubmit}
                type="submit"
              >
                Register
              </button>
            )}
          </div>
        </form>
      </div>
    </SignInWrapper>
  );
};

export default SignUp;

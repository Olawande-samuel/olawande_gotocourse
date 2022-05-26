import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";

const SignUp = () => {
  const [data, setData]= useState({
    lastName:"Doe"
  })
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const handleChange=(e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }
  const dat = JSON.stringify(data)
  console.log(dat)

  const onSubmit =async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const response = await axios.post("http://gotocourse.loftywebtech.com:9000/user/signup", dat, {
        headers:{
          "content-type": "application/json"
      }
      
    })
    navigate("https://gotocourse.com/dashboard")
    toast.success(response.data.message, {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setLoading(false)
    console.log(response)
  } catch(err){
    setLoading(false)
    console.error(err)
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
  }
  return (
    <SignInWrapper>
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
        <form action="" className="form">
          <Input label="Fullname" name="firstName" value={data.firstName}  handleChange={handleChange}  />
          <Input label="Email" name="email" type="email" value={data.email} handleChange={handleChange}   />
          <Input label="Phone" name="phoneNumber" type="phone" value={data.phoneNumber} handleChange={handleChange}   />
          <Password label="Password" name="password" password="password" value={data.password} handleChange={handleChange}   />
          <Password
            label="Confirm Password"
            name="Confirm Password"
            password="password"
          />
          <div>
          <div className="form-check ">
                <input className="form-check-input me-4" type="radio" name="userType" id="flexRadioDefault1"  value="student" onChange={handleChange} />
                <label className="form-check-label" for="flexRadioDefault1">
                 Student
                </label>
              </div>
                <div className="form-check">
                  <input className="form-check-input me-4" type="radio" name="userType" id="flexRadioDefault2" value="teacher" onChange={handleChange}  />
                  <label className="form-check-label" for="flexRadioDefault2">
                   Teacher
                  </label>
                </div>
                <div className="form-check mb-5">
                  <input className="form-check-input me-4" type="radio" name="userType" id="flexRadioDefault2" value="mentor" onChange={handleChange}  />
                  <label className="form-check-label" for="flexRadioDefault2">
                   Mentor
                  </label>
                </div>
                {loading ? 
                <button className="button button-lg log_btn w-100">
                  <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              </button>
                :
              <button className="button button-lg log_btn w-100" onClick={onSubmit}>Register</button>
              }
          </div>
        </form>
      </div>
    </SignInWrapper>
  );
};

export default SignUp;

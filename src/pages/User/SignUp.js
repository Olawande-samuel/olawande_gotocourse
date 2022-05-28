import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
  const [data, setData]= useState({
    firstName: "",
    lastName:"",
    phoneNumber: "",
    email: "",
    password: "",
    retype_password: "",
    userType: ""
  })
  const {authFunctions: {register}} = useAuth();
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate()
  const handleChange=(e)=>{
    const {name, value} = e.target;
    setData(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  const onSubmit =async(e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      let {retype_password, ...others} = data;
      console.log(others)
      const response = await register(others);

  console.log(response)

    // window("https://gotocourse.com/dashboard")
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
  //   if(response.data.statusCode !== 0){
  //     window.location.replace("https://gotocourse.com/dashboard")
  // }
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
          <Input label="Firstname" name="firstName" value={data.firstName}  handleChange={handleChange}  placeholder="Firstname" />
          <Input label="Lastname" name="lastName" value={data.lastName}  handleChange={handleChange}  placeholder="Lastname" />
          <Input label="Email" name="email" type="email" value={data.email} handleChange={handleChange}    placeholder="Email"/>
          <Input label="Phone" name="phoneNumber" type="phone" value={data.phoneNumber} handleChange={handleChange}  placeholder="Phone Number"  />
          <Password label="Password" name="password" password="password" value={data.password} handleChange={handleChange}  placeholder="Password"  />
          <Password
            label="Confirm Password"
            name="retype_password"
            password="password"
            placeholder="Confirm Password"
            value={data.retype_password}
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
                  <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
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

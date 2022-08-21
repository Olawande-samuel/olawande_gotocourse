import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/Auth";
import { AdvancedError } from "../../classes";
import { useLocalStorage } from "../../hooks";




const KEY = 'gotocourse-userdata';
const SignUp = () => {
  const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    retype_password: "",
    userType: "student",
    fullname: "",
  });
  const [focus, setFocus] =useState(false)

  useEffect(() => {
    if (data.fullname !== "") {
      const name = data.fullname.split(" ");
      setData((old) => {
        return { ...old, firstName: name[0], lastName: name.slice(-1)[0] };
      });
    }
  }, [data.fullname]);

  const { getItem, removeItem } = useLocalStorage();
  const {
    authFunctions: { register }, generalState,
    setGeneralState,
  } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

console.log(generalState.pledre)
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let { retype_password, ...others } = data;
      if(!emailReg.test(others.email) || !passReg.test(others.password)) 
        throw new AdvancedError("Invalid email or password", 0)
      if (others.email.trim() === "" || others.password.trim() === "")
       throw new AdvancedError("Fields cannot be empty", 0);
      if (retype_password !== others.password)
        throw new AdvancedError("Passwords don't match", 0);
        // main dashboard
      const response = await register(others, "user");
      console.log(data.password)

      // second dashboard
      const res = await generalState.pledre.signUpStudent({
        name:`${data.firstName} ${data.lastName}`,
        email: data.email,
        password:`${data.password}`
      })
    
      console.log(res)

      let { success, message, statusCode } = response;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        //successfully done
        //update the localStorage
        const { data } = response;
        removeItem(KEY);
        getItem(KEY, data);
        localStorage.setItem("gotocourse-pledre-user", JSON.stringify(res)) 
        setGeneralState((old) => {
          return {
            ...old,
            notification: message,
          };
        });
        navigate("/student");
      }
    } catch (err) {
      console.error(err)
      toast.error(err.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      if (err.statusCode === 0) {
      }
    } finally {
      setLoading(false);
    }
  };
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
      <div className="form-wrapper w-100">
        <header>
          <h3 className="title">Register</h3>
        </header>
        <form className="form" onSubmit={onSubmit}>
          <Input
            label="Fullname"
            name="fullname"
            value={data.fullname}
            handleChange={handleChange}
            placeholder="Fullname"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={data.email}
            handleChange={handleChange}
            placeholder="Email"
          />
          <Password
            label="Password"
            name="password"
            password="password"
            value={data.password}
            handleChange={handleChange}
            placeholder="Password"
            focus ={()=>setFocus(true)}
            blur={()=>setFocus(false)}
          />
          {focus && !passReg.test(data.password) &&
            <small style={{fontSize:"11px"}}>
              <p className="text-danger">Password must satisfy the following conditions</p>
              <p className="text-danger"> - At least one upper case English letter</p>
              <p className="text-danger"> - At least one lower case English letter</p>
              <p className="text-danger"> - At least one digit</p>
              <p className="text-danger"> - At least one special character</p>
              <p className="text-danger"> - Minimum eight in length</p>
            </small>
          }
          <Password
            label="Confirm Password"
            name="retype_password"
            password="password"
            placeholder="Confirm Password"
            value={data.retype_password}
            handleChange={handleChange}
          />
          {/* <div className="form-check ">
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
            value="mentor"
            onChange={handleChange}
            />
            <label className="form-check-label" for="flexRadioDefault2">
            Mentor
            </label> 
            </div> */}
          {/*
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
              */}
          {loading ? (
            <button className="button button-md log_btn w-100 mt-3">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="button button-md log_btn w-100 mt-3"
              onClick={onSubmit}
              type="submit"
            >
              Register
            </button>
          )}
        </form>
        <p className="mt-4">
          <span>Already have an account? </span>
          <Link to="/login"> Sign in</Link>
        </p>
      </div>
    </SignInWrapper>
  );
};

export default SignUp;

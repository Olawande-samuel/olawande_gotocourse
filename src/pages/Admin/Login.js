import React, {useState} from "react";
import { Link } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import { AdvancedError } from "../../classes";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import Admin from "../../images/Admin.webp";


const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const {authFunctions: {login}} = useAuth();
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
    <SignInWrapper image={Admin}>
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
            <Link to="/admin/signup">Sign Up</Link>
          </span>
          <span>|</span>
          <span className="selected">
            <Link to="/admin/login">Log in</Link>
          </span>
        </div>
        <form className="form" onSubmit={submitHandler}>
          <Input label="Email" name="email" type="email" value={formstate.email} placeholder="Email" handleChange={changeHandler} />
          <Password label="Password" name="password" value={formstate.password} password="password" placeholder="Password" handleChange={changeHandler} />
          {loading ? (
            <button className="button button-lg log_btn w-100">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="button button-lg log_btn w-100"
              type="submit"
            >
              Log in
            </button>
          )}
          <div className="forgot">
            <p>
              Forget password?{" "}
              <span>
                <Link to="/">Click here to reset password</Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </SignInWrapper>
  );
};

export default AdminLogin;

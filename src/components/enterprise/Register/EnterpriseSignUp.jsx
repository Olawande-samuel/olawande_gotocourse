import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
import Input from "../../Input";
import Password from "../../Password";
import SignInWrapper from "./Wrapper";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../../contexts/Auth";
import { VERIFICATION_KEY } from "../../../constants";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";



import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { authentication, provider, facebookProvider } from "../../../firebase-config.js"
import goo from "../../../images/goo.png"
import face from "../../../images/face.png"


const EnterpriseSignUp = () => {
  const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    retype_password: "",
    userType: "school",
    fullname: "",
  });
  const [focus, setFocus] =useState(false)
  const { authFunctions: { register ,googleSignUp, facebookSignUp}, generalState, setGeneralState, } = useAuth();
  const { getItem, removeItem, updateItem } = useLocalStorage();
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.fullname !== "") {
      const name = data.fullname.split(" ");
      setData((old) => {
        return { ...old, firstName: name[0], lastName: name.slice(-1)[0] };
      });
    }
  }, [data.fullname]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  };

  // Email and Password
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(data)
    
    setLoading(true);
    try {
      let { retype_password, ...others } = data;
      if(!emailReg.test(others.email) || !passReg.test(others.password)) 
        throw new AdvancedError("Invalid email or password", 0)
      if (others.email.trim() === "" || others.password.trim() === "")
       throw new AdvancedError("Fields cannot be empty", 0);
      if (retype_password !== others.password)
        throw new AdvancedError("Passwords don't match", 0);
      // main 
        const response = await register({...others});
        let { success, message, statusCode } = response;
        if (!success) throw new AdvancedError(message, statusCode);
        else {
          const { data } = response;
          // set item
          updateItem(VERIFICATION_KEY, data);
          setGeneralState((old) => {
            return {
              ...old,
              notification: message,
            };
          });
          navigate(`/email`);
        }
    } catch (err) {
      console.error({err})
      toast.error(err.message);
      if (err.statusCode === 0) {
      }
    } finally {
      setLoading(false);
    }
  };

// SOCIAL SIGNUP
  async function socialSignUp(token, type){
    try{
      const res = type === "google" ? await googleSignUp(token) : await facebookSignUp(token)
      console.log(res)
      if(res.statusCode !== 1) throw new AdvancedError(res.message, res.statusCode)
      localStorage.setItem(VERIFICATION_KEY, JSON.stringify(res.data))
      navigate("/user-onboarding")
    }catch(err){
      toast.error(err.message);
    }
  }
   
  function signUpWithGoogle(e){
    e.preventDefault()
    signInWithPopup(authentication, provider).then(res=>{
        console.log(res)
      if(res.user?.accessToken){
        let token =  {
          accessToken: res.user.accessToken,
          userType: "student"
        }
        socialSignUp(token, "google")
      }
    }
    ).catch(err=>{
      allowOnAccountExistError(err, "google", "student")
      toast.error(err.message);
    }
    )
  }
   function signUpWithFacebook(e){
    e.preventDefault()
    signInWithPopup(authentication, facebookProvider).then(res=>{
      console.log(res)
      if(res.user?.accessToken){
        if(res.user?.accessToken){
          let token =  {
          accessToken: res.user.accessToken,
          userType: "student"
         }
         socialSignUp(token, "facebook")
        }
      }
    }
  ).catch(err=>{
      console.error(err)
      allowOnAccountExistError(err, "facebook", "student")
      toast.error(err.message);
      }
    )
  }



  function allowOnAccountExistError(error, type, usertype) {
    console.log("customdata mail", error.customData.email);
    setLoading(true)
    if (type === "google") {
      const credential = FacebookAuthProvider.credentialFromError(error);
      googleSignUp({
        accessToken: credential.accessToken,
        userType: usertype,
      })
        .then((res) => {
          setLoading(false);
          if (res.statusCode !== 1)
            throw new AdvancedError(res.message, res.status);
          localStorage.setItem(VERIFICATION_KEY, JSON.stringify(res.data));
          navigate("/user-onboarding")
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error(err.message);
        });
    } else {
      const gcredential = GoogleAuthProvider.credentialFromError(error);
      facebookSignUp({
        accessToken: gcredential.accessToken,
        userType: usertype,
      })
        .then((res) => {
          setLoading(false);
          if (res.statusCode !== 1)
            throw new AdvancedError(res.message, res.status);
          localStorage.setItem(VERIFICATION_KEY, JSON.stringify(res.data));
          navigate("/user-onboarding")
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error(err.message);
        });
    }
  } 


  // password input validation
  function handlePasswordBlur(){
    setFocus(false)
    if(!passReg.test(data.password)){
      
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
      <div className="form-wrapper w-100">
        <header>
          <h3 className="title" style={{fontWeight: "700"}}>Register</h3>
        </header>
        {/* <div className="social_signIn_wrapper">
          <motion.button className="facebook d-block mb-3"
            whileHover={{ 
              boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
              textShadow:"0px 0px 8px rgb(255, 255, 255)",
              backgroundColor: "#eee"
            }}
            onClick={signUpWithGoogle}
          >
              <i className="me-4">
                  <img src={goo} alt="" width={25} height={25} />
              </i>
              Register with Google
          </motion.button>
          
            <motion.button className="google d-block mb-3"
              whileHover={{ 
                boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                textShadow:"0px 0px 8px rgb(255, 255, 255)",
                backgroundColor: "#eee"
              }}
              onClick={signUpWithFacebook}
            >
            <i className="me-2">
                    <img src={face} alt="" width={25} height={25} />
                </i>
                Register with Facebook
            </motion.button>
          <small className="or d-block"><span>or</span></small>
        </div> */}
        <form className="form" onSubmit={onSubmit}  autoComplete="off">
          <Input
            label="Full Name"
            name="fullname"
            value={data.fullname}
            handleChange={handleChange}
            placeholder="Firstname Lastname"
            required={true}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            myclassname="email_input"
            value={data.email}
            handleChange={handleChange}
            placeholder="example@email.com"
            required={true}
            pattern="^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$"
            errorMessage="Enter a valid email address"
          />
          <Input
            label="Organisation"
            name="organisation"
            type="text"
            myclassname="email_input"
            value={data.organisation}
            handleChange={handleChange}
            placeholder="Organisation"
            required={true}
          />
          <Password
            label="Password"
            id="password"
            name="password"
            myclassname="signUpPassword"
            password="password"
            value={data.password}
            handleChange={handleChange}
            placeholder="Password"
            focus ={()=>setFocus(true)}
            blur={handlePasswordBlur}
            pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
            errorMessage="Password must be a minimum of eight characters in length and must contain at least 1 uppercase English letter, 1 lowercase English letter, 1 number and 1 special character"
          />
          <Password
            id="retype_password"
            label="Confirm Password"
            myclassname="confirmPassword"
            name="retype_password"
            password="password"
            placeholder="Confirm Password"
            value={data.retype_password}
            handleChange={handleChange}
            // pattern={data.password}
            errorMessage="Passwords do not match"
          />
          {loading ? (
            <button className="button button-md log_btn w-100 mt-3"
              disabled={loading}
            >
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button
              className="button button-md log_btn w-100 mt-3"
              disabled={loading}
              type="submit"
            >
              Register
            </button>
          )}
        </form>
        <p className="mt-4">
          <span>Already have an account? </span>
          <Link to="/enterprise-login"> Sign in</Link>
        </p>
      </div>
    </SignInWrapper>
  );
};





export default EnterpriseSignUp;

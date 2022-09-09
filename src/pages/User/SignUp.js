import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {motion} from "framer-motion"
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../contexts/Auth";
import { VERIFICATION_KEY } from "../../constants";
import { AdvancedError } from "../../classes";
import { useLocalStorage } from "../../hooks";



import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { authentication, provider, facebookProvider } from "../../firebase-config.js"
import goo from "../../images/goo.png"
import face from "../../images/face.png"


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
    setLoading(true);
    try {
      let { retype_password, ...others } = data;
      if(!emailReg.test(others.email) || !passReg.test(others.password)) 
        throw new AdvancedError("Invalid email or password", 0)
      if (others.email.trim() === "" || others.password.trim() === "")
       throw new AdvancedError("Fields cannot be empty", 0);
      if (retype_password !== others.password)
        throw new AdvancedError("Passwords don't match", 0);
        // second dashboard
        // if(generalState.pledre){
        //   const res = await generalState.pledre.signUpStudent({
        //     name:`${data.firstName} ${data.lastName}`,
        //     email: data.email,
        //     password:`${data.password}`
        //   })
        //   console.log({res})
        //     // Something seems to be wrong when instantiating pledre
        //   if(res.approved){
            // main dashboard
            // const response = await register({...others, pledreStudentId: res._id}, "user");
            const response = await register({...others}, "user");
            let { success, message, statusCode } = response;
            if (!success) throw new AdvancedError(message, statusCode);
            else {
              const { data } = response;
              // set item
              updateItem(VERIFICATION_KEY, data);
              // localStorage.setItem("gotocourse-pledre-user", JSON.stringify(res)) 
              setGeneralState((old) => {
                return {
                  ...old,
                  notification: message,
                };
              });
              navigate("/user-authentication");
            }
          // }

        // } else {
        //   throw new AdvancedError("Something went wrong. Please try again", 0)
        // }
    } catch (err) {
      console.error({err})
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
          userType: "teacher"
        }
        socialSignUp(token, "google")
       }
    }
    ).catch(err=>{
      allowOnAccountExistError(err, "google", "teacher")
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
          userType: "teacher"
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
    const email = error.customData.email;
    console.log("customdata", error.customData);
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
          navigate(
            `${
              usertype === "student"
                ? "/user-onboarding"
                : "/teacher/on-boarding"
            }`
          );
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
          navigate(
            `${
              usertype === "student"
                ? "/user-onboarding"
                : "/teacher/on-boarding"
            }`
          );
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          toast.error(err.message);
        });
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
          <h3 className="title">Register as a student</h3>
        </header>
        <div className="social_signIn_wrapper">
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
        </div>
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

import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { motion} from "framer-motion"

import { AdvancedError } from '../../classes'
import Input from '../../components/Input'
import Password from '../../components/Password'
import SignInWrapper from '../../components/SignInWrapper';
import {useAuth} from "../../contexts/Auth";
import { useLocalStorage } from "../../hooks";
import { VERIFICATION_KEY } from "../../constants";

import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import { authentication, provider, facebookProvider } from "../../firebase-config.js"
import goo from "../../images/goo.png"
import face from "../../images/face.png"

const TeacherSignup = () => {

  const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)
  const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)

  const {authFunctions: {register,googleSignUp, facebookSignUp}, generalState:{pledre}, setGeneralState } = useAuth();
  const [loading, setLoading] = useState(false)
  const [formstate, setFormstate] = useState({
    fullname: "",
    email: "",
    password: "",
    retype_password: "",
    userType: "",
  })
  const [focus, setFocus] =useState(false)

  const navigate = useNavigate();
  const { getItem, removeItem, updateItem } = useLocalStorage();

  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  React.useEffect(() => {
    if (formstate.fullname !== "") {
      const name = formstate.fullname.split(" ");
      setFormstate((old) => {
        return { ...old, firstName: name[0], lastName: name.slice(-1)[0] };
      });
    }
  }, [formstate.fullname]);

  async function submitHandler(e){

    e.preventDefault();
    setLoading(_ => true);
    try{
      let { retype_password, ...others } = formstate;
      if(!emailReg.test(others.email) || !passReg.test(others.password)) 
        throw new AdvancedError("Invalid email or password", 0)
      if (others.email.trim() === "" || others.password.trim() === "") throw new AdvancedError("Fields cannot be empty", 0);
      if (retype_password !== others.password)
        throw new AdvancedError("Passwords don't match", 0);
        const response = await register(others, "user");  
      let { success, message, statusCode } = response;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        console.log({response})
        const res = await pledre.addTeacherToSchool({
          name:`${formstate.firstName} ${formstate.lastName}`,
          email: formstate.email,
          password:`${formstate.password}`
        })
        const { data } = response;
        if(res.approved){
          localStorage.setItem("gotocourse-pledre-user", JSON.stringify(res))
        }
        updateItem(VERIFICATION_KEY, data);
        setGeneralState((old) => {
          return {
            ...old,
            notification: message,
          };
        });
        navigate(`/email`);
      }
    }catch(err){
      toast.error(err.message);
    }finally{
      setLoading(_ => false);
    }
  }
  async function socialSignUp(token, type){
    try{
      const res = type === "google" ? await googleSignUp(token) : await facebookSignUp(token)
      if(res.statusCode !== 1) throw new AdvancedError(res.message, res.statusCode)
      updateItem(VERIFICATION_KEY, res.data);
      navigate("/teacher/on-boarding")
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
      allowOnAccountExistError(err, "facebook", "teacher")
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
            updateItem(VERIFICATION_KEY, res.data);
            navigate("/teacher/on-boarding");
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
            updateItem(VERIFICATION_KEY, res.data);
            navigate("/teacher/on-boarding");
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
      <header>
          <h2 className="register_title">Become a GO<span>2</span>COURSE teacher</h2>
          <small className="register_subtitle">Become a part of a supportive community, creative course and earn while at it. To join our growing trainers community, turn your passion to courses and we'll make earning easier</small>
          <h3 className="title">
          Register
          </h3>
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
        <form action="" className="form" onSubmit={submitHandler}>
          <Input label="Full Name" handleChange={changeHandler} value={formstate.fullname} name="fullname" placeholder="Fullname" />
          <Input 
            label="Email" 
            handleChange={changeHandler} 
            value={formstate.email} 
            name="email" 
            type="email" 
            placeholder="Email"
            myclassname="email_input"
            required={true}
            pattern="^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$"
            errorMessage="Enter a valid email address"
            />
          <Password
            label="Password"
            id="password"
            handleChange={changeHandler}
            value={formstate.password} 
            name="password" 
            placeholder="Password"  
            password="password"
            focus ={()=>setFocus(true)}
            blur={()=>setFocus(false)}
            myclassname="signUpPassword"
            pattern="^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$"
            errorMessage="Password must be a minimum of eight characters in length and must contain at least 1 uppercase English letter, 1 lowercase English letter, 1 number and 1 special character"
          />
          <Password
            id="retype_password"
            label="Confirm Password"
            myclassname="confirmPassword"
            handleChange={changeHandler} 
            value={formstate.retype_password}
            name="retype_password"
            placeholder="Confirm Password"
            password="password"
          />
            
            <div className="form-group d-flex ">
              <input type="radio" name="userType" id="teacher" onChange={changeHandler} value="teacher" />
              <label htmlFor="teacher" className=" generic_label ms-3">Teacher</label>
            </div>
            <div className="form-group d-flex ">
              <input type="radio" name="userType" id="mentor" onChange={changeHandler} value="mentor" />
              <label htmlFor="mentor" className=" generic_label ms-3">Mentor</label>
            </div>
          {loading ? (
            <button className="button button-lg log_btn w-100 mt-4">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
          <div>
            <button className="button button-md log_btn w-100 mt-4" type="submit">Register</button>
          </div>
          )}
        </form>
        <p className="mt-4">
          <span>Already have an account? </span>
        <Link to="/login"> Sign in</Link></p>
      </div>
    </SignInWrapper>
  )
}

export default TeacherSignup
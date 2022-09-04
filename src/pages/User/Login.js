import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Password from "../../components/Password";
import SignInWrapper from "../../components/SignInWrapper";
import {useMutation} from "@tanstack/react-query"
import {motion} from "framer-motion"
import { useLocalStorage } from "../../hooks";
import { useAuth } from "../../contexts/Auth";
import { KEY } from "../../constants";
import { ToastContainer, toast } from "react-toastify";
import { AdvancedError } from "../../classes";
import goo from "../../images/goo.png"
import face from "../../images/face.png"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication, provider, facebookProvider } from "../../firebase-config.js"




const Login = () => {
  const navigate = useNavigate()
  const {authFunctions: {login,googleSignIn, facebookSignIn}, generalState:{pledre}, setGeneralState} = useAuth();
  const {getItem, removeItem} = useLocalStorage();

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
    if(data.email.trim() === "" || data.password.trim() === "") return;
    setLoading(true);
    try {
      const response = await login(data, "user");
      console.log(response)
      const {success, statusCode, message} = response;
      
      if(success) {
        const {data: d} = response;
        console.log({response})
        removeItem(KEY);
        setGeneralState(old => {
          return {
            ...old,
            notification: response.message
          }
        }) 
        if(d.userType === "student"){
          getItem(KEY, d);

          navigate("/student")

        } else if(d.userType === "teacher" || d.userType === "mentor"){

          if(d.canTeach){
            getItem(KEY, d);
            navigate("/teacher")
          
          } else {
            
            throw new AdvancedError("Your application is under review. Kindly check back later", 0)
          }
        } 
      }else throw new AdvancedError(message, statusCode);

    } catch (err) {
      console.error(err.message);
      if (err.statusCode === 0 || err.statusCode === undefined) {
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
    }finally{
      setLoading(false);
    }
  };


  // SOCIAL LOGIN
  const mutation = useMutation((userdata)=>googleSignIn(userdata), {
    onError: (err)=>console.error(err),
    onSuccess:(res)=>{
     console.log({res})
      if(res.data?.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode)
      localStorage.setItem(KEY, JSON.stringify(res.data?.data));    
      if(res.data.data.userType === "student"){
        getItem(KEY, res.data);

        navigate("/student")

      } else if(res.data.data.userType === "teacher" || res.data.data.userType === "mentor"){

        if(res.data.data.canTeach){

          getItem(KEY, res.data.data);

          navigate("/teacher")
        
        } else {
          toast.error("Your application is under review. Kindly check back later", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          throw new AdvancedError("Your application is under review. Kindly check back later", 0)
        }
      } 
    }
  })
  const faceBookMutation = useMutation((userdata)=>facebookSignIn(userdata), {
    onError: (err)=>console.error(err),
    onSuccess:(res)=>{
      if(res.data?.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode)
      localStorage.setItem(KEY, JSON.stringify(res.data?.data));    
      if(res.data.data.userType === "student"){
        getItem(KEY, res.data);

        navigate("/student")

      } else if(res.data.data.userType === "teacher" || res.data.data.userType === "mentor"){

        if(res.data.data.canTeach){

          getItem(KEY, res.data.data);

          navigate("/teacher")
        
        } else {
          toast.error("Your application is under review. Kindly check back later", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          throw new AdvancedError("Your application is under review. Kindly check back later", 0)
        }
      } 
    }
  })
   
  function signInWithGoogle(e){
    e.preventDefault()
    signInWithPopup(authentication, provider).then(res=>{
        console.log(res)
        if(res.user?.accessToken){
          mutation.mutate({
              accessToken: res.user.accessToken
          })
          if(mutation.isError ) throw new AdvancedError(mutation.error.message, 0)
       }
    }
    ).catch(err=>{
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
    }
    )
  }
   function signInWithFacebook(){

    signInWithPopup(authentication, facebookProvider).then(res=>{
      console.log(res)
      if(res.user?.accessToken){
        faceBookMutation.mutate({
            accessToken: res.user.accessToken
        })
        if(faceBookMutation.isError ) throw new AdvancedError(faceBookMutation.error.message, 0)
     }
  }
  ).catch(err=>{
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
      }
    )
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
      
      <div className="form-wrapper w-100">
        <header>
          <h3 className="title">
          Sign In
          </h3>
        </header>
        <div className="social_signIn_wrapper">
          <motion.button className="facebook d-block mb-3"
            whileHover={{ 
              boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
              textShadow:"0px 0px 8px rgb(255, 255, 255)",
              backgroundColor: "#eee"
            }}
            onClick={signInWithGoogle}
            disabled={mutation.isLoading}
          >
              <i className="me-4">
                  <img src={goo} alt="" width={25} height={25} />
              </i>
              Continue with Google
          </motion.button>
          
            <motion.button className="google d-block mb-3"
              whileHover={{ 
                boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                textShadow:"0px 0px 8px rgb(255, 255, 255)",
                backgroundColor: "#eee"
              }}
              onClick={signInWithFacebook}
              disabled={mutation.isLoading}
            >
            <i className="me-2">
                    <img src={face} alt="" width={25} height={25} />
                </i>
                Continue with Facebook
            </motion.button>
          <small className="or d-block"><span>or</span></small>
        </div>
     <form className="form" onSubmit={onSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          handleChange={handleChange}
          value={data.email}
          placeholder="Email"
        />
        <Password
          label="Password"
          name="password"
          password="password"
          handleChange={handleChange}
          value={data.password}
          placeholder="Password"
        />
        <p className="mt-3">
            <span>Forgot password? </span>
            <Link to="/forgot-password">Click here to reset</Link>
          </p>
        {
          loading ? 
          (
            <button className="button button-md log_btn w-100" 
            disabled={loading}>
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) 
          :
          (
            <button
              className="button button-md log_btn w-100" 
              disabled={loading}
              type="submit"
            >
              Sign In
            </button>
          )
        }
      </form>
        <p className="mt-5">
          <span>Do not have an account? </span>
        <Link to="/signup"> Register</Link></p>
      </div>
    </SignInWrapper>
    // <div>Login</div>
  );
};

export default Login;

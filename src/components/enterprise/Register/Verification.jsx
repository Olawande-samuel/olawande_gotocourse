import React, {useEffect, useState, useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";

import { useAuth } from "../../../contexts/Auth";
import Loader from "../../../components/Loader";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { KEY, VERIFICATION_KEY } from "../../../constants";
import SignInWrapper from "./Wrapper";
// import { Form } from '../Affiliate/Verification'
import clsx from "../../../pages/Affiliate/Verification/styles.module.css"


export function Form({type}){
  const {getItem, updateItem} = useLocalStorage();
  let userdata = getItem(VERIFICATION_KEY);
  const flag = useRef(false);
  const code1Ref = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const {authFunctions: {verifyEmail, resendEmailOTP}, setGeneralState} = useAuth();
  const [loading, setLoading] = useState(true);
  const [formstate, setFormstate] = useState({
      code1: "",
      code2: "",
      code3: "",
      code4: "",
      code5: "",
      code6: ""
  })

  useEffect(() => {
      if(flag.current) return;
      if(location?.search){
          const queryParams = location.search.split("?")[1].split("&") || [];
          function getQueryParam(query, key){
              let val = query.find(q => q.includes(key))
              console.log(val);
              if(!val) return "";
              else {
                  //at this point a value was found
                  let value = val.split("=")[1];
                  console.log(value);
                  if(!value) return "";
                  else return value;
              }
          }
          (async () => {
              try{
                  let token = getQueryParam(queryParams, "token");
                  let user = getQueryParam(queryParams, "user");
                  let data = {userId: user, token};
                  const res = await verifyEmail(data);
                  const {message, statusCode, success} = res;
                  if(!success) throw new AdvancedError(message, statusCode);
                  else {
                      console.log(res);
                      const {data} = res;
                      toast.success(message, {
                          position: "top-right",
                          autoClose: 4000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                      });
                      updateItem(VERIFICATION_KEY, {...userdata, isVerified: true});
                      setTimeout(() => navigate(data.userType === 'teacher' ? `/teacher/on-boarding` : data.userType === 'student' ? `/user-onboarding`: `/${data.userType}`), 1000);
                  }
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
          })()
      }else {
          setLoading(_ => false);
      }
      flag.current = true;
  }, [])
  console.log(userdata);
  const formSettings = [
      {
          type: "text",
          name: "code1",
          ref: code1Ref,
          value: formstate.code1,
      },
      {
          type: "text",
          name: "code2",
          value: formstate.code2,
      },
      {
          type: "text",
          name: "code3",
          value: formstate.code3,
      },
      {
          type: "text",
          name: "code4",
          value: formstate.code4,
      },
      {
          type: "text",
          name: "code5",
          value: formstate.code5,
      },
      {
          type: "text",
          name: "code6",
          value: formstate.code6,
      },
  ]


  async function submitHandler(e){
      e.preventDefault();

      try{
          setLoading(_ => true);
          let d = `${formstate.code1}${formstate.code2}${formstate.code3}${formstate.code4}${formstate.code5}${formstate.code6}`;
          console.log({email: userdata.email, otp: d});
          const res = await verifyEmail({email: userdata.email, otp: d})
          const {statusCode, success, message} = res;
          console.log({res});
          if(message === 'Account already verified') throw new AdvancedError(`${message}. Please proceed to login`, statusCode);
          // add navigate to login
          if(!success) throw new AdvancedError(message, statusCode);
          else {
              updateItem(VERIFICATION_KEY, {...userdata, isVerified: true})
              toast.success(message, {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
              setGeneralState((old) => {
                  return {
                    ...old,
                    notification: message,
                  };
              });
              navigate(userdata.userType === "affiliate" ? "/affiliate" : userdata.userType === "student" ? "/user-onboarding" : userdata.usertype === "admin" ?  "/admin" : "/teacher/on-boarding");
          }
          
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

  async function resendOTPHandler(e){
      try{
          setLoading(_ => true);
          const res = await resendEmailOTP({email: userdata.email})
          const {statusCode, success, message} = res;
          if(!success) throw new AdvancedError(message, statusCode);
          else {
              const {data} = res;
              console.log(data);
              toast.success(message, {
                  position: "top-right",
                  autoClose: 4000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
              });
              setGeneralState((old) => {
                  return {
                    ...old,
                    notification: message,
                  };
              });
              console.log(data); 
              if(userdata.userType === 'affiliate'){
                  navigate(`/affiliates/verify`);
              } else {
                  navigate("/user-authentication")
              }
          }
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

  function changeHandler(e, index){
      const {name, value} = e.target;
      setFormstate(old => {
          return {
              ...old,
              [name]: value
          }
      })
      code1Ref.current[index + 1].focus()
  }


  function focusHandler(e){
      e.target.style.borderBottom = "4px solid #0C2191"
  }

  function blurHandler(e){
      e.target.style.borderBottom = "2px solid #0C2191"
  }

  return (
          <form onSubmit={submitHandler} className={clsx.form}>
              {loading && <Loader />}
              <ToastContainer />
              <h3>Email Verification</h3>
              <p>Please enter the verification code we sent to your email at <span style={{color:"var(--theme-orange"}}>{userdata?.email}</span></p>
                  <div className={clsx.form_group}>
                      <div className={clsx.code_container}>
                          <div className={clsx.code}>
                              {
                                  formSettings.map(({type, name, value, ref}, i) => (
                                      <input autoComplete="off" ref={(ref)=>code1Ref.current.push(ref)} onBlur={blurHandler} onFocus={focusHandler} type={type} name={name} value={value} key={i} onChange={(e)=>changeHandler(e, i)} maxLength={1}/>
                                  ))
                              }
                          </div>
                      </div>
                      <div className={clsx.form_group__button__container}>
                          <button>
                              Verify
                          </button>
                      </div>
                  </div>
                  <div className={clsx.form_footer}>
                      <span>Didn't get code?</span> <a onClick={resendOTPHandler}>Resend</a>
                  </div>
          </form>

  )
}


const EnterpriseVerification = () => {
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
    
    <div className="form-wrapper w-100 user_verifcation">
        <Form />
    </div>


    </SignInWrapper>

  )
}








export default EnterpriseVerification; 
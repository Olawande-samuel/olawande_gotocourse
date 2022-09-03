import React, {useState} from 'react'
import { useNavigate} from "react-router-dom"
import { toast, ToastContainer} from 'react-toastify';

import { AdvancedError } from '../classes';
import Input from '../components/Input'; 
import Password from '../components/Password'; 
import SignInWrapper from '../components/SignInWrapper';
import { useAuth } from '../contexts/Auth';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const {otherFunctions: {resetPasswordOTP, resetPassword}} = useAuth();
    const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)


    const [data, setData] = useState({
      email: "",
      password: "",
      userType: ""
    });
    const [resetData, setResetData] = useState({
      email: "",
      password: "",
      otp:""
    });
    
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [focus, setFocus] = useState(false);
  
    const handleChange = (e) => {
      const {name, value} = e.target;
      setData(old => {
        return {
          ...old,
          [name]: value
        }
      })
    };
    const handleResetChange = (e) => {
      const {name, value} = e.target;
      setResetData(old => {
        return {
          ...old,
          [name]: value
        }
      })
    };
    const onSubmit = async (e) => {
      e.preventDefault();
      if(data.email.trim() === "") return;
      try{
        setLoading(true)
        const res = await resetPasswordOTP(data)
        if(res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode)
        else {
          toast.success(res.data.message)
          setShow(true)
        }
      }catch(err){
        toast.error(err.message)
      }finally {
        setLoading(false)
      }

    };

    async function onReset(e){
      e.preventDefault()
      if(resetData.email.trim() === "" || resetData.password === "" || resetData.otp === "" ) return;
      if(!passReg.test(resetData.password)) throw new AdvancedError("Password must match the required format", 0) 
      try{
        setLoading(true)
        const res = await resetPassword(resetData)
        if(res.data.statusCode !== 1) throw new AdvancedError(res.data.message, res.data.statusCode)
        else {
          toast.success(res.data.message)
          setShow(false)
          navigate("/login")
        }
      }catch(err){
        toast.error(err.message)
      }finally {
        setLoading(false)
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
        
        <div className="form-wrapper w-100">
          {show === false ? (

          <>
            <header>
              <h3 className="title">
              Reset Password
              </h3>
            </header>
            <form className="form" onSubmit={onSubmit} autoComplete="off">
              <Input
                label="Email"
                name="email"
                type="email"
                handleChange={handleChange}
                value={data.email}
                placeholder="Email"
              />
              {loading ? (
                <button className="button button-md log_btn w-100 mt-4" disabled={loading}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <button
                  className="button button-md log_btn w-100 mt-4"
                  type="submit"
                  disabled={loading}
                >
                  Reset Password
                </button>
              )}
            </form>
          </> 
          ):(

          <>

          <header>
              <h3 className="title">
              Reset Password
              </h3>
            </header>
            <form className="form" onSubmit={onReset} autoComplete="off">
              <Input
                label="Email"
                name="email"
                type="email"
                handleChange={handleResetChange}
                value={resetData.email}
                placeholder="Email"
              />
              <Input
                label="OTP"
                name="otp"
                type="text"
                handleChange={handleResetChange}
                value={resetData.otp}
                placeholder="OTP"
              />
              <Password
                label="Password"
                name="password"
                password="password"
                handleChange={handleResetChange}
                value={resetData.password}
                placeholder="Password"
                focus ={()=>setFocus(true)}
                blur={()=>setFocus(false)}
                
              />
               {focus && !passReg.test(resetData.password) &&
                  <small style={{fontSize:"11px"}}>
                    <p className="text-danger">Password must satisfy the following conditions</p>
                    <p className="text-danger"> - At least one upper case English letter</p>
                    <p className="text-danger"> - At least one lower case English letter</p>
                    <p className="text-danger"> - At least one digit</p>
                    <p className="text-danger"> - At least one special character</p>
                    <p className="text-danger"> - Minimum eight in length</p>
                  </small>
               }
              {loading ? (
                <button className="button button-md log_btn w-100 mt-4" disabled={loading}>
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <button
                  className="button button-md log_btn w-100 mt-4"
                  type="submit"
                  disabled={loading}
                >
                  Reset Password
                </button>
              )}
            </form>
            </>
          )}
        </div>
      </SignInWrapper>
    );
}

export default ForgotPassword
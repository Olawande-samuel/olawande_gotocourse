import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast, ToastContainer} from 'react-toastify';


import { AdvancedError } from '../classes';
import Input from '../components/Input';
import SignInWrapper from '../components/SignInWrapper';
import { useAuth } from '../contexts/Auth';
import { useLocalStorage } from '../hooks';


const ForgotPassword = () => {
    const navigate = useNavigate()
    const {authFunctions: {login}, setGeneralState} = useAuth();
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
        // const response = await login(data, "user");
  
        // console.log(response)
        // const {success, statusCode, message} = response;
        
        // if(success) {
        //   const {data: d} = response;
  
        //   //before navigating
        //   //save some thing to localStorage and state
        //   removeItem(KEY);
        //   getItem(KEY, d);
        //   setGeneralState(old => {
        //     return {
        //       ...old,
        //       notification: response.message
        //     }
        //   })
        //   navigate(`${d.userType === 'student' ? "/student" : "/teacher"}`);
        // }else throw new AdvancedError(message, statusCode);
  
      } catch (err) {
        console.error(err);
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
            Reset Password
            </h3>
          </header>
          <form className="form" onSubmit={onSubmit}>
            <Input
              label="Email"
              name="email"
              type="email"
              handleChange={handleChange}
              value={data.email}
              placeholder="Email"
            />
            {loading ? (
              <button className="button button-md log_btn w-100 mt-4">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                className="button button-md log_btn w-100 mt-4"
                type="submit"
              >
                Reset Password
              </button>
            )}
          </form>
        </div>
      </SignInWrapper>
    );
}

export default ForgotPassword
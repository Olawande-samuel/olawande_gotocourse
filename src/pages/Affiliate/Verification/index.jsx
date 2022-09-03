import React, {useEffect, useState, useRef} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import clsx from "./styles.module.css";
import AuthLayout from "../common/Layout";
import Input from "../../../components/Input";
import { useAuth } from "../../../contexts/Auth";
import Loader from "../../../components/Loader";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";



const KEY = 'gotocourse-userdata';
const Verification = () => {
    useEffect(() => {
        console.log("Registration page showing...");
        return () => console.log("Registration page is removing...")
    }, [])
   

   

    return (
        <AuthLayout>
            <Form type="affiliate" />
        </AuthLayout>
    )
}

export function Form({type}){
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const code1Ref = useRef([]);
    const navigate = useNavigate();
    const {authFunctions: {verifyEmail, resendEmailOTP}, setGeneralState} = useAuth();
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        code1: "",
        code2: "",
        code3: "",
        code4: "",
        code5: "",
        code6: ""
    })
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
            console.log(res);
            if(message === 'Account already verified') throw new AdvancedError(`${message}. Please proceed to login`, statusCode);
            if(!success) throw new AdvancedError(message, statusCode);
            else {
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
                navigate(type === 'affiliate' ? `/affiliate` : type === 'student' ? '/student' : '/admin');
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
                navigate(`/affiliates/verify`);
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
                <p>Please enter the verification code we sent to your email address</p>
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



export default Verification; 
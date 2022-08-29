import React, {useEffect, useState, useRef} from "react";
import { NavLink } from "react-router-dom";



import clsx from "./styles.module.css";
import AuthLayout from "../common/Layout";
import Input from "../../../components/Input";


const Verification = () => {
    useEffect(() => {
        console.log("Registration page showing...");
        return () => console.log("Registration page is removing...")
    }, [])
   

   

    return (
        <AuthLayout>
            <Form />
        </AuthLayout>
    )
}

export function Form({type}){

    const code1Ref = useRef([]);
    const [formstate, setFormstate] = useState({
        code1: "",
        code2: "",
        code3: "",
        code4: ""
    })
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
    ]


    async function submitHandler(e){
        e.preventDefault();
        console.log(formstate);
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
                <h3>Email Verification</h3>
                <p>Please enter the verification code we sent to your email address</p>
                    <div className={clsx.form_group}>
                        <div className={clsx.code_container}>
                            <div className={clsx.code}>
                                {
                                    formSettings.map(({type, name, value, ref}, i) => (
                                        <input ref={(ref)=>code1Ref.current.push(ref)} onBlur={blurHandler} onFocus={focusHandler} type={type} name={name} value={value} key={i} onChange={(e)=>changeHandler(e, i)} maxLength={1}/>
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
                        <span>Didn't get code?</span> <NavLink to={"/affiliates/login"}>Resend</NavLink>
                    </div>
            </form>

    )
}



export default Verification; 
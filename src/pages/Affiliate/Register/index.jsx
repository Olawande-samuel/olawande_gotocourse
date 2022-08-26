import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";



import clsx from "./styles.module.css";
import AuthLayout from "../common/Layout";
import Input from "../../../components/Input";


const Register = () => {
    useEffect(() => {
        console.log("Registration page showing...");
        return () => console.log("Registration page is removing...")
    }, [])
    const [formstate, setFormstate] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const formSettings = [
        {
            label: "Full Name",
            type: "text",
            name: "fullName",
            value: formstate.fullName,
            placeholder: "Olu Jackson",
        },
        {
            label: "Email",
            type: "email",
            name: "email",
            value: formstate.email,
            placeholder: "Email",
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            value: formstate.password,
            placeholder: "Password",
        },
        {
            label: "Confirm Password",
            type: "passsword",
            name: "confirmPassword",
            value: formstate.confirmPassword,
            placeholder: "Confirm Password",
        },
    ]


    async function submitHandler(e){
        e.preventDefault();
        console.log(formstate);
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
        <AuthLayout>
            <form onSubmit={submitHandler} className={clsx.form}>
                <h3>Register as affiliate</h3>
                
                    {
                        formSettings.map(({label, type, name, value, placeholder}, i) => (
                            <div className={clsx.form_group}>
                                <Input type={type} handle={changeHandler} label={label} name={name} value={value} placeholder={placeholder} key={i} />
                            </div>
                        ))
                    }
                    <div className={clsx.form_group}>
                        <button>
                            Register
                        </button>
                    </div>
                    <div className={clsx.form_footer}>
                        <span>Already have an account?</span> <NavLink to={"/affiliates/login"}>Sign in</NavLink>
                    </div>
            </form>
        </AuthLayout>
    )
}



export default Register;
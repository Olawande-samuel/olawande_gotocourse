import React, {useEffect, useState} from "react";
import { NavLink } from "react-router-dom";



import clsx from "./styles.module.css";
import AuthLayout from "../common/Layout";
import Input from "../../../components/Input";


const Login = () => {
    useEffect(() => {
        console.log("Registration page showing...");
        return () => console.log("Registration page is removing...")
    }, [])
    const [formstate, setFormstate] = useState({
        email: "",
        password: "",
    })
    const formSettings = [
        {
            label: "Email or Usercode",
            type: "text",
            name: "email",
            value: formstate.email,
        },
        {
            label: "Password",
            type: "password",
            name: "password",
            value: formstate.password,
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
                <h3>Sign in as affiliate</h3>
                
                    {
                        formSettings.map(({label, type, name, value}, i) => (
                            <div className={clsx.form_group}>
                                <Input type={type} handle={changeHandler} label={label} name={name} value={value} key={i} />
                            </div>
                        ))
                    }
                    <div className={clsx.form_mid}>
                        <span>Forget Password?</span> <NavLink to={"/affiliates/verification"}>Click here to reset password</NavLink>
                    </div>
                    <div className={clsx.form_group}>
                        <button>
                            Register
                        </button>
                    </div>
                    <div className={clsx.form_footer}>
                        <span>Don't have an account?</span> <NavLink to={"/affiliates/register"}>Register</NavLink>
                    </div>
            </form>
        </AuthLayout>
    )
}



export default Login;
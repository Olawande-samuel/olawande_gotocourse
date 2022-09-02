import React, {useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify";



import clsx from "./styles.module.css";
import AuthLayout from "../common/Layout";
import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../contexts/Auth";
import { useLocalStorage } from "../../../hooks";
import { AdvancedError } from "../../../classes";




const KEY = 'gotocourse-userdata';
const Login = () => {
    const {getItem, removeItem} = useLocalStorage();
    const {authFunctions: {login}, setGeneralState} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        try{
            const userType = 'affiliate';
            if(formstate.email.trim() === "" || formstate.password.trim() === "") throw new AdvancedError("Both email and password are required fields", 0);
            setLoading(_ => true);
            const res = await login(formstate, userType);
            const {success, message, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                removeItem(KEY);
                getItem(KEY, {...data, userType});
                setGeneralState((old) => {
                    return {
                    ...old,
                    notification: message,
                    };
                });
                navigate(`/${userType}`);
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
        }finally{setLoading(_ => false)}
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
            <ToastContainer />
            {loading && <Loader />}
            <form onSubmit={submitHandler} className={clsx.form}>
                <h3>Sign in as affiliate</h3>
                
                    {
                        formSettings.map(({label, type, name, value}, i) => (
                            <div className={clsx.form_group}>
                                <Input type={type} handleChange={changeHandler} label={label} name={name} value={value} key={i} />
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
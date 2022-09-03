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




const KEY = "gotocourse-userdata";
const Register = () => {
    const emailReg = new RegExp(/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)
    const passReg = new RegExp(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
  
    const {getItem, removeItem} = useLocalStorage();
    const {authFunctions: {register}, setGeneralState} = useAuth();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
    function interfaceData(data){
        let names = data.fullName.split(" ");
        let firstName = names[0];
        let lastName = names[1];
        let phoneNumber = "";

        return {
            firstName,
            lastName,
            phoneNumber,
            email: data.email,
            password: data.password,
            userType: "affiliate"
        }
    }


    async function submitHandler(e){
        e.preventDefault();
        try{
            setLoading(_ => true);
            if(!emailReg.test(formstate.email) && !passReg.test(formstate.password)) throw new AdvancedError("Invalid email or password", 0);
            if(formstate.email.trim() === "" || formstate.fullname === "" || formstate.password === "") throw new AdvancedError("All fields are required", 0);
            if(formstate.password !== formstate.confirmPassword) throw new AdvancedError("Passwords don't match", 0);
            else {
                let userType = 'affiliate';
                let d = interfaceData(formstate);
                const res = await register(d, userType);
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
                    console.log(data); 
                    navigate(`/${userType}s/verify`);
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
                <h3>Register as affiliate</h3>
                
                    {
                        formSettings.map(({label, type, name, value, placeholder}, i) => (
                            <div className={clsx.form_group}>
                                <Input type={type} handleChange={changeHandler} label={label} name={name} value={value} placeholder={placeholder} key={i} />
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
import React, {useEffect, useState} from "react";
import {FaGooglePlusG, FaPinterestP, FaTwitter, FaLinkedinIn, FaFacebookF} from "react-icons/fa";
import {toast, ToastContainer} from "react-toastify";
import {useNavigate} from "react-router-dom";

import clsx from "./styles.module.css";
import { Students } from "../";
import referralTable from "../../../../images/referral_table.png";
import { useLocalStorage } from "../../../../hooks";
import { KEY, AFFILIATE_KEY } from "../../../../constants";
import { useAuth } from "../../../../contexts/Auth";
import { AdvancedError } from "../../../../classes";





const cards = [
    {
        children: (
            <button>Sign up</button>
        ),
        text: "Click on sign up below to enroll as a member"
    },
    {
        children: (
            <>
                <button>Click to refer a friend</button>
                <Social />
            </>
        ),
        text: "Click the refer button to share on social media"
    },
    {
        children: (<img src={referralTable} alt="Referral Table" />),
        text: "Once they register, auto tracking is set up so that you can follow the entire process"
    },
]


const socials = [
    {
        color: "#BD081B",
        icon: FaPinterestP      
    },
    {
        color: "#DC4639",
        icon: FaGooglePlusG       
    },
    {
        color: "#1DA1F2",
        icon: FaTwitter      
    },
    {
        color: "#0076B2",
        icon: FaLinkedinIn    
    },
    {
        color: "#1877F2",
        icon: FaFacebookF    
    }
]



const Referral = () => {
    const navigate = useNavigate()
    const {generalState, affiliatesFunctions:{becomeAffiliate}} = useAuth()

    const {getItem} = useLocalStorage()
    const [loading, setLoading]= useState(false)
    const userdata = getItem(KEY)

    useEffect(() => {
        console.log("Student Referral page is mounted");
        return () => console.log("Student Referal page is unmounted");
    }, [])

    async function signupForAffilates(e){
        e.preventDefault()
        // sign user up for affiliate program
        try{
            setLoading(true)
            const response  = await becomeAffiliate(userdata?.token);
            const {message, success, statusCode} = response.data;
            if(statusCode !== 1) throw new AdvancedError(message, statusCode);
            toast.success(message)
            const {data} = response.data;
            console.log(data);
            getItem(AFFILIATE_KEY, data);
            navigate("/affiliate")
        }catch(error){
            console.error(error)
            toast.error(error.message)
        }finally {
            setLoading(false)
        }

    }

    return (
        <Students header="Referral">
             <ToastContainer 
             position="top-right"
             autoClose={3600}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
            
            />  
            <div className={clsx.referral}>
                <div className={clsx.referral_container}>
                    <div className={clsx.referral_top}>
                        <p>Gotocourse Referral Program</p>
                        <button>3 Easy Steps</button>
                    </div>
                    <div className={clsx.referral_content}>
                        <div className={clsx.referral_content_cards}>
                            {
                                cards.map(({children, text}, i) => (
                                    <Card text={text} key={i}>
                                        {children}
                                    </Card>
                                ))
                            }
                        </div>

                        <div className={clsx.referral_button}>
                            {
                                loading ? <button>
                                        <div className="spinner-border text-light">
                                            <div className="visually-hidden"></div>
                                        </div>
                                     </button>
                                :
                                <button onClick={signupForAffilates}>Sign up</button>
                            }     
                            <button className="ms-4" onClick={()=>{
                                navigate("/affiliates/login")
                            }}>Log in</button>
                            
                        </div>
                    </div>
                </div>
            </div>
        </Students>
    )
}






function Card({children, text}){
    return (
        <div className={clsx.card}>
            <div className={clsx.card_top}>
                {children}
            </div>
            <div className={clsx.card_bottom}>
                <p>{text}</p>
            </div>
        </div>
    )
}



function Social(){
    return (
        <div className={clsx.socials}>
            {
                socials.reverse().map(({color, icon: Icon}) => (
                    <div className={clsx.social} style={{backgroundColor: color}}>
                        <Icon />
                    </div>
                ))
            }
        </div>
    )
}



export default Referral;
import React, {useEffect, useState} from "react";
import {FaGooglePlusG, FaPinterestP, FaTwitter, FaLinkedinIn, FaFacebookF} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

import clsx from "./styles.module.css";
import { Teachers } from "../";
import referralTable from "../../../../images/referral_table.png";





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
    const navigate = useNavigate();
    const [loading, setLoading]= useState(true);

    useEffect(() => {
        setTimeout(() => {
            navigate("/affiliate");
            setLoading(_ => false);
        }, 0);
        console.log("Teacher Referral page is mounted");
        return () => console.log("Teacher Referal page is unmounted");
    }, [])

    return (
        <Teachers header="Referral" loading={loading}>
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
                                <button>Sign up</button>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </Teachers>
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
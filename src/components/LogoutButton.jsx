import {toast} from "react-toastify";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom"

import clsx from "./globalStyles.module.css";
import  {useCookie} from "../hooks";





const LogoutButton = () => {
    const navigate = useNavigate()
    const {clearCookie} = useCookie();


    function mouseOverHandler(e){
        console.log(e.currentTarget);
        e.currentTarget.width = 50;
    }


    async function logout(){
        //clear everything
        try{
            const res = await clearCookie();
            console.log(res);
            navigate("/")
            toast.success("Logout out successfully",{
                position:"top-right",
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop:false,
                closeOnClick: true,
                rtl:false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true
            })
        }catch(err){
            toast.error(err.message, {
                position:"top-right",
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop:false,
                closeOnClick: true,
                rtl:false,
                pauseOnFocusLoss: true,
                draggable: true,
                pauseOnHover: true
            })
        }
    }

    return (
        <motion.span
        transition={{
            delay: 1,
            x: {type: "spring", stiffness: 20},
            delayChildren: 1,
            staggerChildren: true,
            staggerDirection: {type: "spring", stiffness: 30}
        }}
        //  animate={{ x: 100, y: 100, opacity: 1 }}
        //  whileHover={{}}
         className={clsx.general_logout__button} onMouseOver={mouseOverHandler} onClick={logout}>
            <motion.button>
                Logout
            </motion.button>
        </motion.span>
    )
}


export default LogoutButton;
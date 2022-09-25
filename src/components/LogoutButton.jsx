import {toast} from "react-toastify";
import {motion} from "framer-motion";
import {useNavigate} from "react-router-dom"

import clsx from "./globalStyles.module.css";
import  {useLocalStorage} from "../hooks";

import {MdLogout} from "react-icons/md"



const LogoutButton = () => {
    const navigate = useNavigate()
    const {removeItem} = useLocalStorage();


    function mouseOverHandler(e){
        e.currentTarget.width = 50;
    }


    async function logout(){
        //clear everything
        try{
            const key = 'gotocourse-userdata';
            removeItem(key);
            localStorage.clear()
            navigate("/login");
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
        style={{marginTop:"auto"}}
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
            <>
                <i className="d-lg-none" style={{cursor:"pointer"}}>
                    <MdLogout size="1.5rem" color="#F75C4E" />
                </i>
                <motion.button className="d-none d-lg-flex" style={{minWidth:"130px"}} >
                    <i>
                        <MdLogout size="1.5rem" className="me-1" />
                    </i>
                    <span>Logout</span>
                </motion.button>
            </>
        </motion.span>
    )
}


export default LogoutButton;
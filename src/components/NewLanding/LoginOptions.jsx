import {useState} from 'react';
import {useNavigate} from "react-router-dom"
import {GiTeacher} from "react-icons/gi"
import {AiOutlineClose} from "react-icons/ai"
import {FaBookReader} from "react-icons/fa"
import {useMutation} from "@tanstack/react-query"
import { ToastContainer, toast } from "react-toastify";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { authentication, provider, facebookProvider } from "../../firebase-config.js"
import { useAuth } from "../../contexts/Auth"
import AdvancedError from "../../classes/AdvancedError.js"
import { KEY } from "../../constants/index.js"
import useLocalStorage from "../../hooks/useLocalStorage.jsx"

const LoginOptions = ({closeOverlay, type}) => {
    const {  generalState: { navHeight }, authFunctions: { googleSignUp } } = useAuth();
    const{getItem}= useLocalStorage()
    const navigate = useNavigate()
    const [loading, setLoading]= useState(false)

    const mutation = useMutation((userdata)=>googleSignUp(userdata), {
        onError: (err)=>{
            console.error(err)
        },
        onSuccess: (data)=>{
            console.log({data})
            console.log(data.statusCode)
        }
    })


    async function handleSignUp(e, usertype){
        if(type === "google"){
            signInWithPopup(authentication, provider).then(res=> {
                if(res.user?.accessToken){
                    setLoading(true)
                    googleSignUp({
                    
                    accessToken: res.user.accessToken,
                    userType: usertype

                  }).then(res=>{
                    setLoading(false)
                    if(res.statusCode !== 1) throw new AdvancedError(res.message, res.status)
                    localStorage.setItem("gotocourse-userdata", JSON.stringify(res.data))
                    navigate(`${usertype === 'student' ? "/student" : "/teacher"}`);

                  }).catch(err=>{
                    setLoading(false)
                    console.error(err)
                    toast.error(err.message, {
                        position: "bottom-center",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                
                  })
                }
            }
            ).catch(err=> {
                toast.error(err.message, {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            
            })
        } else {
            signInWithPopup(authentication, facebookProvider).then(res=>{
                console.log(res.email)
                // if(res.user?.accessToken){
                //     mutation.mutate({
                //         accessToken: res.user.accessToken,
                //         userType: usertype
                //     })
                //     if(mutation.data?.statusCode === 0) throw new AdvancedError(mutation.data.message, mutation.data.statusCode)
                //     getItem(KEY, mutation.data?.data);
                //     usertype === "student" ? navigate("/student"):navigate("/teacher")
                // }
            }).catch(err=>{
                console.error(err)
                toast.error(err.message, {
                    position: "bottom-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
        }
    }


    return (
        <div className="signUpOptions_overlay">
            <ToastContainer />  

            <div className="signUpOptions_overlay_container">
                {
                    loading ?  <div className="spinner-border text-primary text-center d-flex mx-auto">
                        <div className="visually-hidden">Loading...</div>
                    </div> 
                    :  
                    <div className="suOptions_cards">
                        <header>
                            <h3>SELECT USER TYPE</h3>
                            </header>
                        <div className="row justify-content-center">
                            <div className="col-6 col-md-4">
                                <button className="suOptions_card" onClick={(e)=>handleSignUp(e, "teacher")}>
                                    <i><GiTeacher size="2.5rem" /></i>
                                    <p>Teacher</p>
                                </button>
                            </div>
                            <div className="col-6 col-md-4">
                                <button className="suOptions_card" onClick={(e)=>handleSignUp(e, "student")}>
                                    <i><FaBookReader size="2.5rem" /></i>
                                    <p>Student</p>
                                </button>
                            </div>
                        </div>
                    </div>
                }
                <div className="close" 
                onClick={()=>closeOverlay(false)} >
                    <AiOutlineClose size="1.2rem" color="#000" />
                </div>
            </div>
        </div>
    )
}

export default LoginOptions
// user.accesstoken for google
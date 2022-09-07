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
    const {  generalState: { navHeight }, authFunctions: { googleSignUp, facebookSignUp } } = useAuth();
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
                    navigate(`${usertype === "student" ? "/user-onboarding" :  "/teacher/on-boarding"}`)

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
            ).catch(error=> {
                toast.error(error.message, {
                    position: "bottom-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                if (error.code === 'auth/account-exists-with-different-credential') {
                    // Step 2.
                    // User's email already exists.
                    // The pending Google credential.
                    var pendingCred = error.credential;
                    // The provider account's email address.
                    var email = error.email;
                    // Get sign-in methods for this email.
                    authentication.fetchSignInMethodsForEmail(email).then(function(methods) {
                      // Step 3.
                      // If the user has several sign-in methods,
                      // the first method in the list will be the "recommended" method to use.
                      console.log({methods})
                      if (methods[0] === 'password') {
                        // Asks the user their password.
                        // In real scenario, you should handle this asynchronously.
                        // authentication.signInWithEmailAndPassword(email, password).then(function(result) {
                        //   // Step 4a.
                        //   return result.user.linkWithCredential(pendingCred);
                        // }).then(function() {
                        //   // Google account successfully linked to the existing Firebase user.
                          
                        // });
                        return;
                      }
                    })
                }
            })
        } else {
            signInWithPopup(authentication, facebookProvider).then(res=>{
                console.log("facebook", res)
                if(res.user?.accessToken){
                    setLoading(true)
                    facebookSignUp({
                    
                    accessToken: res.user.accessToken,
                    userType: usertype

                  }).then(res=>{
                    setLoading(false)
                    if(res.statusCode !== 1) throw new AdvancedError(res.message, res.status)
                    localStorage.setItem("gotocourse-userdata", JSON.stringify(res.data))
                    navigate(`${usertype === "student" ? "/user-onboarding" :  "/teacher/on-boarding"}`)

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
            }).catch(error => {
                console.error(error)
                // / Handle Errors here.
                const errorCode = error.code;

                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = facebookProvider.credentialFromError(error);

                authentication.fetchSignInMethodsForEmail(email).then(function(methods) {
                    
                    console.log({methods})
                })

                console.log({email})
                console.log({errorMessage})
                console.log({credential})
                
                toast.error(error.message, {
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
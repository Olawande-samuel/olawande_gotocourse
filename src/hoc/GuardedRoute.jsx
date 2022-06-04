import { useNavigate, useLocation } from "react-router-dom";

import { useCookie } from "../hooks"; 
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";


const GuardedRoute = ({children}) => {
    const {fetchCookie, isCookie} = useCookie();
    const {setGeneralState} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname.split("/")[1];
    const key = 'gotocourse-profiledata';
    const userdata = fetchCookie(key);
    useEffect(() => {
        setGeneralState(old => {
            return {
                ...old,
                userdata,
            }
        })
    }, [])
    


    if(isCookie(key)){
        if(userdata.token){
            console.log(userdata.token);
            // if(route === "admin" && userType !== "admin") {
            //     navigate(`/${userType}s`);
            // } 
            // else if(route === "students" && userType !== "students"){
            //     navigate(userType === "admin" ? `/${userType}` : `/${userType}s`);
            // } else if(route === "teachers" && userType !== "teachers"){
            //     navigate(userType === "admin" ? `/${userType}` : `/${userType}s`);
            // }else 
            return children
        }else return navigate("/login");
    }else  return navigate("/login");

}



export default GuardedRoute;
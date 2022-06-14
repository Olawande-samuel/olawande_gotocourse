import { useNavigate, useLocation } from "react-router-dom";

import { useLocalStorage } from "../hooks"; 
import { useEffect } from "react";


const GuardedRoute = ({children}) => {
    const key = 'gotocourse-userdata';
    const {getItem} = useLocalStorage();
    const value = getItem(key);
    console.log({value});
    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname.split("/")[1];
    useEffect(() => {
    }, [])
    


    if(value.token){
        // console.log(userdata.token);
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

}



export default GuardedRoute;
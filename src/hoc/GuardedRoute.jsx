import { useLocation, Navigate } from "react-router-dom";

import { useLocalStorage } from "../hooks"; 
import { useEffect } from "react";


import {KEY} from "../constants";

const GuardedRoute = ({children}) => {
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    console.log(value);
    const location = useLocation();
    const route = location.pathname.split("/")[1];
    useEffect(() => {
    }, [])
    


    if(value?.token){
        // console.log(userdata.token);
        // if(route === "admin" && userType !== "admin") {
        //     navigate(`/${userType}s`);
        // } 
        // else if(route === "student" && userType !== "student"){
        //     navigate(userType === "admin" ? `/${userType}` : `/${userType}s`);
        // } else if(route === "teachers" && userType !== "teachers"){
        //     navigate(userType === "admin" ? `/${userType}` : `/${userType}s`);
        // }else 
        return children
    }else {
        if(route === 'admin'){
            return <Navigate to="/admin/login" />
        }
        else return <Navigate to="/login" />;
    }

}



export default GuardedRoute;
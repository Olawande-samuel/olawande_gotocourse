import { useLocation, Navigate } from "react-router-dom";

import { useLocalStorage } from "../hooks"; 
import { useEffect } from "react";


const GuardedRoute = ({children}) => {
    const key = 'gotocourse-userdata';
    const {getItem} = useLocalStorage();
    const value = getItem(key);
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
    }else {
        if(route === 'admin'){
            return <Navigate to="/admin/login" />
        }
        else return <Navigate to="/login" />;
    }

}



export default GuardedRoute;
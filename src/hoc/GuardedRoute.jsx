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
    


    if(value.token){
        if(route === "teacher" || route === "student"){
            if(value.isVerified){
                if(route === "teacher" && !value.canTeach){
                    localStorage.clear()
                    return <Navigate to="/login" />
                } 
                return children
            }
        }else if(route === "admin") {
            return children
        }
    }else {

        if(route === 'admin'){
            return <Navigate to="/admin/login" />
        }
        else return <Navigate to="/login" />;
    }

}



export default GuardedRoute;
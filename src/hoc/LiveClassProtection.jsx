import { useLocation, Navigate, useSearchParams } from "react-router-dom";

import { useLocalStorage } from "../hooks"; 
import { useEffect } from "react";


import {KEY} from "../constants";

const ProtectedRoute = ({children}) => {
    
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    const location = useLocation();
    const route = location.pathname.split("/")[1];
    const [searchParams] = useSearchParams()
    const roomId = searchParams.get("room")

    
    // get class list 
    // check if userId or token ID exist
    // if it does not exist alert "User not Authorised"


    if(value.token){
            
        return children
        
    } else {
        return <Navigate to="/login" />;
    }
    
}


export default ProtectedRoute;
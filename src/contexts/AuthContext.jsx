import {createContext, useContext, useEffect, useState} from "react";

import { authFunctions } from "./functions";
import { useCookie } from "../hooks";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


const AuthContextProvider = ({children}) => {
    const [generalState, setGeneralState] = useState({
        notification: null,
        userdata: null,
        userType: null,
        isMobile: false,
        theme: "light",
        showSidebar: false,
    })
    const {fetchCookie} = useCookie();
    useEffect(() => {
        console.log("Rendering");
        //fetch the cookies
        setGeneralState(old => {
            let userdata = fetchCookie('gotocourse-userdata');
            let userType = fetchCookie('gotocourse-usertype');
            return {
                ...old,
                userdata,
                userType
            }
        })
        return () => console.log("Rerendering");
    }, [])
    return (
        <AuthContext.Provider value={{authFunctions, generalState, setGeneralState}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



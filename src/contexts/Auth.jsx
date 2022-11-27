import {createContext, useContext, useState} from "react";

import { authFunctions, studentFunctions, adminFunctions, teacherFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions, kycFunctions, consoleFunctions,teacherConsoleFunctions, affiliatesFunctions, commonFunctions } from "./functions";
import { useEffectOnMount } from "../hooks";
import { useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({children}) => {
    const [generalState, setGeneralState] = useState({
        notification: null,
        isMobile: false,
        theme: "light",
        showSidebar: false,
        teacherProfile: null,
        navHeight: "",
        loading: false,
        notifications:0,
        chat:0,
        classConsole: {
            sidebar: false,
            domains: []
        },
        scheduledClasses: []
        
    })

    const [outstanding, setOutstanding] = useState(0)
   
   

    return (
        <AuthContext.Provider value={{authFunctions, teacherFunctions, studentFunctions, adminFunctions, generalState, setGeneralState,affiliatesFunctions, consoleFunctions, teacherConsoleFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions, kycFunctions, commonFunctions, outstanding, setOutstanding}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



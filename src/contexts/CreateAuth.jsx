import {createContext, useContext, useState} from "react";

import { authFunctions, studentFunctions, adminFunctions, teacherFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions, consoleFunctions,teacherConsoleFunctions, affiliatesFunctions, commonFunctions } from "./createFunctions";
import { useEffectOnMount } from "../hooks";
import { useEffect } from "react";

const CreateAuthContext = createContext();

export const useAuth = () => useContext(CreateAuthContext);

const CreateAuthContextProvider = ({children}) => {
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
        chatDetail:{},
        scheduledClasses: []
        
    })

    const [outstanding, setOutstanding] = useState(0)
   
   

    return (
        <CreateAuthContext.Provider value={{authFunctions, teacherFunctions, studentFunctions, adminFunctions, generalState, setGeneralState,affiliatesFunctions, consoleFunctions, teacherConsoleFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions, commonFunctions, outstanding, setOutstanding}}>
            {children}
        </CreateAuthContext.Provider>
    )
}



export default CreateAuthContextProvider;



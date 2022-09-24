import {createContext, useContext, useState} from "react";

import { authFunctions, studentFunctions, adminFunctions, teacherFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions, kycFunctions, affiliatesFunctions, commonFunctions } from "./functions";
import { useEffectOnMount } from "../hooks";

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
        pledre:""
        
    })
   
    useEffectOnMount(() => {
        if(!generalState.pledre && window.PledreAPI ){
            const Pledre = new window.PledreAPI(process.env.REACT_APP_PLEDRE_API, process.env.REACT_APP_PLEDRE_API_SECRET, process.env.REACT_APP_PLEDRE_URL)
            setGeneralState({...generalState, pledre: Pledre})
            console.log(Pledre);
        }

        return () => console.log("Rerendering");
    }, [generalState]) 

    return (
        <AuthContext.Provider value={{authFunctions, teacherFunctions, studentFunctions, adminFunctions, generalState, setGeneralState,affiliatesFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions, kycFunctions, commonFunctions}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



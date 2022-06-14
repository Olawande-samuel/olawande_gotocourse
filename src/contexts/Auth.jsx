import {createContext, useContext, useEffect, useState} from "react";

import { authFunctions, studentFunctions, adminFunctions, teacherFunctions, adminStudentFunctions, adminTeacherFunctions } from "./functions";

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
        loading: false
    })
    useEffect(() => {
        console.log("Rendering");
        return () => console.log("Rerendering");
    }, [generalState])
    return (
        <AuthContext.Provider value={{authFunctions, teacherFunctions, studentFunctions, adminFunctions, generalState, setGeneralState, adminStudentFunctions, adminTeacherFunctions}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



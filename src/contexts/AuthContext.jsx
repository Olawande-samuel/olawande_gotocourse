import {createContext, useContext, useEffect, useState} from "react";

import { authFunctions } from "./functions";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


const AuthContextProvider = ({children}) => {
    const [generalState, setGeneralState] = useState({
        userdata: {},
        token: null,
        isMobile: false,
        theme: "light"
    })
    useEffect(() => {
        console.log("Rendering");
        return () => console.log("Rerendering");
    }, [generalState])
    return (
        <AuthContext.Provider value={{authFunctions, generalState, setGeneralState}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



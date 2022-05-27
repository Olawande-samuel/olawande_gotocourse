import {createContext, useContext} from "react";

import { authFunctions } from "./functions";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);


const AuthContextProvider = ({children}) => {
    return (
        <AuthContext.Provider value={{authFunctions}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



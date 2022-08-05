import {createContext, useContext, useEffect, useState} from "react";

import { authFunctions, studentFunctions, adminFunctions, teacherFunctions, adminStudentFunctions, adminTeacherFunctions, otherFunctions } from "./functions";

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
   
    useEffect(() => {
        console.log("Rendering");
        if(!generalState.pledre && window.PledreAPI){
            const Pledre = new window.PledreAPI(process.env.REACT_APP_PLEDRE_API, process.env.REACT_APP_PLEDRE_API_SECRET, process.env.REACT_APP_PLEDRE_URL)
            console.log("pledre",Pledre)

            setGeneralState({...generalState, pledre: Pledre})
        }
        return () => console.log("Rerendering");
    }, [generalState])

    console.log("general state",generalState.pledre)

    // async function GetPledre(){
    //     try{
    //         const response = await generalState.pledre.signUpStudent({
    //             name: "Alex",
    //             email: "samueldacoal@gmail.com",
    //             password: "pAssword1k"
    //         })
    //         console.log(response)
    //     }catch(err){
    //         console.error(err)
    //     }
    // }
    // if(generalState.pledre){
    //     GetPledre()
    // }

    return (
        <AuthContext.Provider value={{authFunctions, teacherFunctions, studentFunctions, adminFunctions, generalState, setGeneralState, adminStudentFunctions, adminTeacherFunctions, otherFunctions}}>
            {children}
        </AuthContext.Provider>
    )
}



export default AuthContextProvider;



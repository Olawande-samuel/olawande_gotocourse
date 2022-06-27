import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const SyllabusContext = createContext();

export const useSyllabus = () => useContext(SyllabusContext);



const SyllabusContextProvider = ({children}) => {
    const [syllabuses, setSyllabusses] = useState([]);
    const [isnew, setIsnew] = useState(true);


    function addtoSyllabus(syllabus){
        setSyllabusses(old => {
            return [...old, syllabus];
        })
        setIsnew(_ => false);
        toast.success("Syllabus added successfully", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <SyllabusContext.Provider value={{syllabuses, setIsnew, addtoSyllabus, setSyllabusses}} >
            {children}
        </SyllabusContext.Provider>
    )
}


export default SyllabusContextProvider;
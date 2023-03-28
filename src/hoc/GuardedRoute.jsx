import { useLocation, Navigate } from "react-router-dom";

import { useLocalStorage } from "../hooks";
import { useEffect } from "react";

import { KEY } from "../constants";

const GuardedRoute = ({ children }) => {
    const { getItem } = useLocalStorage();
    const value = getItem(KEY);
    const location = useLocation();
    const route = location.pathname.split("/")[1];
    useEffect(() => {}, []);

    // for create
    let isCreator = value?.userType === "schools";


    if(isCreator){
        let schoolRoute = location.pathname 

        if (value.token) {
            if (
                schoolRoute.includes("school/teacher") ||
                schoolRoute.includes("school/student") ||
                schoolRoute.includes("affiliate") ||
                schoolRoute.includes("school/change-password") ||
                schoolRoute.includes("mentor")
            ) {
                if (value.isVerified) {
                    if (schoolRoute.includes("teacher") && !value.canTeach) {
                        localStorage.clear();
                        return <Navigate to="/school/login" />;
                    }
                    return children;
                }
            } else if (schoolRoute.includes("school/admin")) {
                return children;
            }
        } else {
            if (schoolRoute.includes("school/admin")) {
                return <Navigate to="/school/admin/login" />;
            } else return <Navigate to="/school/login" />;
        }
    } else {


        if(value.token){

            if (
                route === "teacher" ||
                route === "student" ||
                route === "affiliate" ||
                route === "change-password" ||
                route === "mentor"
            ) {
                if (value.isVerified) {
                    if (route === "teacher" && !value.canTeach) {
                        localStorage.clear();
                        return <Navigate to="/login" />;
                    }
                    return children;
                }
            } else if (route === "admin") {
                return children;
            }

            return <Navigate to="/" />;

        }else {

            // if(route === 'admin'){
            //     return <Navigate to="/admin/login" />
            // }
            // else 
            return <Navigate to="/login" />;
        }
    }
};

export default GuardedRoute;

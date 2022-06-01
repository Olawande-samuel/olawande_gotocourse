import { useNavigate, useLocation } from "react-router-dom";

import { useCookie } from "../hooks"; 


const GuardedRoute = ({children}) => {
    const {fetchCookie, isCookie} = useCookie();
    const navigate = useNavigate();
    const location = useLocation();
    const route = location.pathname.split("/")[1];
    const userdata = fetchCookie('gotocourse-userdata');
    const userType = fetchCookie('gotocourse-usertype');


    if(isCookie('gotocourse-userdata')){
        if(userdata.token){
            console.log(userdata);
            // if(route === "admin" && userType !== "admin") {
            //     navigate(`/${userType}s`);
            // } 
            // else if(route === "students" && userType !== "students"){
            //     navigate(userType === "admin" ? `/${userType}` : `/${userType}s`);
            // } else if(route === "teachers" && userType !== "teachers"){
            //     navigate(userType === "admin" ? `/${userType}` : `/${userType}s`);
            // }else 
            return children
        }else return navigate("/login");
    }else  return navigate("/login");

}



export default GuardedRoute;
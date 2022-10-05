import React, {useRef, useEffect} from "react";
import {ToastContainer, toast} from "react-toastify";
import {FaChalkboardTeacher} from "react-icons/fa";






import { GuardedRoute } from "../../../../hoc";
import { Sidebar, Navbar } from "../../components";
import clsx from "../styles.module.css";
import { useAuth } from "../../../../contexts/Auth";
import { useLocalStorage } from "../../../../hooks";
import { KEY } from "../../../../constants";
import { AdvancedError } from "../../../../classes";
import Loader from "../../../../components/Loader";






export const Mentors = ({ children, header, loading }) => {
    const {
      generalState: { showSidebar },
      generalState,
      setGeneralState,
      adminFunctions: {}, studentFunctions: {fetchNotifications }
    } = useAuth();

  
    const {getItem} = useLocalStorage()
  
    const userData = getItem(KEY)
    const flag = useRef(false);
  
    // useEffect(() => {
    //   if(flag.current) return;
    //     (async() => {
    //       try{
    //         const res = await fetchNotifications(userData?.token);
    //         const {message, success, statusCode} = res;
    //         if(!success) throw new AdvancedError(message, statusCode);
    //         const {data} = res
    //         console.log({data})
    //         console.log({res})
    //         if(data.length > 0) {
    //           const unread = data.filter((notification)=>notification.isRead !== true)
    //           setGeneralState({...generalState, notifications: unread.length})
    //         }else {
    //           setGeneralState({...generalState, notifications: 0})
    //         }
    //       }catch(err){
    //         toast.error(err.message, {
    //           position: "top-right",
    //           autoClose: 4000,
    //           hideProgressBar: true,
    //           closeOnClick: true,
    //           pauseOnHover: true,
    //           draggable: true,
    //           progress: undefined,
    //         });
    //       }
    //     })()
    //     flag.current = true;
    // }, []);
  
    const toggleSidebar = () => {
      setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
  
    const mentor = {
        title: "MENTOR",
        logo: <FaChalkboardTeacher size="2.5rem" color="#0C2191" />
    }

   
  
    return (
      <GuardedRoute>
        {loading && <Loader />}
        <div className={clsx.mentors}>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Sidebar />
          <div className={clsx.mentors_main}>
            <Navbar content={mentor}  toggleSidebar={toggleSidebar} header={header} />
            {children}
          </div>
        </div>
      </GuardedRoute>
    );
};





export default Mentors;


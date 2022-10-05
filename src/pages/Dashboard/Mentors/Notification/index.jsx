import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";


import Layout from "../Layout";
import clsx from "../styles.module.css";
import { useAuth } from "../../../../contexts/Auth";
import { AdvancedError } from "../../../../classes";
import { useEffectOnMount, useLocalStorage } from "../../../../hooks";
import {KEY} from "../../../../constants";
import {NotificationContent} from "../../Admin";





// NOTIFICATION
const Notification = () => {
    const {getItem} = useLocalStorage();
    const flag = useRef(false);
    let userdata = getItem(KEY);
    const [loader, setLoader] = useState(false);
    const [load, setLoad] = useState(false);
    const {generalState, setGeneralState,  studentFunctions: {fetchNotifications, readNotifications } } = useAuth(); 
    const [reload, setReload]= useState(false)
    const [notifications, setNotifications] = useState([]);
  
    useEffectOnMount(() => {
      if(flag.current) return;
        (async() => {
          try{
            setLoader(true)
            const res = await fetchNotifications(userdata?.token);
            const {message, success, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            const {data} = res
            if(data.length > 0) {
              setNotifications(data)
              const unread = data.filter((notification)=>notification.isRead !== true)
              setGeneralState({...generalState, notifications: unread.length})
            }
          }catch(err){
            toast.error(err.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }finally{
            setLoader(_ => false);
          }
        })()
        flag.current = true;
    },[reload])
    
    async function markAsRead(e){
      e.preventDefault();
      try{
        setLoad(true)
        const res = await readNotifications(userdata?.token);
        const {message, success, statusCode} = res;
        if(!success) throw new AdvancedError(message, statusCode);
        const {data} = res
        setReload(true)
        flag.current = false;
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }catch(err){
        toast.error(err.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }finally{
        setLoad(_ => false);
      }
    }
  
    return (
      <Layout userdata={userdata} header="Notifications">
        <NotificationContent notifications={notifications} markAsRead={markAsRead} load={load} loader={loader} />
      </Layout>
    );
}






export default Notification;
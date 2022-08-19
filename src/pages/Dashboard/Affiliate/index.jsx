import React, {useEffect, useState, useRef} from 'react'
import { toast, ToastContainer } from 'react-toastify';
import { AdvancedError } from '../../../classes';
import Loader from '../../../components/Loader';
import { KEY } from '../../../constants';
import { GuardedRoute } from '../../../hoc';
import { useLocalStorage } from '../../../hooks';
import { Searchbar, Sidebar } from '../components';
import clsx from "../Admin/styles.module.css";
import { useAuth } from '../../../contexts/Auth';
import MyChart from "../../../components/Chart";

import {MdContentCopy} from "react-icons/md"
import style from "./styles.module.css"

import { AiOutlineMenu } from 'react-icons/ai';
import { BsFillEyeFill, BsCreditCard2BackFill } from 'react-icons/bs';
import { FaShoppingBag, FaMoneyBillWave } from 'react-icons/fa';
import { BiBarChartSquare } from 'react-icons/bi';
import { IoIosBasket } from 'react-icons/io';
import { Box } from '@mui/material';




export function Dashboard(){
    
    const gridContent = [
        
        {
            id:1,
            name:"visits",
            value:850,
            icon:<BsFillEyeFill color="#F75C4E"  size="2.5rem" />
        },
        {
            id:2,
            name:"sales",
            value:35,
            icon:<FaShoppingBag  color="#304D74" size="2.5rem" />
        },
        {
            id:3,
            name:"revenue",
            value:"3,000",
            icon:<BiBarChartSquare color="#F75C4E"  size="2.5rem" />,
            amount: true

        },
        {
            id:4,
            name:"income",
            value:"1,500",
            icon:<FaMoneyBillWave color="#304D74"  size="2.5rem" />,
            amount: true

        },
        {
            id:5,
            name:"paid commission",
            value:"7,500",
            icon:<IoIosBasket color="#F75C4E" size="2.5rem" />,
            amount: true
        },
        {
            id:6,
            name:"unpaid commissions",
            value:"8,500",
            icon:<BsCreditCard2BackFill color="#304D74" size="2.5rem" />,
            amount: true
        },
    ]


    return (
        <Affiliates header="Dashboard">
            <div className={clsx["admin_profile"]}>
                <div className={clsx.admin__student}>
                    <div className={`d-flex justify-content-between ${style.affiliate_top}`}>
                        <div className={style["affiliate_top--left"]}>
                            <h3>Your affiliate link</h3>
                            <p>This is your referral URL. Share it with your audience to increase sales</p>

                            <div className="d-flex">
                                <input type="text" name="link" id="link" className="me-3" />
                                <button className="btn btn-primary"> <i><MdContentCopy /></i> Copy</button>
                            </div>
                            
                        </div>
                        <div className={style["affiliate_top--right"]}>
                            <select name="date" id="date" className="form-select">
                                <option value="30">Last 30 days</option>
                            </select>
                        </div>
                    </div>
                    <div className={`${style.affiliate_grid}`}>
                        {gridContent.map(item=>(
                            <AffiliateCard {...item}/>
                        ))}
                    </div>
                    <div className={`${style.affiliate_chart}`}>
                        <MyChart />
                    </div>
                </div>
            </div>
        </Affiliates>
    )
}


const AffiliateCard = ({icon, name, value, amount})=> {

    return (
        <Box className={style.affiliate_box}>
            <i className={style.icon}>{icon}</i>
            <div className={style.content}>
                <h4>{ `${amount? "$":""} ${value}` }</h4>
                <p>{name}</p>
            </div>
        </Box>
    )
}



export const Affiliates = ({ children, header }) => {
    const { generalState: { isMobile, showSidebar,loading }, generalState, setGeneralState, adminFunctions:{fetchNotifications} } = useAuth();
    const {getItem} = useLocalStorage();
  
    const flag = useRef(false);
    let userdata = getItem(KEY);
    const toggleSidebar = () => {
      setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
  
    useEffect(() => {
      if(flag.current) return;
        (async() => {
          try{
            const res = await fetchNotifications(userdata?.token);
            const {message, success, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            const {data} = res
            if(data.length > 0) {
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
          }
        })()
        flag.current = true;
      },[])
    return (
      <GuardedRoute>
        <div className={clsx["admin"]}>
          <ToastContainer
            position="top-right"
            autoClose={4500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Sidebar isMobile={isMobile} />
          <div className={clsx["admin_main"]}>
            <div className={`align-items-center ${clsx["admin_topbar"]}`}>
              <div className="d-md-none">
                <i>
                  <AiOutlineMenu
                    style={{ fontSize: "24px", color: "#0C2191" }}
                    onClick={toggleSidebar}
                  />
                </i>
              </div>
              <h1 className="d-none d-md-block">{header}</h1>
              <Searchbar showIcon={true} placeholder="Search" />
            </div>
            {children}
          </div>
          {loading && <Loader />}
        </div>
      </GuardedRoute>
    );
};


export default Affiliates
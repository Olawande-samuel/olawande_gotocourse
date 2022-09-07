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
import { useQuery } from '@tanstack/react-query';
import LogoutButton from '../../../components/LogoutButton';




export function Dashboard(){
  const {getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const {  generalState, setGeneralState, adminFunctions:{fetchNotifications}, affiliatesFunctions:{fetchAffiliateStats} } = useAuth();

  const fetchMyStats = useQuery(["fetchStats", userdata?.token], ()=>fetchAffiliateStats(userdata?.token))
  

    const gridContent = [
        
        {
            id:1,
            name:"visits",
            value:fetchMyStats?.data?.data?.data.visits ? fetchMyStats?.data?.data?.data.visits : 0,
            icon:<BsFillEyeFill color="#F75C4E"  size="2.5rem" />
        },
        {
            id:2,
            name:"sales",
            value:fetchMyStats?.data?.data?.data.sales ? fetchMyStats?.data?.data?.data.sales : 0,
            icon:<FaShoppingBag  color="#304D74" size="2.5rem" />
        },
        {
            id:3,
            name:"revenue",
            value:fetchMyStats?.data?.data?.data.earnings ? fetchMyStats?.data?.data?.data.earnings : 0,
            icon:<BiBarChartSquare color="#F75C4E"  size="2.5rem" />,
            amount: true
        },
        {
            id:4,
            name:"income",
            value:0,
            icon:<FaMoneyBillWave color="#304D74"  size="2.5rem" />,
            amount: true

        },
        {
            id:5,
            name:"paid commission",
            value:fetchMyStats?.data?.data?.data.paidEarnings ? fetchMyStats?.data?.data?.data.paidEarnings : 0,
            icon:<IoIosBasket color="#F75C4E" size="2.5rem" />,
            amount: true
        },
        {
            id:6,
            name:"unpaid commissions",
            value:fetchMyStats?.data?.data?.data.unpaidEarnings ? fetchMyStats?.data?.data?.data.unpaidEarnings : 0,
            icon:<BsCreditCard2BackFill color="#304D74" size="2.5rem" />,
            amount: true
        }
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

export function Sales(){
  const {getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const {  affiliatesFunctions:{fetchEarnings} } = useAuth();

  const getEarnings = useQuery(["fetchEarnings", userdata?.token], ()=>fetchEarnings(userdata?.token))

  console.log({getEarnings})
  const gridContent = [
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
]
  return (
    <Affiliates header="Sales">
            <div className={clsx["admin_profile"]}>
                <div className={clsx.admin__student}>
                    <div className={`d-flex mb-4 ${style.affiliate_top}`} style={{gap:"1rem"}}>
                        
                          {
                            gridContent.map((item, i)=>(
                              <OtherCard {...item} key={i} />

                            ))
                          }
                    </div>
                </div>
                <AffiliateTable header={header} contentArray={contentArray} />
            </div>
        </Affiliates>
  )
}
export function Revenue(){
  const gridContent = [
        
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
]
  return (
    <Affiliates header="Revenue">
            <div className={clsx["admin_profile"]}>
                <div className={clsx.admin__student}>
                    <div className={`d-flex mb-4 ${style.affiliate_top}`}  style={{gap:"1rem"}}>
                    
                    {
                            gridContent.map(item=>(
                              <OtherCard {...item} />

                            ))
                          }
                    </div>
                </div>
                <AffiliateTable header={header} contentArray={contentArray} />
            </div>
        </Affiliates>
  )
}
export function Income(){
  const gridContent = [
        
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
]
  return (
    <Affiliates header="Income">
            <div className={clsx["admin_profile"]}>
                <div className={clsx.admin__student}>
                    <div className={`d-flex mb-4 ${style.affiliate_top}`} style={{gap:"1rem"}}>
                    {
                            gridContent.map(item=>(
                              <OtherCard {...item} />

                            ))
                          }
                    </div>
                </div>
                <AffiliateTable header={header} contentArray={contentArray} />
            </div>
        </Affiliates>
  )
}

function AffiliateTable({header, contentArray=[]}){
  return (
    <div className="table-responsive">
      <table className="table table-borderless">
        <thead>
          <tr>
            {
              header.map(item=>(
                <th>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            contentArray.map((item, i)=>(
              <tr key={i}>
                <td><span>{i + 1}</span></td>
                <td>
                    <span>{item.date}</span>
                </td>
                <td><span>{item.title}</span></td>
                <td><span>{item.amount}</span></td>
                <td><span>{item.status}</span></td>
                
            </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
const header = ["No", "Date", "Title", "Amount", "Status"]

const contentArray = [
  {
    id:1,
    date:"12/08/2022",
    title:"Sales",
    amount:3000,
    status:"Verified"
  },
  {
    id:2,
    date:"12/08/2022",
    title:"Sales",
    amount:3000,
    status:"Verified"
  },
  {
    id:3,
    date:"12/08/2022",
    title:"Sales",
    amount:3000,
    status:"Verified"
  },
  {
    id:4,
    date:"12/08/2022",
    title:"Sales",
    amount:3000,
    status:"Verified"
  },
  {
    id:5,
    date:"12/08/2022",
    title:"Sales",
    amount:3000,
    status:"Verified"
  },
]

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
const OtherCard = ({icon, name, value, amount})=> {

    return (
      <Box className={style.small}>
        <Box className={style.affiliate_box}>
            <i className={style.icon}>{icon}</i>
            <div className={style.content}>
                <h4>{ `${amount? "$":""} ${value}` }</h4>
                <p>{name}</p>
            </div>
      </Box>
        </Box>
    )
}



export const Affiliates = ({ children, header }) => {
    const { generalState: { isMobile, showSidebar, loading }, generalState, setGeneralState } = useAuth();
    
    const toggleSidebar = () => {
      setGeneralState({ ...generalState, showSidebar: !showSidebar });
    };
      
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
              <div className="hamburger">
                <i>
                  <AiOutlineMenu
                    style={{ fontSize: "24px", color: "#0C2191" }}
                    onClick={toggleSidebar}
                  />
                </i>
              </div>
              <h1 className="d-none d-md-block">{header}</h1>
              <div className="button_wrapper d-flex align-items-center text-center d-flex ms-3 ">
                <LogoutButton /> 
              </div>
            </div>
            {children}
          </div>
          {loading && <Loader />}
        </div>
      </GuardedRoute>
    );
};


export default Affiliates
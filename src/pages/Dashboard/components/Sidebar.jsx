import { useState} from "react";
import {Badge} from "@mui/material"
import { MdHistory} from "react-icons/md";
import {AiOutlineClose, AiOutlineSetting, AiOutlineDashboard} from "react-icons/ai";
import {IoIosHome, IoIosPerson, IoIosChatbubbles, IoIosCash, IoIosHelpBuoy} from "react-icons/io";
import {BiCategory, BiBell, BiBarChartSquare} from "react-icons/bi";
import {FaTwitch} from "react-icons/fa";
import { useLocation, NavLink} from "react-router-dom";
import {FiGift, FiSend, FiBookOpen} from "react-icons/fi";
import {FaRegMoneyBillAlt, FaMoneyBillWave} from "react-icons/fa";
import {motion} from "framer-motion"


import {AdvancedError} from "../../../classes"
import { useLocalStorage } from "../../../hooks";

import clsx from "./styles.module.css";
import Logo from "../../../components/Logo";
import { colors } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";
import LogoutButton from "../../../components/LogoutButton";
import { LogoSidebar, Logosm } from "../../../images/components/svgs";



//mini-components
function SidebarItem({icon: Icon, title, isMobile, path,showBadge, ...props}){
    const {generalState:{notifications, chat}} = useAuth(); 

    return (
        <div className={clsx.sidebar_item} {...props}>
        <Badge alignItems="center" badgeContent={showBadge ? path === "notifications" ? notifications : chat : 0} color="secondary" >
            <i>
                <Icon className={clsx.sidebar_icon} color="white" size="2rem" />
            </i>
            {isMobile && <span className={clsx.sidebar_item_title}>
                {title}
            </span>}
        </Badge>
        </div>
    )
}



const Sidebar = ({isMobile}) => {
    const location = useLocation();
    const {generalState,  setGeneralState} = useAuth();
    const {getItem} = useLocalStorage()
    const route = location.pathname.split("/")[1];
    const [loading, setLoading] = useState(false)
    // const sidebarItemRef = useRef(null);

    const data =  route === "admin" ? [
        {
            icon: IoIosHome,
            path: "",
            title: "Dashboard"
        },
        {
            icon: IoIosPerson,
            path: "students",
            title: "Students"
        },
        {
            icon: FiSend,
            path: "teachers",
            title: "Mentors/Teachers"
        },
        {
            icon: FaTwitch,
            path: "mentors",
            title: "Mentors"
        },
        {
            icon: IoIosCash,
            path: "fees",
            title: "Fees"
        },
        {
            icon: FiGift,
            path: "courses",
            title: "Courses"
        },
        {
            icon: IoIosHelpBuoy,
            path: "courses-categories",
            title: "Course Catgories"
        },
        {
            icon: BiCategory,
            path: "bootcamps",
            title: "Bootcamps"
        },
        {
            icon: BiBell,
            path: "notifications",
            title: "Notifications",
            showBadge:true,
        },
        {
            icon:IoIosChatbubbles,
            path: "chat",
            title: "Chat",
            showBadge:true,

        },
        {
            icon: IoIosCash,
            path: "earnings",
            title: "Earnings"
        },
        {
            icon:AiOutlineSetting,
            path: "settings",
            title: "Settings"
        }
    ] : route === "student" ?  [
        {
            icon: IoIosPerson,
            path: "",
            title: "My Profile"
        },
        {
            icon: FiBookOpen,
            path: "courses",
            title: "My Courses"
        },
        {
            icon: BiCategory,
            path: "bootcamps",
            title: "My Bootcamps"
        },
        {
            icon: FiGift,
            path: "wishlist",
            title: "Wishlist"
        },
        {
            icon: MdHistory,
            path: "history",
            title: "History"
        },
        {
            icon: FaRegMoneyBillAlt,
            path: "fees",
            title: "Fees"
        },
        {
            icon:IoIosChatbubbles,
            path: "chat",
            title: "Chat",
            showBadge:true,

        },
    ] : route === "teacher" ? [
        {
            icon: IoIosPerson,
            path: "",
            title: "My Profile"
        },
        {
            icon: FiGift,
            path: "courses",
            title: "Courses"
        },
        {
            icon: BiCategory,
            path: "bootcamps",
            title: "Bootcamps"
        },
        {
            icon: IoIosCash,
            path: "earnings",
            title: "Earnings"
        },
        {
            icon:IoIosChatbubbles,
            path: "chat",
            title: "Chat",
            showBadge:true,

        },
    ] : [
        
        {
            icon: AiOutlineDashboard,
            path: "",
            title: "Dashboard"
        },
        {
            icon: FiGift,
            path: "sales",
            title: "Sales"
        },
        {
            icon: BiBarChartSquare,
            path: "revenue",
            title: "Revenue"
        },
        {
            icon: FaMoneyBillWave,
            path: "income",
            title: "Income"
        },
    ];

    const toggleSidebar = ()=>{
        setGeneralState({...generalState, showSidebar:!generalState.showSidebar})
    }

    async function gotodashboard(){
        const data = getItem("gotocourse-userdata")

        console.log(data)
        if(data.userType === "student" || data.userType === 'admin'){
            if(generalState.pledre.loginUser){
                setLoading(true)
                try{
                    const response = await generalState.pledre.loginUser({
                        user_id: data.pledre._id,
                        user_type: "student"
                    })

                    console.log(response)
                } catch(err){
                    console.error(err)
                }finally{
                    console.log("done!!!")
                    setLoading(false)
                }
            }
        } else if(data.pledre?.deleted === false && data.accessPledre){
            if(generalState.pledre.loginUser){
                setLoading(true)
                try{
                    const response = await generalState.pledre.loginUser({
                        user_id: data.pledre._id,
                        user_type: route
                    })

                    console.log(response)
                } catch(err){
                    console.error(err)
                }finally{
                    console.log("done!!!")
                    setLoading(false)
                }
            }
        } 
        else {
            throw new AdvancedError("User not authorized")
        }
    }
    return (
        <>
        <div className={`${generalState.showSidebar ? clsx.open :clsx.close}  ${clsx.sidebar} sidebar `}>
                <i className="d-md-none" style={{fontSize:"24px", position:"absolute", right:"-30px", color:"#0C2191", cursor:"pointer", zIndex:"3000"}} onClick={toggleSidebar}>
                    <AiOutlineClose />
                </i>
                <div className="text-center">
                    <LogoSidebar />
                </div>
            <div className={clsx.sidebar_items} id="sidebar__items">
                {
                    data.map(({icon, path, title,showBadge, admin}, i) => (
                        <NavLink onClick={toggleSidebar} to={`${route === "admin" ? '/admin' : route === 'student' ? '/student' : route === "teacher" ? '/teacher': '/affiliate'}${'/'+path}`}  key={i}>
                            <SidebarItem location={location}
                            isMobile={!isMobile} icon={icon} 
                            title={title} path={path} showBadge={showBadge} admin={admin} />
                        </NavLink>
                    ))
                }
            <div className="button_wrapper text-center" style={{marginTop:"3rem"}}>
                <motion.button 
                    whileHover={{
                        // boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                        textShadow: "0px 0px 8px rgb(255, 255, 255)"
                    }}
                    className="btn btn-primary" 
                    style={{padding:"10px 28px", background:"var(--secondary)", border:"1px solid var(--secondary)"}}
                    onClick={gotodashboard}
                    disable={loading}
                >
                    {loading ? <div className="spinner-border text-light">
                        <div className="visually-hidden">loading</div>
                        </div>
                        :
                        "Go to Class"
                    }
                </motion.button>
            </div>
            <LogoutButton />
                </div>

        </div>
        <div onClick={toggleSidebar} className={`d-lg-none ${clsx.overlay} ${generalState.showSidebar ? clsx.overlayopen :clsx.overlayclose}`}></div>
        </>
    )
} 


export default Sidebar;
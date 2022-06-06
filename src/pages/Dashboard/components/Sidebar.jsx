import {useEffect, useState,useRef} from "react";
import {MdMessage} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";
import {IoIosHome, IoIosPerson, IoIosChatbubbles, IoIosCash} from "react-icons/io";
import {useNavigate, useLocation, NavLink} from "react-router-dom";
import {FiGift, FiSend} from "react-icons/fi";



import clsx from "./styles.module.css";
import Logo from "../../../components/Logo";
import { colors } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";



//mini-components
function SidebarItem({icon: Icon, title, isMobile, path, ...props}){
    return (
        <div className={clsx.sidebar_item} {...props}>
            <Icon className={clsx.sidebar_icon} />
            {isMobile && <span className={clsx.sidebar_item_title}>
                {title}
            </span>}
        </div>
    )
}



const Sidebar = ({isMobile}) => {
    const location = useLocation();
    const {generalState,  setGeneralState} = useAuth();
    const route = location.pathname.split("/")[1];

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
            icon: IoIosCash,
            path: "fees",
            title: "Fees"
        },
        {
            icon: FiGift,
            path: "courses",
            title: "Courses"
        },
    ] : route === "students" ?  [
        {
            icon: IoIosPerson,
            path: "",
            title: "My Profile"
        },
        {
            icon: MdMessage,
            path: "classes",
            title: "My Classes"
        },
        {
            icon: FiGift,
            path: "courses",
            title: "Courses"
        },
    ] : [
        {
            icon: IoIosPerson,
            path: "",
            title: "My Profile"
        },
        {
            icon: MdMessage,
            path: "classes",
            title: "My Classes"
        },
        {
            icon: FiGift,
            path: "courses",
            title: "Courses"
        },
    ];

    useEffect(() => {
        console.log("Sidebar is mounted");

        return () => console.log("Sidebar is unmounted");
    }, [])

const toggleSidebar = ()=>{
    setGeneralState({...generalState, showSidebar:!generalState.showSidebar})
}
    return (
        <>
        <div className={` ${generalState.showSidebar ? clsx.open :clsx.close}  ${clsx.sidebar}`}>
                <i className="d-md-none" style={{fontSize:"24px", position:"absolute", right:"-30px", color:"#0C2191", cursor:"pointer", zIndex:"3000"}} onClick={toggleSidebar}>
                    <AiOutlineClose />
                </i>
            <Logo />
            <div className={clsx.sidebar_items} id="sidebar__items">
                {
                    data.map(({icon, path, title}, i) => (
                        <NavLink onClick={toggleSidebar} to={`${route === "admin" ? '/admin' : route === 'students' ? '/students' : '/teacher'}${'/'+path}`}  key={i}>
                            <SidebarItem location={location}
                            isMobile={!isMobile} icon={icon} 
                            title={title} path={path} />
                        </NavLink>
                    ))
                }
            </div>
        </div>
        <div onClick={toggleSidebar} className={`d-lg-none ${clsx.overlay} ${generalState.showSidebar ? clsx.overlayopen :clsx.overlayclose}`}></div>
        </>
    )
} 


export default Sidebar;
import {useEffect, useRef} from "react";
import {MdMessage} from "react-icons/md";
import {IoIosHome, IoIosPerson, IoIosChatbubbles, IoIosCash} from "react-icons/io";
import {useNavigate, useLocation, NavLink} from "react-router-dom";
import {FiGift, FiSend} from "react-icons/fi";



import clsx from "./styles.module.css";
import Logo from "../../../components/Logo";
import { colors } from "../../../constants";



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
    // const sidebarItemRef = useRef(null);

    const data = location.pathname.includes("admin") ? [
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
    ]

    useEffect(() => {
        console.log("Sidebar is mounted");

        return () => console.log("Sidebar is unmounted");
    }, [])


    return (
        <div className={clsx.sidebar}>
            <Logo />
            <div className={clsx.sidebar_items} id="sidebar__items">
                {
                    data.map(({icon, path, title}, i) => (
                        <NavLink to={`${location.pathname.includes("admin") ? '/admin' : '/students'}${'/'+path}`}  key={i}>
                            <SidebarItem location={location}
                            isMobile={!isMobile} icon={icon} 
                            title={title} path={path} />
                        </NavLink>
                    ))
                }
            </div>
        </div>
    )
} 


export default Sidebar;
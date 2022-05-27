import {useEffect, useRef} from "react";
import {MdPerson, MdMessage} from "react-icons/md";
import {useNavigate, useLocation, Link} from "react-router-dom";




import useStyles from "./styles";
import Logo from "../../../components/Logo";
import { colors } from "../../../constants";



//mini-components
function SidebarItem({icon: Icon, title, clsx, isMobile, ...props}){
    return (
        <div className="sidebar_item" style={clsx['sidebar_item']} {...props}>
            <Icon style={clsx['sidebar_icon']} />
            {!isMobile && <span style={clsx['sidebar_item_title']}>
                {title}
            </span>}
        </div>
    )
}



const Sidebar = ({isMobile}) => {
    const clsx = useStyles();
    const location = useLocation();
    const navigate = useNavigate();
    // const sidebarItemRef = useRef(null);
    const data = [
        {
            icon: MdPerson,
            path: "",
            title: "My Profile"
        },
        {
            icon: MdMessage,
            path: "classes",
            title: "My Classes"
        }
    ]

    useEffect(() => {
        console.log("Sidebar is mounted");

        //add event listener to the sidebar item to change style
        document.querySelectorAll(".sidebar_item").forEach(el => {
            el.addEventListener("mouseover", e => {
                e.currentTarget.style.backgroundColor= colors.secondary;
                e.currentTarget.style.color= colors.white;
            })
        })

        document.querySelectorAll(".sidebar_item").forEach(el => {
            el.addEventListener("mouseout", e => {
                e.currentTarget.style.backgroundColor= 'transparent';
                e.currentTarget.style.color= colors.gray;
            })
        })


        return () => console.log("Sidebar is unmounted");
    }, [])


    return (
        <div style={clsx['sidebar']}>
            <Logo />
            <div style={clsx["sidebar_items"]}>
                {
                    data.map(({icon, path, title}, i) => (
                        <Link to={`/students/${path}`}>
                            <SidebarItem 
                            key={i}
                            isMobile={isMobile} clsx={clsx} icon={icon} 
                            title={title} path={path} />
                        </Link>
                    ))
                }
            </div>
        </div>
    )
} 


export default Sidebar;
import {useState} from "react"
import {AiOutlineMenu} from "react-icons/ai"
import {FaGraduationCap} from "react-icons/fa"
import {IoNotificationsOutline} from "react-icons/io5"
import {useNavigate, useLocation} from "react-router-dom"
import clsx from "./styles.module.css";
import LogoutButton from "../../../components/LogoutButton";
import { GotoDashboard } from "../Students";
import { useAuth } from "../../../contexts/Auth";
import { Badge } from "@mui/material";

export default function Navbar({header, toggleSidebar, notification, content }){
    const {pathname} = useLocation()
    const main = pathname.split("/")[1]
    const [loading, setLoading]= useState(false)
    const { generalState: { isMobile, showSidebar,notifications }, generalState, setGeneralState, adminFunctions:{fetchNotifications} } = useAuth();
    const navigate = useNavigate()
    return(
        <div className={`align-items-center ${clsx.dashboard_topbar}`}>
            <div className="d-flex">
            <div className="hamburger me-3 align-items-center">
                <i>
                    <AiOutlineMenu style={{fontSize:"24px", color:"#0C2191", cursor:"pointer"}} onClick={toggleSidebar} />
                </i>
            </div>
            <h6 className={clsx.title__header}>{header}</h6>
            </div>
            <h4 className={clsx.title__info}>
                <span className="fw-bolder">{content.title}</span>
                <i>
                    {content.logo}
                </i>
                </h4>
            <div className="button_wrapper d-flex align-items-center text-center d-flex ms-3 ">
                {/* move loading state to this component */}
                <Badge alignItems="center" className="me-4" badgeContent={ notifications ? notifications : 0} color="secondary" >
                    <IoNotificationsOutline size="1.5rem"  color="#0C2191" onClick={()=>navigate(`/${main}/notifications`)} style={{cursor:"pointer"}}  />
                </Badge>

                {/* <GotoDashboard loader={loading} setLoading={setLoading} /> */}
                <LogoutButton />
            </div>
        </div>
    )
}
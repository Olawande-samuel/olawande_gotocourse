import {useEffect} from "react";
import {MdEdit} from "react-icons/md";



import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/AuthContext";




export function Dashboard(){
    return (  
        <Admin>              
            <div className={clsx['admin_profile']}>
                <div className={clsx["admin_profile_top"]}>
                    <div className={clsx['admin_profile_top_img']}>
                        <img src={avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx["admin_profile_top_button"]}>
                        <MdEdit style={{marginRight: 15}} />    Edit
                    </button>
                </div>
                <div className={clsx["admin_profile_main"]}>
                    <h1>Olu Jacobs</h1>
                    <p className={clsx["admin__paragraph"]}>Enjoys writing and playing video games. <br />
                    I joined Gotocourse to make friends connect with people virtually
                    </p>

                </div>
            </div>
        </Admin>
    )
}





const Admin = ({children}) => {
    const {generalState: {isMobile}} = useAuth();
    useEffect(() => {
        console.log("Admin component is mounted")
        return () => console.log("Admin component is unmounted");
    }, [])



    return (
        <div className={clsx['admin']}>
            <Sidebar isMobile={isMobile} />
            <div className={clsx['admin_main']}>
                <div className={clsx['admin_topbar']}>
                    <h1>Olu Jacobs</h1>
                    <Searchbar showIcon={true} placeholder="Search" />
                </div>
                {children}
            </div>
        </div>
    )
}

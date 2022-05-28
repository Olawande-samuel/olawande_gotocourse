import {useEffect} from "react";
import {MdEdit} from "react-icons/md"



import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/AuthContext";




export function Profile(){
    const {generalState: {isMobile, userdata}} = useAuth();
    return (  
        <Students isMobile={isMobile} userdata={userdata}>              
            <div className={clsx.students_profile}>
                <div className={clsx.students_profile_top}>
                    <div className={clsx.students_profile_top_img}>
                        <img src={avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx.students_profile_top_button}>
                        <MdEdit style={{marginRight: 15}} />    Edit
                    </button>
                </div>
                <div className={clsx.students_profile_main}>
                    <h1 className={{...clsx.students__header, marginBottom: 30}}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <p className={clsx.students__paragraph}>Enjoys writing and playing video games. <br />
                    I joined Gotocourse to make friends connect with people virtually
                    </p>

                </div>
            </div>
        </Students>
    )
}


export function Classes(){
    const {generalState: {isMobile, userdata}} = useAuth();
    const data = [
        {
            title: "CyberSecurity",
            numberOfLessons: 10,
            date: "Apr 5",
            time: "5pm",
            isLive: false,
            color: colors.info
        },
        {
            title: "Branding",
            numberOfLessons: 10,
            date: "Apr 5",
            time: "5pm",
            isLive: true,
            color: colors.greenish
        },
    ]
    return ( 
        <Students isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.students_profile}>
                <div className={clsx.classes}>
                    {
                        data.map(({numberOfLessons, title, date, time, isLive, color}, i) => (
                            <ClassesCard numberOfLessons={numberOfLessons} key={i} title={title} 
                            date={date} time={time} isLive={isLive} color={color} />
                        ))
                    }
                </div>
            </div>
        </Students>
    )
}


function ClassesCard({numberOfLessons, title, date, time, isLive, color}){
    return (
        <div className={clsx.classes_card}>
            <div className={clsx.classes_card_first}>
                <div style={{backgroundColor: color}} className={clsx.first_avatar}>
                    <h2 style={{margin: 0, fontWeight: 'bolder', fontSize: "2rem"}}>{title[0]}</h2>
                </div>
                <div className={clsx.first_meta}>
                    <h5 style={{margin: 0}}>{title}</h5>
                    <p style={{color: colors.gray, fontSize:"0.9rem"}}>{numberOfLessons} lessons</p>
                </div>
            </div>
            <div className={clsx.classes_card_second}>
                <span>{date}</span>
                <span style={{fontWeight: "500"}}>{time}</span>
            </div>
            <div className={clsx.classes_card_third}>
                <button className={isLive ? `${clsx['third_btn']} ${clsx['third_btn_live']}` : clsx.third_btn}>Live</button>
                <button className={clsx.third_btn}>Completed</button>
            </div>
        </div>
    )
}



const Students = ({children, isMobile, userdata}) => {
    useEffect(() => {
        console.log("Students component is mounted")
        return () => console.log("Students component is unmounted");
    }, [])



    return (
        <div className={clsx.students}>
            <Sidebar isMobile={isMobile} />
            <div className={clsx.students_main}>
                <div className={clsx.students_topbar}>
                    <h1 className={clsx.students__header}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <Searchbar showIcon={true} placeholder="Search" />
                </div>
                {children}
            </div>
        </div>
    )
}

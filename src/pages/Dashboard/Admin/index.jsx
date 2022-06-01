import {useEffect} from "react";
import {MdEdit} from "react-icons/md";


import {Switch} from "@mui/material";
import {AiOutlineMenu} from "react-icons/ai";

import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";

import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/AuthContext";
import img01 from "../../../images/mentor1.png";
import img02 from "../../../images/mentor2.png";
import { GuardedRoute } from "../../../hoc";





export function Dashboard(){
    return (  
        <Admin header="Dashboard">              
            <div className={clsx['admin_profile']}>
                <div className={clsx["admin_profile_top"]}>
                    <div className={clsx['admin_profile_top_img']}>
                        <img src={avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx["admin_profile_top_button"]}>
                        <MdEdit style={{marginRight: 15}} />  <span>Edit</span>  
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


export function UserInfoCard({img, name, date, email, isActive, paid, comp, num, course, pack, rating}){
    return (
        // <div>
            <tr className={clsx.user__info_card}>

                <td className={clsx.user__info}>
                    {num + 1}.
                </td>
                {img && (<td className={clsx.user__details}>
                    <img src={img} alt="avatar" />
                    <span>{name}</span>
                </td>)}

                {    comp === "Courses" && (
                        <td className={clsx.user__info}>
                            {course}
                        </td>
                    )
                }

                {    comp === "Courses" && (
                        <td className={clsx.user__info}>
                            {name}
                        </td>
                    )
                }

                

                {date && (<td className={clsx.user__date}>
                    <span>{date}</span>
                </td>)}
                
                {
                    pack && (
                        <td className={clsx.user__date}>
                            <span>{pack}</span>
                        </td>
                    )
                }
                {email && <td className={clsx.user__email}>
                    <span>{email}</span>
                </td>}
                {rating && <td className={clsx.user__email}>
                    <span>{rating}</span>
                </td>}
                {paid && 
                    (
                    <td className={clsx.user__button}>
                        <span>
                            {new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(paid)}
                        </span>
                    </td>
                    ) 
                }
                {isActive &&
                    (<td className={clsx.user__button}>
                        <span>
                            <Switch checked={isActive} />
                        </span>
                    </td>)
                }
            </tr>
        // </div>
    )
}


export function Teachers(){
    const tableHeaders = ["No", "Name", "Date", "Email", "Approve"]
    const tableContents = [
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: false
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: false
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: true
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: false
        },
    ]
    return (
        <Admin header={"Mentors/Teachers"}>
            <div className={clsx['admin_profile']}>
                <div className={clsx.admin__student}>
                    <h1>All Mentors</h1>
                    <div className={`table-responsive ${clsx.admin__student_main}`}>
                        <table className={`${clsx.admin__student_table}`}>
                            <thead>
                                {
                                    tableHeaders.map((el, i) => (
                                        <td key={i}>{el}</td>
                                    ))
                                } 
                            </thead>
                            <tbody>
                                {
                                    tableContents.map(({img, email, date, name, approve}, i) => (
                                        <UserInfoCard key={i} name={name} img={img} num={i}
                                        date={date} email={email} isActive={approve} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Admin>
    )
}


export function Courses(){
    const tableHeaders = ["No", "Courses", "Name", "Date", "Package", "Rating", "Approval"]
    const tableContents = [
        {
            name: "Melanie Grutt",
            course: "Cybersecurity",
            date: "Feb 24",
            package: "Cohort",
            rating: "Bronze",
            approve: true
        },
        {
            name: "Keira Danlop",
            course: "UI/UX",
            date: "Feb 24",
            package: "Cohort",
            rating: "Silver",
            approve: true
        },
        {
            name: "Diop Grutt",
            course: "HTML",
            date: "Apr 1",
            package: "One on One",
            rating: "Gold",
            approve: false
        },
        {
            name: "Diop Grutt",
            course: "Data Analytics",
            date: "Sept 1",
            package: "Self paced",
            rating: "Diamond",
            approve: false
        },
    ]
    return (
        <Admin header={"Courses"}>
            <div className={clsx['admin_profile']}>
                <div className={clsx.admin__student}>
                    <h1>All Courses</h1>

                    <div className={clsx.admin__student_main}>
                        <table className={clsx.admin__student_table}>
                            <thead>
                                {
                                    tableHeaders.map((el, i) => (
                                        <td key={i}>{el}</td>
                                    ))
                                } 
                            </thead>
                            <tbody>
                                {
                                    tableContents.map(({img, email, date, name, approve, package: p, course, rating}, i) => (
                                        <UserInfoCard key={i} name={name} num={i} comp={"Courses"} rating={rating}
                                        date={date} email={email} isActive={approve} pack={p} course={course} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Admin>
    )
}


export function Fees(){
    const tableHeaders = ["No", "Name", "Date", "Email", "Paid"]
    const tableContents = [
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            paid: 2000
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            paid: 4000
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            paid: 1000
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            paid: 6000
        },
    ]
    return (
        <Admin header={"Fees"}>
            <div className={clsx['admin_profile']}>
                <div className={clsx.admin__student}>
                    <h1>All Fees</h1>

                    <div className={clsx.admin__student_main}>
                        <table className={clsx.admin__student_table}>
                            <thead>
                                {
                                    tableHeaders.map((el, i) => (
                                        <td key={i}>{el}</td>
                                    ))
                                } 
                            </thead>
                            <tbody>
                                {
                                    tableContents.map(({img, email, date, name, paid}, i) => (
                                        <UserInfoCard key={i} name={name} img={img} paid={paid}
                                        date={date} email={email} isActive={false} num={i} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Admin>
    )
}


export function Student(){
    const tableHeaders = ["No", "Name", "Date", "Email", "Approve"]
    const tableContents = [
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: true
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: true
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: true
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: true
        },
        {
            name: "Melanie Grutt",
            img: img01,
            date: "Feb 24",
            email: "melanie@gmail.com",
            approve: true
        },
        {
            name: "Kiera Danlop",
            img: img02,
            date: "Mar 23",
            email: "kiera@gmail.com",
            approve: true
        },
    ]
    return (
        <Admin header={"Student"}>
            <div className={clsx['admin_profile']}>
                <div className={clsx.admin__student}>
                    <h1>All Students</h1>

                    <div className={`table-responsive ${clsx.admin__student_main}`}>
                        <table className={clsx.admin__student_table}>
                            <thead>
                                {
                                    tableHeaders.map((el, i) => (
                                        <td key={i}>{el}</td>
                                    ))
                                } 
                            </thead>
                            <tbody>
                                {
                                    tableContents.map(({img, email, date, name, approve}, i) => (
                                        <UserInfoCard key={i} name={name} img={img}
                                        date={date} email={email} num={i} isActive={approve} />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Admin>
    )
}




const Admin = ({children, header}) => {
    const {generalState: {isMobile, showSidebar}, generalState, setGeneralState} = useAuth();
    useEffect(() => {
        console.log("Admin component is mounted")
        return () => console.log("Admin component is unmounted");
    }, [])


const toggleSidebar = ()=> {
    setGeneralState({...generalState, showSidebar: !showSidebar})
}
    return (

        <GuardedRoute>
            <div className={clsx['admin']}>
                <Sidebar isMobile={isMobile} />
                <div className={clsx['admin_main']}>
                    <div className={`align-items-center ${clsx['admin_topbar']}`}>
                        <div className="d-md-none">
                            <i>
                                <AiOutlineMenu style={{fontSize:"24px", color:"#0C2191"}} onClick={toggleSidebar} />
                            </i>
                        </div>
                        <h1 className="d-none d-md-block">{header}</h1>
                        <Searchbar showIcon={true} placeholder="Search" />

                    </div>
                    {children}
                </div>
            </div>
        </GuardedRoute>
    )
}

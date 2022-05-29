import {useEffect} from "react";
import {MdEdit} from "react-icons/md";



import { Sidebar, Searchbar, Toggle } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/AuthContext";
import img01 from "../../../images/mentor1.png";
import img02 from "../../../images/mentor2.png";





export function Dashboard(){
    return (  
        <Admin header="Dashboard">              
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


export function UserInfoCard({img, name, date, email, isActive, paid, header}){
    return (
        // <div>
            <tr className={clsx.user__info_card}>
                <td className={clsx.user__details}>
                    <img src={img} alt="avatar" />
                    <span>{name}</span>
                </td>
                <td className={clsx.user__date}>
                    <span>{date}</span>
                </td>
                <td className={clsx.user__email}>
                    <span>{email}</span>
                </td>
                {paid ? 
                    (
                    <td className={clsx.user__button}>
                        <span>
                            {paid}
                        </span>
                    </td>
                    ) 
                    :
                    (<td className={clsx.user__button}>
                        <span>
                            <Toggle />
                        </span>
                    </td>)
                }
            </tr>
        // </div>
    )
}


export function Teachers({}){
    const tableHeaders = ["Name", "Date", "Email", "Approve"]
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
    ]
    return (
        <Admin header={"Mentors/Teachers"}>
            <div className={clsx['admin_profile']}>
                <div className={clsx.admin__student}>
                    <h1>All Mentors</h1>

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
                                    tableContents.map(({img, email, date, name, approve}, i) => (
                                        <UserInfoCard key={i} name={name} img={img}
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


export function Fees({}){
    const tableHeaders = ["Name", "Date", "Email", "Paid"]
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
                                        date={date} email={email} isActive={false} />
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


export function Student({}){
    const tableHeaders = ["Name", "Date", "Email", "Approve"]
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
                                    tableContents.map(({img, email, date, name, approve}, i) => (
                                        <UserInfoCard key={i} name={name} img={img}
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




const Admin = ({children, header}) => {
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
                    <h1>{header}</h1>
                    <Searchbar showIcon={true} placeholder="Search" />
                </div>
                {children}
            </div>
        </div>
    )
}

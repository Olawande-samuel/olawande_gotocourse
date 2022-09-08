import React, {useEffect, useState, useRef} from "react"
import Chart from "react-apexcharts";
import {ToastContainer, toast} from "react-toastify";

import clsx from "./styles.module.css";
import {Admin} from "../";
import { HeaderCard, ChartCard, Rundown, Community } from "./components";
import MyChart from "../../../../components/Chart";
import img from "../../../../images/comm_img.png";
import { useLocalStorage } from "../../../../hooks";
import { useAuth } from "../../../../contexts/Auth";
import Loader from "../../../../components/Loader";
import { KEY } from "../../../../constants";
import { AdvancedError } from "../../../../classes";



//data


const chartCards = [
    {
        header: "Students",
        chart: <MyChart width={"100%"} height={"350"} />
    },
    {
        header: "Mentors/Teachers",
        chart: <MyChart width={"100%"} height={"350"} />
    },
]


const categories = [
    {
        title: "Data Science",
        value: "06"
    },
    {
        title: "Project Management",
        value: "01"
    },
    {
        title: "Cybersecurity & Assurance",
        value: "09"
    },
    {
        title: "Digital Marketing",
        value: "10"
    },
]


const rundown = [
    {
        color: "#FCC43E",
        type: "Expense",
        value: 1.245
    },
    {
        color: "#FB7D5B",
        type: "Income",
        value: 1.356
    },
]


const options = {
    chart: {
      id: "basic-bar"
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
    }
};

const series = [
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }
]


const communities = [
    {
        image: img,
        name: "Samantha William",
        message: "How do I create a profile",
        time: "12:45 PM",
        conversations: 18
    },
    {
        image: img,
        name: "Samantha William",
        message: "How do I create a profile",
        time: "12:45 PM",
        conversations: 18
    },
    {
        image: img,
        name: "Samantha William",
        message: "How do I create a profile",
        time: "12:45 PM",
        conversations: 18
    },
    {
        image: img,
        name: "Samantha William",
        message: "How do I create a profile",
        time: "12:45 PM",
        conversations: 18
    },
]


const Dashboard = () => {
    useEffect(() => {
        console.log("dashboard mounted")
        return () => console.log("dashbord unmounted")
    }, [])
    const {getItem} = useLocalStorage();
    const [chartData, setChartData] = useState({
        students: 0,
        teachers: 0,
        earnings: 0,
        courses: 0,
        categories: []
    })
    const flag = useRef(false);
    const [loading, setLoading] = useState(true);
    let userdata = getItem(KEY);
    const {adminFunctions: {fetchEarnings, fetchCourses, fetchCategories}, adminStudentFunctions: {fetch: fetchStudents}, adminTeacherFunctions: {fetch: fetchTeachers}} = useAuth();

    useEffect(() => {
        if(flag.current) return;
        (async() => {
            try{
                const res = await Promise.all([fetchTeachers(userdata?.token), fetchStudents(userdata?.token), fetchCourses(userdata?.token), fetchCategories(userdata?.token)]);
                console.log(res);
                const [teachers, students, courses, categories] = res;
                console.log({teachers, students, courses, categories});
                const {success, statusCode, message} = teachers;
                if(!success) throw new AdvancedError(message, statusCode);
                else {
                    //no error found
                    setChartData(old => {
                        return {
                            ...old,
                            earnings: 0,
                            teachers: teachers.data.length,
                            students: students.data.length,
                            courses: courses.data.length,
                            categories: categories.data
                        }
                    })
                    toast.success("Data fetched successfully", {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }catch(err){
                console.log(err.statusCode, err.message);
                if(err.statusCode === 2) err.message = "Session expired. Please login again";
                console.log(err.statusCode, err.message);
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }finally{setLoading(_ => false)}
        })()
        flag.current = true;
    }, [chartData])

    console.log(chartData);

    const headerCards = [
        {
            icon: <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.9716 33.8977H3.8634C2.03373 33.8977 0.550781 32.4147 0.550781 30.5851V21.3859C0.550781 19.7848 1.69584 18.4134 3.27044 18.1274C5.60473 17.7023 9.62956 16.9702 11.9064 16.5572C13.1597 16.3286 14.4428 16.3286 15.6961 16.5572C17.973 16.9702 21.9978 17.7023 24.3321 18.1274C25.9067 18.4134 27.0517 19.7848 27.0517 21.3859C27.0517 23.7942 27.0517 28.0078 27.0517 30.5851C27.0517 32.4147 25.5688 33.8977 23.7391 33.8977H11.9716ZM22.445 20.0288L22.4494 20.0344C22.6426 20.3237 22.6879 20.6869 22.572 21.0149L21.7924 23.2233C21.6908 23.5115 21.4733 23.7456 21.1928 23.8682L19.7264 24.5075L20.3094 25.6746C20.4729 26.0004 20.464 26.3858 20.2874 26.7049L17.518 31.6893H23.7391C24.3486 31.6893 24.8433 31.1946 24.8433 30.5851C24.8433 28.0078 24.8433 23.7942 24.8433 21.3859C24.8433 20.8526 24.4613 20.3954 23.9368 20.2994L22.445 20.0288ZM19.425 19.479L15.3008 18.7292C14.3092 18.5492 13.2933 18.5492 12.3017 18.7292L8.17753 19.479L7.29638 20.8007L7.73254 22.0352L9.82612 22.9473C10.1033 23.0687 10.3186 23.2984 10.4224 23.5833C10.5262 23.8682 10.5074 24.1829 10.3716 24.4534L9.52798 26.1406L12.6109 31.6893H14.9916L18.0745 26.1406L17.2309 24.4534C17.0951 24.1829 17.0763 23.8682 17.1801 23.5833C17.2839 23.2984 17.4992 23.0687 17.7764 22.9473L19.87 22.0352L20.3061 20.8007L19.425 19.479ZM5.15753 20.0288L3.66575 20.2994C3.14125 20.3954 2.75919 20.8526 2.75919 21.3859V30.5851C2.75919 31.1946 3.25388 31.6893 3.8634 31.6893H10.0845L7.31515 26.7049C7.13848 26.3858 7.12965 26.0004 7.29307 25.6746L7.87609 24.5075L6.4097 23.8682C6.12923 23.7456 5.9117 23.5115 5.81012 23.2233L5.03055 21.0149C4.9146 20.6869 4.95988 20.3237 5.15311 20.0344L5.15753 20.0288ZM21.5307 26.1682V28.3766C21.5307 28.9862 22.0254 29.4809 22.6349 29.4809C23.2444 29.4809 23.7391 28.9862 23.7391 28.3766V26.1682C23.7391 25.5587 23.2444 25.064 22.6349 25.064C22.0254 25.064 21.5307 25.5587 21.5307 26.1682ZM13.8013 0.771484C9.84047 0.771484 6.62392 3.98804 6.62392 7.94883C6.62392 11.9096 9.84047 15.1262 13.8013 15.1262C17.762 15.1262 20.9786 11.9096 20.9786 7.94883C20.9786 3.98804 17.762 0.771484 13.8013 0.771484ZM13.8013 2.9799C16.5441 2.9799 18.7702 5.20598 18.7702 7.94883C18.7702 10.6917 16.5441 12.9178 13.8013 12.9178C11.0584 12.9178 8.83233 10.6917 8.83233 7.94883C8.83233 5.20598 11.0584 2.9799 13.8013 2.9799Z" fill="white"/>
            </svg>,
            title: "Students",
            value: chartData.students,
            color: "#4D44B5"
        },
        {
            icon: <svg width="28" height="34" viewBox="0 0 28 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.758789 30.5851C0.758789 32.4147 2.24174 33.8977 4.07141 33.8977H23.9471C25.7768 33.8977 27.2597 32.4147 27.2597 30.5851C27.2597 28.0078 27.2597 23.7942 27.2597 21.3859C27.2597 19.7848 26.1147 18.4134 24.5401 18.1274C22.2058 17.7023 18.181 16.9702 15.9041 16.5572C14.6508 16.3286 13.3677 16.3286 12.1144 16.5572C9.83757 16.9702 5.81274 17.7023 3.47845 18.1274C1.90385 18.4134 0.758789 19.7848 0.758789 21.3859V30.5851ZM16.5578 18.9202L18.2152 25.2219C18.4327 26.049 18.1412 26.9268 17.4721 27.4613C16.9067 27.9118 16.0156 28.6229 15.3973 29.1176C14.5857 29.7646 13.4329 29.7646 12.6213 29.1176C12.0029 28.6229 11.1118 27.9118 10.5465 27.4613C9.87732 26.9268 9.58582 26.049 9.80335 25.2219L11.4608 18.9202L3.87375 20.2994C3.34926 20.3954 2.9672 20.8526 2.9672 21.3859V30.5851C2.9672 31.1946 3.46189 31.6893 4.07141 31.6893C8.69141 31.6893 19.3271 31.6893 23.9471 31.6893C24.5566 31.6893 25.0513 31.1946 25.0513 30.5851C25.0513 28.0078 25.0513 23.7942 25.0513 21.3859C25.0513 20.8526 24.6693 20.3954 24.1448 20.2994L16.5578 18.9202ZM14.1893 18.5967C14.0689 18.5934 13.9496 18.5934 13.8293 18.5967L11.9477 25.7542L13.9993 27.3906C14.0048 27.3961 14.0137 27.3961 14.0192 27.3906L16.0708 25.7542L14.1893 18.5967ZM14.0093 0.771484C10.0485 0.771484 6.83192 3.98804 6.83192 7.94883C6.83192 11.9096 10.0485 15.1262 14.0093 15.1262C17.9701 15.1262 21.1866 11.9096 21.1866 7.94883C21.1866 3.98804 17.9701 0.771484 14.0093 0.771484ZM14.0093 2.9799C16.7521 2.9799 18.9782 5.20598 18.9782 7.94883C18.9782 10.6917 16.7521 12.9178 14.0093 12.9178C11.2664 12.9178 9.04034 10.6917 9.04034 7.94883C9.04034 5.20598 11.2664 2.9799 14.0093 2.9799Z" fill="white"/>
            </svg>,
            title: "Mentors/Teachers",
            value: chartData.teachers,
            color: "#FB7D5B"
        },
        {
            icon: <svg width="32" height="34" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.69 18.653C27.8157 17.9738 25.7364 18.1248 23.9782 19.0661L21.1123 20.3554C20.8807 19.0354 19.8669 18.0435 18.6157 18.0054C18.6083 18.0052 14.3185 17.9568 14.3185 17.9568C10.8849 17.0149 8.65393 18.2252 7.38123 19.4179C7.12094 19.6618 6.89203 19.9129 6.69058 20.1606C6.34715 19.7907 5.74093 19.6919 5.29884 19.935L1.4048 22.0755C0.89974 22.3532 0.679984 22.9623 0.891804 23.4978L4.69741 33.1181C4.94748 33.7502 5.71598 34.0296 6.31562 33.6999L10.2097 31.5594C10.5747 31.3588 10.7896 30.9849 10.8014 30.5909H16.6132C17.5612 30.5909 18.4972 30.3419 19.3198 29.8708C19.3198 29.8708 30.2504 23.6007 30.3121 23.5447C31.8428 22.1521 31.89 19.4502 29.69 18.653C27.8157 17.9738 30.5676 18.971 29.69 18.653ZM6.35044 31.0692L3.39339 23.5939L5.26381 22.5658L8.22086 30.041L6.35044 31.0692ZM28.8495 21.776L18.1795 27.8863C17.7033 28.159 17.1616 28.3031 16.613 28.3031H9.99698L7.77556 22.6875C7.96586 22.2997 8.34067 21.6563 8.9494 21.0859C10.1961 19.9176 11.8393 19.6187 13.8338 20.1973C13.9335 20.2262 14.0367 20.2415 14.1405 20.2427L18.5502 20.2923C18.6628 20.302 18.8706 20.5523 18.8706 20.9318C18.8706 21.3224 18.656 21.5714 18.5438 21.5714H14.2111V23.8592H18.5438C19.0805 23.8592 19.58 23.6777 19.9958 23.3667L24.9571 21.135C24.9834 21.1231 25.0091 21.1104 25.0344 21.0966C26.2245 20.4495 27.6366 20.3426 28.9082 20.8034C29.4114 20.9859 29.0479 21.5745 28.8495 21.776ZM21.9644 16.8668C17.4201 16.8668 13.723 13.1694 13.723 8.62477C13.723 4.08019 17.42 0.382812 21.9644 0.382812C26.5088 0.382812 30.2058 4.08019 30.2058 8.62477C30.2058 13.1694 26.5087 16.8668 21.9644 16.8668ZM21.9644 2.67058C18.6836 2.67058 16.0145 5.3416 16.0145 8.62477C16.0145 11.9079 18.6837 14.579 21.9644 14.579C25.2453 14.579 27.9144 11.9079 27.9144 8.62477C27.9144 5.34167 25.2452 2.67058 21.9644 2.67058Z" fill="white"/>
            </svg>,
            title: "Earnings",
            value: new Intl.NumberFormat("en-us", {style: 'currency', currency: "USD"}).format(chartData.earnings).split(".")[0],
            color: "#FCC43E"
        },
    ]


    return (
        <Admin header="Dashboard">
            <ToastContainer />
            {loading && <Loader />}
            <div className={clsx.dashboard}>
                <div className={clsx.dashboard_header}>
                    {
                        headerCards.map(({icon, title, value, color}, i) => (
                            <HeaderCard value={value} icon={icon} title={title} color={color} key={i} />
                        ))
                    }
                </div>

                <div className={clsx.dashboard_second}>
                    {
                        chartCards.map(({header, chart}, i) => (
                            <ChartCard header={header} className={clsx.chart_card} chart={chart} key={i} />
                        ))
                    }
                </div>

                <div className={clsx.dashboard_third}>
                    <div className={clsx.dashboard_fees}>
                        <h3>Fees</h3>
                        <span>
                            August, 2021 &nbsp; <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.2098 2.13711L8.53462 9.5364C8.26309 9.85319 7.76527 9.85319 7.49374 9.5364L0.81854 2.13711C0.388612 1.66192 0.705401 0.892578 1.33898 0.892578L14.6894 0.892578C15.323 0.892578 15.6397 1.66192 15.2098 2.13711Z" fill="#4D44B5"/>
                                        </svg>
                        </span>
                        <h2>
                            {new Intl.NumberFormat("en-us", {style: "currency", currency: "USD"}).format(24630).split(".")[0]} <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.57267 16.1479V1.79785M6.57267 1.79785L1.35449 7.01603M6.57267 1.79785L11.7909 7.01603" stroke="#262424" stroke-width="2.60909" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </h2>
                        <p>Net revenue</p>
                    </div>

                    <div className={clsx.dashboard_categories}>
                        <h3>Categories</h3>
                        <ul className={clsx.categories}>
                            {
                                chartData.categories.map(({name, nicheItems}, i) => (
                                    <li key={i}>
                                        {name} <span>{nicheItems.length}</span>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className={clsx.dashboard_courses}>
                        <h3>No of courses created</h3>
                        <h2>{chartData.courses}</h2>
                        <p>Courses</p>
                    </div>
                </div>


                <div className={clsx.dashboard_fourth}>
                    <div className={clsx.fourth_top}>
                        <h3>Fees</h3>
                        <div className={clsx.rundowns}>
                            {
                                rundown.map(({type, color, value}, i) => (
                                    <Rundown type={type} color={color} value={value} key={i} />
                                ))
                            }
                            <select value="month">
                                <option value="month">Month</option>
                                <option value="year">Year</option>
                            </select>
                        </div>
                    </div>
                    <div className={clsx.main_chart}>
                    <Chart
                        options={options}
                        series={series}
                        type="line"
                        width="100%"
                        height="300px"
                    />
                    </div>
                </div>


                <div className={clsx.dashboard_fifth}>
                    <h3>Community</h3>
                    <div className={clsx.communities}>
                        {
                            communities.map(({image, name, message, time, conversations}, i) => (
                                <Community key={i} image={image} name={name} message={message} time={time} conversations={conversations} />
                            ))
                        }
                    </div>
                    <p>See all >></p>
                </div>
            </div>
        </Admin>
    )
}



export default Dashboard;
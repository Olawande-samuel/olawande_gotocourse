import {useEffect, useState} from "react";
import {MdEdit, MdPersonAdd} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";



import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/AuthContext";
import { useCookie } from "../../../hooks";
import {GuardedRoute} from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { UserInfoCard } from "../Admin";




export function Profile(){
    const {generalState: {isMobile, notification, userdata}} = useAuth();
    const navigate = useNavigate();
    function editProfileHandler(e){
        navigate("/students/profile/edit");
    }
    return (  
        <Students isMobile={isMobile} userdata={userdata} notification={notification}>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />              
            <div className={clsx.students_profile}>
                <div className={clsx.students_profile_top}>
                    <div className={clsx.students_profile_top_img}>
                        <img src={avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx.students_profile_top_button} onClick={editProfileHandler}>
                        <MdEdit />  &nbsp;   Edit
                    </button>
                </div>
                <div className={clsx.students_profile_main}>
                    <h1 className={clsx.students__header} style={{marginTop: 20}}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <p className={clsx.students__paragraph}>Enjoys writing and playing video games. <br />
                    I joined Gotocourse to make friends connect with people virtually
                    </p>

                </div>
            </div>
        </Students>
    )
}



export function Edit(){
    const {generalState: {isMobile, userdata}} = useAuth();
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        firstname: userdata?.firstName ?? "",
        lastname: userdata?.lastName ?? "",
        brief_intro: "",
        goals: ""
    })

    async function submitHandler(e){
        e.prevetDefault();
        setLoading(_ => true);
        try{
            if(formstate.firstname === "" || formstate.lastname === "" || formstate.brief_intro === "" || formstate.goals === "") throw new AdvancedError("All fields are required", 0);
            //submit updated profile
            setTimeout(() => {}, 2000);
        }catch(err){
            toast.error(err.message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }finally{
            setLoading(_ => false);
        }
    }


    function changeHandler(e){
        const {name, value} = e.target;
        console.log({name, value});
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    return (
        <Students>
          <div className={clsx.students_profile}>
            <div className={clsx.edit__profile}>
                <h2>Update Profile</h2>
                <div className={clsx.edit__picture}>
                    <span>
                        <MdPersonAdd />
                    </span>
                    <p>Upload Photo</p>
                </div>
                <form className="form" onSubmit={submitHandler}>
                    <Input
                        label="First name"
                        name="firstname"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.firstname}
                    />
                    <Input
                        label="Last name"
                        name="lastname"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.lastname}
                    />

                    <div className={clsx.form_group}>
                        <label htmlFor={"brief_intro"}>Brief Introduction</label>
                        <textarea rows="5" name="brief_intro" value={formstate.brief_intro} onChange={changeHandler}></textarea>
                    </div>

                    <div className={clsx.form_group}>
                        <label htmlFor={"goals"}>What are your goals</label>
                        <textarea rows="5" name="goals" value={formstate.goals} onChange={changeHandler}></textarea>
                    </div>

                    {loading ? (
                        <button className="button button-lg log_btn w-100">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        </button>
                    ) : (
                        <button
                        className="button button-lg log_btn w-100"
                        type="button"
                        >
                        Log in
                        </button>
                    )}

                </form>
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


export function Courses(){
    const {generalState: {isMobile, userdata}} = useAuth();
    const tableHeaders = ["No", "Courses", "Name", "Package", "Rating"]
    const tableContents = [
        {
            name: "Melanie Grutt",
            course: "Cybersecurity",
            package: "Cohort",
            rating: "Bronze",
        },
        {
            name: "Keira Danlop",
            course: "UI/UX",
            package: "Cohort",
            rating: "Silver",
        },
        {
            name: "Diop Grutt",
            course: "HTML",
            package: "One on One",
            rating: "Gold",
        },
        {
            name: "Diop Grutt",
            course: "Data Analytics",
            package: "Self paced",
            rating: "Diamond",
        },
    ]
    return ( 
        <Students isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.students_profile}>
                <table className={clsx.student_table}>
                    <thead>
                        {
                            tableHeaders.map((el, i) => (
                                <td key={i}>{el}</td>
                            ))
                        } 
                    </thead>
                    <tbody>
                        {
                            tableContents.map(({name, package: p, course, rating}, i) => (
                                <UserInfoCard key={i} name={name} num={i} comp={"Courses"} rating={rating}
                                pack={p} course={course} />
                            ))
                        }
                    </tbody>
                </table>
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
                <span style={{fontWeight: "400"}}>{time}</span>
            </div>
            <div className={clsx.classes_card_third}>
                <button className={isLive ? `${clsx['third_btn']} ${clsx['third_btn_live']}` : clsx.third_btn}>Live</button>
                <button className={clsx.third_btn}>Completed</button>
            </div>
        </div>
    )
}



const Students = ({children, isMobile, userdata, notification}) => {
    useEffect(() => {
        console.log("Students component is mounted")
        if(notification){
            toast.success(notification, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        // setGeneralState(old => {
        //     return {
        //         ...old,
        //         notification: null
        //     }
        // })
        return () => console.log("Students component is unmounted");
    }, [])



    return (
        <GuardedRoute>
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
        </GuardedRoute>
    )
}

import {useEffect, useState} from "react";
import {MdEdit, MdPersonAdd} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {motion} from "framer-motion"
import {AiOutlineMenu} from "react-icons/ai"

import Loader from "../../../components/Loader"
import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/Auth";
import {GuardedRoute} from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { UserInfoCard } from "../Admin";
import { useCookie } from "../../../hooks";

const KEY = "gotocourse-userdata"


export function Profile(){
    const {generalState: {isMobile, notification, userdata}, generalState,
    setGeneralState, 
    studentFunctions: {fetchProfile}} = useAuth();
    const {updateCookie, isCookie, saveCookie, fetchCookie} = useCookie();
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {
            setGeneralState(old => {
                return {
                    ...old, 
                    notification: null
                }
            })
        }, 5000)
    }, [])

    console.log(generalState);

    useEffect(() => {
        const token = fetchCookie(KEY)
        if(userdata){
            (async () => {
                try{
                    const res = await fetchProfile(token?.token);
                    const {success, message, statusCode} = res;
                    if(!success ) throw new AdvancedError(message, statusCode);
                    else {
                        const {data} = res;
                        console.log(data);
                        setGeneralState({...generalState, userdata:{...generalState.userdata, ...data},
                        });

                        const key = 'gotocourse-userdata';
                        if(isCookie(key)){
                            updateCookie(key, data);
                        }else {
                            saveCookie(key, data);
                        }
                    }
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
                }
            })()
        }
    }, [userdata?.token])
    function editProfileHandler(e){
        navigate("/students/profile/edit");
    }
    return (  
        <Students isMobile={isMobile} userdata={userdata} notification={notification}>            
            <div className={clsx.students_profile}>
                <div className={clsx.students_profile_top}>
                    <div className={clsx.students_profile_top_img}>
                        <img src={userdata?.profileImg ? userdata.profileImg : avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx.students_profile_top_button} onClick={editProfileHandler}>
                        <MdEdit />  &nbsp;   Edit
                    </button>
                </div>
                <div className={clsx.students_profile_main}>
                    <h1 className={clsx.students__header} style={{marginTop: 20}}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <p className={clsx.students__paragraph}>{userdata?.bio ? userdata?.bio : "I'm a mysterious person"} <br />
                    {userdata?.goals ? userdata?.goals : "I'm yet to decide what I want to achieve here"}
                    </p>

                </div>
            </div>
        </Students>
    )
}



export function Edit(){
    
    const navigate = useNavigate();
    const {updateCookie, fetchCookie, isCookie,saveCookie} = useCookie();
    const {generalState: {isMobile, userdata}, studentFunctions: {updateAvatar, fetchProfile, updateProfile}, setGeneralState} = useAuth();

    const [imageUrl, setImageUrl] = useState(null);
    const [isUplaoding, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        firstName: userdata?.firstName ?? "",
        lastName: userdata?.lastName ?? "",
        work: userdata?.work ??"",
        location:userdata?.location ?? "",
        category: userdata?.category ??"",
        bio:userdata?.bio ?? "",
        goals:userdata?.goals ?? ""
    })
 
    

    useEffect(() => {
            // to prevent data from disappearing on page reload
        const previousData = fetchCookie(KEY)
        setFormstate({...formstate, ...previousData})
        console.log("formstate",formstate)
        console.log("previous",previousData)
    }, [])

    async function submitHandler(e){
        console.log(e)
        e.preventDefault();
        setLoading(_ => true);
        try{
            if(formstate.firstname === "" || formstate.lastname === "" || formstate.bio === "" || formstate.goals === "" || formstate.occupation === "" || formstate.location === "" || formstate.category === "") throw new AdvancedError("All fields are required", 0);
            //submit updated profile
            const res = await updateProfile(formstate, userdata.token);
            console.log(res);
            const {success, statusCode, message} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                console.log(data);
                setGeneralState(old => {
                    return {
                        ...old,
                        userdata: data,
                        notification: message
                    }
                })
                navigate("/students/");
            }
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
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function uploadPicture(){
        let input = document.getElementById("imageUpload");
        input.click();
    }


    function changeImageHandler(e){
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        setImageUrl(_ => url);
        setFile(_ => file);
    }

    async function changeProfilePictureHandler(e){
        setIsUploading(_ => true);
        try{
            let formdata = new FormData();
            formdata.append('image', file, file.name);
            const res = await updateAvatar(formdata, userdata.token);
            const {success, message, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                const {profileImg} = data;
                console.log(data);
                //updated successfully
                setGeneralState(old => {
                    return {
                        ...old,
                        userdata: {
                            ...old.userdata,
                            profileImg
                        }
                    }
                })
                //set the cookie here
                if (isCookie(KEY)) {
                    updateCookie(KEY, data);
                  } else {
                    saveCookie(KEY, data);
                }
                  
                setImageUrl(_ => null);
                setFile(_ => null);
                toast.success(message, {
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
          setIsUploading(_ => false);
        }
    }


    return (
        <Students>  
          <div className={clsx.students_profile}>
            <div className={clsx.edit__profile}>
                <h2>Update Profile</h2>
                <div className={clsx.edit__picture}>
                    {userdata?.profileImg ? (<img src={imageUrl ?? userdata.profileImg} alt="Avatar" />) : !imageUrl ? (<span>
                        <MdPersonAdd />
                    </span>) : (<img src={imageUrl} alt="Avatar" />)}
                    <input id="imageUpload" type="file" style={{display: 'none'}} onChange={changeImageHandler} />
                    {imageUrl ? (<p style={{cursor: isUplaoding && 'not-allowed'}} onClick={changeProfilePictureHandler}>Change Picture</p>) : (<p onClick={uploadPicture}>Upload Photo</p>)}
                </div>
                <form className="form" onSubmit={submitHandler}>
                    <Input
                        label="First name"
                        name="firstName"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.firstName}
                    />
                    <Input
                        label="Last name"
                        name="lastName"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.lastName}
                    />
                    <Input
                        label="Occupation"
                        name="work"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.work}
                    />
                    <Input
                        label="Location"
                        name="location"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.location}
                    />
                    <Input
                        label="Category"
                        name="category"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.category}
                    />

                    <div className={clsx.form_group}>
                        <label htmlFor={"brief_intro"} className="form-label generic_label">Bio</label>
                        <textarea rows="5" name="bio"  className="form-control generic_input" value={formstate.bio} onChange={changeHandler}></textarea>
                    </div>

                    <div className={clsx.form_group}>
                        <label htmlFor={"goals"} className="form-label generic_label">What are your goals</label>
                        <textarea rows="5" name="goals" className="form-control generic_input" value={formstate.goals} onChange={changeHandler}></textarea>
                    </div>

                    {loading ? (
                        <button className="button button-md log_btn w-100 mt-3">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </button>
                    ) : (
                        <button
                        // type="submit"
                        className="button button-md log_btn w-100 mt-3"
                        type="submit"
                        >
                        Save
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
    const {generalState: {isMobile, userdata}, studentFunctions: {fetchCourses}} = useAuth();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        (async() => {
            try{
                const res = await fetchCourses(userdata?.token);
                console.log(res);
                const {success, message, statusCode} = res;
                if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
                else {
                    const {data} = res;
                    setCourses(_ => data);
                    toast.success(message, {
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
                toast.error(err.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })()
    }, [])
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

                {courses.length === 0 ?         
                               <NoDetail text="You haven't registered for any course" />

                :
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

        }
            </div>
        </Students>
    )
}
export function History(){
    const {generalState: {isMobile, userdata,},generalState, setGeneralState, studentFunctions: {fetchEnrollments}} = useAuth();
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        if(userdata){
            (async() => {
                setGeneralState({...generalState, loading: true})
                try{
                    const res = await fetchEnrollments(userdata?.token);
                    setGeneralState({...generalState, loading: false})
                    console.log(res);
                    const {success, message, statusCode} = res;
                    if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
                    else {
                        const {data} = res;
                        setCourses(_ => data);
                        toast.success(message, {
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
                    toast.error(err.message, {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            })()
        }
    }, [userdata])
    const tableHeaders = ["No", "Courses", "Status", "Date", "Amount"]
    const tableContents = [
        {
            status: "Approved",
            course: "Cybersecurity",
            date: "12/03/2022",
            amount: 3000,
        },
        {
            status: "Approved",
            course: "UI/UX",
            date: "12/03/2022",
            amount: 3000,
        },
        {
            status: "Approved",
            course: "HTML",
            date: "12/03/2022",
            amount: 3000,
        },
        {
            status: "Approved",
            course: "Data Analytics",
            date: "12/03/2022",
            amount: 3000,
        },
    ]
    return ( 
        <Students isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.students_profile}>
                
                {courses.length === 0 ? 
                
                <NoDetail text="Nothing to See here" />
                 :
                <table className={clsx.student_table}>
                    <thead>
                        <tr>
                            {
                                tableHeaders.map((el, i) => (
                                    <th key={i}>{el}</th>
                                    ))
                            } 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableContents.map(({status, date, package: p, course, amount}, i) => (
                                <UserInfoCard key={i} status={status} num={i} comp={"History"} date={date} amount={amount}
                                pack={p} course={course} />
                            ))
                        }
                    </tbody>
                </table>
                }
            
        </div>
        </Students>
    )
}
export function NoDetail({text}){
    return (
        <div className="h-100" style={{display:"grid", placeItems:"center"}}>
            <p className="text-center lead text-secondary">{text}</p> 
        </div>
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
    const {generalState: {showSidebar, loading}, generalState, setGeneralState} = useAuth();
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
        return () => console.log("Students component is unmounted");
    }, [])

    const toggleSidebar = ()=> {
        setGeneralState({...generalState, showSidebar: !showSidebar})
    }

    return (
        <GuardedRoute>
            <div className={clsx.students}>
            <ToastContainer />  
            <Sidebar isMobile={isMobile} />
            <div className={clsx.students_main}>
                <div className={`align-items-center ${clsx.students_topbar}`}>
                    <div className="d-md-none">
                        <i>
                            <AiOutlineMenu style={{fontSize:"24px", color:"#0C2191"}} onClick={toggleSidebar} />
                        </i>
                    </div>
                    <h1 className={clsx.students__header}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <Searchbar showIcon={true} placeholder="Search" />
                    <div className="button_wrapper text-center d-none d-lg-block">
                <motion.a 
                whileHover={{
                    // boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                    textShadow: "0px 0px 8px rgb(255, 255, 255)"
                }}
                href="https://gotocourse.com/dashboard" className="btn btn-primary" style={{padding:"10px 28px", background:"var(--secondary)", border:"1px solid var(--secondary)"}}>Go to Class</motion.a>
            </div>
                </div>

                {children}

            </div>
            {loading && 
            <Loader />
            }
            </div>
        </GuardedRoute>
    )
}

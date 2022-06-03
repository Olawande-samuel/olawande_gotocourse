import {useEffect, useState} from "react";
import {MdEdit, MdPersonAdd} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {AiOutlineMenu} from "react-icons/ai"


import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/AuthContext";
import {GuardedRoute} from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { UserInfoCard } from "../Admin";




export function Profile(){
    const {generalState: {isMobile, notification, userdata}, setGeneralState} = useAuth();
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
    })
    const info = [
        {
            title: "Brief Introduction",
            content: "Enjoys writing and playing video games"
        },
        {
            title: "Location",
            content: "Lagos, Nigeria"
        },
        {
            title: "Courses",
            content: "UX Designer"
        },
        {
            title: "Category",
            content: "Cybersecurity, UX, Data Analysis"
        },
    ]
    function editProfileHandler(e){
        navigate("/teachers/profile/edit");
    }
    return (  
        <Teachers isMobile={isMobile} userdata={userdata} notification={notification}>
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
            <div className={clsx.teachers_profile}>
                <div className={clsx.teachers_profile_top}>
                    <div className={clsx.teachers_profile_top_img}>
                        <img src={avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx.teachers_profile_top_button} onClick={editProfileHandler}>
                        <MdEdit />  &nbsp;   Edit
                    </button>
                </div>
                <div className={clsx.teachers_profile_main}>
                    <h1 className={clsx.teachers__header} style={{marginTop: 20}}>{userdata?.firstName} {userdata?.lastName}</h1>

                    <div className={clsx.teachers__profile_info}>
                        {
                            info.map(({title, content}, i) => (
                                <Info title={title} content={content} key={i} />
                            ))
                        }
                    </div>

                </div>
            </div>
        </Teachers>
    )
}

function Info({title, content}){
    return(
        <div className={clsx.teachers__info}>
            <span className={clsx.teachers__info_title}>{title}</span>
            <span className={clsx.teachers__info_content}>{content}</span>
        </div>
    )
}


export function CreateCourse(){
    const [formstate, setFormstate] = useState({
        name: "",
        brief: "",
        price: "",
        package: ""
    })
    const [loading, setLoading] = useState(false);
    const packages = [
        {
            value: "cohort",
            name: "Cohort"
        },
        {
            value: "self-paced",
            name: "Self paced"
        },
        {
            value: "one-one",
            name: "One-One Mentorship"
        },
    ]

    function changeHandler(e){
        const {name, value} = e.target;
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function submitHandler(e){
        e.preventDefault();
        setLoading(_ => true);
        try{
            if(formstate.name === "" || formstate.brief === "" || formstate.price === "" || formstate.package === "") throw new AdvancedError("All fields are required", 0);
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
    return (
        <Teachers>
          <div className={clsx.teachers_profile}>
            <div className={clsx.edit__profile}>
                <h2>Create a new course</h2>
                <form className="form" onSubmit={submitHandler}>
                    <Input
                        label="Name of course"
                        name="name"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.name}
                    />

                    <div className={clsx.form_group}>
                        <label htmlFor={"brief"}>Brief Description of course content</label>
                        <textarea rows="5" name="brief" value={formstate.brief} onChange={changeHandler}></textarea>
                    </div>


                    <div className={clsx.form_group}>
                        <label htmlFor={"package"}>Package</label>
                        <select rows="5" name="package" value={formstate.package} onChange={changeHandler}>
                            <option value="">Choose a package</option>
                            {
                                packages.map(({name, value}, i) => (<option value={value} key={i}>{name}</option>))
                            }
                        </select>
                    </div>



                    <Input
                        label="Price"
                        name="price"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.price}
                    />


                    {loading ? (
                        <button className="button button-lg log_btn w-100 mt-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        </button>
                    ) : (
                        <button
                        className="button button-lg log_btn w-100 mt-3"
                        type="submit"
                        >
                        Save
                        </button>
                    )}

                </form>
            </div>
          </div>
        </Teachers>
    )
}



export function Edit(){
    const {generalState: {isMobile, userdata}, teacherFunctions: {updateAvatar}} = useAuth();
    const [imageUrl, setImageUrl] = useState(null);
    const [isUplaoding, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    console.log(userdata);
    const [loading, setLoading] = useState(false);
    const [formstate, setFormstate] = useState({
        firstname: userdata?.firstName ?? "",
        lastname: userdata?.lastName ?? "",
        brief_intro: "",
        location: "",
        profession: "",
        category: ""
    })

    async function submitHandler(e){
        e.prevetDefault();
        setLoading(_ => true);
        try{
            if(formstate.firstname === "" || formstate.lastname === "" || formstate.brief_intro === "" || formstate.location === "" || formstate.profession === "") throw new AdvancedError("All fields are required", 0);
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
            console.log(res);
            const {success, message, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                //updated successfully
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
        <Teachers>
          <div className={clsx.teachers_profile}>
            <div className={clsx.edit__profile}>
                <h2>Update Profile</h2>
                <div className={clsx.edit__picture}>
                    {userdata?.profileImg ? (<img src={userdata.profileImg} alt="Avatar" />) : !imageUrl ? (<span>
                        <MdPersonAdd />
                    </span>) : (<img src={imageUrl} alt="Avatar" />)}
                    <input id="imageUpload" type="file" style={{display: 'none'}} onChange={changeImageHandler} />
                    {imageUrl ? (<p style={{cursor: isUplaoding && 'not-allowed'}} onClick={changeProfilePictureHandler}>Change Picture</p>) : (<p onClick={uploadPicture}>Upload Photo</p>)}
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

                    <Input
                        label="Location"
                        name="location"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.location}
                    />

                    <Input
                        label="Profession"
                        name="profession"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.profession}
                    />

                    <Input
                        label="Category"
                        name="category"
                        type="text"
                        handleChange={changeHandler}
                        value={formstate.category}
                    />

                    {loading ? (
                        <button className="button button-lg log_btn w-100 mt-3">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        </button>
                    ) : (
                        <button
                        className="button button-lg log_btn w-100 mt-3"
                        type="submit"
                        >
                        Save
                        </button>
                    )}

                </form>
            </div>
          </div>
        </Teachers>
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
        <Teachers isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.teachers_profile}>
                <div className={clsx.classes}>
                    {
                        data.map(({numberOfLessons, title, date, time, isLive, color}, i) => (
                            <ClassesCard numberOfLessons={numberOfLessons} key={i} title={title} 
                            date={date} time={time} isLive={isLive} color={color} />
                        ))
                    }
                </div>
            </div>
        </Teachers>
    )
}


export function Courses(){
    const {generalState: {isMobile, userdata}} = useAuth();
    const navigate = useNavigate();
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

    function createCourseHandler(e){
        navigate('create');
    }
    return ( 
        <Teachers isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.teachers_profile}>
                <button
                className="button button-md log_btn w-30 mb-5"
                type="button"
                onClick={createCourseHandler}
                >
                Create Course
                </button>
                <table className={clsx.teachers_table}>
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
        </Teachers>
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


const Teachers = ({children, isMobile, userdata, notification}) => {
    const {generalState: {showSidebar}, generalState, setGeneralState} = useAuth();
    useEffect(() => {
        console.log("Teachers component is mounted")
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
        return () => console.log("Teachers component is unmounted");
    }, [])

    const toggleSidebar = ()=> {
        setGeneralState({...generalState, showSidebar: !showSidebar})
    }

    return (
        <GuardedRoute>
            <div className={clsx.teachers}>
            <Sidebar isMobile={isMobile} />
            <div className={clsx.teachers_main}>
                <div className={`align-items-center ${clsx.teachers_topbar}`}>
                <div className="d-md-none">
                        <i>
                            <AiOutlineMenu style={{fontSize:"24px", color:"#0C2191"}} onClick={toggleSidebar} />
                        </i>
                    </div>
                    <h1 className={clsx.teachers__header}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <Searchbar showIcon={true} placeholder="Search" />
                </div>

                {children}

            </div>
            </div>
        </GuardedRoute>
    )
}

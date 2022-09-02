import {useEffect, useState, useRef} from "react";
import {MdEdit, MdPersonAdd} from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {motion} from "framer-motion"
import {AiOutlineMenu} from "react-icons/ai"
import {FaGraduationCap} from "react-icons/fa"
import {BsQuestionCircle, BsDownload} from "react-icons/bs"
import {Rating} from 'react-simple-star-rating'
import {useMutation, useQuery} from "@tanstack/react-query"

import trello from "../../../images/trello.png"
import {Product, Stu1,Stu2, Stu3} from "../../../images/components/svgs"
import Loader from "../../../components/Loader"
import { Sidebar, Searchbar, Navbar } from "../components";
import clsx from "./styles.module.css";
import { colors, getDate } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/Auth";
import {GuardedRoute} from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { BootcampRow, UserInfoCard } from "../Admin";
import { useLocalStorage } from "../../../hooks";
import { FaRegTrashAlt, FaUserAlt } from "react-icons/fa";
import {SiGoogleclassroom } from "react-icons/si";
import { IoMdChatboxes } from "react-icons/io";
import { Box, Modal } from "@mui/material";

import ChatComponent from "../Admin/Chat";

import LogoutButton from "../../../components/LogoutButton";



const KEY = 'gotocourse-userdata';


export function Profile(){
    const {generalState: {isMobile, notification,loading}, setGeneralState, studentFunctions: {fetchProfile}} = useAuth();

    const ref = useRef(false)
    const {updateItem, getItem} = useLocalStorage();
    let userdata = getItem(KEY);
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


    useEffect(() => {
        if(ref.current) return
        if(userdata){
            const token = userdata.token;
            (async () => {
                try{
                    const res = await fetchProfile(token);
                    const {success, message, statusCode} = res;
                    if(!success ) throw new AdvancedError(message, statusCode);
                    else {
                        const {data} = res;
                        const newValue = {
                            ...userdata,
                            ...data
                        }
                        userdata = updateItem(KEY, newValue);
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

        ref.current = true
    }, [userdata?.token])
    
    function editProfileHandler(e){
        navigate("/student/profile/edit");
    }
    return (  
        <Students isMobile={isMobile} userdata={userdata} notification={notification} header="Profile">            
            <div className={clsx.students_profile}>
                <div className={clsx.students_profile_top} style={{background:"unset"}}>
                    <div className={clsx.students_profile_top_img}>
                        <img src={userdata?.profileImg ? userdata.profileImg : avatar} style={{borderRadius: 10}} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx.students_profile_top_button} onClick={editProfileHandler}>
                        <MdEdit />  &nbsp;   <span className="d-none d-md-block">Edit</span>
                    </button>
                </div>
                <div className={clsx.students_profile_main}>
                    {/* <span className="text-muted">Name:</span> */}
                    <h1 className={clsx.students__header} style={{marginTop: 20}}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <span className="text-muted">Experience:</span>
                    <p>{userdata?.bio ? userdata?.bio : "I'm a purposeful person"} </p>
                    <span className="text-muted">Bio:</span>
                    <p>{userdata?.goals ? userdata?.goals : "I'm here to achieve great things in tech"}</p>

                </div>
            </div>
        </Students>
    )
}



export function Edit(){
    const navigate = useNavigate();
    const {updateItem, getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const {generalState: {}, studentFunctions: {updateAvatar, fetchProfile, updateProfile}, setGeneralState} = useAuth();

    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
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
        // setFormstate({...formstate, ...userdata})
    }, [])

    async function submitHandler(e){
        e.preventDefault();
        setLoading(_ => true);
        try{
            if(formstate.firstName === "" || formstate.lastName === "" || formstate.bio === "" || formstate.goals === "" || formstate.work === "" || formstate.location === "" || formstate.category === "") throw new AdvancedError("All fields are required", 0);
            //submit updated profile
            const res = await updateProfile(formstate, userdata.token);
            const {success, statusCode, message} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                const newValue = {
                    ...userdata,
                    ...data
                };
                userdata = updateItem(KEY, newValue);
                setGeneralState(old => {
                    return {
                        ...old,
                        notification: message
                    }
                })
                navigate("/student/");
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
                //updated successfully
                //set the localStorage here
                const newValue = {
                    ...userdata,
                    profileImg
                }
                userdata = updateItem(KEY, newValue);
                  
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
        <Students header="Edit Profile">  
          <div className={clsx.students_profile}>
            <div className={clsx.edit__profile}>
                <h2>Update Profile</h2>
                <div className={clsx.edit__picture}>
                    {userdata?.profileImg ? (<img src={imageUrl ?? userdata.profileImg} alt="Avatar" />) : !imageUrl ? (<span>
                        <MdPersonAdd />
                    </span>) : (<img src={imageUrl} alt="Avatar" />)}
                    <input id="imageUpload" type="file" style={{display: 'none'}} onChange={changeImageHandler} />
                    {imageUrl ?
                        isUploading ? 
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                         : 
                        <p style={{cursor: isUploading && 'not-allowed', color: "var(--theme-orange", fontWeight:"700"}} onClick={changeProfilePictureHandler}>Click to Upload Photo</p>
                    
                    : (<p onClick={uploadPicture} >Select a photo to upload</p>)
                    }
                </div>
                <div className={clsx.edit__picture}>
                    <button className="button button-md" type="button" onClick={()=>{
                        navigate("/change-password")
                    }}>Change Password</button>
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

export function Bootcamps() {
    const {studentFunctions: { fetchBootcamps} } = useAuth();

    const navigate = useNavigate();
    const {getItem} = useLocalStorage();
    const flag = useRef(false);
    let userdata = getItem(KEY);
    const [courseList, setCourseList] = useState([])
    const [loading, setLoading] = useState(true);
  
    const tableHeaders = [ "No", "Title", "Tutor", "Date", "Time" ];
  
    useEffect(()=>{
        if(flag.current) return;
        (async () => {
          try {
            const res = await fetchBootcamps(userdata?.token);
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else if (statusCode === 1) {
              const { data } = res;
              if(data.length > 0){
    
                setCourseList(data);
                toast.success(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            } else {

                toast.error("No bootcamp found", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            }
            
            } else {
              throw new AdvancedError(message, statusCode);
            }
          } catch (err) {
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
        })()
        flag.current = true;
    },[])
  
    console.log({courseList})
    function gotoCreateCourseHandler(e){
      navigate("create");
    }
    function detailHandler(e, _id){
        // navigate("/bootcamps/details/"+_id);
        console.log("clicked")
      }
    return (
      <Students header={"Bootcamps"}>
        {loading && <Loader />}
        <div className={clsx["students_profile"]}>
          <div className={clsx.admin__student}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 style={{margin: 0}}>Bootcamps</h3>  
            </div>
            <div className={clsx.admin__student_main}>
                {courseList.length > 0 ? (
                    <table className={clsx.admin__student_table}>
                <thead>
                  {tableHeaders.map((el, i) => (
                    <th key={i}>{el}</th>
                  ))}
                </thead>
                <tbody>
                  {courseList.map(
                    ( {bootcampName, duration, tutorName, type, startTime, endTime, endDate, startDate, bootcampId, _id}, i ) => (
                      <BootcampRow
                      key={i}
                      index={i}
                      title={bootcampName}
                      detail={tutorName}
                    //   duration={duration}
                    //   type={type}
                      admin={false}
                      clickHandler={e => detailHandler(e, bootcampId)}
                      type={`${startTime} - ${endTime} CST`}
                      duration={`${getDate(startDate)} - ${getDate(endDate)}`}
                      />
                    )
                  )}
                  <p>
                  </p>
                </tbody>
                </table>
                ):( <p className="lead">No bootcamps found</p>)
                }
              
            </div>
          </div>
        </div>
      </Students>
    );
  }

export function Classes(){
    const {generalState: {isMobile}} = useAuth();
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
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
        <Students isMobile={isMobile} userdata={userdata} header="Classes">               
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
export function Wishlist(){
    const {generalState: {isMobile, loading}, setGeneralState, generalState, studentFunctions:{fetchWishlist}} = useAuth();
    const [wishlists, setWishlists]= useState([])

    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);

    const flag = useRef(false);
    async function getWishList(){
        try {
            setGeneralState({...generalState, loading: true})
            const res = await fetchWishlist(userdata?.token);
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else if (statusCode === 1) {
              const { data } = res;
              if(data.length > 0){
                setWishlists(data);
                toast.success(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            }else{
              toast.error("wishlist is empty", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setWishlists([])
            }
            
            } else {
              throw new AdvancedError(message, statusCode);
            }
          } catch (err) {
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
            setGeneralState({...generalState, loading: false});
          }
    }
     useEffect(()=>{
        if(flag.current) return;
        getWishList()
        flag.current = true;
    },[])
    return ( 
        <Students isMobile={isMobile} userdata={userdata} header="Wishlist">               
            <div className={clsx.students_profile}>
                <header className="mb-4">
                    <h3>My wishlist</h3>
                </header>
                <div className={clsx.classes}>
                    <div className={clsx.students_wishlist}>
                        {wishlists.length > 0 ? wishlists.map((item, index)=>(
                            <WishCard key={index} {...item} refetch={getWishList} />
                        )) : 
                        <p className="text-center mx-auto">Nothing to see here</p>
                        }
                    </div>
                </div>
            </div>
        </Students>
    )
}

function WishCard({courseId:id, courseName, courseDescription, courseCategory, refetch}){
    const navigate = useNavigate();
    const [open, setOpen]= useState(false);

    function closeModal(){
        setOpen(false)
        refetch()
    }
    function handleNavigate(category, name){
        localStorage.setItem("gotocourse-courseId", id)
        let courseCategory = category.split(" ").join("-")
        let courseName = name.split(" ").join("-")
        navigate(`/categories/${courseCategory}/courses/${courseName}`)
    }
    return(
        <div className="card wish">
            <div className="card-body wish-card-body">
                <div style={{width:"50px", height:"50px", borderRadius:"50%"}}>
                    <img src={trello} alt="icon" className="img-fluid" />
                </div>
            <h5 className="fw-bold">{courseName}</h5>
            <p className="restricted_line">{courseDescription}</p> 
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" onClick={()=>handleNavigate(courseCategory, courseName)} style={{border:"1px solid var(--theme-blue)", color:"var(--theme-blue)", fontWeight:"bold", padding:"0.5rem 1rem"}}>Register today</button>
                <button className="btn btn-outline-primary" onClick={()=>setOpen(true)} style={{border:"1px solid var(--theme-orange)", color:"var(--theme-orange)", fontWeight:"bold", padding:"0.5rem 1rem"}}>
                    <i><FaRegTrashAlt /></i>
                </button>
            </div>
            </div>
            <DeleteModal open={open} handleClose={closeModal} id={id} />
        </div>
    )
}

function DeleteModal({id,open,handleClose}){
    const {generalState: {isMobile, loading}, setGeneralState, generalState, studentFunctions:{deleteFromWishlist}} = useAuth();

    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: 600,
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: "10px",
        boxShadow: 24,
        p: 6,
        padding: "4rem 2rem",
    };

    async  function removeCourse(e){
        e.preventDefault();
        try{
            setGeneralState({...generalState, loading: true});
            const res =  await deleteFromWishlist(userdata?.token, id)
            const {success, message, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                handleClose()
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
        }finally {
            setGeneralState({...generalState, loading: false});
        }
    }
    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box style={style}>
                <h4 className="text-center mb-4">Delete From WishList ?</h4>
                {loading ? 
                <div className="text-center">
                    <div className="spinner-border text-primary">
                        <div className="visually-hidden">Loading</div>    
                    </div>   
                </div>
                    :
                <div className="d-flex justify-content-around">
                    <button className="btn btn-outline-primary" onClick={handleClose}  style={{border:"1px solid var(--theme-blue)", color:"var(--theme-blue)", fontWeight:"bold", padding:"0.5rem 1rem"}}>Cancel</button>
                    <button className="btn btn-outline-primary" onClick={removeCourse} style={{border:"1px solid var(--theme-orange)", color:"var(--theme-orange)", fontWeight:"bold", padding:"0.5rem 1rem"}}>Yes</button>
                </div>
                }
            </Box>
        </Modal>

    )
}

export function Courses(){
    const {generalState: {isMobile, loading}, generalState, setGeneralState, studentFunctions: {fetchCourses}} = useAuth();
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const [courses, setCourses] = useState([]);

    const ref = useRef(false)
    useEffect(() => {
        if(ref.current) return
        (async() => {
            try{
                setGeneralState({...generalState, loading: true})
                const res = await fetchCourses(userdata?.token);
                const {success, message, statusCode} = res;
                setGeneralState({...generalState, loading: false})
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
                setGeneralState({...generalState, loading: false})
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

        ref.current = true
    }, [])
    

    const [rating, setRating] = useState(0) // initial rating value

 
    return ( 
        <Students isMobile={isMobile} userdata={userdata} header="Courses">               
            <div className={clsx.students_profile}>
                <CourseTable courses={courses}  />
            </div>
        </Students>
    )
}



function CourseTable({courses=[], type}){
    const {getItem} = useLocalStorage();

    
    const [rating, setRating] = useState(0) // initial rating value

    const tableHeaders = type !== "dashboard" ? ["No", "Courses",  "Teaching Model", "Course Fee($)"] : ["No", "Courses",  "Course Fee($)", "Action"]
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
      }


       
    return(
        <>
            {
                courses.length === 0 ?          
                    <NoDetail text="You haven't registered for any course" />

                :
                <table className={`${clsx.student_table}`}>
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
                            courses.length > 0 && courses.map(({courseName,coursePrice, package: p, course, rating}, i) => (
                                <UserInfoCard
                                 key={i} 
                                 enrolled={courseName} 
                                 date={p} 
                                 coursePrice={coursePrice} 
                                 num={i} 
                                 handleRating={()=>handleRating("courseID")}  />
                            )) 
                        }
                    </tbody>
                </table>
            }
        </>
    )
}
export function History(){
    const {generalState: {isMobile},generalState, setGeneralState, studentFunctions: {fetchEnrollments}} = useAuth();
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const [courses, setCourses] = useState([]);
    const ref = useRef(false)
    useEffect(() => {
        if(ref.current) return
        if(userdata){
            (async() => {
                setGeneralState({...generalState, loading: true})
                try{
                    const res = await fetchEnrollments(userdata?.token);
                    setGeneralState({...generalState, loading: false})
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

        ref.current = true
    }, [])

    
    const tableHeaders = ["No", "Courses", "Status", "Date", "Course Price","Amount Paid"]
    const tableContents = courses.length > 0 ? courses : []
    return ( 
        <Students isMobile={isMobile} userdata={userdata} header="History">               
            <div className={clsx.students_profile}>
                 {
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
                            tableContents.map(({status, date, package: p, coursePrice, amountPaid, courseName, amount}, i) => (
                                <UserInfoCard key={i} status={status} num={i} comp={"History"} date={date} amount={amount}
                                pack={`$ ${amountPaid}`} course={courseName} coursePrice={`$ ${coursePrice}`} />
                            ))
                        }
                    </tbody>
                </table>
                }
            
        </div>
        </Students>
    )
}
export function Fees(){
    const {generalState: {isMobile},generalState, setGeneralState, studentFunctions: {fetchFees}} = useAuth();
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const [fees, setFees] = useState([]);
    const ref = useRef(false)
    useEffect(() => {
        if(ref.current) return
        if(userdata){
            (async() => {
                setGeneralState({...generalState, loading: true})
                try{
                    const res = await fetchFees(userdata?.token);
                    setGeneralState({...generalState, loading: false})
                    const {success, message, statusCode} = res;
                    if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
                    else {
                        const {data} = res;
                        setFees(_ => data);
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

        ref.current = true
    }, [])

    console.log({fees})
    
    const tableHeaders = ["No", "Type", "Date Initialted", "Due Date", "Status"]
    const tableContents = fees.length > 0 ? fees : []
    return ( 
        <Students isMobile={isMobile} userdata={userdata} header="Fees">               
            <div className={clsx.students_profile}>
                
                {/* {courses.length === 0 ? 
                
                <NoDetail text="Nothing to See here" />
                 : */}
                 {
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
                            tableContents.map(({type,createdAt, dueDate, status, amount}, i) => (
                                <UserInfoCard key={i} enrolled={type} coursePrice={new Date(dueDate).toLocaleDateString()} date={new Date(createdAt).toLocaleDateString()} type={status} num={i} amount={amount} />
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

export function Chat() {
    const {getItem} = useLocalStorage()
    const [loader, setLoader] = useState(true);
    let userdata = getItem(KEY);

    useEffect(() => {
      setTimeout(() => {
        setLoader(_ => false);
      }, 2000)
    }, [])
  
    const [tabs, setTabs] = useState([
        {
          active: true,
          name: "New Messages",
        },
        // {
        //   active: false,
        //   name: "Admin",
        // },
        {
          active: false,
          name: "Teachers",
        },
      ]);
    
      const chatType = [
        {
          id: 1,
          type: "New Messages",
        },
        // {
        //   id: 2,
        //   type: "Others",
        // },
        {
          id: 4,
          type: "Teachers",
        },
      ];
    return (
        <Students  userdata={userdata} header="Chat">
        {loader && <Loader />}
        <ChatComponent tabs={tabs} chatType={chatType} usertype="student" />
        </Students>
    );
  }
  
export const Dashboard = () => {
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const {generalState: {isMobile}, studentFunctions: {fetchCourses, fetchWishlist}, otherFunctions:{fetchCourses:fetchAllCourses}} = useAuth();
        
    const navigate = useNavigate();
    
    const [loader, setLoading]= useState(false)
    
    const {  data:wishlistData, isSuccess:wishlistIsSuccess } = useQuery(["fetch wishes"], ()=>fetchWishlist(userdata?.token))
    const {  data, isSuccess } = useQuery(["fetch courses"], ()=>fetchCourses(userdata?.token))
    const {  data:allCourses } = useQuery(["fetch all courses"], ()=>fetchAllCourses())

    console.log({wishlistData})
    console.log({data})
    
    const topContent = [
        {
            id:1,
            title:"Courses enrolled for",
            logo: <Stu1 />,
            value: data?.data?.length ?? 0
        },
        {
            id:2,
            title:"Courses on wishlist",
            logo: <Stu2 />,
            value: wishlistData?.data?.length ?? 0
        },
        {
            id:3,
            title:"Outstanding fees",
            logo: <Stu3 />,
            value: "$0"
        }
    ]
    const tableHeaders = ["No", "Courses",  "Course Fee($)", ""]

    if(wishlistIsSuccess){
       topContent[1].value = wishlistData?.data?.length
    }
    if(isSuccess){
       topContent[0].value = data?.data?.length
    }
console.log(allCourses)
   
    return (
        <Students isMobile={isMobile} userdata={userdata} header={"Dashboard"} >            
        <div className={clsx.students_profile}>
            <DashboardTop content={topContent} />

            <div className={clsx.students_profile_main}>
                <AvailableCourses data={allCourses?.data ? allCourses?.data : []} />
                <div className={`d-flex flex-wrap ${clsx.dashboard_courses}`}>
                    <div className={clsx["dashboard_courses--right"]}>
                        <h6>Courses on wishlist</h6>
                        <ul>
                            {
                                wishlistData?.data?.length === 0 ?  
                                <p className="text-muted">No item in wishlist</p>
                                :
                                wishlistData?.data?.map((item, i)=>(
                                    <li key={i}>{item.name}</li>
                                ))
                            }
                            
                        </ul>
                    </div>
                </div>
              </div>
              <div className={`${clsx.dashboard_course_details}`}>
                <div className="d-flex justify-content-between align-items-center">
                    <h6>Courses paid for</h6>
                </div>
                    {/* <CourseTable courses={data?.data} type="dashboard" /> */}
                        {
                        data?.data?.length > 0 ? 
                    <div className="table-responsive">
                        <table className="table table-borderless w-auto">
                            <thead>
                                <tr>
                                    {tableHeaders.map((item, i)=>(
                                        <th scope="col" key={i} style={{minWidth: item !== "No" ? "150px": "60px" }} >{item}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data?.data.map((item, i)=>(
                                <tr key={i}>
                                    <td><span>{i + 1}</span></td>
                                    <td>
                                        <span>{item.courseName}</span>
                                    </td>
                                    <td><span>{item.coursePrice}</span></td>
                                    <td>
                                        <span className="d-block dashboard_table">
                                        <GotoDashboard loader={loader} setLoading={setLoading} />
                                        </span>
                                    </td>
                                </tr>

                                ))}
                            </tbody>
                        </table>
                    </div> : <NoDetail text="You haven't registered for any course" />

                        }
              </div>

              <Community />
        </div>
    </Students>
    )
   
}

function AvailableCourses({data}){
    const navigate = useNavigate()
    const tableHeader = ["Courses", "Start Date", "Program Fee", ""]
    
    const tableData = [
        {
            id: 1,
            courseName:"Data science",
            startDate:"Aug 30",
            fee:"20"
        }
    ]

    function handleCourseSelect(e, item){  
        e.preventDefault()      
        const courseInfo = item
        localStorage.setItem("gotocourse-courseInfo", JSON.stringify(courseInfo))
        localStorage.setItem("gotocourse-courseId", courseInfo.courseId)
        navigate(`/categories/${courseInfo.category?.split(" ").join("-")}/courses/${courseInfo.name.split(" ").join("-")}}`)
    }
    return (
        <div className={` ${clsx.dashboard_courses}`}>
            <div className={clsx["dashboard_courses--left"]}>
                <h6 style={{marginBottom:".5rem"}}>Available Classes</h6>
                <small className="mb-4 d-block">Select and enroll to a course to get started</small>
                
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                {
                                    tableHeader.map(title=>(
                                        <th>{title}</th>
                                    ))
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data?.length > 0 && data.map((item, i)=>(
                                    <tr key={i}>
                                        <td>
                                            <span>{item.name}</span>
                                        </td>
                                        <td><span>{item.startDate && getDate(item.startDate)}</span></td>
                                        <td>
                                            <span>$ {item.packages[0]?.price}</span>
                                        </td>
                                        <td>
                                            <div className={clsx.classes_button}>
                                                <button className="d-flex align-items-center" onClick={(e)=>handleCourseSelect(e, item)}> 
                                                    <i><BsQuestionCircle /></i>
                                                    <span>Learn more</span>
                                                </button>
                                                <button className="d-flex align-items-center" onClick={(e)=>handleCourseSelect(e, item)}>
                                                    <i><BsDownload /></i>
                                                    <span>Enroll</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}


export function Community(){
    return(
        <div className={clsx.dashboard_community}>
                <h6>Community</h6>
                {[1,2, 3].map(item=>(
                    <div className={clsx.dashboard_community_profile}>
                        <div className={clsx.profile_img}>
                            <FaUserAlt size="2rem" color="grey" />
                        </div>
                        <div className={clsx.profile_info}>
                            <p>Samantha William</p>
                            <p>How do I create a profile</p>
                        </div>
                        <div className={clsx.profile_chat}>
                            <span className={clsx.chat_time}>Time</span>
                            <div className={clsx.profile_chat_icon}>
                                <span className={clsx.chat_icon}><IoMdChatboxes size="1.2rem"  /></span>
                                <span className={clsx.chat_icon}>(5)</span>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
    )
}

export function DashboardTop({content}){
    return(
        <div className={clsx.students_profile_top}>
            <div className={` ${clsx.students_overview} d-flex justify-content-around align-items-center w-100`}>
            { 
                content.map(item=>(
                    <div className={`d-flex ${clsx.students_overview_container}`} key={item.id}>
                        <div className={clsx["students_profile_top--left"]}>
                            <i className={clsx.icon}>
                                {item.logo}
                            </i>
                        </div>
                        <div className={clsx["students_profile_top--right"]}>
                            <h3>{item.value}</h3>
                            <p>{item.title}</p>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}



export const Students = ({children, isMobile, notification, userdata, header}) => {
    const location = useLocation();
    const [pledredata, setPledreData]= useState({})
    const {generalState: {showSidebar, loading, pledre}, generalState, setGeneralState, otherFunctions:{fetchCourses}, adminFunctions: {getUnreadMessages}} = useAuth();
    const [loader, setLoading] = useState(false)
    const route = location.pathname.split("/")[1];

    const { getItem }= useLocalStorage()

    useEffect(() => {
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

    const {isLoading, data} = useQuery(["get courses"], ()=> fetchCourses())

    const user = getItem("gotocourse-userdata")
   
    useEffect(()=>{
        let isActive = true
        if(!pledredata?.email && pledre.getStudentDetails){
            (async()=>{
                try{
                    const response = await pledre.getStudentDetails(user?.email)
                    if(isActive){
                        if(response?.email){
                            setPledreData(() => response)
                            console.log(response)
                            localStorage.setItem("gotocourse-userdata", JSON.stringify({...user, pledre: response}))
                        }
                    }

                }catch(err){
                    console.error(err.message)
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
                    console.log("pData done")
                }
            })()
        }

        return ()=>{
            isActive = false
        }
    },[pledre.baseUrl])


const student = {
    title: "STUDENT",
    logo: <FaGraduationCap size="2.5rem" color="#0C2191" />
}
    
// fetch messages
const getMessage = useQuery(["fetch student messages"], ()=>getUnreadMessages(user.token), {
    onError: (err)=> {
      toast.error(err.message,  {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    },
    onSuccess: (res)=>{
      if(res.data?.statusCode === 2 ){
        localStorage.clear()
      }
      if(res.data?.statusCode !== 1){
        toast.error(res.data?.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
  
      const unread = res.data.data?.filter((messages)=>messages.status === "unread")
      if(unread.length > 0){
        toast.info(`You have ${unread.length} messages `,  {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }
    }
  })

    return (
        <GuardedRoute>

            <div className={clsx.students}>
            <ToastContainer 
             position="top-right"
             autoClose={3600}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
            
            />  
            <Sidebar isMobile={isMobile} />
            <div className={clsx.students_main}>
               <Navbar toggleSidebar={toggleSidebar} header={header} content={student}  />

                {children}

            </div>
            {loading && 
            <Loader />
            }
            </div>
        </GuardedRoute>
    )
}

export function GotoDashboard({loader, setLoading}){
    const {getItem} = useLocalStorage();
    const {generalState} = useAuth();
    const location = useLocation()
    const route = location.pathname.split("/")[1];

    async function gotodashboard(){
        const data = getItem("gotocourse-userdata")

        // console.log(data)
        // if(data.userType === "student" || data.userType === 'admin'){
        //     if(generalState.pledre.loginUser){
        //         setLoading(true)
        //         try{
        //             const response = await generalState.pledre.loginUser({
        //                 user_id: data.pledre._id,
        //                 user_type: "student"
        //             })

        //             console.log(response)
        //         } catch(err){
        //             console.error(err)
        //         }finally{
        //             console.log("done!!!")
        //             setLoading(false)
        //         }
        //     }
        // } else if(data.pledre?.deleted === false && data.accessPledre){
        //     if(generalState.pledre.loginUser){
        //         setLoading(true)
        //         try{
        //             const response = await generalState.pledre.loginUser({
        //                 user_id: data.pledre._id,
        //                 user_type: route
        //             })

        //             console.log(response)
        //         } catch(err){
        //             console.error(err)
        //         }finally{
        //             console.log("done!!!")
        //             setLoading(false)
        //         }
            // }
        // } 
        // else {
        //     throw new AdvancedError("User not authorized")
        // }
    }  
    return(
        <>
         <i className="d-lg-none">
                        <SiGoogleclassroom size="1.5rem"  color="#0C2191" />
                    </i>
            <motion.button
                whileHover={{
                    // boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                    textShadow: "0px 0px 8px rgb(255, 255, 255)"
                }}
                className="dashboard_access_button d-flex justify-content-center align-items-center mb-0 text-white d-none d-lg-flex" 
                style={{ padding:"10px 20px", borderRadius:"10px", background:"var(--secondary)", border:"1px solid var(--secondary)", fontSize:"14px", minWidth:"150px", }}
                onClick={gotodashboard}
                disable={true}
            >
                {loader ? <span className="spinner-border text-light">
                    <span className="visually-hidden">loading</span>
                    </span>
                    :
                    <>
                    <i className="me-1">
                        <SiGoogleclassroom size="1.5rem" />
                    </i>
                    <span className="d-none d-md-block">Go to Class</span>
                    </>
                }
            </motion.button>
        </>
    )
}
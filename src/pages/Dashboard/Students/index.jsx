import {useEffect, useState, useRef} from "react";
import {MdEdit, MdPersonAdd} from "react-icons/md"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {motion} from "framer-motion"
import {AiOutlineMenu} from "react-icons/ai"
import {Rating} from 'react-simple-star-rating'


import trello from "../../../images/trello.png"
import {Product} from "../../../images/components/svgs"
import Loader from "../../../components/Loader"
import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { useAuth } from "../../../contexts/Auth";
import {GuardedRoute} from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { BootcampRow, UserInfoCard } from "../Admin";
import { useLocalStorage } from "../../../hooks";
import { FaRegTrashAlt } from "react-icons/fa";
import { Box, Modal } from "@mui/material";



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
    const {updateItem, getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    const {generalState: {}, studentFunctions: {updateAvatar, fetchProfile, updateProfile}, setGeneralState} = useAuth();

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
    const [courseList, setCourseList] = useState(["hi"])
    const [loading, setLoading] = useState(true);
  
    const tableHeaders = [ "No", "Title", "Details", "Type", "Duration", "Date", "Time" ];
  
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
    
              toast.error("message", {
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
  
    function gotoCreateCourseHandler(e){
      navigate("create");
    }
    return (
      <Students header={"Bootcamps"}>
        {loading && <Loader />}
        <div className={clsx["admin_profile"]}>
          <div className={clsx.admin__student}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 style={{margin: 0}}>Bootcamps</h1>  
            </div>
  
            <div className={clsx.admin__student_main}>
              <table className={clsx.admin__student_table}>
                <thead>
                  {tableHeaders.map((el, i) => (
                    <th key={i}>{el}</th>
                  ))}
                </thead>
                <tbody>
                  {courseList.length > 0 && courseList.map(
                    ( item, i ) => (
                      <BootcampRow
                        key={i}
                        comp={"Courses"}
                        index={i}
                        title="Lorem ipsum dolor sit amet."
                        detail={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur sint tempore iste animi nisi eius alias eveniet possimus itaque voluptatem tenetur necessitatibus asperiores repellat sapiente, laborum aspernatur in quam maxime!"}
                        duration={"16 weeks"}
                        type={"Full Time"}
                        time={"6am - 12pm CET"}
                        date={"Jan 6 - Mar 24"}
                      />
                    )
                  )}
                  <p>
                  </p>
                </tbody>
              </table>
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
export function Wishlist(){
    const {generalState: {isMobile}, setGeneralState, generalState, studentFunctions:{fetchWishlist}} = useAuth();
    const [wishlists, setWishlists]= useState([])

    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);

    const flag = useRef(false);
     useEffect(()=>{
        if(flag.current) return;
        (async () => {
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
        })()
        flag.current = true;
    },[])
    return ( 
        <Students isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.students_profile}>
                <header className="mb-4">
                    <h3>My wishlist</h3>
                </header>
                <div className={clsx.classes}>
                    <div className={clsx.students_wishlist}>
                        {wishlists.length > 0 ? wishlists.map((item, index)=>(
                            <WishCard key={index} {...item} />
                        )) : 
                        <p className="text-center">Nothing to see here</p>
                        }
                    </div>
                </div>
            </div>
        </Students>
    )
}

function WishCard({id}){
    const [open, setOpen]= useState(false);
    function closeModal(){
        setOpen(false)
    }
    return(
        <div className="card wish">
            <div className="card-body wish-card-body">
                <div style={{width:"50px", height:"50px", borderRadius:"50%"}}>
                    <img src={trello} alt="icon" className="img-fluid" />
                </div>
            <h5 className="fw-bold">Project Management</h5>
            <p className="">the process of leading the work of a team to achieve all project goals within the given constraints.</p>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" style={{border:"1px solid var(--theme-blue)", color:"var(--theme-blue)", fontWeight:"bold", padding:"0.5rem 1rem"}}>Register today</button>
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
    const {generalState: {isMobile}, setGeneralState, generalState, studentFunctions:{deleteFromWishlist}} = useAuth();
    const {getItem} = useLocalStorage();
    let userdata = getItem(KEY);
    console.log(id)
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
                console.log(data);
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
                <div className="d-flex justify-content-around">
                <button className="btn btn-outline-primary" onClick={handleClose}  style={{border:"1px solid var(--theme-blue)", color:"var(--theme-blue)", fontWeight:"bold", padding:"0.5rem 1rem"}}>Cancel</button>
                <button className="btn btn-outline-primary" onClick={removeCourse} style={{border:"1px solid var(--theme-orange)", color:"var(--theme-orange)", fontWeight:"bold", padding:"0.5rem 1rem"}}>Yes</button>
                </div>
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
    
    const tableHeaders = ["No", "Courses", "Tutor's Name", "Teaching Model", "Course Fee", "Rating"]
    const tableContents = [
        {
            name: "Melanie Grutt",
            course: "Cybersecurity",
            package: "Cohort",
            rating: "Bronze",
            amount:"3000"
        },
        {
            name: "Keira Danlop",
            course: "UI/UX",
            package: "Cohort",
            rating: "Silver",
            amount:"3000"
        },
        {
            name: "Diop Grutt",
            course: "HTML",
            package: "One on One",
            rating: "Gold",
            amount:"3000"
        },
        {
            name: "Diop Grutt",
            course: "Data Analytics",
            package: "Self paced",
            rating: "Diamond",
            amount:"3000"
        },
    ]

    const [rating, setRating] = useState(0) // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate)
    // other logic
  }
    return ( 
        <Students isMobile={isMobile} userdata={userdata}>               
            <div className={clsx.students_profile}>

                {/* {courses.length === 0 ?         
                               <NoDetail text="You haven't registered for any course" />

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
                            tableContents.map(({name,amount, package: p, course, rating}, i) => (
                                <UserInfoCard key={i} amount={amount} model={p} name={name} num={i} comp={"Courses"} rating={rating} handleRating={()=>handleRating("courseID")} course={course} />
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

    
    const tableHeaders = ["No", "Courses", "Status", "Date", "Amount Paid"]
    const tableContents = courses.length > 0 ? courses : [
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


const Students = ({children, isMobile, notification, userdata}) => {
    const {generalState: {showSidebar, loading}, generalState, setGeneralState} = useAuth();
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

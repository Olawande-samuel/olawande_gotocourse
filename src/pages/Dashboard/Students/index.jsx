import { useEffect, useState, useMemo, useRef } from "react";
import { MdDownloadForOffline, MdEdit, MdPersonAdd } from "react-icons/md"
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion"
import { AiFillQuestionCircle, AiOutlineDoubleRight, AiOutlineMenu, AiOutlineSearch } from "react-icons/ai"
import { FaGraduationCap } from "react-icons/fa"
import { BsQuestionCircle, BsDownload } from "react-icons/bs"
import { Rating } from 'react-simple-star-rating'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import trello from "../../../images/trello.png"
import { Product, Stu1, Stu2, Stu3 } from "../../../images/components/svgs"
import Loader from "../../../components/Loader"
import { Sidebar, Searchbar, Navbar } from "../components";
import clsx from "./styles.module.css";
import { colors, getDate, gotoclass, gotoclassPayment, getFullDate, calculateWeeksBetween } from "../../../constants";
import avatar from "../../../images/teacher.png"
import { GuardedRoute } from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { BootcampRow, UserInfoCard, NotificationContent } from "../Admin";
import { useAuth } from "../../../contexts/Auth";
import { useLocalStorage } from "../../../hooks";
import { FaRegTrashAlt, FaUserAlt } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { IoMdChatboxes } from "react-icons/io";
import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";

import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import ChatComponent from "../Admin/Chat";

import LogoutButton from "../../../components/LogoutButton";
import { PaymentModal } from "../../Bootcamp/Payment";
import PayModal from "../../../components/PayModal";
import { LiveClassInfo } from "../components/classConsole/Liveclass";
import { Link } from "react-router-dom";
import { BiMoney } from "react-icons/bi";



const KEY = 'gotocourse-userdata';


export function Profile() {
    const { generalState: { isMobile, notification, loading }, setGeneralState, studentFunctions: { fetchProfile } } = useAuth();

    const ref = useRef(false)
    const { updateItem, getItem } = useLocalStorage();
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
        if (ref.current) return
        if (userdata) {
            const token = userdata.token;
            (async () => {
                try {
                    const res = await fetchProfile(token);
                    const { success, message, statusCode } = res;
                    if (!success) throw new AdvancedError(message, statusCode);
                    else {
                        const { data } = res;
                        const newValue = {
                            ...userdata,
                            ...data
                        }
                        userdata = updateItem(KEY, newValue);
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
                }
            })()
        }

        ref.current = true
    }, [userdata?.token])

    function editProfileHandler(e) {
        navigate("/student/profile/edit");
    }
    return (
        <Students isMobile={isMobile} userdata={userdata} notification={notification} header="Profile">
            <div className={clsx.students_profile}>
                <div className={clsx.students_profile_top} style={{ background: "unset" }}>
                    <div className={clsx.students_profile_top_img}>
                        <img src={userdata?.profileImg ? userdata.profileImg : avatar} style={{ borderRadius: 10 }} width="100%" alt="Avatar" />
                    </div>
                    <button className={clsx.students_profile_top_button} onClick={editProfileHandler}>
                        <MdEdit />  &nbsp;   <span className="d-none d-md-block">Edit</span>
                    </button>
                </div>
                <div className={clsx.students_profile_main}>
                    {/* <span className="text-muted">Name:</span> */}
                    <h1 className={clsx.students__header} style={{ marginTop: 20 }}>{userdata?.firstName} {userdata?.lastName}</h1>
                    <span className="text-muted">Experience:</span>
                    <p>{userdata?.bio ? userdata?.bio : "I'm a purposeful person"} </p>
                    <span className="text-muted">Bio:</span>
                    <p>{userdata?.goals ? userdata?.goals : "I'm here to achieve great things in tech"}</p>

                </div>
            </div>
        </Students>
    )
}



export function Edit() {
    const navigate = useNavigate();
    const { updateItem, getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { }, studentFunctions: { updateAvatar, fetchProfile, updateProfile }, setGeneralState } = useAuth();

    const [imageUrl, setImageUrl] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [formstate, setFormstate] = useState({
        firstName: userdata?.firstName ?? "",
        lastName: userdata?.lastName ?? "",
        work: userdata?.work ?? "",
        location: userdata?.location ?? "",
        category: userdata?.category ?? "",
        bio: userdata?.bio ?? "",
        goals: userdata?.goals ?? ""
    })



    useEffect(() => {
        // to prevent data from disappearing on page reload
        // setFormstate({...formstate, ...userdata})
    }, [])

    async function submitHandler(e) {
        e.preventDefault();
        setLoading(_ => true);
        try {
            if (formstate.firstName === "" || formstate.lastName === "" || formstate.bio === "" || formstate.goals === "" || formstate.work === "" || formstate.location === "" || formstate.category === "") throw new AdvancedError("All fields are required", 0);
            //submit updated profile
            const res = await updateProfile(formstate, userdata.token);
            const { success, statusCode, message } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else {
                const { data } = res;
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
        } finally {
            setLoading(_ => false);
        }
    }


    function changeHandler(e) {
        const { name, value } = e.target;
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    function uploadPicture() {
        let input = document.getElementById("imageUpload");
        input.click();
    }


    function changeImageHandler(e) {
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        setImageUrl(_ => url);
        setFile(_ => file);
    }

    async function changeProfilePictureHandler(e) {
        setIsUploading(_ => true);
        try {
            let formdata = new FormData();
            formdata.append('image', file, file.name);
            const res = await updateAvatar(formdata, userdata.token);
            const { success, message, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else {
                const { data } = res;
                const { profileImg } = data;
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
        } finally {
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
                        <input id="imageUpload" type="file" style={{ display: 'none' }} onChange={changeImageHandler} />
                        {imageUrl ?
                            isUploading ?
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                <p style={{ cursor: isUploading && 'not-allowed', color: "var(--theme-orange", fontWeight: "700" }} onClick={changeProfilePictureHandler}>Click to Upload Photo</p>

                            : (<p onClick={uploadPicture} >Select a photo to upload</p>)
                        }
                    </div>
                    <div className={clsx.edit__picture}>
                        <button className="button button-md" type="button" onClick={() => {
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
                            <textarea rows="5" name="bio" className="form-control generic_input" value={formstate.bio} onChange={changeHandler}></textarea>
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

export function MyClasses() {
    const { studentFunctions: { fetchBootcamps } } = useAuth();

    const navigate = useNavigate();
    const { getItem } = useLocalStorage();

    const flag = useRef(false);
    let userdata = getItem(KEY);

    const [courseList, setCourseList] = useState([])
    const [loading, setLoading] = useState(true);


    const tableHeaders = ["No", "Title", "Tutor", "Date", "Time"];

    useEffect(() => {
        if (flag.current) return;
        (async () => {
            try {
                const res = await fetchBootcamps(userdata?.token);
                const { message, success, statusCode } = res;
                if (!success) throw new AdvancedError(message, statusCode);
                else if (statusCode === 1) {
                    const { data } = res;
                    if (data.length > 0) {
                        setCourseList(data);
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
            } finally {
                setLoading(_ => false);
            }
        })()
        flag.current = true;
    }, [])

    function gotoCreateCourseHandler(e) {
        navigate("create");
    }
    function detailHandler(e, _id) {
        // navigate("/bootcamps/details/"+_id);
    }

    function handleNavigate(category, name, id) {
        console.log("clicking");
        // localStorage.setItem("gotocourse-courseId", id)
        let courseCategory = category?.split(" ").join("-")
        let courseName = name?.split(" ").join("-")
        navigate(`/categories/${courseCategory}/courses/${courseName}/${id}/payment`)
    }

    console.log({ courseList });

    return (
        <Students header={"My Classes"}>
            {loading && <Loader />}
            <div className={clsx["students_profile"]}>
                <div className={clsx.admin__student}>
                    {/* <div className="d-flex justify-content-between align-items-center mb-4">
                        <h4 style={{ margin: 0 }}>My Classes</h4>
                    </div> */}
                    <div className={clsx.admin__student_main}>
                        {courseList?.length > 0 ? (
                            // <table className={clsx.admin__student_table}>
                            //     <thead>
                            //         {tableHeaders.map((el, i) => (
                            //             <th key={i}>{el}</th>
                            //         ))}
                            //     </thead>
                            //     <tbody>
                            //         {courseList?.map(
                            //             // {_id, title, duration, startTime, endTime, startDate,endDate, description, type, isActive, instructorId, bootcampImg, all}
                            //             ({ bootcampName, tutorName, startTime, endTime, endDate, startDate, bootcampId, bootcampImg, _id }, i) => (
                            //                 <tr style={{ padding: "1rem" }}>
                            //                     <td>{i + 1}</td>
                            //                     <td>{bootcampName}</td>
                            //                     <td>{tutorName}</td>
                            //                     <td>{getDate(startDate)}</td>
                            //                     <td>{startTime}</td>
                            //                 </tr>
                            //             )
                            //         )}
                            //         <p>
                            //         </p>
                            //     </tbody>
                            // </table>

                            <div className={` ${clsx.dashboard_courses}`}>
                                <div className={clsx["dashboard_courses--left"]}>
                                    {/* <h6 style={{ marginBottom: ".5rem" }}>Available Courses</h6>
                                    <small className="mb-4 d-block">Select and enroll for a class to get started</small> */}

                                    <div className={clsx["courseheader"]}>
                                        <div className={clsx["courseitem"]}> No</div>
                                        <div className={clsx["courseitem"]}>Courses</div>
                                        {/* <div className={clsx["courseitem"]}>Category</div>
                                        <div className={clsx["courseitem"]}>Subcategory</div> */}
                                        <div className={clsx["courseitem"]}>Start Date</div>
                                        {/* <div className={clsx["courseitem"]}>Duration</div> */}
                                        <div className={clsx["courseitem"]}>Fees</div>
                                        <div className={clsx["courseitem"]}>Status</div>
                                        <div className={clsx["courseitem"]} />
                                    </div>

                                    <div className={clsx["coursebody"]}>
                                        {/* {data?.length > 0 && data.filter(item => item.isActive).map((item, i) => ( */}
                                        {courseList?.length > 0 && courseList.map((item, i) => (

                                            <div className={clsx["coursecontent"]} key={i}>
                                                <div className={clsx["courseitem"]}>
                                                    <span>{i + 1}</span>

                                                </div>

                                                <div className={clsx["courseitem"]}>
                                                    <span>{item.bootcampName}</span>

                                                </div>


                                                {/* <div className={clsx["courseitem"]}>
                                                    <span>{item.category}</span>
                                                </div>

                                                <div className={clsx["courseitem"]}>
                                                    <span>{item.subCategory}</span>
                                                </div> */}

                                                <div className={clsx["courseitem"]}>
                                                    <span>{item.startDate && getDate(item.startDate)}</span>
                                                </div>
                                                {/* <div className={clsx["courseitem"]}>
                                                    <span>{(item.endDate && item.startDate) ? (calculateWeeksBetween(item.endDate, item.startDate)) : ""}</span>
                                                </div> */}

                                                <div className={clsx["courseitem"]}>
                                                    <span>$ {item.bootcampPrice}</span>

                                                </div>
                                                <div className={clsx["courseitem"]}>
                                                    <span>{item.paymentStatus}</span>

                                                </div>

                                                <div className={clsx["courseitem"]}>
                                                    <div className={clsx.classes_button}>
                                                        {
                                                            (item.paymentStatus === "complete" || item.paymentStatus === "paid") ?

                                                                <button className="d-flex align-items-center" style={{ background: "var(--theme-blue)", color: "#fff" }}
                                                                    onClick={(e) => navigate(`/student/class-console/class/${item.bootcampId}`)}
                                                                >

                                                                    <span>Go to class</span>
                                                                </button>
                                                                :
                                                                <button className="d-flex align-items-center gap-2"
                                                                    onClick={(e) => handleNavigate(item.category, item.bootcampName, item.bootcampId)}
                                                                >
                                                                    <i><BiMoney /> </i>
                                                                    <span>Pay</span>
                                                                </button>

                                                        }
                                                    </div>
                                                </div>


                                            </div>
                                        ))
                                        }

                                    </div>

                                </div>




                            </div>

                        ) : (<p className="lead text-center">You haven't registered for a course</p>)
                        }

                    </div>
                </div>
            </div>
        </Students>
    );
}

export function Bootcamps() {
    const { studentFunctions: { fetchBootcamps }, otherFunctions: { fetchBootcamps: studentboot } } = useAuth();

    const navigate = useNavigate();
    const { getItem } = useLocalStorage();
    const flag = useRef(false);
    let userdata = getItem(KEY);
    const [courseList, setCourseList] = useState([])
    const [loading, setLoading] = useState(true);


    const bootcamps = useQuery(["bootcamps"], () => studentboot());

    const tableHeaders = ["No", "Title", "Tutor", "Date", "Time"];

    useEffect(() => {
        if (flag.current) return;
        (async () => {
            try {
                const res = await fetchBootcamps(userdata?.token);
                const { message, success, statusCode } = res;
                if (!success) throw new AdvancedError(message, statusCode);
                else if (statusCode === 1) {
                    const { data } = res;
                    if (data.length > 0) {

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
            } finally {
                setLoading(_ => false);
            }
        })()
        flag.current = true;
    }, [])

    function gotoCreateCourseHandler(e) {
        navigate("create");
    }
    function detailHandler(e, _id) {
        // navigate("/bootcamps/details/"+_id);
    }

    return (
        <Students header={"Available Courses"}>
            {loading && <Loader />}
            <div className={clsx["students_profile"]}>
                <div className={clsx.admin__student}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h3 style={{ margin: 0 }}>Available Courses</h3>
                    </div>
                    <div className={clsx.admin__student_main}>
                        {bootcamps.data?.data?.length > 0 ? (
                            <table className={clsx.admin__student_table}>
                                <thead>
                                    {tableHeaders.map((el, i) => (
                                        <th key={i}>{el}</th>
                                    ))}
                                </thead>
                                <tbody>
                                    {bootcamps.data?.data?.map(
                                        // {_id, title, duration, startTime, endTime, startDate,endDate, description, type, isActive, instructorId, bootcampImg, all}
                                        ({ title, description, duration, instructorName, instructorId, type, startTime, endTime, endDate, startDate, bootcampId, bootcampImg, _id }, i) => (
                                            <BootcampRow
                                                key={i}
                                                index={i}
                                                title={title}
                                                description={description}
                                                detail={instructorName}
                                                instructorId={instructorId}
                                                period={duration}
                                                jobType={type}
                                                admin={false}
                                                bootcampImg={bootcampImg}
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
                        ) : (<p className="lead">No Course Available </p>)
                        }

                    </div>
                </div>
            </div>
        </Students>
    );
}

export function Classes() {
    const { generalState: { isMobile }, otherFunctions: { fetchBootcamps } } = useAuth();
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps());
    const [search, setSearch] = useState("");

    // console.log(bootcamps?.data?.data);
    return (
        <Students isMobile={isMobile} userdata={userdata} header="Courses">
            {/* <div className={clsx.students_profile}>
                <div className={clsx.classes}>
                    {
                        data.map(({ numberOfLessons, title, date, time, isLive, color }, i) => (
                            <ClassesCard numberOfLessons={numberOfLessons} key={i} title={title}
                                date={date} time={time} isLive={isLive} color={color} />
                        ))
                    }
                </div>
            </div> */}
            <div className={clsx.wishlist__inputcontaniner}>
                <input type="text" className={clsx.wishlist__input}
                    placeholder="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <AiOutlineSearch style={{ fontSize: "1.5rem", color: "#292D32" }} />
            </div>

            <div className={`${clsx.students_profile_main} ${clsx.student_bg}`}>
                <AllAvailableCourses data={bootcamps?.data?.data ? bootcamps?.data?.data : []} search={search} />
            </div>
        </Students>
    )
}
export function Wishlist() {
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { fetchWishlist }, otherFunctions: { fetchBootcamps } } = useAuth();
    const [wishlists, setWishlists] = useState([])
    const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps());
    const [search, setSearch] = useState("");
    let navigate = useNavigate();

    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);

    const getCarts = useQuery(["carts"], () => fetchWishlist(userdata?.token), {
        enabled: userdata?.token !== null,
        onSuccess: (res) => {
            if (res?.data?.length > 0) {
                setWishlists(res?.data);
            }else {
                setWishlists([])
            }
        }
    });


 

    console.log({ wishlists });

    const value = useMemo(() => {
        return wishlists?.reduce((total, current) => {
            console.log({ current });
            return total + current.price
        }, 0)
    }, [wishlists])

    // const Available=  bootcamps?.data?.data?.length > 0 && bootcamps?.data?.data?.some(r=> wishlists?.map(wishlist => wishlist.courseId).indexOf(r.bootcampId) >= 0)
    // const Available = bootcamps?.data?.data?.length > 0 && bootcamps?.data?.data?.filter(boot => boot.bootcampId === (wishlists?.map(wishlist => wishlist.courseId)))

    // console.log({Available});

  


    return (
        <Students isMobile={isMobile} userdata={userdata} header="Cart">
            <div className={clsx.students_profile}>
                <header className="mb-4 d-flex align-center">
                    <h3 style={{ paddingRight: "2rem", fontWeight: "600" }}>Cart</h3>

                    {/* <div className={clsx.wishlist__inputcontaniner}>
                        <input type="text" className={clsx.wishlist__input}
                            placeholder="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} />
                        <AiOutlineSearch style={{ fontSize: "1.5rem", color: "#292D32" }} />
                    </div> */}
                </header>




                <div className={clsx.classes}>
                    <div className={clsx.wishlistprice}>
                        <small>Total:</small>
                        <p>{`$${value}`}</p>
                        {/* <p>$11,000</p> */}
                        <Link to={`/student/wishlist-checkout`}><button disabled={wishlists?.length <= 0 ? true : false}>Checkout</button></Link>


                    </div>
                    <p style={{ padding: "1rem 0" }}>My Cart</p>

                    <div className={clsx.students_wishlist}>
                        {wishlists?.length > 0 ? wishlists?.filter(
                            (course) =>
                                // course.category
                                //   .toLowerCase()
                                //   .includes(search.toLowerCase()) ||
                                course.courseName
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            //   ||
                            // course.status
                            //   .toLowerCase()
                            //   .includes(search.toLowerCase())
                        )
                            .map((item, index) => (
                                <WishCard key={index} {...item}
                                // refetch={getWishList} 
                                />
                            )) :
                            <p className="text-center mx-auto">Nothing to see here</p>
                        }
                    </div>


                    <div>
                        <p style={{ padding: "3rem 0" }}>Available Courses</p>

                        <div className={clsx.students_wishlist}>
                            {bootcamps?.data?.data?.length > 0 ? bootcamps?.data?.data?.filter(
                                (course) =>
                                    // course.category
                                    //   .toLowerCase()
                                    //   .includes(search.toLowerCase()) ||
                                    course?.title
                                        .toLowerCase()
                                        .includes(search.toLowerCase())
                                //   ||
                                // course.status
                                //   .toLowerCase()
                                //   .includes(search.toLowerCase())
                            ).map((item, index) => {
                                let info = {
                                    courseId: item.bootcampId,
                                    courseName: item.title,
                                    courseDescription: item.description,
                                    courseCategory: item.category,
                                }
                                return (
                                    <AvailCard key={index} {...info}
                                    // refetch={getWishList} 
                                    />

                                )
                            }) :
                                <p className="text-center mx-auto">Nothing to see here</p>
                            }
                        </div>


                    </div>
                </div>
            </div>
        </Students>
    )
}

function WishCard({ courseId: id, courseName, courseDescription, courseCategory }) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const { generalState: { isMobile }, setGeneralState, generalState, studentFunctions: { deleteFromWishlist } } = useAuth()
    const { getItem } = useLocalStorage();
    const userdata = getItem(KEY)
    let queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)

    function closeModal() {
        setOpen(false)
    }



    function handleNavigate(category, name) {
        localStorage.setItem("gotocourse-courseId", id)
        let courseCategory = category.split(" ").join("-")
        let courseName = name.split(" ").join("-")
        navigate(`/categories/${courseCategory}/courses/${courseName}/${id}/payment`)
    }

    async function removeCourse(e) {
        e.preventDefault();
        setLoading(true)

        try {
            setGeneralState({ ...generalState, loading: true })
            const res = await deleteFromWishlist(userdata?.token, id)
            const { success, message, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else {
                const { data } = res;
                setLoading(false)
                queryClient.invalidateQueries(["carts"])

            }
        } catch (err) {

        } finally {
            setGeneralState({ ...generalState, loading: false });
            setLoading(false)

        }
    }
    return (
        <div className="card wish">
            <div className="card-body wish-card-body">
                <div style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                    <img src={trello} alt="icon" className="img-fluid" />
                </div>
                <h5 className="fw-bold">{courseName}</h5>
                <p className="restricted_line" dangerouslySetInnerHTML={{ __html: courseDescription }}></p>
                <div className="d-flex justify-content-between">
                    {/* <button className="btn btn-outline-primary" onClick={() => handleNavigate(courseCategory, courseName)} style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>Register today</button> */}
                    <button className="btn btn-outline-primary" onClick={() => handleNavigate(courseCategory, courseName)} style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>Pay</button>
                    {/* <button className="btn btn-outline-primary" onClick={() => setOpen(true)} style={{ border: "1px solid var(--theme-orange)", color: "var(--theme-orange)", fontWeight: "bold", padding: "0.5rem 1rem" }}>
                        {/* <i><FaRegTrashAlt /></i> 
                        Remove
                    </button> */}

                    <button onClick={removeCourse} className="btn btn-outline-primary" style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>
                        {
                            loading ?
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                "Remove"

                        }

                    </button>
                </div>
            </div>
            <DeleteModal open={open} handleClose={closeModal} id={id} />
        </div>
    )
}


function AvailCard({ courseId, courseName, courseDescription, courseCategory, }) {
    const navigate = useNavigate();
    const { generalState: { isMobile }, setGeneralState, generalState, studentFunctions: { addwishlistCourse, fetchWishlist, deleteFromWishlist } } = useAuth()
    const { getItem } = useLocalStorage();
    let [wishlistState, setWishlistState] = useState(false)
    const [loading, setLoading] = useState(false)
    let queryClient = useQueryClient()
    const userdata = getItem(KEY)


    useQuery(["carts"], () => fetchWishlist(userdata?.token), {
        enabled: userdata?.token !== null,
        onSuccess: (res) => {
            if (res?.data?.length > 0) {
                setWishlistState(res?.data?.map(d => d.courseId).includes(courseId));
            }
        }
    });


    async function addToWishlist() {
        setGeneralState({ ...generalState, loading: true })
        setLoading(true)
        if (userdata !== null) {
            try {
                const response = await addwishlistCourse(courseId, userdata?.token)
                const { success, message, statusCode } = response
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
                const { data } = response
                setWishlistState(true)
                queryClient.invalidateQueries(["carts"])
            } catch (error) {
                console.error(error)
                setLoading(false)

            } finally {
                setGeneralState({ ...generalState, loading: false })
                setLoading(false)

            }


        } else {
            navigate("/login")
        }
    }



    async function removeCourse(e) {
        e.preventDefault();
        setLoading(true)

        try {
            setGeneralState({ ...generalState, loading: true })
            const res = await deleteFromWishlist(userdata?.token, courseId)
            const { success, message, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else {
                const { data } = res;
                setWishlistState(false)
                setLoading(false)
                queryClient.invalidateQueries(["carts"])

            }
        } catch (err) {

        } finally {
            setGeneralState({ ...generalState, loading: false });
            setLoading(false)

        }
    }


    return (
        <div className="card wish">
            <div className="card-body wish-card-body">
                <div style={{ width: "50px", height: "50px", borderRadius: "50%" }}>
                    <img src={trello} alt="icon" className="img-fluid" />
                </div>
                <h5 className="fw-bold">{courseName}</h5>
                <p className="restricted_line" dangerouslySetInnerHTML={{ __html: courseDescription }}></p>
                <div className="d-flex justify-content-between">

                    {
                        (!userdata.token) ? <button onClick={addToWishlist} className="btn btn-outline-primary" style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>
                            {
                                loading ?
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    "Add to Wishlist"

                            }

                        </button> :

                            (userdata.token && wishlistState) ?

                                <button onClick={removeCourse} className="btn btn-outline-primary" style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>
                                    {
                                        loading ?
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            "Remove wishlist"

                                    }

                                </button>
                                :
                                <button onClick={addToWishlist} className="btn btn-outline-primary" style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>
                                    {
                                        loading ?
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            :
                                            "Add to Wishlist"

                                    }

                                </button>

                    }
                </div>
            </div>
        </div>
    )
}

function DeleteModal({ id, open, handleClose }) {
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { deleteFromWishlist } } = useAuth();
    let queryClient = useQueryClient()

    const { getItem } = useLocalStorage();
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

    async function removeCourse(e) {
        e.preventDefault();
        try {
            setGeneralState({ ...generalState, loading: true });
            const res = await deleteFromWishlist(userdata?.token, id)
            const { success, message, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else {
                const { data } = res;
                console.log("reloading");
                queryClient.invalidateQueries(["carts", "bootcamps"])
                handleClose()
                // toast.success(message, {
                //     position: "top-right",
                //     autoClose: 4000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });
            }
        } catch (err) {
            // toast.error(err.message, {
            //     position: "top-right",
            //     autoClose: 4000,
            //     hideProgressBar: true,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            // });
        } finally {
            setGeneralState({ ...generalState, loading: false });
        }
    }
    return (
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
                        <button className="btn btn-outline-primary" onClick={handleClose} style={{ border: "1px solid var(--theme-blue)", color: "var(--theme-blue)", fontWeight: "bold", padding: "0.5rem 1rem" }}>Cancel</button>
                        <button className="btn btn-outline-primary" onClick={removeCourse} style={{ border: "1px solid var(--theme-orange)", color: "var(--theme-orange)", fontWeight: "bold", padding: "0.5rem 1rem" }}>Yes</button>
                    </div>
                }
            </Box>
        </Modal>

    )
}


export function WishlistCheckOut() {
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { fetchWishlist, payCarts } } = useAuth();
    const [showStripeModal, setShowStripeModal] = useState(false);
    const [payIntent, setPayintent] = useState("")

    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const [search, setSearch] = useState("")
    const [wishlists, setWishlists] = useState([])

    const handleClose = () => setShowStripeModal(false)

    const checkout = async () => {
        //get all ids
        let ids = wishlists.map(wishlist => wishlist.courseId);
        console.log({ ids });
        //   payCarts
        try {
            setGeneralState({ ...generalState, loading: true })
            const res = await payCarts(userdata?.token, ids);
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else if (statusCode === 1) {
                const { data } = res;
                console.log({ data });
                setPayintent(data.clientSecret)
                setShowStripeModal(true)
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

        } finally {
            setGeneralState({ ...generalState, loading: false });
        }



        //generate payIntent
        //setPayintent(data.payIntent)

        //pay
        //send
    }
    const flag = useRef(false);
    async function getWishList() {
        try {
            setGeneralState({ ...generalState, loading: true })
            const res = await fetchWishlist(userdata?.token);
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else if (statusCode === 1) {
                const { data } = res;
                if (data.length > 0) {
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
                } else {
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
        } finally {
            setGeneralState({ ...generalState, loading: false });
        }
    }
    useEffect(() => {
        if (flag.current) return;
        getWishList()
        flag.current = true;
    }, [])


    const value = useMemo(() => {
        return wishlists?.reduce((total, current) => {
            return total + current.price
        }, 0)
    }, [wishlists])

    return (
        <Students isMobile={isMobile} userdata={userdata} header="Checkout">
            <div className={clsx.students_profile}>
                <header className="mb-4">
                    <h3 style={{ paddingRight: "2rem", fontWeight: "600", color: "#081131" }}>Billing address</h3>

                    <div className={clsx.wishlist__select}>
                        <label htmlFor="country">Country</label> <br />
                        <select >
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            <option>Nigeria</option>
                        </select>
                        <br />
                        <small>
                            Gotocourse is required by law to collect applicable transaction taxes <br />
                            for purchases made in certain tax jurisdictions.
                        </small>
                    </div>

                </header>

                <div>
                    {showStripeModal && <PayModal
                        token={payIntent} 
                        openPaymentModal={showStripeModal} 
                        handleClose={handleClose} 
                        cart={true}
                        />
                        }

                </div>




                <div className={clsx.classes}>

                    <div className={clsx.wishlistcheckoutitems}>

                        <p style={{ padding: "1rem 0", fontWeight: "800" }}>Order details</p>
                        {
                            wishlists?.map((item, index) => (
                                <div key={item.courseId} className="w-100 d-flex justify-content-between align-center py-2">
                                    <div className="wishlistitemname">
                                        {item.courseName}

                                    </div>
                                    <div className="wishlistiteprice">
                                        ${item.price}
                                    </div>
                                </div>
                            ))
                        }

                        <div className="w-100 d-flex align-center justify-content-between py-3" style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                            <span>Total</span>
                            <span>${value}</span>

                        </div>



                        <button onClick={checkout} disabled={wishlists?.length <= 0 ? true : false}>Checkout</button>


                    </div>


                </div>
            </div>
        </Students >
    )
}



export function Courses() {
    const { generalState: { isMobile, loading }, generalState, setGeneralState, studentFunctions: { fetchCourses } } = useAuth();
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const [courses, setCourses] = useState([]);

    const ref = useRef(false)
    useEffect(() => {
        if (ref.current) return
        (async () => {
            try {
                setGeneralState({ ...generalState, loading: true })
                const res = await fetchCourses(userdata?.token);
                const { success, message, statusCode } = res;
                setGeneralState({ ...generalState, loading: false })
                if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
                else {
                    const { data } = res;
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
            } catch (err) {
                setGeneralState({ ...generalState, loading: false })
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
                <CourseTable courses={courses} />
            </div>
        </Students>
    )
}



function CourseTable({ courses = [], type }) {
    const { getItem } = useLocalStorage();


    const [rating, setRating] = useState(0) // initial rating value

    const tableHeaders = type !== "dashboard" ? ["No", "Courses", "Teaching Model", "Course Fee($)"] : ["No", "Courses", "Course Fee($)", "Action"]
    const handleRating = (rate) => {
        setRating(rate)
        // other logic
    }



    return (
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
                                courses.length > 0 && courses.map(({ courseName, coursePrice, package: p, course, rating }, i) => (
                                    <UserInfoCard
                                        key={i}
                                        enrolled={courseName}
                                        date={p}
                                        coursePrice={coursePrice}
                                        num={i}
                                        handleRating={() => handleRating("courseID")} />
                                ))
                            }
                        </tbody>
                    </table>
            }
        </>
    )
}
export function History() {
    const { generalState: { isMobile }, generalState, setGeneralState, studentFunctions: { fetchEnrollments } } = useAuth();
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const [courses, setCourses] = useState([]);
    const ref = useRef(false)
    useEffect(() => {
        if (ref.current) return
        if (userdata) {
            (async () => {
                setGeneralState({ ...generalState, loading: true })
                try {
                    const res = await fetchEnrollments(userdata?.token);
                    setGeneralState({ ...generalState, loading: false })
                    const { success, message, statusCode } = res;
                    if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
                    else {
                        const { data } = res;
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
                }
            })()
        }

        ref.current = true
    }, [])


    const tableHeaders = ["No", "Courses", "Status", "Date", "Course Price", "Amount Paid"]
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
                                tableContents.map(({ status, date, package: p, coursePrice, amountPaid, courseName, amount }, i) => (
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
export function Fees() {
    const { generalState: { isMobile }, generalState, setGeneralState, studentFunctions: { fetchFees, addBootcamp, fetchStudentFees, fetchBootcampFees, payStudentFees }, setOutstanding, } = useAuth();
    const { getItem } = useLocalStorage();
    const [course, setCourse] = useState([])
    let userdata = getItem(KEY);
    const [fees, setFees] = useState([]);
    const ref = useRef(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [stripeId, setStripeId] = useState("")

    const handleClose = () => setOpenPaymentModal(false);




    const payNumber = ["1st", "2nd", "3rd", "4th"]

    useQuery(["fetch my enrolledclasses"], () => fetchBootcampFees(userdata?.token), {
        onSuccess: (res) => {
            console.log({ res });
            if (res?.data?.length > 0) {
                setCourse((res?.data));
            }
        }
    })


    const getmyFees = async (data) => {
        setGeneralState({ ...generalState, loading: true })
        try {
            const res = await fetchStudentFees(data);
            setGeneralState({ ...generalState, loading: false })
            const { success, message, statusCode } = res;
            if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
            else {
                setCourse(res.data)
            }
        } catch (err) {
            console.error(err)
            // toast.error(err.message);
        }

    }

    // async function fetchPayments(token) {
    //     setGeneralState({ ...generalState, loading: true })
    //     try {
    //         const res = await Promise.all([fetchStudentFees(token), fetchBootcampFees(token)])
    //         console.log({ res })
    //         if (res.length > 0) {
    //             const myPayment = res[0].data.concat(res[1].data)

    //             console.log(myPayment)
    //             setCourse(myPayment)
    //         }
    //         setGeneralState({ ...generalState, loading: false })
    //     } catch (err) {
    //         toast.error(err.message);
    //     }
    // }


    // useEffect(() => {
    //     if (userdata.token) {
    //         fetchPayments(userdata.token)
    //     }
    // }, [userdata.token])

    useEffect(() => {
        if (ref.current) return
        if (userdata) {
            (async () => {
                setGeneralState({ ...generalState, loading: true })
                try {
                    const res = await fetchFees(userdata?.token);
                    setGeneralState({ ...generalState, loading: false })
                    const { success, message, statusCode } = res;
                    if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
                    else {
                        const { data } = res;
                        console.log({ data });
                        setFees(_ => data);
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
                }
            })()
        }
        ref.current = true
    }, [])


    const tableContents = fees.length > 0 ? fees : []


    const all = () => {
        let pending = course.map((c => c?.payments?.filter(x => x.status === "pending")))
        let individual_total = pending?.map(d => d?.reduce((total, item) => total + item.amount, 0))
        setOutstanding(individual_total?.reduce((total, item) => total + item, 0))

    }
    all()



    const filterpending = (data) => {
        let result = data.filter(c => c.status === "pending").reduce((sum, current) => sum + current.amount, 0)
        return result
    }



    const filterpaid = (data) => {
        let result = data.filter(c => c.status === "paid").reduce((sum, current) => sum + current.amount, 0)
        return result
    }

    const handlePay = async (paymentId, type) => {
        setGeneralState({ ...generalState, loading: true })
        console.log({ type })
        try {
            const res = await payStudentFees(userdata.token, paymentId);
            // const res = type === "course" ? await payStudentFees(userdata.token, paymentId) : await addBootcamp({bootcampId: paymentId}, userdata.token);
            setGeneralState({ ...generalState, loading: false })
            const { success, message, statusCode } = res;
            if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
            else {

                setStripeId(res.data.clientSecret)
                setOpenPaymentModal(true)
                getmyFees(userdata.token)
                // fetchPayments(userdata.token)
                // handleClose()

            }
        } catch (err) {
            toast.error(err.message);
        }

    }

    // console.log({ course });
    return (
        <Students isMobile={isMobile} userdata={userdata} header="Payments">
            <div className={clsx.students_profile}>

                <div className={clsx.payment_container}>

                    {
                        course?.length > 0 ? course.map((d, i) => (
                            <div className={clsx.payment__content} key={d.applicationId ? d.applicationId : d.bootcampId}>

                                <div className={clsx.payment__title}>
                                    <p>No</p>
                                    <span>{i + 1}</span>
                                </div>

                                <div className={clsx.payment__title}>
                                    <p>Course</p>
                                    <span>{d.courseName ? d.courseName : d.bootcampName}</span>
                                </div>


                                {d.payments?.length > 1 ? d.payments?.map((pay, i) => {
                                    return (<>
                                        <div className={clsx.payment__card}>
                                            <p>{payNumber[i]} installment</p>
                                            <div className={clsx.payment__fee}>
                                                <span>Fee</span>
                                                <span className={clsx.clred}>${pay.amount}</span>
                                            </div>
                                            <div className={clsx.payment__fee}>
                                                <span>Due Date:</span>
                                                <span>{new Date(pay.dueDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className={clsx.payment__button}>
                                                <button className={pay.status === "paid" ? clsx.bggreen : clsx.bgred} disabled={pay.status === "paid"} onClick={() => handlePay(pay._id, pay.type)}>{pay.status === "paid" ? "paid" : "pay"} </button>
                                            </div>
                                        </div>


                                    </>)
                                }) : d.payments?.length === 1 ? d.payments?.map((pay, i) => (
                                    <>
                                        <div className={clsx.payment__card}>
                                            <p>Full Payment</p>
                                            <div className={clsx.payment__fee}>
                                                <span>Fee</span>
                                                <span className={clsx.clred}>${pay.amount}</span>
                                            </div>
                                            <div className={clsx.payment__fee}>
                                                <span>Due Date:</span>
                                                <span>{new Date(pay.dueDate).toLocaleDateString()}</span>
                                            </div>
                                            <div className={clsx.payment__button}>
                                                <button className={pay.status === "paid" ? clsx.bggreen : clsx.bgred} disabled={d.status === "paid"} onClick={() => handlePay(pay._id, pay.type)}>Full Payment</button>
                                            </div>
                                        </div>

                                        {/* <div className={clsx.payment__empty}></div> */}
                                        <div className={clsx.payment__empty}></div>
                                    </>
                                ))
                                    :

                                    <>
                                        <div className={clsx.payment__card}>
                                            <p>Full Payment</p>
                                            <div className={clsx.payment__fee}>
                                                <span>Fee</span>
                                                <span className={clsx.clred}>${d.bootcampPrice}</span>
                                            </div>
                                            {/* <div className={clsx.payment__fee}>
                                                <span>Due Date:</span>
                                                <span>{new Date(pay.dueDate).toLocaleDateString()}</span>
                                            </div> */}
                                            <div className={clsx.payment__button}>
                                                <button className={d.status === "paid" ? clsx.bggreen : clsx.bgred} disabled={d.status === "paid"} onClick={() => handlePay(d.bootcampId, "bootcamp")}>Full Payment</button>
                                            </div>
                                        </div>

                                        <div className={clsx.payment__empty}></div>
                                        <div className={clsx.payment__empty}></div>
                                    </>

                                }

                                {
                                    d.payments?.length > 0 && (
                                        <>
                                            <div className={clsx.payment__title}>
                                                <p>Outstanding</p>
                                                {/* <span>${d.amount}</span> */}
                                                <span>${filterpending(d.payments)}</span>
                                            </div>

                                            <div className={clsx.payment__title}>
                                                <p>Total payment</p>
                                                {/* <span>$0</span> */}
                                                <span>${filterpaid(d.payments)}</span>
                                            </div>
                                        </>
                                    )
                                }



                            </div>
                        ))
                            :

                            <>
                                <h5 className="text-center">You haven't enrolled to any class</h5>
                            </>

                    }


                </div>
                <PayModal token={stripeId} openPaymentModal={openPaymentModal} handleClose={handleClose} />
            </div>

        </Students>
    )
}
export function NoDetail({ text }) {
    return (
        <div className="h-100" style={{ display: "grid", placeItems: "center" }}>
            <p className="text-center lead text-secondary">{text}</p>
        </div>
    )
}

function ClassesCard({ numberOfLessons, title, date, time, isLive, color }) {
    return (
        <div className={clsx.classes_card}>
            <div className={clsx.classes_card_first}>
                <div style={{ backgroundColor: color }} className={clsx.first_avatar}>
                    <h2 style={{ margin: 0, fontWeight: 'bolder', fontSize: "2rem" }}>{title[0]}</h2>
                </div>
                <div className={clsx.first_meta}>
                    <h5 style={{ margin: 0 }}>{title}</h5>
                    <p style={{ color: colors.gray, fontSize: "0.9rem" }}>{numberOfLessons} lessons</p>
                </div>
            </div>
            <div className={clsx.classes_card_second}>
                <span>{date}</span>
                <span style={{ fontWeight: "400" }}>{time}</span>
            </div>
            <div className={clsx.classes_card_third}>
                <button className={isLive ? `${clsx['third_btn']} ${clsx['third_btn_live']}` : clsx.third_btn}>Live</button>
                <button className={clsx.third_btn}>Completed</button>
            </div>
        </div>
    )
}



// NOTIFICATION
export function Notification() {
    const { getItem } = useLocalStorage();
    const flag = useRef(false);
    let userdata = getItem(KEY);
    const [loader, setLoader] = useState(false);
    const [load, setLoad] = useState(false);
    const { generalState, setGeneralState, studentFunctions: { fetchNotifications, readNotifications } } = useAuth();
    const [reload, setReload] = useState(false)
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (flag.current) return;
        (async () => {
            try {
                setLoader(true)
                const res = await fetchNotifications(userdata?.token);
                const { message, success, statusCode } = res;
                if (!success) throw new AdvancedError(message, statusCode);
                const { data } = res
                if (data.length > 0) {
                    setNotifications(data)
                    const unread = data.filter((notification) => notification.isRead !== true)
                    setGeneralState({ ...generalState, notifications: unread.length })
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
            } finally {
                setLoader(_ => false);
            }
        })()
        flag.current = true;
    }, [reload])

    async function markAsRead(e) {
        e.preventDefault();
        try {
            setLoad(true)
            const res = await readNotifications(userdata?.token);
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            const { data } = res
            setReload(true)
            flag.current = false;
            toast.success(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
        } finally {
            setLoad(_ => false);
        }
    }

    return (
        <Students userdata={userdata} header="Notifications">
            <NotificationContent notifications={notifications} markAsRead={markAsRead} load={load} loader={loader} />
        </Students>
    );
}



// CHAT
export function Chat() {
    const { getItem } = useLocalStorage()
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
        {
            active: false,
            name: "Admin",
        },
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
        {
            id: 2,
            type: "Others",
        },
        {
            id: 4,
            type: "Teachers",
        },
    ];
    return (
        <Students userdata={userdata} header="Chat">
            {loader && <Loader />}
            <ChatComponent tabs={tabs} chatType={chatType} usertype="student" />
        </Students>
    );
}

export const Dashboard = ({ mixpanel }) => {
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const { generalState: { isMobile }, studentFunctions: { fetchCourses, fetchWishlist, fetchBootcamps: fetchMyClasses }, otherFunctions: { fetchCourses: fetchAllCourses, fetchBootcamps } } = useAuth();
    // const { studentFunctions: { fetchBootcamps },  otherFunctions:{ fetchBootcamps: studentboot} } = useAuth();
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const [loader, setLoading] = useState(false)
    // const [value, setValue] = useState(dayjs('2014-08-18T21:11:54'));
    const [value, setValue] = useState((null));

    const handleChange = (newValue) => {
        setValue(newValue);
    };


    const { data: wishlistData, isSuccess: wishlistIsSuccess } = useQuery(["fetch wishes"], () => fetchWishlist(userdata?.token))
    const { data: myenrolledcourses, isSuccess: mycoursesuccess } = useQuery(["fetch my enrolledclasses"], () => fetchMyClasses(userdata?.token))
    // const { data: allCourses } = useQuery(["fetch all bootcamps"], () => fetchBootcamps())
    const { data, isSuccess } = useQuery(["bootcamps"], () => fetchBootcamps());
    // console.log({data})
    // console.log("wish",wishlistData );
    const topContent = [
        {
            id: 1,
            title: "Courses enrolled for",
            logo: <Stu1 />,
            value: myenrolledcourses?.data?.length ?? 0
        },
        {
            id: 2,
            title: "Courses on wishlist",
            logo: <Stu2 />,
            value: wishlistData?.data?.length ?? 0
        },
        {
            id: 3,
            title: "Outstanding fees",
            logo: <Stu3 />,
            value: "$0"
        }
    ]
    const tableHeaders = ["No", "Courses", "Status", "Date", "Amount Paid"]

    if (wishlistIsSuccess) {
        topContent[1].value = wishlistData?.data?.length
    }
    if (isSuccess) {
        topContent[0].value = myenrolledcourses?.data?.length
    }

    useMemo(() => mixpanel.track("visited student dashboard"), [])



    const dateFilter = useMemo(() => {
        if (value?.$d) {
            return new Intl.DateTimeFormat('en-US').format(new Date(value?.$d))
        } return ""
    }, [value?.$d])



    function filterDates(date){
        let isFound
        console.log({date})
        if(date){
          isFound = (new Intl.DateTimeFormat('en-US').format(new Date(date))?.includes(dateFilter))
          console.log({isFound})
          return isFound
        }else {
            return false
        }
    }

    return (
        <Students isMobile={isMobile} userdata={userdata} header={"Dashboard"} >
            <div className={clsx.students_profile}>
                <DashboardTop content={topContent} />

                <div className={clsx.wishlist__inputcontaniner}>
                    <input type="text" className={clsx.wishlist__input}
                        placeholder="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />
                    <AiOutlineSearch style={{ fontSize: "1.5rem", color: "#292D32" }} />
                </div>

                <div className={clsx.students_profile_main}>
                    {/* <UpcomingCourses data={all ? all : []} /> */}
                    <UpcomingCourses data={data?.data ? data?.data : []} search={search} />
                </div>



                <div className={clsx.students_profile_main}>
                    {/* <AvailableCourses data={all ? all : []} /> */}
                    <AvailableCourses data={data?.data ? data?.data : []} search={search} />

                    <div className={`d-flex flex-wrap ${clsx.dashboard_courses}`}>
                        <div className={clsx["dashboard_courses--right"]}>
                            <h6>Courses on wishlist</h6>
                            <ul>
                                {
                                    wishlistData?.data?.length === 0 ?
                                        <p className="text-muted">No item in wishlist</p>
                                        :
                                        wishlistData?.data?.map((item, i) => (
                                            <li key={i}>{item.courseName}</li>
                                        ))
                                }

                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`${clsx.dashboard_course_details}`}>
                    <div className={clsx.courseApplied}>
                        <h6>Names of Courses applied for</h6>

                        <div className="coursesdatefilter">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    // label="Date desktop"
                                    inputFormat="MM/DD/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>

                        </div>



                    </div>
                    {/* <CourseTable courses={data?.data} type="dashboard" /> */}
                    {
                        myenrolledcourses?.data?.length > 0 ?
                            // data?.data?.length > 0 ?
                            <div className="table-responsive">
                                <table className="table table-borderless w-auto">
                                    <thead>
                                        <tr>
                                            {tableHeaders.map((item, i) => (
                                                <th scope="col" key={i} style={{ minWidth: item !== "No" ? "150px" : "60px" }} >{item}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {myenrolledcourses?.data?.filter(data =>  data?.status === "paid").map((item, i) => ( */}
                                        {myenrolledcourses?.data?.filter(data => filterDates(data?.startDate) && data?.status === "paid").map((item, i) => (

                                            <tr key={i}>
                                                <td><span>{i + 1}</span></td>
                                                <td>
                                                    <span>{item.bootcampName}</span>
                                                </td>
                                                <td><span>{item.paymentStatus}</span></td>
                                                <td><span>{new Date(item?.startDate).toLocaleDateString()}</span></td>
                                                <td><span>${item.amountPaid}</span></td>
                                                <td>
                                                    {/* <span className="d-block dashboard_table">
                                                        <GotoDashboard loader={loader} setLoading={setLoading} />
                                                    </span> */}
                                                </td>
                                            </tr>

                                        ))}
                                    </tbody>
                                </table>
                            </div> : <NoDetail text="You haven't registered for any course" />

                    }
                </div>

                {/* <Community /> */}
            </div>
        </Students>
    )

}

function UpcomingCourses({ data, search }) {
    const navigate = useNavigate()
    // const tableHeader = ["Courses", "Start Date", "Program Fee", ""]
    const { getItem } = useLocalStorage()
    let userdata = getItem(KEY);

    const first = data?.length > 0 ? data?.filter(item => item.startDate === "2023-01-19T00:00:00.000Z" && item.isActive) : [];
    const second = data?.length > 0 ? data?.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive) : [];
    const third = data?.length > 0 ? data?.filter(item => item.startDate !== "2023-01-05T00:00:00.000Z" && item.startDate !== "2023-01-19T00:00:00.000Z" && item.isActive).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
    const all = [...first, ...second, ...third];
    // console.log({ second });

    function handleCourseSelect(e, item) {
        e.preventDefault()
        if (userdata?.token) {
            if(userdata?.trainee){
                localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(item))
                gotoclassPayment(item.title, item.category, item.bootcampId, navigate, userdata?.trainee) 
                return;
            }
            localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(item))
            gotoclassPayment(item.title, item.category, item.bootcampId, navigate)
        } else {
            navigate("/login")
        }

    }
    return (
        <div className={` ${clsx.dashboard_courses}`}>
            <div className={clsx["dashboard_courses--left"]}>
                <h6 style={{ marginBottom: ".5rem" }}>Upcoming Courses</h6>
                <small className="mb-4 d-block">Select and enroll for a course to get started</small>

                <div className={clsx["courseheader"]}>
                    <div className={clsx["courseitem"]}> No</div>
                    <div className={clsx["courseitem"]}>Courses</div>
                    <div className={clsx["courseitem"]}>Category</div>
                    <div className={clsx["courseitem"]}>Subcategory</div>
                    <div className={clsx["courseitem"]}>Start Date</div>
                    <div className={clsx["courseitem"]}>Durations</div>
                    <div className={clsx["courseitem"]}>
                        {/* <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Fee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="fee"
                            // onChange={handleChange}
                            >
                                <MenuItem value={30}>POUNDS</MenuItem>
                                <MenuItem value={10}>USD</MenuItem>
                                <MenuItem value={20}>EURO</MenuItem>
                                <MenuItem value={20}>NAIRA</MenuItem>
                            </Select>
                        </FormControl> */}

                        Fees
                    </div>
                    <div className={clsx["courseitem"]} />
                </div>

                <div className={clsx["coursebody"]}>
                    {/* {data?.length > 0 && data.sort(() => 0.5 - Math.random()).map((item, i) => ( */}
                    {/* {data?.length > 0 && data.filter(d => d.startDate === "2023-01-05T00:00:00.000Z" && d.isActive).sort(() => 0.5 - Math.random()).map((item, i) => ( */}
                    {all?.length > 0 && all?.filter((course) =>
                        course?.category
                            .toLowerCase()
                            .includes(search.toLowerCase()) ||
                        course?.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
                    ).slice(0, 4).sort(() => 0.5 - Math.random()).map((item, i) => (

                        <div className={clsx["coursecontent"]} key={i}>
                            <div className={clsx["courseitem"]}>
                                {i + 1}

                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.title}

                            </div>

                            <div className={clsx["courseitem"]}>

                                {item.category?.toLowerCase()}
                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.subCategory === "SHORT_COURSES" ? "Short Courses" :
                                    item.subCategory === "IN_DEMAND" ? "In-Demand Course" :
                                        item.subCategory === "UPSKILL_COURSES" ? "Upskill Course" :
                                            item.subCategory === "EXECUTIVE_COURSES" ? "Executive Course" : "Tech Enterpreneurship"}

                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.startDate && getDate(item.startDate)}
                            </div>


                            <div className={clsx["courseitem"]}>
                                {item.duration}
                            </div>

                            <div className={clsx["courseitem"]}>
                                ${(item?.packages?.length === 0 && item.price) ? item.price : (item?.packages?.length > 0) && item.packages[0].price}

                            </div>

                            <div className={clsx["courseitem"]}>
                                <div className={clsx.classes_button}>
                                    <button className="d-flex align-items-center" onClick={() => gotoclass(item.title, item.category, item.bootcampId, navigate)}>
                                        <i><AiFillQuestionCircle style={{ fontSize: "1.1rem", color: "var(--theme-blue" }} /></i>
                                        <span>Learn more</span>
                                    </button>
                                    <button className="d-flex align-items-center" onClick={(e) => handleCourseSelect(e, item)}>
                                        <i><MdDownloadForOffline style={{ fontSize: "1.1rem" }} /></i>
                                        <span>Enroll</span>
                                    </button>
                                </div>
                            </div>


                        </div>
                    ))
                    }

                </div>

                {all?.length > 0 &&
                    <div className={clsx.seemore}>
                        <Link to={`/category/upcoming`}> See more <AiOutlineDoubleRight /></Link>
                    </div>
                }

            </div>




        </div>
    )
}


function AllAvailableCourses({ data, search }) {
    const navigate = useNavigate()
    // const tableHeader = ["Courses", "Start Date", "Program Fee", ""]
    const { getItem } = useLocalStorage()
    let userdata = getItem(KEY);


    function handleCourseSelect(e, item) {
        e.preventDefault()
        if (userdata?.token) {
            if(userdata?.trainee){
                localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(item))
                gotoclassPayment(item.title, item.category, item.bootcampId, navigate, userdata?.trainee) 
                return;
            }
            localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(item))
            gotoclassPayment(item.title, item.category, item.bootcampId, navigate, true)
        } else {
            navigate("/login")
        }

    }
    // console.log({ data });

    const first = data?.length > 0 ? data?.filter(item => item.startDate === "2023-01-19T00:00:00.000Z" && item.isActive) : [];
    const second = data?.length > 0 ? data?.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive) : [];
    const third = data?.length > 0 ? data?.filter(item => item.startDate !== "2023-01-05T00:00:00.000Z" && item.startDate !== "2023-01-19T00:00:00.000Z" && item.isActive).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
    const all = [...first, ...second, ...third];

    return (

        <div className={` ${clsx.dashboard_courses}`}>
            <div className={clsx["dashboard_courses--left"]}>
                <h6 style={{ marginBottom: ".5rem" }}>Available Courses</h6>
                <small className="mb-4 d-block">Select and enroll for a course to get started</small>




                <div className={clsx["courseheader"]}>
                    <div className={clsx["courseitem"]}> No</div>
                    <div className={clsx["courseitem"]}>Courses</div>
                    <div className={clsx["courseitem"]}>Category</div>
                    <div className={clsx["courseitem"]}>Subcategory</div>
                    <div className={clsx["courseitem"]}>Start Date</div>
                    <div className={clsx["courseitem"]}>Durations</div>
                    <div className={clsx["courseitem"]}>
                        {/* <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Fee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="fee"
                            // onChange={handleChange}
                            >
                                <MenuItem value={30}>POUNDS</MenuItem>
                                <MenuItem value={10}>USD</MenuItem>
                                <MenuItem value={20}>EURO</MenuItem>
                                <MenuItem value={20}>NAIRA</MenuItem>
                            </Select>
                        </FormControl> */}

                        Fees
                    </div>
                    <div className={clsx["courseitem"]} />
                </div>

                <div className={clsx["coursebody"]}>
                    {/* {data?.length > 0 && data.sort(() => 0.5 - Math.random()).map((item, i) => ( */}
                    {/* {data?.length > 0 && data.filter(d => d.isActive).map((item, i) => ( */}
                    {all?.length > 0 && all?.filter((course) =>
                        course?.category
                            .toLowerCase()
                            .includes(search?.toLowerCase()) ||
                        course?.title
                            .toLowerCase()
                            .includes(search?.toLowerCase())
                    ).map((item, i) => (

                        <div className={clsx["coursecontent"]} key={i}>
                            <div className={clsx["courseitem"]}>
                                {i + 1}

                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.title}

                            </div>

                            <div className={clsx["courseitem"]}>

                                {item.category?.toLowerCase()}
                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.subCategory === "SHORT_COURSES" ? "Short Courses" :
                                    item.subCategory === "IN_DEMAND" ? "In-Demand Course" :
                                        item.subCategory === "UPSKILL_COURSES" ? "Upskill Course" :
                                            item.subCategory === "EXECUTIVE_COURSES" ? "Executive Course" : "Tech Enterpreneurship"}

                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.startDate && getDate(item.startDate)}
                            </div>


                            <div className={clsx["courseitem"]}>
                                {item.duration}
                            </div>

                            <div className={clsx["courseitem"]}>
                                ${(item?.packages?.length === 0 && item.price) ? item.price : (item?.packages?.length > 0) && item.packages[0].price}

                            </div>

                            <div className={clsx["courseitem"]}>
                                <div className={clsx.classes_button}>
                                    <button className="d-flex align-items-center" onClick={() => gotoclass(item.title, item.category, item.bootcampId, navigate)}>
                                        <i><AiFillQuestionCircle style={{ fontSize: "1.1rem", color: "var(--theme-blue" }} /></i>
                                        <span>Learn more</span>
                                    </button>
                                    <button className="d-flex align-items-center" onClick={(e) => handleCourseSelect(e, item)}>
                                        <i><MdDownloadForOffline style={{ fontSize: "1.1rem" }} /></i>
                                        <span>Enroll</span>
                                    </button>
                                </div>
                            </div>


                        </div>
                    ))
                    }

                </div>


            </div>




        </div>
    )
}



function AvailableCourses({ data, search }) {
    const navigate = useNavigate()
    // const tableHeader = ["Courses", "Start Date", "Program Fee", ""]
    const { getItem } = useLocalStorage()
    let userdata = getItem(KEY);


    function handleCourseSelect(e, item) {
        e.preventDefault()
        if (userdata?.token) {
            if(userdata?.trainee){
                localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(item))
                gotoclassPayment(item.title, item.category, item.bootcampId, navigate, userdata?.trainee) 
                return;
            }
            localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(item))
            gotoclassPayment(item.title, item.category, item.bootcampId, navigate, true)
        } else {
            navigate("/login")
        }

    }
    // console.log({ data });

    const first = data?.length > 0 ? data?.filter(item => item.startDate === "2023-01-19T00:00:00.000Z" && item.isActive) : [];
    const second = data?.length > 0 ? data?.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive) : [];
    const third = data?.length > 0 ? data?.filter(item => item.startDate !== "2023-01-05T00:00:00.000Z" && item.startDate !== "2023-01-19T00:00:00.000Z" && item.isActive).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
    const all = [...first, ...second, ...third];

    return (
        <div className={` ${clsx.dashboard_courses}`}>
            <div className={clsx["dashboard_courses--left"]}>
                <h6 style={{ marginBottom: ".5rem" }}>Available Courses</h6>
                <small className="mb-4 d-block">Select and enroll for a course to get started</small>

                <div className={clsx["courseheader"]}>
                    <div className={clsx["courseitem"]}> No</div>
                    <div className={clsx["courseitem"]}>Courses</div>
                    <div className={clsx["courseitem"]}>Category</div>
                    <div className={clsx["courseitem"]}>Subcategory</div>
                    <div className={clsx["courseitem"]}>Start Date</div>
                    <div className={clsx["courseitem"]}>Durations</div>
                    <div className={clsx["courseitem"]}>
                        {/* <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Fee</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="fee"
                            // onChange={handleChange}
                            >
                                <MenuItem value={30}>POUNDS</MenuItem>
                                <MenuItem value={10}>USD</MenuItem>
                                <MenuItem value={20}>EURO</MenuItem>
                                <MenuItem value={20}>NAIRA</MenuItem>
                            </Select>
                        </FormControl> */}

                        Fees
                    </div>
                    <div className={clsx["courseitem"]} />
                </div>

                <div className={clsx["coursebody"]}>
                    {/* {data?.length > 0 && data.sort(() => 0.5 - Math.random()).map((item, i) => ( */}
                    {/* {data?.length > 0 && data.filter(d => d.isActive).map((item, i) => ( */}
                    {all?.length > 0 && all?.filter((course) =>
                        course?.category
                            .toLowerCase()
                            .includes(search?.toLowerCase()) ||
                        course?.title
                            .toLowerCase()
                            .includes(search?.toLowerCase())
                    ).slice(0, 4).map((item, i) => (

                        <div className={clsx["coursecontent"]} key={i}>
                            <div className={clsx["courseitem"]}>
                                {i + 1}

                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.title}

                            </div>

                            <div className={clsx["courseitem"]}>

                                {item.category?.toLowerCase()}
                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.subCategory === "SHORT_COURSES" ? "Short Courses" :
                                    item.subCategory === "IN_DEMAND" ? "In-Demand Course" :
                                        item.subCategory === "UPSKILL_COURSES" ? "Upskill Course" :
                                            item.subCategory === "EXECUTIVE_COURSES" ? "Executive Course" : "Tech Enterpreneurship"}

                            </div>

                            <div className={clsx["courseitem"]}>
                                {item.startDate && getDate(item.startDate)}
                            </div>


                            <div className={clsx["courseitem"]}>
                                {item.duration}
                            </div>

                            <div className={clsx["courseitem"]}>
                                ${(item?.packages?.length === 0 && item.price) ? item.price : (item?.packages?.length > 0) && item.packages[0].price}

                            </div>

                            <div className={clsx["courseitem"]}>
                                <div className={clsx.classes_button}>
                                    <button className="d-flex align-items-center" onClick={() => gotoclass(item.title, item.category, item.bootcampId, navigate)}>
                                        <i><AiFillQuestionCircle style={{ fontSize: "1.1rem", color: "var(--theme-blue" }} /></i>
                                        <span>Learn more</span>
                                    </button>
                                    <button className="d-flex align-items-center" onClick={(e) => handleCourseSelect(e, item)}>
                                        <i><MdDownloadForOffline style={{ fontSize: "1.1rem" }} /></i>
                                        <span>Enroll</span>
                                    </button>
                                </div>
                            </div>


                        </div>
                    ))
                    }

                </div>

                {all?.length > 0 &&
                    <div className={clsx.seemore}>
                        <Link to={`/student/classes`}> See more <AiOutlineDoubleRight /></Link>
                    </div>
                }

            </div>




        </div>
    )
}


export function Community() {
    return (
        <div className={clsx.dashboard_community}>
            <h6>Community</h6>
            {[1, 2, 3].map(item => (
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
                            <span className={clsx.chat_icon}><IoMdChatboxes size="1.2rem" /></span>
                            <span className={clsx.chat_icon}>(5)</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export function DashboardTop({ content }) {
    return (
        <div className={clsx.students_profile_top}>
            <div className={` ${clsx.students_overview} d-flex justify-content-around align-items-center w-100`}>
                {
                    content.map(item => (
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
export function StudentLive() {
    return (
        <Students>
            <LiveClassInfo type="student" />
        </Students>
    )
}

export const Students = ({ children, isMobile, notification, userdata, header, loading }) => {
    const { generalState: { showSidebar }, generalState, setGeneralState, otherFunctions: { fetchCourses }, adminFunctions: { getUnreadMessages }, studentFunctions: { fetchNotifications, readNotifications, fetchWishlist } } = useAuth();
    const { getItem } = useLocalStorage()
    const userData = getItem(KEY)
    const location = useLocation()


    useEffect(() => {
        if (!userData?.token) return;
        (async () => {
            try {
                const res = await fetchNotifications(userData?.token);
                const { message, success, statusCode } = res;
                if (!success) throw new AdvancedError(message, statusCode);
                const { data } = res
                if (data.length > 0) {
                    const unread = data.filter((notification) => notification.isRead !== true)
                    setGeneralState({ ...generalState, notifications: unread.length })
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
            }
        })()
    }, [])

    const getCarts = useQuery(["carts"], () => fetchWishlist(userData?.token), {
        enabled: userData?.token !== null,
        onSuccess: (res) => {
            if (res?.data?.length > 0) {
                setGeneralState({ ...generalState, carts: res?.data?.length })
            }
        }
    });



    const toggleSidebar = () => {
        setGeneralState({ ...generalState, showSidebar: !showSidebar })
    }

    // const {isLoading, data} = useQuery(["get courses"], ()=> fetchCourses())


    // useEffect(() => {
    //     let isActive = true
    //     if (!pledredata?.email && pledre.getStudentDetails) {
    //         (async () => {
    //             try {
    //                 const response = await pledre.getStudentDetails(user?.email)
    //                 if (isActive) {
    //                     if (response?.email) {
    //                         setPledreData(() => response)
    //                         localStorage.setItem("gotocourse-userdata", JSON.stringify({ ...user, pledre: response }))
    //                     }
    //                 }

    //             } catch (err) {
    //                 console.error(err.message)
    //                 toast.error(err.message, {
    //                     position: "top-right",
    //                     autoClose: 4000,
    //                     hideProgressBar: true,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                 });
    //             }
    //         })()
    //     }

    //     return () => {
    //         isActive = false
    //     }
    // }, [pledre.baseUrl])


    const student = {
        title: "STUDENT",
        logo: <FaGraduationCap size="2.5rem" color="#0C2191" />
    }

    // fetch messages
    const getMessage = useQuery(["fetch student messages", userData?.token], () => getUnreadMessages(userData?.token), {
        enabled: userData?.token !== null,
        onError: (err) => {
            toast.error(err.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        },
        onSuccess: (res) => {
            if (res.data?.statusCode === 2) {
                localStorage.clear()
            }
            if (res.data?.statusCode !== 1) {
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

            const unread = res.data.data?.filter((messages) => messages.status === "unread")
            if (unread.length > 0) {
                // toast.info(`You have ${unread.length} messages `, {
                //     position: "top-right",
                //     autoClose: 3000,
                //     hideProgressBar: true,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // })
            }
        }
    })


    // for create

    const isCreator = userData?.userType === "schools"
    const last = location.pathname.split('/').length - 1
    const wishlist = location.pathname.split('/')[last] === "wishlist"
    // const wishlistCheckout = location.pathname.split('/')[last] === "wishlist-checkout"

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
                    {
                        !isCreator && !wishlist &&
                        <Navbar toggleSidebar={toggleSidebar} header={header} content={student} />
                    }

                    {children}

                </div>
                {loading &&
                    <Loader />
                }
            </div>
        </GuardedRoute>
    )
}

export function GotoDashboard() {
    const { getItem } = useLocalStorage();
    const { generalState, setGeneralState } = useAuth();
    const location = useLocation()
    const route = location.pathname.split("/")[1];
    const [loading, setLoading] = useState(false)

    async function gotodashboard() {
        const data = getItem(KEY)
        if (data.userType === "student" || data.userType === 'admin') {
            setLoading(true)
            if (generalState.pledre.loginUser) {
                try {
                    const response = await generalState.pledre.loginUser({
                        email: data.email,
                        // user_id: data.email,
                        user_type: route
                    })

                } catch (err) {
                    console.error(err)
                    toast.error("An error occured")
                } finally {
                    setLoading(false)
                }
            }
        } else if (data.pledre?.deleted === false && (data.accessPledre || data.canTeach)) {
            if (generalState.pledre.loginUser) {
                setLoading(true)
                try {
                    const response = await generalState.pledre.loginUser({
                        email: data.email,
                        // user_id: data.email,
                        user_type: route
                    })

                    console.log(response)
                } catch (err) {
                    console.error(err)
                    toast.error("An error occured")
                } finally {
                    console.log("done!!!")
                    setLoading(false)
                }
            }
        }
        else {
            throw new AdvancedError("User not authorized")
        }
    }
    return (
        <>
            <i className="d-lg-none" style={{ cursor: "pointer" }} onClick={gotodashboard} >
                {
                    loading ? <span className="spinner-border text-primary">
                        <span className="visually-hidden">loading</span>
                    </span>
                        :
                        <SiGoogleclassroom size="1.5rem" color="#0C2191" />
                }
            </i>
            <motion.button
                whileHover={{
                    // boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                    textShadow: "0px 0px 8px rgb(255, 255, 255)"
                }}
                className="dashboard_access_button d-flex justify-content-center align-items-center mb-0 text-white d-none d-lg-flex"
                style={{ padding: "10px 20px", borderRadius: "10px", background: "var(--secondary)", border: "1px solid var(--secondary)", fontSize: "14px", minWidth: "150px", }}
                onClick={gotodashboard}
                disable={true}
            >
                {loading ? <span className="spinner-border text-light">
                    <span className="visually-hidden">loading</span>
                </span>
                    :
                    <>
                        <i className="me-1 ">
                            <SiGoogleclassroom size="1.5rem" />
                        </i>
                        <span className="d-none d-md-block">Go to Class</span>
                    </>
                }
            </motion.button>
        </>
    )
}
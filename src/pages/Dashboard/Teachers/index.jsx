import { useEffect, useState, useRef } from "react";
import {  MdPersonAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box } from "@mui/material";
import {Stu1,Stu2, Stu3} from "../../../images/components/svgs"
import {useQuery} from "@tanstack/react-query"
import Loader from "../../../components/Loader";
import { Sidebar, Navbar } from "../components";
import clsx from "./styles.module.css";
import { colors, KEY } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";
import { GuardedRoute } from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";

import Layout from "../../../components/Layout";
import { CourseProfile } from "../../Courses";
import { Syllabus } from "./CreateCourse";
import ChatComponent from "../Admin/Chat";
import {NotificationContent} from "../Admin";

import { DashboardTop, Community } from "../Students";
import { FaChalkboardTeacher } from "react-icons/fa";




export {default as Courses} from "./Courses"
export {default as Profile} from "./Profile"
export {default as Classes} from "./Classes"
export {default as Bootcamps} from "./Bootcamps"
export {default as BootcampDetails} from "./BootcampDetails"
export {default as CreateCourse} from "./CreateCourse"
export {default as Earnings } from "./Earnings"



export function CourseInfo() {
  const navigate = useNavigate();
  const ref = useRef(false);
  const {id} = useParams()
  const { generalState: { courseInfo, loading }, generalState, setGeneralState, teacherFunctions: { fetchCourse, deleteCourse }, } = useAuth();

  const { getItem, updateItem } = useLocalStorage();
  let userdata = getItem(KEY);
  
  const [btnloading, setLoading]= useState(false)
  const [formstate, setFormstate] = useState({}); 

  async function handleCourseEdit(e){
    setGeneralState({...generalState, courseInfo: formstate})
    updateItem("gotocourse-courseEdit", formstate )

      navigate(`/teacher/courses/create?edit=${id}`)
  }
  // get Course info
  useEffect(() => {
    if (ref.current) return;
    if (userdata?.token) {
      (async () => {
        try {
          setGeneralState({...generalState, loading: true});
          const res = await fetchCourse(id, userdata?.token);
          const { success, message, statusCode } = res;
          if (!success || statusCode !== 1)
            throw new AdvancedError(message, statusCode);
          const { data } = res;
          setFormstate(data);
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
          setGeneralState({...generalState, loading: false});
        }
      })();
    }

    return () => ref.current = true;
  }, [id, userdata?.token]);

 
  return (
    <Teachers header="Course Details">
      <div className={clsx.teachers_profile}>
        <div className={clsx.edit__profile}>
          <h2>Course Information</h2>
          <form className="form">
            <Input
              label="Name of course"
              name="name"
              type="text"
              value={formstate.name}
              readOnly={true}
            />
            <div className={clsx.form_group}>
              <Input
                label="Category"
                name="category"
                type="text"
                  value={formstate.name}
                readOnly={true}
              />
            </div>
            <div className={clsx.form_group}>
              <label className="form-label generic_label" htmlFor={"description"}>
                Brief Description of course content
              </label>
              <textarea
                rows="5"
                name="description"
                value={formstate.description}
                className="generic_input"
                readOnly={true}
              ></textarea>
            </div>
            {/* <div className="d-flex flex-wrap" style={{ gap: ".5rem" }}>
              <div className="col-sm-4">
                <Input
                  label="Start Date"
                  name="startDate"
                  type="date"
                      value={formstate.start_date}
                  readOnly={true}
                />
              </div>
              <div className="col-sm-4">
                <Input
                  label="End Date"
                  name="endDate"
                  type="date"
                      value={formstate.end_date}
                  readOnly={true}
                />
              </div>
            </div> */}
            <div className={clsx.form_group}>
              <label htmlFor={"package"} className="form-label generic_label">
                Package
              </label>
              {formstate.packages?.length > 0 ? (
                formstate.packages?.map((item, index) => (
                  <Syllabus
                    key={item.title}
                    {...item}
                    packagelist={true}
                    index={index}
                    packageItems={formstate.packages}
                  />
                ))
              ) : (
                <h6>No Packages</h6>
              )}
            </div>
            {/* <Input
              label="Price"
              name="price"
              type="text"
              value={formstate.price}
              readOnly={true}
            /> */}

            <div className={clsx.form_group}>
              <label className="form-label generic_label">Syllabus</label>
              {formstate.syllabus?.length !== 0 ? (
                formstate.syllabus?.map(({ title, description }, i) => (
                  <Syllabus title={title} key={i} description={description} />
                ))
              ) : (
                <h6>No syllabus!</h6>
              )}
            </div>
            <div className={clsx.form_group}>
              <label htmlFor={"package"} className="form-label generic_label">
                FAQ
              </label>
              {formstate.faq?.length > 0 ? (
                formstate.faq?.map((item, i) => <Syllabus key={i} {...item} />)
              ) : (
                <h6>No faq</h6>
              )}
            </div>
            <div className="d-flex flex-wrap mt-3" style={{ gap: "1rem " }}>
                <button
                onClick={handleCourseEdit}
                  className="button log_btn"
                  style={{
                    padding: "10px 44px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                  type="button"
                >
                  Edit
                </button>
              {/* {btnloading ? (
                <button
                  className="btn btn-outline"
                  style={{
                    border:" 1px solid var(--theme-orange)",
                    padding: "10px 44px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
              <button
                className="btn btn-outline"
                type="button"
                onClick={deleteCourseInfo}
                style={{
                  border: "1px solid var(--theme-orange)",
                  color: "var(--theme-orange)",
                  padding: "10px 44px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Delete
              </button>
              )} */}
            </div>
          </form>
        </div>
      </div>
      
    </Teachers>
  );
}

export function PreviewModal({ preview, open, setOpen }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    minWidth: "95%",
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: "10px",
    boxShadow: 24,
    p: 6,
    padding: "4rem 2rem",
  };

  return (
    <Modal
      open={open}
      onClose={(e) => {
        setOpen((_) => false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <div
          className="position-relative"
          style={{
            height: "80vh",
            overflowY: "scroll",
          }}
        >
          <Layout>
            <CourseProfile preview={preview} />
          </Layout>
          <button
            className="btn btn-danger position-fixed"
            style={{ bottom: "8%", right: "5px", zIndex: "1200" }}
            onClick={() => setOpen(false)}
          >
            Close Preview
          </button>
        </div>
      </Box>
    </Modal>
  );
}


export function Edit() {
  const {
    setGeneralState,
    teacherFunctions: { updateAvatar, updateProfile },
  } = useAuth();

  const { updateItem, getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  const navigate = useNavigate();

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
    goals: userdata?.goals ?? "",
  });

  useEffect(() => {
    // to prevent data from disappearing on page reload
    // setFormstate({...formstate, ...userdata})
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formstate.firstName === "" ||
        formstate.lastName === "" ||
        formstate.brief_intro === "" ||
        formstate.location === "" ||
        formstate.profession === ""
      )
        throw new AdvancedError("All fields are required", 0);
      //submit updated profile
      const res = await updateProfile(formstate, userdata.token);
      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
        const newValue = {
          ...userdata,
          ...data,
        };
        userdata = updateItem(KEY, newValue);
        setGeneralState((old) => {
          return {
            ...old,
            notification: message,
          };
        });
        navigate("/teacher/");
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
      setLoading((_) => false);
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  function uploadPicture() {
    let input = document.getElementById("imageUpload");
    input.click();
  }

  function changeImageHandler(e) {
    let file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setImageUrl((_) => url);
    setFile((_) => file);
  }

  async function changeProfilePictureHandler(e) {
    setIsUploading((_) => true);
    try {
      let formdata = new FormData();
      formdata.append("image", file, file.name);

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
          profileImg,
        };
        userdata = updateItem(KEY, newValue);

        setImageUrl((_) => null);
        setFile((_) => null);

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
      setIsUploading((_) => false);
    }
  }

  return (
    <Teachers header="Edit Profile">
      <div className={clsx.teachers_profile}>
        <div className={clsx.edit__profile}>
          <h2>Update Profile</h2>
          <div className={clsx.edit__picture}>
            {userdata?.profileImg ? (
              <img src={imageUrl ?? userdata.profileImg} alt="Avatar" />
            ) : !imageUrl ? (
              <span>
                <MdPersonAdd />
              </span>
            ) : (
              <img src={imageUrl} alt="Avatar" />
            )}
            <input
              id="imageUpload"
              type="file"
              style={{ display: "none" }}
              onChange={changeImageHandler}
            />
            {imageUrl ? (
                isUploading ? 
                <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
               </div> : 

             <p
                style={{ cursor: isUploading && "not-allowed", color: "var(--theme-orange", fontWeight:"700" }}
                onClick={changeProfilePictureHandler}
              >
                Click to Upload Photo
              </p>
          
            ) : (
              <p onClick={uploadPicture} style={{ cursor: "pointer" }}>
               Select a photo to upload
              </p>
            )}
          </div>
          <div className={clsx.edit__picture}>
            <button
              style={{
                border: "1px dotted var(--theme-blue)",
                outline: "none",
                color: "var(--theme-blue)",
                padding: "4px",
                borderRadius: "8px",
              }}
              type="button"
              onClick={() => {
                navigate("/change-password");
              }}
            >
              Change Password
            </button>
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

            <div className={clsx.form_group}>
              <label htmlFor={"bio"}>Brief Introduction</label>
              <textarea
                rows="5"
                name="bio"
                value={formstate.bio}
                onChange={changeHandler}
                className="form-control generic_input"
              ></textarea>
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
              name="work"
              type="text"
              handleChange={changeHandler}
              value={formstate.work}
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
  );
}


// NOTIFICATION
export function Notification() {
  const {getItem} = useLocalStorage();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const [loader, setLoader] = useState(false);
  const [load, setLoad] = useState(false);
  const {generalState, setGeneralState,  studentFunctions: {fetchNotifications, readNotifications } } = useAuth(); 
  const [reload, setReload]= useState(false)
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if(flag.current) return;
      (async() => {
        try{
          setLoader(true)
          const res = await fetchNotifications(userdata?.token);
          const {message, success, statusCode} = res;
          if(!success) throw new AdvancedError(message, statusCode);
          const {data} = res
          if(data.length > 0) {
            setNotifications(data)
            const unread = data.filter((notification)=>notification.isRead !== true)
            setGeneralState({...generalState, notifications: unread.length})
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
          setLoader(_ => false);
        }
      })()
      flag.current = true;
  },[reload])
  
  async function markAsRead(e){
    e.preventDefault();
    try{
      setLoad(true)
      const res = await readNotifications(userdata?.token);
      const {message, success, statusCode} = res;
      if(!success) throw new AdvancedError(message, statusCode);
      const {data} = res
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
      setLoad(_ => false);
    }
  }

  return (
    <Teachers userdata={userdata} header="Notifications">
      <NotificationContent notifications={notifications} markAsRead={markAsRead} load={load} loader={loader} />
    </Teachers>
  );
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
    {
      active: false,
      name: "Admin",
    },
    {
      active: false,
      name: "Students",
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
 <Teachers userdata={userdata} header="Chat">
      {loader && <Loader />}
      <ChatComponent tabs={tabs} chatType={chatType} usertype="teacher" />
      </Teachers>
  );
}


function ClassesCard({ numberOfLessons, title, date, time, isLive, color }) {
  return (
    <div className={clsx.classes_card}>
      <div className={clsx.classes_card_first}>
        <div style={{ backgroundColor: color }} className={clsx.first_avatar}>
          <h2 style={{ margin: 0, fontWeight: "bolder", fontSize: "2rem" }}>
            {title[0]}
          </h2>
        </div>
        <div className={clsx.first_meta}>
          <h5 style={{ margin: 0 }}>{title}</h5>
          <p style={{ color: colors.gray, fontSize: "0.9rem" }}>
            {numberOfLessons} lessons
          </p>
        </div>
      </div>
      <div className={clsx.classes_card_second}>
        <span>{date}</span>
        <span style={{ fontWeight: "400" }}>{time}</span>
      </div>
      <div className={clsx.classes_card_third}>
        <button
          className={
            isLive
              ? `${clsx["third_btn"]} ${clsx["third_btn_live"]}`
              : clsx.third_btn
          }
        >
          Live
        </button>
        <button className={clsx.third_btn}>Completed</button>
      </div>
    </div>
  );
}
export const Dashboard = ()=>{

  const navigate = useNavigate();
  const { generalState: { isMobile }, teacherFunctions: { fetchApplications, fetchCourses, earnings , fetchBootcamps, fetchMyStudents}, } = useAuth();

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  // const {isLoading, isError, isSuccess, data, error} = useQuery(["teacher courses"], () => fetchCourses(userdata.token))
  const {isLoading, isError, isSuccess, data, error} = useQuery(["teacher bootcamp"], () => fetchBootcamps(userdata.token))

  const {data:studentData} = useQuery(["teacher students"], () => fetchMyStudents(userdata.token))
  

  if(data?.statusCode === 0){
    toast.error(data?.message, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: true,
    });
  }

    const topContent =[
      {
          id:1,
          title:"Students",
          logo: <Stu1 />,
          value: 0
      },
      {
          id:2,
          title:"Classes",
          logo: <Stu2 />,
          value:  0
      },
      {
          id:3,
          title:"Earnings",
          logo: <Stu3 />,
          value: "$0"
      }
  ]

  
  if(data?.data){
    topContent[1].value = data.data.length
  }
  
  if(studentData?.data?.length > 0){
    let myStudents = new Set()

    studentData.data.forEach(student => myStudents.add(student.studentId))
    topContent[0].value = myStudents.size
  }


  return (
    <Teachers isMobile={isMobile} userdata={userdata} header="Dashboard">
    <div className={clsx.teachers_profile}>
    <DashboardTop content={topContent} />
      <div className={clsx.teachers_profile_dashboard}>
        <div className={`d-flex justify-content-between ${clsx.dashboard_courses}`}>
          <div className={clsx["dashboard_courses--left"]}>
              <h6>My Classes</h6>
              <ul>
                  {
                      // data?.data?.length === 0 ?  
                      //   <li>
                      //     <p className="text-muted">You haven't registered for a course</p>
                      //   </li> 
                      //   :
                    data?.data?.map((item, i)=>(
                          <li key={item.bootcampId} className={` ${clsx["dashboard_class--wrapper"]}`}>
                              <div className={clsx["dashboard_class--details"]}>
                                <p>{item.title}</p>
                                <p>{item.startTime}</p>
                              </div>
                              <div className={`d-flex justify-content-between ${clsx["dashboard_class--action"]}`}>
                                <button className={`btn-plain ${clsx.completed}`}>Completed</button>
                                <button className={`button button-md ${clsx.live}`}>Live</button>
                              </div>
                          </li>
                      ))
                    
                  }
              </ul>
          </div>
          {/* <div className={clsx["dashboard_courses--right"]}>
              <h6>My Classes</h6>
              <ul>
                  {
                      data?.data?.length === 0 || !data?.data ?  
                      <p className="text-muted">You haven't created a course</p>
                      :
                      data?.data?.map((item, i)=>(
                          <li key={i}>{item.name}</li>
                      ))
                  }
              </ul>
          </div> */}
        </div>
      {/* <Community /> */}
      </div>
    </div>
  </Teachers>
  )
}


export const Teachers = ({ children, isMobile, userdata, notification, header, loading }) => {
  const {
    generalState: { showSidebar },
    generalState,
    setGeneralState,
    adminFunctions: {getUnreadMessages}, studentFunctions: {fetchNotifications }, teacherFunctions:{fetchProfile}
  } = useAuth();

  const {getItem, updateItem} = useLocalStorage()

  const userData = getItem(KEY)
  const flag = useRef(false);

  async function getProfile() {
    setGeneralState({ ...generalState, loading: true });
    try {
      let data = await fetchProfile(userdata?.token);
      setGeneralState({ ...generalState, loading: false });

      const { success, message, statusCode } = data;
      if (!success || statusCode !== 1)
        throw new AdvancedError(message, statusCode);
      else {
        const { data: d } = data;
        const newValue = {
          ...userdata,
          ...d,
        };
        userdata = updateItem(KEY, newValue);
        setGeneralState((old) => {
          return {
            ...old,
            userdata: { ...old.userdata, ...d },
          };
        });
      }
    } catch (err) {

    }
  }
  useEffect(() => {
    if(flag.current) return;
      (async() => {
        try{
          const res = await fetchNotifications(userData?.token);
          if(res){
            const {message, success, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            const {data} = res
            if(data.length > 0) {
              const unread = data.filter((notification)=>notification.isRead !== true)
              setGeneralState({...generalState, notifications: unread.length})
            }else {
              setGeneralState({...generalState, notifications: 0})
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

      if(userdata?.token){
        getProfile()
      }
      flag.current = true;
  }, []);


  const toggleSidebar = () => {
    setGeneralState({ ...generalState, showSidebar: !showSidebar });
  };


  const teacher = {
    title: "TEACHER",
    logo: <FaChalkboardTeacher size="2.5rem" color="#0C2191" />
}

// fetch messages
const getMessage = useQuery(["fetch admin messages", userData?.token], ()=>getUnreadMessages(userData?.token), {
  enabled: !!userData?.token,
  onError: (err)=> {
    toast.error(err.message)
  },
  onSuccess: (res)=>{
    
    if(res.data?.statusCode === 2 ){
      return
    }
    if(res.data?.statusCode !== 1){
      toast.error(res.data?.message);
    }

    const unread = res.data.data?.filter((messages)=>messages.status === "unread")
    if(unread.length > 0){
      // toast.info(`You have ${unread.length} messages` )
    }
  }
})


  // for create 
  const isCreator = userdata?.userType === "schools"
  return (
    <GuardedRoute>
      <div className={clsx.teachers}>
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
        <Sidebar isMobile={isMobile} />
        <div className={clsx.teachers_main}>
          {
            !isCreator &&
            <Navbar content={teacher}  toggleSidebar={toggleSidebar} header={header} />
          }
          {children}
        </div>
        {loading && <Loader />}
      </div>
    </GuardedRoute>
  );
};

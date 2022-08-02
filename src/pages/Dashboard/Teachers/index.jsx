import { useEffect, useState, useRef } from "react";
import { MdEdit, MdPersonAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box, Typography } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";

import Loader from "../../../components/Loader";
import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";
import { GuardedRoute } from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";

import Layout from "../../../components/Layout";
import { CourseProfile } from "../../Courses";
import { Syllabus } from "./CreateCourse";

// import { PreviewModal } from "../components/Preview";

const KEY = "gotocourse-userdata";


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
  async function deleteCourseInfo(e) {
    e.preventDefault();
    setLoading(true);
    try {    
      const res = await deleteCourse(userdata?.token, id);
      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate(-1)
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

  // get Course info
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (ref.current) return;
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

      ref.current = true;
    }

    return () => (mounted = false);
  }, [id]);

 
  return (
    <Teachers>
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
    <Teachers>
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
                style={{ cursor: isUploading && "not-allowed" }}
                onClick={changeProfilePictureHandler}
              >
                Change Picture
              </p>
          
            ) : (
              <p onClick={uploadPicture} style={{ cursor: "pointer" }}>
                Upload Photo
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

export const Teachers = ({ children, isMobile, userdata, notification }) => {
  const {
    generalState: { showSidebar, loading },
    generalState,
    setGeneralState,
  } = useAuth();
  useEffect(() => {
    if (notification) {
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
  }, []);

  const toggleSidebar = () => {
    setGeneralState({ ...generalState, showSidebar: !showSidebar });
  };

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
          <div className={`align-items-center ${clsx.teachers_topbar}`}>
            <div className="d-md-none">
              <i>
                <AiOutlineMenu
                  style={{ fontSize: "24px", color: "#0C2191" }}
                  onClick={toggleSidebar}
                />
              </i>
            </div>
            <h1 className={clsx.teachers__header}>
              {userdata?.firstName} {userdata?.lastName}
            </h1>
            <Searchbar showIcon={true} placeholder="Search" />
          </div>

          {children}
        </div>
        {loading && <Loader />}
      </div>
    </GuardedRoute>
  );
};

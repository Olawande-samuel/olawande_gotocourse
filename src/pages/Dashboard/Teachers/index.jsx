import { useEffect, useState } from "react";
import { MdEdit, MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box, Typography } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";

import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png";
import { useAuth } from "../../../contexts/AuthContext";
import { GuardedRoute } from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { UserInfoCard } from "../Admin";
import { useCookie } from "../../../hooks";




export function Profile() {
  const { saveCookie, updateCookie, isCookie } = useCookie();
  const {
    generalState: { isMobile, notification, userdata },
    setGeneralState,
    teacherFunctions: { fetchProfile },
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setGeneralState((old) => {
        return {
          ...old,
          notification: null,
        };
      });
    }, 5000);
  }, []);

  useEffect(() => {
    if (userdata) {
      async function get() {
        try {
          let data = await fetchProfile(userdata?.token);
          const key = "gotocourse-profiledata";
          const {success, message, statusCode} = data;
          if(!success) throw new Error(message, statusCode);
          else {
            const {data: d} = data;
            if(isCookie(key)){
              updateCookie(key, d);
            }else {
              saveCookie(key, d);
            }
            setGeneralState((old) => {
              return {
                ...old,
                userdata:{...old.userdata, ...d},
              };
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
      }
      get();
    }
  }, [userdata?.token]);

  const info = [
    {
      title: "Brief Introduction",
      content: "Enjoys writing and playing video games",
    },
    {
      title: "Location",
      content: "Lagos, Nigeria",
    },
    {
      title: "Courses",
      content: "UX Designer",
    },
    {
      title: "Category",
      content: "Cybersecurity, UX, Data Analysis",
    },
  ];
  function editProfileHandler(e) {
    navigate("/teacher/profile/edit");
  }
  return (
    <Teachers
      isMobile={isMobile}
      userdata={userdata}
      notification={notification}
    >
     
      <div className={clsx.teachers_profile}>
        <div className={clsx.teachers_profile_top}>
          <div className={clsx.teachers_profile_top_img}>
            <img
              src={userdata?.profileImg ? userdata.profileImg : avatar}
              style={{ borderRadius: 10 }}
              width="100%"
              alt="Avatar"
            />
          </div>
          <button
            className={clsx.teachers_profile_top_button}
            onClick={editProfileHandler}
          >
            <MdEdit /> &nbsp; Edit
          </button>
        </div>
        <div className={clsx.teachers_profile_main}>
          <h1 className={clsx.teachers__header} style={{ marginTop: 20 }}>
            {userdata?.firstName} {userdata?.lastName}
          </h1>

          <div className={clsx.teachers__profile_info}>
            {info.map(({ title, content }, i) => (
              <Info title={title} content={content} key={i} />
            ))}
          </div>
        </div>
      </div>
    </Teachers>
  );
}

function Info({ title, content }) {
  return (
    <div className={clsx.teachers__info}>
      <span className={clsx.teachers__info_title}>{title}</span>
      <span className={clsx.teachers__info_content}>{content}</span>
    </div>
  );
}

export function CreateCourse() {
  const {
    generalState: { isMobile, notification, userdata },
    setGeneralState,
    teacherFunctions: { addCourse },
  } = useAuth();

  const [formstate, setFormstate] = useState({
    name: "",
    categoryName: "",
    brief: "",
    price: "",
    package: "",
    syllabus: [],
  });

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const packages = [
    {
      value: "cohort",
      name: "Cohort",
    },
    {
      value: "self-paced",
      name: "Self paced",
    },
    {
      value: "one-one",
      name: "One-One Mentorship",
    },
    // {
    //     value: "FLAT",
    //     name: "Flat"
    // },
    // {
    //     value: "PACKAGE",
    //     name: "Package"
    // },
  ];

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formstate.name === "" ||
        formstate.brief === "" ||
        formstate.price === "" ||
        formstate.package === ""
      )
        throw new AdvancedError("All fields are required", 0);

      const res = await addCourse(formstate, userdata.token);
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

  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Teachers>
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
            <Input
              label="Category"
              name="categoryName"
              type="text"
              handleChange={changeHandler}
              value={formstate.categoryName}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"brief"}>
                Brief Description of course content
              </label>
              <textarea
                rows="5"
                name="brief"
                value={formstate.brief}
                onChange={changeHandler}
                className="generic_input"
              ></textarea>
            </div>

            <div className={clsx.form_group}>
              <label htmlFor={"package"}>Type</label>
              <select
                rows="5"
                name="type"
                value={formstate.type}
                onChange={changeHandler}
                className="form-select generic_input"
              >
                <option value="">Choose a Type</option>
                <option value="FLAT">Flat</option>
                <option value="PACKAGE">Package</option>
              </select>
            </div>
            <div className={clsx.form_group}>
              <label htmlFor={"package"}>Package</label>
              <select
                rows="5"
                name="package"
                value={formstate.package}
                onChange={changeHandler}
                className="form-select generic_input"
              >
                <option value="">Choose a package</option>
                {packages.map(({ name, value }, i) => (
                  <option value={value} key={i}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Price"
              name="price"
              type="text"
              handleChange={changeHandler}
              value={formstate.price}
            />
            <button
              className="btn btn-primary my-3"
              style={{ backgroundColor: "var(--theme-blue)" }}
              type="button"
              onClick={openModal}
            >
              Add Syllabus
            </button>

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
      <AddSyllabus
        open={open}
        setFormstate={setFormstate}
        formstate={formstate}
        setOpen={setOpen}
        handleClose={handleClose}
      />
    </Teachers>
  );
}

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

function AddSyllabus({ open, handleClose, setFormstate, formstate }) {
  const [newSyllabus, setNewSyllabus] = useState({
    title: "",
    description: "",
  });
  const addSyllabus = (e) => {
    e.preventDefault();
    setFormstate((old) => {
      return {
        ...old,
        syllabus: [...old.syllabus, newSyllabus],
      };
    });
    setNewSyllabus({
      title: "",
      description: "",
    });
    if (formstate.syllabus.length > 0) {
      toast.success("Syllabus added successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  function handleChange(e) {
    setNewSyllabus({ ...newSyllabus, [e.target.name]: e.target.value });
  }
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <h5
          className="lead text-primary"
          style={{ color: "var(--theme-blue)" }}
        >
          Add Syllabus
        </h5>
        <Input
          label="Title"
          name="title"
          type="text"
          handleChange={handleChange}
          value={newSyllabus.title}
        />
        <div className="form-group my-3">
          <label htmlFor="description" className="form-label generic_label">
            Description
          </label>
          <textarea
            rows="5"
            id="description"
            name="description"
            className="form-control generic_input"
            value={newSyllabus.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="btn btn-primary my-3"
          onClick={addSyllabus}
          style={{ backgroundColor: "var(--theme-blue)" }}
        >
          Add
        </button>
      </Box>
    </Modal>
  );
}

export function Edit() {
  const {
    generalState: { isMobile, userdata },
    teacherFunctions: { updateAvatar, updateProfile },
  } = useAuth();
  const [imageUrl, setImageUrl] = useState(null);
  const [isUplaoding, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formstate, setFormstate] = useState({
    firstname: userdata?.firstName ?? "",
    lastname: userdata?.lastName ?? "",
    brief_intro: "",
    location: "",
    profession: "",
    category: "",
  });

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formstate.firstname === "" ||
        formstate.lastname === "" ||
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
      // setTimeout(() => {}, 2000);
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
              <p
                style={{ cursor: isUplaoding && "not-allowed" }}
                onClick={changeProfilePictureHandler}
              >
                Change Picture
              </p>
            ) : (
              <p onClick={uploadPicture} style={{cursor: "pointer"}}>Upload Photo</p>
            )}
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
              <textarea
                rows="5"
                name="brief_intro"
                value={formstate.brief_intro}
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
  );
}

export function Classes() {
  const {
    generalState: { isMobile, userdata },
  } = useAuth();
  const data = [
    {
      title: "CyberSecurity",
      numberOfLessons: 10,
      date: "Apr 5",
      time: "5pm",
      isLive: false,
      color: colors.info,
    },
    {
      title: "Branding",
      numberOfLessons: 10,
      date: "Apr 5",
      time: "5pm",
      isLive: true,
      color: colors.greenish,
    },
  ];
  return (
    <Teachers isMobile={isMobile} userdata={userdata}>
      <div className={clsx.teachers_profile}>
        <div className={clsx.classes}>
          {data.map(
            ({ numberOfLessons, title, date, time, isLive, color }, i) => (
              <ClassesCard
                numberOfLessons={numberOfLessons}
                key={i}
                title={title}
                date={date}
                time={time}
                isLive={isLive}
                color={color}
              />
            )
          )}
        </div>
      </div>
    </Teachers>
  );
}

export function Courses() {
  const {
    generalState: { isMobile, userdata },
    teacherFunctions: { fetchCourse },
  } = useAuth();
  const { fetchCookie } = useCookie();

  console.log(userdata);

  async function fetchCourses(params) {
    const { userId } = fetchCookie("gotocourse-profiledata");
    try {
      const response = await fetchCourse(userId, userdata.token);
      console.log(response);
      const {success, statusCode, message} = response;

      if(!success) {
        throw new AdvancedError(message, statusCode);
      } 
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
}
  useEffect(() => {
    fetchCourses();
  }, []);
  const navigate = useNavigate();
  const tableHeaders = ["No", "Courses", "Name", "Package", "Rating"];
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
  ];

  function createCourseHandler(e) {
    navigate("create");
  }
  return (
    <Teachers isMobile={isMobile} userdata={userdata}>
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
        <button
          className="button button-md log_btn w-30 mb-5"
          type="button"
          onClick={createCourseHandler}
        >
          Create Course
        </button>
        <table className={clsx.teachers_table}>
          <thead>
            {tableHeaders.map((el, i) => (
              <td key={i}>{el}</td>
            ))}
          </thead>
          <tbody>
            {tableContents.map(({ name, package: p, course, rating }, i) => (
              <UserInfoCard
                key={i}
                name={name}
                num={i}
                comp={"Courses"}
                rating={rating}
                pack={p}
                course={course}
              />
            ))}
          </tbody>
        </table>
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

const Teachers = ({ children, isMobile, userdata, notification }) => {
  const {
    generalState: { showSidebar },
    generalState,
    setGeneralState,
  } = useAuth();
  useEffect(() => {
    console.log("Teachers component is mounted");
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
      </div>
    </GuardedRoute>
  );
};

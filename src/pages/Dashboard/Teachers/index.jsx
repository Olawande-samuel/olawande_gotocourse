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
import { useAuth } from "../../../contexts/Auth";
import { GuardedRoute } from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { UserInfoCard } from "../Admin";
import { useCookie } from "../../../hooks";
import {useSyllabus} from "../../../contexts/Syllabus"; 
import { Chart as ChartLogo} from "../../../images/components/svgs";
import Chart from "../../../components/Chart";


const KEY = "gotocourse-userdata"

export function Profile() {
  const { generalState: { isMobile, notification, userdata }, setGeneralState, teacherFunctions: { fetchProfile }, } = useAuth();
  const [userInfo, setUserInfo]= useState([
    {
      title: "Brief Introduction",
      content: userdata?.bio ?? "",
    },
    {
      title: "Location",
      content: userdata?.location ?? "",
    },
    {
      title: "Courses",
      content: "UX Designer",
    },
    {
      title: "Category",
      content: "Cybersecurity, UX, Data Analysis",
    },
  ])
  const { saveCookie, updateCookie, isCookie } = useCookie();
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
          const key = "gotocourse-userdata";
          const {success, message, statusCode} = data;
          if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
          else {
            const {data: d} = data;
            console.log(d);
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
              <Info title="Brief Introduction" content={userdata?.bio}  />
              <Info title="Location" content={userdata?.location}  />
              <Info title="Courses" content={userdata?.courses}  />
              <Info title="Category" content={userdata?.category}  />
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

const Syllabus = ({title, description}) => {
  return(
    <div className={clsx.syllabus_container}>
      <h5>{title}</h5>
      <p>{description}</p>
    </div>
  )
}

export function CreateCourse() {
  const {
    generalState: { isMobile, notification, userdata },
    setGeneralState,
    teacherFunctions: { addCourse },
  } = useAuth();
  const {syllabuses, addtoSyllabus} = useSyllabus();
  const [formstate, setFormstate] = useState({
    name: "",
    categoryName: "",
    description: "",
    faqs: [],
  });
  const [packageState, setPackageState] = useState({
    title: "",
    description: "",
    price: ""
  })

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

  function changePackageStateHandler(e){
    const {name, value} = e.target;
    setPackageState(old => {
      return{
        ...old,
        [name]: value
      }
    })
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    console.log([{...formstate, syllabus: [...syllabuses], packages: [packageState]}]);
    try {
      if (
        formstate.name === "" ||
        formstate.categoryName === "" ||
        formstate.description === "" ||
        packageState.price === "" ||
        packageState.title === ""
      )
        throw new AdvancedError("All fields are required", 0);
      const res = await addCourse({...formstate, syllabus: [...syllabuses], packages: [packageState]}, userdata.token);
      const { success, message, statusCode } = res;
      console.log(res);

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
                name="description"
                value={formstate.description}
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
                name="title"
                value={packageState.title}
                onChange={changePackageStateHandler}
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
              handleChange={changePackageStateHandler}
              value={packageState.price}
            />


              <div className={clsx.form_group}>
              <label>Syllabus</label>
              {
                syllabuses.length !== 0 ? syllabuses.map(({title, description}, i) => (
                  <Syllabus title={title} key={i} description={description} />
                )) : <h4>No syllabus!</h4>
              }
            </div>

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
        addSyllabus={addtoSyllabus}
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

function AddSyllabus({ open, handleClose, addSyllabus }) {
  const [newSyllabus, setNewSyllabus] = useState({
    title: "",
    description: "",
  });
  function handleChange(e) {
    const {name, value} = e.target;
    setNewSyllabus(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  function addSyllabusHandler(){
    const {title, description} = newSyllabus;
    if(!title || !description) {
      toast.error("Title and Description are required", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else {
      addSyllabus(newSyllabus);
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
        {/* <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
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
          onClick={addSyllabusHandler}
          style={{ backgroundColor: "var(--theme-blue)" }}
        >
          Add
        </button>
      </Box>
    </Modal>
  );
}

export function Edit() {
  const { generalState: { isMobile, userdata }, setGeneralState, teacherFunctions: { updateAvatar, updateProfile }, } = useAuth();
  const {fetchCookie} = useCookie()
  const navigate = useNavigate();
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
  });

  
  useEffect(() => {
    // to prevent data from disappearing on page reload
    const previousData = fetchCookie(KEY)
    setFormstate({...formstate, ...previousData})
  }, [])


  console.log(formstate)
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
        const {data} = res;
        console.log(data);
        setGeneralState(old => {
            return {
                ...old,
                userdata: data,
                notification: message
            }
        })
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



export function Classes() {
  const navigate = useNavigate();
  const { generalState: { isMobile, userdata }, } = useAuth();
  const tableHeaders = ["No", "Course Name", "Number Enrolled","Teaching Model", "Status"];
  const data = [
    {
      title: "CyberSecurity",
      enrolled: 10,
      date: "Apr 5",
      model: "cohort",
      status: "live",
    },
    {
      title: "Branding",
      enrolled: 15,
      date: "Apr 5",
      model: "cohort",
      status: "Completed",
    },
    {
      title: "UI/UX",
      enrolled: 19,
      date: "Apr 5",
      model: "cohort",
      status: "live",
    },
    {
      title: "Data Science",
      enrolled: 8,
      date: "Apr 5",
      model: "One-on-One",
      status: "Completed",
    },
  ];
  
  return (
    <Teachers isMobile={isMobile} userdata={userdata}>
      <div className={clsx.teachers_profile}>
        <table className={clsx.teachers_table}>
          <thead>
            <tr>
            {tableHeaders.map((el, i) => (
              <th key={i}>{el}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {data.map(({ title, enrolled, model, status }, i) => (
              <UserInfoCard
                key={i}
                num={i}
                comp={"Teacher"}
                course={title}
                enrolled={enrolled}
                pack={model}
                course_status={status}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Teachers>
  );
}
export function Earnings() {
  const navigate = useNavigate();
  const { generalState: { isMobile, userdata }, } = useAuth();
  const tableHeaders = ["No", "Course Name", "Number Enrolled","Teaching Model", "Status"];
  const data = [
    {
      title: "CyberSecurity",
      enrolled: 10,
      date: "Apr 5",
      model: "cohort",
      status: "live",
    },
    {
      title: "Branding",
      enrolled: 15,
      date: "Apr 5",
      model: "cohort",
      status: "Completed",
    },
    {
      title: "UI/UX",
      enrolled: 19,
      date: "Apr 5",
      model: "cohort",
      status: "live",
    },
    {
      title: "Data Science",
      enrolled: 8,
      date: "Apr 5",
      model: "One-on-One",
      status: "Completed",
    },
  ];
  function createCourseHandler(e) {
    navigate("create");
  }
  return (
    <Teachers isMobile={isMobile} userdata={userdata}>
      <div className={clsx.teachers_profile}>
        <div className="d-flex flex-wrap justify-content-center justify-content-md-start" style={{ gap:"1.5rem"}}>
          <EarningsCard title="Teaching Model" type="COHORT" value="12,923" />
          <EarningsCard title="Per Course" type="Cybersecurity" value="2,923" />
          <EarningsCard total={true} value="100,000" />
        </div>
        <Chart />
      </div>
    </Teachers>
  );
}


export function EarningsCard({title, type, options=[], total, value}){
  return (
    <div className="earnings_card">
      <p className="text">{title}</p> 
      <div className="card">
        <div className="card-body">
          <div>
            {total ? 
          <h3>TOTAL</h3>   :
          <select name="model" id="model" className="form-select w-75">
            <option defaultValue>{type}</option>
            <option defaultValue>COHORT</option>
            <option defaultValue>COHORT</option>
            <option defaultValue>COHORT</option>
          </select>
          }
          </div>
          <div className="d-flex align-items-center justify-content-around">
            <h1 className="earnings_card_total"> <small>$</small>{value}</h1>
              <i><ChartLogo /></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Courses() {
  const {
    generalState: { isMobile, userdata },
    teacherFunctions: { fetchCourse, fetchApplications },
  } = useAuth();
  const { fetchCookie } = useCookie();
  const [courses, setCourses] = useState([]);

  console.log(userdata);

  useEffect(() => {

    //fetch courses
    (async() => {
      try{
        console.log(userdata);
        const res = await fetchApplications(userdata?.token);
        const {success, message, statusCode} = res;
        if(!success) throw new AdvancedError(message, statusCode);
        else {
          const {data} = res;
          console.log(data);
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
  }, []);
  const navigate = useNavigate();
  const tableHeaders = ["No", "Courses", "Teaching Model", "Starting Date", "Status"];
  const tableContents = !courses?.length ? [
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
  ] : courses;

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
            <tr>
            {tableHeaders.map((el, i) => (
              <th key={i}>{el}</th>
            ))}
            </tr>
          </thead>
          <tbody>
            {tableContents.map(({ name, package: p, course, rating, status }, i) => (
              <UserInfoCard
                key={i}
                // name={name}
                num={i}
                comp={"Teacher"}
                // approveHandler=
                start_date="1/12/20"
                course_status={rating}
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

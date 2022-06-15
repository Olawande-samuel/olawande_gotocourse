import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { Grid, Switch, Paper, Modal, Box } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";

import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";

import avatar from "../../../images/teacher.png";
import { useAuth } from "../../../contexts/Auth";
import { useSyllabus } from "../../../contexts/Syllabus";
import img01 from "../../../images/mentor1.png";
import img02 from "../../../images/mentor2.png";
import { GuardedRoute } from "../../../hoc";
import { AdvancedError } from "../../../classes";
import {useLocalStorage} from "../../../hooks";

import Input from "../../../components/Input";
import Loader from "../../../components/Loader";
import UploadForm from "../../../components/UploadForm";
import img from "../../../images/coding.png";
import { Rating } from "react-simple-star-rating";




const KEY = "gotocourse-userdata";
function CategoryInterface({name, bannerImg, description}){
  return (
    <Grid item xs={12} sm={12} md={6} lg={6}>
      <Paper className={clsx.catergory__interface}>
        <div className={clsx.category__image}>
          <img src={img} alt="Banner" />
        </div>
        <h5>{name}</h5>
        <p>{description}</p>
        <div className={clsx.category_more__info}>
          <button>Expand</button>
        </div>
      </Paper>
    </Grid>
  )
}


export function Category(){
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false);
  const {adminFunctions: {addCategory, fetchCategories}} = useAuth();
  const {getItem} = useLocalStorage();
  const flag = useRef(false);
  const userdata = getItem(KEY)
  useEffect(() => {
    if(flag.current) return;
    (async () => {
      try{
        const res = await fetchCategories(userdata?.token);
        const {success, statusCode, message} = res;
        console.log(res);
        // if(statusCode === 2) {
        //   navigate("/login");
        // }
        if(!success) throw new AdvancedError(message, statusCode);
        else {
          if(res?.data){
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
            setCategories(_ => data);
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
    flag.current = true;
  }, [])
  return (
    <Admin header="Course Categories">
      <UploadForm isOpen={open} setIsOpen={setOpen} />
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
            {/* <button onClick={() => setOpen(_ => true)}>Upload File</button> */}
            <button onClick={(e) => navigate("new")}>Create Category</button>
            <Grid container spacing={4}>
              {
                categories ? categories.map((
                {bannerImg, careerDescription, careerList, 
                  name, description, iconImg, categoryId, 
                  niche: nicheTitle, nicheDescription, 
                  nicheItems
                }, i) => (
                  <CategoryInterface key={i} name={name} bannerImg={bannerImg} description={description} />
                )) : <h3>No categories found</h3>
              }
            </Grid>
          </div>
        {/* </div> */}
      </div>
    </Admin>
  )
}


function NicheModal({newNiche, updateNiche, open, setOpen, handleChange}){

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


  return (
    <Modal
      open={open}
      onClose={e => {
        setOpen(_ => false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <h5
          className="lead text-primary"
          style={{ color: "var(--theme-blue)" }}
        >
          Add Niche
        </h5>
        <Input
          label="Title"
          name="name"
          type="text"
          handleChange={handleChange}
          value={newNiche.name}
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
            value={newNiche.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <button
          className="btn btn-primary my-3"
          onClick={updateNiche}
          style={{ backgroundColor: "var(--theme-blue)" }}
        >
          Add
        </button>
      </Box>
    </Modal>
  )
}

function CareerModal({newCareer, updateCareer, open, setOpen, handleChange}){

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


  return (
    <Modal
      open={open}
      onClose={e => {
        setOpen(_ => false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box style={style}>
        <h5
          className="lead text-primary"
          style={{ color: "var(--theme-blue)" }}
        >
          Add Career
        </h5>
        <Input
          label="Name"
          name="name"
          type="text"
          handleChange={handleChange}
          value={newCareer.name}
        />
        <button
          className="btn btn-primary my-3"
          onClick={updateCareer}
          style={{ backgroundColor: "var(--theme-blue)" }}
        >
          Add
        </button>
      </Box>
    </Modal>
  )
}

const Syllabus = ({title, description}) => {
  return(
    <div className={clsx.syllabus_container}>
      <h5>{title}</h5>
      {description && <p>{description}</p>}
    </div>
  )
}



export function CreateCourseCategory(){
  const {adminFunctions: {addCategory}} = useAuth();
  const {getItem} = useLocalStorage();
  const userdata = getItem(KEY);
  const [open, setOpen] = useState(false);
  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showNicheModal, setShowNicheModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formstate, setFormstate] = useState({
    name: "",
    description: "",
    niche: "",
    nicheDescription: "",
    careerDescription: "",
    bannerImg: "",
    iconImg: ""
  });
  
  const [nichelist, setNichelist] = useState({
    name: "",
    description: ""
  })
  const [nichelists, setNichelists] = useState([]);
  const [careerlist, setCareerlist] = useState({
    name: "",
  })
  const [careerlists, setCareerlists] = useState([]);

  async function submitHandler(e){
    e.preventDefault();
    setLoading(_ => true);
    try{
      const data = {
        ...formstate,
        nicheItems: [...nichelists],
        careeerList: [...careerlists]
      }
      const res = await addCategory(data, userdata?.token);
      const {success, message, statusCode} = res;
      if(!success) throw new AdvancedError(message, statusCode);
      else {
        if(res?.data){
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
  function nicheChangeHandler(e){
    const {name, value} = e.target;
    setNichelist(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }
  function careerChangeHandler(e){
    const {name, value} = e.target;
    setCareerlist(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }


  function updateNicheHandler(e){
    if(nichelist.name.trim() !== "" || nichelist.description.trim() !== ""){
      setNichelists(old => {
        return [...old, nichelist]
      })
      setNichelist(_ => {
        return {
          name: "",
          description: ""
        }
      })
      setShowNicheModal(_ => false);
      toast.success("Niche added successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else {
      toast.error("All fields are required", {
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


  function updateCareerHandler(e){
    if(careerlist.name.trim() !== "" || careerlist.description.trim() !== ""){
      setCareerlists(old => {
        return [...old, careerlist]
      })
      setCareerlist(_ => {
        return {
          name: "",
        }
      })
      setShowCareerModal(_ => false);
      toast.success("Career added successfully", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else {
      toast.error("All fields are required", {
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


  return(
    <Admin header="Create Category">
       <UploadForm isOpen={open} setIsOpen={setOpen} />
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
            <button onClick={() => setOpen(_ => true)}>Upload File</button> 
            <form className="form" onSubmit={submitHandler}>
            <Input
              label="Name of category"
              name="name"
              type="text"
              handleChange={changeHandler}
              value={formstate.name}
            />
            <Input
              label="Description"
              name="description"
              type="text"
              handleChange={changeHandler}
              value={formstate.description}
            />
            <Input
              label="Niche"
              name="niche"
              type="text"
              handleChange={changeHandler}
              value={formstate.niche}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"brief"}>
                Niche Description
              </label>
              <textarea
                rows="5"
                name="nicheDescription"
                value={formstate.nicheDescription}
                onChange={changeHandler}
                className="generic_input"
              ></textarea>
            </div>
            <div className={clsx.form_group}>
              <label>Niche(s)</label>
              {
                nichelists.length !== 0 ? nichelists.map(({name, description}, i) => (
                  <Syllabus key={i} title={name} description={description} />
                )) : <h5>No Niche(s)!</h5>
              }
            </div>
            <button type="button" style={{background:"var(--secondary"}} className={`btn btn-primary ${clsx.addniche_button}`}  onClick={e => setShowNicheModal(_ => true)}>Add Niche Items</button>
            <NicheModal open={showNicheModal} newNiche={nichelist} setOpen={setShowNicheModal}
            handleChange={nicheChangeHandler} updateNiche={updateNicheHandler} />

            <div className={clsx.form_group}>
              <label htmlFor={"brief"}>
                Career Description
              </label>
              <textarea
                rows="5"
                name="careerDescription"
                value={formstate.careerDescription}
                onChange={changeHandler}
                className="generic_input"
              ></textarea>
            </div>
            <div className={clsx.form_group}>
              <label>Career(s)</label>
              {
                careerlists.length !== 0 ? careerlists.map(({name}, i) => (
                  <Syllabus key={i} title={name} />
                )) : <h5>No Career(s)!</h5>
              }
            </div>
            <button type="button" style={{background:"var(--secondary"}} className={`btn btn-primary ${clsx.addcareer_button}`} onClick={e => setShowCareerModal(_ => true)}>Add Career List</button>
            <CareerModal open={showCareerModal} newCareer={careerlist} setOpen={setShowCareerModal}
            handleChange={careerChangeHandler} updateCareer={updateCareerHandler} />

            <Input
              label="Banner Image Name"
              name="bannerImg"
              type="text"
              handleChange={changeHandler}
              value={formstate.bannerImg}
            />

            <Input
              label="Icon Image Name"
              name="iconImg"
              type="text"
              handleChange={changeHandler}
              value={formstate.iconImg}
            />
            <i className="text-danger">Make sure to upload the files and get the file name</i>


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
    </Admin>
  )
}


export function Dashboard() {
  const { getItem, updateItem } = useLocalStorage();
  const {adminFunctions: { fetchProfile }} = useAuth();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const navigate = useNavigate();
  useEffect(() => {

    if(flag.current) return;
    (async() => {
      try {
        let { data, message, success, statusCode } = await fetchProfile(
          userdata?.token
        );
        if (success) {
          let newValue = {
            ...userdata,
            ...data
          }
          userdata = updateItem(KEY, newValue);
        } else throw new AdvancedError(message, statusCode);
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
    flag.current = true;
  }, []);

  function editProfileHandler(e) {
    navigate("/admin/profile/edit");
  }

  return (
    <Admin header="Dashboard">
      <div className={clsx["admin_profile"]}>
        <div className={clsx["admin_profile_top"]}>
          <div className={clsx["admin_profile_top_img"]}>
            <img
              src={userdata?.profileImg ? userdata.profileImg : avatar}
              style={{ borderRadius: 10, width: "120px", height: "120px" }}
              width="100%"
              alt="Avatar"
            />
          </div>
          <button
            className={clsx["admin_profile_top_button"]}
            type="button"
            onClick={editProfileHandler}
          >
            <MdEdit style={{ marginRight: 15 }} /> <span>Edit</span>
          </button>
        </div>
        <div className={clsx["admin_profile_main"]}>
          <h1>Olu Jacobs</h1>
          <p className={clsx["admin__paragraph"]}>
            Enjoys writing and playing video games. <br />I joined Gotocourse to
            make friends connect with people virtually
          </p>
        </div>
      </div>
    </Admin>
  );
}

function Info({ title, content }) {
  return (
    <div className={clsx.admin__info}>
      <span className={clsx.admin__info_title}>{title}</span>
      <span className={clsx.admin__info_content}>{content}</span>
    </div>
  );
}

export function Approve() {
  const location = useLocation();
  const [data, setData] = useState(null);
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
  const tableContents = [
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      approve: false,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      approve: true,
    },
  ];
  useEffect(() => {
    const email = location.search.split("=")[1];
    console.log(email);

    setData((_) => {
      return tableContents.find((t) => t.email === email);
    });
  }, []);
  return (
    <Admin header="Approval">
      <div className={clsx["admin_profile"]}>
        <div className={clsx["admin_profile_top"]}>
          <div className={clsx["admin_profile_top_img"]}>
            <img
              src={data ? data.img : avatar}
              style={{ borderRadius: 10 }}
              width="100%"
              alt="Avatar"
            />
          </div>
        </div>
        <div className={clsx["admin_profile_main"]}>
          <h1>{data ? data.name : "Olu Jacobs"}</h1>

          <div className={clsx.admin__profile_info}>
            {info.map(({ title, content }, i) => (
              <Info title={title} content={content} key={i} />
            ))}

            <button
              className="button button-lg log_btn w-50 mt-3"
              style={{ backgroundColor: data?.approve && "red" }}
              type="submit"
            >
              {data?.approve ? "Revoke" : "Approve"}
            </button>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function UserInfoCard({
  img,
  name,
  date,
  email,
  isActive = null,
  paid,
  comp,
  num,
  course,
  model,
  pack,
  rating,
  firstName,
  lastName,
  user,
  status,
  amount,
  accessPledre=null,
  handleVerification,
  handlePledreAccess,
  handleRating,
  starRating,
  start_date,
  course_status,
  enrolled,
  approveHandler = () => {
    return;
  },
}) {
  return (
    // <div>
    <tr
      className={clsx.user__info_card}
      onClick={(e) => approveHandler(e, email)}
    >
      <td className={clsx.user__info}>{num + 1}.</td>
      {user && (
        <td className={clsx.user__details}>
          {img && <img src={img} alt="avatar" />}
          <span>{`${firstName} ${lastName}`}</span>
        </td>
      )}

      {(comp === "Courses" ||comp === "History" || comp === "Teacher") && <td className={clsx.user__info}>{course}</td>}
      {enrolled && <td className={clsx.user__info}>{enrolled}</td>}
      {comp === "History" && <td className={clsx.user__info}>{status}</td>}

      {comp === "Courses" && <td className={clsx.user__info}>{name}</td>}

      {date && (
        <td className={clsx.user__date}>
          <span>{date}</span>
        </td>
      )}
      {(comp === "History" ) && (
        <td className={clsx.user__date}>
          <span>{amount}</span>
        </td>
      )}
      {(comp === "Courses") && (
        <td className={clsx.user__date}>
          <span>{model}</span>
        </td>
      )}
      {(comp === "Courses") && (
        <td className={clsx.user__date}>
          <span>{amount}</span>
        </td>
      )}

      {pack && (
        <td className={clsx.user__date}>
          <span>{pack}</span>
        </td>
      )}
      {start_date && (
        <td className={clsx.user__date}>
          <span>{start_date}</span>
        </td>
      )}

      {email && (
        <td className={clsx.user__email}>
          <span>{email}</span>
        </td>
      )}
      {rating && (
        <td className={clsx.user__email}>
          <Rating onClick={handleRating} ratingValue={starRating} size={18} initialValue={0} />
        </td>
      )}
      {course_status && (
        <td className={clsx.user__email}>
          <span>{course_status}</span>
        </td>
      )}

      {paid && (
        <td className={clsx.user__button}>
          <span>
            {new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(paid)}
          </span>
        </td>
      )}
      {isActive !== null && (
        <td className={clsx.user__button}>
          <span>
            <Switch onClick={handleVerification} checked={isActive} />
          </span>
        </td>
      )}
      {accessPledre !== null && (
        <td className={clsx.user__button}>
          <span>
            <Switch onClick={handlePledreAccess} checked={accessPledre} />
          </span>
        </td>
      )}
    </tr>
    // </div>
  );
}

export function Teachers() {
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const flag = useRef(false);
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const {
    adminTeacherFunctions: { fetch }
  } = useAuth();
  useEffect(() => {
    if(flag.current) return;
    (async () => {
      try {
        const token = userdata?.token;
        console.log(token)
        const res = await fetch(token);
        console.log(res);
        const { message, success, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else {
          const { data } = res;
          //do somethings
          console.log(data);
          setTeachers(_=>  data);
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
    })();
    flag.current = true;
  }, []);
  const tableHeaders = ["No", "Name", "Email", "Access Pledre", "Verified"];

  function approveHandler(e, email) {
    console.log(e.target, email);

    if (email) navigate(`approve?email=${email}`);
  }
  return (
    <Admin header={"Mentors/Teachers"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Mentors</h1>
          <div className={`table-responsive ${clsx.admin__student_main}`}>
            <table className={`${clsx.admin__student_table}`}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {teachers.length > 0 ? teachers.map(({ profileImg, email, firstName, lastName, accessPledre, isVerified }, i) => (
                  <UserInfoCard
                    key={i}
                    user={true}
                    firstName={firstName}
                    lastName={lastName}
                    img={profileImg}
                    num={i}
                    email={email}
                    isActive={isVerified}
                    approveHandler={approveHandler}
                    accessPledre={accessPledre}
                  />
                )) : <h5 style={{textAlign:'center'}}>No Teachers found</h5>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function Courses() {
  const {adminFunctions: { fetchCourses} } = useAuth();
  const {getItem} = useLocalStorage();
  const navigate = useNavigate();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const [courseList, setCourseList] = useState([])
  const tableHeaders = [
    "No",
    "Course",
    "Category",
    "Description",
    "Type",
    "Price",
    "Action",
  ];

  useEffect(()=>{
    if(flag.current) return;
    (async () => {
      try {
        const res = await fetchCourses(userdata?.token);
        console.log(res);
        const { message, success, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else if (statusCode === 1) {
          const { data } = res;
          //do somethings

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
          console.log(data);
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
      }
    })()
    flag.current = true;
  },[])

  function gotoCreateCourseHandler(e){
    navigate("create");
  }
  return (
    <Admin header={"Courses"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
              <h1>All Courses</h1>
          <div className="d-flex justify-content-between align-items-center">
              <button type="button" className="btn btn-primary" onClick={gotoCreateCourseHandler}>Add Course</button>
          </div>

          <div className={clsx.admin__student_main}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {courseList.length > 0 && courseList.map(
                  (
                    {
                      category,
                      name,
                      description,
                      price,
                      type,
                      approve,
                      course,
                      rating,
                    },
                    i
                  ) => (
                    <UserInfoCard
                      key={i}
                      comp={"Courses"}
                      num={i}
                      name={category}
                      course={name}
                      date={description}
                      pack={type}
                      email={price}

                      isActive={approve}
                    />
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

function AddSyllabus({ open, handleClose, addSyllabus }) {
  const [newSyllabus, setNewSyllabus] = useState({
    title: "",
    description: "",
  });
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



export function CreateCourse() {
  const {
    // generalState: { isMobile, notification },
    // setGeneralState,
    teacherFunctions: { addCourse },
  } = useAuth();
  const {getItem} = useLocalStorage();

  let userdata = getItem(KEY);
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
    <Admin>
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
      <div className={clsx.admin_profile}>
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
                )) : <p>No syllabus!</p>
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
    </Admin>
  );
}

export function Fees() {
  const tableHeaders = ["No", "Name", "Date", "Email", "Paid"];
  const tableContents = [
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      paid: 2000,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      paid: 4000,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      paid: 1000,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      paid: 6000,
    },
  ];
  return (
    <Admin header={"Fees"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Fees</h1>

          <div className={clsx.admin__student_main}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {tableContents.map(({ img, email, date, name, paid }, i) => (
                  <UserInfoCard
                    key={i}
                    name={name}
                    img={img}
                    paid={paid}
                    date={date}
                    email={email}
                    isActive={false}
                    num={i}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

export function Student() {
  const [studentList, setStudentList] = useState([]);
  const {getItem} = useLocalStorage();
  const flag = useRef(false);
  let userdata = getItem(KEY);

  const { adminStudentFunctions: { fetch, verify, verify_pledre }, generalState: { loading }, setGeneralState, } = useAuth();

  async function fetchStudents(){
    if (userdata) {
      console.log("2",userdata)
      
        try {
          const res = await fetch(userdata?.token); 
          console.log(res);
          const { message, success, statusCode } = res;
          if (!success) throw new AdvancedError(message, statusCode);
          else {
            const { data } = res;
            //do somethings

            setStudentList(data);
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
  }
  useEffect(() => {
    if(flag.current) return;
    fetchStudents()
    flag.current = true;
  }, []);

  async function handleVerification(id) {
    let item = {
      userId: id,
    };
    try {
      setGeneralState((old) => {
        return {
          ...old,
          loading: true,
        };
      });

      const res = await verify(item, userdata?.token);
      const { message, success, statusCode } = res;

      setGeneralState((old) => {
        return {
          ...old,
          loading: false,
        };
      });

      if (!success) throw new AdvancedError(message, statusCode);
      else {
        //do somethings
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // reload student list
        fetchStudents()   
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



  async function handlePledreAccess(id) {
    let item = {
      userId: id,
    };

    try {
      setGeneralState((old) => {
        return {
          ...old,
          loading: true,
        };
      });

      const res = await verify_pledre(item, userdata?.token);
      const { message, success, statusCode } = res;


      setGeneralState((old) => {
        return {
          ...old,
          loading: false,
        };
      });

      if (!success) throw new AdvancedError(message, statusCode);
      else {
        //do somethings
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        fetchStudents()
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



  const tableHeaders = ["No", "Name", "Email", "Approve", "Access Pledre"];

  return (
    <Admin header={"Student"}>
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h1>All Students</h1>

          <div className={`table-responsive ${clsx.admin__student_main}`}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {studentList.length > 0 &&
                  studentList.map(
                    (
                      {
                        userId,
                        profileImg,
                        accessPledre,
                        email,
                        date,
                        name,
                        isVerified,
                        firstName,
                        lastName,
                      },
                      i
                    ) => (
                      <UserInfoCard
                        key={i}
                        name={name}
                        firstName={firstName}
                        lastName={lastName}
                        img={profileImg}
                        date={date}
                        email={email}
                        num={i}
                        isActive={isVerified}
                        accessPledre={accessPledre}
                        user={true}
                        handleVerification={() => handleVerification(userId)}
                        handlePledreAccess={() => handlePledreAccess(userId)}
                      />
                    )
                  )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {loading && <Loader />}
    </Admin>
  );
}

export function Edit() {
  const {
    adminFunctions: { updateAvatar, updateProfile },
  } = useAuth();
  const {updateItem, getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const [imageUrl, setImageUrl] = useState(null);
  const [isUplaoding, setIsUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formstate, setFormstate] = useState({
    firstName: userdata?.firstName ?? "",
    lastName: userdata?.lastName ?? "",
    bio: userdata?.bio ?? "",
    location: userdata?.location ?? "",
    work: userdata?.work ?? "",
    category: userdata?.category ?? "",
  });
  useEffect(() => {
    // if (userdata) {
    //   setFormstate({
    //     firstName: userdata.firstName,
    //     lastName: userdata.lastName,
    //     bio: userdata.bio,
    //     location: userdata.location,
    //     phoneNumber: userdata.phoneNumber,
    //     work: userdata.work,
    //     categoty: userdata.category,
    //   });
    // }
  }, [userdata]);

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (
        formstate.firstName === "" ||
        formstate.lastName === "" ||
        formstate.bio === "" ||
        formstate.location === "" ||
        formstate.work === ""
      )
        throw new AdvancedError("All fields are required", 0);
      //submit updated profile

      const res = await updateProfile(formstate, userdata.token);
      const { success, message, statusCode, data } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const newItem = {
          ...userdata,
          ...data
        }
        userdata = updateItem(KEY, newItem);
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
        console.log(data);
        const newValue = {
          ...userdata,
          ...data
        }
        userdata = updateItem(KEY, newValue);
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

  console.log("user", userdata);
  return (
    <Admin header="ADMIN">
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
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h3>Update Profile</h3>
          <div className="row w-100">
            <div className={` col-sm-3 ${clsx.edit__picture}`}>
              {userdata?.profileImg ? (
                <img
                  src={imageUrl ?? userdata.profileImg}
                  alt="Avatar"
                  style={{ width: "120px", height: "120px" }}
                />
              ) : !imageUrl ? (
                <span>placeholder</span>
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
                <p onClick={uploadPicture} style={{ cursor: "pointer" }}>
                  Upload Photo
                </p>
              )}
            </div>
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
              <label htmlFor={"bio"} className="form-label generic_label">
                Bio
              </label>
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
    </Admin>
  );
}



const Admin = ({ children, header }) => {
  const {
    generalState: { isMobile, showSidebar },
    generalState,
    setGeneralState,
  } = useAuth();
  useEffect(() => {
    console.log("Admin component is mounted");
    return () => console.log("Admin component is unmounted");
  }, []);

  const toggleSidebar = () => {
    setGeneralState({ ...generalState, showSidebar: !showSidebar });
  };
  return (
    <GuardedRoute>
      <div className={clsx["admin"]}>
        <ToastContainer />
        <Sidebar isMobile={isMobile} />
        <div className={clsx["admin_main"]}>
          <div className={`align-items-center ${clsx["admin_topbar"]}`}>
            <div className="d-md-none">
              <i>
                <AiOutlineMenu
                  style={{ fontSize: "24px", color: "#0C2191" }}
                  onClick={toggleSidebar}
                />
              </i>
            </div>
            <h1 className="d-none d-md-block">{header}</h1>
            <Searchbar showIcon={true} placeholder="Search" />
          </div>
          {children}
        </div>
      </div>
    </GuardedRoute>
  );
};

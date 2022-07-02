import { useEffect, useRef, useState } from "react";
import { MdEdit } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Switch, Modal, Box } from "@mui/material";
import { AiOutlineMenu, AiOutlineDelete, AiTwotoneEdit } from "react-icons/ai";

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
import { Rating } from "react-simple-star-rating";
import vector from "../../../images/vector.png"
import { CourseDetail } from "../../Courses";
import Layout from "../../../components/Layout";





const KEY = "gotocourse-userdata";


// COURSE DETAILS COMPONENT
export function CourseDetails({}){
  const navigate = useNavigate();
  const {getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const {adminFunctions: {fetchCourses, deleteCourse, toggleCourseStatus}} = useAuth();
  const flag = useRef(false);
  const [formstate, setFormstate] = useState({
    name: "",
    description: "",
    status: false,
    teacher: "",
    student: ""
  })
  const [loading, setLoading] = useState(true);
  const teachers = ["Dr. Joy Castus"];
  const students = ["James Segun"];
  const params = useParams();
  //get user id

  useEffect(() => {
    //fetch course details for the id
    if(flag.current) return;
    (async() => {
      try{
        const res = await fetchCourses(userdata?.token);
        const {message, statusCode, success} = res;
        if(!success) throw new AdvancedError(message, statusCode);
        else {
          const {data} = res;
          let course = data.find(d => d.courseId === params?.id);
          console.log(course);
          setFormstate(old => {
            return {
              ...old,
              name: course.name,
              description: course.description,
              status: course.isActive
            }
          })
          toast.success("Course Details fetched successfully", {
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
        setLoading(_ => false);
      }
    })()
    flag.current = true;


    return () => console.log("Leaving Details page");
  }, [])


  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }


  async function deleteCourseHandler(e){
    setLoading(_ => true);
    try {    
      const res = await deleteCourse(userdata?.token, params?.id);
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
    }finally{
      setLoading(_ => false);
    }
  }


  async function toggleCourseStatusHandler(e){
    setLoading(_ => true);
    try {    
      const res = await toggleCourseStatus(userdata?.token, params?.id);
      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        console.log(res);
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
    }finally{
      setLoading(_ => false);
    }
  }

  function editCourseHandler(e){
    navigate(`/admin/courses/create?edit=${params?.id}`);
  }


  return(
    <Admin header="ADMIN">
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-5" style={{width: "80%"}}>
            <button type="button" className="btn btn-sm btn-danger px-3 py-2" style={{fontSize: "0.8rem"}} onClick={deleteCourseHandler}>Delete Course</button>
            <button type="button" className="btn btn-sm btn-primary px-3 py-2" style={{fontSize: "0.8rem"}} onClick={editCourseHandler}>Edit Course</button>
          </div>
          <form className="form" style={{width: "80%", margin: "20px 0px"}}>
            <Input
              label="Name of Course"
              name="name"
              type="text"
              handleChange={changeHandler}
              value={formstate.name}
              readOnly={true}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"description"} className="form-label generic_label">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                value={formstate.description}
                onChange={changeHandler}
                className="form-control generic_input"
                readOnly
              ></textarea>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Name of teachers</label>
                {
                  teachers.map((t, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {t}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                style={{margin: "0px !important"}}
                name="teacher"
                type="text"
                handleChange={changeHandler}
                value={formstate.teacher}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Teacher
              </button>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Add Student</label>
                {
                  students.map((s, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {s}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                name="student"
                type="text"
                handleChange={changeHandler}
                value={formstate.student}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Student
              </button>
            </div>

            <div className={clsx.form_group} style={{marginTop: 40}}>
              <label>Change Course Status</label>
              <Switch onClick={toggleCourseStatusHandler} checked={formstate.status} />
            </div>

          </form>
        </div>
      </div>
    </Admin>
  )
}


// CATEGORY DETAILS COMPONENT
export function CategoryDetails({}){
  const navigate = useNavigate();
  const {getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const {generalState, setGeneralState,adminFunctions: {fetchCategory, deleteCategory}} = useAuth();
  const flag = useRef(false);
  const [formstate, setFormstate] = useState({
    name: "",
    description: "",
    teacher: "",
    student: ""
  })
  const [loading, setLoading] = useState(true);
  const teachers = ["Dr. Joy Castus"];
  const students = ["James Segun"];
  const params = useParams()
  //get user id
  console.log(params);
  useEffect(() => {
    //fetch course details for the id
    if(flag.current) return;
    (async() => {
      try{
        const res = await fetchCategory(params?.id, userdata?.token);
        const {message, statusCode, success} = res;
        if(!success) throw new AdvancedError(message, statusCode);
        else {
          const {data} = res;
          console.log(data);
          setFormstate(old => {
            return {
              ...old,
              name: data.name,
              description: data.description,
              categoryId: data.categoryId
            }
          })
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
        setLoading(_ => false);
      }
    })()
    flag.current = true;


    return () => console.log("Leaving Details page");
  }, [])


  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }


  async function deleteCategoryHandler(e){
    e.preventDefault();
    setGeneralState({ ...generalState, loading: true});
    try {    
      const res = await deleteCategory(userdata?.token, formstate.categoryId);
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
      setGeneralState({ ...generalState, loading: false});
    }
  
  }

  function editCategoryHandler(e){
    navigate(`/admin/courses-categories/new?edit=${formstate.name}`);

  }


  return(
    <Admin header="ADMIN">
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-5" style={{width: "80%"}}>
            <button type="button" className="btn btn-sm btn-danger px-3 py-2" style={{fontSize: "0.8rem"}} onClick={deleteCategoryHandler}>Delete Category</button>
            <button type="button" className="btn btn-sm btn-primary px-3 py-2" style={{fontSize: "0.8rem"}} onClick={editCategoryHandler}>Edit Category</button>
          </div>
          <form className="form" style={{width: "80%", margin: "20px 0px"}}>
            <Input
              label="Name of Course"
              name="name"
              type="text"
              handleChange={changeHandler}
              value={formstate.name}
              readOnly={true}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"description"} className="form-label generic_label">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                value={formstate.description}
                onChange={changeHandler}
                className="form-control generic_input"
                readOnly
              ></textarea>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Name of teachers</label>
                {
                  teachers.map((t, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {t}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                style={{margin: "0px !important"}}
                name="teacher"
                type="text"
                handleChange={changeHandler}
                value={formstate.teacher}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Teacher
              </button>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Add Student</label>
                {
                  students.map((s, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {s}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                name="student"
                type="text"
                handleChange={changeHandler}
                value={formstate.student}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Student
              </button>
            </div>

          </form>
        </div>
      </div>
    </Admin>
  )
}


// CATEGORY COMPONENT
export function Category(){
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])

const [loading, setLoading] = useState(true);
  const {generalState, setGeneralState, adminFunctions: {fetchCategories}} = useAuth();
  const {getItem} = useLocalStorage();
  const flag = useRef(false);
  const userdata = getItem(KEY)
  const tableHeaders = ["No", "Name of Category", "Date", "No of Student"]

  useEffect(() => {
    if(flag.current) return;
    (async () => {
      setGeneralState({...generalState, loading: true})
      try{
        const res = await fetchCategories(userdata?.token);
        const {success, statusCode, message} = res;
        setGeneralState({...generalState, loading: false})

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
      }finally{
        setLoading(_ => false);
      }
    })()
    flag.current = true;
  }, [])


 
  function showDetailsHandler(e, id){
    navigate(`details/${id}`);
  }

  return (
    <Admin header="Category">
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 style={{margin: 0}}>All Category</h1>  <button className="btn btn-primary px-4" onClick={(e) => navigate("new")}>Add Category</button>
          </div>
            <div className={`table-responsive ${clsx.admin__student_main}`}>
            {categories.length > 0 ?
              <table className={`${clsx.admin__student_table}`}>
                <thead>
                  {tableHeaders.map((el, i) => (
                    <td key={i}>{el}</td>
                  ))}
                </thead>
                <tbody>
                  {categories?.length > 0 && categories?.map((
                  {bannerImg, careerDescription, careerList, 
                  name, description, iconImg, categoryId, 
                  niche: nicheTitle, nicheDescription, 
                  nicheItems
                }, i) => (
                    <UserInfoCard
                      key={i}
                      comp="Category"
                      name={name}
                      num={i}
                      date={"2022-06-26T00:00:00.000Z".split("T")[0]}
                      students={90}
                      id={categoryId}
                      showDetailsHandler={(e)=>showDetailsHandler(e, name)}
                    />
                  )) }
                </tbody>
              </table>
              : <h5 style={{textAlign:'center'}}>No Category found</h5>
              }
              
            </div>
          </div>
      </div>
    </Admin>
  )
}



// NICHEMODAL COMPONENT
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



// CAREERMODAL COMPONENT
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



// CATEGORYPREVIEWMODAL COMPONENT
export function CategoryPreviewModal({preview, open, setOpen}){

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
      onClose={e => {
        setOpen(_ => false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="position-relative" style={{
          height: "80vh",
          overflowY: "scroll",
        }}>
        <Layout>
          {preview ? <CourseDetail preview={preview} /> : <h3>No preview available!!!</h3> }
        </Layout>
        </div>
      </Box>
    </Modal>
  )
}


// SYLLABUS COMPONENT
const Syllabus = ({title, description}) => {
  return(
    <div className={clsx.syllabus_container}>
      <h5>{title}</h5>
      {description && <p>{description}</p>}
    </div>
  )
}


// CREATECOURSECATEGORY COMPONENT
export function CreateCourseCategory(){
  const {adminFunctions: {addCategory, fetchCategory, updateCategory}} = useAuth();
  const {getItem} = useLocalStorage();
  const userdata = getItem(KEY);
  const [open, setOpen] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState(false);

  const [showCareerModal, setShowCareerModal] = useState(false);
  const [showNicheModal, setShowNicheModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formstate, setFormstate] = useState({
    name: "",
    description: "",
    niche: "",
    nicheDescription: "",
    career: "",
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
  const flag = useRef(false);
  const location = useLocation();
  const [loader, setLoader] = useState(location.search ? true : false);
  const edit = location.search

  useEffect(() => {
    if(flag.current) return;
    if(location.search){
      const id = location.search.split("=").reverse()[0];
      console.log(id);
      (async () => {
        try {
          const res = await fetchCategory(id, userdata?.token);
          const { message, success, statusCode } = res;
          if (!success) throw new AdvancedError(message, statusCode);
          else if (statusCode === 1) {
            const { data } = res;
            
            const iconImg = data.iconImg?.split("/").slice(-1)
            const bannerImg = data.bannerImg?.split("/").slice(-1)
            setFormstate({...data, bannerImg: bannerImg[0], iconImg: iconImg[0]});
            
            data.nicheItems && setNichelists(_ => data.nicheItems)
            data.careerList && setCareerlists(_ => data.careerList)
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
        }finally{
          setLoader(_ => false);
        }
      })()
    }
    //do some coding
    flag.current = true;
    return () => console.log("Removing CreateCategory component");
  }, [])
  
  console.log(formstate)



  async function submitHandler(e){
    e.preventDefault();
    setLoading(_ => true);
    try{
      const data = {
        ...formstate,
        nicheItems: [...nichelists],
        careerList: [...careerlists]
      }
     
      const res = edit ? await updateCategory(userdata?.token, formstate.categoryId, data): await addCategory(data, userdata?.token);
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


  function showUploadFormHandler(){
    setOpen(_ => true)
  }


  return(
    <Admin header="Create Category">
      {loader && <Loader />}
      <UploadForm isOpen={open} setIsOpen={setOpen} setPreviewImage={setPreviewImage} />
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
            <div className={clsx.upload__file_box} onClick={showUploadFormHandler}>
              <img src={vector} alt={"Placeholder"} />
              <p>Upload banner or icon Image</p>
            </div>
            <form className="form" style={{width: "80%"}}>
            <Input
              label="Name of category"
              name="name"
              type="text"
              handleChange={changeHandler}
              value={formstate.name.toUpperCase()}
            />
            <Input
              label="First Description"
              name="description"
              type="text"
              handleChange={changeHandler}
              value={formstate.description}
            />
            <Input
              label=" Second Description"
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
              <label>Niches</label>
              {
                nichelists.length !== 0 ? nichelists.map(({name, description}, i) => (
                  <Syllabus key={i} title={name} description={description} />
                )) : <p className="m-0 text-danger" style={{fontSize: '0.8rem', textIndent: 20}}>No Niche</p>
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
                name="career"
                value={formstate.career}
                onChange={changeHandler}
                className="generic_input"
              ></textarea>
            </div>
            <div className={clsx.form_group}>
              <label>Career</label>
              {
                careerlists.length !== 0 ? careerlists.map(({name}, i) => (
                  <Syllabus key={i} title={name} />
                )) : <p className="m-0 text-danger" style={{fontSize: '0.8rem', textIndent: 20}}>No Careers</p>
              }
            </div>
            <button type="button" style={{background:"var(--secondary"}} className={`btn btn-primary mb-3 ${clsx.addcareer_button}`} onClick={e => setShowCareerModal(_ => true)}>Add Career List</button>
            <CareerModal open={showCareerModal} newCareer={careerlist} setOpen={setShowCareerModal}
            handleChange={careerChangeHandler} updateCareer={updateCareerHandler} />

            <Input
              label="Banner Image"
              name="bannerImg"
              type="text"
              handleChange={changeHandler}
              value={formstate.bannerImg}
            />

            <Input
              label="Icon Image "
              name="iconImg"
              type="text"
              handleChange={changeHandler}
              value={formstate.iconImg}
            />
            <i className="text-danger">Make sure to upload the files and get the file name</i>

          </form>
          {loading ? 
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status" style={{width:"4rem", height:"4rem"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
            </div>
          :
          <div className={clsx.form_button__container}>
            <button className="btn btn-primary" onClick={submitHandler}>Submit</button>
            <button className="btn border-primary text-primary" 
            onClick={()=>{
              setOpenPreview(!openPreview)
            }}
            >Preview</button>
          </div>
          }
        </div>
        <CategoryPreviewModal preview={{
        ...formstate,
        nicheItems: [...nichelists],
        careerList: [...careerlists]
      }} open={openPreview} setOpen={setOpenPreview} />
      </div>
    </Admin>
  )
}



// DASHBOARD COMPONENT
export function Dashboard() {
  const { getItem, updateItem } = useLocalStorage();
  const {adminFunctions: { fetchProfile }} = useAuth();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      }finally {
        setLoading(_ => false);
      }
    })()
    flag.current = true;
  }, []);

  function editProfileHandler(e) {
    navigate("/admin/profile/edit");
  }

  return (
    <Admin header="Dashboard">
      {loading && <Loader />}
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


// INFO COMPONENT
function Info({ title, content }) {
  return (
    <div className={clsx.admin__info}>
      <span className={clsx.admin__info_title}>{title}</span>
      <span className={clsx.admin__info_content}>{content}</span>
    </div>
  );
}



// APPROVE TEACHER COMPONENT
export function Approve() {
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const {getItem} = useLocalStorage();
  const { adminTeacherFunctions: { verify, verify_pledre, addMentor}, setGeneralState, } = useAuth();
  const info = [
    {
      title: "Courses",
      content: "UX Designer",
    },
    {
      title: "Category",
      content: "Cybersecurity, UX, Data Analysis",
    },
    {
      title: "Mentorship status",
      content: "Unassigned",
    },
  ];
  
  useEffect(() => {
    const teacherInfo = getItem("gotocourse-teacherDetails")
    setData(teacherInfo);
  }, []);

  let accessPledre = false;

 async function handleVerification( e, type, id){
  e.preventDefault();
    const userdata = getItem(KEY)
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

      const res = type === "approve" ? await verify(item, userdata?.token) : await verify_pledre(item, userdata?.token);
      console.log('res', res)
      const { message, success, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        //do somethings
        localStorage.setItem("gotocourse-teacherDetails", JSON.stringify(res.data))
        type ===  "approve" ? setData({...data, isVerified: !data?.isVerified}) : setData({...data, accessPledre: !data.accessPledre})
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
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }) 
    } finally{
        setGeneralState((old) => {
          return {
            ...old,
            loading: false,
          };
        });
    }
  }
 async function conferMentorship( e, id, email){
  e.preventDefault();
    const userdata = getItem(KEY)
    let item = {
      teacherEmail: email,
    };
    try {
      setGeneralState((old) => {
        return {
          ...old,
          loading: true,
        };
      });
      
      const res = await addMentor(item, userdata?.token);
      console.log('res', res)
      const { message, success, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        //do somethings
        // localStorage.setItem("gotocourse-teacherDetails", JSON.stringify(res.data))
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
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }) 
    } finally{
        setGeneralState((old) => {
          return {
            ...old,
            loading: false,
          };
        });
    }
  }
  return (
    <Admin header="Approval">
      <div className={clsx["admin_profile"]}>
        <div className={clsx["admin_profile_top"]}>
          <div className={clsx["admin_profile_top_img"]}>
            <img
              src={data ? data.profileImg : avatar}
              style={{ borderRadius: 10 }}
              width="100%"
              alt="Avatar"
            />
          </div>
        </div>
        <div className={clsx["admin_profile_main"]}>
          <h1>{data ? `${data?.firstName} ${data?.lastName}` : "Olu Jacobs"}</h1>

          <div className={clsx.admin__profile_info}>
            {info.map(({ title, content }, i) => (
              <Info title={title} content={content} key={i} />
            ))}
            
            {/* <div className="form-group my-3">
              <label htmlFor="approveMentorship" className="form-label generic_label d-block">Mentorship</label>
              <button className="button btn" onClick={()=> {
                navigate("/admin/teachers/approve/mentorship")}
                } type="button">Assign Mentorship</button>
            </div> */}

            <div className="form-group my-3">
              <label htmlFor="accessPledre" className="form-label generic_label">Confer Mentorship</label>
              <Switch onClick={(e)=>conferMentorship(e, data?.userId, data?.email)} checked={false} />
            </div>
            <div className="form-group my-3">
              <label htmlFor="accessPledre" className="form-label generic_label">Access Pledre</label>
              <Switch onClick={(e)=>handleVerification(e, "pledre", data?.userId)} checked={data?.accessPledre} />
            </div>
            <div className="form-group my-3">
              <label htmlFor="level" className="form-label generic_label">Assign Level</label>
              <select name="level" id="level" className="form-select" style={{width: "unset"}}>
                <option value="">Select a level</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
              </div> 
              
            <button
              className="button button-lg log_btn w-50 mt-3"
              style={{ backgroundColor: data?.isVerified && "red" }}
              type="submit"
              onClick={(e)=>handleVerification(e, "approve", data?.userId) }
            >
              {data?.isVerified ? "Revoke" : "Approve Application"}
            </button>
          </div>
        </div>
      </div>
    </Admin>
  );
}



// USERINFOCARD COMPONENT
export function UserInfoCard({
  img,
  id,
  name,
  details,
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
  unpaid,
  students,
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
  level,
  packages=[],
  showDetailsHandler = () => {return},
  approveHandler = () => {return},
}) {
  return (
    <tr
      className={clsx.user__info_card}
      onClick={(e) => ((comp === 'Category') || (comp === 'Courses')) ? showDetailsHandler(e, id) : approveHandler(e, email, details)}
    >
      <td className={clsx.user__info}>{num + 1}.</td>
      {user && (
        <td className={clsx.user__details}>
          {img && <img src={img} alt="avatar" />}
          <span>{`${firstName} ${lastName}`}</span>
        </td>
      )}

      {(comp === "Courses" || comp === "History" || comp === "Teacher") && <td className={clsx.user__info}>{course}</td>}
      {enrolled && <td className={clsx.user__info}>{enrolled}</td>}
      {comp === "History" && <td className={clsx.user__info}>{status}</td>}

      {(comp === "Courses" || comp === "Category") && <td className={clsx.user__info}>{name}</td>}

      {(comp === "Courses" || date) && (
        <td className={clsx.user__date} style={{padding: "2px 8px"}}>
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
            {packages.map(item=>(
              <div>{item.title}</div>
            ))}
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
      {students && (
        <td className={clsx.user__email}>
          <span>{students}</span>
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
      {unpaid && (
        <td className={clsx.user__button}>
          <span style={{color: 'red'}}>
            -{new Intl.NumberFormat("en-us", {
              style: "currency",
              currency: "USD",
            }).format(unpaid)}
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
      {level && (
        <td className={clsx.user__email}>
          <span>{level}</span>
        </td>
      )}
    </tr>
  );
}


// TEACHERS COMPONENT
export function Teachers() {
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const flag = useRef(false);
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
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
      }finally {
        setLoading(_ => false);
      }
    })();
    flag.current = true;
  }, []);
  const tableHeaders = ["No", "Name", "Email", "Access Pledre", "Level"];

  function approveHandler(e, email, details) {
    console.log(e.target, email);
    localStorage.setItem("gotocourse-teacherDetails", JSON.stringify(details))
    if (email) navigate(`approve?email=${email}`);
  }
  return (
    <Admin header={"Mentors/Teachers"}>
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>All Mentors</h1>
            <button className="btn button-md" style={{background:"var(--theme-blue)", color:"#fff"}} type="button" onClick={()=>navigate("create/mentor")}>Add Mentor</button>
          </div>
          <div className={`table-responsive ${clsx.admin__student_main}`}>
            <table className={`${clsx.admin__student_table}`}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {teachers?.length > 0 ? teachers?.map((teacher, i) => (
                  <UserInfoCard
                    key={i}
                    user={true}
                    firstName={teacher.firstName}
                    lastName={teacher.lastName}
                    img={teacher.profileImg}
                    num={i}
                    email={teacher.email}
                    level={1}
                    details={teacher}
                    approveHandler={approveHandler}
                    accessPledre={teacher.accessPledre}
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
// MENTORS COMPONENT
export function Mentors() {

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const flag = useRef(false);
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    otherFunctions: { fetchMentors }
  } = useAuth();
  useEffect(() => {
    if(flag.current) return;
    (async () => {
      try {
        const token = userdata?.token;
        console.log(token)
        const res = await fetchMentors(token);
        console.log(res);
        const { message, success, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else {
          const { data } = res;
          //do somethings
          if(data.length > 0) {

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
         }  else {
          toast.success("No mentor page found", {
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
      }finally {
        setLoading(_ => false);
      }
    })();
    flag.current = true;
  }, []);

  const tableHeaders = ["No", "Name", "Email", "Expertise"];

  function approveHandler(e, email, details) {
    console.log(e.target, email);
    localStorage.setItem("gotocourse-mentorDetails", JSON.stringify(details))
    if (email) navigate(`detail`);
  }
  return (
    <Admin header={"Mentors"}>
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center">
            <h1>Mentors</h1>
            {/* <button className="btn button-md" style={{background:"var(--theme-blue)", color:"#fff"}} type="button" onClick={()=>navigate("create/mentor")}>Add Mentor</button> */}
          </div>
          <div className={`table-responsive ${clsx.admin__student_main}`}>
            <table className={`${clsx.admin__student_table}`}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <td key={i}>{el}</td>
                ))}
              </thead>
              <tbody>
                {teachers?.length > 0 ? teachers?.map((teacher, i) => (
                  <UserInfoCard
                    key={i}
                    user={true}
                    firstName={teacher.mentorFirstName}
                    lastName={teacher.mentorLastName}
                    img={teacher.mentorImg}
                    num={i}
                    email={teacher.mentorEmail}
                    level={teacher.expertise}
                    details={teacher}
                    approveHandler={approveHandler}
                    // accessPledre={teacher.accessPledre}
                  />
                )) : <h5 style={{textAlign:'center'}}>No mentor page found</h5>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}

// ADD MENTORS COMPONENT 

export function AddMentor({edit}){
  const { adminTeacherFunctions: { makeMentorPage, updateMentor} } = useAuth();
  const {getItem} = useLocalStorage();

  const [previewImage, setPreviewImage] = useState(false);

  let userdata = getItem(KEY);

  const [open, setOpen] = useState(false);

  function showUploadFormHandler(){
     setOpen(_ => true)
  }

  const [loading, setLoading] = useState(false);
  const [formstate, setFormstate] = useState({
    mentorFirstName: "",
    mentorLastName: "",
    mentorEmail: "",
    mentorBio: "",
    expertise: "",
    experience: "",
    footnote: "",
    fee: "",
              
  });

const [bio, setBio] = useState("")
  const navigate = useNavigate();

useEffect(()=>{
    if(edit){
      const editMentorData =  getItem("gotocourse-mentorDetails")
      setFormstate(editMentorData)
    }

},[edit])

  async function handleSubmit(e) {
    e.preventDefault();
    const formdata = {...formstate, mentorBio:bio}
    setLoading(true);
    try {
      const res =  edit === "mentor" ? await updateMentor( formstate._id, formdata, userdata?.token,) : await makeMentorPage(userdata?.token, formdata);
      const { success, message, statusCode, data } = res;
      console.log(data)
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
        if(edit === "mentor"){
          localStorage.setItem("gotocourse-mentorDetails", JSON.stringify(data))
          navigate(-1)
        }
        
        
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
  console.log(bio); 

  return (
    <Admin header="ADMIN">
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h3>Add Mentor</h3>
          <UploadForm isOpen={open} setIsOpen={setOpen} setPreviewImage={setPreviewImage} />
          <div className="row w-100 mt-4">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <div className={clsx.upload__file_box} onClick={showUploadFormHandler}>
                <img src={vector} alt={"Placeholder"} />
                <p>Upload Mentor image</p>
              </div>
              {previewImage && 
                <div className={clsx.upload__file_box}>
                  <img src={previewImage} alt={"Placeholder"} style={{width:"150px", height:"100px", objectFit:"cover", objectPosition:"top"}} />
                </div>
              }
            </div>
          </div>
          <form className="form" style={{width: "80%"}}>
            <Input
              label="Profile image file name"
              name="mentorImg"
              type="text"
              handleChange={changeHandler}
              value={formstate.mentorImg}
            />
            <Input
              label="First name"
              name="mentorFirstName"
              type="text"
              handleChange={changeHandler}
              value={formstate.mentorFirstName}
            />
            <Input
              label="Last name"
              name="mentorLastName"
              type="text"
              handleChange={changeHandler}
              value={formstate.mentorLastName}
            />
              <Input
                label="Mentor's Email"
                name="mentorEmail"
                type="email"
                handleChange={changeHandler}
                value={formstate.mentorEmail}
              />
            <div className={clsx.form_group}>
              <label htmlFor={"bio"} className="form-label generic_label">
                Bio
              </label>
              {/* <textarea
                rows="5"
                name="mentorBio"
                value={formstate.mentorBio}
                onChange={changeHandler}
                className="form-control generic_input"
              ></textarea> */}
              <CKEditor
                editor={ ClassicEditor }
                data={formstate.mentorBio}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log(data); 
                    setBio(data)
                    // setFormstate({...formstate, mentorBio: data})
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
                />
            </div> 
            <Input
              label="Area of Expertise"
              name="expertise"
              type="text"
              handleChange={changeHandler}
              value={formstate.expertise}
            />
            <Input
              label="Years of experience"
              name="experience"
              type="text"
              handleChange={changeHandler}
              value={formstate.experience}
            />
            <Input
              label="Footnote"
              name="footnote"
              type="text"
              handleChange={changeHandler}
              value={formstate.footnote}
            />

            <Input
              label="Fees per session ($)"
              name="fee"
              type="text"
              handleChange={changeHandler}
              value={formstate.fee}
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
                onClick={handleSubmit}
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


//MENTORS DETAILS COMPONENT
export function MentorsDetail() {
  const navigate = useNavigate()
  const [data, setData] = useState(null);
  const {getItem} = useLocalStorage();
  const { adminTeacherFunctions: {  deleteMentor }, setGeneralState, } = useAuth();
  const info = [
    {
      title: "Courses",
      content: "UX Designer",
    },
    {
      title: "Category",
      content: "Cybersecurity, UX, Data Analysis",
    },
    {
      title: "Mentorship status",
      content: "Unassigned",
    },
  ];
  
  useEffect(() => {
    const teacherInfo = getItem("gotocourse-mentorDetails")
    setData(teacherInfo);
  }, []);

  let accessPledre = false;

 async function deleteMentorPage( e, id){
  e.preventDefault();
    const userdata = getItem(KEY)
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

      const res =  await deleteMentor(id, userdata?.token);
      console.log('res', res)
      const { message, success, statusCode } = res;
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
        navigate(-1)
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
      }) 
    } finally{
        setGeneralState((old) => {
          return {
            ...old,
            loading: false,
          };
        });
    }
  }
  return (
    <Admin header="Mentor Details">
      <div className={clsx["admin_profile"]}>
        <div className={clsx["admin_profile_top"]}>
          <div className={clsx["admin_profile_top_img"]}>
            <img
              src={data?.mentorImg ? data.mentorImg : avatar}
              style={{ borderRadius: 10 }}
              width="100%"
              alt="Avatar"
            />
          </div>
        </div>
        <div className={clsx["admin_profile_main"]}>
          <h1>{data ? `${data?.mentorFirstName} ${data?.mentorLastName}` : ""}</h1>

          <div className={clsx.admin__profile_info}>
          <div className={clsx.admin__info}>
            <span className={clsx.admin__info_title}>Email</span>
            <span className={clsx.admin__info_content}>{data?.mentorEmail}</span>
          </div>
          <div className={clsx.admin__info}>
            <span className={clsx.admin__info_title}>Expertise</span>
            <span className={clsx.admin__info_content}>{data?.expertise}</span>
          </div>
          <div className={clsx.admin__info}>
            <span className={clsx.admin__info_title}>Bio</span>
            <div className={clsx.admin__info_content} dangerouslySetInnerHTML={{__html: data?.mentorBio}} />
          </div>
          <div className={clsx.admin__info}>
            <span className={clsx.admin__info_title}>Fees</span>
            <span className={clsx.admin__info_content}>{data?.fee}</span>
          </div>  
          <div className="d-flex align-items-center mt-3"></div>
            <button
              className="button button-lg log_btn me-4"
              style={{ backgroundColor:"red" }}
              type="submit"
              onClick={(e)=>deleteMentorPage(e, data?._id) }
            >
             Delete
            </button>
            <button
              className="button button-lg log_btn"
              type="submit"
              onClick={(e)=>{
                navigate("edit")} }
            >
             Edit
            </button>
          </div>
        </div>
      </div>
    </Admin>
  );
}

// COURSES COMPONENT
export function Courses() {
  const {adminFunctions: { fetchCourses } } = useAuth();
  const {getItem} = useLocalStorage();
  const navigate = useNavigate();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const [courseList, setCourseList] = useState([])
  const [loading, setLoading] = useState(true);
  const tableHeaders = [
    "No",
    "Courses",
    "Name",
    "Date",
    "Package",
    "Rating",
    "Approval",
  ];

  useEffect(()=>{
    if(flag.current) return;
    (async () => {
      try {
        const res = await fetchCourses(userdata?.token);
        const { message, success, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else if (statusCode === 1) {
          const { data } = res;
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
      }finally{
        setLoading(_ => false);
      }
    })()
    flag.current = true;
  },[])

  function gotoCreateCourseHandler(e){
    navigate("create");
  }

  function getDate(date){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = date.split("T")[0];
    let [y, m, day] = d.split("-");
    m = months[parseInt(m) - 1];
    console.log(`${m} ${day}`);
    return `${m} ${day}`;
  }

  function showDetailsHandler(e, id){
    navigate(`details/${id}`);
  }
  return (
    <Admin header={"Courses"}>
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 style={{margin: 0}}>All Courses</h1>  <button type="button" className="btn btn-primary px-5" onClick={gotoCreateCourseHandler}>Add Course</button>
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
                      price,
                      status,
                      type,
                      approve,
                      courseId,
                      startDate,
                      packages,
                      endDate
                    },
                    i
                  ) => (
                    <UserInfoCard
                      key={i}
                      comp={"Courses"}
                      num={i}
                      name={category}
                      course={name}
                      rating={4}
                      id={courseId}
                      showDetailsHandler={showDetailsHandler}
                      packages={packages}
                      date={`${getDate(startDate)} - ${getDate(endDate)}`}
                      isActive={approve ?? true}
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



// BOOTCAMPDETAILS COMPONENT
export function BootcampDetails({}){
  const navigate = useNavigate();
  const {getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const {adminFunctions: {deleteBootcamp, fetchBootcamps, toggleBootcampStatus}} = useAuth();
  const flag = useRef(false);
  const [formstate, setFormstate] = useState({
    title: "",
    description: "",
    status: false,
    instructor: "",
    student: ""
  })
  const [loading, setLoading] = useState(true);
  const [instructors, setInstructors] = useState([]);
  const students = ["James Segun"];
  const params = useParams()
  //get user id
  useEffect(() => {
    //fetch bootcamp details for the id
    if(flag.current) return;
    (async() => {
      try{
        const res = await fetchBootcamps(userdata?.token);
        const {message, statusCode, success} = res;
        if(!success) throw new AdvancedError(message, statusCode);
        else {
          const {data} = res;
          let bootcamp = data.find(d => d._id === params?.id);
          console.log(bootcamp);
          setFormstate(old => {
            return {
              ...old,
              title: bootcamp.title,
              description: bootcamp.description,
              status: bootcamp.isActive
            }
          })
          setInstructors(_ => {
            return [bootcamp.instructorName]
          })
          toast.success("Bootcamp Details fetched successfully", {
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
        setLoading(_ => false);
      }
    })()
    flag.current = true;
    return () => console.log("Leaving Details page");
  }, [])


  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function toggleBootcampStatusHandler(e){
    setLoading(_ => true);
    try{
      const res = await toggleBootcampStatus(userdata?.token, params?.id);
      const {message, statusCode, success} = res;
      if(!success) throw new AdvancedError(message, statusCode);
      else {
        console.log(res);
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
      setLoading(_ => false);
    }
  }


  async function deleteBootcampHandler(e){
    setLoading(_ => true);
    try{
      const res = await deleteBootcamp(userdata?.token, params?.id);
      const {message, success, statusCode} = res;
      if(!success) throw new AdvancedError(message, statusCode);
      else {
        navigate("/admin/bootcamps");
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
      setLoading(_ => false);
    }
  }

  function editBootcampHandler(e){
    navigate(`/admin/bootcamps/create?edit=${params?.id}`);
  }


  return(
    <Admin header="ADMIN">
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-5" style={{width: "80%"}}>
            <button type="button" className="btn btn-sm btn-danger px-3 py-2" style={{fontSize: "0.8rem"}} onClick={deleteBootcampHandler}>Delete Bootcamp</button>
            <button type="button" className="btn btn-sm btn-primary px-3 py-2" style={{fontSize: "0.8rem"}} onClick={editBootcampHandler}>Edit Bootcamp</button>
          </div>
          <form className="form" style={{width: "80%", margin: "20px 0px"}}>
            <Input
              label="Title"
              name="title"
              type="text"
              handleChange={changeHandler}
              value={formstate.title}
              readOnly={true}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"description"} className="form-label generic_label">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                value={formstate.description}
                onChange={changeHandler}
                className="form-control generic_input"
                readOnly
              ></textarea>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Name of Instructors</label>
                {
                  instructors.map((t, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {t}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                style={{margin: "0px !important"}}
                name="instructor"
                type="text"
                handleChange={changeHandler}
                value={formstate.instructor}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Instructor
              </button>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label>Add Student</label>
                {
                  students.map((s, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {s}</p> 
                      <div className={clsx.teachers__actions}>
                        <span className={`${clsx.teachers__actions_delete} text-danger`}><AiOutlineDelete />    Delete</span>
                        <span className={`${clsx.teachers__actions_edit}`}><AiTwotoneEdit />    Edit</span>
                      </div>
                    </div>
                  ))
                }
              </div>
              <Input
                name="student"
                type="text"
                handleChange={changeHandler}
                value={formstate.student}
              />
              <button type="button" className={clsx.form_group__button}>
                Add Student
              </button>
            </div>

            <div className={clsx.form_group} style={{marginTop: 40}}>
              <label>Change Bootcamp Status</label>
              <Switch onClick={toggleBootcampStatusHandler} size="large" checked={formstate.status} />
            </div>

          </form>
        </div>
      </div>
    </Admin>
  )
}



// BOOTCAMPS COMPONENT
export function Bootcamps() {
  const {adminFunctions: { fetchBootcamps } } = useAuth();
  const {getItem} = useLocalStorage();
  const navigate = useNavigate();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const [bootcamps, setBootcamps] = useState([])
  const [loading, setLoading] = useState(true);

  function getDate(date){
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = date.split("T")[0];
    let [y, m, day] = d.split("-");
    m = months[parseInt(m) - 1];
    return `${m} ${day}`;
  }

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
          setBootcamps( _ => data);
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
      }finally{
        setLoading(_ => false);
      }
    })()
    flag.current = true;
  },[])

  function gotoCreateCourseHandler(e){
    navigate("create");
  }

  function detailHandler(e, _id){
    navigate("details/"+_id);
  }
  return (
    <Admin header={"Bootcamps"}>
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 style={{margin: 0}}>Bootcamps</h1>  <button type="button" className="btn btn-primary px-5" onClick={gotoCreateCourseHandler}>Add Bootcamp</button>
          </div>
          <div className={clsx.admin__student_main}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <th key={i}>{el}</th>
                ))}
              </thead>
              <tbody>
                {bootcamps.length > 0 ? bootcamps.map(
                  ( {title, duration, description, type, startTime, endTime, endDate, startDate, _id}, i ) => (
                    <BootcampRow
                      key={i}
                      index={i}
                      title={title}
                      detail={description}
                      duration={duration}
                      type={type}
                      admin={false}
                      clickHandler={e => detailHandler(e, _id)}
                      time={`${startTime} - ${endTime} CST`}
                      date={`${getDate(startDate)} - ${getDate(endDate)}`}
                    />
                  )
                ) : <h1>No Bootcamps found</h1>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Admin>
  );
}


// CREATEBOOTCAMP COMPONENT
export function CreateBootcamp(){
  const {adminFunctions: { addBootcamp, fetchBootcamps, updateBootcamp}, } = useAuth(); 
  const {getItem} = useLocalStorage();
  let userdata = getItem(KEY);
  const flag = useRef(false);
  const navigate = useNavigate();

  const location = useLocation();
  const [loader, setLoader] = useState(location.search ? true : false);
  const [formstate, setFormstate] = useState({
    title: "",
    duration: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    description: "",
    type: "",
    instructor: ""
  });

  useEffect(() => {
    if(flag.current) return;
    if(location.search){
      const id = location.search.split("=").reverse()[0];
      console.log(id);
      (async () => {
        try {
          const res = await fetchBootcamps(userdata?.token);
          const { message, success, statusCode } = res;
          if (!success) throw new AdvancedError(message, statusCode);
          else if (statusCode === 1) {
            const { data } = res;
            let found = data.find(d => d._id === id);
            found.startDate = found.startDate.split("T")[0];
            found.endDate = found.endDate.split("T")[0];
            found.instructor = found.instructorName;
            delete found.instructorName;
            console.log(found);
            setFormstate(_ => found);
            toast.success("Bootcamp found successfully", {
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
        }finally{
          setLoader(_ => false);
        }
      })()
    }
    //do some coding
    flag.current = true;
    return () => console.log("Removing CreateBootcamp component");
  }, [])

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  const [loading, setLoading] = useState(false);
  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if ( formstate.description === "" ||
        formstate.title === "" ||
        formstate.duration === "" || formstate.endTime === "" || 
        formstate.startTime === "" || formstate.startDate === "" || 
        formstate.endDate === ""
      ) throw new AdvancedError("All fields are required", 0);

      const res = location.search ? await updateBootcamp(userdata?.token, location.search.split("=").reverse()[0], formstate) : await addBootcamp(userdata?.token, formstate);
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
        navigate("/admin/bootcamps");
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

 
  return (
    <Admin header="Create Bootcamp">
      {loader && <Loader />}
      <div className={clsx.admin_profile}>
        <div className={clsx.edit__profile}>
          <form className="form" onSubmit={submitHandler}>
            <Input
              label="Title"
              name="title"
              type="text"
              handleChange={changeHandler}
              value={formstate.title}
            />
            <Input
              label="Duration"
              name="duration"
              type="text"
              handleChange={changeHandler}
              value={formstate.duration}
            />
            <div className="d-flex flex-wrap">
              <div className="col-sm-6 col-md-3 pe-2 ">
                <Input
                  label="Starts By (Gmt)"
                  name="startTime"
                  type="text"
                  handleChange={changeHandler}
                  value={formstate.startTime}
              />
              </div>
              <div className="col-sm-6 col-md-3 pe-2  ">
                <Input
                label="Ends By (Gmt)"
                name="endTime"
                type="text"
                handleChange={changeHandler}
                value={formstate.endTime}
              />
              </div>
              <div className="col-sm-6 col-md-3 pe-2 ">
                <Input
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formstate.startDate}
                  handleChange={changeHandler}
                />
              </div>
              <div className="col-sm-6 col-md-3 ">
                <Input
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formstate.endDate}
                  handleChange={changeHandler}
                />
              </div>
            </div>
            <div className="row">
            </div>
            <div className={clsx.form_group}>
              <label htmlFor={"brief"}>
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                value={formstate.description}
                onChange={changeHandler}
                className="generic_input"
              ></textarea>
            </div>

            <Input
              label="Instructor"
              name="instructor"
              type="text"
              handleChange={changeHandler}
              value={formstate.instructor}
            />

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
                <option value="full time">Full Time</option>
                <option value="part time">Part-Time</option>
              </select>
            </div>

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
              { location.search ? "Update" : "Save" }
              </button>
            )}
          </form>
        </div>
      </div>
    </Admin>
  );
}

// BOOTCAMPROW COMPONENT
export function BootcampRow({index, title, detail, time, date, type,duration, admin, clickHandler=null }){
  return (
    <tr className={clsx.user__info_card} onClick={clickHandler}>
      <td className={clsx.user__info}>{index + 1}.</td>
      <td className={clsx.user__info}>{title}</td>
      <td className={clsx.user__info}>
          <p className="restricted_line">
            {detail}
          </p> 
        </td>
      <td className={clsx.user__info}>{type}</td>
      <td className={clsx.user__info}>{duration}</td>
      <td className={clsx.user__info}>{date}</td>
      <td className={clsx.user__info}>{time}</td>
      {admin && 
      <td className={clsx.user__info}>
        <div className="d-flex align-items-center" style={{gap:"1rem"}}>
          <i style={{fontSize:"24px", color:"var(--theme-orange)"}}><AiOutlineDelete /></i>
          <i style={{fontSize:"24px", color:"var(--theme-blue)"}}><AiTwotoneEdit /></i>
        </div>
      </td>
      }
      </tr>
  )
}


// ADDSYLLABUS COMPONENT
function AddSyllabus({ open, handleClose, addSyllabus, setOpen }) {
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
      setOpen(_ => false);
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


// CREATECOURSE COMPONENT
export function CreateCourse() {
  const {adminFunctions: { fetchCourses, updateCourse }, teacherFunctions: { addCourse } } = useAuth(); 
  const {getItem} = useLocalStorage();
  const location = useLocation();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const {syllabuses, addtoSyllabus, setSyllabusses} = useSyllabus();
  const [formstate, setFormstate] = useState({
    name: "",
    categoryName: "",
    description: "",
    type: "",
    startDate: "",
    endDate: "",
    price: "",
    faqs: [],
  });
  const [packageState, setPackageState] = useState({
    title: "",
    description: ""
  })
  const [packages, setPackages] = useState([
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
  ])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(location.search ? true : false);
  useEffect(() => {
    if(flag.current) return;
    if(location.search){
      console.log(location.search);
      const id = location.search.split("=")[1];
      (async() => {
        try{
          const res = await fetchCourses(userdata?.token);
          const {message, success, statusCode} = res;
          if(!success) throw new AdvancedError(message, statusCode);
          else {
            const {data} = res;
            const course = data.find(d => d.courseId === id);
            console.log(course);
            setFormstate(old => {
              return {
                ...old,
                name: course.name,
                description: course.description,
                type: course.type,
                categoryName: course.category,
                price: course.price,
                startDate: course.startDate.split("T")[0],
                endDate: course.endDate.split("T")[0]
              }
            })
            setPackages(_ => {
              return course.packages.map(p => {
                return {
                  name: p.title,
                  value: p.title
                }
              })
            })
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
    }
    flag.current = true;
  }, [])

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
    try {
      if (
        formstate.name === "" ||
        formstate.categoryName === "" ||
        formstate.description === "" ||
        formstate.price === "" ||
        formstate.startDate === "" || formstate.endDate === ""
      )
        throw new AdvancedError("All fields are required", 0);
      console.log({...formstate, syllabus: [...syllabuses], packages: [packageState]})
      const res = location.search ? await updateCourse(userdata.token, location.search.split("=")[1], {...formstate, syllabus: [...syllabuses], packages: [...packages]}) : await addCourse({...formstate, syllabus: [...syllabuses], packages: [packageState]}, userdata.token);
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
    <Admin header="Create Course">
      {loader && <Loader />}
      <div className={clsx.admin_profile}>
        <div className={clsx.edit__profile}>
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
              <label htmlFor={"description"}>
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
            <div className="d-flex flex-wrap">
              <div className="col-sm-5 col-md-5" style={{marginRight: 50}}>
                <Input
                  label="Start Date"
                  name="startDate"
                  type="date"
                  value={formstate.startDate}
                  handleChange={changeHandler}
                />
              </div>
              <div className="col-sm-5 col-md-5">
                <Input
                  label="End Date"
                  name="endDate"
                  type="date"
                  value={formstate.endDate}
                  handleChange={changeHandler}
                />
              </div>
            </div>
           {!location.search && (<div className={clsx.form_group}>
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
            </div>)}


            <Input
              label="Price"
              name="price"
              type="text"
              handleChange={changeHandler}
              value={formstate.price}
            />

            <div className={clsx.form_group}>
              <label>Syllabus</label>
              {
                syllabuses.length !== 0 ? syllabuses.map(({title, description}, i) => (
                  <Syllabus title={title} key={i} description={description} />
                )) : <p className="m-0 text-danger" style={{fontSize: '0.8rem', textIndent: 20}}>No syllabus!</p>
              }
            </div>

            <button
              className="btn btn-primary mb-5"
              style={{ backgroundColor: "var(--theme-blue)" }}
              type="button"
              onClick={openModal}
              disabled={loading}
            >
              Add Syllabus
            </button>

            {loading ? (
              <button className="button button-lg log_btn w-100 mt-3" disabled={loading}>
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button
                className="button button-lg log_btn w-100 mt-3"
                type="submit"
              >
                {location.search ? "Update" : "Save"}
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



// FEES COMPONENT
export function Fees() {
  const tableHeaders = ["No", "Name", "Date", "Email", "Paid", "Amount Unpaid"];
  const tableContents = [
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      paid: 2000,
      unpaid: 2000,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      paid: 4000,
      unpaid: 3000,
    },
    {
      name: "Melanie Grutt",
      img: img01,
      date: "Feb 24",
      email: "melanie@gmail.com",
      paid: 1000,
      unpaid: 500,
    },
    {
      name: "Kiera Danlop",
      img: img02,
      date: "Mar 23",
      email: "kiera@gmail.com",
      paid: 6000,
      unpaid: 2000,
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
                {tableContents.map(({ img, email, date, name, paid, unpaid }, i) => (
                  <UserInfoCard
                    key={i}
                    firstName={name.split(" ")[0]}
                    lastName={name.split(" ")[1]}
                    img={img}
                    paid={paid}
                    date={date}
                    email={email}
                    unpaid={unpaid}
                    user={true}
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



// STUDENT COMPONENT
export function Student() {
  const [studentList, setStudentList] = useState([]);
  const {getItem} = useLocalStorage();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const [loader, setLoader] = useState(true);

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
        }finally{
          setLoader(_ => false);
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
      {loader && <Loader />}
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
                {studentList?.length > 0 &&
                  studentList?.map(
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


// PROFILEEDIT COMPONENT
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
  const navigate = useNavigate();

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
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <h3>Update Profile</h3>
          <div className="row w-100 mt-4">
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
          <div className={clsx.edit__picture}>
            <button style={{
              border:"1px dotted var(--theme-blue)",
              outline:"none",
              color:"var(--theme-blue)",
              padding:"4px",
              borderRadius:"8px"
            }} 
            type="button" onClick={()=>{
                navigate("/change-password")
            }}>Change Password</button>
          </div>
          <form className="form" onSubmit={submitHandler} style={{width: "80%"}}>
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
    generalState: { isMobile, showSidebar,loading },
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
        <ToastContainer
          position="top-right"
          autoClose={4500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
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
        {loading && <Loader />}
      </div>
    </GuardedRoute>
  );
};

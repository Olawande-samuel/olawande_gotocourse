import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Box } from "@mui/material";

import clsx from "./styles.module.css";
import { useAuth } from "../../../contexts/Auth";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { useSyllabus } from "../../../contexts/Syllabus";
import {KEY} from "../../../constants"
import vector from "../../../images/vector.png";
import UploadForm from "../../../components/UploadForm";
import  {PreviewModal, Teachers} from "./index"
import { BiTrash } from "react-icons/bi";


export const Syllabus = ({
    title,
    description,
    packagelist,
    price,
    deleteOption,
    index,
    packageItems,
    setPackageList,
  }) => {
    const location = useLocation()
    return (
      <div className={clsx.syllabus_container}>
        <h5>{changeConstants(title)}</h5>
        {packagelist && <p>{price}</p>}
        <p>{description}</p>
        {location.search && 
        <p>
          <i className="text-danger" style={{cursor:"pointer"}} onClick={()=>deleteOption(index)}>
            <BiTrash />
          </i>
        </p>
        }
      </div>
    );
  };
  
  export default function CreateCourse(){
    return(
      <Teachers header="Create Course">
        <div className={clsx.teachers_profile}>
          <CreateCourseMain type="teacher" />
        </div>
     </Teachers>
    )
  }

  export  function CreateCourseMain({type}) {
    const location = useLocation();
    const ref = useRef(false);
    const navigate = useNavigate();
    const { getItem } = useLocalStorage();

    const {
      generalState: { courseInfo },
      teacherFunctions: { addCourse, updateCourse },
      adminFunctions: { addCourse:adminAddCourse, adminUpdateCourse },
      otherFunctions: { fetchCategories },
    } = useAuth();
      
    let userdata = getItem(KEY);

    const [preview, setPreview] = useState({});
    const [open, setOpen] = useState(false);
  
    const [formstate, setFormstate] = useState({
      name: courseInfo?.name ?? "",
      categoryName: courseInfo?.category ?? "",
      description: courseInfo?.description ?? "",
      courseImg: courseInfo?.courseImg ?? "",
      startDate: courseInfo?.startDate ?? "",
      endDate: courseInfo?.endDate ?? "",
      type: "PACKAGE",
      syllabus: [],
      faqs: [],
      packages: [],
    });
  
    let courseData = getItem("gotocourse-courseEdit")

    useEffect(()=>{
      if(location.search){
        if(courseData){
          setFormstate(courseData)
          if(courseData.courseImg){
            const imgArr = courseData.courseImg.split("/").slice(-1)
            setFormstate({...courseData, courseImg: imgArr[0]})
          }
        }
      }
    },[courseData.category])

    const { syllabuses, addtoSyllabus, setSyllabusses } = useSyllabus();
    const [faq, setFaq] = useState(formstate?.faqs ?? []);
    const [packageList, setPackageList] = useState([]);
    const [instructorsList, setInstructorsList] = useState([]);
    const [editInstructorsList, setEditInstructorsList] = useState([]);
  
    const [categories, setCategories] = useState([]); 
    const [openImage, setOpenImage] = useState(false);
    const [openPackage, setOpenPackage] = useState(false);
    const [openInstructor, setOpenInstructor] = useState(false);
    const [openFaq, setOpenFaq] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openPreview, setOpenPreview] = useState(false);
    const [packageFilter, setPackageFilter] = useState("");
   
  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }


  const showPreview = (e) => {
    e.preventDefault();
    setPreview({
      ...formstate,
      type:"PACKAGE",
    });
    setOpenPreview(true);
  };

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    if(formstate?.courseId){
      try {
        if ( formstate.name === "" || formstate.categoryName === "" || formstate.description === "" ) throw new AdvancedError("All fields are required", 0);
          let currentInstructor= [];
          formstate.instructors.length > 0 && formstate.instructors.forEach(tutor=>{currentInstructor.push(tutor.email)})
          let formdata = {
            ...formstate,
            type:"PACKAGE",
            instructors:[...instructorsList, ...currentInstructor]
          }

        const res = type === "admin" ?
          await adminUpdateCourse( userdata?.token, formstate?.courseId,  {
            ...formdata,
            startDate: new Date(formstate.startDate).toISOString().split('T')[0],
            endDate: new Date(formstate.endDate).toISOString().split('T')[0],
            categoryName: formstate.category

          }) 
        : await updateCourse( userdata?.token, formstate?.courseId, formdata, userdata.token );

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
          navigate(type === "admin"? "/admin/courses":"/teacher/courses")
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
    } else {
    try {
      if (
        formstate.name === "" ||
        formstate.categoryName === "" ||
        formstate.description === ""
      )
        throw new AdvancedError("All fields are required", 0);
      const res = type=== "admin" ? await adminAddCourse(
        {
          ...formstate,
          type:"PACKAGE",
          instructors:[...instructorsList]
        },
        userdata.token
      ): await addCourse(
        {
          ...formstate,
          type:"PACKAGE",
        },
        userdata.token
      );
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
  }
  
  // get Categories
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (ref.current) return;
      (async () => {
        try {
          setLoading(true);
          const res = await fetchCategories();
          const { success, message, statusCode } = res;

          if (!success || statusCode !== 1)
            throw new AdvancedError(message, statusCode);
          const { data } = res;
          setCategories(data);
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
          setLoading(false);
        }
      })();

      ref.current = true;
    }

    return () => (mounted = false);
  }, []);

  const openModal = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const openPackageModal = () => {
    setOpenPackage(true);
  };
  const openInstructorModal = () => {
    setOpenInstructor(true);
  };
  const handleClosePackage = () => {
    setOpenPackage(false);
  };
  const handleCloseInstuctors = () => {
    setOpenInstructor(false);
  };
  const openFaqModal = () => {
    setOpenFaq(true);
  };
  const handleCloseFaq = () => {
    setOpenFaq(false);
  };
  // const handleOpenPreview = ()=>{
  //   setOpenPreview(true)
  // }
  function showUploadFormHandler() {
    setOpenImage((_) => true);
  }
  function filterPackage(title, index) {
    setPackageFilter(index);
  }
  function deleteSyllabus(e){
    let newSyllabusArr = formstate.syllabus.filter((item, index) => (item.title + index) !== e)
    setFormstate({...formstate, syllabus:newSyllabusArr})

  }
  function deletePackage(e){
    console.log(e)
    let newPackageList = formstate.packages.filter((item, index) => (item.title + index) !== e)
    console.log(newPackageList)
    setFormstate({...formstate, packages:newPackageList})
  }

  function removeTeacher(e){
    let currentTeachers = formstate.instructors.filter(item=>item.tutorId !== e)
    setFormstate({...formstate, instructors: currentTeachers})
  }
  function deleteFaq(e){
    let faq = formstate.faqs.filter((item, index)=>(item.title + index) !== e)
    setFormstate({...formstate, faqs: faq})
  }

  console.log({formstate})
  console.log({courseData})

    return (
     <>
          <div className={clsx.edit__profile}>
            {location.search ? 
            <h2>Edit course</h2>
              :
            <h2>Create a new course</h2>
            }
            <UploadForm isOpen={openImage} setIsOpen={setOpenImage} />
            <div
              className={clsx.upload__file_box}
              onClick={showUploadFormHandler}
            >
              <img src={vector} alt={"Placeholder"} />
              <p>Upload Course Image</p>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <Input
                label="Course File name"
                name="courseImg"
                type="text"
                handleChange={changeHandler}
                value={formstate.courseImg}
              />
              <Input
                label="Name of course"
                name="name"
                type="text"
                handleChange={changeHandler}
                value={formstate.name}
              />
              {/* should be a select field */}
              <div className={clsx.form_group}>
                <label htmlFor={"package"}>Category</label>
                <select
                  rows="5"
                  name="categoryName"
                  value={formstate.categoryName}
                  onChange={changeHandler}
                  className="form-select generic_input"
                >
                  <option value="">Choose a Category</option>
                  {categories.length > 0 &&
                    categories.map((item, i) => (
                      <option key={i} value={item.name}>{item.name}</option>
                    ))}
                </select>
              </div>
  
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
              <div className="d-flex flex-wrap" style={{ gap: ".5rem" }}>
                <div className="col-sm-4">
                  <Input
                    label="Start Date"
                    name="startDate"
                    type="date"
                    handleChange={changeHandler}
                    value={formstate.start_date}
                  />
                </div>
                <div className="col-sm-4">
                  <Input
                    label="End Date"
                    name="endDate"
                    type="date"
                    handleChange={changeHandler}
                    value={formstate.end_date}
                  />
                </div>
              </div>
              <div className={clsx.form_group}>
                <label htmlFor={"package"} className="form-label generic_label">
                  Packages
                </label>
                {formstate.packages?.length > 0 ? (
                  formstate.packages?.map((item, index) => (
                     <div className={clsx.syllabus_container}>
                        <h5>{changeConstants(item.title)}</h5>
                        {<p>{item.price}</p>}
                        <p>{item.description}</p>
                        {
                          location.search && 
                          <p>
                            <i className="text-danger" style={{cursor:"pointer"}} onClick={()=>deletePackage(item.title + index)}>
                              <BiTrash />
                            </i>
                          </p>
                        }
                      </div>
                  ))
                ) : (
                  <h6>No Package available</h6>
                )}
              </div>
  
              <button
                className="btn btn-primary my-3"
                style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px", }}
                type="button"
                onClick={openPackageModal}
              >
                Add Package
              </button>
  
              <div className={clsx.form_group}>
                <label className="form-label generic_label">Syllabus</label>
                {formstate.syllabus?.length !== 0 ? (
                  formstate.syllabus?.map(({ title, description, }, i) => (
                    <div className={clsx.syllabus_container}>
                        <h5>{title}</h5>
                        <p>{description}</p>
                        {
                          location.search && 
                          <p>
                            <i className="text-danger" style={{cursor:"pointer"}} onClick={()=>deleteSyllabus(title + i)}>
                              <BiTrash />
                            </i>
                          </p>
                        }
                      </div>
                  ))
                ) : (
                  <h6>No syllabus!</h6>
                )}
              </div>
  
              <button
                className="btn btn-primary my-3"
                style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px", }}
                type="button"
                onClick={openModal}
              >
                Add Syllabus
              </button>
              {
                type === "admin" && (
                  <>
                    {location.search &&
                   <div className={clsx.form_group}>
                    <label htmlFor={"package"} className="form-label generic_label">
                      Current Instructors
                    </label>
                    {formstate.instructors?.length > 0 ? (
                      formstate.instructors?.map((item, i) => ( <Syllabus key={i} title={item.name} deleteOption={removeTeacher} index={item.tutorId} />) )
                    ) : (
                      <h6>No instructor</h6>
                    )}
                    </div>
                  }
                  
                  <div className={clsx.form_group}>
                    <label htmlFor={"package"} className="form-label generic_label">
                      New Instructors
                    </label>
                    {instructorsList.length > 0 ? (
                      instructorsList.map((item, i) => <p key={1}>{item}</p>)
                    ) : (
                      <h6>No instructor</h6>
                    )}
                  </div>
      
                  <button
                    className="btn btn-primary my-3"
                    style={{ backgroundColor: "var(--theme-blue)", fontSize: "14px", }}
                    type="button"
                    onClick={openInstructorModal}
                  >
                    Add Instructor
                  </button>
                  </>
                )
              }

              <div className={clsx.form_group}>
                <label htmlFor={"package"} className="form-label generic_label">
                  FAQ
                </label>
                {formstate.faqs?.length > 0 ? (
                  formstate.faqs?.map((item, i) => (
                    <div className={clsx.syllabus_container}>
                    <h5>{item.title}</h5>
                    <p>{item.description}</p>
                    {
                      location.search && 
                      <p>
                        <i className="text-danger" style={{cursor:"pointer"}} onClick={()=>deleteFaq(item.title + i)}>
                          <BiTrash />
                        </i>
                      </p>
                    }
                  </div>
                  ))
                ) : (
                  <h6>No faq</h6>
                )}
              </div>
  
              <button
                className="btn btn-primary my-3"
                style={{ backgroundColor: "var(--theme-blue)" }}
                type="button"
                onClick={openFaqModal}
              >
                Add FAQ
              </button>
              <div className="d-flex flex-wrap mt-3" style={{ gap: "1rem " }}>
                {loading ? (
                  <button
                    className="button log_btn"
                    style={{
                      padding: "10px 44px",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </button>
                ) : (
                  <button
                    className="button log_btn"
                    style={{
                      padding: "10px 44px",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                    }}
                    type="submit"
                  >
                    Save
                  </button>
                )}
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={showPreview}
                  style={{
                    border: "1px solid var(--theme-blue)",
                    color: "var(--theme-blue)",
                    padding: "10px 44px",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                  }}
                >
                  Preview
                </button>
              </div>
            </form>
          </div>
          <PreviewModal
            open={openPreview}
            preview={preview}
            setOpen={setOpenPreview}
          />
        <AddSyllabus
          open={open}
          addSyllabus={addtoSyllabus}
          formstate={formstate}
          setFormstate={setFormstate}
          setOpen={setOpen}
          handleClose={handleClose}
        />
        <AddPackage
          openPackage={openPackage}
          addPackage={setFormstate}
          list={formstate}
          setOpen={setOpen}
          handleClosePackage={handleClosePackage}
        />
        {type === "admin" && 
        <AddInstructors
          openInstructors={openInstructor}
          addInstructor={setInstructorsList}
          list={instructorsList}
          setOpen={setOpen}
          handleCloseInstructors={handleCloseInstuctors}
          />
        }
        <AddFaq
          openFaq={openFaq}
          handleCloseFaq={handleCloseFaq}
          addFaq={setFormstate}
          list={formstate}
        />
     </>

    );
  }
  
 export function UploadImageIcon({showUploadFormHandler, title}){
    <div
    className={clsx.upload__file_box}
    onClick={showUploadFormHandler}
  >
    <img src={vector} alt={"Placeholder"} />
    <p>{title}</p>
  </div>
  }

  function AddSyllabus({ open, handleClose, formstate, setFormstate, addSyllabus }) {
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
      const { name, value } = e.target;
      setNewSyllabus((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    }
  
    function addSyllabusHandler() {
      const { title, description } = newSyllabus;
      if (!title || !description) {
        toast.error("Title and Description are required", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        setFormstate({...formstate, syllabus: [...formstate.syllabus, newSyllabus]});
        setNewSyllabus({
          title: "",
          description: "",
        })
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
  function AddPackage({ openPackage, handleClosePackage, list, addPackage }) {
    const [newPackage, setNewPackage] = useState({
      title: "",
      price: "",
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
      const { name, value } = e.target;
      setNewPackage((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    }
  
    function addPackageHandler() {
      const { title, description, price } = newPackage;
      if (!title || !description || !price) {
        toast.error("All field are required", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        addPackage({...list, packages: [...list.packages, newPackage]});
        toast.success("Package added successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNewPackage({
          title: "",
          price: "",
          description: "",
        });
      }
    }

    return (
      <Modal
        open={openPackage}
        onClose={handleClosePackage}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <h5
            className="lead text-primary"
            style={{ color: "var(--theme-blue)" }}
          >
            Add Package
          </h5>
          <div className={clsx.form_group}>
            <label htmlFor={"package"}>Type</label>
            <select
              name="title"
              value={newPackage.title}
              onChange={handleChange}
              className="form-select generic_input"
            >
              <option value="">Choose a Type</option>
              <option value="ONE-ON-ONE">One-on-One</option>
              <option value="COHORT">Cohort</option>
              <option value="SELF_PACED">Self Paced</option>
              <option value="PHYSICAL">In-person Training</option>
            </select>
          </div>
          <Input
            label="Price"
            name="price"
            type="number"
            handleChange={handleChange}
            value={newPackage.price}
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
              value={newPackage.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className="btn btn-primary my-3"
            onClick={addPackageHandler}
            style={{ backgroundColor: "var(--theme-blue)" }}
          >
            Add
          </button>
        </Box>
      </Modal>
    );
  }
  function AddInstructors({ openInstructors, handleCloseInstructors, list, addInstructor }) {
    const [newInstructor, setNewInstructor] = useState("");
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
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const flag = useRef(false);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    
    adminTeacherFunctions: { fetch }
  } = useAuth();
    function handleChange(e) {
      setNewInstructor(e.target.value);
    }
  
    function addInstructorHandler() {
      if (!newInstructor) {
        toast.error("All fields are required", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        addInstructor([...list, newInstructor]);
        toast.success("Instructor added successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setNewInstructor({
          title: "",
          price: "",
          description: "",
        });
      }
    }

    useEffect(() => {
      if(flag.current) return;
      (async () => {
        try {
          const token = userdata?.token;
          const res = await fetch(token);
          const { message, success, statusCode } = res;
          if (!success) throw new AdvancedError(message, statusCode);
          else {
            const { data } = res;
            //do somethings
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
  
    return (
      <Modal
        open={openInstructors}
        onClose={handleCloseInstructors}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <h5
            className="lead text-primary"
            style={{ color: "var(--theme-blue)" }}
          >
            Add Instructor
          </h5>
          <div className={clsx.form_group}>
            <label htmlFor={"package"}>Type</label>
            <select
              name="title"
              value={newInstructor}
              onChange={handleChange}
              className="form-select generic_input"
            >
              <option value="">Choose an instructor</option>
              {teachers.filter((teacher)=>teacher.userType !== "mentor").map(teacher=>(
                <option value={teacher.email}>{teacher.firstName} - {teacher.lastName}</option>
              ))}
            </select>
          </div>
          <button
            className="btn btn-primary my-3"
            onClick={addInstructorHandler}
            style={{ backgroundColor: "var(--theme-blue)" }}
          >
            Add
          </button>
        </Box>
      </Modal>
    );
  }
  function AddFaq({ openFaq, handleCloseFaq, list, addFaq }) {
    const [faq, setFaq] = useState({
      title: "",
      price: "",
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
      const { name, value } = e.target;
      setFaq((old) => {
        return {
          ...old,
          [name]: value,
        };
      });
    }
  
    function addFaqHandler() {
      const { title, description } = faq;
      if (!title || !description) {
        toast.error("All field are required", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        addFaq({...list, faqs: [...list.faqs, faq]});
        toast.success("FAQ added successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setFaq({
          title: "",
          description: "",
        });
      }
    }
  
    return (
      <Modal
        open={openFaq}
        onClose={handleCloseFaq}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={style}>
          <h5
            className="lead text-primary"
            style={{ color: "var(--theme-blue)" }}
          >
            Add Faq
          </h5>
  
          <Input
            label="Question"
            name="title"
            type="text"
            handleChange={handleChange}
            value={faq.title}
          />
          <div className="form-group my-3">
            <label htmlFor="description" className="form-label generic_label">
              Answer
            </label>
            <textarea
              rows="5"
              id="description"
              name="description"
              className="form-control generic_input"
              value={faq.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className="btn btn-primary my-3"
            onClick={addFaqHandler}
            style={{ backgroundColor: "var(--theme-blue)" }}
          >
            Add
          </button>
        </Box>
      </Modal>
    );
  }
  export function changeConstants(name){
    if(name === "SELF_PACED") return "self-paced"
    if(name === "COHORT") return "Cohort"
    if(name === "ONE_ON_ONE") return "One-on-One"
    if(name === "PHYSICAL") return "In-person Training"
    return name
  }
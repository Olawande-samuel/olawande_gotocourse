import { useEffect, useState, useRef } from "react";
import { MdEdit, MdPersonAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Box, Typography } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";

import Loader from "../../../components/Loader";
import { Sidebar, Searchbar } from "../components";
import clsx from "./styles.module.css";
import { colors } from "../../../constants";
import avatar from "../../../images/teacher.png";
import { useAuth } from "../../../contexts/Auth";
import { GuardedRoute } from "../../../hoc";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import { BootcampRow, UserInfoCard } from "../Admin";
import { useLocalStorage } from "../../../hooks";
import { useSyllabus } from "../../../contexts/Syllabus";
import { Chart as ChartLogo } from "../../../images/components/svgs";
import MyChart from "../../../components/Chart";
import Layout from "../../../components/Layout";
import { CourseProfile } from "../../Courses";
import vector from "../../../images/vector.png";
import UploadForm from "../../../components/UploadForm";
import { BiTrash } from "react-icons/bi";

// import { PreviewModal } from "../components/Preview";

const KEY = "gotocourse-userdata";

export function Profile() {
  const { updateItem, getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const {
    generalState: { isMobile, notification, loading },
    setGeneralState,
    generalState,
    teacherFunctions: { fetchProfile },
  } = useAuth();
  const flag = useRef(false);

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
    if (flag.current) return;

    if (userdata) {
      async function get() {
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
          setGeneralState({ ...generalState, loading: false });

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

    flag.current = true;
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
            <Info title="Brief Introduction" content={userdata?.bio} />
            <Info title="Location" content={userdata?.location} />
            <Info title="Courses" content={userdata?.courses} />
            <Info title="Category" content={userdata?.category} />
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

const Syllabus = ({
  title,
  description,
  packagelist,
  price,
  deleteOption,
  index,
  packageItems,
  setPackageList,
}) => {
  return (
    <div className={clsx.syllabus_container}>
      <h5>{title}</h5>
      {packagelist && <p>{price}</p>}
      <p>{description}</p>
      <p>
        {/* <i className="text-danger" style={{cursor:"pointer"}} onClick={()=>deleteOption(index)}>
          <BiTrash />
        </i> */}
      </p>
    </div>
  );
};

export function CreateCourse() {
  const ref = useRef(false);
const navigate = useNavigate();
  const {
    generalState: { courseInfo },
    teacherFunctions: { addCourse, updateCourse },
    otherFunctions: { fetchCategories },
  } = useAuth();
  console.log(courseInfo);

  const { getItem } = useLocalStorage();
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
    faqs: courseInfo?.faqs ?? [],

  });

  const { syllabuses, addtoSyllabus } = useSyllabus();
  const [faq, setFaq] = useState(courseInfo?.faqs ?? []);
  const [packageList, setPackageList] = useState(courseInfo?.packages ?? []);

  const [categories, setCategories] = useState([]);
  const [openImage, setOpenImage] = useState(false);
  const [openPackage, setOpenPackage] = useState(false);
  const [openFaq, setOpenFaq] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [packageFilter, setPackageFilter] = useState("");

// check if courseinfo exist then setSyllabus to existing syllabus
useEffect(()=>{
  if(courseInfo?.syllabus?.length > 0){
    addtoSyllabus({...courseInfo.syllabus})
  }
  

},[courseInfo])

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }
  console.log(formstate);

  // let preview = {}

  const showPreview = (e) => {
    e.preventDefault();
    setPreview({
      ...formstate,
      syllabus: [...syllabuses],
      packages: [...packageList],
      faqs: [...faq],
    });
    console.log("clicked");
    setOpenPreview(true);
  };

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);
    if(courseInfo?.courseId){
      console.log("submit", "updatecourse")
      try {
        if (
          formstate.name === "" ||
          formstate.categoryName === "" ||
          formstate.description === "" ||
          formstate.price === ""
        )
          throw new AdvancedError("All fields are required", 0);
        const res = await updateCourse( userdata?.token, courseInfo?.courseId,
          {
            ...formstate,
            syllabus: [...syllabuses],
            packages: [...packageList],
            faqs: [...faq],
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
          navigate("/teacher/courses")
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
      console.log("submit", "addcourse")

      if (
        formstate.name === "" ||
        formstate.categoryName === "" ||
        formstate.description === "" ||
        formstate.price === ""
      )
        throw new AdvancedError("All fields are required", 0);
      const res = await addCourse(
        {
          ...formstate,
          syllabus: [...syllabuses],
          packages: [...packageList],
          faqs: [...faq],
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
  const handleClosePackage = () => {
    setOpenPackage(false);
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
    console.log(index);
  }
  return (
    <Teachers>
      <div className={clsx.teachers_profile}>
        <div className={clsx.edit__profile}>
          {courseInfo?.name ? 
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
                  categories.map((item) => (
                    <option value={item.name}>{item.name}</option>
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
                Package
              </label>
              {packageList.length > 0 ? (
                packageList.map((item, index) => (
                  <Syllabus
                    key={item.title}
                    {...item}
                    packagelist={true}
                    index={index}
                    packageItems={packageList}
                    setPackageList={setPackageList}
                  />
                ))
              ) : (
                <h6>No Packages</h6>
              )}
            </div>

            <button
              className="btn btn-primary my-3"
              style={{ backgroundColor: "var(--theme-blue)" }}
              type="button"
              onClick={openPackageModal}
            >
              Add Package
            </button>

            <Input
              label="Price"
              name="price"
              type="text"
              handleChange={changeHandler}
              value={formstate.price}
            />

            <div className={clsx.form_group}>
              <label className="form-label generic_label">Syllabus</label>
              {syllabuses.length !== 0 ? (
                syllabuses.map(({ title, description }, i) => (
                  <Syllabus title={title} key={i} description={description} />
                ))
              ) : (
                <h6>No syllabus!</h6>
              )}
            </div>

            <button
              className="btn btn-primary my-3"
              style={{ backgroundColor: "var(--theme-blue)" }}
              type="button"
              onClick={openModal}
            >
              Add Syllabus
            </button>
            <div className={clsx.form_group}>
              <label htmlFor={"package"} className="form-label generic_label">
                FAQ
              </label>
              {faq.length > 0 ? (
                faq.map((item) => <Syllabus {...item} />)
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
                    fontSize: "16px",
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
      </div>
      <AddSyllabus
        open={open}
        addSyllabus={addtoSyllabus}
        setOpen={setOpen}
        handleClose={handleClose}
      />
      <AddPackage
        openPackage={openPackage}
        addPackage={setPackageList}
        list={packageList}
        setOpen={setOpen}
        handleClosePackage={handleClosePackage}
      />
      <AddFaq
        openFaq={openFaq}
        handleCloseFaq={handleCloseFaq}
        addFaq={setFaq}
        list={faq}
      />
    </Teachers>
  );
}
export function CourseInfo() {
  const navigate = useNavigate();
  const ref = useRef(false);
  const {id} = useParams()
  const { generalState: { courseInfo, loading }, generalState, setGeneralState, teacherFunctions: { fetchCourse, deleteCourse }, } = useAuth();

  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  
  const [btnloading, setLoading]= useState(false)
  const [formstate, setFormstate] = useState({}); 
  console.log(formstate);

  async function handleCourseEdit(e){
    setGeneralState({...generalState, courseInfo: formstate})
      navigate("/teacher/courses/create")
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
            <Input
              label="Price"
              name="price"
              type="text"
              value={formstate.price}
              readOnly={true}
            />

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
                formstate.faq?.map((item) => <Syllabus {...item} />)
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
              {btnloading ? (
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
              )}
            </div>
          </form>
        </div>
      </div>
      
    </Teachers>
  );
}

export function PreviewModal({ preview, open, setOpen }) {
  console.log("modal", preview);
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
      addPackage([...list, newPackage]);
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
            <option value="one-on-one">One-on-One</option>
            <option value="cohort">Cohort</option>
            <option value="Self Paced">Self Paced</option>
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
      addFaq([...list, faq]);
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

export function Bootcamps() {
  const {
    teacherFunctions: { fetchBootcamps },
  } = useAuth();
  const { getItem } = useLocalStorage();
  const navigate = useNavigate();
  const flag = useRef(false);
  let userdata = getItem(KEY);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(true);

  const tableHeaders = [
    "No",
    "Title",
    "Details",
    "Type",
    "Duration",
    "Date",
    "Time",
  ];

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
            toast.error("No bootcamp assigned", {
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
        setLoading((_) => false);
      }
    })();
    flag.current = true;
  }, []);

  function getDate(date){
  
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = date.split("T")[0];
    let [y, m, day] = d.split("-");
    m = months[parseInt(m) - 1];
    return `${m} ${day}`;
  }
  function detailHandler(e, _id, item){
    localStorage.setItem("gotocourse-teacherbootcamp", JSON.stringify(item))
    navigate("details/"+_id);
  }
  return (
    <Teachers header={"Bootcamps"}>
      {loading && <Loader />}
      <div className={clsx["admin_profile"]}>
        <div className={clsx.admin__student}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 style={{ margin: 0 }}>Bootcamps</h1>
          </div>

          <div className={clsx.admin__student_main}>
            <table className={clsx.admin__student_table}>
              <thead>
                {tableHeaders.map((el, i) => (
                  <th key={i}>{el}</th>
                ))}
              </thead>
              <tbody>
                {courseList.length > 0 &&
                  courseList.map((item, i) => (
                    <BootcampRow
                    key={i}
                    index={i}
                    title={item.title}
                    detail={item.description}
                    duration={item.duration}
                    type={item.type}
                    admin={false}
                    clickHandler={e => detailHandler(e, item._id, item)}
                    time={`${item.startTime} - ${item.endTime} CST`}
                    date={`${getDate(item.startDate)} - ${getDate(item.endDate)}`}
                    />
                  ))}
                <p></p>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Teachers>
  );
}
export function BootcampDetails({}){
  const navigate = useNavigate();
  const {getItem} = useLocalStorage();

  const bookcampInfo = getItem("gotocourse-teacherbootcamp")
  let userdata = getItem(KEY);

  const {adminFunctions: {deleteBootcamp}} = useAuth();
  const flag = useRef(false);
  const [formstate, setFormstate] = useState({
    title: "",
    description: "",
    instructor: "",
    student: ""
  })
  // const [loading, setLoading] = useState(true);
  const instructors = ["Dr. Joy Castus"];
  const students = ["James Segun"];
  const params = useParams()
  //get user id
  console.log(params);
  useEffect(() => {


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


  async function deleteBootcampHandler(e){
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
    }
  }

  function editBootcampHandler(e){
    navigate(`/teacher/bootcamps/create?edit=${params?.id}`);
  }


  return(
    <Teachers header="Teacher">
      {/* {loading && <Loader />} */}
      <div className={clsx.teachers_profile}>
        <div className={clsx.admin__student}>
          <div className={clsx.admin__student_main}>
          <div className="d-flex justify-content-between align-items-center mb-5" style={{width: "80%"}}>
            {/* <button type="button" className="btn btn-sm btn-danger px-3 py-2" style={{fontSize: "0.8rem"}} onClick={deleteBootcampHandler}>Delete Bootcamp</button>
            <button type="button" className="btn btn-sm btn-primary px-3 py-2" style={{fontSize: "0.8rem"}} onClick={editBootcampHandler}>Edit Bootcamp</button> */}
            <h3>Bootcamp</h3>
          </div>

          <form className="form" style={{width: "80%", margin: "20px 0px"}}>
            <Input
              label="Title"
              name="title"
              type="text"
              handleChange={changeHandler}
              value={bookcampInfo?.title}
              readOnly={true}
            />

            <div className={clsx.form_group}>
              <label htmlFor={"description"} className="form-label generic_label">
                Description
              </label>
              <textarea
                rows="5"
                name="description"
                value={bookcampInfo?.description}
                onChange={changeHandler}
                className="form-control generic_input"
                readOnly
              ></textarea>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label className="form-label generic_label">Instructors</label>
                {/* {
                  instructors.map((t, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {t}</p> 
                    </div>
                  ))
                } */}
                <p>{bookcampInfo?.instructorName}</p>
              </div>
            </div>

            <div className={clsx.form_group}>
              <div className={clsx.form_group__teachers}>
                <label className="form-label generic_label">Add Student</label>
                {
                  students.map((s, i) => (
                    <div key={i}>
                      <p>{i + 1}. &nbsp; {s}</p> 
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
      </div>
    </Teachers>
  )
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
  const [isUplaoding, setIsUploading] = useState(false);
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

export function Classes() {
  const navigate = useNavigate();
  const {
    generalState: { isMobile },
    setGeneralState,
    generalState,
    teacherFunctions: { fetchApplications },
  } = useAuth();
  const { getItem } = useLocalStorage();
  const [applications, setApplications] = useState([]);
  let userdata = getItem(KEY);

  const flag = useRef(false);

  const getApplication = async () => {
    setGeneralState({ ...generalState, loading: true });

    try {
      const res = await fetchApplications(userdata?.token);
      setGeneralState({ ...generalState, loading: false });

      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
        if (data.length <= 0) {
          throw new AdvancedError("Your applications list is empty", 0);
        } else {
          setApplications((_) => data);
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
    } catch (err) {
      setGeneralState({ ...generalState, loading: false });
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
  };

  useEffect(() => {
    if (flag.current) return;

    //fetch courses
    if (userdata) {
      getApplication();
    }
    flag.current = true;
  }, [userdata]);
  const tableHeaders = [
    "No",
    "Course Name",
    "Number Enrolled",
    "Teaching Model",
    "Status",
  ];
  const data =
    applications.length > 0
      ? applications
      : [
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
        {applications.length > 0 ? (
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
        ) : (
          <div className="text-center">
            <p className="lead">Your classes list is empty</p>
          </div>
        )}
      </div>
    </Teachers>
  );
}

export function Earnings() {
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const data = [
    {
      id: 1,
      title: "Day",
    },
    {
      id: 2,
      title: "Week",
    },
    {
      id: 3,
      title: "1 month",
    },
    {
      id: 4,
      title: "3 months",
    },
    {
      id: 5,
      title: "6 months",
    },
    {
      id: 6,
      title: "1 year",
    },
  ];
  const {
    generalState: { isMobile },
  } = useAuth();
  return (
    <Teachers isMobile={isMobile} userdata={userdata}>
      <div className={clsx.teachers_profile}>
        <div
          className="d-flex align-items-center mt-3 mb-5"
          style={{ gap: "1rem" }}
        >
          <i>
            <FiFilter />
          </i>
          <span>Filter by: </span>
          {data.map((date) => (
            <FilterButton title={date.title} />
          ))}
        </div>
        <div
          className="d-flex flex-wrap justify-content-center justify-content-md-start"
          style={{ gap: "1.5rem" }}
        >
          <EarningsCard title="Teaching Model" type="COHORT" value="0" />
          <EarningsCard title="Per Course" type="Cybersecurity" value="0" />
          <EarningsCard total={true} value="0" />
        </div>
        <MyChart />
      </div>
    </Teachers>
  );
}

function FilterButton({ title }) {
  return (
    <button
      style={{
        background: "#FFFFFF",
        border: "1px solid #9F9F9F",
        borderRadius: "10px",
        padding: "3px 13px",
      }}
      value={title}
    >
      {title}
    </button>
  );
}

export function EarningsCard({ title, type, options = [], total, value }) {
  return (
    <div className="earnings_card">
      <p className="text">{title}</p>
      <div className="card">
        <div className="card-body">
          <div>
            {total ? (
              <h3>TOTAL</h3>
            ) : (
              <select name="model" id="model" className="form-select w-75">
                <option defaultValue>{type}</option>
                <option defaultValue>COHORT</option>
                <option defaultValue>COHORT</option>
                <option defaultValue>COHORT</option>
              </select>
            )}
          </div>
          <div className="d-flex align-items-center justify-content-around">
            <h1 className="earnings_card_total">
              {" "}
              <small>$</small>
              {value}
            </h1>
            <i>
              <ChartLogo />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Courses() {
  const {
    generalState: { isMobile, loading },
    generalState,
    teacherFunctions: { fetchCourses, fetchApplications },
    setGeneralState,
  } = useAuth();
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);
  const [courses, setCourses] = useState([]);

  const flag = useRef(false);

  const getApplication = async () => {
    setGeneralState({ ...generalState, loading: true });

    try {
      const res = await fetchCourses(userdata?.token);
      setGeneralState({ ...generalState, loading: false });

      const { success, message, statusCode } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
        if (data.length <= 0) {
          throw new AdvancedError("Your course list is empty", 0);
        } else {
          setCourses((_) => data);
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
    } catch (err) {
      setGeneralState({ ...generalState, loading: false });
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
  };

  useEffect(() => {
    if (flag.current) return;

    //fetch courses
    if (userdata) {
      getApplication();
    }
    flag.current = true;
  }, [userdata]);

  const navigate = useNavigate();
  const tableHeaders = [
    "No",
    "Courses",
    "Teaching Model",
    "Starting Date",
    "Status",
  ];

  function createCourseHandler(e) {
    setGeneralState({ ...generalState, courseInfo:{}})
    navigate("create");
  }
  function getDate(date){
  
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = date.split("T")[0];
    let [y, m, day] = d.split("-");
    m = months[parseInt(m) - 1];
    return `${m} ${day}`;
  }
  return (
    <Teachers isMobile={isMobile} userdata={userdata}>
      <div className={clsx.teachers_profile}>
        <button
          className="button button-md log_btn w-30 mb-5"
          type="button"
          onClick={createCourseHandler}
        >
          Create Course
        </button>
        {courses.length > 0 ? (
          <table className={clsx.teachers_table}>
            <thead>
              <tr>
                {tableHeaders.map((el, i) => (
                  <th key={i}>{el}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((course, i) => (
                <CourseCard
                  index={i}
                  num={i}
                  date={course.startDate}
                  status={course.status}
                  model={course.category}
                  title={course.name}
                  category={course.category}
                  info={course}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center">
            <p className="lead">You are yet to create a course</p>
          </div>
        )}
      </div>
    </Teachers>
  );
}

function CourseCard({ index, title, model, date, status, category, info }) {
  function getDate(date){
  
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let d = date.split("T")[0];
    let [y, m, day] = d.split("-");
    m = months[parseInt(m) - 1];
    return `${m} ${day}`;
  }
  const navigate = useNavigate();
  const { generalState, setGeneralState } = useAuth();
  return (
    <tr
      className={clsx.user__info_card}
      onClick={() => {
        setGeneralState({ ...generalState, courseInfo: info });
        // navigate(`/categories/${category?.toLowerCase()}/courses/${title.split(" ").join("-")}`)
        navigate(`details/${info.courseId}`);
      }}
    >
      <td className={clsx.user__info}>{index + 1}</td>
      <td className={clsx.user__info}>{title}</td>
      <td className={clsx.user__info}>{model}</td>
      <td className={clsx.user__info}>{date ? getDate(date) : ""}</td>
      <td className={clsx.user__info}>{status}</td>
    </tr>
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

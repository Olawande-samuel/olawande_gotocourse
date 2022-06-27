import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
  
  export default function CreateCourse() {
    const ref = useRef(false);
  const navigate = useNavigate();
    const {
      generalState: { courseInfo },
      teacherFunctions: { addCourse, updateCourse },
      otherFunctions: { fetchCategories },
    } = useAuth();
  
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
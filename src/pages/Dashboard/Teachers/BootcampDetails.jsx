import {Teachers} from "./index"

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {toast } from "react-toastify";

import clsx from "./styles.module.css";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import {KEY} from "../../../constants"
import Input from "../../../components/Input";

export default function BootcampDetails({}){
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
      <Teachers header="Bootcamp Details">
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
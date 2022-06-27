import {Teachers} from "./index"

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";


import clsx from "./styles.module.css";
import { useAuth } from "../../../contexts/Auth";

import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";


const KEY = "gotocourse-userdata";

export default function Courses() {
    const { generalState: { isMobile }, generalState, teacherFunctions: { fetchCourses }, setGeneralState, } = useAuth();
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
      "Category",
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
                    <th className={clsx.user__info} key={i}>{el}</th>
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
  
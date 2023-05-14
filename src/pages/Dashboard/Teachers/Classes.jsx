import {Teachers} from "./index"

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

import clsx from "./styles.module.css";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import {KEY} from "../../../constants"

export default function Classes() {
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
      <Teachers isMobile={isMobile} userdata={userdata} header="Classes">
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
                {data.map((classes, i) => (
                 <ClassCard
                    key={i}
                    num={i}
                   {...classes}
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
  
  function ClassCard({num, applicationId, courseName, courseCategory, package: type, status}){
    function showDetailsHandler(){}
    return (
      <tr
        className={clsx.user__info_card}
        onClick={(e) =>showDetailsHandler(e, applicationId)}
      >
        <td className={clsx.user__info}>{num + 1}.</td>
       
        <td className={clsx.user__details}>
          <span>{courseName}</span>
        </td>
  
        <td className={clsx.user__info}>{courseCategory}</td>
        <td className={clsx.user__info}>{type}</td>
        <td className={clsx.user__info}>{status}</td>      
        </tr>
    )
  }
import {Teachers} from "./index"

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

import clsx from "./styles.module.css";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import {KEY} from "../../../constants"
import Loader from "../../../components/Loader";
import { BootcampRow } from "../Admin";


export default function Bootcamps() {
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
        <div className={clsx["teachers_profile"]}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 style={{ margin: 0 }}>Bootcamps</h3>
            </div>
  
            <div className={clsx.admin__student_main}>
              <table className={clsx.teachers_table}>
                <thead>
                    <tr>
                        {tableHeaders.map((el, i) => (
                          <th key={i} className={clsx.user__info}>{el}</th>
                        ))}
                    </tr>
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
      </Teachers>
    );
  }



  
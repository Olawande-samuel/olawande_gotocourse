import {Teachers} from "./index"

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";

import clsx from "./styles.module.css";
import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import {CLASSID, KEY} from "../../../constants"
import Loader from "../../../components/Loader";
import { BootcampRow } from "../Admin";
import { Link } from "react-router-dom";
import styled from "styled-components";


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
      ""
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
      <Teachers header={"Courses"} >
        {loading && <Loader />}
        <div className={clsx["teachers_profile"]}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 style={{ margin: 0 }}>Courses</h3>
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
                      clickHandler={e => detailHandler(e, item.bootcampId, item)}
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
export function ConsoleClass() {
    const {
      teacherFunctions: { fetchBootcamps },
    } = useAuth();
    const { getItem } = useLocalStorage();
    const navigate = useNavigate();
    const flag = useRef(false);
    let userdata = getItem(KEY);
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true);
  
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
            } else {
              toast.error("No class assigned");
            }
          } else {
            throw new AdvancedError(message, statusCode);
          }
        } catch (err) {
          toast.error(err.message);
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
    console.log({courseList})
    return (
      <Teachers header={"My Classes"} >
        {loading && <Loader />}
        <div className={clsx["teachers_profile"]}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 style={{ margin: 0 }}>My Classes</h3>
            </div>
            <div className={clsx.admin__student_main}>
                <div className={clsx.class_con_cards}>
                  {
                    courseList.length > 0 &&
                      courseList.map((item, i) => (
                        <ClassesCard {...item} />
                    ))
                  }
                </div>
          </div>
        </div>
      </Teachers>
    );
  }


  // export function ClassesCard({bootcampImg, title, description, bootcampId, all}){
  //   return (  
  //       <div className={clsx.class_con_card}>
  //         <img src={bootcampImg} alt="" className={clsx.class_con_img} />
  //         <h5>{title}</h5>
  //         <p className="clamp_text_sm" dangerouslySetInnerHTML={{__html:description}}></p>
  //         <div>
  //           <Link className="d-inline-flex" to={`class/${bootcampId}`} onClick={()=> localStorage.setItem(CLASSID, bootcampId)}>
  //             <button className={clsx.class_con_button}>Open Class</button>
  //           </Link>
  //         </div>
  //       </div>
  //   )
  // }



  
  const ShortCard = styled.div`
    /* border: 2.2648px solid rgba(0, 114, 239, 0.5);
    padding: clamp(0.03125rem, -0.2813rem + 1.5625vw, 1.125rem);
    border-radius: 8px; */
    display: flex;
    flex-direction:column;
    flex-shrink:0;
    // width: 250px;
    // height: 250px;
    // border: 2px solid red;
    box-shadow: -10px 159px 64px rgba(0, 0, 0, 0.01), -6px 90px 54px rgba(0, 0, 0, 0.05), -3px 40px 40px rgba(0, 0, 0, 0.09), -1px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    
    img {
        height: 40%;
        min-height: 40%;
        max-width: 100%;
        object-fit:cover;
        object-position: center;
        border: 1.5px solid #FFCE31;
    }
    small {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 5.5rem;

    }

    h5 {
        font-weight: 800;
        // text-transform: capitalize;
        font-size: 16px;
        margin-block: .7rem;
        cursor: pointer;

    }
    > div .cta {
        font-size: 14px;
        border: none;
        outline: none;
        background:#fff;

        :hover {
            color: var(--theme-blue);
        }
    }
    button {
        color:#0072EF;
        font-size:14px;
        border:none;
        outline:none;
        background:#fff;
    }
    .up_content {
        padding-inline: 1.5rem;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        height: 60%;
        /* height: -webkit-fill-available; */


        .cta {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            font-size: 13px;
            margin-top: 1rem;
    
            span:first-child {
                cursor: pointer;
                transition: color .3s ease; 
    
                :hover {
                    color: var(--theme-blue)
                }
            }
            span:last-child {
                color: var(--theme-orange)
            }
            .ct_bar{
                width:1px;
                height:100%;
                background: #333;
            }
        }
    }
    
`

export function ClassesCard({ title, bootcampImg, bootcampId, all }) {

    // Call to Action
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { getItem } = useLocalStorage();

    const userdata = getItem(KEY)

   


    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { addwishlistCourse, fetchWishlist, deleteFromWishlist } } = useAuth()
  return (
      <ShortCard>
          <img src={bootcampImg} alt="" />
          <div className="up_content">
              <div>
                  <h5 variant="contained">{title}</h5>
              </div>

              {/* <small dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
              <div className="cta">
                <Link className="d-inline-flex" to={`class/${bootcampId}`} onClick={()=> localStorage.setItem(CLASSID, bootcampId)}>
                  <button className={clsx.class_con_button}>Open Class</button>
                </Link>
              </div>
          </div>
      </ShortCard>
  )
}
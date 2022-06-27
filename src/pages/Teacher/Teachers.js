import React, { useEffect, useState } from "react";

import {Link, useNavigate} from "react-router-dom"


import Courses, { CourseCard } from "../Courses";
import { courseList } from "../Courses";
import { useAuth } from "../../contexts/Auth";
import style from "./teacher.module.css";
import lere from "../../images/lere.png";
import { useLocalStorage } from "../../hooks";
import { toast } from "react-toastify";
import { AdvancedError } from "../../classes";


const KEY = "gotocourse-userdata";

const nav = [
  { name: "All Courses", value: "" },
  { name: "Business Analysis", value: "Business Analysis" },
  { name: "Cybersecurity", value: "Cybersecurity" },
  { name: "Data Science", value: "Data Science" },
  { name: "IT Compliance", value: "IT Compliance" },
  { name: "IT Audit", value: "IT Audit" },
  { name: "Product Design", value: "Product Design" },
  { name: "Risk Management", value: "Risk Management" },
  { name: "Project Management", value: "Project Management" },
  { name: "Software Development", value: "Software Development" },
  { name: "IT Service Management", value: "IT Service Management" },
];
const All = () => {
  const [search, setSearch] = React.useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  const {setGeneralState} = useAuth();
  const navigate = useNavigate()
    
  return (
    <Courses>
      <div className="container">
        <section className={` ${style.navigation}`}>
          {nav.map((item, i) => (
            <NavItems key={item.name} item={item} handleChange={handleChange} search={search} />
          ))}
        </section>
        <main className={style.main}>
          {courseList.filter(item=> item.subtitle.includes(search)).map((item) => (
            <div style={{cursor: 'pointer'}} onClick={() => {
              setGeneralState(old => {
                return {
                  ...old,
                  teacherProfile: {
                    profile: item.img,
                    location: `${item.author} . ${item.details}`,
                    content: item.title,
                    id: item.id
                  }
                }
              })
              navigate(item.author.split(" ").join("-"))
            }}>
              <CourseCard img={item.img} title={item.title} subtitle={item.subtitle} author={item.author} backgroundColor="backgroundColor" />
            </div>
          ))}
        </main>
      </div>
    </Courses>
  );
};

export default All;

const NavItems = ({ item, handleChange, search }) => {
  // function handleChange(e) {
  //     console.log(e)
  //     setCheck(!check)
  // }
  return (
    <div className="d-flex">
      {/* <input type="radio" name="course" id={item} onChange={handleChange} />
        <label htmlFor={item} className={check ? "text-underline" : "text-danger"}>
            {item}
        </label> */}
      <button
        type="button"
        className={`${search === item.value ? style.selected : ""}  ${
          style.filter_btn
        }`}
        onClick={handleChange}
        value={item.value}
      >
        {item.name}
      </button>
    </div>
  );
};

export const Payment = () => {
  const {studentFunctions:{addCourse}} = useAuth();
  const {getItem}= useLocalStorage()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [paymentDetails, setPaymentDetails]= useState({})
  const [courseInfo, setCourseInfo]= useState({})
  
  const details = localStorage.getItem("gotocourse-paymentDetails")
  const info = localStorage.getItem("gotocourse-courseInfo")
  useEffect(()=>{
    if (details ){
      setPaymentDetails(JSON.parse(details))
      setCourseInfo(JSON.parse(info))
    }
  },[])

  async function enrollToCourse(e){
    e.preventDefault();

    const  userData = getItem(KEY)

    if(userData !== null){
      const data = {
        courseId:paymentDetails.courseId,
        selectedPackage:paymentDetails.title,
        fullPayment:true,
        amountPaid:paymentDetails.price
      }
      try {
        setLoading(true)
        const response =  await addCourse(data, userData.token)
        const {success, message, statusCode} = response
        if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
        toast.success(message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
      }catch(error){
        toast.error(error.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
    }finally{
      setLoading(false)
    }

  } else {
    navigate("/login")
  }
}
  return (
    <Courses>
      <div className="container">
        <section
          className={`row justify-content-center align-items-center ${style.paymeny_main}`}
        >
          <div className="col-md-5">
            <div className={` card ${style.payment_details_card}`}>
              <div className="card-body">
                <div className={style.payment_card_top}>
                  <div className="d-flex align-items-center">
                    <div className={style.payment_profile}>
                      <img src={courseInfo?.instructorProfileImg ? courseInfo.instructorProfileImg : lere} alt="" className={style.payment_image} />
                    </div>
                    <div className={style.payment_profile_info}>
                      <p className={style.payment_name}>{courseInfo?.instructorName}</p>
                      <small className="text-capitalize">{courseInfo?.category?.toLowerCase()} Instructor</small>
                    </div>
                  </div>
                </div>
                <hr />
                <div className={style.payment_card_mid}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className={`text-capitalize ${style.payment_course}`}>{`${paymentDetails?.title} Course`}</p>
                    <p>${paymentDetails?.price}</p>
                  </div>
                  {/* <small className="d-block">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam debitis fugiat animi veritatis, accusantium sit unde!
                  </small> */}
                  {/* <ul>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                  </ul> */}
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <p>Service Fee</p>
                  <p>$5</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <p>Total</p>
                  <p className={style.payment_total}>${+paymentDetails?.price + 5}</p>
                </div>
                <button onClick={enrollToCourse} className="button w-100 button-md">
                  {
                    loading ? 
                    <div className="spinner-border text-primary" role="status" style={{width:"4rem", height:"4rem"}}>
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <span>Checkout</span>
                    
                  }
                </button>
                <div className="cancel w-100 text-center my-3">
                  <button className="" style={{ color:"var(--theme-blue)", border:"none", outline:"none", fontSize:"14px"}}
                  onClick={()=>{
                    navigate(-2)
                  }}
                  >Cancel</button>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    </Courses>
  );
};

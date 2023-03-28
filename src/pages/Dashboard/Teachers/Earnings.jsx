import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Box, Switch } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";
import Accordion from 'react-bootstrap/Accordion';
import { Chart as ChartLogo } from "../../../images/components/svgs";
import clsx from "./styles.module.css";
import { useAuth } from "../../../contexts/Auth";
import { Teachers } from "./index";
import { useLocalStorage } from "../../../hooks";
import { KEY } from "../../../constants";
import MyChart from "../../../components/Chart";
import Input from "../../../components/Input";
import { AdvancedError } from "../../../classes";
import Loader from "../../../components/Loader";
import { Link } from "react-router-dom";
import { Admin } from "../Admin";
import { useQuery, useMutation } from "@tanstack/react-query";
import {debounce} from "lodash"
import { useMemo } from "react";

export default function Earnings() {
  const { getItem } = useLocalStorage();
  const flag = useRef(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  let userdata = getItem(KEY);
  const { generalState: { isMobile }, teacherFunctions: { fetchEarnings, withdrawalRequest } } = useAuth();

  // useEffect(() => {
  //   if (flag.current) return;
  //   (async () => {
  //     try {
  //       setLoading((_) => true);
  //       let res = await fetchEarnings(userdata?.token);
  //       const { success, message, statusCode } = res;
  //       if (!success) throw new AdvancedError(message, statusCode);
  //       else {
  //         const { data } = res;
  //         toast.success(message, {
  //           position: "top-right",
  //           autoClose: 4000,
  //           hideProgressBar: true,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //         });
  //         console.log(data);
  //         setRows((_) => data);
  //       }
  //     } catch (err) {
  //       toast.error(err.message, {
  //         position: "top-right",
  //         autoClose: 4000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     } finally {
  //       setLoading((_) => false);
  //     }
  //   })();
  //   flag.current = true;
  // }, []);

  async function submitHandler(e, formstate) {
    e.preventDefault();
    setLoading((_) => true);
    try {
      console.log(formstate);
      if (
        formstate.courseName.trim() === "" ||
        formstate.stage.trim() === "" ||
        formstate.accountNumber.trim() === "" ||
        formstate.level.trim() === "" ||
        formstate.bankName.trim() === ""
      )
        throw new AdvancedError("Empty field detected", 1);
      //at this point it is valid submit
      console.log({ formstate });
      const res = await withdrawalRequest(formstate, userdata?.token);
      const { message, statusCode, success } = res;
      if (!success) throw new AdvancedError(message, statusCode);
      else {
        const { data } = res;
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
    <Teachers
      isMobile={isMobile}
      userdata={userdata}
      style={{ overflowY: "scroll" }}
      header="Earnings"
    >
      {loading && <Loader />}
      <div className={clsx.teachers_profile}>
        <AllEarnings />
        <Requests submitHandler={submitHandler} />
      </div>
      {/* <div className={clsx.teachers_profile} style={{marginTop:20}}>
        </div> */}
    </Teachers>
  );
}

export function AllEarnings({ earnings }) {
  const [total, setTotal] = useState(0);
  const [courseEarnings, setCourseEarnings] = useState(0);
  const [modelEarnings, setModelEarnings] = useState(0);
  const [modelType, setModelType] = useState("")
  const { generalState: { isMobile }, teacherFunctions: { fetchEarnings, withdrawalRequest } } = useAuth();
  const { getItem } = useLocalStorage();
  let userdata = getItem(KEY);

  const data = [
    {
      title: "Per Course",
      type: "Courses",
      value: courseEarnings,
    },
  ];

  const filterBy = [
    {
      title: "Day",
      type: "COHORT",
      value: 0,
    },
    {
      title: "Week",
      type: "COHORT",
      value: 0,
    },
    {
      title: "1 Month",
      type: "COHORT",
      value: 0,
    },
    {
      title: "3 Months",
      type: "COHORT",
      value: 0,
    },
    {
      title: "6 Month",
      type: "COHORT",
      value: 0,
    },
    {
      title: "7 Month",
      type: "COHORT",
      value: 0,
    },
  ];


  // FETCH EARNINGS
  const myEarnings = useQuery(["fetch my earnings"], ()=>fetchEarnings(userdata?.token), {
    enabled: !!userdata.token,
    onError: err => {
      console.error(err)
      toast.error("something went wrong")
    }
  })

  console.log({myEarnings});
  console.log({user: userdata.token});

  const totalEarnings =  useMemo(() => {
    let earnings = myEarnings.data?.data?.reduce((a, b) => a + b.amount, 0)
    return earnings
  } , [myEarnings?.data?.data])

  console.log({totalEarnings})

  // useEffect(() => {
  //   if (earnings) {
  //     let b = earnings.reduce((a, b) => a + b.amount, 0);
  //     setTotal(b);
  //     let courseTotal = earnings.filter((item) => item.type === "course").reduce((a, b) => a + b.amount, 0);
  //     console.log({ b });
  //     console.log({ courseTotal });
  //     setCourseEarnings(courseTotal);
  //   }
  // }, [earnings]);

  // returns total based on selected model
  function getModelTotal(model) {
    let modelTotal = earnings.filter((item) => item.teachingModel === model).reduce((a, b) => a + b.amount, 0);
    setModelEarnings(modelTotal);

  }

  // return total based on selected course/class
  function getCourseTotal(total, model) {
    let courseTotal = total
      .filter((item) => item.type === "course" || item.type === "BOOTCAMP")
      .reduce((a, b) => a + b.amount, 0);
  }

  function handleModelChange(e) {
    setModelType(e.target.value)
  }

  useEffect(() => {
    if (earnings) {
      getModelTotal(modelType)
    }
  }, [modelType]);

  return (
    <>
      <div
        className="d-flex align-items-center mt-3 mb-5 flex-wrap"
        style={{ gap: "1rem" }}
      >
        <i>
          <FiFilter />
        </i>
        <span style={{ fontSize: "0.8rem" }}>Filter by: </span>
        {filterBy.map((date, i) => (
          <FilterButton key={i} title={date.title} />
        ))}
      </div>
      <div className={clsx.earnings_card_wrapper}>
        {data.map(({ title, type, value }, i) => (
          <EarningsCard title={title} type={type} value={value} key={i} handleModelChange={handleModelChange} />
        ))}
        <EarningsCard total={true} value={totalEarnings ?? 0} />
      </div>
      {/* <div className="pt-3 d-flex flex-column align-items-end gap-3">
        <Link to={`/admin/earnings/courses`}><button className=" button py-1 px-4">Divide earnings</button></Link>
        <Link to={`/admin/earnings/applications`}><button className=" whtbutton py-1 px-4">Earnings applications</button></Link>
      </div> */}


      <div className="overflow-auto">
        <MyChart />
      </div>
    </>
  );
}
export function FilterButton({ title }) {
  return (
    <button
      style={{
        background: "#FFFFFF",
        border: "1px solid #9F9F9F",
        borderRadius: "10px",
        padding: "3px 10px",
        fontSize: "0.8rem",
      }}
      value={title}
    >
      {title}
    </button>
  );
}

export function EarningsCard({ title, type, data = [], total, value, handleModelChange }) {
  return (
    <div className="earnings_card">
      <p className="text">{title}</p>
      <div className="card">
        <div className="card-body">
          <div>
            {total ? (
              <h4>TOTAL</h4>
            ) : (
              <>
                {
                  type === "Courses" ?
                    <select name="model" id="model" className="form-select w-75" onChange={handleModelChange}>
                      <option defaultValue>{type}</option>
                      {data.map(item => (
                        <option value={item.type}>{item.title}</option>

                      ))}
                    </select>
                    :
                    <select name="model" id="model" className="form-select w-75">
                      <option defaultValue>{type}</option>
                      <option defaultValue>COHORT</option>
                      <option defaultValue>COHORT</option>
                      <option defaultValue>COHORT</option>
                    </select>
                }
              </>
            )}
          </div>
          <div className="d-flex align-items-center justify-content-around">
            <h2 className="earnings_card_total">
              {" "}
              <small>$</small>
              {value}
            </h2>
            <i>
              <ChartLogo />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EarningCourses() {
  const {adminTeacherFunctions: {fetchCourseEarnings}} = useAuth()
  const {getItem} = useLocalStorage()
  const userdata = getItem(KEY)
  
  const getCourseEarnings = useQuery(["fetch course earnings"], ()=>fetchCourseEarnings(userdata?.token), {
    onSuccess: res => {
      if(res?.statusCode !== 1){
        toast.error(res.message)
      }
    },
    onError: err => {
      toast.error(err.message)
    }
  })

  console.log({getCourseEarnings})


  return (
    <Admin header={"Earnings"}>
      {getCourseEarnings?.isLoading  && 
        <Loader />
      }
      <div className={clsx.admin_profile}>

        <div className={clsx.earntop}>
          <div>No</div>
          <div>Courses</div>
          <div>Earning</div>
        </div>

        <div className={clsx.earncontent}>
          {
            getCourseEarnings?.data?.data.map((course, i) => (
              <EarningsAccordion key={i} course={course} i={i} />

            ))
          }

        </div>
      </div>
    </Admin>
  )
}


function EarningsAccordion({course, i}){
  
  const [total, setTotal] = useState(()=>course.totalEarnings)
  
  const [formData, setFormData] = useState({
    instructorEarningDetailArr: [],
    bootcampTotalEarning: course.totalEarnings || 0
  })

  const {adminTeacherFunctions: {updateCourseEarnings}} = useAuth()
  const {getItem} = useLocalStorage()
  const userdata = getItem(KEY)


  const updateMutation = useMutation(([token, id, data])=>updateCourseEarnings(token, id, data), {
    onSuccess: res => {
      if(res.statusCode === 1){
        toast.success(res.message)
        return 
      }
      toast.error(res.message)
    },
    onError: err => toast.error(err.message)
  })

  function save(){
    updateMutation.mutate([userdata.token, course.bootcampId, formData])
  }

  function handleChange(e){
    setTotal(e.target.value)
    setFormData({...formData, bootcampTotalEarning: Number(e.target.value)})
    // updateEarnings()
  }


  return (
    <Accordion key={i}>
      {
        updateMutation?.isLoading && <Loader />
      }
      <Accordion.Item eventKey={i} className="accord__body">
        <Accordion.Header className="earnaccord__header">
          <div className={clsx.earnbtm} key={i}>
            <div>{i + 1}</div>
            <div>{course.title}</div>
            <div className={clsx.earnbtn}>
              <input type="text" placeholder={"Total"} value={total} onChange={handleChange} onFocus={()=>console.log("focused")} />
            </div>
          </div>

        </Accordion.Header>
        <Accordion.Body>
          <div className={clsx.earn}>

            <div className={clsx.earninfo}>
              <div />
              <div />
              <div>1st installment</div>
              <div>2nd installment</div>
              <div>Total</div>

            </div>
            {course?.instructors?.map((data, index) => (
              <EarnInfo key={index} data={data} index={index} formData={formData} setFormData={setFormData} />
            ))}

          </div>
          <button className="button py-1 px-4 rounded" disabled={updateMutation?.isLoading} onClick={save}>
            {
              updateMutation?.isLoading ? 

              <div className="spinner-border text-white">
                <div className="visually-hidden">Loading...</div>
              </div>
              :
              <span>Save</span>
            }
          </button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}


const EarnInfo = ({data, index, formData, setFormData}) => {

  useEffect(()=>{
    let newEarningInfo = {
      earnings: data.tutorId.earnings,
      percentageEarning: data.tutorId.percentageEarning,
      _id: data.tutorId._id
    }
    let earningArray = formData.instructorEarningDetailArr
    earningArray[index] = newEarningInfo
    setFormData({...formData, instructorEarningDetailArr: earningArray})

  }, [data.tutorId._id])

  function handleChange(e){
    let newData = formData.instructorEarningDetailArr
    let newEarningInfo = {
      earnings:(formData?.bootcampTotalEarning * e.target.value )/ 100,
      percentageEarning: Number(e.target.value),
      _id: data.tutorId._id
    }
    newData[index] = newEarningInfo
    setFormData({...formData, instructorEarningDetailArr: newData})
  }

  console.log({formData})

  return (
    <div className={clsx.earninfo}>

      <div>{data.tutorId.email}</div>
      <div className={clsx.earnbtn}>
        <input type="text" placeholder={"%"} onChange={handleChange} value={formData.instructorEarningDetailArr[index]?.percentageEarning} />
      </div>

      <div className={clsx.earnbtn}>
        <input type="text" placeholder={"$1700"} disabled value={(formData?.bootcampTotalEarning && formData.instructorEarningDetailArr[index]?.percentageEarning) ? ((formData?.bootcampTotalEarning * formData.instructorEarningDetailArr[index]?.percentageEarning )/ 100 / 2) : ""}   />
      </div>

      <div className={clsx.earnbtn}>
        <input type="text" placeholder={"$1700"} disabled value={(formData?.bootcampTotalEarning && formData.instructorEarningDetailArr[index]?.percentageEarning) ? ((formData?.bootcampTotalEarning * formData.instructorEarningDetailArr[index]?.percentageEarning )/ 100 / 2) : ""}  />
      </div>


      <div className={clsx.earnbtn}>
        {(formData?.bootcampTotalEarning && formData.instructorEarningDetailArr[index]?.percentageEarning) ? (formData?.bootcampTotalEarning * formData.instructorEarningDetailArr[index]?.percentageEarning )/ 100 : ""}
      </div>
    </div>

  )
}


export function EarningApplication() {
  return (
    <Admin header={"Earnings> Applications"}>

      <div className={clsx.admin_profile}>

        <div className={clsx.earntopbar}>
          <div>No</div>
          <div>Name</div>
          <div>Courses</div>
          <div>Stage</div>
          <div>Bank Details</div>
        </div>

        <div className={clsx.earncontent}>
          {
            [...Array(5)].map((_, i) => (

              <div className={`${clsx.earntopbar} ${clsx.earnbtmbar}`} key={i}>
                <div>{i + 1}</div>
                <div>Yaya Johnson</div>
                <div>Cybersecuity - Cohort 1</div>
                <div>2nd stage</div>
                <div>UBN - 948574449</div>
              </div>



            ))
          }

        </div>
      </div>
    </Admin>
  )
}

const Requests = ({ submitHandler }) => {
  const [formstate, setFormstate] = useState({
    courseName: "",
    stage: "",
    accountNumber: "",
    bankName: "",
    level: "",
  });
  const [loading, setLoading] = useState(false);

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormstate((old) => {
      return {
        ...old,
        [name]: value,
      };
    });
  }

  return (
    <div className={clsx.requests} style={{ marginTop: 20 }}>
      {loading ? <Loader /> : null}
      <h2>Request for Fund</h2>
      <form className="form" onSubmit={(e) => submitHandler(e, formstate)}>
       
        <div className={clsx.form_group}>
          <label htmlFor="course" className="form-label generic_label">Select Course</label>
          <select name="course" id="course" className="form-select" >
            <option value="">Select Course</option>
          </select>
        </div>

        <div className={clsx.form_group}>
          <label htmlFor="stage" className="form-label generic_label">Stage of Training</label>
          <select name="stage" id="stage" className="form-select" >
          <option value="">Select Stage</option>
          <option value="">1st Stage</option>
          <option value="">2nd Stage </option>
          </select>
        </div>

        <Input
          label="Account Number"
          name="accountNumber"
          type="text"
          handleChange={changeHandler}
          value={formstate.accountNumber}
        />
       
        <Input
          label="Bank Name"
          name="bankName"
          type="text"
          handleChange={changeHandler}
          value={formstate.bankName}
        />
        
        {/* <div className="form-group my-3">
          <label htmlFor="level" className="form-label generic_label">
            Details of Request
          </label>
          <select
            name="level"
            id="level"
            onChange={changeHandler}
            className="form-select"
            style={{ width: "unset" }}
          >
            <option value="">0%</option>
            <option value="25%">25%</option>
            <option value="50%">50%</option>
            <option value="75%">75%</option>
            <option value="100%">100%</option>
          </select>
        </div> */}

        <div className={`${clsx.requests_button} form-group my-3`}>
          <button>Request for Fund</button>
        </div>
      </form>
    </div>
  );
};

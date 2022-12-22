import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Box, Switch } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import { HiOutlineFilter } from "react-icons/hi";

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

export default function Earnings() {
  const { getItem } = useLocalStorage();
  const flag = useRef(false);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  let userdata = getItem(KEY);
  const {
    generalState: { isMobile },
    teacherFunctions: { fetchEarnings, withdrawalRequest },
  } = useAuth();
  useEffect(() => {
    if (flag.current) return;
    (async () => {
      try {
        setLoading((_) => true);
        let res = await fetchEarnings(userdata?.token);
        const { success, message, statusCode } = res;
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
          setRows((_) => data);
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
  const [modelType, setModelType]= useState("")
  const data = [
    {
      title: "Teaching Model",
      type: "Model",
      value: modelEarnings,
    },
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

  const Models = [
    { title: "Cohort", type: "COHORT" },
    { title: "Physical", type: "PHYSICAL" },
    { title: "Bootcamp", type: "BOOTCAMP" },
    { title: "Self-paced", type: "SELF_PACED" },
    { title: "One-on-One", type: "MENTORSHIP" },
  ];
  useEffect(() => {
    if (earnings) {
      let b = earnings.reduce((a, b) => a + b.amount, 0);
      setTotal(b);
      let courseTotal = earnings.filter((item) => item.type === "course").reduce((a, b) => a + b.amount, 0);
      console.log({ b });
      console.log({ courseTotal });
      setCourseEarnings(courseTotal);
    }
  }, [earnings]);

  // returns total based on selected model
  function getModelTotal( model) {
    let modelTotal = earnings.filter((item) => item.teachingModel === model).reduce((a, b) => a + b.amount, 0);
    setModelEarnings(modelTotal);
  
  }

  // return total based on selected course/class
  function getCourseTotal(total, model) {
    let courseTotal = total
      .filter((item) => item.type === "course" || item.type === "BOOTCAMP")
      .reduce((a, b) => a + b.amount, 0);
  }

  function handleModelChange(e){
    setModelType(e.target.value)
  }
  useEffect(() => {
    if(earnings){
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
          <EarningsCard title={title} type={type} data={Models} value={value} key={i} handleModelChange={handleModelChange} />
        ))}
        <EarningsCard total={true} value={total} />
      </div>
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

export function EarningsCard({ title, type, data=[], total, value, handleModelChange }) {
  return (
    <div className="earnings_card">
      <p className="text">{title}</p>
      <div className="card">
        <div className="card-body">
          <div>
            {total ? (
              <h3>TOTAL</h3>
            ) : (
              <>
              {
                type === "Model" ? 
                <select name="model" id="model" className="form-select w-75" onChange={handleModelChange}>
                  <option defaultValue>{type}</option>
                  {data.map(item=>(
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
        <Input
          label="Name of Course"
          name="courseName"
          type="text"
          handleChange={changeHandler}
          value={formstate.courseName}
        />
        <Input
          label="Stage of Training"
          name="stage"
          type="text"
          handleChange={changeHandler}
          value={formstate.stage}
        />
        <Input
          label="Bank Name"
          name="bankName"
          type="text"
          handleChange={changeHandler}
          value={formstate.bankName}
        />
        <Input
          label="Account Number"
          name="accountNumber"
          type="text"
          handleChange={changeHandler}
          value={formstate.accountNumber}
        />
        <div className="form-group my-3">
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
        </div>

        <div className={`${clsx.requests_button} form-group my-3`}>
          <button>Request for Fund</button>
        </div>
      </form>
    </div>
  );
};
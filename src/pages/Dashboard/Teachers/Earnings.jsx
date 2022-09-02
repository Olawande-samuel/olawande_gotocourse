import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Box, Switch } from "@mui/material";
import { FiFilter } from "react-icons/fi";
import {HiOutlineFilter} from "react-icons/hi";


import { Chart as ChartLogo } from "../../../images/components/svgs";
import clsx from "./styles.module.css";
import { useAuth } from "../../../contexts/Auth";
import {Teachers} from "./index"
import { useLocalStorage } from "../../../hooks";
import {KEY} from "../../../constants"
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
      teacherFunctions: {fetchEarnings}

    } = useAuth();
    useEffect(() => {
      if(flag.current) return;
      (async() => {
        try{
          setLoading(_ => true);
          let res = await fetchEarnings(userdata?.token);
          const {success, message, statusCode} = res;
          if(!success) throw new AdvancedError(message, statusCode);
          else {
            const {data} = res;
            toast.success(message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            console.log(data)
            setRows(_ => data);
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
        }finally{
          setLoading(_ => false);
        }
      })()
      flag.current = true;
    }, [])
    return (
      <Teachers isMobile={isMobile} userdata={userdata} style={{overflowY: "scroll"}} header="Earnings">
        {loading && <Loader />}
        <div className={clsx.teachers_profile}>
          <AllEarnings />
          <Requests />
        </div>
        {/* <div className={clsx.teachers_profile} style={{marginTop:20}}>
        </div> */}
      </Teachers>
    );
  }
  
  export function AllEarnings (){
    const data = [
      {
        title: "Teaching Model",
        type: "Model",
        value: 0
      },
      {
        title: "Per Course",
        type: "Courses",
        value: 0
      }
    ]
    const filterBy = [
      {
        title: "Day",
        type: "COHORT",
        value: 0
      },
      {
        title: "Week",
        type: "COHORT",
        value: 0
      },
      {
        title: "1 Month",
        type: "COHORT",
        value: 0
      },
      {
        title: "3 Months",
        type: "COHORT",
        value: 0
      },
      {
        title: "6 Month",
        type: "COHORT",
        value: 0
      },
      {
        title: "7 Month",
        type: "COHORT",
        value: 0
      },
    ]
    return (
      <>
      <div
            className="d-flex align-items-center mt-3 mb-5 flex-wrap"
            style={{ gap: "1rem" }}
          >
            <i>
              <FiFilter />
            </i>
            <span style={{fontSize:"0.8rem"}}>Filter by: </span>
            {filterBy.map((date, i) => (
              <FilterButton key={i} title={date.title} />
            ))}
          </div>
          <div
            className={clsx.earnings_card_wrapper}
          >{
            data.map(({title, type, value}, i) => (
              <EarningsCard title={title} type={type} value={value} key={i} />
            ))
          }
            <EarningsCard total={true} value="0" />
          </div>
          <div  className="overflow-auto">
          <MyChart />
          </div>
      </>
    )
  }
  export function FilterButton({ title }) {
    return (
      <button
        style={{
          background: "#FFFFFF",
          border: "1px solid #9F9F9F",
          borderRadius: "10px",
          padding: "3px 10px",
          fontSize: "0.8rem"
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
  



const Requests = () => {
  const [formstate, setFormstate] = useState({
    courseName: "",
    training: "",
    accountDetails: "",
    requestDetails: ""
  })
  const [loading, setLoading] = useState(false);

  function changeHandler(e){
    const {name, value} = e.target;
    setFormstate(old => {
      return {
        ...old,
        [name]: value
      }
    })
  }

  async function submitHandler(e){
    e.preventDefault();
    setLoading(_ => true);
    try{
      console.log(e.target);
      if(
        formstate.courseName.trim() === "" || formstate.training.trim() === "" ||
        formstate.accountDetails.trim() === "" || formstate.requestDetails.trim() === ""
      ) throw new AdvancedError("Empty field detected", 1);
      //at this point it is valid submit
      console.log({formstate});
      toast.success("Valid entries", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
    }finally{
      setLoading(_ => false);
    }
  }
  return(
    <div className={clsx.requests} style={{marginTop:20}}>
      {loading ? <Loader /> : null}
      <h2>Request for Fund</h2>
      <form className="form" onSubmit={submitHandler}>
        <Input
          label="Name of Course"
          name="courseName"
          type="text"
          handleChange={changeHandler}
          value={formstate.courseName}
        />
        <Input
          label="Stage of Training"
          name="training"
          type="text"
          handleChange={changeHandler}
          value={formstate.training}
        />
        <Input
          label="Account Details"
          name="accountDetails"
          type="text"
          handleChange={changeHandler}
          value={formstate.accountDetails}
        />
        <div className="form-group my-3">
          <label htmlFor="level" className="form-label generic_label">Details of Request</label>
          <select name="level" id="level" className="form-select" style={{width: "unset"}}>
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
  )
}
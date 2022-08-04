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



export default function Earnings() {
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const {
      generalState: { isMobile },
    } = useAuth();
    return (
      <Teachers isMobile={isMobile} userdata={userdata} style={{overflowY: "scroll"}}>
        <div className={clsx.teachers_profile}>
          <AllEarnings />
        </div>
        <div className={clsx.teachers_profile} style={{marginTop:20}}>
          <Requests />
        </div>
      </Teachers>
    );
  }
  
  export function AllEarnings (){
    const data = [
      {
        title: "Teaching Model",
        type: "COHORT",
        value: 0
      },
      {
        title: "Teaching Model",
        type: "COHORT",
        value: 0
      }
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
            {data.map((date, i) => (
              <FilterButton key={i} title={date.title} />
            ))}
          </div>
          <div
            className="d-flex flex-wrap justify-content-center justify-content-md-start"
            style={{ gap: "1.5rem" }}
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
              <h1 className="earnings_card_total">
                {" "}
                <small>$</small>
                {value}
              </h1>
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
  const [data, setData] = useState([
    {
      title: "Day", 
      active: true
    },
    {
      title: "Week", 
      active: false
    },
    {
      title: "1 month", 
      active: false
    },
    {
      title: "3 months", 
      active: false
    },
    {
      title: "6 months", 
      active: false
    },
    {
      title: "1 year", 
      active: false
    },
  ])

  const rowData = [
    {
      header: "No",
      entries: [
        {
          id: 1,
          title: "1."
        },
        {
          id: 2,
          title: "2."
        },
        {
          id: 3,
          title: "3."
        },
      ]
    },
    {
      header: "Name of Teacher",
      entries: [
        {
          id: 1,
          title: "Peter Cole"
        },
        {
          id: 2,
          title: "James Jackson"
        },
        {
          id: 3,
          title: "Lucas mata"
        },
      ]
    },
    {
      header: "Date",
      entries: [
        {
          id: 1,
          title: "02-04-12"
        },
        {
          id: 2,
          title: "02-02-12"
        },
        {
          id: 3,
          title: "04-31-24"
        },
      ]
    },
    {
      header: "Account Details",
      entries: [
        {
          id: 1,
          title: "UBA-84458588"
        },
        {
          id: 2,
          title: "JPM-873747484"
        },
        {
          id: 3,
          title: "CITI-848487484"
        },
      ]
    },
    {
      header: "Amount",
      entries: [
        {
          id: 1,
          title: "25%"
        },
        {
          id: 2,
          title: "50%"
        },
        {
          id: 3,
          title: "25% balance"
        },
      ]
    },
    {
      header: "Approve Request",
      entries: [
        {
          id: 1,
          title: false
        },
        {
          id: 2,
          title: false
        },
        {
          id: 3,
          title: true
        },
      ]
    }
  ]

  function toggleActiveHandler(e){
    let title = e.target.textContent;
    console.log(title);
    setData(old => {
      let copy = [...old];
      return copy.map(c => {
        if(c.title === title) {
          c.active = true;
        }else {
          c.active = false;
        }
        return c;
      })
    })
  }
  return(
    <div className={clsx.requests}>
      <div className={clsx.requests_header}>
        <h2>List of Requests</h2>
        <button>Download CSV</button>
      </div>
      <div className={clsx.requests_meta}>
        <span>
          <HiOutlineFilter /> &nbsp; Filter by:
        </span>
        {
          data.map(({active, title}, i) => (
            <Tab toggleActiveHandler={toggleActiveHandler} key={i} active={active}>
              {title}
            </Tab>
          ))
        }
      </div>
      <RequestsTable rows={rowData} />
    </div>
  )
}


const Tab = ({children, active, toggleActiveHandler}) => {
  return (
    <div onClick={toggleActiveHandler} className={`${clsx.requests_tab} ${active ? 'in_active' : ''}`}>
      {children}
    </div>
  )
}


const RequestsTable = ({rows}) => {
  return (
    <div className={clsx.requests_table}>
      {
        rows.map(({header, entries}, i) => (
          <div key={i} className={clsx.requests_table_column}>
            <h6>{header}</h6>
            <ul>
              {
                entries.map((e, i) => (
                  <li key={i}>
                   {header === "Approve Request" ? <Switch checked={e.title} /> : e.title}
                  </li>
                ))
              }
            </ul>
          </div>
        ))
      }
    </div>
  )
} 
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, Box } from "@mui/material";
import { FiFilter } from "react-icons/fi";


import { Chart as ChartLogo } from "../../../images/components/svgs";
import clsx from "./styles.module.css";
import { useAuth } from "../../../contexts/Auth";
import {Teachers} from "./index"
import { useLocalStorage } from "../../../hooks";
import {KEY} from "../../../constants"
import MyChart from "../../../components/Chart";

const data = [
  {
    id: 1,
    title: "Day",
  },
  {
    id: 2,
    title: "Week",
  },
  {
    id: 3,
    title: "1 month",
  },
  {
    id: 4,
    title: "3 months",
  },
  {
    id: 5,
    title: "6 months",
  },
  {
    id: 6,
    title: "1 year",
  },
];
export default function Earnings() {
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const {
      generalState: { isMobile },
    } = useAuth();
    return (
      <Teachers isMobile={isMobile} userdata={userdata}>
        <div className={clsx.teachers_profile}>
          <AllEarnings />
        </div>
      </Teachers>
    );
  }
  
  export function AllEarnings (){
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
          >
            <EarningsCard title="Teaching Model" type="COHORT" value="0" />
            <EarningsCard title="Per Course" type="Cybersecurity" value="0" />
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
  
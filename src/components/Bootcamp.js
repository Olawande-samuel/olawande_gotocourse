import React, {useEffect, useState, useRef} from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";

import Coding from "../images/coding.png";
import Cyber from "../images/cybersecurity.webp";
import Marketing from "../images/marketing.png";
import Tech from "../images/itaudit.webp";
import Ui from "../images/ui.png";
import Sales from "../images/salesforce.webp";


import { CareerBox, careers } from "./Career";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import { AdvancedError } from "../classes";

const bootcamps = [
  {
    title: "CyberSecurity Certificate Course",
    content: "Launch into cybersecurity with an intensive training",
    image: Cyber,
    link:"/bootcamp-training"
  },
  {
    title: "Coding Bootcamp",
    content: "Launch into world of coding with an intensive training",
    image: Coding,
    link:"/bootcamp-training"
  },
  {
    title: "UI/UX Design Bootcamp",
    content: "Launch into UI/UX design with an intensive training",
    image: Ui,
    link:"/bootcamp-training"
  },
  {
    title: "Technology Audit Certificate Course",
    content: "Launch into technology audit with an intensive training",
    image: Tech,
    link:"/bootcamp-training"
  },
  {
    title: "Salesforce Training",
    content: "Set yourself  up for high-paying job and secure tech career.",
    image: Sales,
    link:"/bootcamp-training"
  },
  {
    title: "Digital Marketing Bootcamp",
    content: "Launch into digital marketing with an intensive training",
    image: Marketing,
    link:"/bootcamp-training"
  },
];

const Bootcamp = () => {
  return (
    <section className="bootcamp">
      <div className=" container-lg bootcamp_content">
        <header className="text-center">
          <h3 className="title text-capitalize" style={{marginBottom:"0.525rem"}}>Tech Immersion Trainings and bootcamps</h3>
          <p
            className="sub_title mx-auto"
            style={{ width: "min(100% - 1rem, 980px)" }}
          >
            GotoCourse training and bootcamps has helped thousand of students
            launch new careers in the tech industry. We want to improve the
            quality of life by helping people learn workplace relevant
            skillsets.
          </p>
        </header>
        <div className="bootcamp_list">
          {
            bootcamps.map((b, i) => (<BootcampBox {...b} all={b} key={i} />))
          }
        </div>
      </div>
    </section>
  );
};

export default Bootcamp;

export const BootcampBox = ({ image, title, content, link , all}) => {
  const navigate = useNavigate()
  return (
      <div className="card bootcamp_card h-100">
        <div className="card-body bg-white d-flex flex-column justify-content-around">
          <div className="bootcamp_box_left">
            <div style={{borderRadius:"10px"}}>
            <img src={image} alt={title} className="img-fluid" style={{borderRadius:"10px",width:"360px", height:"168px", maxWidth:"100%"}} />
            </div>
          </div>
          <div className="career_box_right d-flex flex-column mt-4">
            <header style={{ marginBottom: ".5rem" }}>
              <h3 className="bootcampBox_title">{title}</h3>
            </header>
            <p className="details">{content}</p>
            <div className="text-end">
              {/* <Link to={link}> */}
                <motion.button 
                whileHover={{
                  backgroundColor:"#fff",
                  color:"#0C2191"
                }}
                onClick={()=>{
                  localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
                  navigate("/bootcamp-training")
                } }
                transition={{duration: 0.1}}
                className="btn-plain" style={{backgroundColor:"#0C2191", color:"#fff",border:"1px solid var(--theme-blue)"}}>Learn More</motion.button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
  );
};

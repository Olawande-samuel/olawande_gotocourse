import React from "react";
import { Learn, Certificate, Cohort,Ml, Support, Skill } from "../images/components/svgs";
import Service from "../images/services.png";
import {FaUsers} from "react-icons/fa";

const serviceList=[
  {
    id: 1,
    icon: <Learn />,
    title:"Learning from Industry Experts",
    text:"Learn tech skills from practising professionals who understand how things really work"
  
  }, 
  {
    id: 2,
    icon: <Cohort />,
    title:"Learning with a cohort",
    text:"Learn with a group of people with similar interest and experience."
  
  }, 
  {
    id: 3,
    icon: <Certificate />,
    title:"Completion certificate on completion",
    text:"Earn badges and completion certificates on every course completion."
  
  }, 
  {
    id: 4,
    icon: <Ml />,
    title:"Live Classes",
    text:"Experience enhanced collaboration. Join conference calls with teacher and other students"
  
  }, 
  {
    id: 5,
    icon: <Skill />,
    title:"Skill-based Learning",
    text:"Earn badges and completion certificates on every course completion."
  
  }, 
  {
    id: 6,
    icon: <Support />,
    title:"24/7 Support",
    text:"Questions? Our round-the-clock support teams is available to help anytime, anywhere."
  
  }, 
]


const Serivces = () => {
  return (
    <section className="wrapper services">
      <div className="container">
            <header>
              <h2 className="title text-center">Learn with Go2Course</h2>
            </header>
        <div className="service_box_wrapper">
            {serviceList.map(service =>(
              
            <div className="services_box d-flex flex-column align-items-center justify-content-center">
              <div className="service_icon">
                <i>{service.icon}</i>
              </div>
              <h4>{service.title}</h4>
              <p>{service.text}</p>
            </div>
            ))}
            
        </div>
      </div>
    </section>
  );
};



export default Serivces;

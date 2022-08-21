import React from "react";
import { Learn, Certificate, Cohort,Ml, Support, InPerson } from "../images/components/svgs";


export const serviceList=[
  {
    id: 1,
    icon: <Learn />,
    title:"Learn from industry Experts",
    text:"Learn high in-demand skills from industry experts through Live classes, pre-recorded videos, and mentorship",
    color:"orange"

  
  }, 
  {
    id: 2,
    icon: <Cohort />,
    title:"Flexible learning model",
    text:"Learn with a group of people with similar interest and experience or at your own pace.",
    color:"blue"
  
  }, 
  {
    id: 3,
    icon: <Certificate />,
    title:"Earn badges and completion certificates",
    text:"Completion certificates awarded on every course completion ",
    color:"orange"
  
  }, 
  {
    id: 4,
    icon: <Ml />,
    title:"Live Classes",
    text:"Experience enhanced collaboration. Join conference calls with teacher and other students to share screen",
    color:"orange"
  
  }, 
  
 
  {
    id: 7,
    icon: <InPerson />,
    title:"In-person training",
    text:"Do you enjoy hand holding in person training ? Some of our trainings are available at our physical locations.",
    color:"blue"
  
  }, 
 
]


const Services = () => {
  return (
    <section className="wrapper services">
      <div className="container">
            <header >
              <h2 className="title text-center">Benefits Of Learning At GotoCourse</h2>
              <p className="sub_title text-center mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p>
            </header>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5">
            {serviceList.map(service =>(
            <div key={service.name} className="services_box d-flex flex-column align-items-center ">
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



export default Services;

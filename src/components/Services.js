import React from "react";
import { Learn, Certificate, Cohort,Ml, Support, Skill } from "../images/components/svgs";


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
  {
    id: 7,
    icon: <Learn />,
    title:"Borderless training",
    text:"Take classes from anywhere, anytime"
  
  }, 
  {
    id: 8,
    icon: <Cohort  />,
    title:"Assessment",
    text:"Take assessments to test your understanding"
  
  }, 
]


const Services = () => {
  return (
    <section className="wrapper services">
      <div className="container">
            <header >
              <h2 className="title text-center">GOTOCOURSE IS A  PLATFORM BUILT FOR YOU IN MIND</h2>
              <p className="sub_title text-center">As information technology continues its rapid change, businesses and organizations need professionals with the right skills and training to help them meet their needs and lead technology initiatives.
Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p>
            </header>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5">
            {serviceList.map(service =>(
            <div key={service.name} className="services_box d-flex flex-column align-items-center justify-content-center">
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

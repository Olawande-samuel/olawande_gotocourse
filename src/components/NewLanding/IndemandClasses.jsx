import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { ClassTypeComponent, InDemand } from "./landingComponents";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 280px);
  gap: 2.5rem;
  row-gap: 3rem;
  justify-content: space-around;

  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }
  /*
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
`;
const IndemandClasses = () => {
  const { otherFunctions: {fetchBootcamps }, } = useAuth();
  const [shorts, setShorts] = useState([])
    
  const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
        notifyOnChangeProps:["category", "isFetching"],

        onSuccess: (res)=>{
            if(res.data.length > 0){
              const exe = res.data.filter(item=>item.subCategory === "IN_DEMAND" && item.isActive);

              setShorts(exe)
              console.log({exe})
            }
        }
  })
  return (
    <ClassTypeComponent {...data}>
      <Grid>
        {
          shorts?.filter(item=>item.isActive).slice(0,8).map((item) => (
            <InDemand {...item} />
          ))
        }
      </Grid>
    </ClassTypeComponent>
  );
};


const data = {
  header: "",
  header2:"Explore In demand career courses",
  subtext:"Develop Tech skills most needed by companies and increase your earnings",
  content: [],
  bottomTitle:"View more In demand career courses >",
  bottomLink:`category/IN_DEMAND`

}
export default IndemandClasses;

export const inDemandPopUpContent = [ 

  {
    id: 1,
    ownedBy:"UI/UX Design Specialization",
    title: "Learn how to create beautiful and user-friendly digital products.",
    list: [
      
      "You will you will learn how to create wireframes.",
      "You will you will learn how to create prototypes.",
      "You will you will learn how to create user flows.",
    ]
  },
  {
    id: 2,
    ownedBy:"Product Management",
    title: "Learn the business process of planning, developing, launching and managing a product or service.",
    list: [
      "You will you will learn the entire lifecycle of a product.",
      "You will you will learn how to develop business case.",
      "You will you will learn about software development life cycle (SDLC).",
    ]
  },
  {
    id: 3,
    ownedBy:"AWS Cloud Practitioner Essentials",
    title: "Learn how to supervise the architecting and deployment of applications within AWS platforms.",
    list: [
      
      "You will you will learn how to develop plans for the adoption of cloud solutions.",
      "You will you will learn how to Manage and monitor cloud platforms.",
      "You will you will learn design and build applications on the cloud.",
    ]
  },
  {
    id: 4,
    ownedBy:"Building Web Applications in PHP",
    title: "Learn how to create and implement plans that will help organization achieve their objectives.",
    list: [
      
      "You will you will learn about the processes involved in designing products, services, and experiences.",
      "You will you will learn how to grow as a designer and manager.",
      "You will you will learn how to apply design thinking methods to solve problems and create innovative solutions.",
    ]
  },
  {
    id: 5,
    ownedBy:"Full stack web Development",
    title: "The Fullstack Web Development course will guide you on your journey towards becoming a fullstack web developer.",
    list: [
      
      "You will you will learn how to create dynamic pages using HTML and CSS.",
      "You will you will learn how to develop backend applications using PHP and MySQL..",
      "You will you will learn the skills you need to build and manage your own web applications. ",
    ]
  },
  {
    id: 6,
    ownedBy:"Front end app Development",
    title: "Learn how to create beautiful and responsive user interfaces using modern web development techniques.",
    list: [
      "You will you will learn how to use HTML, CSS, and JavaScript to build website designs that look great on any device.",
      "You will you will learn how to get hands-on experience with some of the most popular frontend frameworks like Bootstrap and Foundation.",
      "You will you will learn the skills you need to create a stunning and responsive user interface.",
    ]
  },
  {
    id: 7,
    ownedBy:"Android app development",
    title: "Android mobile app development is a process by which a android mobile app is created for a cell phone or a tablet.",
    list: [
      
      "You will you will learn how to create test and deploy an android app.",
      "You will you will learn how to use industry-standard tools and frameworks to build functional, high-quality android mobile apps.",
      "You will you will learn user experience design, app architecture, and the development process for an adroid app.",
    ]
  },
  {
    id: 8,
    ownedBy:"IOS app development",
    title: "IOS mobile app development is a process by which a IOS mobile app is created for a cell phone or a tablet.",
    list: [
      
      "You will you will learn how to create test and deploy an IOS app.",
      "You will you will learn how to use industry-standard tools and frameworks to build functional, high-quality IOS mobile apps.",
      "You will you will learn user experience design, app architecture, and the development process for an IOS app. ",
    ]
  },
  {
    id: 9,
    ownedBy:"ServiceNow & Developer Administration",
    title: "ServiceNow is a cloud computing platform designed for business workflows.",
    list: [
      
      "You will you will learn about the ServiceNow cloud platform and understand how it operates and how to become a certified ServiceNow developer.",
      "You will you will learn how to develop, install and troubleshoot the ServiceNow platform.",
      "You will you will learn how to integrate ServiceNow with other programs.",
    ]
  },
  {
    id: 10,
    ownedBy:"IT Audit & compliance",
    title: "An IT audit or information technology audit is an evaluation of IT systems, infrastructures, policies, and operations.",
    list: [
      
      "You will you will learn how to how to audit IT systems and processes.",
      "You will you will learn how to improve an organization’s processes.",
      "You will you will learn how to ensure your organizations compliance with regulations and standards.",
    ]
  },
  {
    id: 11,
    ownedBy:"SAFE Agile Methodology",
    title: "SAFE Agile Methodology is based on the Scaled Agile Framework (SAFE); an agile framework developed for development teams.",
    list: [
      
      "You will you will learn how to use SAFE.",
      "You will you will learn how to build complex solutions that are too big and complicated for a single Scrum team to tackle.",
      "You will you will learn how to create a more predictable release schedule for projects/products.",
    ]
  },
  {
    id: 12,
    ownedBy:"Business Analysis",
    title: "Business Analysts helps with developing a business case and solution for an organization's business problem.",
    list: [
      
      "You will you will learn how to use system flowcharts and wireframes, advanced excel skills, how to track projects and ensure they all follow through as clients require.",
      "You will you will learn how understand all client’s requests and deliver them to the technical team to deploy according all client requirements.",
      "You will you will learn how to use advance data analysis tools.",
    ]
  },
  {
    id: 13,
    ownedBy:"Project Management Professional",
    title: "You will learn how to be a Project Management Professional.",
    list: [
      
      "You will you will learn how to manage projects through ll the project management lifecyles.",
      "You will you will learn how to plan, innitiate, execute, monitor and complete projects.",
      "You will you will learn how to use various project managements tools and techniques in ensuring the successful delivery of all projects.",
    ]
  },
  {
    id: 14,
    ownedBy:"Devops Engineering",
    title: "DevOps is a valuable business discipline and organizations are highly requesting for individuals who are knowledgeable and certified DevOps engineers.",
    list: [
      
      "You will you will learn DevOps architecture and features like automation, collaboration, integration and configuration management.",
      "You will you will learn how to use some DevOps tools like: ELK stack, Puppet, Kubernetes, Ansible, Nagios, Splunk.",
      "You will you will learn how to use DevOps software and have an understanding of DevOps management.",
    ]
  },
  {
    id: 15,
    ownedBy:"Governance, Risk & Compliance Specialty",
    title: "There is a very high demands for Governance, Risk and Compliance (GRC) experts in the tech industry.",
    list: [
      
      "You will you will learn how to develop and implement policies and procedures to protect an organization’s information assets.",
      "You will you will learn how ensure organizational compliance with various regulations and standards.",
      "You will you will learn how to identify, assess, and respond to threats and vulnerabilities in an organization.",
    ]
  },
  {
    id: 17,
    ownedBy:"",
    title:"",
    list: [
    
    ]
  },
]
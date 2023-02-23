import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../contexts/Auth";
import { ClassTypeComponent } from "../NewLanding/landingComponents";
import { useLocalStorage } from "../../hooks"
import { getDate, getFullDate, gotoclass, gotoclassPayment, KEY } from "../../constants"
import { AiOutlineCheck } from "react-icons/ai"

const Container = styled.div`
background: rgba(214, 220, 255, 0.3);
`

export const Grid = styled.div`

  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
  grid-auto-rows: 460px; */
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 300px), 300px));
  grid-auto-rows: 380px;
  overflow: hidden;
  gap: 2.5rem;
  row-gap: 3rem;
  justify-content: space-around;

  h4{
    text-align: center;
    color: var(--theme-blue);
  }


  @media screen and (max-width: 1250px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }
  @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
`;

export const InDemandCard = styled.div`
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    box-shadow: -9px 150px 60px rgba(0, 0, 0, 0.01), -5px 85px 51px rgba(0, 0, 0, 0.05), -2px 38px 38px rgba(0, 0, 0, 0.09), -1px 9px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    .img{
        width: 100%;
        height: 150px;
        /* border: 2px solid red; */

        img{
            width:100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .content{
        padding: .1rem .5rem;
        /* border: 2px solid yellow; */
        min-height: 230px;
        position: relative;
        background: #FFFFFF;

        h6 {
            font-weight: 700;
            padding: .2rem 0;
        }

        p{
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
        }


      

        .contentbtn{
          position: absolute;
          bottom: 0;
          left:0;
          right: 0;

          .view{
            /* border: 2px solid red; */
            text-align: right;
            padding: .2rem .5rem;
  
              button{
                  border: none;
                  padding: .5rem ;
                  outline: none;
                  font-size: 13.6101px;
                  line-height: 16px;
                  background: transparent;

              }
          }

          .bottombtn{
            width:100%;

            button{
              text-align: center;
                width:100%;
                color: white;  
                background-color: var(--btn-color);     
                border: none;
                outline: none;
                font-size: 13.6101px;
                line-height: 16px;
                padding: 1rem 0;
            }

          }
          


        }


    }
  
`

export function InDemand({ title, bootcampImg, category, duration, price, packages, bootcampId, description, startDate }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const { getItem } = useLocalStorage();

  const userdata = getItem(KEY)




  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  useEffect(() => {
    const ownListItem = inDemandPopUpContent.filter(item => item.ownedBy.trim().toLowerCase() === title.trim().toLowerCase())

    if (ownListItem.length > 0) {
      setData(ownListItem[0])
    }

  }, [title])





  return (
    <InDemandCard>
      <div className="img">
        <img src={bootcampImg} alt="" />
      </div>
      <div className="content">
        <h6>{title}</h6>
        <p>
          Join Harvard Kennedy School faculty
          and former Pentagon Chief of Staff Eric
        </p>


        <div className="contentbtn">

          <div className="view">
            <button onClick={() => gotoclass(title, category, bootcampId, navigate)}>Learn more</button>
          </div>
          <div className="bottombtn">
          
              <button onClick={() => gotoclassPayment(title, category, bootcampId, navigate, true)}>Enroll Now</button>

          </div>

        </div>

      </div>


    </InDemandCard>
  )
}



const Classes = () => {
  const { otherFunctions: { fetchBootcamps }, } = useAuth();
  const [shorts, setShorts] = useState([])

  const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
    notifyOnChangeProps: ["category", "isFetching"],
    // "TRAIN2 WORKABROAD"

    onSuccess: (res) => {
      if (res.data.length > 0) {
        // console.log("filter", res.data);
        const all = res.data?.length > 0 ? res.data?.filter(item => item.category === "TRAIN2 WORKABROAD") : [];
        // const second = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive && item.subCategory === "IN_DEMAND") : [];
        // const third = res.data?.length > 0 ? res.data?.filter(item => item.startDate !== "2023-01-05T00:00:00.000Z" && item.startDate !== "2023-01-19T00:00:00.000Z" && item.isActive && item.subCategory === "IN_DEMAND").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
        // const first = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-01-19T00:00:00.000Z" && item.isActive && item.subCategory === "IN_DEMAND") : [];
        // const second = res.data?.length > 0 ? res.data?.filter(item => item.startDate.includes("2023-01") && !item.startDate.includes("2023-01-19T00:00:00.000Z") && item.isActive && item.subCategory === "IN_DEMAND") : [];
        // const all = [...first, ...second, ...third];
        // setShorts(exe)
        setShorts(all)
        // console.log({exe})
      }
    }
  })
  return (
    <Container>
      <ClassTypeComponent {...data}>
        <Grid>
          {
            shorts?.filter(item => item.isActive).slice(0, 6).map((item) => (
              <InDemand {...item} all={item} key={item.bootcampId} />
            ))
          }
        </Grid>
      </ClassTypeComponent>

    </Container>
  );
};


const data = {
  header: "Start Learning",
  header2: "",
  subtext: "",
  subtext1: "",
  content: [],
  bottomTitle: "",
  bottomLink: `/category/IN_DEMAND`,
  center: true, 
  color:"var(--theme-blue)"
}
export default Classes;

export const inDemandPopUpContent = [

  {
    id: 1,
    ownedBy: "UI/UX Design Specialization",
    title: "Learn how to create beautiful and user-friendly digital products.",
    list: [

      "You will you will learn how to create wireframes.",
      "You will you will learn how to create prototypes.",
      "You will you will learn how to create user flows.",
    ]
  },
  {
    id: 2,
    ownedBy: "Product Management",
    title: "Learn the business process of planning, developing, launching and managing a product or service.",
    list: [
      "You will you will learn the entire lifecycle of a product.",
      "You will you will learn how to develop business case.",
      "You will you will learn about software development life cycle (SDLC).",
    ]
  },
  {
    id: 3,
    ownedBy: "AWS Cloud Practitioner Essentials",
    title: "Learn how to supervise the architecting and deployment of applications within AWS platforms.",
    list: [

      "You will you will learn how to develop plans for the adoption of cloud solutions.",
      "You will you will learn how to Manage and monitor cloud platforms.",
      "You will you will learn design and build applications on the cloud.",
    ]
  },
  {
    id: 4,
    ownedBy: "Building Web Applications in PHP",
    title: "Learn how to create and implement plans that will help organization achieve their objectives.",
    list: [

      "You will you will learn about the processes involved in designing products, services, and experiences.",
      "You will you will learn how to grow as a designer and manager.",
      "You will you will learn how to apply design thinking methods to solve problems and create innovative solutions.",
    ]
  },
  {
    id: 5,
    ownedBy: "Full stack web Development",
    title: "The Fullstack Web Development course will guide you on your journey towards becoming a fullstack web developer.",
    list: [

      "You will you will learn how to create dynamic pages using HTML and CSS.",
      "You will you will learn how to develop backend applications using PHP and MySQL..",
      "You will you will learn the skills you need to build and manage your own web applications. ",
    ]
  },
  {
    id: 6,
    ownedBy: "Front end app Development",
    title: "Learn how to create beautiful and responsive user interfaces using modern web development techniques.",
    list: [
      "You will you will learn how to use HTML, CSS, and JavaScript to build website designs that look great on any device.",
      "You will you will learn how to get hands-on experience with some of the most popular frontend frameworks like Bootstrap and Foundation.",
      "You will you will learn the skills you need to create a stunning and responsive user interface.",
    ]
  },
  {
    id: 7,
    ownedBy: "Android app development",
    title: "Android mobile app development is a process by which a android mobile app is created for a cell phone or a tablet.",
    list: [

      "You will you will learn how to create test and deploy an android app.",
      "You will you will learn how to use industry-standard tools and frameworks to build functional, high-quality android mobile apps.",
      "You will you will learn user experience design, app architecture, and the development process for an adroid app.",
    ]
  },
  {
    id: 8,
    ownedBy: "IOS app development",
    title: "IOS mobile app development is a process by which a IOS mobile app is created for a cell phone or a tablet.",
    list: [

      "You will you will learn how to create test and deploy an IOS app.",
      "You will you will learn how to use industry-standard tools and frameworks to build functional, high-quality IOS mobile apps.",
      "You will you will learn user experience design, app architecture, and the development process for an IOS app. ",
    ]
  },
  {
    id: 9,
    ownedBy: "ServiceNow & Developer Administration",
    title: "ServiceNow is a cloud computing platform designed for business workflows.",
    list: [

      "You will you will learn about the ServiceNow cloud platform and understand how it operates and how to become a certified ServiceNow developer.",
      "You will you will learn how to develop, install and troubleshoot the ServiceNow platform.",
      "You will you will learn how to integrate ServiceNow with other programs.",
    ]
  },
  {
    id: 10,
    ownedBy: "IT Audit & compliance",
    title: "An IT audit or information technology audit is an evaluation of IT systems, infrastructures, policies, and operations.",
    list: [

      "You will you will learn how to how to audit IT systems and processes.",
      "You will you will learn how to improve an organization’s processes.",
      "You will you will learn how to ensure your organizations compliance with regulations and standards.",
    ]
  },
  {
    id: 11,
    ownedBy: "SAFE Agile Methodology",
    title: "SAFE Agile Methodology is based on the Scaled Agile Framework (SAFE); an agile framework developed for development teams.",
    list: [

      "You will you will learn how to use SAFE.",
      "You will you will learn how to build complex solutions that are too big and complicated for a single Scrum team to tackle.",
      "You will you will learn how to create a more predictable release schedule for projects/products.",
    ]
  },
  {
    id: 12,
    ownedBy: "Business Analysis",
    title: "Business Analysts helps with developing a business case and solution for an organization's business problem.",
    list: [

      "You will you will learn how to use system flowcharts and wireframes, advanced excel skills, how to track projects and ensure they all follow through as clients require.",
      "You will you will learn how understand all client’s requests and deliver them to the technical team to deploy according all client requirements.",
      "You will you will learn how to use advance data analysis tools.",
    ]
  },
  {
    id: 13,
    ownedBy: "Project Management Professional",
    title: "You will learn how to be a Project Management Professional.",
    list: [

      "You will you will learn how to manage projects through ll the project management lifecyles.",
      "You will you will learn how to plan, innitiate, execute, monitor and complete projects.",
      "You will you will learn how to use various project managements tools and techniques in ensuring the successful delivery of all projects.",
    ]
  },
  {
    id: 14,
    ownedBy: "Devops Engineering",
    title: "DevOps is a valuable business discipline and organizations are highly requesting for individuals who are knowledgeable and certified DevOps engineers.",
    list: [

      "You will you will learn DevOps architecture and features like automation, collaboration, integration and configuration management.",
      "You will you will learn how to use some DevOps tools like: ELK stack, Puppet, Kubernetes, Ansible, Nagios, Splunk.",
      "You will you will learn how to use DevOps software and have an understanding of DevOps management.",
    ]
  },
  {
    id: 15,
    ownedBy: "Governance, Risk & Compliance Specialty",
    title: "There is a very high demands for Governance, Risk and Compliance (GRC) experts in the tech industry.",
    list: [

      "You will you will learn how to develop and implement policies and procedures to protect an organization’s information assets.",
      "You will you will learn how ensure organizational compliance with various regulations and standards.",
      "You will you will learn how to identify, assess, and respond to threats and vulnerabilities in an organization.",
    ]
  },
  {
    id: 17,
    ownedBy: "",
    title: "",
    list: [

    ]
  },
]
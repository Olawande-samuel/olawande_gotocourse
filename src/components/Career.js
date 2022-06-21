import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {useAuth} from "../contexts/Auth"
import { AdvancedError } from "../classes";

import Learning from "../images/newCareer.png";
import {categories as allCategories} from "../data"
import {
  Cyber,
  Data,
  IT,
  Audit,
  Product,
  Project,
  Risk,
} from "../images/components/svgs.js";
import Image from "./Image.js";
export const careers = [
  {
    id: 1,
    title: "Cybersecurity",
    details:
      "This is the practice ofprotecting critical systems and sensitive information from digital attacks.",
    logo: <Cyber />,
    link: "categories/cybersecurity"
  },
  {
    id: 2,
    title: "Risk Management",
    details:
      "Risk management is the process of assessing and controlling threats to an organization's capital and earnings.",
    logo: <Risk />,
    link: "categories/risk-management"
  },
  {
    id: 3,
    title: "Data Science",
    details:
      "Data science refers to the process of extracting clean information to formulate actionable insights",
    logo: <Data />,
    link: "categories/data-science"
  },
  {
    id: 4,
    title: "Project Management",
    details:
      "the process of leading the work of a team to achieve all project goals within the given constraints.",
    logo: <Project />,
    link: "categories/project-management"
  },
  {
    id: 5,
    title: "IT compliance",
    details:
      "IT compliance refers to businesses meeting all legal requirements,  and regulations for the software of company.",
    logo: <IT />,
    link: "categories/it-compliance"
  },
  {
    id: 6,
    title: "IT Audit",
    details:
      "It is the process of evaluating evidence to determine whether a computer system safeguards assets",
    logo: <Audit />,
    link: "categories/it-audit"
  },
  {
    id: 7,
    title: "Business Analysis",
    details:
      "Business analysis is a strategy for initiating and managing change in organisations.",
    logo: <Cyber />,
    link: "categories/business-analysis"
  },
  {
    id: 8,
    title: "Product Design",
    details:
      "the process of identifying a market opportunity, clearly defining the problem, developing a proper solution for that",
    logo: <Product />,
    link: "categories/product-design"
  },
  {
    id: 9,
    title: "Web Design",
    details:
      "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
    logo: <Project />,
    link: "categories/web-design"
  },
  {
    id: 10,
    title: "Software Development",
    details:
      "Software developers are the creative, brainstorming masterminds behind computer programs of all sorts.",
    logo: <Risk />,
    link: "categories/software-developement"
  },
  {
    id: 11,
    title: "IT Service Management",
    details:
      "all the activities involved in designing, creating, delivering, supporting and managing the lifecycle of IT",
    logo: <IT />,
    link: "categories/it-service-management"
  },
];


const logos = [
  {
    logo: <Cyber />,
  },
  {
    logo: <Risk />,
  },
  {
    logo: <Data />,
  },
  {
    logo: <Project />,
  },
  {
    logo: <IT />,
  },
  {
    logo: <Audit />,
  },
  {
    logo: <Cyber />,
  },
  {
    logo: <Product />,
  },
  {
    logo: <Project />,
  },
  {
    logo: <Risk />,
  },
  {
    logo: <IT />,
  },
];
const Career = () => {

  const {generalState, setGeneralState, otherFunctions: {fetchCategories}} = useAuth();
  const [categories, setCategories] = useState([])
  const ref = useRef(false);

  // useEffect(()=>{
  //   if(ref.current) return
  //   (async()=>{
  //     try{
  //       setGeneralState({...generalState, loading: true})
  //       const res = await fetchCategories();
  //       const {success, message, statusCode, data} = res;
  //       setGeneralState({...generalState, loading: false})

  //       if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
  //       const arr = []
  //       data.forEach((item, index)=>{
  //         let merged = Object.assign(item, logos[getRandomArbitrary(1, 10)])

  //         arr.push(merged)
  //       })
  //       setCategories(arr)
      
  //     }catch(err){
  //       setGeneralState({...generalState, loading: false})
        
  //   }
  //   })()
  //   ref.current = true
  // },[])
  useEffect(()=>{
    const arr = []
    allCategories.forEach((item, index)=>{
          let merged = Object.assign(item, logos[getRandomArbitrary(1, 10)])

          arr.push(merged)
        })
        setCategories(arr)
      
    
  },[])


  function getRandomArbitrary(min, max) {
    return Math.ceil(Math.random() * (max - min) + min)
  }

  return (
    <section className="career">
      <div className="container">

      <header className="text-center">
        <h2 className="career_title text-capitalize">learn online or on campus</h2>
        <p className="sub-title mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>
        Choose a niche and enroll in certificate courses online or in-person that will help you kickstart your career within 3-6 months. We are committed to help you kickstart and build a great career in technology.
        </p>
      </header>
      <div className="row align-items-center">
        <div className="col-lg-6">
        <Image width="580px" height="452px"  image={Learning} alt="Group of people in an online meeting room" className="background" effect="blur" />
        </div>
        <div className="col-lg-6">
      <div className="new_list_section">
        {
        categories.length > 0 ? categories.slice(0,6).map(category=>(
           <CareerBox
           {...category}
         />
        )) :
         (
              careers.slice(0, 6).map((career) => (
              <CareerBox
              {...career}
              />
              )
            )
        )}
        <Link to="/categories" className="mt-3">
          <div className="h-100 d-flex align-items-center">
            <motion.button
            whileHover={{
              boxShadow: "0px 0px 8px rgb(0,0,0)"
            }}
            className="btn-plain" style={{background:"var(--theme-blue)", color:"#fff"}}>Learn More</motion.button>       
          </div>
        </Link>
      </div>

        </div>
      </div>
      </div>

    </section>
  );
};

export const CareerBox = ({ logo, title, details, link , name, description, all}) => {
  return (
    <Link to={link ? link : `categories/${name.split(" ").join("-").toLowerCase()}`} >
    <div className="career_box d-flex flex-column">
      <div className="career_box_left">
        <i>{logo}</i>
      </div>
      <div className="career_box_right">
        <header>
          <h3 className="careerBox_title">{title ? title : name}</h3>
        </header>
          <p className="details">{details ? details : description}</p>
      </div>
    </div>
    </Link>
  );
};
export default Career;

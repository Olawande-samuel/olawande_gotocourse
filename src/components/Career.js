import React from "react";
import {
  Cyber,
  Data,
  IT,
  Audit,
  Product,
  Project,
  Risk,
} from "../images/components/svgs.js";
const careers = [
  {
    id: 1,
    title: "Cybersecurity",
    details:
      "This is the practice ofprotecting critical systems and sensitive information from digital attacks.",
    logo: <Cyber />,
  },
  {
    id: 2,
    title: "Risk Management",
    details:
      "Risk management is the process of assessing and controlling threats to an organization's capital and earnings.",
    logo: <Risk />,
  },
  {
    id: 3,
    title: "Data Science",
    details:
      "Data science refers to the process of extracting clean information to formulate actionable insights",
    logo: <Data />,
  },
  {
    id: 4,
    title: "Project Management",
    details:
      "the process of leading the work of a team to achieve all project goals within the given constraints.",
    logo: <Project />,
  },
  {
    id: 5,
    title: "IT compliance",
    details:
      "IT compliance refers to businesses meeting all legal requirements,  and regulations for the software of company.",
    logo: <IT />,
  },
  {
    id: 6,
    title: "IT Audit",
    details:
      "It is the process of evaluating evidence to determine whether a computer system safeguards assets",
    logo: <Audit />,
  },
  {
    id: 7,
    title: "Business Analysis",
    details:
      "Business analysis is a strategy for initiating and managing change in organisations.",
    logo: <Cyber />,
  },
  {
    id: 8,
    title: "Product Design",
    details:
      "the process of identifying a market opportunity, clearly defining the problem, developing a proper solution for that",
    logo: <Product />,
  },
  {
    id: 9,
    title: "Web Design",
    details:
      "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
    logo: <Project />,
  },
  {
    id: 10,
    title: "Software Development",
    details:
      "Software developers are the creative, brainstorming masterminds behind computer programs of all sorts.",
    logo: <Risk />,
  },
  {
    id: 11,
    title: "IT Service Management",
    details:
      "all the activities involved in designing, creating, delivering, supporting and managing the lifecycle of IT",
    logo: <IT />,
  },
];

const test = [
  {name:"How far"},
  {name:"Hoofar"},
  {name:"Hofar"},
  {name:"Howryfar"},
  {name:"Howar"},
  {name:"Hora"},
  {name:"Howfar"},
  {name:"Howra"},
  {name:"Howr"},
  {name:"Howdy"},
  {name:"How"},
]

const arr = []
careers.forEach((item, index)=>{
  let merged = Object.assign(item, test[index])

  arr.push(merged)
})

console.log(arr)

const Career = () => {
  return (
    <section className="career">
      <header className="text-center">
        <h2 className="career_title">STAND OUT IN YOUR CAREER NICHE</h2>
        <p className="sub-title">
          We are committed to helping you kickstart and build a great career in
          technology by providing you access to quality technical education by
          real world experts.
        </p>
      </header>
      <div className="list-section">
        {careers.map((career) => (
          <CareerBox
            logo={career.logo}
            title={career.title}
            details={career.details}
          />
        ))}
      </div>
    </section>
  );
};

const CareerBox = ({ logo, title, details }) => {
  return (
    <div className="career_box d-flex ">
      <div className="career_box_left">
        <i>{logo}</i>
      </div>
      <div className="career_box_right">
        <header>
          <h3 className="careerBox_title">{title}</h3>
          <p className="details">{details}</p>
        </header>
      </div>
    </div>
  );
};
export default Career;

import React from "react";
import { Link, useLocation } from "react-router-dom";
import Power from "../../images/powerbi.png";
import Algo from "../../images/algo.png";
import Layout from "../../components/Layout";
import { careers } from "../../components/Career";
import style from "./courses.module.css";

const courseList = [
  {
    id: 1,
    title: "Cybersecurity",
    subtitle: "Data Science",
    author: "George Brown",
    details:
      "This is the practice ofprotecting critical systems and sensitive information from digital attacks.",
    img: Power,
  },
  {
    id: 2,
    title: "Algorithims",
    subtitle: "Data Science",
    author: "Mary Brown",
    details:
      "Risk management is the process of assessing and controlling threats to an organization's capital and earnings.",
    img: Algo,
  },
  {
    id: 3,
    title: "Machine Learning",
    subtitle: "Data Science",
    author: "George Brown",
    details:
      "Data science refers to the process of extracting clean information to formulate actionable insights",
    img: Power,
  },
  {
    id: 4,
    title: "Project Management",
    subtitle: "Data Science",
    author: "Mary Brown",
    details:
      "the process of leading the work of a team to achieve all project goals within the given constraints.",
    img: Algo,
  },
  {
    id: 5,
    title: "Introduction to SQL",
    subtitle: "Data Science",
    author: "George Brown",
    details:
      "IT compliance refers to businesses meeting all legal requirements,  and regulations for the software of company.",
    img: Power,
  },
  {
    id: 6,
    title: "Regression",
    subtitle: "Data Science",
    author: "Mary Brown",
    details:
      "It is the process of evaluating evidence to determine whether a computer system safeguards assets",
    img: Algo,
  },
  {
    id: 7,
    title: "Linear Programming",
    subtitle: "Data Science",
    author: "George Brown",
    details:
      "Business analysis is a strategy for initiating and managing change in organisations.",
    img: Power,
  },
  {
    id: 8,
    title: "Advance Algorithims",
    subtitle: "Data Science",
    author: "Mary Brown",
    details:
      "the process of identifying a market opportunity, clearly defining the problem, developing a proper solution for that",
    img: Algo,
  },
  {
    id: 9,
    title: "Advance Power BI",
    subtitle: "Data Science",
    author: "George Brown",
    details:
      "Web design encompasses many different skills and disciplines in the production and maintenance of websites.",
    img: Power,
  },
];

const Courses = ({ children }) => {
  const location = useLocation();
  const bread = location.pathname.split("/");
  return (
    <Layout>
      <div className={style.block}>
        <div className={`container`}>
          <div className={style.breadcrumbs_wrapper}>
            <nav arial-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">Homepage</li>
                {bread
                  .filter((item) => item !== "")
                  .map((link, index) => (
                    <li className="breadcrumb-item active">
                      <Link to={`categories/${link}`}>{link}</Link>
                    </li>
                  ))}
              </ol>
            </nav>
          </div>
        </div>
        {children}
      </div>
    </Layout>
  );
};

export default Courses;

const Card = ({ logo, title, details }) => {
  return (
    <div className={`card ${style.card}`}>
      <div className="card-body">
        <i className={style.icon}>{logo}</i>
        <h4 className={style.title}>{title}</h4>
        <p className={style.text}>{details}</p>
        <hr />
        <div className="d-flex">
          <button className={`btn-plain ms-auto ${style.button}`}>
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const CourseCard = ({ img, title, details, subtitle, author }) => {
  return (
    <div className="card">
      <img src={img} alt="" className="card-img-top mentor_image" />
      <div className={`card-body ${style.course_Card_body}`}>
        <h5 className={`card-title ${style.course_title}`}>{title}</h5>
        <h6 className={`card-subtitle ${style.course_subtitle}`}>{subtitle}</h6>
        <p className={`card-text ${style.course_text}`}>{details}</p>
        <p className={`text-end ${style.course_author}`}>{author}</p>
      </div>
    </div>
  );
};

export const Categories = () => {
  return (
    <Courses>
      <div className="container">
        <div
          className={`d-flex justify-content-between align-items-center ${style.top}`}
        >
          <h3 className={style.section_title}>Categories</h3>
          <div className={`${style.input_wrapper} d-flex`}>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control"
              placeholder="Search category"
            />
            <button className="button">Search</button>
          </div>
        </div>

        <main className={style.main}>
          {careers.map((career) => (
            <Link to={career.title.split(" ").join("").toLowerCase()}>
              <Card {...career} />
            </Link>
          ))}
        </main>
      </div>
    </Courses>
  );
};

export const CourseList = () => {
  return (
    <Courses>
      <div className="container">
        <div
          className={`d-flex justify-content-between align-items-center ${style.top}`}
        >
          <h3 className={style.section_title}>Categories</h3>
          <div className={`${style.input_wrapper} d-flex`}>
            <input
              type="search"
              name="search"
              id="search"
              className="form-control"
              placeholder="Search category"
            />
            <button className="button">Search</button>
          </div>
        </div>
        <main className={style.main}>
          {courseList.map((course) => (
            <CourseCard {...course} />
          ))}
        </main>
      </div>
    </Courses>
  );
};
export const CourseDetail = () => {
  return (
    <Courses>
      <main className={style.main}>
          <div className="banner"></div>
          <div className={`container ${style.d} `}>

          </div>
      </main>
    </Courses>
  );
};

import React from "react";
import {Link} from "react-router-dom"

import Courses, { CourseCard } from "../Courses";
import { courseList } from "../Courses";
import style from "./teacher.module.css";
const nav = ["All Courses", "Business Analysis", "Cybersecurity", "Data Science", "IT Compliance", "IT Audit", "Product Design","Risk Management", "Project Management", "Software Development", "IT Service Management"]
const All = () => {

    
  return (
    <Courses>
      <div className="container">
      <section className={` ${style.navigation}`}>
          {nav.map(item=> (
              <a href="#">{item}</a>
          ))}
        </section>
        <main className={style.main}>
          {courseList.map((item) => (
            <Link to={item.author.split(" ").join("-")}>
              <CourseCard img={item.img} title={item.title} subtitle={item.subtitle} author={item.author} backgroundColor="backgroundColor" />
            </Link>
          ))}
        </main>
      </div>
    </Courses>
  );
};

export default All;

const NavItems = ({item})=>{
    const [check, setCheck] = React.useState(false)
    function handleChange(e) {
        console.log(e)
        setCheck(!check)
    }
    return (
        <div className="d-flex">
        <input type="radio" name="course" id={item} onChange={handleChange} />
        <label htmlFor={item} className={check ? "text-underline" : "text-danger"}>
            {item}
        </label>
        </div>
    )
}
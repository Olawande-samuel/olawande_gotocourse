import React from "react";
import { Link } from "react-router-dom";

import Courses, { CourseCard } from "../Courses";
import { courseList } from "../Courses";
import style from "./teacher.module.css";
import lere from "../../images/lere.png";
const nav = [
  { name: "All Courses", value: "" },
  { name: "Business Analysis", value: "Business Analysis" },
  { name: "Cybersecurity", value: "Cybersecurity" },
  { name: "Data Science", value: "Data Science" },
  { name: "IT Compliance", value: "IT Compliance" },
  { name: "IT Audit", value: "IT Audit" },
  { name: "Product Design", value: "Product Design" },
  { name: "Risk Management", value: "Risk Management" },
  { name: "Project Management", value: "Project Management" },
  { name: "Software Development", value: "Software Development" },
  { name: "IT Service Management", value: "IT Service Management" },
];
const All = () => {
  const [search, setSearch] = React.useState("");

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  return (
    <Courses>
      <div className="container">
        <section className={` ${style.navigation}`}>
          {nav.map((item) => (
            // <a href="#">{item}</a>
            <NavItems item={item} handleChange={handleChange} search={search} />
          ))}
        </section>
        <main className={style.main}>
          {courseList.filter(item=>item.title.toLowerCase().match(search.toLowerCase()) ||item.subtitle.toLowerCase().match(search.toLowerCase()) ).map((item) => (
            <Link to={item.author.split(" ").join("-").toLowerCase()}>
              <CourseCard
                img={item.img}
                title={item.title}
                subtitle={item.subtitle}
                author={item.author}
                background="var(--text-blue)"
                color="#fff"
              />
            </Link>
          ))}
        </main>
      </div>
    </Courses>
  );
};

export default All;

const NavItems = ({ item, handleChange, search }) => {
  // function handleChange(e) {
  //     console.log(e)
  //     setCheck(!check)
  // }
  return (
    <div className="d-flex">
      {/* <input type="radio" name="course" id={item} onChange={handleChange} />
        <label htmlFor={item} className={check ? "text-underline" : "text-danger"}>
            {item}
        </label> */}
      <button
        type="button"
        className={`${search === item.value ? style.selected : ""}  ${
          style.filter_btn
        }`}
        onClick={handleChange}
        value={item.value}
      >
        {item.name}
      </button>
    </div>
  );
};

export const Payment = () => {
  return (
    <Courses>
      <div className="container">
        <section>
          <div className={style.payment_top}>
            <button type="button">
              <span className={style.payment_number}>1</span>
              <span className={style.payment_text}>Confirm &amp; Pay</span>
            </button>
            <button type="button">
              <span className={style.payment_number}>2</span>
              <span className={style.payment_text}>Confirm &amp; Pay</span>
            </button>
          </div>
        </section>
        <section
          className={`row justify-content-between ${style.paymeny_main}`}
        >
          <div className="col-md-6">
            <header>
              <h5>Payment Options</h5>
            </header>
            <div className={style.payment_options_main}></div>
          </div>

          <div className="col-md-5">
            <div className={` card ${style.payment_details_card}`}>
              <div className="card-body">
                <div className={style.payment_card_top}>
                  <div className="d-flex align-items-center">
                    <div className={style.payment_profile}>
                      <img src={lere} alt="" className={style.payment_image} />
                    </div>
                    <div className={style.payment_profile_info}>
                      <p className={style.payment_name}>Bola</p>
                      <small>Power Bi Instructor</small>
                    </div>
                  </div>
                </div>
                <hr />
                <div className={style.payment_card_mid}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className={style.payment_course}>Cohort Course</p>
                    <p>$100</p>
                  </div>
                  <small className="d-block">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Totam debitis fugiat animi veritatis, accusantium sit unde!
                  </small>
                  <ul>
                    <li>Lorem ipsum dolor sit amet.</li>
                    <li>Lorem ipsum dolor sit amet.</li>
                  </ul>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <p>Service Fee</p>
                  <p>$5</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between align-items-center">
                  <p>Total</p>
                  <p className={style.payment_total}>$105</p>
                </div>
                <button className="button w-100 button-md">Checkout</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Courses>
  );
};

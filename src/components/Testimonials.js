import React, { useState } from "react";
import user from "../images/user.png";
import lere from "../images/lere.png";
import ola from "../images/ola.png";
import { Left, Right } from "../images/components/svgs";

const witnesses = [
  {
    id: 1,
    content:
      "Gotocourse did not only help me level up my tech skills but they also helped me get my dream job",
    profile: user,
    name:"Cynthia | Houston"

  },
  {
    id: 2,
    content:
      "I’m a successful graduate of Gotocourse Institute and I can tell you that it’s a place of knowledge and success",
    profile: lere,
    name:"James | Canada"
  },
  {
    id: 3,
    content:
      "I had a wonderful experience and can confidently say that Gotocourse is the place to be to get all your I.T. certification",
    profile: ola,
    name:"Bola | Nigeria"
  },
];
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };
  const handleNext = () => {
    if (current < witnesses.length - 1) {
      setCurrent(current + 1);
    }
  };
  return (
    <section className="testimonials">
      <div className="container testimonial_content">
        <h3 className="testimonials_title">Join thousands of learners who are achieving their goals with Go2Course</h3>
        <div className="slide_container">
          <button
            type="button"
            className={`prev ${current === 0 ? "d-none" : ""}`}
            onClick={handlePrev}
          >
            <i>
              <Left />
            </i>
          </button>
          <button
            type="button"
            className={`next ${current === 2 ? "d-none" : ""}`}
            onClick={handleNext}
          >
            <Right />
          </button>
          <div className="slide_wrapper d-flex justify-content-center">
            {witnesses
              .filter((witness, index) => index === current)
              .map((witness, index) => (
                <div className="card slides ">
                  <div className="card-body">
                    <div className="avatar d-flex justify-content-center align-items-center">
                      <img src={witness.profile} alt="testimonies" />
                      <span className="text-center testimonials_name">{witness.name}</span>
                    </div>
                    
                    <p className="testimonials_text">
                      &ldquo; {witness.content} &rdquo;
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="text-center">
          <span
            className={`dot ${current === 0 ? "active" : ""}`}
            onClick={() => {
              setCurrent(0);
            }}
          ></span>
          <span
            className={`dot ${current === 1 ? "active" : ""}`}
            onClick={() => {
              setCurrent(1);
            }}
          ></span>
          <span
            className={`dot ${current === 2 ? "active" : ""}`}
            onClick={() => {
              setCurrent(2);
            }}
          ></span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

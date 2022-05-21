import React from "react";
import { Android, Certificate, Skill } from "../images/components/svgs";
import Service from "../images/services.png";
const Serivces = () => {
  return (
    <section>
      <div className="container border">
        <div className="d-flex justify-content-between">
          <div className="left">
            <img src={Service} alt="sideview of hands typing on a Laptop" />
          </div>
          <div className="right">
            <header>
              <h2 className="title">What We Do?</h2>
            </header>
            <main>
              <p>
                As information technology continues its rapid change, businesses
                and organizations need professionals with the right skills and
                training to help them meet their needs and lead technology
                initiatives.
              </p>
              <p>
                Whether you're just starting out in the IT field, or ready to
                advance your career, GotoCourse can help you gain the expertise
                you need to succeed. We have programs that meet all levels of
                experience.
              </p>
              <p>
                <i><Android /></i>
                <span> Learn from Industry Experts</span>
              </p>
              <p>
                <i><Skill /></i>
                <span> Skill-based Learning</span>
              </p>
              <p>
                <i><Certificate /></i>
                <span>
                  Completion certificate awarded on every course completion
                </span>
              </p>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Serivces;

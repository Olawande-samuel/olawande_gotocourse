import React from "react";
import Learning from "../images/helplearn.png";
const Learn = () => {
  return (
    <section className="wrapper learning">
      <div className="container content-wrapper justify-content-end">
        <div className="d-flex content justify-content-end">
            <div className="card border-none">
              <div className="card-body">
                <header>
                  <h2 className="title">How We help you learn?</h2>
                </header>
                <p className="card-text">
                  Join a classroom to take instructor led training, do projects
                  with learning partners, take quizzes, and build work related
                  portfolio
                </p>
                <button className="btn button-lg" type="button">
                  REGISTER NOW TO START
                </button>
              </div>
            </div>
          <img
            src={Learning}
            alt="man pointing at screen containing code"
            className="background "
          />
        </div>
      </div>
    </section>
  );
};

export default Learn;

import React from "react";
import { Link } from "react-router-dom";
const Join = () => {
  return (
    <div className="join wrapper">
      <div className="container">
        <div className="box">
          <header className="text-center mb-5">
            <h3>
              Join Gotocourse to unleash untapped opportunities in borderless
              knowledge sharing across the world! We are ready to serve you
              anywhere you are
            </h3>
          </header>
          <div className="join_button_wrapper justify-content-center align-items-center d-flex">
            <Link to="/signup">
              <button type="button" className="btn btn-light">
                Join as a student
              </button>
            </Link>
            <small>OR</small>
            <Link to="/admin/login">
              <button type="button" className="btn btn-outline-light">
                Apply to teach
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Join;

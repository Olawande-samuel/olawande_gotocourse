import React from "react";
import degree from "../images/nodegree.png";
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
const Degree = () => {
  return (
    <section className="wrapper degree">
      <div className="container">
        <div className="degree_content d-flex flex-wrap">
          <div className="degree_left">
            <header>
              <h2 className="title">Do I need a degree in Tech?</h2>
            </header>
            <img src={degree} alt="three people staring at a laptop screen" />
          </div>
          <div className="degree_right">
            <p className="degree_text">
              No degree or prior tech experience required. You can start your
              learning here today!
            </p>
            <Link to="/login">
            <motion.button 
            whileHover={{
              boxShadow: "0px 0px 8px rgb(0, 0, 0)",
              textShadow: "0px 0px 8px rgb(255, 255, 255)"
            }}
            className="button button-md">START NOW</motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Degree;

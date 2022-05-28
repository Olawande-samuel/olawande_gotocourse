import React from "react";
import degree from "../images/degree.png";
import Image from "./Image"
import {motion} from "framer-motion"
import { Link } from "react-router-dom";
const Degree = () => {
  return (
    <section className="wrapper degree">
      <div className="container degree_wrapper d-flex flex-wrap justify-content-between">
          <div className="degree_left">
            <header>
              <h2 className="title">Learn from the best</h2>
            </header>
            <p className="degree_text">
            Learn high demand skills from industry experts through live classes, pre recorded videos and mentorship
            </p>
            <Link to="/login">
            <motion.button 
            whileHover={{
              boxShadow: "0px 0px 8px rgb(255, 255, 255)",
              textShadow: "0px 0px 8px rgb(255, 255, 255)"
            }}
            className="button button-md">START NOW</motion.button>
            </Link>
          </div>
          <div className="degree_right">
          <Image image={degree} alt="Testing" effect="blur" />
            
          </div>
      </div>
    </section>
  );
};

export default Degree;

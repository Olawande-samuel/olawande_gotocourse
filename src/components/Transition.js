import { motion } from "framer-motion";
import React from "react";
import Tech from "../images/fast.webp";
import Image from "./Image";
import { Link } from "react-router-dom";

const Transition = () => {
  
  return (
    <section className="wrapper transition">
      <div className="container">
        <div className="d-flex content justify-content-start">
          <motion.div className="card border-none"
          >
            <div className="card-body">
              <header>
                <h2 className="title">Do you prefer self paced learning?</h2>
              </header>
              <p className="card-text">
                Take  self-paced courses that  allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional responsibilities while you connect with your instructor  for any questions you have regarding course expectations, assignments, and discussions.
              </p>
              <Link to="/login">

              <motion.button 
              className="button button-lg" type="button"
              whileHover={{ 
                boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                textShadow: "0px 0px 8px rgb(255,255,255)"
              }}
              >
                START NOW
              </motion.button>
                </Link>
            </div>
          </motion.div>
          <Image width="720px" height="452"  image={Tech} alt="Young woman smiling while working on laptop" className="background" effect="blur"/>
        </div>
      </div>
    </section>
  );
};

export default Transition;

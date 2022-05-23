import React from "react";
import Learning from "../images/learn.png";
import {motion} from 'framer-motion'
const Learn = () => {
  return (
    <section className="wrapper learning">
      <div className="sides  justify-content-end">
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
                <motion.button 
                className="button button-lg" type="button"
                whileHover={{ 
                  boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                  textShadow:"0px 0px 8px rgb(255, 255, 255)"
                }}
                >
                  REGISTER NOW TO START
                </motion.button>
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

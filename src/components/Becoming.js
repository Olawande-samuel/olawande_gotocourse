import { motion } from "framer-motion";
import React from "react";
import Teacher from "../images/teacher.png";
const Becoming = () => {
  
  return (
    <section className="wrapper becoming">
      <div className="container content-wrapper d-flex justify-content-end">
        <div className="d-flex flex-column flex-md-row content justify-content-between">
          <div className="left">
            <img src={Teacher} alt="sideview of hands typing on a Laptop" />
          </div>
          <div className="right">
            <header>
              <h2 className="title">Become a teacher on Gotocourse</h2>
            </header>
            <main className="mt-mid">
              <p className="text paragraph">
                Interested in teaching the next generation of Tech
                professionals? Collaborate with us. We provide you the platform
                and tools to teach what you love
              </p>
              <motion.button
              whileHover={{ 
                boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
              }}
              type="button" className="button button-lg ">
                START TEACHING TODAY
              </motion.button>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Becoming;

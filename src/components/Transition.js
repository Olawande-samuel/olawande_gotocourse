import { motion } from "framer-motion";
import React from "react";
import Tech from "../images/fast.png";
const Transition = () => {
  
  return (
    <section className="wrapper transition">
      <div className="sides">
        <div className="d-flex content justify-content-start">
          <motion.div className="card border-none"
          >
            <div className="card-body">
              <header>
                <h2 className="title">Want to transition to tech?</h2>
              </header>
              <p className="card-text">
                We are here for you! To help you grow your tech skills so that
                you can have a tech career you are most proud of.
              </p>
              <motion.button 
              className="button button-lg" type="button"
              whileHover={{ 
                boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                textShadow: "0px 0px 8px rgb(255,255,255)"
              }}
              >
                START NOW
              </motion.button>
            </div>
          </motion.div>
          <img
            src={Tech}
            alt="man pointing at screen containing code"
            className="background "
          />
        </div>
      </div>
    </section>
  );
};

export default Transition;

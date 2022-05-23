import React from "react";
import { Play } from "../images/components/svgs";
import { motion } from "framer-motion";
import hero from "../images/landing.png"
import Image from "./image"
const Hero = () => {
  return (
    <section className="wrapper hero px-2 p-sm-0">
      <div className="container hero_wrapper d-flex  hero_content">
        <motion.div 
        className="hero_left"
        initial={{opacity:0}}
        animate={{opacity: 1}}
        transition={{delay: 0.2, duration: 1.5}}
        
        >
          <h1 className="hero_text">
            Learn high in-demand tech skills from Tech professionals that will
            have you job-ready in within 6-12months!
          </h1>
          <div className="d-flex">
            <span className="hero_play">
              <i>
                <Play />
              </i>
            </span>
            <p>
              Gotocourse is your NO1 platform for your tech skills development
              for real career growth: all courses focus on skills most needed at
              the workplace.
            </p>
          </div>
        </motion.div>
        <motion.div 
        className="hero_right"
        initial={{x:800}}
        animate={{x:0}}
        transition={{type:"spring", stiffness:110, delay:0.2, duration:0.8}}

        >
          <Image />
          <img src={hero} alt="" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import { Play } from "../images/components/svgs";
import { motion } from "framer-motion";
import hero from "../images/landing.png"
import Image from "./Image"
const Hero = () => {
  return (
    <section className="wrapper hero px-2 p-sm-0">
      <div className="container  hero_wrapper d-flex  hero_content">
        <motion.div 
        className="hero_left"
        initial={{opacity:0}}
        animate={{opacity: 1}}
        transition={{delay: 0.2, duration: 1.5}}
        
        >
          <h1 className="hero_text">
          Learn high in-demand tech skills from Industry experts that will make you make highly relevant at the workplace
          </h1>
          <div className="d-flex">
            <span className="hero_play">
              <i>
                <Play />
              </i>
            </span>
            <p>
            Whether you are starting out or taking the next step in your tech career ,we are your one stop place for your tech skills development. All courses focus on skills most needed at the workplace.
            </p>
          </div>
        </motion.div>
        <motion.div 
        className="hero_right"
        initial={{x:800}}
        animate={{x:0}}
        transition={{type:"spring", stiffness:110, delay:0.2, duration:0.8}}

        >
          <Image  image={hero} alt="Testing" effect="blur" />
          
          {/* <img src={hero} alt="" /> */}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

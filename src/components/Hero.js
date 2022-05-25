import React from "react";
import { Play } from "../images/components/svgs";
import { motion } from "framer-motion";
import hero from "../images/hero.png";
import Image from "./Image";
import Logo from "../images/Logo.png";

const Hero = () => {
  return (
    <section className="wrapper hero px-2 p-sm-0">
      <div className="container hero_wrapper ">
        <div className="hero_logo d-none d-lg-block">
          <a href="/" className="logo navbar-brand">
            <img src={Logo} alt="Brand Name" />
          </a>
        </div>
        <div className="hero_content d-flex">
          <motion.div
            className="hero_left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
          >
            <div>
              <h1 className="hero_text">
                We make Teaching and learning Tech skills Accessible.
              </h1>
              <div className="d-flex hero_subtext">
                <span className="hero_play">
                  <i>
                    <Play />
                  </i>
                </span>
                <p>
                  A one stop place that connects teachers and students in one
                  platform for learning practical tech skills and
                  collaborations.
                </p>
              </div>
            </div>

            <a href="https://goto-course.com/dashboard">
              <button type="button" className="button button-md">
                GET STARTED FOR FREE
              </button>
            </a>
          </motion.div>
          <motion.div
            className="hero_right"
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 110,
              delay: 0.2,
              duration: 0.8,
            }}
          >
            <Image image={hero} alt="Testing" effect="blur" />

            {/* <img src={hero} alt="" /> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

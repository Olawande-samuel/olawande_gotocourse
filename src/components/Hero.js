import React from "react";
import { Play } from "../images/components/svgs";
import { motion } from "framer-motion";
import hero from "../images/hero.webp";
import Image from "./Image";
const Hero = () => {
  return (
    <section className="wrapper hero px-2 p-sm-0">
      <div className="container  hero_wrapper d-flex  hero_content">
        <motion.div
          className="hero_left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5 }}
        >
          <h1 className="hero_text">
            We make Teaching and learning Tech skills Accessible.
          </h1>
          {/* <div className="d-flex">
            <span className="hero_play">
              <i>
                <Play />
              </i>
            </span>
            <p>
              A one stop place that connects teachers and students in one platform for learning practical tech skills and collaborations.
            </p>
          </div> */}
          <div className="d-flex">
            <input
              type="search"
              name="search"
              id="search"
              className="form-control"
            />
            <button className="btn search_btn">Search</button>
          </div>
          <div className="d-flex  keyword_wrapper  mt-4">
            <span>Popular: </span>
            <div className="d-flex flex-wrap pill_wrapper">
              <button className="pill">UI/UX</button>
              <button className="pill">Web design</button>
              <button className="pill">Cybersecurity</button>
            </div>
          </div>
          {/* <button type="button" className="button button-md">GET STARTED FOR FREE</button> */}
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
    </section>
  );
};

export default Hero;

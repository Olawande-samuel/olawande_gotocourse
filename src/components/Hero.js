import React from "react";
import { Play } from "../images/components/svgs";

const Hero = () => {
  return (
    <section className="wrapper hero px-2 p-sm-0">
      <div className="container d-sm-flex hero_content">
        <div className="hero_left">
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
        </div>
        <div className="hero_right"></div>
      </div>
    </section>
  );
};

export default Hero;

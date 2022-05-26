import React from "react";
import { Android, Certificate, Cohort, Self, Skill } from "../images/components/svgs";
import Service from "../images/services.png";
import {FaUsers} from "react-icons/fa";


const Serivces = () => {
  return (
    <section className="wrapper services">
      <div className="container content-wrapper">
            <header>
              <h2 className="title text-center">What We Do?</h2>
            </header>
        <div className="d-flex flex-wrap justify-content-center">
            <div className="services_box d-flex flex-column align-items-center justify-content-center">
              <div className="service_img">
                {/* <img src="" alt="" /> */}
                <FaUsers />
              </div>
              <h3>Accept Payments</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae architecto cum sunt molestiae debitis facere quas </p>
            </div>
            <div className="services_box d-flex flex-column align-items-center">
              <div className="service_img">
                {/* <img src="" alt="" /> */}
                <FaUsers />
              </div>
              <h3>Accept Payments</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae architecto cum sunt molestiae debitis facere quas </p>
            </div>
            <div className="services_box d-flex flex-column align-items-center">
              <div className="service_img">
                {/* <img src="" alt="" /> */}
                <FaUsers />
              </div>
              <h3>Accept Payments</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae architecto cum sunt molestiae debitis facere quas </p>
            </div>
            <div className="services_box d-flex flex-column align-items-center">
              <div className="service_img">
                {/* <img src="" alt="" /> */}
                <FaUsers />
              </div>
              <h3>Accept Payments</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae architecto cum sunt molestiae debitis facere quas </p>
            </div>
            <div className="services_box d-flex flex-column align-items-center">
              <div className="service_img">
                {/* <img src="" alt="" /> */}
                <FaUsers />
              </div>
              <h3>Accept Payments</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem beatae architecto cum sunt molestiae debitis facere quas </p>
            </div>
            
        </div>
      </div>
    </section>
  );
};



export default Serivces;

import React, { useState } from "react";
import user from "../images/user.png";
import lere from "../images/lere.png";
import ola from "../images/ola.png";
import { Left, Right } from "../images/components/svgs";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 604 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 603, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const witnesses = [
  {
    id: 1,
    content:
      "Gotocourse did not only help me level up my tech skills but they also helped me get my dream job",
    profile: user,
    name:"Cynthia",
    location:"Houston, Texas"

  },
  {
    id: 2,
    content:
      "I’m a successful graduate of Gotocourse Institute and I can tell you that it’s a place of knowledge and success",
    profile: lere,
    name:"James",
    location:"Ottawa, Canada"
  },
  {
    id: 3,
    content:
      "I had a wonderful experience and can confidently say that Gotocourse is the place to be to get all your I.T. certification",
    profile: ola,
    name:"Bola",
    location:"Lagos, Nigeria"
  },
];
const Testimonials = () => {
  
  return (
    <section className="testimonials">
      <div className="container testimonial_content">
        <h3 className="testimonials_title">Real Stories from Real Customers</h3>
        <p className="sub_title text-center">Join thousands of people who are achieving their goals on Gotocourse</p>
        <Carousel
          swipeable={true}
          draggable={false}
          showDots={true}
          responsive={responsive}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["desktop","tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {witnesses
              .map((witness, index) => (
                <div className="px-1" key={index}>
                <div className="card slides">
                  <div className="card-body">
                    <div className="avatar d-flex justify-content-center align-items-center">
                      <img src={witness.profile} alt="testimonies" />
                      <div>
                      <span className="text-center testimonials_name">{witness.name}</span>
                        <p className="location">{witness.location}</p>
                      </div>
                    </div>
                    <p className="testimonials_text">
                      &ldquo; {witness.content} &rdquo;
                    </p>
                  </div>
                </div>
                  </div>
              ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;

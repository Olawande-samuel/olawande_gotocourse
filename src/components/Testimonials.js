import React from "react";
import user from "../images/user.png";
import lere from "../images/lere.png";
import ola from "../images/ola.png";


import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
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
      <div className="container-lg testimonial_content">
        <header>
        <h3 className="testimonials_title">Real Stories from Real Customers</h3>
        <p className="sub_title text-center">Join thousands of people who are achieving their goals on Gotocourse</p>
        </header>
        <div>
        <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      breakpoints= {{
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          spaceBetween: 5
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          spaceBetween: 5
        }, 
        1024: { 
          slidesPerView: 3,
          spaceBetween: 5
        }
      }}
    >

          {witnesses
              .map((witness, index) => (
                <SwiperSlide>
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
                  
                </SwiperSlide>
              ))}
    </Swiper>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;

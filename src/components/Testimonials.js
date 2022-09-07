import React from "react";
import user from "../images/cynthia.png";
import lere from "../images/james.png";
import ola from "../images/bolatest.png";


import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
export const witnesses = [
  {
    id: 1,
    content:
      "Gotocourse did not only help me level up my tech skills but they also connected me with the right mentors who assisted me in getting my dream job.",
    profile: user,
    name:"Cynthia",
    location:"Houston, Texas"

  },
  {
    id: 2,
    content:
      "I’m a successful graduate of Gotocourse Institute. My experience while learning was great and I was able to launch my career within a short period of time",
    profile: lere,
    name:"James",
    location:"Ottawa, Canada"
  },
  {
    id: 3,
    content:
      "My Learning experience on Gotocourse was great are affordable and the teachers were very friendly and supportive",
    profile: ola,
    name:"Bola",
    location:"Lagos, Nigeria"
  }
];


 const Testimonials = ({type, student=[]}) => {
  SwiperCore.use([Autoplay])
  return (
    <section className="testimonials" style={{background: type === "newLanding" ? "#EBF0FF" : "white", paddingTop:"2.5rem", paddingBottom:"2.5rem"}}>
      <div className="container-lg testimonial_content">
        <header>
        <h3 className="testimonials_title">{student.length > 0 ? "Testimonials":"Real Stories from Real Customers"}</h3>
        {student.length === 0 &&
        <p className="sub_title text-center">Join thousands of people who are achieving their goals on Gotocourse</p>
        }
        </header>
        <div>
        <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      loop={true}
      speed={1000}
      // autoplay={{delay:2500}}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
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
        
        1224: { 
          slidesPerView: 3,
          spaceBetween: 5
        }
      }}
    >

          {student.length > 0 ? 
            student.map((witness, index) => (
                <SwiperSlide>
                <div className="px-1 testimonials_card_wrapper" key={index} style={{height:"100%", width:"min(100% - 1rem, 350px)", marginInline:"auto"}}>
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
          ))
          :
           witnesses
              .map((witness, index) => (
                <SwiperSlide>
                <div className="px-1 testimonials_card_wrapper" key={index} style={{height:"100%", width:"min(100% - 1rem, 350px)", marginInline:"auto"}}>
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

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { CareerBox, careers } from "./Career";
import { Link } from "react-router-dom";

const Bootcamp = () => {
  return (
    <section className="bootcamp">
      <div className=" container-lg bootcamp_content">
        <header className="text-center">
          <h3 className="title">TECH IMMERSION TRAININGS AND BOOTCAMPS</h3>
          <p className="sub_title mx-auto" style={{ width: "min(100% - 1rem, 700px)" }}>
            {/* GotoCourse trainings and bootcamps have helped thousands of students
            launch new careers in the tech industry. We want to improve the
            quality of life by helping people lean workplace relevant skillsets.
            We do this by helping you learn from experts, enabling learning from
            anywhere, and making sure that our platform is affordable. Gain the
            needed skillsets to launch a new career in tech. */}
            GotoCourse training and bootcamps has helped thousand of students
            launch new careers in the tech industry. We want to improve the
            quality of life by helping people learn workplace relevant
            skillsets.
          </p>
        </header>
        <div className="my-5">
          <Swiper
            // install Swiper modules
            modules={[Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              // when window width is >= 640px
              575: {
                slidesPerView: 2,
                spaceBetween: 0,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 5,
              },
            }}
          >
            <div className="my-5">
              {careers.slice(0, 6).map((career) => (
                <SwiperSlide>
                  <BootcampBox {...career} />
                </SwiperSlide>
              ))}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Bootcamp;

export const BootcampBox = ({ logo, title, details, link }) => {
  return (
    <div className="card">
      <div className="card-body bg-white d-flex flex-column justify-content-around">
        <div className="bootcamp_box_left">
          <i>{logo}</i>
        </div>
        <div className="career_box_right d-flex flex-column">
          <header style={{ marginBottom: ".5rem" }}>
            <h3 className="bootcampBox_title">{title} Bootcamp</h3>
          </header>
          <p className="details">
            Launch into {title.toLowerCase()} with an intensive training
          </p>
          <div className="text-end">
            <Link to={link}>
              <button className="btn-plain">Learn More</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

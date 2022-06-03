import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import SwiperCore, { Autoplay, EffectCreative } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

import hero from "../images/NewHero.png";
import teach from "../images/newTeach.png";
import stu from "../images/newLearn.png";
import gen from "../images/generaltp.png";
import Image from "./Image";

import "swiper/css";
import "swiper/css/effect-creative";

const Hero = () => {
  SwiperCore.use([Autoplay]);
  const teacher = {
    title: "Endless Possibilities With Borderless Learning",
    subtitle:
    "Enabling students to learn and  benefit from a global network of highly skilled professionals by increased access to quality learning and mentorship from domain experts",
    image: stu,
    link: "/categories",
    background: "#F1F8FF",
    color: "#F75C4E",
    btn: "Explore Courses",
  };
  const student = {
    title: "Explore Wide Range Of Tech Skills To Develop Your Professional Career",
    subtitle:
    "Endless Possibilities With Borderless Learning",
    image: teach,
    link: "/signup",
  background: "#F1F8FF",
  color: "#0C2191",
  btn: "Get Started",

  };
  const general = {
    title: "We make Teaching and learning Tech skills  Accessible.",
    subtitle: "",
    image: gen,
    link: "/signup",
    background: "#F1F8FF",

    
  }; 

  return (
    <section className="hero">
      <Swiper
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ["100%", 0, 0],
          },
        }}
        loop={true}
        speed={1000}
        modules={[EffectCreative]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
        autoplay={{ delay: 3500 }}
        effect={"creativeEffect"}
        breakpoints={{ 320: { slidesPerView: 1, spaceBetween: 0 } }}
      >
        <SwiperSlide>
          <Generic {...general} />
        </SwiperSlide>
        <SwiperSlide>
          <Others {...student} />
        </SwiperSlide>
        <SwiperSlide>
          <Others {...teacher} />
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Hero;

export const Generic = ({ image, background}) => {
  return (
    <div className="" style={{ background:background }}>
      <div className="container">
        <div className="row hero_row w-100 py-5">
          <motion.div
            className={`col-md-4 hero_left`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
          >
            <div>
              <h1 className="hero_text" style={{ color: "#0C2191" }}>
                We make Teaching and learning Tech skills Accessible
              </h1>
              <div className="d-flex">
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="form-control"
                />
                <button className="btn search_btn">
                  <FaSearch />
                </button>
              </div>
              <div className="d-flex  keyword_wrapper  mt-4">
                <span>Popular: </span>
                <div className="d-flex flex-wrap pill_wrapper">
                  <button className="pill">UI/UX</button>
                  <button className="pill">Web design</button>
                  <button className="pill">Cybersecurity</button>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            className={`col-md-8 special_right`}
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 110,
              delay: 0.2,
              duration: 0.8,
            }}
          >
            <Image
              image={image}
              alt="woman on a laptop smiling"
              effect="blur"
            />
          </motion.div>
        </div>
        <div>
          <p className="hero_subtext text-center text-md-start">
            Join hundreds of people that trust Gotocourse to teach and learn
            in-demand tech skills
          </p>
        </div>
      </div>
    </div>
  );
};
export const Others = ({ title, image, subtitle, background,btn, link, color }) => {
  return (
    <div
      className=""
      style={{ paddingBottom: "5rem", background: background, color: color }}
    >
      <div className="container">
        <div className="row hero_row w-100">
          <motion.div
            className={`col-md-6 hero_left`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
          >
            <div>
              <h1 className="hero_text  ">{title}</h1>
              <p className="hero_subtext text-center text-lg-start ">{subtitle}</p>
              <div className="text-center text-lg-start">
                <Link
                  to={link}
                  className="button button-lg"
                  style={{ color: "#fff", background:color}}
                >
                 {btn}
                </Link>
              </div>
            </div>
          </motion.div>
          <motion.div
            className={`col-md-6 hero_right `}
            initial={{ x: 800 }}
            animate={{ x: 0 }}
            transition={{
              type: "spring",
              stiffness: 110,
              delay: 0.2,
              duration: 0.8,
            }}
          >
            <Image
              image={image}
              alt="woman on a laptop smiling"
              effect="blur"
            />
          </motion.div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

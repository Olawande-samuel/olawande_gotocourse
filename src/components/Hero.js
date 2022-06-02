import React from "react";
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import SwiperCore, { Autoplay, EffectCreative } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

import hero from "../images/NewHero.png";
import teach from "../images/teachertp.png";
import stu from "../images/studenttp.png";
import gen from "../images/generaltp.png";
import Image from "./Image";

import "swiper/css";
import "swiper/css/effect-creative";

const Hero = () => {
  SwiperCore.use([Autoplay]);
  const teacher = {
    title: "We teach the world relevant skills",
    subtitle:
      "An all in one platform to grow your tech skils for real career growth.",
    image: teach,
    link: "/become-a-teacher",
    background: "#0C2191",
    color: "#fff",
  };
  const student = {
    title: "Find the perfect course for you.",
    subtitle:
      "We provide you an all-in-one platform to help learn high in demand tech skills from industry experts.",
    image: stu,
    link: "/signup",
    btn: "Explore Courses",
    background: "#F75C4E",
    color: "#fff",
  };
  const general = {
    title: "We make Teaching and learning Tech skills  Accessible.",
    subtitle: "",
    image: gen,
    link: "/signup",
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
        navigation
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

export const Generic = ({ image }) => {
  return (
    <div className="" style={{ background: "" }}>
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
export const Others = ({ title, image, subtitle, background, link, color }) => {
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
              <h1 className="hero_text  text-center">{title}</h1>
              <p className="hero_subtext  text-center">{subtitle}</p>
              <div className="text-center">
                <Link
                  to={link}
                  className="btn-plain"
                  style={{ color: background }}
                >
                  Get Started
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

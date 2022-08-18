import React, { useRef} from "react";
import { Link } from "react-router-dom";
import SwiperCore, { Autoplay } from "swiper";
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";

import place from "../images/placehero.png"
import Image from "./Image";
import { useAuth } from "../contexts/Auth";

import "swiper/css";
import "swiper/css/effect-creative";

const Hero = () => {
  const ref = useRef()
  SwiperCore.use([Autoplay]);
  const New = {
    title: "Learn from experts",
    title2: "Learn from anywhere",
    title3: "Learn more for less",
    subtitle: "GotoCourse helps you achieve your tech career goals by connecting you to a global network of highly skilled professionals and domain experts.",
    image: place,
    link: "/categories",
    background: "#F1F8FF",
    color: "#F75C4E",
    btn: "Explore Courses",
    colorSwap:"#0C2191"

    
  }; 

  const {  generalState: { navHeight }, } = useAuth();
  return (
    <section className="hero" style={{height: `min(calc(100vh - ${navHeight}px ), 530px)`}}>
          <Others {...New} />
    </section>
  );
};

export default Hero;

export const Generic = ({ image, background}) => {
  const {  generalState: { navHeight }, } = useAuth();

  return (
    <div className="hero_container_wrapper" style={{ background:background }}>
      <div className="container hero_container" style={{height: `calc(100vh - ${navHeight}px)` }}>
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

export const Others = ({ title, image, title2, title3, subtitle, background,btn, link, color, colorSwap }) => {
  const {  generalState: { navHeight }, } = useAuth();

  return (
    <div
      className="hero_container_wrapper"
      style={{ background: "#fff", color: colorSwap }}
    >
      <div className="container hero_container" style={{height: `min(calc(100vh - ${navHeight}px ), 530px)`,display:"grid", placeItems:"center" }}>
        <div className="row hero_row w-100">
          <motion.div
            className={`col-md-7 hero_left`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.5 }}
          >
            <div>
              <div className="hero_text_group">
              <h2 className="hero_text">{title}</h2>
              {/* new */}
              <h2 className="hero_text">{title2}</h2>
              <h2 className="hero_text">{title3}</h2>
              </div>

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
            className={`col-md-5 hero_right `}
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

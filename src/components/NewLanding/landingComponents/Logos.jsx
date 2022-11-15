import styled from "styled-components"



import SwiperCore, {
    Navigation,
    Autoplay,
    Pagination,
    Scrollbar,
    A11y,
  } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
  
  // Import Swiper styles
import "swiper/css";

import cisco from "../../../images/landing/logos/cisco-2.svg"
import comptia from "../../../images/landing/logos/comptia.png"
import ec from "../../../images/landing/logos/ec_council.png"
import isc from "../../../images/landing/logos/ics.jpeg"
import isaca from "../../../images/landing/logos/isaca.jpeg"
import microsoft from "../../../images/landing/logos/microsoft.svg"
import pecb from "../../../images/landing/logos/pecb.jpeg"
import pmi from "../../../images/landing/logos/pmi.png"
import { Link } from "react-router-dom";


const Section = styled.section`
    padding-block: 5rem;
 
    header {
        margin-bottom: 4rem;
        text-align:center;

        h3 {
            width: min(100% - .2rem, 550px);
            margin-inline:auto;
        }

        
    }

    img {
        width: 100px;
        height: 50px;
        max-width: 100%;
    }

    .get_started {
        background: var(--theme-blue);
        color: #FFF;
        padding: 15px 60px;
        border: none;
        outline: none;
        margin-inline: auto;
        margin-top: 3rem;

    }



 `
 
 const Logos = ()=> {
    return (
        <Section>
            <div className="container">
                <header>
                    <h3>Validate your skills in a job role with industry recognized certification</h3>
                </header>
                <Swiper
            // install Swiper modules
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            loop={false}
            speed={1500}
            autoplay={{ delay: 2500 }}
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
              // when window width is >= 320px
              320: {
                slidesPerView: 1,
                spaceBetween: 0,
              },
              // when window width is >= 640px
              575: {
                slidesPerView: 4,
                spaceBetween: 5,
              },
              700: {
                slidesPerView: 5,
                spaceBetween: 5,
              },
              1024: {
                slidesPerView: 8,
                spaceBetween: 3,
              },
              1704: {
                slidesPerView: 7,
                spaceBetween: 3,
              },
            }}
          >
            {myLogos.map((item, i) => (
              <SwiperSlide key={i}>
                <img src={item} alt="" />
              </SwiperSlide>
            ))}
          </Swiper>

                <div className="d-flex">
                    <Link to="/login" className="d-flex mx-auto">
                        <button className="get_started">Get Started</button>
                    </Link>
                </div>
            </div>
        </Section>
    )
 }
 export default Logos

 const myLogos = [cisco, comptia, ec, isc, isaca, microsoft,pecb, pmi]
import { motion } from "framer-motion";
import { Link } from "react-router-dom"
import { Paper } from "@mui/material";
import { Rating } from "react-simple-star-rating";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";



import clsx from "./styles.module.css";
import teacher from "../../images/Group944.png"


export function Jumbotron() {
    return (
        <div className={clsx.jumbotron}>
            <div className={`container ${clsx.jumbotron__cover}`}>
                <div className={clsx.jumbotron__absolute}>
                    <h1>There Is No Successful Student Without A Teacher</h1>
                    <p>Absolutely, no one can succeed in their practical lives without teachers. Students also need someone who can show simplify terms in real life. Not only as a coach, but start as a mentor to guide students along their academic lives.</p>
                    <div className="w-100" style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <Link to="/qualifications">

                            <motion.button
                                transition={{
                                    ease: 'easeInOut',
                                    duration: 0.5
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    textShadow: "0px 0px 8px rgb(255, 255, 255)"
                                }}  >Become a teacher</motion.button>
                        </Link>

                    </div>
                </div>
                <div className={clsx.jumb_container}>
                    <img src={teacher} alt="" />
                </div>

            </div>
        </div>
    )
}




export const Reviews = ({reviews, bgColor}) => (
    <div className={clsx.reviews} style={{backgroundColor: bgColor && bgColor}}>
    <h1>Reviews</h1>
    <p>Care to know what the world say about us?</p>
    <div className={clsx.reviews__container}>
        <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            style={{ padding: "20px 0px" }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 3,
                },
                // when window width is >= 640px
                575: {
                    slidesPerView: 2,
                    spaceBetween: 3,
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 3,
                },
                1024: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
            }}
        >
            {
                reviews.map(({ review, avatar, name, location }, i) => (
                    <SwiperSlide>

                        <Paper className={clsx.reviews_paper} key={i}>
                            <q>{review}</q>
                            <div className={clsx.reviews_info}>
                                <div>
                                    <img src={avatar} alt="Avatar" />
                                    <div>
                                        <h5>{name}</h5>
                                        <span>{location}</span>
                                    </div>
                                </div>
                                <Rating ratingValue={100} size={20} allowHover={false} readonly={true} />
                            </div>
                        </Paper>
                    </SwiperSlide>
                ))
            }

        </Swiper>
        </div>
    </div>
)
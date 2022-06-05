import {useEffect, useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import { Grid, Paper, Breadcrumbs } from "@mui/material";
import {BiChalkboard, BiEditAlt, BiDollar} from "react-icons/bi";
import { MdPictureAsPdf, MdExpandMore, MdExpandLess } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {motion} from "framer-motion"
import Layout from "../../components/Layout";
import { Jumbotron } from "./components";
import clsx from "./styles.module.css";
import img from "../../images/bola.png";




export const Home = () => {
    const data = [
        {
            icon: BiEditAlt,
            title: "Create Class",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo. Proin fermentum ipsum a non tellus tincidunt feugiat laoreet laoreet."
        },
        {
            icon: BiChalkboard,
            title: "Deliver a great Class",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo. Proin fermentum ipsum a non tellus tincidunt feugiat laoreet laoreet."
        },
        {
            icon: BiDollar,
            title: "Get Paid",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo. Proin fermentum ipsum a non tellus tincidunt feugiat laoreet laoreet."
        },
    ]

    const faqs = [
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
        {
            question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
            answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh amet, erat sed risus tristique ultrices. Augue mauris, egestas"
        },
    ]


    const reviews = [
        {
            review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
            avatar: img,
            name: "Bola",
            location: "Lagos, Nigeria"
        },
        {
            review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
            avatar: img,
            name: "Bola",
            location: "Lagos, Nigeria"
        },
        {
            review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
            avatar: img,
            name: "Bola",
            location: "Lagos, Nigeria"
        },
    ]

    function toggleHandler(e){
        let clicked = e.currentTarget;
        let mainParent = clicked.parentNode.parentNode;
        let answer = mainParent.querySelector(".frequent_answer");
        let expandMoreIcon = mainParent.querySelector(".expand__more");
        let expandLessIcon = mainParent.querySelector(".expand__less");

        if(answer.style.display === 'none' || !answer.style.display){
            answer.style.display = 'block';
            expandMoreIcon.style.display = 'none';
            expandLessIcon.style.display = 'block';
        }else {
            answer.style.display = 'none'
            expandMoreIcon.style.display = 'block';
            expandLessIcon.style.display = 'none';
        }
    }
    return (
        <Layout>
            <Jumbotron />
            <div className={clsx.how_it_works}>
                <h1>How It Works</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo.</p>
                <div className={clsx.how_it_works_container}>
                    <Grid container spacing={4}>
                        {
                            data.map(({icon: Icon, title, content}, i) => (
                                <Grid item xs={12} sm={12} md={6} lg={4} key={i}>
                                    <Paper elevation={1} className={clsx.paper}>
                                        <span>
                                            <Icon />
                                        </span>
                                        <h4>{title}</h4>
                                        <p>{content}</p>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>
            <div className={clsx.best_features}>
                <h1>Our Best Features</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo.</p>
                <Grid container spacing={6} sx={{position: "relative", marginBottom: 5}}>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className={clsx.rectangle}></div>
                        <div className={clsx.best__features_img}></div>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Classroom Management</h4>
                            <p>We use an efficient classroom management tool that helps track student progress and optimise learning for both teachers and students.</p>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={6} sx={{position: "relative", marginBottom: 5}}>
                    <Grid item sm={12} md={6}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Live Class</h4>
                            <p>We use an efficient classroom management tool that helps track student progress and optimise learning for both teachers and students.</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className={clsx.rectangle_2}></div>
                        <div className={clsx.best__features_img_live}></div>
                    </Grid>
                </Grid>
                
                <Grid container spacing={4} sx={{position: "relative", marginBottom: 5}}>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className={clsx.rectangle}></div>
                        <div className={clsx.best__features_creator}></div>
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Creator Suites</h4>
                            <p>We use an efficient classroom management tool that helps track student progress and optimise learning for both teachers and students.</p>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={6} sx={{position: "relative", marginBottom: 5}}>
                    <Grid item sm={12} md={6}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Customization</h4>
                            <p>We use an efficient classroom management tool that helps track student progress and optimise learning for both teachers and students.</p>
                            <Link to="/teacher/signup">
                            <motion.button
                            className="button button-md"
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <div className={clsx.rectangle_2}></div>
                        <div className={clsx.best__features_img_custom}></div>
                    </Grid>
                </Grid>
            </div>

            <div className={clsx.frequently_asked_questions}>
                <h1>Frequently Asked Questions</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo.</p>
                <div className={clsx.frequently_asked_questions_container}>
                    <Grid container spacing={4}>
                        {
                            faqs.map(({question, answer}, i) => (
                                <Grid item sm={12} md={6} key={i}>
                                    <Paper elevation={0} className={clsx.frequently_asked_questions_paper}>
                                        <div className={clsx.question}><p>{question}</p>  <span onClick={toggleHandler}><MdExpandMore className="expand__more" /> <MdExpandLess className="expand__less" /></span></div>
                                        <div className={`${clsx.answer} frequent_answer`}>
                                            {answer}
                                        </div>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>

            <div className={clsx.reviews}>
                <h1>Reviews</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo.</p>
                <div className={clsx.reviews__container}>
                    <Swiper
                        // install Swiper modules
                        modules={[Navigation, Pagination, Scrollbar, A11y]}
                        spaceBetween={50}
                        slidesPerView={1}
                        navigation
                        style={{padding: "20px 0px"}}
                        pagination={{ clickable: true }}
                        scrollbar={{ draggable: true }}
                        onSwiper={(swiper) => console.log(swiper)}
                        onSlideChange={() => console.log("slide change")}
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
                        reviews.map(({review, avatar, name, location}, i) => (
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
        </Layout>
    )
}



export const Profile = () => {
    const crumbs = [
        <Link to="/" className={clsx.breadcrumb_link} key={1}>
            Homepage
        </Link>,
        <Link to="/teacher" className={clsx.breadcrumb_link} key={1}>
            Teachers
        </Link>,
        <span className={clsx.breadcrumb_main_page} key={1}>
            Teacher's Profile
        </span>,
    ]
    const navParts = ["About Teacher", "Packages", "Reviews"];
    return (
        <Layout>
            <div className={clsx.breadcrumb}>
                <Breadcrumbs separator={">"} aria-label="breadcrumb">
                    {crumbs}
                </Breadcrumbs>
            </div>
            <div className={clsx.profile_navigation}>
                {
                    navParts.map((el, i) => <span className={i === 0 && 'active'} key={i}>{el}</span>)
                }
            </div>
        </Layout>
    )
}
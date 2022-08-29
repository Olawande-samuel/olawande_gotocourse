import {Link} from "react-router-dom";
import { Grid, Paper, Breadcrumbs } from "@mui/material";
import {BiChalkboard, BiEditAlt, BiDollar} from "react-icons/bi";
import { MdPictureAsPdf, MdExpandMore, MdExpandLess, MdPlaylistAddCheck } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {motion} from "framer-motion"
import Layout from "../../components/Layout";
import { Jumbotron } from "./components";
import clsx from "./styles.module.css";
import img from "../../images/bola.png";
import {ScrollToTop} from "../Courses"
import { FaqComponent } from "../../components/Faq";
import classroom from "../../images/classroom_management.png";
import liveClass from "../../images/live_class.png";
import creator from "../../images/creator_suite.png";
import customization from "../../images/customization.png";
import teacher from "../../images/become_teacher02.png";


export const Home = () => {
    const styles = {
        title: {
            color: "#0C2191 !important",
            fontSize: 18,
            marginBottom: 15
        },
        answer: {
            fontSize: 14,
            fontWeight: 400,
            letterSpacing: 0.4
        }
    }
    const data = [
        {
            icon: MdPlaylistAddCheck,
            title: "Enroll to Teach",
            content: "Enroll to teach on Gotocourse and get approved by Gotocourse course standardization team. "
        },
        {
            icon: BiEditAlt,
            title: "Create Class",
            content: "Create a learning environment according to your niche with your own modifications. "
        },
        {
            icon: BiChalkboard,
            title: "Deliver a great Class",
            content: "With our built-in creator suite, you can optimize your class to deliver a great lecture to your students."
        },
        {
            icon: BiDollar,
            title: "Get Paid",
            content: "Get paid by your students via our payment systems, a reward for your mentorship."
        },
    ]

    const faqs = [
        {
            question: "Do I require any form of certification to teach on Gotocourse?",
            answer: "Yes! Teachers will only teach in their respective areas of expertise in which they are certified after they have been screened and vetted by Gotocourse."
        },
        {
            question: "How often do I get paid on Gotocourse?",
            answer: "Payment starts from when the class is 25% done till when class is completed. Teachers can choose to be paid when the class is 100% done"
        },
        {
            question: "Can I receive payments directly from my students?",
            answer: "No. Students can only pay via the Gotocourse payment system while Gotocourse pays you afterward."
        },
        {
            question: "How do I receive my payment?",
            answer: "You receive your payments via your bank info as specified by you."
        },
        {
            question: "How do I conduct my training on Gotocourse?",
            answer: "Teachers have access to training suite/tools on Gotocourse which they can use to create and conduct all their trainings."
        }
    ]


    const reviews = [
        {
            review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
            avatar: img,
            name: "Ope",
            location: "Lagos, Nigeria"
        },
        {
            review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
            avatar: img,
            name: "James",
            location: "Houston, Texas"
        },
        {
            review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
            avatar: img,
            name: "Ike",
            location: "Abuja, Nigeria"
        },
    ]

    return (
        <Layout>
            <ScrollToTop />
            <Jumbotron />
            <div className={clsx.how_it_works}>
                <h1>How It Works</h1>
                <p>Discover the steps involved in becoming a tutor on Gotocourse.</p>
                <div className={clsx.how_it_works_container}>
                    <Grid container spacing={4}>
                        {
                            data.map(({icon: Icon, title, content}, i) => (
                                <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={i}>
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
                <p>Check out what makes us stand out at Gotocourse!</p>
                <Grid container spacing={6} sx={{marginBottom: 15, marginTop: 15}}>
                    <Grid item xs={12} sm={12} md={7}>
                        <img src={classroom} className={clsx.image} alt="Classroom" />
                    </Grid>
                    <Grid item sm={12} md={5}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Classroom Management</h4>
                            <p>We use an efficient classroom management tool that helps track student progress and optimise learning for both teachers and students.</p>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{marginBottom: 15}}>
                    <Grid item sm={12} md={5}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Live Class</h4>
                            <p>We use an efficient classroom management tool that helps track student progress and optimise learning for both teachers and students.</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                       <img src={liveClass} className={clsx.image} alt="Live Class" />
                    </Grid>
                </Grid>
                
                <Grid container spacing={4} sx={{marginBottom: 15}}>
                    <Grid item xs={12} sm={12} md={7}>
                        <img src={creator} className={clsx.image} alt="Creator" />
                    </Grid>
                    <Grid item sm={12} md={5}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Creator Suites</h4>
                            <p>The built-in creator suite lets you create high-quality videos without expensive recording equipment and additional software. One of the great pros of Gotocourse!</p>
                        </div>
                    </Grid>
                </Grid>

                <Grid container spacing={4} sx={{marginBottom: 15}}>
                    <Grid item sm={12} md={5}>
                        <div className={clsx.best__features_card}>
                            <span>
                                <MdPictureAsPdf />
                            </span>
                            <h4>Customization</h4>
                            <p>You can modify the appearance of your classes, such as the images, colours and layouts.</p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7}>
                        <img src={customization} className={clsx.image} alt="Customization" />
                    </Grid>
                </Grid>
            </div>

            <div className={clsx.become_a_teacher}>
                <div className={clsx.become_a_teacher__left}>
                    <img src={teacher} alt="Teacher" />
                </div>
                <div className={clsx.become_a_teacher__right}>
                    <h3>Get access to customized
dashboard to track Earnings, 
Student Enrolment to class, and 
Payment over a period of time.</h3>
                    <Link to="/teacher/signup">
                        <button>Become a teacher</button>
                    </Link>
                </div>
            </div>

            <div className={clsx.frequently_asked_questions}>
                <h1>Frequently Asked Questions</h1>
                {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Qm risus ridiculus nunc adipiscing justo.</p> */}
                <div className={clsx.frequently_asked_questions_container}>
                    <Grid container spacing={4}>
                        {
                            faqs.map(({question, answer}, i) => (
                                <Grid item sm={12} md={6} key={i}>
                                    <FaqComponent title={question} answer={answer} key={i} style={styles} />
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
            </div>

            <div className={clsx.reviews}>
                <h1>Reviews</h1>
                <p>Care to know what the world say about us?</p>
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
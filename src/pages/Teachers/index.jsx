import Layout from "../../components/Layout"


import { TeacherHero, AllInOne, BestTools, Customised, FAQ, Hero, ImageContent, ItWorks, ItWorksList, MainHeader, Ready, ReviewContainer, TextContent } from "./style"


import hang from "../../images/Teachers/hang.png";
import hiw from "../../images/Teachers/hiw.png";
import mail from "../../images/Teachers/mail.png";
import onDgo from "../../images/Teachers/onDgo.png";
import record from "../../images/Teachers/record.png";
import customised from "../../images/Teachers/customised.png";
import unlimited from "../../images/Teachers/unlimited.png";
import creator from "../../images/Teachers/creator.png";
import quiz from "../../images/Teachers/quiz.png";
import styled from "styled-components";
import Meetifix from "../../images/landing/icons/Meetifix.png"
import Rekordia from "../../images/landing/icons/Rekordia.png"
import Quikonnet from "../../images/landing/icons/Quikonnet.png"
import Classpodia from "../../images/landing/icons/Classpodia.png"
import Quizim from "../../images/landing/icons/Quizim.png"
import creatzion from "../../images/Teachers/creatzion.png"

import arrow from "../../images/Teachers/arrow.png"
import { Reviews } from "../Teacher/components";
import { faqs, reviews } from "../Teacher";
import { FaqComponent } from "../../components/Faq";
import teacher from "../../images/become_teacher02.png";
import { Link } from "react-router-dom";



const Teachers = () => {
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
    return (
        <Layout>
            <TeacherHero>
                <div className="container">
                <div className="left">
                    <h3>
                        Gotocourse is everything you need to teach what you love!
                    </h3>
                    <p>Before you begin your journey, check if you are eligible to teach on Gotocourse by answering  some questions</p>
                    <div className="d-flex">
                        <Link to="/qualifications">
                            <button>Check Eligibility</button>
                        </Link>
                    </div>
                </div>
                <div className="right">
                    <img src={hang} alt="" />
                </div>

                </div>
            </TeacherHero>
            {/* <Hero>
                <header>
                    <h1>Gotocourse is everything you need to teach what you love!</h1>
                    <p>Before you begin your journey, check if you are eligible to teach on Gotocourse by answering  some questions</p>
                    <div className="d-flex">
                        <button>Check Eligibility</button>
                    </div>
                </header>
                <div className="position-relative">
                    <div className="img_wrapper">
                        <img src={hang} alt="" />
                    </div>
                </div>
            </Hero> */}
            <ItWorks>
                <div className="container">
                    <MainHeader>
                        <h2>How It Works</h2>
                        <p>Check incredible tools created on Gotocourse to make teaching cost effective</p>
                    </MainHeader>
                    <div className="content">
                        <div className="list_content">
                            <ItWorksList>
                                <div className="number">1</div>
                                <h5>Enroll to teach</h5>
                                <small>Enroll to teach on Gotocourse and get approved by Gotocourse course standardization team.</small>
                            </ItWorksList>
                            <ItWorksList>
                                <div className="number">2</div>
                                <h5>Create Class</h5>
                                <small>Create a learning environment according to your niche with your own modifications.</small>
                            </ItWorksList>
                            <ItWorksList>
                                <div className="number">3</div>
                                <h5>Deliver a Great Class</h5>
                                <small>With our built-in creator suite, you can optimize your class to deliver a great lecture to your students.</small>
                            </ItWorksList>
                            <ItWorksList>
                                <div className="number">4</div>
                                <h5>Get Paid</h5>
                                <small>Get paid by your students via our payment systems, a reward for your mentorship.</small>
                            </ItWorksList>

                        </div>
                        <div className="img_wrapper">
                            <img src={hiw} alt="" />
                        </div>
                    </div>
                </div>
            </ItWorks>
            <BestTools>
                <MainHeader>
                    <h2>Our Best tools</h2>
                    <p>Check incredible tools created on Gotocourse to make teaching cost effective</p>
                </MainHeader>
                {
                    data.map(item => (
                        <BestCards {...item} />

                    ))
                }
            </BestTools>
            <AllInOne>
                <div className="container">
                    <header>
                        <h4>All in one platform making teaching organized, cost effective borderless and collaborative </h4>
                    </header>

                    <div className="bar">
                        <div className="icon">
                            <img src={Meetifix} alt="" />
                        </div>
                        <div className="icon">
                            <img src={Quikonnet} alt="" />
                        </div>
                        <div className="icon">
                            <img src={Rekordia} alt="" />
                        </div>
                        <div className="icon">
                            <img src={Classpodia} alt="" />
                        </div>
                        <div className="icon">
                            <img src={creatzion} alt="" />
                        </div>
                        <div className="quizim">
                            <img src={Quizim} alt="" />
                        </div>
                        <div className="arrow_container">
                            <img src={arrow} alt="" />
                            <p>Go<span>2</span>course</p>
                        </div>
                    </div>
                </div>
            </AllInOne>
            <Customised>
                <div className="container">
                    <div className="content">
                        <div className="img_wrapper">
                            <img src={teacher} alt="" />
                        </div>
                        <div className="text_content">
                            <h3>Get access to customized dashboard to track Earnings, Student Enrolment to class, and Payment over a period of time.</h3>
                            <button>Become A Teacher</button>
                        </div>

                    </div>
                </div>
            </Customised>
            <FAQ>
                <div className="container">
                    <header>
                        <h3>Frequently Asked Questions</h3>
                    </header>
                    <div className="content">
                        {
                            faqs.map(({ question, answer }, i) => (
                                <FaqComponent title={question} answer={answer} key={i} style={styles} />
                            ))
                        }

                    </div>
                </div>


                </FAQ>
                <ReviewContainer>
                    <div className="container-xxxl mx-auto teacher_review">
                        <Reviews bgColor="var(--white)" reviews={reviews} />
                    </div>  
                </ReviewContainer>
                <Ready>
                    <h4>Ready to start creating unlimited courses on Gotocourse?</h4>
                    <Link to="/qualifications">
                        <button>Get started for free</button>
                    </Link>
                </Ready>
        </Layout>
    )
}


function BestCards({ title, p1, p2, logo, img }) {
    return (
        <section>
            <div className="container">
                <div className="grid">
                    <ImageContent className="img_container">
                        <img src={img} alt="" />
                    </ImageContent>
                    <TextContent className="text_container">
                        <div className="logo">
                            <img src={logo} alt="" />
                        </div>
                        <h4>{title}</h4>
                        <p>{p1}</p>
                        <p>{p2}</p>
                    </TextContent>
                </div>
            </div>
        </section>
    )
}
export default Teachers

const data = [

    {
        id: 1,
        title: "Hold unlimited live classes",
        p1: "Teach great skills with the best teachers live online. Unlock the power of real-time learning without any barrier.",
        p2: "Teachers are empowered to conduct unlimited live classes with students with just a click of a button, and other features like class recording, screen-share and chat lobby.",
        logo: Meetifix,
        img: unlimited
    },
    {
        id: 2,
        title: "Secured chat and mail system",
        p1: "Quikonnet is also a simple two-way interaction tool for teachers to Clear doubts, broadcast announcements, or just send some motivational messages.",
        p2: "",
        logo: Quikonnet,
        img: mail,

    },
    {
        id: 3,
        title: "Course materials on the go",
        p1: "It is extremely simple to use and works smoothly even on low bandwidth.  Your students can see all assignments on the assignment page and all study materials (e.g., notes, documents, photos, and videos) can be uploaded and saved on Classpodia.",
        p2: "Your students  have unlimited  access to study material on any device, anytime and  anywhere hence, they  are able to maximise their learning with  the provided study material after every class and any time they  need it.",
        logo: Classpodia,
        img: onDgo
    },
    {
        id: 4,
        title: "Student record system",
        p1: "Enjoy personalized performance reports. This friendly feature helps to send reminders, and take attendance automatically. It also makes daily basis and common tasks like sorting students into groups, recording assessments/attendance, and contacting students quick and easy. Students can also download gradesheets, attendance particulars etc as a CSV or PDF file.",
        p2: "",
        logo: Rekordia,
        img: record
    },
    {
        id: 5,
        title: "Quiz Tool",
        p1: "Create a quiz in a few seconds or take secure online quizes on any device, anywhere and at any time . Create quizzes in multiple choice tests, checkboxes, upload file attachment or assessment papers and have access to grades in real time just when made available.",
        logo: Quizim,
        img: quiz
    },
    {
        id: 7,
        title: "Create course contents with the use of a single tool",
        p1: "This is a powerful educator’s companion designed to help course creators create their videos, course outline, and other material that will aid students leaning.",
        logo: creatzion,
        img: creator
    },
]
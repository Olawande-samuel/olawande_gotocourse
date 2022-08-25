import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from "@mui/material"
import Image from "../../components/Image"
import Layout from "../../components/Layout"
import Development from "../../components/Development"
import Testimonials from "../../components/Testimonials"
import Faq from "../../components/Faq"
import { TabsComp } from "../../components/NewLanding/Tabs"
import { useAuth } from "../../contexts/Auth"
import style from "./style.module.css"


import HeroImg from "../../images/student/hero-alt.png"
import Learning from "../../images/cohort.webp";
import Inperson from "../../images/in-Person.webp"
import Mento from "../../images/inPerson.webp";
import Tech from "../../images/fast.webp";
import Yellow from "../../images/student/yellow.png";
import LiveImg from "../../images/student/live.png";
import SchCohort from "../../images/student/cohort.png";
import SchRecorded from "../../images/student/recorded.png";
import SchWebinar from "../../images/student/webinar.png";
import graduate from "../../images/student/graduate.png";
import Initial from "../../images/student/initial.png";
import Upfront from "../../images/student/upfront.png";
import Dubai from "../../images/student/abuja.png";
import Abuja from "../../images/student/dubai.png";
import Mumbai from "../../images/student/mumbai.png";
import best from "../../images/student/best.png";
import career from "../../images/student/career.png";
import upskill from "../../images/student/upskil.png"


import {AiFillPlayCircle, AiOutlineSelect} from "react-icons/ai"
import {BsFillCreditCardFill, BsCollectionPlayFill} from "react-icons/bs"
import {FaRegEdit, FaRobot} from "react-icons/fa"

export const Students = ()=>{
    return (
        <Layout background="blue">
            <div className={`students ${style.all}`}>
                <Hero />
                <Courses />
                <LearningModel />
                <Live />
                <Schedule />
                <Graduate />
                <Journey />
                <Development />
                <Payment />
                <Testimonials student={studentTestimonials} />
                <Best />
                <IsRight />
                <Faq other={FaqItems} />
            </div>
        </Layout>
    )
}

function Hero(){
    const {  generalState: { navHeight }, } = useAuth();

    const list = [
        "Robust curriculum taught by industry expert",
        "Flexible learning modes to personalize your learning",
        "Safe time and learn on a shoe-string budget",
        "1:1 mentorship and guidance",
        "Hands-on-real-life projects"
    ]
    return(
        <div className={style.hero} style={{marginTop: `${navHeight}px`}}>
            <div className="container" style={{height: "100%"}}>
                <div className={style.hero_container} >
                    <div className={style.text_container}>
                        <Box>
                            <h1>Find your pathway to top Tech Companies through Tech Skill Training</h1>
                            {/* <Typography variant="h1" gutterBottom> h1. Heading </Typography> */}
                            <ul>
                                {list.map((item,index)=>(
                                    <li key={index}>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Button variant="contained">Get started today</Button>
                        </Box>
                    </div>
                    <div className={style.hero_img_container}>
                        <Image width="100%" height="100%"  image={HeroImg} alt="Female student carrying a bag looking towards the camera" className={`${style.background_wrapper} background`} effect="blur"  />
                    </div>
                </div>

            </div>
        </div>
    )
}


function Courses(){
    return (
        <div className={style.courses}>
            <div className="container-xxl">
                <header className={style.courses_header}>
                    <h2>In-demand Courses</h2>
                    <p className="text-muted">Get ahead with expert-led training</p>
                </header>
                <TabsComp />
            </div>
        </div>
    )
}

function LearningModel(){
     
    return(
        <div className={style.learning}>
            <div className="container">
                <header className={style.learning_header}>
                    <h2>Choose your learning model:</h2>
                    <p>One size doesn't fit all</p>
                </header>
                <div className={style.learning_content}>
                    {learnInfo.map(item=>(
                       <LearningComp {...item} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}

function LearningComp({img, header, text, link,imgAlt}){
    return(
        <div className={style.learn_box}>
            <img src={img} alt={imgAlt} className={style.learn_img}/>
            <div className={style.learn_text}>
                <h3>{header}</h3>
                <p>{text}</p>
                <Button variant="contained">View details</Button>
            </div>
        </div>
    )
}

function Live(){
    return(
        <div className={style.live}>
            <div className="container h-100">
                <div className={`${style.live_container} position-relative h-100`}>
                    <div className={style.live_text_container}>
                        <h3>Join Gotocourse Live-changing Webinar</h3>
                        <p>Gotocourse webinars are valuable and resourceful</p>
                        <div>
                            <Button>Attend for free</Button>
                        </div>
                            
                    </div>
                    <div className={style.live_img_container}>
                        <div className="position-relative w-100 h-100">
                            <img alt="" src={Yellow} className={style.live_background_img} />
                            <img alt="" src={LiveImg} className={style.live_foreground_img} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Schedule(){
    return(
        <div className={style.schedule}>
            <div className="container">
                <header className={style.schedule_header} >
                    <h2>Programs tailored to fit your hectic schedule</h2>
                    <p>Take advantage of different programs on Gotocourse, morning, evening &amp; weekend sessions; online and In-person training tailored to fit your learning preference</p>
                </header>
                <div className={style.schedule_content}>
                    {
                        schedule.map(item=>(
                            <ScheduleComp  {...item}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function ScheduleComp({flip, subtext, title, img}){
    return(
        <div className={`${style.schedule_comp_wrapper}`}>
            <div className={style.schedule_left }>
                <h2>{title}</h2>   
                <p>{subtext}</p> 
            </div>
            <div className={style.schedule_right}>
                <img src={img} alt="" />
            </div>
        </div>
    )
}

function Graduate(){
    const list = [
        "Connect with our exclusive top rated mentors and coaches", 
        "Develop job skills, interview confidence and network",
        "Experience great support as part of Gotocourse family"
    ]
    return(
        <div className={style.graduate}>
            <div className="container">
                <div className={style.graduate_content}>
                    <div className={style.graduate_left}>
                        <h3>Graduate job-ready with the confidence to get hired.</h3>
                        <p>Our mentors will work with you throughout your programme and after graduation will help you publish your portfolio, practice interview and land a job that fit your goa</p>
                        <div>
                            {list.map(item=>(
                                <p className={style.graduate_list}>{item}</p>
                            ))}
                        </div>
                        <div>
                            <Button variant="contained">Get trained, get mentored today</Button>
                        </div>
                    </div>
                    <div className={style.graduate_right}>
                        <img src={graduate} alt="man on a video call with a woman" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Payment(){
    return (
        <div className={style.payment}>
            <div className="container">
                <header className={style.payment_header}>
                    <h2>Choose your preferred payment plan</h2>
                    <p className="text-muted">Gotocourse makes it flexible for you to choose a payment plan structure of your choice</p>
                </header>
                <div className={style.payment_content}>
                    <div className={style.payment_left}>
                        <img src={Upfront} alt="" />
                        <p>Upfront payment</p>
                    </div>
                    <div className={style.payment_right}>
                        <img src={Initial} alt="" />
                        <p>Installmental payment</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Best(){
    return (
        <div className={style.best}>
            <div className="container h-100">
                <div className={style.best_container}>
                    <div className={style.best_text_container}>
                        <h3>Learn from the best</h3>
                        <p>Learn high demand skills from industry experts through live classes, pre recorded videos and mentorship</p>
                        <div>
                            <Button variant="contained">Start Now</Button>
                        </div>
                    </div>
                    <div className={style.best_img_container}>
                        <img src={best} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

function IsRight(){
    return(
        <div className={style.isRight}>
            <div className="container h-100">
                    <header className={style.isRight_header}>
                        <h2>Still not sure if Gotocourse is right for your career?</h2>
                    </header>
                <div className={style.isRight_content}>
                    <div className={style.isRight_left}>
                        <p> You are working hard to make that career transition or career advancement; you have made it far! Join our free webinar to get Gotocourse firsthand learning experience. </p>
                        <div>
                            <Button variant="contained">Attend Free Webinar</Button>
                        </div>
                    </div>
                    <div className={style.isRight_right}>
                        <img src={career} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

function Journey() {
    return (
        <div className={style.journey}>
            <div className="container h-100">
                <header className={style.journey_header}>
                    <h2>How do I get started with my <span>Upskilling</span> Journey on Gotocourse</h2>
                </header>
                <div className={style.journey_content}>
                    <img src={upskill} alt="" />     
                    {/* <div className={style.journey_register}>
                        <i><AiFillPlayCircle  size="1.5rem" color="#FFC700"/></i>
                        <p>Register for free</p>
                    </div>
                    <div className={style.journey_choose}>
                        <i><AiOutlineSelect size="1.5rem" color="#FFC700" /></i>
                        <p>Choose a niche</p>
                    </div>
                    <div className={style.journey_payment}>
                        <i><BsFillCreditCardFill size="1.5rem" color="#FFC700" /></i>
                        <p>Make payment</p>
                    </div>
                    <div className={style.journey_apply}>
                        <i><FaRegEdit size="1.5rem" color="#FFC700" /></i>
                        <p>Apply to a course of choice</p>
                    </div>
                    <div className={style.journey_attend}>
                        <i><BsCollectionPlayFill size="1.5rem" color="#FFC700" /></i>
                        <p>Attend Go-to-class webinar</p>
                    </div>
                    <div className={style.journey_start}>
                        <i><FaRobot size="1.5rem" color="#FFC700" /></i>
                        <p>Start Upskiling</p>
                    </div> */}
                </div>
            </div>
        </div>
    )
}


const schedule = [
    {
        id:1,
        title:"Join Gotocourse Live-changing Webinar",
        subtext:"Pause your course and resume any time where you left of",
        img:SchWebinar,
        flip:"non"
    },
    {
        id:2,
        title:"Join a Cohort",
        subtext:"Pause your course and resume any time where you left off",
        img:SchCohort,
        flip:"flip"
    },
    {
        id:3,
        title:"Get access to Recorded Lectures",
        subtext:"Every class section is recorded and uploaded on the class console to help you revise at your convenience",
        img:SchRecorded,
        flip:"non"
    },
]
const learnInfo = [

    {
        id:1,
        header:"Self paced",
        text:"Self-paced courses that allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional responsibilities.",
        img:Tech,
        imgAlt:"smiling student with headphones on, sitted at a desk looking at her laptop"
    },
    {
        id:2,
        header:"Learn with a cohort",
        text:"Join a classroom to take instructor led training, do projects with learning partners, take quizzes, and build work related portfolio",
        img:Learning,
        imgAlt:"A video group chat"
    },
    {
        id:3,
        header:"One-on-one mentorship",
        text:"Challenge yourself with a one-on-one mentorship session with industry experts and professionals and grow your career.",
        img:Mento,
        imgAlt:"Male student showing a woman something on his desktop screen"
    },
    {
        id:4,
        header:"In person training",
        text:"Learn from experts by joining us in any of our physical locations.",
        img:Inperson,
        imgAlt:"Two people looking at a woman who is presenting"
    },
]
const studentTestimonials = [
    {
        id: 1,
        content:
          "The Gotocourse platform has really contributed to a bulk of what I would now call my professional portfolio. Now a certified data scientist who has worked with a number of reputable companies, I am happy that I made the right decision by choosing gotocourse, you should choose them too.",
        profile: Dubai,
        name:"Mercy",
        location:"Dubai"
      },
    {
        id: 2,
        content:
          "When I wanted to start my journey as a techie, I had several doubts but with time and gotocourse, all my questions were answered. I must really commend the effort of the team for creating such a conducive ambience for learning. it was truly the best experience and I am glad not only because I got the best from the best but they also got me jobs too",
        profile: Mumbai,
        name:"James",
        location:"Mumbai, India"
      },
    {
        id: 3,
        content:
          "If I was asked to use a word for my experience at gotocourse so far, I am definitely going for ’impressed’. Not only because it was a project I could  afford because it was budget friendly but I felt I was getting more than what I paid for at a point. The most interesting part is I could learn at my own pace and if I did not experience this, I’d say it’s too good to be true. Gotocourse helped shape my career as a project manager, I am really grateful.",
        profile: Abuja,
        name:"James",
        location:"Abuja, Nigeria"
      },
]
const FaqItems = [
    {
      id:1,
      title:"Do I get access to the course materials after class?",
      answer:"Yes, all course materials are uploaded on the class console and available for you to revise at your convenience.",
      show: ""
    },
    {
      id:2,
      title:"What kind of device do I need to join a class?",
      answer:"You need a working laptop and a steady internet connection for a wholesome learning experience.",
      show: ""
    },
    {
      id:3,
      title:"Do I get a certificate after training?",
      answer:"Gotocourse issues certificates and badges upon the completion of capstone project." ,
      show: "skip"
    },
    {
      id:4,
      title:"What is Gotocourse Admission process like?",
      answer:"All students have to sign-up to create an account on Gotocourse, before proceeding to enroll in any of the programmes" ,
      show: ""
    },
    {
      id:5,
      title:"How can I combine learning on Gotocourse with work and other engagements?",
      answer:"With your learning needs in mind, we have curated different learning models for flexibility." ,
      show: ""
    },
    {
      id:6,
      title:"What are the payment structures for programmes on Gotocourse?",
      answer:"Payment can be made Upfront, or in two or four installments." ,
      show: "skip"
    },
]
import { useNavigate } from "react-router-dom"
import Layout from "../Layout"
import BootImg from "../../images/newbootcamp.png"
import HeroImg from "../../images/newHeroLatest.png"
import { useAuth } from "../../contexts/Auth"
import "./landing.css"
import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "../../hooks";

import Experienced from '../Experienced'
import { Category } from "./Tabs"
import { serviceList } from "../Services"
// import Learn from "../Learn"
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

import {getDate,KEY} from "../../constants"
import Learning from "../../images/cohort.webp";
import Inperson from "../../images/newCareer.png"
import Mento from "../../images/inPerson.png";
import Image from "../Image";
import Tech from "../../images/fast.webp";
import Testimonials from "../Testimonials"
import Becoming  from "../Becoming"
import Companies  from "../Companies"
import Faq  from "../Faq"
import Mentors  from "./Mentors/Mentors"
import goo from "../../images/goo.png"
import face from "../../images/face.png"
import apple from "../../images/apple.png"

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
const NewLanding = ()=>{
    return (
    <Layout background="blue">
        <Hero />
        <Experienced />
        <Category />
        <Benefits />
        <Bootcamp/>
        <Learn type={"newLanding"} />
        <Self />
        <Mentorship />
        <Mentors />
        <InPerson />
        <Testimonials type="newLanding" />
        <Becoming />
        <Companies />
        <Faq />
    </Layout> 
   )
}
export default NewLanding


function Hero(){
    const {  generalState: { navHeight }, } = useAuth();

    return(
        <section className="newHero d-flex position-relative">
            <div className="d-flex container">
            <div className="newHero_left w-50">
                <header className="">
                    <h1 className="newHero_left-header text-center">Upskill and Reskill</h1>
                    <h6 className="newHero_left-title text-center">Connect with industry experts from anywhere and for less cost</h6>
                </header>
                <div className="newHero_left-userSignin">
                    <button className="facebook d-block mb-3">
                        <i className="me-4">
                            <img src={goo} alt="" width={25} height={25} />
                        </i>
                        Continue with Facebook</button>
                    <button className="google d-block mb-3">
                    <i className="me-4">
                            <img src={face} alt="" width={25} height={25} />
                        </i>
                        Continue with Google</button>
                    <button className="apple d-block mb-3">
                    <i className="me-4">
                            <img src={apple} alt="" width={25} height={25} />
                        </i>
                        Continue with Apple</button>
                    <small className="or d-block"><span>or</span></small>
                    <Link to="/signup">
                        <p>Sign Up With Email</p>
                    </Link>
                </div>
            </div>
            <div className="newHero_right w-50 position-absolute ">
                <img className="newHero_right-image" src={HeroImg} alt="collage of laptops" />
            </div>
            </div>
        </section>
    )
}       

function Benefits(){
    return (
        <section className="wrapper services">
        <div className="container">
              <header >
                <h2 className="title text-center">Benefits Of Learning At GotoCourse</h2>
                {/* <p className="sub_title text-center mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p> */}
              </header>
          <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5">
              {serviceList.map(service =>(
                <BenefitBox {...service} />
              ))}
          </div>
          <div className="text-center mt-4">
          <Link to="/signup">
            <button className="btn-plain benefits_button mx-auto">Get Started</button>
            </Link>
          </div>
        </div>
      </section>
    )
}

function BenefitBox({title, text, color}){
    return (
        <div className="benefit_box services_box ">
            <div className="benefit_box-top ps-4 my-0" style={{borderColor: color === "orange" ? "var(--theme-orange)": "var(--theme-blue)"}}>
                <h6>{title}</h6>
            </div>
            <div className="benefit_box-bottom ps-4 my-0 text-start">
                <p>{text}</p>
            </div>
        </div>
    )
}

function Bootcamp(){
    const {otherFunctions: { fetchBootcamps } } = useAuth();

    const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps());
console.log({bootcamps})
    return (


        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          loop={true}
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
              slidesPerView: 1,
              spaceBetween: 0,
            },
            700: {
              slidesPerView: 1,
              spaceBetween: 0
            },
            1024: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
          }}
        >
          {bootcamps.data?.data.map((item) => (
            <SwiperSlide key={item.courseId}>
              <BootcampCard {...item} all={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        // {bootcamps.data?.data.map(bootcamp=>())}
        )
}

function BootcampCard({_id, title, duration, startTime, endTime, startDate,endDate, description, type, isActive, instructorId, bootcampImg, all}){
    const navigate = useNavigate()
    const {getItem}= useLocalStorage()
    const userdata = getItem(KEY)

    function handleNavigate(e){
        e.preventDefault();

        if(!userdata.token){
            navigate("/login")
        }
        localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
        navigate("/bootcamp")

     }
    return (
    <div className="newBootcamp" style={{
        background:"linear-gradient(0deg, rgba(0, 23, 81, 0.7), rgba(0, 23, 81, 0.9)), url(" + BootImg+ ")",
        backgroundPosition:"center", backgroundSize:"cover", backgroundRepeat:"no-repeat", 
    
    }}>
        <div className="container d-flex flex-column justify-content-between">

        <header className="mb-5">
            <h6>Upcoming Bootcamp</h6>
        </header>
        <div className="newBootcamp_title mb-4">
            <p className="mb-5">{title}</p>
            <p>{description}</p>
        </div>
        <div className="newBootcamp_timing d-flex flex-column flex-md-row flex-wrap flex justify-content-between text-center">
            <div className="newBootcamp_duration d-flex">
                <p className="fw-bold">Duration:</p>
                <p>{duration}</p>
            </div>
            <div className="newBootcamp_start d-flex">
                <p className="fw-bold">Start Date:</p>
                <p >{startDate && getDate(startDate)}</p>
            </div>
            <div className="newBootcamp_action">
            <div onClick={handleNavigate}>
                <button className=" newBootcamp_button">Register Today</button>
            </div>
            </div>
        </div>
        </div>
    </div>
    )
}

function Learn (){
   return (
    <section className="wrapper learning newLearning">
      <div className="container">
        <div className="d-flex content justify-content-between">
            <div className=" border-none newLearning_left">
              <div className="d-flex flex-column justify-content-center h-100">
                <header className="mb-5">
                  <h2 className="title">Learn with a cohort</h2>
                </header>
                <p className="card-text newLearning-text mb-4">
                    Join a classroom to take instructor led training, do projects with learning partners, take quizzes, and build work related portfolio
                </p>
                
                  <Link to="/signup">
                  <motion.button 
                  className="btn-plain button-lg newLearning_button" type="button"
                  whileHover={{ 
                    boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                    textShadow:"0px 0px 8px rgb(255, 255, 255)"
                  }}
                  >
                    Get Started Today
                  </motion.button>
                    </Link>
                  
              </div>
            </div>
            <div className="newLearning_right d-flex justify-content-end">
                <Image width="720px" height="452px"  image={Learning} alt="Group of people in an online meeting room" className="background" effect="blur" />
            </div>
         
        </div>
      </div>
    </section>
   ) 
}

function Self(){
    return(
        <section className="wrapper transition newLearning">
      <div className="container">
        <div className="d-flex content justify-content-between flex-column column-reverse flex-md-row">
        <div className="newSelf_right">
          <Image
            width="720px"
            height="452"
            image={Tech}
            alt="Young woman smiling while working on laptop"
            className="background"
            effect="blur"
          />
            </div>
          <motion.div className="newSelf_left">
            <div className="newSelf_left-wrapper">
              <header className="mb-5">
                <h2 className="title">Self paced Learning</h2>
              </header>
              <p className="card-text newLearning-text mb-4">
                Self-paced courses that allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional responsibilities.
              </p>
              <Link to="/signup">
                <motion.button
                  className="btn-plain newLearning_button button-lg"
                  type="button"
                  whileHover={{
                    boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                    textShadow: "0px 0px 8px rgb(255,255,255)",
                  }}
                >
                 Try Gotocourse
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    )
}

function Mentorship (){
    
   return (
    <section className="wrapper learning newLearning">
      <div className="container">
        <div className="d-flex content justify-content-between">
            <div className=" border-none newLearning_left">
              <div className="d-flex flex-column justify-content-center h-100">
                <header className="mb-5">
                  <h2 className="title">One-on-one mentorship</h2>
                </header>
                <p className="card-text newLearning-text mb-4">
                    Challenge yourself with a one-on-one mentorship session with industry experts and professionals and grow your career.
                </p>
                
                  <Link to="/signup" >
                  <motion.button 
                  className="btn-plain button-lg newLearning_button" type="button"
                  whileHover={{ 
                    boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                    textShadow:"0px 0px 8px rgb(255, 255, 255)"
                  }}
                  >
                    Get Started Today
                  </motion.button>
                    </Link>
                  
              </div>
            </div>
            <div className="newLearning_right d-flex justify-content-end">
                <Image width="720px" height="452px"  image={Mento} alt="Group of people in an online meeting room" className="background" effect="blur" />
            </div>
         
        </div>
      </div>
    </section>
   ) 
}
function InPerson (){
   return (
    <section className="wrapper learning newLearning">
      <div className="container">
        <div className="d-flex content justify-content-between">
            <div className=" border-none newLearning_left">
              <div className="d-flex flex-column justify-content-center h-100">
                <header className="mb-5">
                  <h2 className="title">In person Training </h2>
                </header>
                <p className="card-text newLearning-text mb-4">
                    Learn from experts by joining us in any of our physical locations.
                </p>
                  <Link to="/signup">
                  <motion.button 
                  className="btn-plain button-lg newLearning_button" type="button"
                  whileHover={{ 
                    boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                    textShadow:"0px 0px 8px rgb(255, 255, 255)"
                  }}
                  >
                    Get Started Today
                  </motion.button>
                    </Link>
                  
              </div>
            </div>
            <div className="newLearning_right d-flex justify-content-end">
                <Image width="720px" height="452px"  image={Inperson} alt="Group of people in an online meeting room" className="background" effect="blur" />
            </div>
         
        </div>
      </div>
    </section>
   ) 
}
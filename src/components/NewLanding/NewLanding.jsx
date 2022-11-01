import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Layout from "../Layout";
import BootImg from "../../images/bootcamps/allClasses2.webp";
import HeroImg from "../../images/newlanding.webp";
import getStarted from "../../images/easysteps.png"
import { useAuth } from "../../contexts/Auth";
import "./landing.css";
import { useLocalStorage } from "../../hooks";
import { Category } from "./Tabs";
// import Learn from "../Learn"
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import { getDate, KEY } from "../../constants";
import Learning from "../../images/cohort.webp";
import Inperson from "../../images/in-Person.webp";
import Mento from "../../images/inPerson.webp";
import Tech from "../../images/fast.webp";
import Image from "../Image";
import Companies from "../Companies";
import Faq from "../Faq";
import Mentors from "./Mentors/Mentors";
import LoginOptions from "./LoginOptions";
import betterway from "../../images/betterway.png";
import BetterWay from "./BetterWay";

import vidPreview from "../../images/video_preview.png";
import {TechPro, TrackPro } from "./TechPro";
import { FiPlayCircle } from "react-icons/fi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { serviceList } from "../Services";

import teachingBenefits from "../../images/teaching_benefits.png";

import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


import critical_skills from "../../images/landing/critical_skills.webp";
import life_change from "../../images/landing/life_change.webp";
import tell from "../../images/landing/mentor_landing.webp";
import newMen from "../../images/landing/newMen.png";


const NewLanding = () => {
  return (
    <Layout background="blue">
      <Hero />
      <WhatweDo />
      <Stats />
      <Companies />
      <Mission />
      <Category />
      <TechPro />
      <VideoSection />
      <Benefits />
      <Mentors />
      {/* <TeachingBenefits /> */}
      <TrackPro />
      <BetterWay />
      <Faq />
      {/* <AffiliatePro /> */}
      {/* <Gif /> */}
      {/* <Experienced /> */}
      {/* <Benefits /> */}
      {/* <Seamless /> */}
      {/* <Bootcamp/> */}
      {/* <Becoming /> */}
      {/* <Learn type={"newLanding"} />
        <Self />
      <Mentorship /> */}
      {/* <InPerson /> */}
      {/* <Testimonials type="newLanding" /> */}
      {/* <Overview /> */}
    </Layout>
  );
};
export default NewLanding;

function VideoSection() {
  const [open, setOpen] = useState(false);
  return (
    <section className="video_section">
      <img src={vidPreview} alt="" />
      <div className="video_content">
        <h4 className="text-center fw-bold">
          What is Gotocourse? See how it works
        </h4>
        <i>
          <FiPlayCircle size="6rem" onClick={() => setOpen(true)} />
        </i>
      </div>
      <PopupVideo open={open} setOpen={setOpen} />
    </section>
  );
}

function PopupVideo({ open, setOpen }) {
  const modalStyle = {
    position: "absolute",
    bottom: "20%",
    left: "50%",
    transform: "translate(-50%)",
    width: "auto",
    bgcolor: "rgba(0, 0, 0, 0.3)",
    boxShadow: 24,
    p: 0,
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} className="popupmodal">
        <iframe
          width="560"
          height="315"
          className="mx-auto"
          src="https://www.youtube.com/embed/P3bNfb9Cri8?playlist=pEDrOcroWLk&autoplay=1&rel=0&controls=1&showinfo=1"
          title="Benefits of using gotocourse"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </Box>
    </Modal>
  );
}
function WhatweDo() {
  return (
    <section className="what_we_do">
      <div className="container">
        <header>
          <h4 className="text-center">Our Goal</h4>
        </header>
        <p className="text-center">
          To be the No1 global platform where millions of learners connect with top tech educators and bootcamps in order to help upskill, boost productivity and reduce the cost of learning.
        </p> 
      </div>
    </section>
    
  );
}
function Gif() {
  return (
    <div className="container my-4">
      <div className="gif_wrapper w-100 h-100 d-flex justify-content-center">
        {/* <img src={mygif} alt="" /> */}
        <iframe
          width="560"
          height="315"
          className="mx-auto"
          src="https://www.youtube.com/embed/P3bNfb9Cri8?playlist=pEDrOcroWLk&rel=0&controls=1&showinfo=1"
          title="Benefits of using gotocourse"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  );
}

function Hero() {
  const {
    generalState: { navHeight },
    studentFunctions: { googleSignup },
  } = useAuth();
  const [overlay, setOverlay] = useState(false);
  const [logtype, setLogType] = useState(null);

  function signInWithGoogle(e) {
    e.preventDefault();
    setLogType("google");
    setOverlay(true);

    // signInWithPopup(authentication, provider).then(res=>

    //     console.log(res)

    //   ).catch(err=>
    //     console.error(err)
    //     )
  }
  function signInWithFacebook() {
    setLogType("facebook");
    setOverlay(true);

    // signInWithPopup(authentication, facebookProvider).then(res=>console.log(res)).catch(err=>console.error(err))
  }

  const heroData = [
    {
      id: 1,
      title: "Upskill & Reskill",
      subtitle: "All-in-one platform for learning tech skills",
      social: false,
      acctype: "student",
      list: [
        "Learn from Industry Experts",
        "Access tools for teaching",
        "Connect from anywhere",
      ],
      img:tell,
      // img:HeroImg
    },
    {
      id: 2,
      title: "Get critical",
      title2: "career skills",
      subtitle: "Start, switch, or advance your career with 50+ courses, Professional Certificates from top industry experts and leading bootcamps",
      social: true,
      acctype: "student",
      img:critical_skills,
      color:"#F75C4E",
      link:"/signup",
      link_btn:"Register for free"
    },
    {
      id: 3,
      title: "Deliver life-changing",
      title2: "teaching experiences",
      subtitle: "We’ve got the solution: Incredible tools for managing and organizing  world-class training and development programs all on Gotocourse.",
      social: true,
      acctype: "teacher",
      img:life_change,
      color:"#66BFE6",
      link:"/become-a-teacher",
      link_btn:"Become a teacher"
    },
    {
      id: 4,
      title: "Change lives while you",
      title2: "mentor on Gotocourse",
      subtitle: "Streamline mentoring experience for you and your mentees, because everything’s in one place and accessible through a single link",
      social: true,
      acctype: "affiliate",
      img:newMen,
      color:"#A1B0FF",
      link:"/lounge",
      link_btn:"Get started now"
    },
  ];
  return (
    <section
      className="newHero d-flex position-relative"
      style={{ marginTop: navHeight }}
    >
      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        loop={true}
        speed={1500}
        autoplay={{ delay: 5000 }}
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
          },
          700: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {
          heroData.map(item=>(
            <SwiperSlide key={item.id}>
              <HeroContent
                overlay={overlay}
                setOverlay={setOverlay}
                logtype={logtype}
                {...item}
              />
            </SwiperSlide>
          ))

        }
          
      </Swiper>
    </section>
  );
}

  function HeroContent({ overlay, setOverlay, logtype, title, title2, signInWithFacebook, subtitle, img, list, acctype, social, color, link, link_btn }) {
  return (
    <div className="container">
      {overlay && <LoginOptions closeOverlay={setOverlay} type={logtype} />}
      <div className={`newHero_right ${social && "newHero_right_single"}`}>
        <img
          className="newHero_right-image"
          src={img}
          alt={title}
        />
      </div>
      <div className="newHero_left">
        <header className="">
          <h1 className="newHero_left-header mb-1">
            <span>{title}</span>
            {
              title2 &&
              <span className="d-block">{title2}</span>
            }
          </h1>
          <h6 className="newHero_left-title mb-4 mb-lg-5">
            {list && subtitle}
          </h6>
            {
              list ? 
            <div className=" new_hero_list d-flex justify-content-start">
              <ul>
                {
                  list && list.map((item, i)=>(
                    <li
                    key={i}
                      className="newHero_left-title text-start mb-0 "
                      style={{ fontWeight: "500", fontSize: "15px" }}
                    >
                       {item}
                    </li>
                  ))
                }
              </ul>
            </div>
            :<h6 className="newHero_left-title mb-4 mb-lg-3 ms-0" style={{width: "min(100%, 700px)"}}>{subtitle}</h6>
            } 
        </header>
        {
          social ? 

            <div className="newHero_left__button w-100 d-flex">
              <Link className="d-inline-flex mx-auto ms-sm-0 d-flex justify-content-center w-100 justify-content-md-start" to={link}>
                <button style={{background: color}}>{link_btn}</button>
              </Link>
            </div>

              :
            <div className="sign_up_cards d-flex w-100">
              <SignupCards
                title="STUDENTS"
                btn="Register for free"
                link="/signup"
              />
              <SignupCards
                title="TEACHERS"
                btn="Sign up for free"
                link="/become-a-teacher"
              />
            </div>
        }
      </div>
    </div>
  );
}

function SignupCards({ title, btn, link }) {
  return (
    <section className="sign_up_card">
      <Link to={link}>
        <h5>{title}</h5>
        <button>{btn}</button>
      </Link>
    </section>
  );
}

export function Stats() {
  const statData = [
    {
      title: "20k+",
      content: "students registered",
    },
    {
      title: "98%",
      content: "Completion & Retention rate",
    },
    {
      title: "150+",
      content: "Teachers & Mentors",
    },
    {
      sup: "More than",
      title: "89%",
      content: "Tranined students already have jobs",
    },
    {
      title: "50+",
      content: "In-demand Courses",
    },
  ];
  return (
    <section className="stats_main">
      <section className="stats">
        <div className="stats_wrapper h-100">
          {statData.map((item, index) => (
            <div className="stat" key={index + item.title}>
              {item.sup && <small>{item.sup}</small>}
              <h5>{item.title}</h5>
              <small>{item.content}</small>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
{
  /* <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5">
   {serviceList.map(service =>(
     <BenefitBox {...service} />
   ))}
</div> */
}
{
  /* <p className="sub_title text-center mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p> */
}

function Benefits() {
  return (
    <section className="wrapper services">
      <div className="container">
        <header className="mb-4">
          <h2 className="title text-center">
            Benefits Of Learning At GotoCourse
          </h2>
        </header>
        <div className="stay">
          <div className="stay_left">
            <img src={betterway} alt="" />
          </div>
          <div className="stay_right">
            <div className="services_list">
              {serviceList.map((service) => (
                <BenefitBox {...service} />
              ))}
            </div>
            <div className=" mt-4">
              <Link to="/students">
                <button className=" benefits_button">Become a student</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function TeachingBenefits() {
  const teachList = [
    {
      id: 1,
      title: "Manager classrom seamlessly",
      text: "Learn tech skills from practising professionals who understand how things really work",
      color: "orange",
    },
    {
      id: 2,
      title: "Teach, create quiz a cohort",
      text: "Learn with a group of people with similar interest and experience.",
      color: "blue",
    },
    {
      id: 3,
      title: "Track your earnings",
      text: "Do you enjoy hand holding in person training ? Some of our trainings are available at our physical locations.",
      color: "blue",
    },
    {
      id: 4,
      title: "Easy to use interface",
      text: "Experience enhanced collaboration. Join conference calls with teacher and other students",
      color: "orange",
    },

    {
      id: 7,
      title: "Earn as you teach.",
      text: "Earn badges and completion certificates on every course completion.",
      color: "orange",
    },
  ];
  return (
    <section className="wrapper services teach_benefit">
      <div className="container">
        <header className="mb-4">
          <h2 className="title text-center">
            Benefits Of Teaching At GotoCourse
          </h2>
        </header>
        <div className="stay">
          <div className="stay_left">
            <img src={teachingBenefits} alt="" />
          </div>
          <div className="stay_right">
            <div className="services_list">
              {teachList.map((service) => (
                <BenefitBox {...service} />
              ))}
            </div>
            <div className="text-end mt-4">
              <Link to="/become-a-teacher">
                <button className=" benefits_button">Learn more</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitBox({ title, text, color }) {
  return (
    <div className="benefit_box services_box ">
      <div
        className="benefit_box-top ps-4 my-0"
        style={{
          borderColor:
            color === "orange" ? "var(--theme-orange)" : "var(--theme-blue)",
        }}
      >
        <h6>{title}</h6>
      </div>
      <div className="benefit_box-bottom ps-4 my-0 text-start">
        <p>{text}</p>
      </div>
    </div>
  );
}

function Bootcamp() {
  const {
    otherFunctions: { fetchBootcamps },
  } = useAuth();

  const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps());
  return (
    <>
      <BootcampCard data={bootcamps.data?.data} />
    </>
  );
}

function BootcampCard({ data }) {
  return (
    <div
      className="newBootcamp"
      style={{
        background: "url(" + BootImg + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right",
        backgroundSize: "cover",
      }}
    >
      <div className="container newBootcamp_wrapper">
        <div className="newBootcamp_content">
          <div className="classes">
            <p className="bg-white p-1 classes_title fw-bolder px-3 mb-0">
              AVAILABLE CLASSES
            </p>
            <p
              className="bg-white p-1 classes_title fw-bolder px-3 mb-0"
              style={{ fontSize: "0.8rem" }}
            >
              Classes we are presently enrolling for
            </p>
            <div className="classes_container">
              {data?.slice(0, 4).map((data, i) => (
                <NewBootCampCard {...data} key={i} all={data} />
              ))}
            </div>
          </div>
          <div className="others"></div>
        </div>
        <div className="d-flex justify-content-center">
          <Link className="d-inline-flex" to="classes">
            <button className="button newBootcamp_classes_button">
              Browse all classes
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// {/* <div className="container d-flex flex-column justify-content-between">

// <header className="mb-5">
//     <h6>Upcoming Classes</h6>
// </header>
// <div className="newBootcamp_title mb-4">
//     <p className="mb-5">{title}</p>
//     <p>{description}</p>
// </div>
// <div className="newBootcamp_timing text-center">
//     <div className="newBootcamp_duration d-flex justify-content-center">
//         <p className="fw-bold">Duration:</p>
//         <p>{duration}</p>
//     </div>
//     <div className="newBootcamp_start d-flex justify-content-center">
//         <p className="fw-bold">Start Date:</p>
//         <p >{startDate && getDate(startDate)}</p>
//     </div>
//     <div className="newBootcamp_action">
//     <div onClick={handleNavigate}>
//         <button className=" newBootcamp_button">Register Today</button>
//     </div>
//     </div>
// </div>
// </div> */}

function NewBootCampCard({
  _id,
  title,
  duration,
  startTime,
  endTime,
  startDate,
  endDate,
  description,
  type,
  isActive,
  instructorId,
  bootcampImg,
  all,
}) {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const userdata = getItem(KEY);

  function handleNavigate(e) {
    e.preventDefault();

    if (!userdata.token) {
      navigate("/login");
    }
    localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all));
    navigate("/classes/class");
  }

  return (
    <div className="new_bootcamp_card my-3">
      <div className="newBootcamp_img">
        <img src={bootcampImg} alt="" />
      </div>
      <div className="newBootcampClasses_content">
        <h6>{title}</h6>
        <div className="time mb-4">
          <div className="newBootcamp_duration">
            <p>Duration</p>
            <small>{duration}</small>
          </div>
          <div className="newBootcamp_StartDate">
            <p>Start Date</p>
            <small>{startDate && getDate(startDate)}</small>
          </div>
        </div>
        <motion.button
          whileHover={{
            boxShadow: "0px 0px 8px rgb(0, 0, 0)",
          }}
          transition={{ duration: 0.1 }}
          className="btn-plain new_bootcamp_card_button"
          onClick={handleNavigate}
        >
          Learn more
        </motion.button>
      </div>
    </div>
  );
}

export function Learn({ better, content }) {
  return (
    <section className="wrapper newLearning">
      <div className="container">
        <div className="content">
          <div className=" border-none newLearning_left">
            <div className="d-flex flex-column justify-content-center h-100">
              <header className="mb-5">
                <h2 className="title">Learn with a cohort</h2>
              </header>
              <p className="card-text newLearning-text mb-4">
                {better
                  ? content
                  : "Join a classroom to take instructor-led training, do projects with learning partners, take quizzes, network, and build a work-related portfolio. Take an opportunity to learn with likeminds across the world and build a great career you will be proud of."}
              </p>
              {!better && (
                <div>
                  <Link to="/signup" style={{ display: "inline-block" }}>
                    <motion.button
                      className="btn-plain button-lg newLearning_button"
                      type="button"
                      whileHover={{
                        boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                        textShadow: "0px 0px 8px rgb(255, 255, 255)",
                      }}
                    >
                      Get Started Today
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="newLearning_right d-flex justify-content-end">
            <Image
              width="552px"
              height="452px"
              image={Learning}
              alt="Group of people in an online meeting room"
              className="background"
              effect="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Self({ better, content }) {
  return (
    <section className="wrapper transition newLearning newSelf">
      <div className="container">
        <div className="d-flex content justify-content-between">
          <div className="newSelf_right">
            <Image
              width="552"
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
              <p className="newLearning-text mb-4">
                {better
                  ? content
                  : "Learn on a flexible schedule at your own pace. Self-paced courses allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional commitments and responsibilities. You don’t have to worry about rigid learning schedules, learn at your pace and on your terms."}
              </p>
              {!better && (
                <div>
                  <Link to="/signup" style={{ display: "inline-block" }}>
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
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function Mentorship({ better, content }) {
  return (
    <section className="wrapper learning newMentor">
      <div className="container">
        <div className="content">
          <div className=" border-none newMentor_left">
            <div className="d-flex flex-column justify-content-center h-100">
              <header className="mb-5">
                <h2 className="title">One-on-one mentorship</h2>
              </header>
              <p className=" newLearning-text mb-4">
                {better
                  ? content
                  : "Get an exclusive and fully immersive learning experience with our Celebrity, A-list, and Technical Experts Mentors. Challenge yourself with a one-on-one mentoring session with industry experts and professionals and grow your career."}
              </p>
              {!better && (
                <div>
                  <Link to="/signup" style={{ display: "inline-block" }}>
                    <motion.button
                      className="btn-plain button-lg newMentor_button"
                      type="button"
                      whileHover={{
                        boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                        textShadow: "0px 0px 8px rgb(255, 255, 255)",
                      }}
                    >
                      Get Started Today
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="newMentor_right d-flex justify-content-end">
            <Image
              width="552px"
              height="452px"
              image={Mento}
              alt="Group of people in an online meeting room"
              className="background"
              effect="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
export function InPerson({ better, content }) {
  return (
    <section className="wrapper learning newLearning inPerson">
      <div className="container">
        <div className="d-flex content justify-content-between">
          <div className=" border-none newLearning_left">
            <div className="d-flex flex-column justify-content-center h-100">
              <header className="mb-5">
                <h2 className="title">In-person Training </h2>
              </header>
              <p className="newLearning-text mb-4">
                {better
                  ? content
                  : "Take physical lectures on any of our campuses close to you. Enjoy hands-on and interactive expert lead training by joining us in any of our physical learning hubs, practicing new skills through case studies and role-plays, and getting real-time feedback from facilitators. You can’t go wrong joining our small group training on-site to learn and advance your career."}
              </p>
              {!better && (
                <div>
                  <Link to="/signup" style={{ display: "inline-block" }}>
                    <motion.button
                      className="btn-plain button-lg newLearning_button"
                      type="button"
                      whileHover={{
                        boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                        textShadow: "0px 0px 8px rgb(255, 255, 255)",
                      }}
                    >
                      Get Started Today
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
          </div>
          <div className="newLearning_right d-flex justify-content-end">
            <Image
              width="552px"
              height="452px"
              image={Inperson}
              alt="Group of people in an online meeting room"
              className="background"
              effect="blur"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Mission(){
  return (
    <section className="our_mission">
      <div className="container">
        <header className="text-center">
          {/* <h6 className="fw-bold">Three easy steps to get started on Gotocourse</h6> */}
          {/* <h6>Here’s how Gotocourse works</h6> */}
        </header>
        <div className="our_mission_content">
          <div className="our_mission_left">
            <img src={getStarted} alt="" />
          </div>
          <div className="our_mission_right">
            <h6 className="fw-bold our_mission_header mb-3" >Three easy steps to get started on Gotocourse</h6>
              <ol>
                {
                  ourmission.map(item=>(
                      <li key={item.id}>
                        <h6>{item.title}</h6>
                        <p>{item.content}</p>
                      </li>
                  ))
                }
              </ol>
              <div>
                <Link className="d-block" to="/signup">
                  <button className="our_mission_button">Register now</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const ourmission = [
  {
    id: 1,
    title:"Register for free to get started",
    content:"Register to access the interactive student’s dashboard"
  },
  {
    id: 2,
    title:"Select classes of your choice from available classes",
    content:"Access your interactive student’s dashboard to select class of your choice from the listed classes starting"
  },
  {
    id: 3,
    title:"Enroll to class to get your training started",
    content:"Start class immediately after completion of your enrolment to class"
  },
]
import {useState} from "react"
import { useNavigate } from "react-router-dom"
import { useQuery } from "@tanstack/react-query";

import Layout from "../Layout"
import BootImg from "../../images/bootcamps/allClasses2.webp"
import HeroImg from "../../images/newlanding.webp"
import { useAuth } from "../../contexts/Auth"
import "./landing.css"
import { useLocalStorage } from "../../hooks";
import { Category } from "./Tabs"
// import Learn from "../Learn"
import { Link } from "react-router-dom";
import {motion} from 'framer-motion'

import {getDate,KEY} from "../../constants"
import Learning from "../../images/cohort.webp";
import Inperson from "../../images/in-Person.webp"
import Mento from "../../images/inPerson.webp";
import Tech from "../../images/fast.webp";
import Image from "../Image";
import Testimonials from "../Testimonials"
import Companies  from "../Companies"
import Faq  from "../Faq"
import Mentors  from "./Mentors/Mentors"
import LoginOptions from "./LoginOptions";

import BetterWay from "./BetterWay";

import vidPreview from "../../images/video_preview.png"
import { AffiliatePro, TechPro, TrackPro } from "./TechPro";
import { FiPlayCircle } from "react-icons/fi";
import  Box from "@mui/material/Box";
import  Modal from "@mui/material/Modal";

const NewLanding = ()=>{
    return (
    <Layout background="blue">
        <Hero />
        <WhatweDo />
        <Stats />
        <TechPro />
        <AffiliatePro />
        <Category />
        <VideoSection />
        <BetterWay />
        <Mentors />
        <TrackPro />
        <Companies />
        <Faq />
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
   )
}
export default NewLanding
 
function VideoSection(){
  const [open, setOpen]= useState(false)
  return (
    <section className="video_section">
        <img src={vidPreview} alt="" />
        <div className="video_content">
          <h4 className="text-center">What is Gotocourse? See how it works</h4>
          <i><FiPlayCircle size="6rem" onClick={()=>setOpen(true)} /></i>
        </div>
        <PopupVideo open={open} setOpen={setOpen} />
    </section>
  )
}

function PopupVideo({open, setOpen}){
  const modalStyle = {
    position: 'absolute',
    bottom: '20%',
    left: '50%',
    transform: 'translate(-50%)',
    width: "auto",
    bgcolor: 'rgba(0, 0, 0, 0.3)',
    boxShadow: 24,
    p: 0,
  };

  return (
    <Modal
      open={open}
      onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle} className="popupmodal">
        <iframe width="560" height="315" className="mx-auto"  src="https://www.youtube.com/embed/P3bNfb9Cri8?playlist=pEDrOcroWLk&autoplay=1&rel=0&controls=1&showinfo=1" title="Benefits of using gotocourse" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </Box>
    </Modal>
  )
}
function WhatweDo(){
  return (
    <section className="what_we_do">
      <div className="container">
        <header>
          <h4 className="tet-center">What we do</h4>
        </header>
        <p className="text-center">
          Gotocourse is a platform that connects tech educators with learners.  
          Our platform has incredible tools for managing and organizing learning. 
          We are leader in connecting learners and instructors in 
          virtual instructor-led training platform. Our  goal of virtual training 
          settings is to replicate the traditional classroom or learning experience and this we 
          have done successfully without limits.
        </p>
      </div>
    </section>
  )
}
function Gif(){
  return (
    <div className="container my-4">
      <div className="gif_wrapper w-100 h-100 d-flex justify-content-center">
        {/* <img src={mygif} alt="" /> */}
        <iframe width="560" height="315" className="mx-auto"  src="https://www.youtube.com/embed/P3bNfb9Cri8?playlist=pEDrOcroWLk&rel=0&controls=1&showinfo=1" title="Benefits of using gotocourse" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  )
}

function Hero(){
    const {  generalState: { navHeight }, studentFunctions: { googleSignup } } = useAuth();
    const [overlay, setOverlay] = useState(false)
    const [logtype, setLogType] = useState(null)
     
     function signInWithGoogle(e){
      e.preventDefault()
      setLogType("google")
      setOverlay(true)

      // signInWithPopup(authentication, provider).then(res=>
        
      //     console.log(res)

      //   ).catch(err=>
      //     console.error(err)
      //     )
    }
     function signInWithFacebook(){
      setLogType("facebook")
      setOverlay(true)

      // signInWithPopup(authentication, facebookProvider).then(res=>console.log(res)).catch(err=>console.error(err))
    }
    return(
        <section className="newHero d-flex position-relative"style={{marginTop: navHeight}} >
            <div className="container">
              {overlay && <LoginOptions closeOverlay={setOverlay} type={logtype} />}
            <div className="newHero_right">
                <img className="newHero_right-image" src={HeroImg} alt="collage of laptops" />
            </div>
            <div className="newHero_left">
                <header className="">
                    <h1 className="newHero_left-header">Upskill &amp; Reskill</h1>
                    {/* <h6 className="newHero_left-title text-center">Connect with industry experts from anywhere and for less cost</h6> */}
                    <h6 className="newHero_left-title mb-4 mb-lg-5">All-in-one platform for learning tech skills</h6>
                    <div className=" new_hero_list d-flex justify-content-start">
                      <ul>
                        <li className="newHero_left-title text-start mb-0 " style={{fontWeight:"500",fontSize: "15px"}}>Learn from Industry Experts</li>
                        <li className="newHero_left-title text-start mb-0 " style={{fontWeight:"500",fontSize: "15px"}}>Access tools for teaching</li>
                        <li className="newHero_left-title text-start mb-0 " style={{fontWeight:"500",fontSize: "15px"}}>Connect from anywhere</li>
                        {/* <li className="newHero_left-title text-start mb-0 " style={{fontWeight:"500",fontSize: "15px"}}>Teach or Learn in-demand tech skills</li>
                        <li className="newHero_left-title text-start mb-0 " style={{fontWeight:"500",fontSize: "15px"}}>Learn, Save time, Save cost</li> */}
                      </ul>
                    </div>
                </header>
                <div className="sign_up_cards d-flex w-100">
                  <SignupCards title="STUDENTS" btn="Register for free" link="/signup" />
                  <SignupCards title="TEACHERS" btn="Sign up for free" link="/become-a-teacher" />
                </div>
                
                {/* <div className="newHero_left-userSignin">
                    <motion.button className="facebook d-block mb-3"
                      whileHover={{ 
                        boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                        textShadow:"0px 0px 8px rgb(255, 255, 255)",
                        backgroundColor: "#eee"
                      }}
                    onClick={signInWithGoogle}
                    >
                        <i className="me-4">
                            <img src={goo} alt="" width={25} height={25} />
                        </i>
                        Sign-up with Google
                    </motion.button>
                   
                      <motion.button className="google d-block mb-3"
                      whileHover={{ 
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                      textShadow:"0px 0px 8px rgb(255, 255, 255)",
                      backgroundColor: "#eee"
                      }}
                      onClick={signInWithFacebook}
                      >
                      <i className="me-4">
                              <img src={face} alt="" width={25} height={25} />
                          </i>
                          Sign-up with Facebook
                      </motion.button>
                    <small className="or d-block"><span>or</span></small>
                        <motion.p
                         whileHover={{ 
                          textShadow:"0px 0px 8px rgb(255, 255, 255)"
                        }}
                        >
                          <Link to="/signup">
                            Sign Up With Email
                          </Link>
                        </motion.p>
                </div> */}
            </div>
            </div>
        </section>
    )
}       

function SignupCards({title, btn, link}){
  return (
    <section className="sign_up_card">
      <Link to={link}>    
        <h5>{title}</h5>
        <button>{btn}</button>
      </Link>
    </section>
  )
}

export function Stats(){
  const statData = [
    {
      title: '20k+',
      content:"students registered"
    },
    {
      title: '98%',
      content:"Completion & Retention rate"
    },
    {
      title: '150+',
      content:"Teachers & Mentors"
    },
    {
      sup:"More than",
      title: '89%',
      content:"Tranined students already have jobs"
    },
    {
      title: '50+',
      content:"In-demand Courses"
    },
  ]
  return(
    <section className="stats_main">
      <section className="stats">
          <div className="stats_wrapper h-100">
            {
              statData.map((item, index) => (
              <div className="stat" key={index + item.title}>
                {item.sup && <small>{item.sup}</small>}
                <h5>{item.title}</h5>
                <small>{item.content}</small>
              </div>
              ))
                
              }
          </div>
      </section>
    </section>
  )
}
function Benefits(){
    return (
        <section className="wrapper services">
        <div className="container">
              <header >
                {/* <h2 className="title text-center">Benefits Of Learning At GotoCourse</h2> */}
                {/* <p className="sub_title text-center mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p> */}
              </header>

              <Gif />
          {/* <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5">
              {serviceList.map(service =>(
                <BenefitBox {...service} />
              ))}
          </div>
          <div className="text-center mt-4">
          <Link to="/students">
            <button className="btn-plain benefits_button mx-auto">Learn more</button>
            </Link>
          </div> */}
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
    return (
      <>
        
        <BootcampCard data={bootcamps.data?.data} />
        
      </>
  )
}

function BootcampCard({data}){
    

  
    return (
    <div className="newBootcamp" style={{ background:"url(" + BootImg+ ")", backgroundRepeat:"no-repeat", backgroundPosition:"right", backgroundSize:"cover"}}>
      <div className="container newBootcamp_wrapper">
        <div className="newBootcamp_content">
          <div className="classes">
            <p className="bg-white p-1 classes_title fw-bolder px-3 mb-0">AVAILABLE CLASSES</p>
            <p className="bg-white p-1 classes_title fw-bolder px-3 mb-0" style={{fontSize:"0.8rem"}}>Classes we are presently enrolling for</p>
            <div className="classes_container">
              {
                data?.slice(0,4).map((data,i)=>(
                  <NewBootCampCard {...data} key={i} all={data} />
                ))
              }
            </div>
          </div>
          <div className="others"></div>
        </div>
        <div className="d-flex justify-content-center">
          <Link className="d-inline-flex" to="classes">
            <button className="button newBootcamp_classes_button">Browse all classes</button>
          </Link>
        </div>
      </div>
    </div>
    )
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



  function NewBootCampCard({_id, title, duration, startTime, endTime, startDate, endDate, description, type, isActive, instructorId, bootcampImg, all}){
    const navigate = useNavigate()
    const {getItem}= useLocalStorage()
    const userdata = getItem(KEY)

    function handleNavigate(e){
        e.preventDefault();

        if(!userdata.token){
            navigate("/login")
        }
        localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
        navigate("/classes/class")

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
          boxShadow: "0px 0px 8px rgb(0, 0, 0)"
        }}
        transition={{ duration: 0.1 }}
        className="btn-plain new_bootcamp_card_button" onClick={handleNavigate}>Learn more</motion.button>
      </div>
    </div>
  )
}


export function Learn ({better, content}){
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
                  { better ? content:"Join a classroom to take instructor-led training, do projects with learning partners, take quizzes, network, and build a work-related portfolio. Take an opportunity to learn with likeminds across the world and build a great career you will be proud of."}
                </p>
                {
                  !better &&
                  <div>
                    <Link to="/signup" style={{display:"inline-block"}}>
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
                }

                  
              </div>
            </div>
            <div className="newLearning_right d-flex justify-content-end">
                <Image width="552px" height="452px"  image={Learning} alt="Group of people in an online meeting room" className="background" effect="blur" />
            </div>
        </div>
      </div>
    </section>
   ) 
}

export function Self({better, content}){
    return(
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
              { better ? content:"Learn on a flexible schedule at your own pace. Self-paced courses allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional commitments and responsibilities. You don’t have to worry about rigid learning schedules, learn at your pace and on your terms."}
              </p>
              {
                !better &&
                <div>
                  <Link to="/signup" style={{display:"inline-block"}}>
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
              }

            </div>
          </motion.div>
        </div>
      </div>
    </section>
    )
}

export function Mentorship ({better, content}){
    
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
                  { better ? content:"Get an exclusive and fully immersive learning experience with our Celebrity, A-list, and Technical Experts Mentors. Challenge yourself with a one-on-one mentoring session with industry experts and professionals and grow your career."}
                </p>
                {
                  !better &&
                  <div>
                    <Link to="/signup" style={{display:"inline-block"}}>
                    <motion.button 
                    className="btn-plain button-lg newMentor_button" type="button"
                    whileHover={{ 
                      boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                      textShadow:"0px 0px 8px rgb(255, 255, 255)"
                    }}
                    >
                      Get Started Today
                    </motion.button>
                      </Link>
                  </div>
                }

                  
              </div>
            </div>
            <div className="newMentor_right d-flex justify-content-end">
                <Image width="552px" height="452px"  image={Mento} alt="Group of people in an online meeting room" className="background" effect="blur" />
            </div>
        </div>
      </div>
    </section>
   ) 
}
export function InPerson ({better, content}){
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
                { better ? content:"Take physical lectures on any of our campuses close to you. Enjoy hands-on and interactive expert lead training by joining us in any of our physical learning hubs, practicing new skills through case studies and role-plays, and getting real-time feedback from facilitators. You can’t go wrong joining our small group training on-site to learn and advance your career."}
                </p>
                {
                  !better &&
                  <div>
                    <Link to="/signup" style={{display:"inline-block"}}>
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
                }
                  
              </div>
            </div>
            <div className="newLearning_right d-flex justify-content-end">
                <Image width="552px" height="452px"  image={Inperson} alt="Group of people in an online meeting room" className="background" effect="blur" />
            </div>
         
        </div>
      </div>
    </section>
   ) 
}
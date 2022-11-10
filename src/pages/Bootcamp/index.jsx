import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";

import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { toast } from "react-toastify";
import {motion} from "framer-motion"

import Layout from "../../components/Layout";
import clsx from "./styles.module.css";
import { useLocalStorage } from "../../hooks";
import { getDate } from "../../constants";
import { useNavigate } from "react-router-dom";
import BootcampImage from "../../images/bootcamp.webp";
import Teacher from "../../images/bootcamps/teacher.png";
import Cyber from "../../images/bootcamps/bootcamp_cyber.png";
import Data from "../../images/bootcamps/bootcamp_data.png";
import uiux from "../../images/bootcamps/bootcamp_uiux.png";
import web from "../../images/bootcamps/bootcamp_web.png";

import { useAuth } from "../../contexts/Auth";
import { AdvancedError } from "../../classes";

import BootcampImg from "../../images/bootcamps/bootcampTraining.png";
import NewBootcampImage from "../../images/bootcamps/classes.png";
import g1 from "../../images/bootcamps/g1.png";
import g2 from "../../images/bootcamps/g2.png";
import g3 from "../../images/bootcamps/g3.png";
import { Payment } from "../Students";
import { ReviewSection } from "../Courses";
import { useQuery } from "@tanstack/react-query";
import { Question } from "../Course/Details";
import DOMPurify from "dompurify";

const similarBootcamp = [
  {
    title: "UIUX",
    image: uiux,
    date: "12-09-2023",
  },
  {
    title: "Cybersecurity",
    image: Cyber,
    date: "12-09-2023",
  },
  {
    title: "Web developement",
    image: web,
    date: "12-09-2023",
  },
  {
    title: "Data Science",
    image: Data,
    date: "12-09-2023",
  },
];
const Bootcamp = () => {
  const navigate = useNavigate();
  const { getItem } = useLocalStorage();
  const {
    studentFunctions: { addBootcamp },
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const [bootcampInfo, setBootcampInfo] = useState({});
  const bootcamp = getItem("gotocourse-bootcampdata");
  const userdata = getItem("gotocourse-userdata");

  useEffect(() => {
    if (bootcamp) {
      setBootcampInfo(bootcamp);
    }
    return () => console.log("Bootcamp is unmounted");
  }, []);

  async function handleBootstrapEnrollment(e) {
    e.preventDefault();
    if (userdata?.token) {
      navigate("payment")
    } else {
      navigate("/login")
    }
  }
  return (
    <Layout>
        {/* <div className="container"> */}
            <div className={` ${clsx.container}  d-flex justify-content-between`}>
                <div className={clsx.bootcamp}>
                   <div className={clsx.bootcamp_content}>
                    <h2>{bootcampInfo?.title}</h2>
                    <p>
                        {bootcampInfo?.description
                        ? bootcampInfo?.description
                        : bootcampInfo?.content}
                    </p>
                    <div className={clsx.bootcamp_details}>
                        <div>
                          <p>Duration</p>
                          <span>
                              {bootcampInfo?.duration ? bootcampInfo?.duration : "10 weeks"}
                          </span>
                        </div>
                        <div>
                          <p>Date</p>
                          <span>{`${
                              bootcampInfo?.startDate
                              ? getDate(bootcampInfo?.startDate)
                              : "Jun 26"
                          } - ${
                              bootcampInfo?.endDate
                              ? getDate(bootcampInfo?.endDate)
                              : "Sept 04"
                          }`}</span>
                        </div>
                        <div>
                          <p>Price</p>
                          <span>
                              $ {bootcampInfo?.price ? bootcampInfo?.price : "TBD"}
                          </span>
                        </div>
                    </div>
                    {bootcampInfo?.instructorName ? (
                        <button type="submit" onClick={handleBootstrapEnrollment}>
                        {loading ? (
                            <div className="spinner-border text-light">
                            <div className="visually-hidden">loading</div>
                            </div>
                        ) : (
                            "Apply Now"
                        )}
                        </button>
                    ) : null}
                    </div>

                </div>
                <div className={clsx.bootcamp_image}>
                    <div
                        className={clsx.image_container}
                        style={{
                        backgroundImage: `url(${
                            bootcampInfo?.image
                            ? bootcampInfo?.image
                            : bootcampInfo?.bootcampImg
                        })`,
                        }}
                    ></div>
                </div>
            {/* </div> */}
      </div>
    </Layout>
  );
};

export default Bootcamp;

export const BootcampDetails = () => {
  const [bootcampTrainingInfo, setBootcampTrainingInfo] = useState({});
  const { getItem } = useLocalStorage();
  const bootcampTraining = getItem("gotocourse-bootcampdata");

  useEffect(() => {
    if (bootcampTraining) {
      setBootcampTrainingInfo(bootcampTraining);
    }
    return () => console.log("BootcampDetails is unmounted");
  }, []);
  const {
    generalState: { navHeight },
  } = useAuth();

  return (
    <Layout>
      <div className={clsx.bootcampTraining}>
        <section
          className={clsx.hero}
          style={{
            height: `min(calc(100vh - ${navHeight}px ), 550px)`,
            background: `url(${
              bootcampTraining?.image ? bootcampTraining?.image : BootcampImg
            }), rgba(0, 0, 0, 0.7)`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className={`container ${clsx.hero_content}`}>
            <div>
              <h1>
                {bootcampTraining?.title
                  ? bootcampTraining?.title
                  : "User Interface and User Experience design"}
              </h1>
              <p>
                Learn the basics of cybersecurity and get mentorship in this
                bootcamp
              </p>
            </div>
          </div>
        </section>
        <section className={clsx.to_learn}>
          <div className="container">
            <small>Why this bootcamp</small>
            <h3>What you will learn</h3>
            <ul>
              <li>
                Design a high converting landing page from scratch without a
                single line of code.
              </li>
              <li>
                The right formula to get conversions from your landing page.
              </li>
              <li>
                How to connect your landing page to a WordPress website to drive
                more traffic to your site..
              </li>
              <li>
                How to create an ui ddesign to use that users love and interact
                with.
              </li>
              <li>
                How to write an email to send people once they optin into your
                landing page.
              </li>
              <li>
                What are some of best traffic sources to use to get clicks on
                your landing page.
              </li>
              <li>How to create a WordPress website in 30 minutes.</li>
              <li>Create a professional logo for your website.</li>
              <li>
                Personal development training to get the right mindset to
                succeed at almost anything.
              </li>
            </ul>
          </div>
        </section>
        <section className={clsx.skills}>
          <div className="container">
            <small>Top skills</small>
            <h5 className="mb-4">Similar bootcamps</h5>
            <SimilarBootcamps />
          </div>
        </section>
        <section className={clsx.requirement}>
          <div className="container">
            <h3>Requirements to be part of the bootcamp</h3>
            <p>
              {" "}
              This course is for beginners. You don't have to have any technical
              skills to get started other than knowing how to use a computer.
              The software is easy-use drag and drop technology.{" "}
            </p>
            <ul>
              <li>You don't need to know web coding.</li>
              <li>
                A desire to learn new concepts that will help your online
                business succeed!
              </li>
              <li>You just need a desire to succeed.</li>
            </ul>
          </div>
        </section>
        <section className={clsx.description}>
          <div className="container">
            <h3>Description</h3>
            <p>
              This is not a web development course. This course will not teach
              you CSS, HTML, or JavaScript. This course will teach you how to
              create a simple yet effective landing page, known as an optin
              page. I will teach you that by designing this kind of landing
              page, you can get 30-60% higher conversions than your current
              website gets.
            </p>
            <p>
              A good landing page isn't just there to make your website look
              more likable – it's absolutely essential to the success of your
              online business. Whether you're an English teacher, into
              eCommerce, or consulting. The effective and clear landing page
              design can make the difference between a positive and negative
              ROI.
            </p>
            <p>
              There is no point in driving more traffic to your website if the
              conversion rate is 1-2%. Instead, you need to focus more on
              creating a higher converting landing page.
            </p>
          </div>
        </section>
        <section className={clsx.timing}>
          <div className="container">
            <div className="d-flex justify-content-between flex-wrap">
              <div>
                <h4>Duration</h4>
                <p>10 weeks</p>
              </div>
              <div>
                <h4>Days</h4>
                <p>Jun 26 - Sept 04</p>
              </div>
              <div>
                <h4>Timing</h4>
                <p>09:00 - 14:00</p>
              </div>
            </div>
          </div>
        </section>
        <section className={clsx.course_content}>
          <div className="container">
            <h3>Course Content</h3>
            <ol>
              <li>User interface</li>
              <li>principles of design</li>
              <li>Princiles of ux design</li>
              <li>User journey</li>
              <li>Site map</li>
              <li>Research concepts</li>
            </ol>
          </div>
        </section>
        <section className={clsx.teacher}>
          <div className="container">
            <h3>Teacher</h3>
            <div className="d-flex flex-wrap align-items-center my-3">
              <img
                src={Teacher}
                alt="tutor"
                className="img-fluid"
                width="300"
                height="400"
              />
              <div className="pt-3 pt-lg-0 ps-lg-4">
                <h4>Mrs Cathline Brown</h4>
                <p className="mb-0">Certified UI/Ux Designer</p>
              </div>
            </div>
            <p>
              That working smart and hard are very important. For me starting an
              online business is a smart move because once you learn how to do
              it, you only have to work a few hours a week.
            </p>
            <p>It is now my responsibility to grow my business.</p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

const SimilarBootcamps = () => {
  return (
    <div className="px-1">
      <Swiper
        // loop={true}
        modules={[Navigation]}
        speed={1000}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        navigation
        effect={"creativeEffect"}
        breakpoints={{
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          // when window width is >= 640px
          575: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          700: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
      >
        {similarBootcamp.map((item, index) => (
          <SwiperSlide>
            <Card key={item.title + index} {...item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

function Card({ title, image }) {
  return (
    <div className="card" style={{ width: "min(100%, 290px)" }}>
      <img className="card-img-top" src={image} alt="img" />
      <div
        className="card-body d-flex flex-column justify-content-between"
        style={{ lineHeight: "30px" }}
      >
        <h5 className="mb-4">{title}</h5>
        <div className="d-flex align-items-center">
          <small className="me-2 d-flex align-items-center">
            <BiCalendar />
          </small>
          <small>29-12-2022</small>
        </div>
      </div>
    </div>
  );
}

const curriculum = [ 
  {
    title: "Genetic algorithms",
    details:"A technique used for optimization that is inspired by the process of natural evolution or “survival of the fittest.”Often described as a type of “evolutionary algorithm,” these algorithms are well-suited for solving nonlinear problems."
  },
  {
    title: "Machine learning",
    details:"A subspecialty of computer science (within a field historically called “artificial intelligence”) concerned with the design and development of algorithms that allow computers to evolve behaviors based on empirical data."
  },
  {
    title: "Pattern recognition",
    details:"It is a set of machine learning techniques that assign some sort of output value (or label) to a given input value (or instance) according to a specific algorithm."
  },
  {
    title: "Regression",
    details:"A set of statistical techniques to determine how the value of the dependent variable changes when one or more independent variables is modified. Often used for forecasting or prediction."
  },
  {
    title: "Time series analysis",
    details:"Set of techniques from both statistics and signal processing for analyzing sequences of data points, representing values at successive times, to extract meaningful characteristics from the data."
  }
]


export function NewBootcampDetailsComponent(){
  const [bootcampTrainingInfo, setBootcampTrainingInfo] = useState({});
  const [loading, setLoading] = useState(false)
  const { getItem } = useLocalStorage();

  const bootcampTraining = getItem("gotocourse-bootcampdata");
  const userdata = getItem("gotocourse-userdata");

  const {studentFunctions: {wishlistCourse}, otherFunctions: { fetchBootcamps }} = useAuth()
  const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps());
  const navigate =  useNavigate();

  useEffect(() => {
    if (bootcampTraining) {
      setBootcampTrainingInfo(bootcampTraining);
    }
    return () => console.log("BootcampDetails is unmounted");
  }, []);
  const {
    generalState: { navHeight },
  } = useAuth();

  async function handleBootstrapEnrollment(e) {
    e.preventDefault();
    if (userdata?.token) {
      navigate("payment")
    } else {
      navigate("/login")
    }
  }
  async function addToWishList(){
  
    if(userdata !== null){
      try {
        setLoading(true)
        const response =  await wishlistCourse(bootcampTraining.bootcampId, userdata?.token)
        const {success, message, statusCode} = response
        if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
        toast.success(message)
      }catch(error){
        console.error(error)
        toast.error(error.message);
      }finally{
        setLoading(false)
      }
      
      
    } else {
      navigate("/login")
    }
  }
  return (
    <Layout>
      <div className={clsx.bootcampTraining}>
        <DetailsHero
          loading={loading}
          navHeight={navHeight}
          title={bootcampTrainingInfo?.title}
          description={bootcampTrainingInfo?.description}
          img={bootcampTrainingInfo?.bootcampImg}
            addToWishList={addToWishList}
          handleBootstrapEnrollment={handleBootstrapEnrollment}
        />
        <section className={clsx.to_learn}>
          <div className="container">
            <header>
              <h3 className={clsx.section_title}>Program Overview</h3>
              <hr />
            </header>
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(bootcampTrainingInfo?.description)}} />
            {
              bootcampTrainingInfo?.careerList?.length > 0 &&

              <div className={clsx.career_list}>
                <h6>Career Prospect</h6>
                <ul>
                  {
                    bootcampTrainingInfo?.careerList?.map(item=>(
                      <li>{item.name}</li>
                    )) 
                  }
                  
                </ul>
              </div>
            }
          </div>
        </section>
        {/* <section className={clsx.images}>
         <div className="container">
          <div className={clsx.img_grid}>
            <img src={g1} alt="" className="img-fluid" />
            <img src={g2} alt="" className="img-fluid" />
            <img src={g3} alt="" className="img-fluid" />
          </div>
         </div>
        </section> */}
        <section className={clsx.requirement}>
          <div className="container">
            <header>
                <h3 className={clsx.section_title}>Class Curriculum</h3>
                <hr />
            </header>
            <h5 className="lead" style={{color:"var(--theme-blue"}}>{bootcampTrainingInfo?.title} Curriculum</h5>
                  {/* <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, impedit inventore debitis similique a magni quia facere, optio neque delectus pariatur quam. Nostrum quisquam error nemo autem numquam!
                  </p> */}
                  <ul>
                    {bootcampTrainingInfo?.syllabus?.map((item) => (
                      <li>
                        <p className={clsx.niche}>{item.title}</p>
                        <p className={clsx.niche}>{item.description}</p>
                      </li>
                    ))}
                  </ul>
          </div>
        </section>
        <section className={clsx.process}>
          <div className="container">
            <header>
              <h3 className={clsx.section_title}>Our Process</h3>
              <hr />
            </header>
            <div className={clsx.link}>
              <div className={clsx.box}>
                <p className={clsx.learn}>1</p>
              </div>
              <span className={clsx.line}></span>
              <div className={clsx.box}>
                <p className={clsx.practice}>2</p>
              </div>
              <span className={clsx.line}></span>
              <div className={clsx.box}>
                <p className={clsx.portfolio}>3</p>
              </div>
              <span className={clsx.line}></span>
              <div className={clsx.box}>
                <p className={clsx.prepare}>4</p>
              </div>
              <span className={clsx.line}></span>
              <div className={clsx.box}>
                <p className={clsx.land}>5</p>
              </div>
            </div>

          </div>
        </section>
        <section className={clsx.upcoming_classes}>
          <div className="container">
            <header>
              <h3 className={clsx.section_title}>Similar upcoming classes</h3>
              <hr />
            </header>
            <div className={clsx.upcoming_card}>
              {
                bootcamps.data?.data?.filter(d=>d.isActive).map((item,i)=>(
                    <Upcome {...item} all={item}/>
                ))
              }
            </div>
          </div>
        </section>
        {/* <section className={clsx.payment_options}>
          <Payment />
        </section> */}
        <section className={clsx.teacher}>
         <ReviewSection />
        </section>
        <Question />
      </div>
    </Layout>
  );
}


export function DetailsHero({navHeight, title, description, addToWishList,handleBootstrapEnrollment, loading, img}){
  
  return (
    <section
    className={clsx.new_hero}
    style={{
      height: `min(calc(100vh - ${navHeight}px ), 450px)`,
      background: `url(${img  ? img: NewBootcampImage}), rgba(0,0,0,0.6) no-repeat`

    }}
  >
    <div className={`container ${clsx.hero_content}`}>
      <div>
        <h4>{title ? title : "Data Science"}</h4>
        {/* <p>{description ? description : "Data science refers to the process of extracting clean information to formulate actionable insights"}</p> */}
        <div className={clsx.hero_buttons}>
          <motion.button 
           whileHover={{
            boxShadow: "0px 0px 8px rgb(225, 225, 225)"
          }}
          transition={{ duration: 0.1 }}
          onClick={handleBootstrapEnrollment}>Enroll now</motion.button>
          <motion.button 
           whileHover={{
            boxShadow: "0px 0px 8px rgb(225, 225, 225)"
          }}
          transition={{ duration: 0.1 }}
            onClick={addToWishList}
          >
            {
              loading ? <div className="spinner-border"></div>
              :
              "Add to wishlist"
            }
          </motion.button>
        </div>
      </div>
    </div>
  </section>
  )
}

function Upcome({_id, title, duration, startTime, endTime, startDate, endDate, description, type, isActive, instructorId, bootcampImg, all}) {
  const { getItem } = useLocalStorage();
  const userdata = getItem("gotocourse-userdata");
  const navigate = useNavigate();

  async function handleBootstrapEnrollment(e) {
    e.preventDefault();
    if (userdata?.token) {
      localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
      navigate("payment")
    } else {
     navigate("/login")
    }
  }
  return(
    <div className={clsx.upcome}>
      <p>{title}</p>
      <div>
        <p>Date</p>
        <p>{startDate ?  getDate(startDate) : ""} - { endDate ?  getDate(endDate) : "" }</p>
      </div>
      <div>
        <p>Duration</p>
        <p>{duration}</p>
      </div>
      <div>
        <button onClick={handleBootstrapEnrollment}>Enroll now</button>
      </div>
    </div>
  )
}
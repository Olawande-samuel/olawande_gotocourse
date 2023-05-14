import React, { useState } from "react";



import clsx from "./styles.module.css";
import { Reviews } from "../../Teacher/components";
import Layout from "../../../components/Layout";
import { useEffectOnMount } from "../../../hooks";
// import topGirl from "../../../images/Girlwithhallow.png";
import { useAuth } from "../../../contexts/Auth";
import { Bootcamp, StudentViews } from "./components";
import { AdvancedError } from "../../../classes";
import img from "../../../images/bola.png";
import boySitting from "../../../images/boy_sitting.png";
import { Link, useNavigate } from "react-router-dom";
import PaginatedClasses from "./Paginated";
import teacher from "../../../images/Girlwithhallow.png"


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

const tabs = ["All Classes",
    //  "Data Science", "Project Management", "Cybersecurity & Assurance", "Digital Marketing"
]



const Available = () => {
    const [loading, setLoading] = useState(true);
    const [bootcamps, setBootcamps] = useState([]);
    const { otherFunctions: { fetchBootcamps } } = useAuth();

    useEffectOnMount(() => {
        (async () => {
            try {
                const res = await fetchBootcamps();
                const { success, message, statusCode } = res;
                if (!success) throw new AdvancedError(message, statusCode);
                else {
                    const { data } = res;
                    setBootcamps(_ => data.filter(d => d.isActive));

                }
            } catch (err) {
                console.error(err)
            }
        })()
        return () => console.log('Removing available classes');
    }, [])


    const classType= [
        {
            id: 1,
            mainHeading:"In-demand Courses",
            subHeading:"Launch a new career in as little as 1- 6 months",
            data:"IN_DEMAND"
        },
        {
            id: 2,
            mainHeading:"Upskill Courses",
            subHeading:"",
            data:"UPSKILL_COURSES"
        },
        {
            id: 3,
            mainHeading:"Executive Courses",
            subHeading:"",
            data:"EXECUTIVE_COURSES"
        },
        {
            id: 4,
            mainHeading:"Short Courses",
            subHeading:"",
            data:"SHORT_COURSES"
        },
        {
            id: 5,
            mainHeading:"Tech Entrepreneurship Courses",
            subHeading:"",
            data:"TECH_ENTREPRENEURSHIP"
        },
    ]


    return (
        <Layout>
            <div className={clsx.available_classes}>
                <div className={clsx.jumbotron}>
                    <div className={`container ${clsx.jumbotron__cover}`}>
                        <div className={clsx.jumbotron__absolute}>
                            <h1>The Best time to get trained is now</h1>
                            <p>
                                Choose from our available classes with new additions published regularly
                            </p>
                        </div>
                        <div className={clsx.jumb_container}>
                            <img src={teacher} alt="" />
                        </div>

                    </div>
                </div>

                <div className={clsx.classes_body}>
                    <div className="container-xxl">
                        {/* <PaginatedClasses list={bootcamps} /> */}
                        
                        {
                            classType.map(item=>(
                                <div key={item.id}>
                                    <ClassTypeContainer
                                        content={bootcamps} 
                                        {...item}
                                    />
                                </div>
                            ))
                         }
                        {/* <Reviews reviews={reviews} bgColor="#fff" /> */}
                        <div className={clsx.classes_start}>
                            <div className="container">
                                <div className={clsx.start_left}>
                                    <img src={boySitting} alt="Boy Sitting" />
                                </div>
                                <div className={clsx.start_right}>
                                    <h3>Start and accelerate your tech career through a great learning experience</h3>
                                    <Link to="/signup">
                                        <button>Register Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


export function ClassLists({ bootcamps }) {
    return (
        <div className={clsx.bootcamps}>
            {
                bootcamps?.map((item, i) => (
                    <Bootcamp key={i} {...item} all={item} />
                ))
            }
        </div>
    )
}

export function ClassTypeContainer({mainHeading, subHeading, data,  content}){
    const ownData = content?.filter(item=> item.subCategory === data)
    return (
        <section className={`classType ${clsx.classType}`}>
            <header>
                <h5 className="fw-bold">{mainHeading}</h5>
                <p>{subHeading}</p>
            </header>
            <ClassCarousel data={ownData} />

        </section>
    )
}

function ClassCarousel({data}){
    return(
        <div className="classType_swiper">
            <Swiper
                // install Swiper modules
                modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                // loop={true}
                speed={8500}
                autoplay={{ delay: 2000 }}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                    nextEl: '.review-swiper-button-next',
                    prevEl: '.review-swiper-button-prev',
                  }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                575: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
                700: {
                    slidesPerView: 3,
                    spaceBetween: 5,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 28,
                },
                1704: {
                    slidesPerView: 4.5,
                    spaceBetween: 28,
                },
                }}
            >

                {data?.map(item=>(
                <SwiperSlide key={item.bootcampId}>
                    <ClassCard {...item} all={item} />
                </SwiperSlide>
                ))}
            </Swiper>
            <i className="review-swiper-button-next"></i>
            <i className="review-swiper-button-prev"></i>
        </div>
    )
}

function ClassCard({bootcampImg, title, all}){
    const navigate = useNavigate();
console.log({all});
    function navigateToDetails(){
        localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
        navigate("/classes/class")
    }
    return (
        <div className={clsx.class_card} onClick={navigateToDetails}>
            <img src={bootcampImg} alt="" className="img-fluid" />
            <span>{title}</span>
        </div>
    )
}

export default Available;
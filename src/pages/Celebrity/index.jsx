import {Link} from "react-router-dom"
import Image from "../../components/Image"
import Layout from "../../components/Layout"
import {useAuth} from "../../contexts/Auth"
import {IMAGEURL} from "../../constants"
import style from "./style.module.css"
import { Swiper, SwiperSlide } from "swiper/react";
import {BsLightningFill} from "react-icons/bs"
import  {useQuery} from "@tanstack/react-query"

import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y, EffectCoverflow } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";

import HeroImg from "../../images/celebs/hero.png"
import Serena from "../../images/celebs/Serena.png"
import Gary from "../../images/celebs/Gary.png"
import Joy from "../../images/celebs/Joy.png"
import Alist from "../../images/celebs/Alist1.png"
import Jolly from "../../images/celebs/Jolly.png"
import Dave from "../../images/celebs/dave.png"
import Joyce from "../../images/celebs/Joyce.png"
import mentor from "../../images/celebs/mentor.png"
import harrison from "../../images/celebs/harrison.png"
import harrison2 from "../../images/celebs/harrison2.png"


function RightMentor(){
    const item = [
        {
            name: "Harrison J.",
            occupation: "Life Coach",
            profileImg:Alist
        },
        {
            name: "Harrison J.",
            occupation: "Life Coach",
            profileImg: harrison
        },
        {
            name: "Harrison J.",
            occupation: "Life Coach",
            profileImg:harrison2
        },
    ]
    return(
        <div className={style.right_mentor}>
            <div className="container">
                <div className={`${style.textImage}`}>
                    <div className={style.text_section}>
                        <h2 className={style.text_section_header}>Find the right mentor and position yourself for career advancement</h2>
                        <p className={style.text_section_p}>Have an exclusive session with any of our Celebrity, A-list, or Technical Expert mentors to take control of your career advancement</p>
                    </div>
                    <div className={style.image_section}>
                        <div className={style.right_mentor_img_wrapper}>
                            {
                                item.map((i, index)=>(
                                    <div className={style.right_mentor_img_item} key={index}>
                                        <img src={i.profileImg} alt="" />
                                        <div>
                                            <h5>{i.name}</h5>
                                            <p>{i.occupation}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>    
                    </div>
                </div>

            </div>
        </div>

    )
}

export function TechExperts(){
    const {otherFunctions: {fetchMentors}} = useAuth();

    const {data, isLoading, isError} = useQuery(["tech mentors"], fetchMentors, {
        initialValue: []
    })
    return (
        <Slider title="Technical Experts Level 1" data={data?.data && data.data.slice(0, 7)} size={5} />

  )
}
export function TechExperts2(){
    const {otherFunctions: {fetchMentors}} = useAuth();
    const {data, isLoading, isError} = useQuery(["tech mentors"], fetchMentors, {
        initialValue: []
    })


    return (
        <Slider title="Technical Experts Level 2" data={data?.data && data.data.slice(8, 20)} size={5}  />

  )
}
function Favourite(){
    const details = {
        title: "Gotocourse is where you connect with your favorite celebrity mentors",
        paragraph: "Access our mentoring lounge to book a session with any of our celebrity mentors",
        btn_title:"Browse Mentors",
        image:mentor,
        button: true,
        img_alt:"A collage of different people having conversations in a video chat"
    }
    return (
        <div className={style.favourite}>
            <div className="container">
            <TextandImage {...details} />
            </div>
        </div>
    )
}

export function AlistMentors(){
    const AlistMentor = {
        title: "A-list Mentors",
        size: 4, 
        data: [
            {
                id:1,
                name:"Davis Williams", 
                occupation:"CEO", 
                amount:200, 
                img:Alist
            },
            {
                id:2,
                name:"Jolly Vee", 
                occupation:"Entrepreneur and Internet Personality", 
                amount:200, 
                img:Jolly
            },
            {
                id:3,
                name:"Dave King", 
                occupation:"Musician", 
                amount:200, 
                img:Dave
            },
            {
                id:4,
                name:"Joyce King", 
                occupation:"Musician", 
                amount:200, 
                img:Joyce
            },
        ]
    }
    return (
        <Slider {...AlistMentor}  />

  )
}


export function CelebrityMentor(){
    const celebrityMentors = {
        title: "Celebrity Mentors",
        size:3.3,
        data: [
            {
                id:1,
                name:"Serena Williams", 
                occupation:"Tennis Player", 
                amount:200, 
                img:Serena
            },
            {
                id:2,
                name:"Gary Vee", 
                occupation:"Entrepreneur and Internet Personality", 
                amount:200, 
                img:Gary
            },
            {
                id:2,
                name:"George Joy", 
                occupation:"Musician", 
                amount:200, 
                img:Joy
            },
        ]
    }
    
    return (
        <Slider {...celebrityMentors}  />
    )
}

function Hero(){
    const details = {
        title: "Unleash your inner genius",
        paragraph: "Connect with your favorite celebrities for creative solutions here at Gotocourse mentor’s lounge.",
        btn_title:"Browse Now",
        image:HeroImg,
        button: true,
        img_alt:"Two women having a conversation"
    }
    return (
        <div className={style.hero}>
            <div className="container">
            <TextandImage {...details} />
            </div>
        </div>
    )
}

export const Landing = () =>{

    return (
        <Celebrity>
            <Hero />
            <CelebrityMentor />
            <AlistMentors />
            <Favourite />
            <TechExperts />
            <RightMentor />
            <TechExperts2 />
        </Celebrity>
    )
}

const Celebrity = ({children})=> {
    return (
        <Layout>
            {children}
        </Layout>
    )
}

export function TextandImage({direction, button, title, paragraph, btn_title, image, img_alt}){
    return (
        <div className={`${style.textImage} ${direction ? style.direction : style.default_direction }`}>
            <div className={style.text_section}>
                <h2 className={style.text_section_header}>{title}</h2>
                <p className={style.text_section_p}>{paragraph}</p>
                {
                    button && <button className={style.text_section_button}>{btn_title}</button>
                }
            </div>
            <div className={style.image_section}>
                <Image  width="552px" height="452px"  image={image} alt={img_alt} className="background" effect="blur" />
            </div>
        </div>
    )
}
export function CelebCard({name, occupation, amount, img, mentorImg, mentorFirstName, mentorLastName, expertise, fee}){
    return (
        <div className={style.celebrity_card}>      
            <img src={img ? img : `${IMAGEURL}/${mentorImg}`} alt={name ? name :`${mentorFirstName} ${mentorLastName}`} className={style.card_img} />
            <div className={style.card_content}>
                <h4>{name ? name : `${mentorFirstName} ${mentorLastName}`}</h4>
                <p>{occupation ? occupation : expertise}</p>
                <div className="d-flex justify-content-between">
                    <span>$ {amount ? amount : fee}</span>
                    <span>
                        <i><BsLightningFill color="#F8C40D" size="2rem" /></i>
                        <span>24Hrs</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
function Slider({title, data, size=4}){
    console.log({data})
    return(
        <div className={style.slider_wrapper}>
            <div className="container">
                <div className={`${style.slider_header} d-flex justify-content-between align-items-center`}>
                    <h2>{title}</h2>
                    <Link to="mentors">
                        <span className={style.see_all}>See all</span>  
                    </Link>
                </div>
                <Swiper
                // install Swiper modules
                    modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                    loop={true}
                    speed={1500}
                    autoplay={{delay:3500}}
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
                        slidesPerView: 2,
                        spaceBetween: 0,
                        },
                        700: {
                        slidesPerView:2.5 ,
                        spaceBetween: 8,
                        },
                        1024: {
                        slidesPerView: 3.5,
                        spaceBetween: 30,
                        },
                        1350: {
                        slidesPerView: size,
                        spaceBetween: 30,
                        },
                        1500: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                        },
                    }}
                    >
                    {data?.length> 0 && data.map((item, index) => (
                        <SwiperSlide key={index}>
                            <CelebCard {...item} key={index} />
                        </SwiperSlide>
                    ))}
                    </Swiper>
            </div>
                
        </div>
    )
}

export default Celebrity
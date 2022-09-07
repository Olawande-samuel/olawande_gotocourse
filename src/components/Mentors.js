import React, {useEffect, useRef, useState} from "react";
import {GoChevronRight} from "react-icons/go"
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../contexts/Auth"
import { AdvancedError } from "../classes";


const Mentors = () => {
  const {generalState, setGeneralState, otherFunctions: {fetchMentors}} = useAuth();
  const [mentors, setMentors] = useState([])
  const ref = useRef(false);

  useEffect(()=>{
    if(ref.current) return
    (async()=>{
      try{
        setGeneralState({...generalState, loading: true})
        const res = await fetchMentors();
        const {success, message, statusCode, data} = res;
        setGeneralState({...generalState, loading: false})
          if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
          if(data.length > 0){
            setMentors(data)
          }
    }catch(err){
        setGeneralState({...generalState, loading: false})
    }
    })()
    ref.current = true
  },[])

  SwiperCore.use([Autoplay])
  return (
    <section className="mentors">
      <div className=" mentors_content">
        <header className="text-center">
          <h3 className="title" style={{marginBottom:"0.525rem"}}>Find Your Mentor, Accelerate Your Success</h3>
          <p className="sub_title mx-auto" style={{width:"min(100% - 1rem, 1300px)"}}>
            One of the best ways to break into I.T or learn more about becoming
            a top tech professional is to find someone that has gone before you
            and gained success at the same goal. This person has the ability to
            provide valuable advice, coaching and encouragement as a mentor.
            Choose from our A-list and screened mentors to learn and grow your
            capabilities{" "}
          </p>
        </header>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          loop={true}
          speed={1500}
          autoplay={{delay:2500}}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
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
              slidesPerView: 2.5,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 5,
            },
          }}
        >
          {mentors.length> 0 && mentors.map((item) => (
            <SwiperSlide>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="text-end w-100 my-4 ">
        <Link to="/mentors" className="text-end text-secondary">Learn more <i><GoChevronRight /></i></Link>
        </div>
      </div>
    </section>
  );
};

export const Card = ({ item,type }) => {
  const navigate = useNavigate();
  const {setGeneralState} = useAuth()
  
  function gotoMentorPage(){
    setGeneralState(old => {
      return {
        ...old,
        teacherProfile: item
      }
    }) 
      localStorage.setItem("gotocourse-viewMentor", JSON.stringify(item))
      navigate(`/mentors/${item.mentorFirstName}-${item.mentorLastName}`)

 
  }
  return (
    <div className="px-1 mentors_new_card" style={{cursor: "pointer"}} onClick={gotoMentorPage}>
      <div className="card">
        <div className="card-body">
        <div className="mentors_card_top" style={{background:`url(${item?.mentorImg && `https://loftywebtech.com/gotocourse/api/uploads/${item?.mentorImg} `}), rgba(0, 0, 0, 0.5)`}}>        
          <div>
            <h5 className="">{`${item?.mentorFirstName}  ${item?.mentorLastName && item?.mentorLastName} `}</h5>
            <p className="mentors_footnote" style={{fontSize:"14px"}}>{item?.footnote}</p>
          </div>
        </div>
        <div className="text-dark w-100 px-2">
           <h5>{item?.expertise}</h5>
          <small className="">{item?.experience && item?.experience}</small>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Mentors;

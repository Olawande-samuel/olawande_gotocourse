import React from "react";

import mentor from "../images/mentor1.png";
import mentor2 from "../images/mentor3.png";
import mentor3 from "../images/mentor2.png";
import mentor4 from "../images/mentor4.png";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const witnesses = [
  {
    id: 1,
    content: "I will teach you PowerBi in 8 weeks",
    profile: mentor,
    location: "Peter Southampton . London",
  },
  {
    id: 2,
    content: "I will teach you UIUX in 4 weeks",
    profile: mentor2,
    location: "Cassandra Geoffrey . Atlanta",
  },
  {
    id: 3,
    content: "I had a wonderful experience",
    profile: mentor3,
    location: "Niyi Adegoke . Lagos ",
  },
  {
    id: 4,
    content: "I will teach you PowerBi in 8 weeks",
    profile: mentor4,
    location: "Patrick Quinn . London",
  },
  {
    id: 5,
    content: "I will teach you UIUX in 2 weeks",
    profile: mentor2,
    location: "Cassandra Geoffrey . Atlanta",
  },
  {
    id: 6,
    content: "I will teach you web development in 4 weeks",
    profile: mentor3,
    location: "Niyi Adegoke . Lagos",
  },
];
const Mentors = () => {
  return (
    <section className="mentors">
      <div className=" mentors_content">
        <header className="text-center">
          <h3 className="title">Choose a mentor</h3>
          <p className="sub_title">
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
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
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
              slidesPerView: 3,
              spaceBetween: 0,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
          }}
        >
          {witnesses.map((item) => (
            <SwiperSlide>
              <Card item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

const Card = ({ item }) => {
  const navigate = useNavigate();
  const {setGeneralState} = useAuth()
  function gotoMentorPage(){
    setGeneralState(old => {
      return {
        ...old,
        teacherProfile: item
      }
    })
    let meta = item.location.split(" ");
    let name = meta[0] + "-" + meta[1]; 
    navigate("/teachers/"+name);
  }
  return (
    <div className="px-1" style={{cursor: "pointer"}} onClick={gotoMentorPage}>
      <div className="card">
        <img src={item.profile} alt="" className="card-img-top mentor_image" />
        <div className="card-body">
          <h5 className="card-title">{item.content}.
          
          <span className="card-text ms-2">{item.location}</span></h5>
          {/* <p className="card-text">{item.location}</p> */}
        </div>
      </div>
    </div>
  );
};
export default Mentors;

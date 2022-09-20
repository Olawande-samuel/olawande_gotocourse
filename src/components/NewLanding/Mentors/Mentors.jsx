import React, {useEffect, useRef, useState} from "react";
import {GoChevronRight} from "react-icons/go"
import mentorsBg from "../../../images/landmentors.png"
import mentorsVid from "../../../images/mentorsVid.png"
import {GiStarMedal} from "react-icons/gi"
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from "../../../contexts/Auth"
import { AdvancedError } from "../../../classes";

// import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
// import { Swiper, SwiperSlide } from "swiper/react";

// // Import Swiper styles
// import "swiper/css";

// const Mentors = () => {
//   const {generalState, setGeneralState, otherFunctions: {fetchMentors}} = useAuth();
//   const [mentors, setMentors] = useState([])
//   const ref = useRef(false);

//   useEffect(()=>{
//     if(ref.current) return
//     (async()=>{
//       try{
//         setGeneralState({...generalState, loading: true})
//         const res = await fetchMentors();
//         const {success, message, statusCode, data} = res;
//         setGeneralState({...generalState, loading: false})
//           if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
//           if(data.length > 0){
//             setMentors(data)
//           }
//     }catch(err){
//         setGeneralState({...generalState, loading: false})
//     }
//     })()
//     ref.current = true
//   },[])

//   SwiperCore.use([Autoplay])
//   return (
//     <section className="newMentors">
//         <div className="container">
//       <div className=" mentors_content">
//         <header className="text-center">
//           <h3 className="title" >Find Your Mentor, Accelerate Your Success</h3>
//           <p className="sub_title mx-auto" style={{width:"min(100% - 1rem, 1300px)"}}>
//           Gotocourse mentors are experts, and industry rock stars excited to share their tricks, tools, insights, and experince with you.
//           </p>
//         </header>
//         <Swiper
//           // install Swiper modules
//             modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
//             loop={true}
//             speed={1500}
//             autoplay={{delay:2500}}
//             spaceBetween={0}
//             slidesPerView={1}
//             // navigation
//             pagination={{ clickable: true }}
//             scrollbar={{ draggable: true }}
//             breakpoints={{
//                 // when window width is >= 320px
//                 320: {
//                   slidesPerView: 1,
//                   spaceBetween: 0,
//                 },
//                 // when window width is >= 640px
//                 575: {
//                   slidesPerView: 2,
//                   spaceBetween: 0,
//                 },
//                 700: {
//                   slidesPerView:2.5 ,
//                   spaceBetween: 0,
//                 },
//                 1024: {
//                   slidesPerView: 3.5,
//                   spaceBetween: 5,
//                 },
//                 1300: {
//                   slidesPerView: 4,
//                   spaceBetween: 5,
//                 },
//             }}
//         >
//           {mentors.length> 0 && mentors.map((item, index) => (
//             <SwiperSlide key={index}>
//               <Card item={item} key={index} />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//         {/* <div className="text-end w-100 my-4 ">
//         <Link to="/mentors" className="text-end text-secondary">Learn more <i><GoChevronRight /></i></Link>
//         </div> */}
//       </div>
//         </div>
//     </section>
//   );
// };

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
      navigate(`/lounge/mentors/all/${item.mentorFirstName}-${item.mentorLastName}`)

 
  }
  return (
    <div className="px-1" style={{cursor: "pointer", height:"380px"}} onClick={gotoMentorPage}>
      <div className="card mentor_image h-100 w-100 position-relative" style={{background:`url(${item?.mentorImg && `https://loftywebtech.com/gotocourse/api/uploads/${item?.mentorImg} `}), rgba(0, 0, 0, 0.5)`, backgroundRepeat:"no-repeat", backgroundPosition:"top", backgroundSize:"cover"}}>
        {/* <img src={item?.mentorImg && `https://loftywebtech.com/gotocourse/api/uploads/${item?.mentorImg}`} alt="" className="card-img-top mentor_image" /> */}
        <div className="card-body newMentors_card-body position-absolute w-100">
            <div className="d-flex flex-column justify-content-around h-100">
                <h5 className="text-center">{`${item?.mentorFirstName}  ${item.mentorLastName} `}</h5>
                <p className="mentors_footnote text-center" style={{fontSize:"14px"}}>{item?.footnote}</p>
                <p className="mb-1 text-center">{item?.expertise}</p>
                <small className="d-block text-center">{item?.experience && item?.experience}</small>
            </div>
        </div>
      </div>
    </div>
  );
};

function Mentors(){
  return(
    <section className="newMentors">
        <div className="newMentors_content">
          <header className="text-center">
            <h3 className="title" >Find Your Mentor, Accelerate Your Success</h3>
            <p className="sub_title mx-auto" style={{width:"min(100% - 1rem, 700px)"}}>
            Gotocourse mentors are experts, and industry rock stars with years of experience that are excited to share their tricks, tools, insights, and experience with you.           </p>
          </header>
          <div className="newMentors_content_mid">
            <div className="newMentors_text">
              <h4>Connect with Celebrity mentors, A-list mentors and Technical experts on Gotocourse</h4>
              <div className="mt-4 d-flex justify-content-center">
                <Link to="lounge" className="d-inline-flex">
                  <button className="button p-2 px-3" style={{background:"var(--theme-orange"}}>Explore Mentors Lounge</button>
                </Link>
              </div>
            </div>
            <div className="newMentors_vid ">
              <img src={mentorsVid} alt="" />
            </div>
          </div>
          <div className="newMentors_content_bottom mt-4">
              <small className="bottom_title d-block text-center fw-bolder mb-3">Connect with</small>
              <div className="newMentors_content_bottom_card">
                <Link to="/lounge" className="d-inline-flex">
                <div className="newMentors_content_bottom_cards">
                  <div className="bottom_card d-flex">
                    <GiStarMedal color="#2F88FF" />
                    <small>CELEBRITY MENTORS</small>
                  </div>
                </div>
                </Link>
                <Link to="/lounge" className="d-inline-flex">
                <div className="newMentors_content_bottom_cards">
                  <div className="bottom_card d-flex">
                    <GiStarMedal color="#2F88FF" />
                    <small>A-LIST MENTORS</small>
                  </div>
                </div>
                </Link>
                <Link to="/lounge" className="d-inline-flex">
                <div className="newMentors_content_bottom_cards">
                  <div className="bottom_card d-flex">
                    <GiStarMedal color="#2F88FF" />
                    <small>TECHNICAL EXPERTS</small>
                  </div>
                </div>
                </Link>
              </div> 
          </div>
        </div>
    </section>
  )
}
export default Mentors;

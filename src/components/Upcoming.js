import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from '@mui/material';


import {getDate} from "../constants"

import { AdvancedError } from '../classes';
import { useAuth } from '../contexts/Auth';
import { useLocalStorage } from '../hooks';




const Upcoming = () => {
  const {otherFunctions: { fetchBootcamps } } = useAuth();
  const {getItem} = useLocalStorage();
  const flag = useRef(false);

  // let userdata = getItem(KEY);
  const [bootcamps, setBootcamps] = useState([])
  const [loading, setLoading] = useState(true);
  
  useEffect(()=>{
    if(flag.current) return;
    (async () => {
      try {
        const res = await fetchBootcamps();
        const { message, success, statusCode } = res;
        if (!success) throw new AdvancedError(message, statusCode);
        else if (statusCode === 1) {
          const { data } = res;
          setBootcamps( _ => data);
        } else {
          throw new AdvancedError(message, statusCode);
        }
      } catch (err) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }finally{
        setLoading(_ => false);
      }
    })()
    flag.current = true;
  },[])
    SwiperCore.use([Autoplay])
    return (
      <section className="testimonials">
        <div className="container-lg testimonial_content">
          <header>
            <h3 className="testimonials_title">Upcoming Bootcamps</h3>
          </header>
          <div className="upcoming_card_wrapper justify-content-around align-items-center">
            {!loading ? (
                bootcamps.slice(0, 3).map((bootcamp, index)=>(
                  <>
                        <UpcomingCards key={index} {...bootcamp} all={bootcamp} />
                  </>
                ))
            ):(
                [0, 0, 0].map((_, i)=>(
                        <Skeleton key={i} className="col-md-9 p-2 p-md-3 pe-md-4" variant='rectangular' width={350} height={500} animation="wave" sx={{borderRadius: 10}} />
                ))
            )}
          </div>
  
        </div>
      </section>
    )
}

export default Upcoming


const UpcomingCards = ({_id, title, duration, startTime, endTime, startDate,endDate, description, type, isActive, instructorId, bootcampImg, all})=> {
  const navigate = useNavigate();
  const flagRef = useRef(null)
console.log(all)
  const style ={
    flag:{
        top:0,
        right:0,
        background:"var(--theme-blue)",
        padding:"1.1rem",
        borderTopRightRadius:"8px"
    },
    text:{
        marginRight:"190px",
        fontSize:"17px"
    },

  }
    return (
        <div className="card p-0 upcoming_card position-relative mx-auto" style={{borderRadius:"8px", height:"100%"}}>
          <div className="upcoming_card_img_wrapper">
            <img src={bootcampImg} alt="" className="card-img-top img-fluid"  />
          </div>
            <div className="card-body p-0">
                <div className="row" style={{height:"100%"}}>
                  
                    <div className="col-12 p-2 p-md-3 pe-md-4 d-flex flex-column justify-content-between">
                      <h5 className="fw-bolder">{title}</h5>
                        <p className="mx-0  upcoming_text" style={style.text}> {description}</p>
                        <div className="timing d-flex flex-column flex-md-row flex-wrap justify-content-between text-center">
                            <div>
                                <h6 className="fw-bolder">Duration</h6>
                                <p>{duration}</p>
                            </div>
                            <div>

                                <h6 className="fw-bolder">Date</h6>
                                <p>{getDate(startDate)} -{getDate(endDate)}</p>
                            </div>
                            {/* <div>
                                <h6 className="fw-bolder">Timing</h6>
                                <p>{startTime} - {endTime}</p>
                            </div> */}
                        </div>
                        <div className="text-center text-md-end">
                            <button className="btn" style={{ background:"var(--theme-blue)", color:"#fff"}} onClick={()=>{
                              localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
                              navigate("bootcamp")}}>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="flag position-absolute" ref={flagRef} style={style.flag}>
                <p className="mb-0 text-light">Registration in progress</p>
            </div> */}
        </div>
    )
}



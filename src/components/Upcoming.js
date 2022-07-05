import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Skeleton } from '@mui/material';




import { AdvancedError } from '../classes';
import { useAuth } from '../contexts/Auth';
import { useLocalStorage } from '../hooks';




const Upcoming = () => {
  const {otherFunctions: { fetchBootcamps } } = useAuth();
  const {getItem} = useLocalStorage();
  const navigate = useNavigate();
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
          console.log(data);
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
          <div>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            loop={true}
            speed={1500}
            autoplay={{delay:3500}}
            spaceBetween={4}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            breakpoints= {{
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 16
            },            
            }}
      >
            {!loading ? (
                bootcamps.map(bootcamp=>(
                    <SwiperSlide>
                        <UpcomingCards {...bootcamp} />
                    </SwiperSlide>
                ))
            ):(
                [0, 0, 0, 0, 0].map((_, i)=>(
                    <SwiperSlide key={i}>
                        <Skeleton className="col-md-9 p-2 p-md-3 pe-md-4" variant='rectangular' width={1200} height={300} animation="wave" sx={{borderRadius: 10}} />
                    </SwiperSlide>
                ))
            )}
            </Swiper>
          </div>
  
        </div>
      </section>
    )
}

export default Upcoming


const UpcomingCards = ({_id, title, duration, startTime, endTime, startDate,endDate, description, type, isActive, instructorId})=> {

    function getDate(date){
        // 2022-07-03T00:00:00.000Z
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let d = date.split("T")[0];
        let [y, m, day] = d.split("-");
        m = months[parseInt(m) - 1];
        return `${m} ${day}`;
      }
    return (
        <div className="card p-0 upcoming_card position-relative mx-auto" style={{width:"min(100% - .5rem, 1500px)", borderRadius:"8px"}}>
            <div className="card-body p-0">
                <div className="row" style={{}}>
                    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{background:"var(--theme-orange)", borderRadius:"8px", padding:"8rem 5rem"}}>
                       <h3 className="text-light">{title}</h3>
                    </div>
                    <div className="col-md-9 p-2 p-md-3 pe-md-4 d-flex flex-column justify-content-between">
                        <p className="mx-0  upcoming_text" style={style.text}> {description}</p>
                        <div className="timing d-flex flex-column flex-md-row justify-content-between text-center">
                            <div>
                                <h6 className="fw-bolder">Duration</h6>
                                <p>{duration}</p>
                            </div>
                            <div>
                                <h6 className="fw-bolder">Days</h6>
                                <p>{getDate(startDate)} -{getDate(endDate)}</p>
                            </div>
                            <div>
                                <h6 className="fw-bolder">Timing</h6>
                                <p>{startTime} - {endTime}</p>
                            </div>
                        </div>
                        <div className="text-center text-md-end">
                            <button className="btn" style={{ background:"var(--theme-blue)", color:"#fff"}}>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flag position-absolute" style={style.flag}>
                <p className="mb-0 text-light">{type}</p>
            </div>
        </div>
    )
}


const style ={
    flag:{
        top:0,
        right:0,
        background:"var(--theme-blue)",
        padding:"1.1rem",
        borderTopRightRadius:"8px"
    },
    text:{
        marginRight:"6.5rem",
        fontSize:"17px"
    },

}
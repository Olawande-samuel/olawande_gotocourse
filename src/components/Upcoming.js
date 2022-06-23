import React from 'react'
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

const Upcoming = () => {
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
  
            <SwiperSlide>
                <UpcomingCards />
            </SwiperSlide>
            </Swiper>
          </div>
  
        </div>
      </section>
    )
}

export default Upcoming

const UpcomingCards = ()=> {
    return (
        <div className="card p-0 upcoming_card position-relative mx-auto" style={{width:"min(100% - .5rem, 1500px)", borderRadius:"8px"}}>
            <div className="card-body p-0">
                <div className="row" style={{}}>
                    <div className="col-md-3 d-flex justify-content-center align-items-center" style={{background:"var(--theme-blue)", borderRadius:"8px", padding:"8rem 5rem"}}>
                       <h3 className="text-light">Cybersecurity Bootcamp - Full Time</h3>
                    </div>
                    <div className="col-md-9 p-2 p-md-3 pe-md-4 d-flex flex-column justify-content-between">
                        <p className="mx-0  upcoming_text" style={style.text}> Learn to cybersecurity in 24 weeks of online classes to qualify for jobs paying $78,800 or more. You will pay nothing till you get hired and train through Salesforce programming projects. Prerequisites: There are no requirements of education or work experience. We will first teach you the Admin and App Builder basics and then progress to Salesforce programming.</p>
                        <div className="timing d-flex flex-column flex-md-row justify-content-between text-center">
                            <div>
                                <h6 className="fw-bolder">Duration</h6>
                                <p>24 Weeks</p>
                            </div>
                            <div>
                                <h6 className="fw-bolder">Days</h6>
                                <p>Monday - Friday</p>
                            </div>
                            <div>
                                <h6 className="fw-bolder">Timing</h6>
                                <p>8am - 5pm PST | 11am - 8pm EST</p>
                            </div>
                        </div>
                        <div className="text-center text-md-end">
                            <button className="btn" style={{ background:"var(--theme-blue)", color:"#fff"}}>Apply Now</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flag position-absolute" style={style.flag}>
                <p className="mb-0 text-light">Full Time</p>
            </div>
        </div>
    )
}
const style ={
    flag:{
        top:0,
        right:0,
        background:"var(--theme-orange)",
        padding:"1.1rem",
        borderTopRightRadius:"8px"
    },
    text:{
        marginRight:"6.5rem",
        fontSize:"17px"
    },

}
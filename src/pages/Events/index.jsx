import React from 'react'
import Layout from "../../components/Layout"
import style from "./style.module.css"
import event from "../../images/events/hanging.png"

const Events = () => {
  return (
    <Layout>
        <div className={style.events_wrapper}>
            <div className={style.hero}>
                <div className={style.content_container}>
                    <div className={style.text_content}>
                        <h2>Gotocourse Events</h2>
                        <p>Grow your knowledge, tap into a new skill, or learn how to forge a tech career from scratch.</p>
                    </div>
                    <form className={style.hero_form}>
                        <div className={style.event_search}>
                            <select name="" id="">
                                <option value="">Any Topic</option>
                            </select>
                            <select name="" id="">
                                <option value="">Any Location</option>
                            </select>
                            <select name="" id="">
                                <option value="">Any Date</option>
                            </select>
                            <button className={style.find_button}>Find Event</button>
                        </div>
                    </form>
                    <div className={style.hero_img_wrapper}>
                        <img src={event} alt="" className={style.hero_img} />
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}


function Upcoming(){
    return(
        <div className={style.upcoming_event}>
            <div className={style.upcoming_event_left}>
                <div className={style.upcoming_event_img_wrapper}>
                    <img src="" alt="" />
                </div>
                <div className={style.upcoming_event_text_container}>
                    <h4></h4>
                    <p></p>
                    <div className={style.tags}>
                        <small className={style.tag}>Design</small>
                        <small className={style.tag}>UI/UX</small>
                    </div>
                </div>
            </div>
            <div className={style.upcoming_event_right}>
                <h3>FREE</h3>
                <div className={style.event_details}>
                    <span></span>
                    <span>27 September 2022</span>
                </div>
                <div className={style.event_details}>
                    <span></span>
                    <span>2:00pm</span>
                </div>
                <div className={style.event_details}>
                    <span></span>
                    <span>Online</span>
                </div>
                <button className={style.event_button}>Learn More</button>
            </div>
        </div>
    )
}


export default Events
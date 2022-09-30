import React from 'react'
import Layout from "../../components/Layout"
import style from "./style.module.css"
import event from "../../images/events/hanging.png"
import card from "../../images/events/eventcard.png"
import { IoCalendarSharp } from 'react-icons/io5'
import { AiFillClockCircle } from 'react-icons/ai'
import { BiTargetLock } from 'react-icons/bi'

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
                            <input type="date" name="" id="" />
                            <button className={style.find_button}>Find Event</button>
                        </div>
                    </form>
                    <div className={style.hero_img_wrapper}>
                        <img src={event} alt="" className={style.hero_img} />
                    </div>
                </div>
            </div>
            <div className={style.upcoming}>
                <div className="container">
                    <h3>Upcoming events</h3>

                    <div className={style.upcoming_events}>
                        {[1,2,3,4].map((event, index) => (
                            <Upcoming />
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.ondemand}>
                <div className="container">
                    <h3>On-demand events</h3>
                    <div className={style.ondemand_events}>
                        <Ondemand />
                        <Ondemand />
                        <Ondemand />
                        <Ondemand />
                        <Ondemand />
                        <Ondemand />
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
                    <img src={card} alt="" />
                </div>
            </div>
            <div className={style.upcoming_event_right}>
                <div className={style.upcoming_event_text_container}>
                    <h5>An Introduction to Design Thinking (with Maureen Herben)</h5>
                    <p>Grow your knowledge, tap into a new skill, or learn how to forge a tech career from scratch.</p>
                    <div className={style.tags}>
                        <small className={style.tag}>Design</small>
                        <small className={style.tag}>UI/UX</small>
                    </div>
                </div>

                <div className={style.e_details}>
                    <h6>FREE</h6>
                    <div className={style.event_details}>
                        <span><i><IoCalendarSharp /></i></span>
                        <span>27 September 2022</span>
                    </div>
                    <div className={style.event_details}>
                        <span><i><AiFillClockCircle /></i></span>
                        <span>2:00pm</span>
                    </div>
                    <div className={style.event_details}>
                        <span>
                            <i>
                                <BiTargetLock />
                            </i>
                        </span>
                        <span>Online</span>
                    </div>
                    <button className={style.event_button}>Learn More</button>
                </div>
            </div>
        </div>
    )
}


function Ondemand(){
    return (
        <div className={style.ondemand_card}>
            <div className={style.ondemand_top}>
                <div className={style.ondemand_img_wrapper}>
                    <img src={card} alt="" />
                </div>
            </div>
            <div className={style.ondemand_bottom}>
                <div className={style.ondemand_text_container}>
                    <div className={style.tags}>
                        <small className={style.tag}>Design</small>
                        <small className={style.tag}>UI/UX</small>
                    </div>
                    <h5>An Introduction to Design Thinking (with Maureen Herben)</h5>
                    <p>Grow your knowledge, tap into a new skill, or learn how to forge a tech career from scratch.</p>

                    <div>
                        <button>Watch Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Events
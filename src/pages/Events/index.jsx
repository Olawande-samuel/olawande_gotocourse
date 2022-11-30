import React, { useState } from 'react'
import Layout from "../../components/Layout"
import style from "./style.module.css"
import profile from "../../images/events/profile.png"
import card from "../../images/events/eventcard.png"
import articleimg from "../../images/events/article.png"
import { IoCalendarSharp, IoTimeSharp } from 'react-icons/io5'
import { AiFillClockCircle } from 'react-icons/ai'
import { BiTargetLock } from 'react-icons/bi'
import { FaShareSquare } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { MdMyLocation } from 'react-icons/md'
import { useLocalStorage } from '../../hooks'
import { useAuth } from '../../contexts/Auth'
import { KEY } from '../../constants'
import { useQuery } from '@tanstack/react-query'

const Events = () => {

    const { getItem } = useLocalStorage();
    const [blogs, setBlogs] = useState([])
    let navigate = useNavigate()
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getBlogs } } = useAuth();

    const blogData = useQuery(["fetch blogs"], () => getBlogs(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                // console.log("data", res.data);
                setBlogs(res.data)

            }
        }
    })



    return (
        <Layout>
            <div className={style.events_wrapper}>
                <div className={style.articles}>
                    <div className={style.content_container}>
                        <div className={style.text_content}>
                            <h2>News & Articles</h2>
                            <p>Want to read about Gotocourse? You are in the right place.</p>
                        </div>
                    </div>
                </div>
                <div className={style.article}>
                    <div className={style.articles__container}>
                        {
                           blogs.length > 0 &&   blogs.map((blog, id) => (
                                <Link to={`articles/${blog.title.split(" ").join("-").replace('?','')}/${blog._id}`} className={style.articleitem}>
                                    <div className={style.articleimg}>
                                    <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />

                                    </div>

                                    <div className={style.articleInfo}>
                                        <div className={style.articleTop}>
                                            <span style={{ fontSize: "12px", color: "#4100FA" }}>04.08.22</span>
                                            <FaShareSquare style={{ fontSize: "1.3rem", color: "#0C2191" }} />

                                        </div>
                                        <h4>
                                           {blog.title}
                                        </h4>
                                        <p className="restricted_line" dangerouslySetInnerHTML={{__html: blog.content}}></p>


                                    </div>



                                </Link>

                            ))
                        }

                    </div>


                </div>
                <div className={style.articlebtn}>
                    <button>Read more</button>
                </div>

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
                        {/* <div className={style.hero_img_wrapper}>
                            <img src={event} alt="" className={style.hero_img} />
                        </div> */}
                    </div>
                </div>
                <div className={style.upcoming}>
                    <div className="container">
                        <h3>Upcoming events</h3>

                        <div className={style.upcoming_events}>
                            {[1, 2, 3, 4].map((event, index) => (
                                <Upcoming key={index} id={index} />
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


function Upcoming({ id }) {
    return (
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
                    <button className={style.event_button}>
                        <Link to={`${id}`}>
                            Learn More
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}


function Ondemand() {
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

export function Event() {
   
    return (
        <Layout>
            <div className={`container p-4 ${style.event}`}>
                <div className={style.eventimage}>
                    <img src={card} alt="" />
                </div>

                <div className={style.eventinfo}>

                    <div className={style.eventTop}>
                        <h2>
                            An Introduction to Design Thinking (with Maureen Herben)
                        </h2>
                        <button className={style.event_button}>
                            Register
                        </button>
                        <div className={style.eventTime}>
                            <div>
                                <IoCalendarSharp />
                                <span>27 September 2022</span>
                            </div>
                            <div >
                                <IoTimeSharp />
                                <span>2:00pm</span>
                            </div>

                            <div>
                                <MdMyLocation />
                                <span>Online</span>
                            </div>
                        </div>

                    </div>

                    <div className={style.eventMiddle}>
                        <h2>About This Event</h2>
                        <p>
                            So what exactly is Design Thinking?
                            <hr style={{ height: "0px" }} />

                            And how do I go about using this process in my day-to-day work?
                            <br/>
                            If you’ve been asking yourself these questions, we’ve got the perfect live event for you!
                            <br/>
                            Join Senior Product Designer Maureen Herben as she walks you through the Design
                            <br />
                            Thinking process from start to finish.
                            <br/>
                            You’ll learn exactly what the process involves and in what contexts it is particularly useful.
                            <br />

                            Maureen will also analyze the relationship between UX design and Design Thinking, and discuss real-world case studies that beautifully illustrate the process in action.
                            <br/>
                            All sound a little overwhelming?
                            <br />
                            Don’t worry—this live event is perfect for beginners and pros alike.
                            <br/>
                            We’ll also be having a Q&A at the end to answer all your burning questions.
                            <br/>
                            Look forward to seeing you there!
                        </p>
                    </div>

                    <div className={style.eventBottom}>
                        <h2>FEATURED PRESENTERS</h2>
                        <div className={style.eventProfiles}>
                            {[...Array(2)].map((x, id) => (
                                <div className={style.eventProfile}>
                                    <div className={style.eventprofileimg}>
                                        <img src={profile} alt="" />
                                    </div>
                                    <div className={style.eventprofiletext}>
                                        <p>Amandler- Daesigner at Microsoft</p>
                                        <span>
                                            Grow your knowledge, tap into a new skill, or learn how to forge a tech career from scratch.
                                        </span>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                </div>

            </div>

        </Layout>
    )
}

export default Events
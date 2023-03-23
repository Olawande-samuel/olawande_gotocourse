import React, { useRef, useState } from 'react'
import Layout from "../../components/Layout"
import style from "./style.module.css"
import { IoCalendarSharp, IoTimeSharp } from 'react-icons/io5'
import { AiFillClockCircle } from 'react-icons/ai'
import { BiTargetLock } from 'react-icons/bi'
import { FaShareSquare } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MdMyLocation } from 'react-icons/md'
import { useLocalStorage } from '../../hooks'
import { useAuth } from '../../contexts/Auth'
import { BLOGURL, KEY } from '../../constants'
import { useQuery } from '@tanstack/react-query'
import { ShareModal } from './articles'

const Events = () => {

    const { getItem } = useLocalStorage();
    const [blogs, setBlogs] = useState([])
    const [webinars, setWebinars] = useState([])
    const [open, setOpen] = useState(false)

    let navigate = useNavigate()
    let userdata = getItem(KEY);
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getBlogs, getWebinar, getAWebinar } } = useAuth();

    const blogData = useQuery(["fetch blogs"], () => getBlogs(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                console.log("data", res.data);
                setBlogs(res.data)

            }
        }
    })


    const webinarData = useQuery(["fetch webinar"], () => getWebinar(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                // console.log("webinar data", res.data);
                setWebinars(res.data)

            }
        }
    })

    // console.log({blogRef});

    const ReadMore = () => {
        let div = document.querySelector('.articles__container')
        console.log({ div });
        div.classList.toggle('toggleheight')


    }

    console.log({webinars});

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
                    <div className="articles__container" >
                        {
                            blogs.length > 0 && blogs.map((blog, id) => (
                                <div className={style.articleitem}>
                                    {/* <Link to={`articles/${encodeURIComponent(blog.title)?.split(" ").join("-").replace('?', '').replace("/", "%2F")}/${blog._id}`} className={style.articleitem} key={id}> */}
                                    <a href={`https://blog.gotocourse.com/events&articles/articles/${encodeURIComponent(blog.title)?.split(" ").join("-").replace('?', '').replace("/", "%2F")}/${blog._id}`} key={id} target="_blank" className={style.articleimg}>

                                        <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />

                                    </a>
                                    <div className={style.articleInfo}>
                                        <div className={style.articleTop}>
                                            <span style={{ fontSize: "12px", color: "#4100FA" }}>{new Date(blog.createdAt).toLocaleDateString().split("/").join('.')}</span>
                                            <i><FaShareSquare style={{ color: "#0C2191", fontSize: "1rem", cursor: "pointer" }} onClick={() => setOpen(true)} /></i>

                                        </div>
                                        <a href={`https://blog.gotocourse.com/events&articles/articles/${encodeURIComponent(blog.title)?.split(" ").join("-").replace('?', '')}/${blog?._id}`}>
                                            <h5>{blog.title}</h5>
                                        </a>
                                        <p className="restrict" dangerouslySetInnerHTML={{ __html: blog.content }}></p>


                                    </div>


                                    <ShareModal x={blog} open={open} setOpen={setOpen} url={BLOGURL} />
                                </div>


                            ))
                        }

                    </div>


                </div>
                <div className={style.articlebtn}>
                    <button onClick={ReadMore}>Read more</button>
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
                            {webinars?.length > 0 && webinars?.filter(webinar => (new Date(webinar?.date)) > new Date())?.length > 0 ? webinars.filter(webinar => (new Date(webinar?.date)) > new Date())?.map((event, index) => (
                                <Upcoming key={index} id={index} event={event} />
                            )):
                            <>
                            <p>No Upcoming Events</p>
                            </>
                        
                        
                        }
                        </div>
                    </div>
                </div>

                <div className={style.upcoming}>
                    <div className="container">
                        <h3>Past events</h3>

                        <div className={style.upcoming_events}>
                            {webinars?.length > 0 && webinars?.filter(webinar => (new Date(webinar?.date)) <= new Date())?.map((event, index) => (
                                <Upcoming key={index} id={index} event={event} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={style.ondemand}>
                    <div className="container">
                        <h3>Recorded events</h3>
                        <div className={style.ondemand_events}>
                            {webinars.length > 0 && webinars.map((event, index) => (
                                <Ondemand key={index} id={index} event={event} />
                            ))}


                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}


function Upcoming({ id, event }) {
    console.log({ event });
    return (
        <div className={style.upcoming_event}>
            <div className={style.upcoming_event_left}>
                <div className={style.upcoming_event_img_wrapper}>
                    <img src={`${process.env.REACT_APP_IMAGEURL}${event.webinarImg}`} alt="" />
                </div>
            </div>
            <div className={style.upcoming_event_right}>
                <div className={style.upcoming_event_text_container}>
                    <h5>{event.title}</h5>
                    <p className='restrict'>{event.description}</p>
                    <div className={style.tagsConatiner}>
                        {event.tags.map((e, id) => (
                            <div className={style.tags} key={id}>
                                <small className={style.tag}>#{e}</small>
                            </div>
                        ))}

                    </div>

                </div>

                <div className={style.e_details}>
                    <h6>{event.price === 0 ? "FREE" : event.price}</h6>
                    <div className={style.event_details}>
                        <span><i><IoCalendarSharp /></i></span>
                        <span>{new Date(event.date).toDateString()}</span>
                    </div>
                    <div className={style.event_details}>
                        <span><i><AiFillClockCircle /></i></span>
                        <span>{event.time}</span>
                    </div>
                    <div className={style.event_details}>
                        <span>
                            <i>
                                <BiTargetLock />
                            </i>
                        </span>
                        <span>{event.status}</span>
                    </div>
                    <button className={style.event_button}>
                        <Link to={`${event._id}`}>
                            Learn More
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}


function Ondemand({ event }) {
    return (
        <div className={style.ondemand_card}>
            <div className={style.ondemand_top}>
                <div className={style.ondemand_img_wrapper}>
                    <img src={`${process.env.REACT_APP_IMAGEURL}${event.webinarImg}`} alt="" />
                </div>
            </div>
            <div className={style.ondemand_bottom}>
                <div className={style.ondemand_text_container}>
                    <div className={style.tags}>
                        {/* <small className={style.tag}>Design</small>
                        <small className={style.tag}>UI/UX</small> */}
                    </div>
                    <h5>{event.title}</h5>
                    <p className='restrict'>{event.description}</p>
                    <div className={style.lastbtn}>
                        <button>Watch Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Event() {
    const { id } = useParams()
    const [webinar, setWebinar] = useState({})
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getAWebinar } } = useAuth();

    const webinarData = useQuery(["fetch webinar", id], () => getAWebinar(id), {
        onSuccess: (res) => {
            if (res.data) {
                console.log("data", res.data);
                setWebinar(res.data)

            }
        }
    })

    return (
        <Layout>
            <div className={`container p-4 ${style.event}`}>
                <div className={style.eventimage}>
                    <img src={`${process.env.REACT_APP_IMAGEURL}${webinar.webinarImg}`} alt="" />
                </div>

                <div className={style.eventinfo}>

                    <div className={style.eventTop}>
                        <h2>
                            {webinar.title}
                        </h2>
                        <button className={style.event_button}>
                            Register
                        </button>
                        <div className={style.eventTime}>
                            <div>
                                <IoCalendarSharp />
                                <span>{new Date(webinar.date).toDateString()}</span>
                            </div>
                            <div >
                                <IoTimeSharp />
                                <span>{webinar.time}</span>
                            </div>

                            <div>
                                <MdMyLocation />
                                <span>{webinar.status}</span>
                            </div>
                        </div>

                    </div>

                    <div className={style.eventMiddle}>
                        <h2>About This Event</h2>
                        <p>
                            {webinar.description}
                        </p>
                    </div>

                    <div className={style.eventBottom}>
                        <h2>FEATURED PRESENTERS</h2>
                        <div className={style.eventProfiles}>
                            {webinar?.presenters?.length > 0 && webinar.presenters.map((x, id) => (
                                <div className={style.eventProfile}>
                                    <div className={style.eventprofileimg}>
                                        <img src={`${process.env.REACT_APP_IMAGEURL}${x.presenterImg}`} alt="" />
                                    </div>
                                    <div className={style.eventprofiletext}>
                                        <p>{x.presenterName} </p>
                                        <span>
                                            {x.presenterDesc}                                        </span>
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
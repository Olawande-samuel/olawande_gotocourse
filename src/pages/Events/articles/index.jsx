import React, { useRef, useState } from 'react'
import Layout from '../../../components/Layout'
import style from "../style.module.css"
import articleimg from "../../../images/events/article.png"
import { useQuery } from '@tanstack/react-query'

import { Content, DateAndAction, Header, ImageContainer, MoreLikeThis } from "./style.js"
import { BsCalendarWeekFill } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa'
import { useAuth } from '../../../contexts/Auth'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import SwiperCore, {
    Navigation,
    Autoplay,
    Pagination,
    Scrollbar,
    A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Modal, TextField, Button, Typography } from '@mui/material/';
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    RedditShareButton,
    WhatsappShareButton,
    TwitterIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon,
    EmailIcon,
    RedditIcon,
    WhatsappIcon,
} from "react-share";
import Helmet from 'react-helmet'
import { BLOGURL } from '../../../constants'

const Articles = () => {
    const { id } = useParams()
    // console.log({id});
    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState([])
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getABlog, getBlogs } } = useAuth();

    const blogData = useQuery(["fetch blog", id], () => getABlog(id), {
        onSuccess: (res) => {
            if (res.data) {
                // console.log("data", res.data);
                setBlog(res.data)

            }
        }
    })

    const blogsData = useQuery(["fetch blogs", id], () => getBlogs(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                console.log("data", res.data);
                setBlogs(res.data.filter(d => d._id !== id))

            }
        }
    })


    // SHARE BLOG

    const [open, setOpen] = useState(false)
    function handleShare(e) {
        e.preventDefault();
        setOpen(true)
    }

    return (
        <>
            <Helmet>
                {/* <title>{`${blog?.title?.toUpperCase()} | Gotocourse`}</title> */}
                <meta property="og:site_name" content="Gotocourse" />
                <meta name="description" content="Gotocourse Blogs" />
                <meta property="og:type" content="article" />
                <meta property="og:description" content="Gotocourse Blogs" />
                <meta property="og:title" content={`${blog?.title}| Gotocourse`} />
                <meta property="og:image" content={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} />
                <meta property="og:url" content={`${BLOGURL}/${encodeURIComponent(blog?.title)?.split(" ").join("-").replace('?', '')}/${blog._id}`}/>
            </Helmet>
            <Layout>
                <section className="container py-4">

                    <ImageContainer>
                        <div>
                            <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />
                        </div>
                    </ImageContainer>
                    <Header>
                        <h4 className="text-center">{blog.title}</h4>
                    </Header>
                    <DateAndAction>
                        <span>
                            <i>
                                <BsCalendarWeekFill />
                            </i>
                            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                        </span>
                        <ShareButton data={blog} url={BLOGURL} />

                    </DateAndAction>

                    <MoreLikeThis></MoreLikeThis>
                    <Content>
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />


                    </Content>
                    <MoreLikeThis>
                        <header>
                            <h4>You'll Like These</h4>
                        </header>

                        <section>
                            <LikeThis data={blogs} />

                        </section>
                    </MoreLikeThis>
                </section>
            </Layout>
        </>
    )
}

export function ShareButton({ data, url }) {
    const [open, setOpen] = useState(false)

    function handleShare(e) {
        e.preventDefault();
        setOpen(true)
    }


    return (
        <>
            <span onClick={handleShare}>
                <span>Share</span>
                <i><FaShareSquare /></i>
            </span>
            <ShareModal x={data} open={open} setOpen={setOpen} url={url} />
        </>
    )
}

function LikeThis({ data }) {

    const [open, setOpen] = useState(false)

    function handleClose() {
        setOpen(false)
    }

    function handleShare(e) {
        e.preventDefault()
        setOpen(true)
    }


    const inputRef = useRef()
    function copyText() {

        let copy = inputRef.current.value
        navigator.clipboard.writeText(copy);

        // Alert the copied text
        alert("Copied the text: " + copy);
    }
    return (

        <Swiper
            // install Swiper modules
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            loop={false}
            speed={1500}
            // autoplay={{ delay: 2500 }}
            spaceBetween={0}
            slidesPerView={1}
            // navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            breakpoints={{
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                },
                // when window width is >= 640px
                575: {
                    slidesPerView: 1,
                    spaceBetween: 5,
                },
                700: {
                    slidesPerView: 2,
                    spaceBetween: 5,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 3,
                },
                1704: {
                    slidesPerView: 5,
                    spaceBetween: 3,
                },
            }}
        >
            <div className={style.articles__container}>
                {data?.map((x, i) => (
                    <SwiperSlide key={i}>
                        <div className={style.articleitem}>
                            <Link to={`/events&articles/articles/${x?.title?.split(" ").join("-").replace('?', '')}/${x?._id}`}>
                                <div className={style.articleimg}>
                                    <img src={`${process.env.REACT_APP_IMAGEURL}${x?.blogImg}`} alt="" />

                                </div>
                            </Link>

                            <div className={style.articleInfo}>
                                <div className={style.articleTop}>
                                    <span style={{ fontSize: "12px", color: "#4100FA" }}>{new Date(x?.createdAt).toLocaleDateString()}</span>
                                    <FaShareSquare style={{ fontSize: "1.3rem", color: "#0C2191" }} onClick={handleShare} />

                                </div>
                                <Link to={`/events&articles/articles/${x?.title?.split(" ").join("-").replace('?', '')}/${x?._id}`}>
                                    <h6>
                                        {x?.title}
                                    </h6>
                                </Link>
                                <p className="restrict" dangerouslySetInnerHTML={{ __html: x?.content }}></p>
                                <ShareModal x={x} open={open} setOpen={setOpen} url={BLOGURL} />

                            </div>



                        </div>
                    </SwiperSlide>
                ))}
            </div>
        </Swiper>
    )
}


const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "min(100% - .3rem, 550px)",
    height: 400,
    bgcolor: 'background.paper',
    border: '.5px solid #333',
    boxShadow: 24,
    overflow: "hidden",
    p: 4,
};

export function ShareModal({ x, open, setOpen, url }) {
    const inputRef = useRef()
    function copyText() {

        let copy = inputRef.current.value
        navigator.clipboard.writeText(copy);

        // Alert the copied text
        alert("Copied the text: " + copy);
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="message"
        >
            <Box sx={modalStyle}>
                <div className="boxtop">
                    <h5>Share Post</h5>

                    <Box>
                        <p>Share to: </p>
                        <div>
                            <FacebookShareButton url={`${url}/${encodeURIComponent(x.title)?.split(" ").join("-").replace('?', '')}/${x._id}`}>
                                <FacebookIcon />
                            </FacebookShareButton>
                            <TwitterShareButton url={`${url}/${encodeURIComponent(x.title)?.split(" ").join("-").replace('?', '')}/${x._id}`}>
                                <TwitterIcon />
                            </TwitterShareButton>
                            <LinkedinShareButton url={`${url}/${encodeURIComponent(x.title)?.split(" ").join("-").replace('?', '')}/${x._id}`}>
                                <LinkedinIcon />
                            </LinkedinShareButton>
                            <TelegramShareButton url={`${url}/${encodeURIComponent(x.title)?.split(" ").join("-").replace('?', '')}/${x._id}`}>
                                <TelegramIcon />
                            </TelegramShareButton>
                            <EmailShareButton url={`${url}/${encodeURIComponent(x.title)?.split(" ").join("-").replace('?', '')}/${x._id}`}>
                                <EmailIcon />
                            </EmailShareButton>
                        </div>
                        <div className="d-flex align-items-center mt-3" style={{ gap: "1rem" }}>
                            <input type="text" name="" id="" className="form-control" ref={inputRef} value={`${url}/${encodeURIComponent(x?.title)?.split(" ").join("-").replace('?', '')}/${x._id}`} />
                            <button type="button" onClick={copyText}
                                style={{
                                    border: "none",
                                    outline: "none",
                                    backgroundColor: "var(--theme-blue)",
                                    color: "#fff",
                                    padding: ".5rem",
                                    borderRadius: "8px"
                                }}

                            >Copy</button>
                        </div>
                    </Box>
                </div>
            </Box>
        </Modal>
    )
}
export default Articles
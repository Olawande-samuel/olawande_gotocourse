import React, { useState } from 'react'
import Layout from '../../../components/Layout'
import style from "../style.module.css"
import articleimg from "../../../images/events/article.png"
import { useQuery } from '@tanstack/react-query'

import {Content, DateAndAction, Header, ImageContainer, MoreLikeThis} from "./style.js"
import { BsCalendarWeekFill } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa'
import { useAuth } from '../../../contexts/Auth'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Articles = () => {
    const {id} = useParams()
    console.log({id});
    const [blog, setBlog] = useState({})
    const [blogs, setBlogs] = useState({})
    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: {getABlog, getBlogs } } = useAuth();

    const blogData = useQuery(["fetch classes", id], () => getABlog(id), {
        onSuccess: (res) => {
            if (res.data) {
                console.log("data", res.data);
                setBlog(res.data)

            }
        }
    })

    const blogsData = useQuery(["fetch classes"], () => getBlogs(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                console.log("data", res.data);
                setBlogs(res.data.filter(d => d._id !== id))

            }
        }
    })
  return (
    <Layout>
        <section className="container py-4">
            <Header>
                <h4>{blog.title}</h4>
            </Header>
            <ImageContainer>
                <div>
                <img src={`${process.env.REACT_APP_IMAGEURL}${blog.blogImg}`} alt="" />
                </div>
            </ImageContainer>
            <DateAndAction>
                <span>
                    <i>
                        <BsCalendarWeekFill />
                    </i>
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </span>
                <span>
                    <span>Share</span>
                    <i><FaShareSquare /></i>
                </span>
            </DateAndAction>
            <MoreLikeThis></MoreLikeThis>
            <Content>
            <p  dangerouslySetInnerHTML={{__html: blog.content}}></p>


            </Content>
            <MoreLikeThis>
                <header>
                    <h4>You'll Like This</h4>
                </header>

                <section>
                <div className={style.articles__container}>
                        {
                          blogs.length > 0 && blogs.map((x, id) => (
                                <div className={style.articleitem}>
                                    <Link to={`/events&articles/articles/${x._id}`}>
                                    <div className={style.articleimg}>
                                    <img src={`${process.env.REACT_APP_IMAGEURL}${x.blogImg}`} alt="" />

                                    </div>
                                    </Link>

                                    <div className={style.articleInfo}>
                                        <div className={style.articleTop}>
                                            <span style={{ fontSize: "12px", color: "#4100FA" }}>{new Date(x.createdAt).toLocaleDateString()}</span>
                                            <FaShareSquare style={{ fontSize: "1.3rem", color: "#0C2191" }} />

                                        </div>
                                        {x.title}
                                        <p className="restricted_line" dangerouslySetInnerHTML={{__html: x.content}}></p>


                                    </div>



                                </div>

                            ))
                        }
                    </div>
                </section>
            </MoreLikeThis>
        </section>
    </Layout>
  )
}

export default Articles
import React from 'react'
import Layout from '../../../components/Layout'
import style from "../style.module.css"
import articleimg from "../../../images/events/article.png"

import {Content, DateAndAction, Header, ImageContainer, MoreLikeThis} from "./style.js"
import { BsCalendarWeekFill } from 'react-icons/bs'
import { FaShareSquare } from 'react-icons/fa'

const Articles = () => {
  return (
    <Layout>
        <section className="container py-4">
            <Header>
                <h4>How to modernize queues for the digital-⁠first consumer</h4>
            </Header>
            <ImageContainer>
                <div>
                    <img src={articleimg} alt="" />
                </div>
            </ImageContainer>
            <DateAndAction>
                <span>
                    <i>
                        <BsCalendarWeekFill />
                    </i>
                    <span>04.08.22</span>
                </span>
                <span>
                    <span>Share</span>
                    <i><FaShareSquare /></i>
                </span>
            </DateAndAction>
            <MoreLikeThis></MoreLikeThis>
            <Content>
                <p>
                     At the same time, humans are becoming less patient. Attention spans are declining, and technology is conditioning us to expect instant gratification. During pandemic isolation, we had little else to turn to other than our devices. Technology kept us connected, informed, and entertained. As restrictions lifted and people were let out of their homes, a new consumer base emerged—one still rooted firmly in the digital world.
                </p>

                <p>
                    According to a September 2021 Pew Research Center survey, 90 percent of adults said that the internet has been essential to them personally during the pandemic, and 40 percent said they use digital technology or the internet in a new or different way compared with before the outbreak. When it comes to retail, the numbers are staggering, if unsurprising. According to the most recently released U.S. Census Bureau Annual Retail Trade Survey (ARTS), e-commerce sales increased by 43 percent year-over-year in 2020, reaching $815.4 billion. 
                </p>

                <p>
                    As the online shopping surge dissipates with the strong rebound of brick-and-mortar retail, it’s critical to understand that the modern consumer is forever changed. The pandemic unexpectedly homogenized the consumer base and heightened its collective expectations. Whereas in pre-pandemic times, businesses thought of Millennials and Gen Z as their core digital natives, today, consumers across all age cohorts are digital-first. And with that digital-first consumer mindset comes the expectation of speed and convenience. 
                </p>

                <p>
                    To cater to this transformed population, businesses must rethink archaic modes of queue management because, quite frankly, today’s consumer doesn’t have the time. A recent Waitwhile survey of over 1200 consumers found that most associate waiting in line with boredom, annoyance, frustration, or impatience. The same study found that nearly 70 percent of guests prefer virtual lines.
                </p>

                <p>
                    Yet, most businesses still require their visitors to wait in physical lines or crowded waiting areas, which are inefficient to manage and “tortuous” to stand in. A tech-driven approach to queue management is the perfect solution, as it delivers on consumer expectations for personalized, high-touch experiences and brings additional operational and cost efficiencies to businesses.
                </p>

            </Content>
            <MoreLikeThis>
                <header>
                    <h4>You'll Like This</h4>
                </header>

                <section>
                <div className={style.articles__container}>
                        {
                            [...Array(3)].map((x, id) => (
                                <div className={style.articleitem}>
                                    <div className={style.articleimg}>
                                        <img src={articleimg} alt="" />

                                    </div>

                                    <div className={style.articleInfo}>
                                        <div className={style.articleTop}>
                                            <span style={{ fontSize: "12px", color: "#4100FA" }}>04.08.22</span>
                                            <FaShareSquare style={{ fontSize: "1.3rem", color: "#0C2191" }} />

                                        </div>
                                        <h4>
                                            How to modernize queues for the digital-⁠first consumer
                                        </h4>
                                        <p>
                                            Christoffer Klemming, CEO and co-founder of Waitwhile, shares insights on how companies can boost customer satisfaction using learnings from psychological research.
                                        </p>

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
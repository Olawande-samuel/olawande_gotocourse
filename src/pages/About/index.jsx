import React, { useEffect } from "react";



import clsx from "./styles.module.css";
import Layout from "../../components/Layout";
import wwd from "../../images/wwd1.png";
import mission from "../../images/mission1.png";
import committed from "../../images/about_committed.png";
import pie from "../../images/about_pi.png";


const cardData = [
    {
        icon: <svg width="107" height="104" viewBox="0 0 107 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.61502 0H0V2.61502V67.9906V70.6056H2.61502H67.9906V65.3756H5.23005V5.23005H81.0657V15.6901H86.2958V2.61502V0H83.6808H2.61502ZM83.6808 33.9953C88.0136 33.9953 91.5258 30.4831 91.5258 26.1502C91.5258 21.8174 88.0136 18.3052 83.6808 18.3052C79.3479 18.3052 75.8357 21.8174 75.8357 26.1502C75.8357 30.4831 79.3479 33.9953 83.6808 33.9953ZM78.224 39.2484C78.1283 39.2484 78.0333 39.2499 77.9389 39.2533H73.2207C72.029 39.2533 70.9022 39.7952 70.1577 40.7256L60.8754 52.3284H47.0704C44.9041 52.3284 43.1479 54.0847 43.1479 56.251C43.1479 58.4175 44.9041 60.1735 47.0704 60.1735H62.7606C63.9522 60.1735 65.079 59.6319 65.8235 58.7015L70.8229 52.4521V99.0906C70.8229 101.441 72.7466 103.365 75.0975 103.365C77.4484 103.365 79.372 101.441 79.372 99.0906V77.7185H87.9208V99.0906C87.9208 101.441 89.8444 103.365 92.1953 103.365C94.5462 103.365 96.4698 101.441 96.4698 99.0906V67.3217C98.8207 67.3217 106.08 62.8469 106.08 51.8279C106.08 43.5229 98.8207 39.2484 96.4698 39.2484H78.224Z" fill="#F75C4E" />
        </svg>,
        bgColor: "#FFD1CD",
        color: "#F75C4E",
        content: "Learning involves two parties; the teacher and the student. We provide a platform where students can access quality certificate courses needed to build high in-demand technical skills without the barriers of costs or location."
    },
    {
        icon: <svg width="107" height="85" viewBox="0 0 107 85" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.4762 58.3439C34.08 58.3439 33.6839 58.4019 33.306 58.5245C31.1579 59.2223 28.8987 59.6699 26.5202 59.6699C24.1417 59.6699 21.8825 59.2223 19.7328 58.5245C19.3548 58.4019 18.9604 58.3439 18.5642 58.3439C8.2778 58.3439 -0.0544296 66.7109 0.000267765 77.0106C0.0234727 81.3632 3.60201 84.8638 7.95625 84.8638H45.0842C49.4384 84.8638 53.0169 81.3632 53.0401 77.0106C53.0948 66.7109 44.7626 58.3439 34.4762 58.3439ZM26.5202 53.0399C35.3082 53.0399 42.4322 45.916 42.4322 37.1279C42.4322 28.3399 35.3082 21.2159 26.5202 21.2159C17.7322 21.2159 10.6082 28.3399 10.6082 37.1279C10.6082 45.916 17.7322 53.0399 26.5202 53.0399ZM98.124 0H34.4762C30.0888 0 26.5202 3.68793 26.5202 8.21952V15.912C30.4021 15.912 33.9955 17.0357 37.1282 18.8623V10.608H95.472V58.3439H84.8641V47.7359H63.6481V58.3439H51.0114C54.1772 61.1102 56.501 64.7633 57.59 68.9518H98.124C102.511 68.9518 106.08 65.2639 106.08 60.7323V8.21952C106.08 3.68793 102.511 0 98.124 0V0Z" fill="#56B93F" />
        </svg>,
        bgColor: "#DDFFC2",
        color: "#56B93F",
        content: "We partner with Top-notch industry experts and Mentors to deliver the quality learning experience needed to make your career advancement or change journey seamless."
    },
    {
        icon: <svg width="107" height="107" viewBox="0 0 107 107" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100.047 84.7977C101.605 83.5711 102.6 81.6882 102.6 79.5666C102.6 77.1931 101.353 75.1113 99.4769 73.9378L99.4504 35.3379L92.8204 39.78V73.9245C90.9441 75.1179 89.7176 77.1865 89.7176 79.5401C89.7176 81.6352 90.6922 83.5048 92.2105 84.7248L89.7043 88.053C87.5628 90.7713 86.2501 94.2256 86.1904 97.9848V106.087H91.5607H91.5939C94.3188 106.087 96.6128 104.217 97.2493 101.684L99.4438 92.8266V106.087H106.074V98.0643C106.014 94.2919 104.701 90.8376 102.533 88.0862L100.047 84.7977Z" fill="#000F62" />
            <path d="M53.04 0L0 26.52L53.04 59.67L106.08 26.52L53.04 0Z" fill="#000F62" />
            <path d="M53.0396 66.2986L19.8896 44.2207V55.558C19.8896 61.5913 39.3818 79.5586 53.0396 79.5586C66.6974 79.5586 86.1896 61.5913 86.1896 55.558V44.2207L53.0396 66.2986Z" fill="#000F62" />
        </svg>,
        bgColor: "#CAEDFF",
        color: "#000F62",
        content: "We offer borderless and self-paced training with a tailor-made flexible learning experience for each of our students ensuring you can upskill in the shortest period of time regardless of your engagements."
    },
]


const About = () => {
    useEffect(() => {
        console.log("About page is mounted");
        return () => console.log("About page is unmounted");
    }, [])



    return (
        <Layout>
            <div className={clsx.about}>
                <div className={clsx.about_jumbotron}>
                    <div className={clsx.about_top__absolute}>
                        <header>
                            <h1>About us</h1>
                            {/* <hr /> */}
                        </header>
                        <svg viewBox="0 0 1512 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M-3 0H1527L1547 123.324C1547 123.324 1072.56 179.886 767 180C455.728 180.115 -3 123.324 -3 123.324V0Z" fill="#F75C4E" fill-opacity="0.54" />
                            <path d="M-3 0H1527L1547 112.978C1547 112.978 1072.56 164.795 767 164.899C455.728 165.005 -3 112.978 -3 112.978V0Z" fill="#0C2191" fill-opacity="0.83" />
                        </svg>

                    </div>
                </div>

                <div className={clsx.believe}>
                    <h1>We believe in <br />learning without limit</h1>
                    <div className={clsx.believe_cards}>

                        {
                            cardData.map((data, i) => (
                                <BelieveCard key={i} {...data} />
                            ))
                        }
                    </div>
                </div>
                <div className={clsx.do}>
                    <div className="container-xxxl mx-auto">
                        <div className={clsx.do__content}>

                            <div className={clsx.do__img}>
                                    <img src={wwd} alt="Mission" />

                            </div>

                            <div className={clsx.do__text}>
                                <h2>What we do</h2>
                                <p>
                                    Gotocourse is a platform that connects tech educators with learners.  Our platform has incredible tools for managing and organizing learning. We are leaders in connecting learners and instructor in virtual instructor-led training platform. Our  goal of virtual training settings is to replicate the traditional classroom or learning experience and this we have done successfully without limits.                    </p>

                            </div>

                        </div>

                    </div>

                </div>

                <div style={{ backgroundColor: " rgba(255, 241, 240, 0.5)" }}>
                    <div className="container-xxl mx-auto">
                        <div className={clsx.mission}>
                            <div className={clsx.mission_left}>
                                <h2>Our Mission</h2>
                                <p>
                                Creating accessibility to quality tech education to anyone, anywhere in order to create life long learning and bridge the skills gap in the tech industry.                                 </p>
                            </div>
                            <div className={clsx.mission_right}>
                                <img src={mission} alt="Mission" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={clsx.committed}>
                    <div className="container-xxxl mx-auto">
                        <h2>Why are we committed to this?</h2>
                        <div className={clsx.commited_content}>
                            <div className={clsx.content_left}>
                                <p>The tech skills gap is decimating the global workforce, putting workers and companies at risk, the gap keeps widening by the day. The world is advancing and professionals need to Upskill and Reskill to increase their knowledge, productivity on their jobs and take advantage of more lucrative professional opportunities in their chosen career path.</p>
                                <p>Seeing this gap, and the frustration of long training duration coupled with high tuitions charged by traditional institutions and tech bootcamps faced by students, our commitment lies in imparting you with the necessary high-in-demand skills needed to land the high-paying job you so desire, with a plethora of tutors and mentors committed to your growth within the shortest period of time at a convenient cost.</p>
                            </div>
                            <div className={clsx.content_right}>
                                <img src={committed} alt="Commited" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={clsx.transform}>
                    <div>
                        <h2>Transforming lives, Businesses, and Nations through Tech skills training</h2>
                    </div>
                </div>

                <div className={clsx.committed}>
                    <div className="container-xxxl mx-auto">
                        <h2>Our Customer Demography</h2>
                        <div className={clsx.commited_content}>
                            <div className={clsx.mission_left} style={{ justifyContent: 'center' }}>
                                <p>Gotocourse targets offering training and mentorship to at least one million College graduates, Professionals who wants to Upskill and all Others looking to re-skill in tech to land high-paying tech jobs by 2027.</p>
                            </div>
                            <div className={clsx.content_right}>
                                <img src={pie} alt="Demography" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}



function BelieveCard({ icon, color, bgColor, content }) {
    return (
        <div className={clsx.believe_card} style={{ backgroundColor: bgColor }}>
            <div className={clsx.card_icon}>
                {icon}
            </div>
            <div className={clsx.card_body}>
                <p style={{ color }}>{content}</p>
            </div>
        </div>
    )
}
export default About
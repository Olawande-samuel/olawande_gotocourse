import {useEffect} from "react";


import clsx from "./styles.module.css";
import Layout from "../../components/Layout";


import commitment from "../../images/careers/commitment.png";
import benefit from "../../images/careers/benefits.png";
import knowledge from "../../images/careers/knowledge.png";
import teaching from "../../images/careers/teaching.png";
import { Link } from "react-router-dom";
import tick from "../../images/student/check.png";



const Career = () => {



    return (
        <Layout>
            <div className={clsx.career_container}>
                <CareerHero />
                <JobOpening />
                <Commitment />
                <Benefit />
                <Become />
            </div>
        </Layout>
    )
}


function CareerHero(){
    return (
        <div className={clsx.career_Hero}>
            <div className={clsx.career_hero_content}>
                <h1>Grow</h1>
                <h1>With Us</h1>
                <h4>Would you love to join our team?</h4>
            </div>
        </div>
    )
}

function JobOpening(){
    const jobs = ["Social Media Manger", "Virtual Assistant", "Product Markerter"]
    return (
        <div className={clsx.job_opening}>
            <div className="container-xxxl mx-auto">
                <div className={clsx.career_header}>
                    <h2>JOB OPENINGS</h2>
                    <h5 className={clsx.career_header_subtitle}>Would you love to join our team?</h5>
                </div>

                <div className={clsx.job_opening_jobs}>
                    {
                        jobs.map(job=>(
                            <div className={clsx.job_opening_card}>
                                <p>{job}</p>

                                <div className="text-center">
                                    <button>Apply now</button>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}


export function TextCard({header, img, children}){
    return (
        <div className="container">
            <div className={clsx.text_card}>
                <div className={clsx.img_container}>
                    <img src={img} alt="" className={clsx.text_card_img} />
                </div>
                <div className={clsx.text_content}>
                    <header className={clsx.career_header}>
                        <h2>{header}</h2>
                    </header>
                    {children}
                </div>
            </div>
        </div>
    )
}
function Commitment(){

    return(
        <div className={clsx.commitment}>
            <TextCard
                header="OUR COMMITMENTS"
                img={commitment}
            >
                <div className={clsx.commitment_text}>
                    <p>
                    Gotocourse is committed to empowering individuals with high in-demand skills necessary for this tech-savvy Era. Our team consists of problem-solving, passionate, and tech-savvy individuals who deliver quality educational experiences for our students to move the whole organization's vision forward. If you think you are the one we are looking for, we would love to meet you.
                    </p>
                </div>
            </TextCard>
        </div>
    )
}



function Benefit(){
    return (
        <div className={clsx.benefit}>
            <TextCard
                header="OUR CULTURE AND BENEFIT"
                img={benefit}
            >
                <div className={clsx.benefit_text}>
                    <div className={clsx.benefit_list_container}>
                        <p className={clsx.benefit_list}><img src={tick} alt="Tick" /> Our work culture plays an important role in bringing out the best out of our employees <br />
                        <ul>
                            <li>Employee friendly polices</li>
                            <li>Recognition of top performers</li>
                            <li>Team bonding</li>
                        </ul>
                        </p>
                        <p className={clsx.benefit_list}><img src={tick} alt="Tick" />Our Core Values inform how employees conduct their life both personally and professionally <br />
                        <ul>
                            <li>Innovation</li>
                            <li>Growth</li>
                            <li>Service</li>
                            <li>Impact</li>
                            <li>Self-Improvement</li>
                        </ul>
                        </p>
                        <p className={clsx.benefit_list}><img src={tick} alt="Tick" />Benefits of working at Gotocourse <br />
                        <ul>
                            <li>Gotocourse is one of the best places for you to start and advance your career within a short period and get hands-on skills relevant in today’s workplace as an employee</li>
                        </ul>
                        </p>
                    </div>
                </div>
            </TextCard>
        </div>
    )
}


function Become (){

    const data = [
        {
            id: 1,
            title:"Sharing Knowledge",
            content:"We have a top-notch teaching platform where you can share knowledge seamlessly with your students.",
            img:knowledge
        },
        {
            id: 2,
            title:"Teaching Opportunities",
            content:"You can choose to teach with us, either Part-time of Full-time.",
            img:teaching
        }
    ]
    return(
        <div className={clsx.become}>
            <div className="container">
                <div className={clsx.career_header}>
                    <h2>BECOME A TEACHER</h2>
                </div>
                
                <div className={clsx.become_content}>
                    {
                        data.map(item => (
                            <BecomeCard {...item} />
                        ))
                    }
                    
                </div>
                <div className="text-center mt-3">
                    <Link to="/become-a-teacher" className="d-inline-block">
                        <button>Apply now</button>
                    </Link>
                </div>
            </div>

        </div>

    )
}

function BecomeCard({title, content, img}){
    return (
        <div className={clsx.become_card}>
            <img src={img} alt="" />
            <div className={clsx.become_card_content}>
                <h4 className="text-center fw-bold">{title}</h4>
                <p className="text-center">{content}</p>
            </div>
        </div>
    )
}
export default Career;
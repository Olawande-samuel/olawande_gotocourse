import React from 'react'
import Learning from "../../images/anywhere.png";
import Inperson from "../../images/in-Person.webp"
import Mento from "../../images/inPerson.webp";
import Tech from "../../images/fast.webp";
import { Link } from 'react-router-dom';

const BetterWay = () => {

    const data = [
        {
            title: "Learn with a cohort",
            content:"Join a classroom to take instructor led training, do projects with learning partners, take quizzes, and build work related portfolio",
            img: Learning
        },
        {
            title: "Self-paced Learning",
            content:"Self-paced courses that allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional responsibilities.",
            img:Tech
        },
        {
            title: "One-On-One Mentorship",
            content:"Challenge yourself with a one-on-one mentorship session with industry experts and professionals and grow your career.",
            img:Mento
        },
        {
            title: "In-person Training",
            content:"Learn from experts by joining us in any of our physical locations",
            img: Inperson
        },
    ]

    const stay = [
        // {
        //     title:"Gotocourse promotes a better way to learn ",
        //     content:"Our courses are designed with you in mind and built around proven learning principles with real-life application, top-of-the-range technology, and fully immersive exchange with industry experts; everything you need to start and advance your career in tech."
        // },
        {
            title:"Learn and study on a flexible schedule",
            content:"Be in charge of your time, learn and study at your own preferred time without the limitation of fixed lessons and physical classrooms. Set your career goals and milestone and get started on building a great career you will be proud of."
        },
        {
            title:"Learn with a cohort",
            content:"Join a classroom to take instructor led training, do projects with learning partners, take quizzes, and build work related portfolio"
        },
        {
            title:"Self-paced Learning",
            content:"Self-paced courses that allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional responsibilities."
        },
        {
            title:"One-On-One Mentorship",
            content:"Challenge yourself with a one-on-one mentorship session with industry experts and professionals and grow your career."
        },
    ]
  return (
    <div className='betterway'>
        <div className="container">
            {/* <header>
                <h4>Gotocourse promotes a better way to learn</h4>
                <p className="subtitle">All courses are designed with you in mind and built around proven learning principles with real-life application, top-of-the-range technology, and fully immersive exchange with industry experts; everything you need to start and advance your career in tech.</p>
            </header> */}
            <div className="stay">
                
                <div className="stay_right anyright">
                    <h6>Gotocourse Business</h6>
                    <p>Upskill your team to improve your teams productivity</p>
                    <ul>
                        <li>Take advantage of Gotoocurse White-label interactive LMS</li>
                        <li>A fully white-label LMS that lets you completely customize your learning academy to match your brand and create a seamless experience for your customers.</li>
                        <li>Rapidly deploy training for in-demand skills</li>
                    </ul>
                    <div className="btn_wrapper">
                        <Link to="/signup" className="d-inline-flex">
                            <button>Contact sales</button>
                        </Link>
                    </div>
                </div>

                <div className="stay_left anywhere">
                    <img src={Learning} alt="" />
                </div>
            </div> 
        </div>
    </div>
  )
}
{/* <ul>
{
    stay.map((item, i) => (
        <Cards {...item} key={i}  />
    ))
}
</ul> */}
{/* <div className="betterway_learning_models">
{
data.map((data, i)=>(
    <Models {...data} key={i} />
))
}
</div> */}

function Cards({title, content}){
    return (
        <li className="betterway_card mb-3">
            <header>
                <h5>{title}</h5>
            </header>
            <p>{content}</p>
        </li>
    )
}

function Models({img, title, content}){
    return (
        <div className="models">
            <div className="model_left">
                <img src={img} alt="" />
            </div>
            <div className="model_right">
                <header>
                    <h5>{title}</h5>
                </header>
                <p>{content}</p>
            </div>
        </div>
    )
}


export default BetterWay
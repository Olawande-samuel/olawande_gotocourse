import React from 'react'

import Layout from "../../../components/Layout";
import style from "./style.module.css";

import hero from "../../../images/business/biz_hero.png";
import progress from "../../../images/business/trackprogress.png"
import { Stats } from '../../../components/NewLanding/NewLanding';
import live from "../../../images/business/live.png"
import quality from "../../../images/business/quality.png"
import tool from "../../../images/business/best_tool.png"
import skill from '../../../images/business/skill.png';
import custom from "../../../images/degree.png"
import pro1 from "../../../images/business/profile1.png"
import pro2 from "../../../images/business/profile2.png"
import pro3 from "../../../images/business/profile3.png"

const Business = () => {
  return (
    <Layout>
      <div className={style.business}>
        <Hero />
        <SuccessStory />
        <TrackProgress />
        <Quality />
        <LiveClasses />
        <Benefits />
        <Testimonial />
        <BestTool />
        <Skill />
        <Customized />
        <BestFeature />
      </div>
    </Layout>
  )
}


function Hero(){
  const data = {
    title: "All-in-one employee training platform",
    text: "We designed Gotocourse to provide an amazing user experience, so employees remain engaged, keeping completion rates where you need them to be.",
    cta: "Create free account",
    img:hero
  }
  return (
    <section className={style.business_hero}>
      <TwoColumnLayout {...data} />
    </section>
  )
}

function TwoColumnLayout({title, text, cta, img}){
  return (
    <div className="container h-100">
      <div className={style.two_col}>
        <div className={style.col_left}>
            <h1>{title}</h1>
            <p>{text}</p>
            <div>
              <button className={style.button}>{cta}</button>
            </div>
        </div>
        <div className={style.col_right}>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  )
}


function SuccessStory(){
  return (
      <section className={style.success}>
        <div className="container">
          <header className={style.success_header}>
            <h2 className={style.success_h2}>Our success story speaks for itself</h2>
            <p>Get ahead with expert led training</p>
          </header>
          <Stats />
        </div>
      </section>
  )
}
function TrackProgress(){
  const data = {
    title: "Track progress via student, teacher and admin dashboards",
    text: "Let employees choose how they want to learn—at their own pace, on a schedule with a group of peers, or both.",
    cta: "Register now",
    img:progress

  }
  return (
    <section className={style.track_progress}>
      <TwoColumnLayout {...data} />
    </section>
  )
}

function Quality(){
  return(
    <section className={style.quality}>
      <div className="container h-100">
        <div className={style.two_col}>
          <div className={style.col_left}>
              <h1>A platform to enable quality learning experience for all employees and participants</h1>
              <p>We are a Technology Workforce Development company that helps people learn premium technology skills virtually and invest in workforce development.</p>
              <div>
                <button className={style.button}>Create an account</button>
              </div>
          </div>
          <div className={style.col_right}>
              <OneSize />
          </div>
        </div>
    </div>
    </section>
  )
}
function OneSize(){
  return(
    <article className={style.one_size}>
      <div className={style.one_size_top}>
        <h5>This is not a one size fit all platform</h5>
        <p>Enable learning mode for participants</p>
      </div>
      <div className={style.one_container}>
        <div className={style.one_img}>
          <img src={quality} alt="" />
        </div> 
        <div className={style.one_list}>
          <ul>
            <li>Learn with cohort</li>
            <li>Self paced learning</li>
            <li>One-on-one mentorship</li>
          </ul>
        </div>
      </div>
    </article>
  )
}


function LiveClasses(){
  const data = {
    title:"All within the Gotocourse paltform, participants are able to join live classes from anywhere and across devices.",
    text:"We are a Technology Workforce Development company that helps people learn premium technology skills virtually and invest in workforce development.",
    cta:"Start now",
    img:live
  }
  
  return (
    <section className={style.live_classes}>
          <TwoColumnLayout {...data} />
    </section>
  )
}

function Benefits(){
  const data = [
    {
      id:1,
      title:"Collaborative learning",
      content:"Staffs are able to work with like minds on case studies and projects while promoting life long learning experinece and enhanced productivity.",
    },
    {
      id:2,
      title:"Access to course library",
      content:"Tutirs are able to provide library of courses in different formats in other to promote flexible and quality learning oppurtunity for staff members.",
    },
    {
      id:1,
      title:"User friendly tools for creating courses",
      content:"Tutors have acces to creator suite to create courses, schedule instructed led live classes, chat and send messages to students, create quizez and assesment with ease, upload learning materials via the class console, set deadlines for project submissions, e.t.c",
    },
  ]
  return(
    <section className={style.biz_benefits}>
      <div className="container h-100">
        <div className={style.biz_benefits_container}>
          <div>
            <header>
              <h1>Benefits of learning with Gotocourse</h1>
            </header>
            {
              data.map((item, i)=>(
                <BenefitsCard {...item} key={i} />

              ))
            }
          </div>
          <div></div>
        </div>
      </div>
    </section>
  )
}

function BenefitsCard({title, content}) {
  return (
    <div className={style.biz_benefits_card}>
      <h5>{title}</h5>
      <p>{content}</p>
    </div>
  )
}

function Testimonial(){

  const data = [
    {
      name:"Joke Silva",
      testimonial:"The Gotocourse platform has made training our employees seamless and borderless, making it possible to train staff members from anywhere and track their progress on every activity. We recommend Gotocourse platform for any organisation looking at borderless and seamless training solutions for their employees.",
      img: pro1

    },
    {
      name:"Judd Peter",
      testimonial:"Our experience with staff training on Gotocourse has been great, they provide an easy way to train staff members, track their progress and carry out assessment. The platform is easy to use and the user experience is amazing",
      img: pro2

    },
    {
      name:"Esther Jacob",
      testimonial:"The platform has different tools that makes teaching and learning easier, the effort of the team is commendable in creating such a great ambience for learning, employees can join live trainings and also learn at their own pace by accessing materials in the course library.",
      img: pro3

    },
  ]
  return (
    <section className={style.biz_testimonial}>
      <div className="container h-100">
        <header className="text-center">
          <h2>What clients say about Gotocourse</h2>
          <p>Allow your employees take control of your career path and position yourself for advancement</p>
        </header>
        <div className={` row ${style.test_cards}`}>

          {
            data.map((item, i)=> (
              <TestimonialCard{...item} key={i} />

            ))
          }
        </div>
  
      </div>
    </section>
  )
}

function TestimonialCard({name, testimonial, img}){
  return(
    <div className="col-sm-6 col-md-4 px-2 h-100">
      <div className={`${style.testimonial_card}`}>
        <div className={style.test_card_top}>
          <div  className={style.testimonial_profile}>
            <img src={img} alt="" />
          </div>
          <p className='fw-bold'>{name}</p>
        </div>
        <p>{testimonial}</p>
      </div>
    </div>
  )
}


function BestTool(){
  const data = {
    title:"The best tool for employee learning is Gotocourse, The best time to get started is now.",
    text:"A well informed employee is a valuable employee",
    cta: "Request quote",
    img:tool
  }
  return (
    <section className={style.best_tool}>
      <TwoColumnLayout {...data} />
    </section>
  )
}

function Skill(){
  const data = {
    title:"Upskill, Cross-skill and Reskill",
    text:"Help your staff stay up to date with the necessary skills and knowledge to solve day to day business problems.",
    cta: "Request quote",
    img:skill
  }
  return(
    <section className={style.biz_skill}>
      <TwoColumnLayout {...data} />
    </section>
  )
}





function Customized(){


const data = {
  title:"Customize to fit your use",
  text:"Help your staff stay up to date with the necessary skills and knowledge to solve day to day business problems.",
  cta:"none",
  img:custom

}

  return (
    <section className={style.customise}>
      <TwoColumnLayout {...data} />
    </section>
  )
}


function BestFeature(){
  return(
    <section className={style.best_feature}>
      <div className="container">
        <header>
          <h4>Best features that enable great learning experience with Gotocourse:</h4>
        </header>
          <div className={style.best_list}>
            <ul>
              <li>Live class</li>
              <li>Creator suite</li>
              <li>School customization</li>
              <li>Chat and email students</li>
            </ul>
            <ul>
              <li>Community management</li>
              <li>self paced learning with recorded classes</li>
              <li>Classroom console</li>
              <li>Library of recorded classes</li>
            </ul>
            <ul>
              <li>Chat and email address</li>
              <li>Library of recorded classes</li>
              <li>Student, teacher and admin dashboard</li>
              <li>Set Project and quiz deadline</li>
            </ul>
          </div>
          <div className="text-center">
            <button>Get Started</button>
          </div>
      </div>
    </section>
  )
}
export default Business
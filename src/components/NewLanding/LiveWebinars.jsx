import React from 'react'
import styled from 'styled-components'
import { ClassTypeComponent, LiveWebinarCard } from './landingComponents'
import blockChain from "../../images/landing/executive/Blockchain.webp"
import social from "../../images/landing/executive/socialAttack.webp"
import techCareer from "../../images/landing/executive/tech_career.webp"
const Grid = styled.div`
    display: grid;
    gap: 1rem;
    place-items:center;

     @media screen and (min-width:500px){
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        justify-content: space-around;
    }
    
    /*
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
    `
const LiveWebinars = () => {
  return (
    <ClassTypeComponent {...data}>
        <div className="container">
            <Grid>
                {
                    data.content.map(item=>(
                        <LiveWebinarCard {...item} />
                    ))
                }
            </Grid>
        </div>
    </ClassTypeComponent>
  )
}

const data = {
    header: "",
    header2:"Upcoming live webinars",
    subtext:"Join our insightful webinars from leading practitioners",
    content: [
        {
            id:1,
            title:"How to own your career in technology",
            date:"Dec 3 ,2022",
            time:"10am CST",
            img:techCareer,
            description:"Technology Industry is changing rapidly and a lot of transformation happens every 3 years. People are expected to work with the pace of change that occurs. In this webinar, the discussion will be about how we adapt to the pace and intensity in which the change happens. The webinar will focus on how much one needs to learn, what are the different areas to pursue within the industry, and how do we cope up and work collaboratively for growth.",
            list:[
                "How to adapt to the changes",
                "How to sense and identify the opportunities",
                "How do we cope up with bias and overcome challenges",
                "Connecting with the right people",
                "Recognising and utilizing inherent qualities of multi-tasking, ability to change the focus as per need/situation",
                "Use of smart technologies for better utilization of time, boost productivity, and manage stress",
            ]
        },
        {
            id:2,
            title:"Blockchain as a career option",
            date:"Dec 5, 2022",
            time:"3pm CST",
            img: blockChain,
            description:"As a lot of young talent is deciding their next career move, Bhooma will discuss what is the future of Blockchain and distributed technologies. She will also discuss the kind of demand she is seeing in the market and what are the skill sets that are most relevant to her clients. Blockchain is still an emerging technology with a steep learning curve and aspirants have to be ready to pick up new skills. ",
            list:[
                "Blockchain as a technology is evolving very fast and you will never have learnt it all",
                "Functional and business knowledge is extremely important to solve real-world challenges",
                "How to identify which Blockchain platform to focus on",
                "Choosing between a big company and a start-up when working with Blockchain",

            ]
        },
        {
            id:3,
            img: social,
            title:"How to Prevent Social Engineering Attacks ",
            date:"Nov 6, 2022",
            time:"10am CST",
            description:"Social engineering accounts for 57% of cyberattacks on small businesses inferring that such attacks are on the rise. Social engineering is one of the most common ways hackers get access to your company's network, and it is crucial for businesses to know how to prevent them.",
            list:[
                "The occurrence of a social engineering attack.",
                "The most common types of social engineering attacks and how they work. ",
                "Ways to recognize the signs of a social engineering attack and the steps to prevent it."
            ]
        },
    ]
}
export default LiveWebinars
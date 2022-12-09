import React, { useState } from 'react'
import styled from 'styled-components'
import { ClassTypeComponent, LiveWebinarCard } from './landingComponents'
import blockChain from "../../images/landing/executive/Blockchain.jpeg"
import social from "../../images/landing/executive/socialAttack.jpeg"
import techCareer from "../../images/landing/executive/tech_career.jpeg"
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/Auth'
const Grid = styled.div`

    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(280px,300px), 300px));
    grid-auto-rows: 290px;
    overflow: hidden;
    gap: 1em;
    justify-content:space-around;
    padding: .5rem;
    
    @media screen and (min-width: 1500px) {
        grid-template-columns: repeat(4, 350px);
        justify-content: space-evenly;
        gap: 1rem;
    }
    
    @media screen and (max-width:768px){
        grid-template-columns: repeat(2, 300px);
    }

    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
    `
const LiveWebinars = () => {
    const [webinars, setWebinars] = useState([])

    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getWebinar, getAWebinar } } = useAuth();
    let navigate = useNavigate()

    const webinarData = useQuery(["fetch webinar"], () => getWebinar(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                console.log("webinar data", res.data);
                setWebinars(res.data)

            }
        }
    })
    return (
        <ClassTypeComponent {...data}>
            <div className="container">
                <Grid>
                    {/* {
                        data.content.map(item => (
                            <LiveWebinarCard {...item} />
                        ))
                    } */}



                    {
                        webinars.length > 0 && webinars.map(item => (
                            <LiveWebinarCard {...item} key={item._id} />
                        ))
                    }
                </Grid>
            </div>
        </ClassTypeComponent>
    )
}

const data = {
    header: "",
    header2: "Upcoming live webinars",
    subtext: "Join our insightful webinars from leading practitioners",
    content: [
        {
            id: 1,
            title: "How to own your career in technology",
            date: "Dec 3 ,2022",
            time: "10am CST",
            img: techCareer,
            description: "Technology Industry is changing rapidly and a lot of transformation happens every 3 years. People are expected to work with the pace of change that occurs. In this webinar, the discussion will be about how we adapt to the pace and intensity in which the change happens. The webinar will focus on how much one needs to learn, what are the different areas to pursue within the industry, and how do we cope up and work collaboratively for growth.",
            list: [
                "How to adapt to the changes",
                "How to sense and identify the opportunities",
                "How do we cope up with bias and overcome challenges",
                "Connecting with the right people",
                "Recognising and utilizing inherent qualities of multi-tasking, ability to change the focus as per need/situation",
                "Use of smart technologies for better utilization of time, boost productivity, and manage stress",
            ]
        },
        {
            id: 2,
            title: "Blockchain as a career option",
            date: "Dec 5, 2022",
            time: "3pm CST",
            img: blockChain,
            description: "As a lot of young talent is deciding their next career move, Bhooma will discuss what is the future of Blockchain and distributed technologies. She will also discuss the kind of demand she is seeing in the market and what are the skill sets that are most relevant to her clients. Blockchain is still an emerging technology with a steep learning curve and aspirants have to be ready to pick up new skills. ",
            list: [
                "Blockchain as a technology is evolving very fast and you will never have learnt it all",
                "Functional and business knowledge is extremely important to solve real-world challenges",
                "How to identify which Blockchain platform to focus on",
                "Choosing between a big company and a start-up when working with Blockchain",

            ]
        },
        {
            id: 3,
            img: social,
            title: "How to Prevent Social Engineering Attacks ",
            date: "Nov 6, 2022",
            time: "10am CST",
            description: "Social engineering accounts for 57% of cyberattacks on small businesses inferring that such attacks are on the rise. Social engineering is one of the most common ways hackers get access to your company's network, and it is crucial for businesses to know how to prevent them.",
            list: [
                "The occurrence of a social engineering attack.",
                "The most common types of social engineering attacks and how they work. ",
                "Ways to recognize the signs of a social engineering attack and the steps to prevent it."
            ]
        },
    ]
}
export default LiveWebinars
import React from 'react'
import styled from 'styled-components'
import { SuccessCard } from './landingComponents'
import Meetifix from "../../images/landing/icons/Meetifix.png"
import Rekordia from "../../images/landing/icons/Rekordia.png"
import Quikonnet from "../../images/landing/icons/Quikonnet.png"
import Classpodia from "../../images/landing/icons/Classpodia.png"
import Quizim from "../../images/landing/icons/Quizim.png"


const SuccessWrapper = styled.section`
    padding-block:2rem;

    > .container > header {
        margin-bottom: 1.5rem;
        text-align: center;
        
        h2 {
            color:var(--theme-blue);
            font-weight:700;
        }
    }

    .best_training {
        header {
            margin-bottom: .1rem;

            h4 {
                font-weight:700;
                color: var(--theme-blue);
            }
        }
    }

    .best_cards {
        display: flex;
        flex-wrap:wrap;
        justify-content: center;
        gap:  1rem;

        > div {
            flex: 30.33% 0;
            min-width:10rem;
            max-width:20rem;

        }
    }

    .success_content {
       
        @media screen and (min-width: 600px) {
            display: grid;
            grid-template-columns: 30% 70%;    
            align-items: center;
        }
    }

`
const Success = () => {
    return (
        <SuccessWrapper>
            <div className="container">
                <header>
                    <h2>Your success is our #1 priority</h2>
                    <p>Gotocourse is deeply invested in your growth</p>
                </header>

                <div className="success_content">
                    <div className="best_training">
                        <header>
                            <h4>Explore Gotocourse</h4>
                            <h4>proprietary technology</h4>
                        </header>
                        <p>Gotocourse incredible tools make teaching and learning collaborative,engaging and cost effective.</p>
                    </div>
                    <div className="best_cards">
                        {
                            data.map((item, i) => (
                                <SuccessCard {...item} key={i} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </SuccessWrapper>
    )
}


const data = [

   
    {
        icon: Meetifix,
        title:"Live class tool",
        description: `Achieve your goals. Learn great skills with the best teachers live online. Unlock the power of real-time learning without any barrier.
        Teachers are empowered to conduct unlimited live classes with students with just a click of a button, and other features like class recording, screen-share and chat lobby.
        Learn with a cohort live online.
Attend virtual instructor-led classes with ease.
Break class into rooms to do group projects with colleagues across the world.`
    },
    {
        icon: Classpodia,
        title:"Class console",
        description: `Learn on the go, enjoy learning in a classroom without borders ;  students have unlimited  access to study materials on any device, anytime and anywhere. Maximize your learning with study materials after every class and any time you need it. 
        Open files and documents on the class console wherever you need them and with unlimited replay. 
        Receive push notifications for course updates.
        Keep track of course work with a to do list and calendar.`
    },
    {
        icon: Quikonnet,
        title:"Chat & mailing tool",
        description: `You can quickly communicate with your teachers and colleagues securely with ease. Engage with others in class through  instant chat or mail. Ask questions easily through instant chat or mail. Quikonnet is also a simple two-way interaction tool for teachers to Clear doubts, broadcast announcements, or just send some motivational messages. 
        Send and receive messages`
    },
    {
        icon: Rekordia,
        title:"Student record management tool",
        description: `Enjoy personalized performance reports. This friendly feature helps to send reminders, and take attendance automatically. It also makes daily basis and common tasks like sorting students into groups, recording assessments/attendance, and contacting students quick and easy. Students can also download gradesheets, attendance particulars etc as a PDF file.`
    },
    {

        icon: Quizim,
        title:"Quiz App",
        description: `Create a quiz  in a few seconds, or take secure online quizes on any device, anywhere and at any time. 
        Take quizzes in multiple choice tests, checkboxes, upload file attachment, or assessment papers and have access to grades in real time just when made available. It is easy to use with paperless assignment workflow which allows teachers to create, review and mark assignments quickly,
        Create instant tests & quizzes in a few seconds.
        Lock/unlock  them.
        Receive push notifications for new grades.`

    },
]
export default Success

import React from 'react'
import styled from 'styled-components'
import { SuccessCard } from './landingComponents'
import Meetifix  from "../../images/landing/icons/Meetifix.png"
import Rekordia  from "../../images/landing/icons/Rekordia.png"
import Quikonnet  from "../../images/landing/icons/Quikonnet.png"
import Classpodia  from "../../images/landing/icons/Classpodia.png"
import Quizim  from "../../images/landing/icons/Quizim.png"


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

            h5 {
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
                        <h5>Get the best training with</h5>
                        <h5>the use of our technology</h5>
                    </header>
                    <p>Gotocourse incredible tools  make teaching and learning collaborative,engaging and cost effective.</p>
                </div>
                <div className="best_cards">
                    {
                        data.map((item,i)=>(
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
        icon:Meetifix,
        description:"Achieve your goals. Learn great skills with the best teachers live online. Unlock the power of real-time..."
    },
    {
        icon:Quikonnet,
        description:"You can quickly communicate with your teachers and colleagues securely with ease. Engage with others in ..read more"
    },
    {
        icon:Rekordia,
        description:"Enjoy personalized performance reports. This friendly feature helps to send reminders, and take attendance..read more"
    },
    {
        icon:Classpodia,
        description:"Learn on the go, enjoy learning in a classroom without borders ; students have unlimited access to... read more"
    },
    {
        icon:Quizim,
        description:"Create a quiz in a few seconds, or take secure online quizes on any device, anywhere and at any..read more"
    },
]
export default Success

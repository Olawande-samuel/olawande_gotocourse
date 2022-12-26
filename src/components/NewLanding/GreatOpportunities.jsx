import React from 'react'
import styled from "styled-components"
import { GreatImage } from './landingComponents'
// import exec from "../../images/landing/executive.png"
import headstart from "../../images/landing/headstart.png"
import dem from "../../images/landing/dem.png"
import short from "../../images/landing/short.png"
import inD from "../../images/landing/indemand.png"
import up from "../../images/landing/upskill.png"
import tech from "../../images/landing/techpreneur.png"


const GreatWrapper = styled.section`
    padding-block:2rem ;

    header {
        text-align:center;
        margin-bottom: 2rem;


        h4 {
            font-weight: 700;
        }
        p {
            width: min(100%, 600px);
            margin: auto;
            font-size: 14px;
        }
    }

    article {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fit, minmax(min(150px, 200px), 200px));
        justify-content: center;
    }


`
const GreatOpportunities = () => {
  return (
    <GreatWrapper>
        <div className="container">
            <header>
                <h4>Great opportunities for you to learn</h4>
                <p>Take advantage of 150+ opportunities to increase your tech and business skills while learning from real world experts</p>
            </header>
            <article>
                {
                    data.map((item,id)=>(
                        <GreatImage {...item} key={id}/>
                    ))

                }
            </article>
        </div>
    </GreatWrapper>
  )
}

const data = [
    // {
    //     img:exec,
    //     title:"Executive Education",
    //     link:"/category/EXECUTIVE_COURSES"
    // },
    // {
    //     img:short,
    //     title:"Short Courses",
    //     link:"/category/SHORT_COURSES"
    // },
    {
        img:headstart,
        title:"Tech Headstart \n program \n 9 years above",
        link:"/category/HEAD_START"
    },
    {
        img:inD,
        title:"IT Pathfinders \n program \n 15 years above",
        link:"/category/PATH_FINDERS"
    },
    {
        img:dem,
        title:"In demand career courses",
        link:"/category/IN_DEMAND"
    },
 
    {
        img:up,
        title:"Upskill Courses",
        link:"/category/UPSKILL_COURSES"
    },
    {
        img:tech,
        title:"Tech Entrepreneurship Education",
        link:"/category/TECH_ENTREPRENEURSHIP"
    },
]

export default GreatOpportunities
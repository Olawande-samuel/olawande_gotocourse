import React from 'react'
import styled from 'styled-components'
import { ClassTypeComponent, ExeEducation } from './landingComponents'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    row-gap:3rem;

     @media screen and (max-width:660px){
        grid-template-columns: repeat(auto-fit, minmax(min(200px, 240px), 240px));
        justify-content: center;
    }
    /*
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
    `
const ExecutiveClasses = () => {
  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                data.content.map(item=>(
                    <ExeEducation {...item} />
                ))
            }
        </Grid>
    </ClassTypeComponent>
  )
}

const data = {
    header: "",
    header2:"Explore executive  education",
    subtext:"Acquire strategic skills to boost business growth",
    content: [
        {
            title: "Cloud Architect",
            date: "11 Months",
            courses: "11 Courses",
            color:"reddish",
            list: [
                "31 tools & Rigorous curriculum",
                "Master's certificate",
                "Certification Aligned with Silver Microsoft Partner & 2 more"
            ]
        },
        {
            title: "Artificial Intelligence Engineer",
            date: "11 Months",
            courses: "9 Courses",
            color:"blue",
            list: [
                "9 tools & Rigorous curriculum",
                "Master's certificate",
                "In Collaboration With IBM"
            ]
        },
        {
            title: "Digital Marketing Specialist",
            date: "11 Months",
            courses: "14 Courses",
            color:"",
            list: [
                "29 tools & Rigorous curriculum",
                "Master's certificate",
                "Certification Alignment Facebook Blueprint_New_White, Google"
            ]
        },
    ],
    bottomTitle:"View  more executive education > "
  }
export default ExecutiveClasses
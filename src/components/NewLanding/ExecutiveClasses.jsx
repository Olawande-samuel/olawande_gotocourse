import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../contexts/Auth'
import { ClassTypeComponent, ExeEducation } from './landingComponents'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(250px, 300px), 300px));
    justify-content: space-around;
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
    const { otherFunctions: {fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])
    
    const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
        notifyOnChangeProps:["category", "isFetching"],

        onSuccess: (res)=>{
            if(res.data.length > 0){
                const exe = res.data.filter(item=>item.subCategory === "EXECUTIVE_COURSES");
                setShorts(exe)
            }
        }
    })
  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                shorts?.filter(item => item.isActive).slice(0, 3).map((item,i)=>(
                    <ExeEducation {...item} i={i} />
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



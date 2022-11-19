import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../contexts/Auth'
import { ClassTypeComponent, ExeEducation } from './landingComponents'
import exec1 from "../../images/landing/exe1.png"
import exec2 from "../../images/landing/exe2.png"
import exec3 from "../../images/landing/exe3.png"

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 280px);
    grid-auto-rows: 402px;
    overflow: hidden;
    gap: 1.5rem;
    justify-content: space-around;
    padding: .7rem .5rem;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
    justify-content: space-evenly;
    gap: 1rem;
  }





    /*
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
`

const ExecutiveClasses = () => {
    const { otherFunctions: { fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])

    const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
        notifyOnChangeProps: ["category", "isFetching"],

        onSuccess: (res) => {
            if (res.data.length > 0) {
                const exe = res.data.filter(item => item.subCategory === "EXECUTIVE_COURSES");
                setShorts(exe)
            }
        }
    })

    // console.log({ shorts });
    return (
        <ClassTypeComponent {...data}>
            <Grid>
                {
                    shorts?.filter(item => item.isActive).slice(0, 8).map((item, i) => (
                        <ExeEducation {...item} i={i} img={data.content[i]} key={item.bootcampId} />
                    ))
                }
            </Grid>
        </ClassTypeComponent>
    )
}

const data = {
    header: "",
    header2: "Explore executive  education",
    subtext: "Acquire strategic skills to boost business growth",
    content: [
        exec1, exec2, exec3
    ],
    bottomTitle: "View  more executive education > ",
    bottomLink: `category/EXECUTIVE_COURSES`
}
export default ExecutiveClasses



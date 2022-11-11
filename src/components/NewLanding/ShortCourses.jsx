import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../contexts/Auth'
import { ClassTypeComponent, TechPreCard } from './landingComponents'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    row-gap:3rem;

    @media screen and (max-width:710px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    }
    `
const ShortCourses = () => {
    const { otherFunctions: {fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])
    
    const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
        notifyOnChangeProps:["category", "isFetching"],

        onSuccess: (res)=>{
            if(res.data.length > 0){
                const short = res.data.filter(item=>item.subCategory === "SHORT_COURSES");
                const tech = res.data.filter(item=>item.subCategory === "TECH_ENTREPRENEURSHIP");
                
                const threeShorts = short?.slice(0, 3)
                const threeTech = tech?.slice(0, 3)

                const myContent = threeShorts.concat(threeTech)
                setShorts(myContent)
            }
        }
    })
  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                shorts?.map(item => (
                    <TechPreCard {...item} />
                ))
            }
        </Grid>
    </ClassTypeComponent>
  )
}
const data = {
    header: "Explore short courses",
    header2:"& Tech entreprenuership education ",
    subtext:"Knowledge boost within 1-14 days",
    content: [],
    bottomTitle:"View  more short courses  & Tech entreprenuership education > "
  }
export default ShortCourses
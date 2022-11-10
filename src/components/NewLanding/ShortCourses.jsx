import React from 'react'
import styled from 'styled-components'
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
  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                [...Array(6)].map(item=>(
                    <TechPreCard />
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
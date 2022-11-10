import React from 'react'
import styled from 'styled-components'
import { ClassTypeComponent, LiveWebinarCard } from './landingComponents'

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
                    [...Array(3)].map(item=>(
                        <LiveWebinarCard />
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
    content: []
}
export default LiveWebinars
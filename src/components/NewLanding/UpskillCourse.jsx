import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../contexts/Auth'
import { ClassTypeComponent, UpskillCourseCard } from './landingComponents'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
    gap: 1.5rem;
    row-gap:3rem;
    justify-content:space-around;
    

    /* @media screen and (max-width:710px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
    `
const UpskillCourse = () => {

    const { otherFunctions: {fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])
      
    const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
          notifyOnChangeProps:["category", "isFetching"],
  
          onSuccess: (res)=>{
              if(res.data.length > 0){
                  const uppers = res.data.filter(item=>item.subCategory === "UPSKILL_COURSES");
                  setShorts(uppers)
                  console.log({uppers})
              }
          }
    })

  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                shorts?.filter(item=>item.isActive).slice(0, 4).map(item=>(
                    <UpskillCourseCard {...item} />
                ))
            }
        </Grid>
    </ClassTypeComponent>
  )
}

const data = {
    header: "",
    header2:"Explore In Upskill courses",
    subtext:"Increase your earning  potential by upgrading your skillsets.",
    content: [
        {
            title:"Products",
            description:"Turn your content into a polished online course, subscription, or any other digital product you can imagine. ",
        },
        {
            title:"Websites",
            description:"Set up a fully-integrated website on Kajabi that connects everything about your business in one place.",
        },
        {
            title:"PaymentsPayments",
            description:"Simple, seamless integration with Stripe and PayPal gets you paid easier, faster.",
        },
        {
            title:"Email",
            description:"Kajabi’s visual editor lets you create and customize beautiful emails that integrate video, countdown timers, and more.",
        },
        {
            title:"Pages",
            description:"Build dynamic landing pages without a designer. Pick a template, customize, and hit publish without worrying about tech.",
        },
        {
            title:"Funnels",
            description:"Optimize and scale your business with Kajabi’s fully-automated marketing campaigns and funnels.",
        },
    ],
    bottomTitle: "View more Upskill courses"
}

export default UpskillCourse
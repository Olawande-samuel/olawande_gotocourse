import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../../contexts/Auth'
import { ClassTypeComponent, UpskillCourseCard } from './landingComponents'

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
    grid-auto-rows: 352px;
    /* overflow: hidden; */
    gap: 1.5rem;
    justify-content:space-around;
    padding: .5rem;
    
    @media screen and (min-width: 1400px) {
        grid-template-columns: repeat(4, 230px);
        justify-content: space-evenly;
        gap: 1rem;
    }
    
    @media screen and (max-width:768px){
        grid-template-columns: repeat(2, 230px);
    }

    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 280px);
        justify-content:center;
    } 
    `
const UpskillCourse = () => {

    const { otherFunctions: {fetchBootcamps }, } = useAuth();
    const [shorts, setShorts] = useState([])
      
    const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
          notifyOnChangeProps:["category", "isFetching"],
  
          onSuccess: (res)=>{
              if(res.data.length > 0){
                // console.log("data", res.data);
                  const uppers = res.data.filter(item=>item.subCategory === "UPSKILL_COURSES" && item.isActive);
                //   console.log({uppers});
                  setShorts(uppers)
              }
          }
    })

  return (
    <ClassTypeComponent {...data}>
        <Grid>
            {
                shorts?.filter(item=>item.isActive).slice(0, 8).map(item=>(
                    <UpskillCourseCard {...item} all={item} key={item.bootcampId}/>
                ))
            }
        </Grid>
    </ClassTypeComponent>
  )
}

export const upskillAltData = [
    {
        id: 1,
        ownedBy:"Principles of Data Security",
        title:"Learn how to safeguard digital data from unwanted access, corruption, or theft throughout its entire existence.",
        list: [
            
            "You will gain an understanding of the cybersecurity landscape and the significance of securing customer data.",
            "You'll learn why strong passwords are important and how to establish them, as well as how to safeguard your devices against spyware, viruses, and ransomware.",
        ]
    },
    {
        id: 2,
        ownedBy:"Fundamentals of Network Security",
        title:"Learn the foundational knowledge required to comprehend basic network security.",
        list: [
            
            "You will learn Local Area Networks, TCP/IP, the OSI Framework, and routing",
            "You will study how networking influences an organization's security systems.",
            "You will also be able to learn about the network components that protect a company from cybersecurity threats.",
        ]
    },
    
    {
        id: 4,
        ownedBy:"Mastering Access Control",
        title:"Master the ability to provide information indicating what users are permitted to do, the resources t hey are permitted to access, and the processes they are permitted to do on a system.",
        list: [
            
        "You will be able to assist managers in limiting and monitoring system usage at the user or group membership level.",
        "You will learn about various access control systems and how to apply them to safeguard the system and data by utilizing various levels of confidentiality, integrity, and availability.",
        "You will also be able to outline the administration of the identity management life cycle.",
        ]
    },
    {
        id: 5,
        ownedBy:"Mastering Change management Process and Auditing",
        title:"Learn how to create and deliver effective change strategies, as well as the overview and process.",
        list: [
            "You will master the knowledge of the required changes and prepare employees and stakeholders for what is to come.",
            "You will learn how to develop a transformation strategy once stakeholders have consented to a change.",
            "You will discover how to make any change sustainable and helpful.",
            "You will advance to the level of  professional change manager.",
        ]
    },
    {
        id: 6,
        ownedBy:"How to effectively run daily Scrum",
        title:"Discover the tricks and methods required to manage Daily Scrum.",
        list: [
            

            "You will learn how to inspect and synchronize the team's progress toward the Sprint Goal, discuss any roadblocks, and re-plan the team's work to meet the Sprint Goal.",
            "You will also learn how to distribute your own contributions as a Scrum master and product owner.",
            "You will become a certified Scrum master.",
        ]
    },
    {
        id: 7,
        ownedBy:"General Data Protection Regulation (GDPR)",
        title:"Understand the legal framework that governs the gathering and processing of personal information from individuals both inside and outside the European Union (EU).",
        list: [
            

            "You will learn how to implement the General Data Protection Regulation (GDPR) in Your Data Security Practices",
            "You will study the important GDPR data protection principles, such as consent and accountability.",
            "You will be able to use data protection principles by design and by default.",
        ]
    },
    {
        id: 8,
        ownedBy:"Roles & Responsibilites of a Scrum Master",
        title:"Learn the tasks and responsibilities of a Scrum master and contribute to the team's success by encouraging communication and transparency among roles and providing a supportive atmosphere.",
        list: [
            

            "You will learn the responsibilities of a scrum master.",
            "As a scrum master, you will learn what to do and what not to do, as well as how to support the team during the sprint.",
            "You will learn how to facilitate meetings and collaborate with other Scrum team members.",
        ]
    },
    {
        id: 9,
        ownedBy:"Third Party Risk Management  (TPRM)",
        title:"Understand and minimize the risks involved with outsourcing to third-party vendors or service providers.",
        list: [
            "You will earn how to assess the hazards you'd be introducing into your firm, as well as the level of due diligence required.",
            "You will also learn how to assess the level of risk in your current processes and decide whether it's acceptable.",
            "You will contribute to the development of an action plan for mitigating these risks in future projects.",
        ]
    },
    {
        id: 10,
        ownedBy:"Fundamentals of PCI DSS",
        title:"Learn about the policies and processes designed to improve the security of credit, debit, and cash card transactions and protect cardholders from misuse of their personal information.",
        list: [
            

            "You will learn about the components of a secure payment system and how they function together.",
            "You will discover the significance of the payment system's implementation, maintenance, and monitoring.",
            "You will learn about payment security standards and laws, as well as how to identify and mitigate payment system risks.",
        ]
    },
    {
        id: 11,
        ownedBy:"Mastering Job interview for success",
        title:"Learn how to prepare for various types of job interviews, as well as how to respond to some of the most typical interview questions that recruiters and hiring managers will most likely ask!",
        list: [
            
            "You will discover the finest methods to employ both before and after the job interview.",
            "After the interview, you will be able to create strategic interview questions to ask the hiring manager.",
        ]
    },
    {
        id: 12,
        ownedBy:"Exceptional Leadership: Leading at a Higher Level, Become an exceptional ",
        title:"Learn how to effectively navigate the obstacles of major organizational transitions.",
        list: [
            

            "You will learn why knowing multiple stakeholder views may inform and significantly improve a leader's response to situations that threaten an organization's very survival.",
            "You will also learn to recognize and cultivate individual and organizational resilience.",
        ]
    },
]

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
    bottomTitle: "View more Upskill courses >",
    bottomLink:`/category/UPSKILL_COURSES`

}

export default UpskillCourse
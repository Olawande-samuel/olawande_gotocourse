import React from 'react'
import newProp from "../../images/new_Property.png"
import newClassroom from "../../images/newClassroom.png"
import tuition from "../../images/Tuition.png"
const Overview = () => {
const data = [
    {
        number: 1,
        title:"Learn for the real world",
        description:"Our curriculum is exhaustive and designed by industry experts to teach you the in-demand skills you will need to get more lucrative professional opportunities and stay relevant on your job.",
    },
    {
        number: 2,
        title:"Learn by building",
        description:"Our mentors and advisors will help you apply what you have learnt to hands-on projects to enhance your professional portfolio.",
    },
    {
        number: 3,
        title:"Learn with experts",
        description:"Get real-time feedback and insight from industry veterans who are dedicated to helping you have a great start and advance your tech career.",
    },
]

  return (
    <section className='overview'>
        <div className="container">
            <header>
                <h4>Our Certificate courses and Bootcamps are exhaustive, and what makes it even better is that you also get to choose your preferred learning model. Enjoy borderless learning on a flexible schedule that allows you to combine studying with other commitments. Here is an overview of how it works.</h4>
            </header>
            <main>
                <div className="overview_main">
                    <div className="overview_left">
                        <Card {...data[0]} />
                        <Card showCard={"hideOnLargeScreens"} {...data[1]} />
                        <div className="overview_icon_wrapper">
                            <img src={newProp}alt="" />
                        </div>  
                        <Card {...data[2]} />
                    </div>
                    <div className="connected_line">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div className="overview_right">
                        <div className="overview_icon_wrapper">
                            <img src={newClassroom} alt="" />
                        </div>  
                        <Card {...data[1]} />
                        <div className="overview_icon_wrapper">
                            <img src={tuition} alt="" />
                        </div>  
                    </div>
                </div>
            </main>
        </div>
    </section>
  )
}

function Card({showCard, number, title, description,}){
    return (
        <div className={`overview_card ${showCard}`}>
            <header className="overview_header">
                <span>{number}</span> 
                <span>{title}</span>
            </header>
            <div className="overview_card_body"> {description}</div>
        </div>
    )
}

export default Overview
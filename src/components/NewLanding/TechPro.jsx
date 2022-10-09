import React from 'react'
import { Link } from 'react-router-dom'


import affPro from "../../images/aff_pro.webp"
import techPro from "../../images/tech_pro.webp"
const Twocolumn = ({img, title, firstText, secondText, thirdText, btn,link}) => {

    return (
    <section className="tech_pro">
        <div className="container">
            <div className="tech_pro_img_wrapper">
                <img src={img} alt="" className="tech_pro_img" />
            </div>
            <div className="tech_pro_content">
                <h6>{title}</h6>
                <p>{firstText}</p>
                <p>{secondText}</p>
                {
                    thirdText && 
                    <p className='mt-2'>{thirdText}</p>
                }
                <Link to={link} className='d-inline-block'>
                    <button className="tech_pro_button">{btn}</button>
                </Link>
            </div>
        </div>
    </section>
  )
}



export function TechPro(){
    const data = {
        title:"Are You a tech professional Looking To Share Knowledge and connect with Students  from everywhere across the world?",
        firstText:"Do you have Interest in teaching the next generation of Tech professionals? Collaborate with us.",
        secondText:"We provide you the platform and tools to teach what you love while creating an enriched and engaging experience with students.",
        btn:"Become an Educator",
        img:techPro,
        link:"/become-a-teacher"
    }
    
    return (
        <section className="professional">
            <Twocolumn {...data} />
        </section>
    )
}


export function AffiliatePro(){
    
    const data = {
        title:"Make earning with the Gotocourse affiliate program",
        firstText:"Do you have interest in helping people achieve great success in their career?",
        secondText:"Gotocourse is a platform to recommend to your followers and subscribers.  Instructors on Gotocourse are experienced practitioners who work at world's most innovative firms. Your referrals are going to learn the most in-demand tech skills relevant to today’s workplace. ",
        thirdText:"Gotocourse has a tracking system that ensures you are compensated for all your referrals. Make use of this oppurtunity to change lives",
        btn:"Become an affiliate",
        img: affPro,
        link:"/affiliates"
        
    }
    
    return(
        <section className="affiliate_pro">
            <Twocolumn {...data} />
        </section>
    )
}

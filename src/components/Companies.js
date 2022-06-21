import React from 'react'
import boa from "../images/companies/boa.svg"
import ey from "../images/companies/ey.svg"
import facebook from "../images/companies/facebook.svg"
import mastercard from "../images/companies/mastercard.svg"
import microsoft from "../images/companies/microsoft.svg"
import pwc from "../images/companies/pwc.svg"
import samsung from "../images/companies/samsung.svg"
import Shell from "../images/companies/Shell.svg"
import shopify from "../images/companies/shopify.svg"
import slack from "../images/companies/slack.svg"
import Tmobile from "../images/companies/T-Mobile.svg"
import twitter from "../images/companies/twitter.svg"
import Uber from "../images/companies/Uber.svg"
import verizon from "../images/companies/verizon.svg"
import Walmart from "../images/companies/Walmart.svg"


export const icons = [ boa, ey, facebook, mastercard, microsoft, pwc, samsung, Shell, shopify, slack, Tmobile, twitter, Uber, verizon, Walmart, ]
const Companies = () => {
  return (
    <section className="wrapper services">
      <div className="container">
            <header >
              <h2 className="title text-center">Top Companies Where Our Alumni Work</h2>
              {/* <p className="sub_title text-center mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p> */}
            </header>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5" style={{gap:"1rem"}}>
            
            {icons.map(icon=>(
                <div className="" style={{width:"150px", height:"80px"}}>
                <img src={icon} alt="" style={{maxWidth:"100%"}} />
                </div>
            ))}
        </div>
      </div>
    </section>
  )
}

export default Companies
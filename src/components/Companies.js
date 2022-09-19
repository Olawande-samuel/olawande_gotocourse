import React from 'react'
import Microsoft from "../images/logos/microsoft.svg"
import PWC from "../images/logos/pwc.svg"
import Samsung from "../images/logos/samsung.svg"
import Verizon from "../images/logos/verizon.svg"
import Walmart from "../images/logos/walmart.svg"
import Shell from "../images/logos/shell.svg"
import Uber from "../images/logos/uber.svg"
import Shopify from "../images/logos/shopify.svg"
import Twitter from "../images/logos/twitter.svg"
import Tmobile from "../images/logos/t-mobile.svg"
import Slack from "../images/logos/slack.svg"
import Facebook from "../images/logos/facebook.svg"
import Ey from "../images/logos/ey.svg"
import Boa from "../images/logos/boa.svg"
import Deloitte from "../images/logos/deloitte.svg"
import KPMG from "../images/logos/kpmg.svg"
import Google from "../images/logos/google.svg"
import Chase from "../images/logos/chase.svg"
import Tesla from "../images/logos/tesla.svg"
import Geico from "../images/logos/geico.svg"
import Lucid from "../images/logos/lucid.svg"
import Zoom from "../images/logos/zoom.svg"
import AWS from "../images/logos/aws.svg"
import Tesco from "../images/logos/tesco.svg"

// import {Microsoft, PWC, Samsung, Verizon, Walmart,Shell, Uber, Shopify, Twitter, Tmobile, Slack, Mastercard, Facebook, Ey, Boa, Deloitte, KPMG, Google, Chase, Tesla, Geico, Lucid, Zoom, AWS, Tesco } from "../images/components/svgs"

// export const icons = [<Deloitte />, <Shopify />, <Google />, <Chase />,  <PWC />,<Microsoft />, <Samsung />, <Verizon />, <Walmart />,<Shell />, <Uber />,  <Tmobile />,<KPMG /> , <Twitter />, <Slack />,  <Tesco />, <Facebook />, <Ey />, <Boa />,
// <Tesla />, <Geico />, <AWS />, <Lucid />, <Zoom />,

// ]
const compicons =  [Deloitte, Shopify, Google, Chase,  PWC,Microsoft, Samsung, Verizon, Walmart,Shell, Uber,  Tmobile,KPMG , Twitter, Slack,  Tesco, Facebook, Ey, Boa,
Tesla, Geico, AWS, Lucid, Zoom,

]
const Companies = () => {
  return (
    <section className="wrapper services">
      <div className="container">
          <header >
            <h2 className="title text-center">Some of the Companies Our Alumni Work</h2>
          </header>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5" style={{gap:"1.5rem"}}>
            {
              compicons.map((icon, i)=>(
                <div className="d-flex justify-content-center align-items-center" style={{width:"150px", height:"60px"}}>
                  {/* <i className="icon" style={{width:"100px", height:"50px"}}>{icon}</i> */}
                  <img src={icon} alt="" srcset=""style={{width:"100px", height: i === 10 || i === 23 ? "20px" : "30px", maxWidth:"100%"}} />
                </div>
              ))
            }
        </div>
      </div>
    </section>
  )
} 

export default Companies
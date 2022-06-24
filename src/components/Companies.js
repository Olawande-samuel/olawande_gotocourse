import React from 'react'


import {Microsoft, PWC, Samsung, Verizon, Walmart,Shell, Uber, Shopify, Twitter, Tmobile, Slack, Mastercard, Facebook, Ey, Boa, Deloitte, KPMG, Google, Chase, Tesla, Geico, Lucid, Zoom, AWS, Tesco } from "../images/components/svgs"

export const icons = [<Deloitte />, <Shopify />, <Google />, <Chase />, <Microsoft />, <PWC />, <Samsung />, <Verizon />, <Walmart />,<Shell />, <Uber />,  <Tmobile />,<KPMG /> , <Twitter />, <Slack />,  <Tesco />, <Facebook />, <Ey />, <Boa />,
<Tesla />, <Geico />, <AWS />, <Lucid />, <Zoom />,

]
const Companies = () => {
  return (
    <section className="wrapper services">
      <div className="container">
          <header >
            <h2 className="title text-center">Some of the Companies Our Alumni Work</h2>
          </header>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-5" style={{gap:"1.5rem"}}>
            {icons.map(icon=>(
              <div className="d-flex justify-content-center align-items-center" style={{width:"150px", height:"60px"}}>
                <i className="icon" style={{width:"150px", height:"50px"}}>{icon}</i>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
} 

export default Companies
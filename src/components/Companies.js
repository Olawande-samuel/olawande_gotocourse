import React from 'react'


import {Microsoft, PWC, Samsung, Verizon, Walmart,Shell, Uber, Shopify, Twitter, Tmobile, Slack, Mastercard, Facebook, Ey, Boa, Deloitte, KPMG, Google, Chase, Tesla, Geico, Lucid, Zoom, AWS, Tesco } from "../images/components/svgs"

export const icons = [<Deloitte />, <KPMG />, <Google />, <Chase />, <Microsoft />, <PWC />, <Samsung />, <Verizon />, <Walmart />,<Shell />, <Uber />,  <Tmobile />, <Shopify />, <Twitter />, <Slack />, <Mastercard />, <Facebook />, <Ey />, <Boa />,
<Tesla />, <Geico />, <AWS />, <Lucid />, <Zoom />, <Tesco />

]
const Companies = () => {
  return (
    <section className="wrapper services">
      <div className="container">
            <header >
              <h2 className="title text-center">Top Companies Where Our Alumni Work</h2>
              {/* <p className="sub_title text-center mx-auto" style={{width:"min(100% - 1rem, 900px)"}}>Whether you're just starting out in the IT field, or ready to advance your career, Gotocourse can help you gain the expertise you need to succeed. </p> */}
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
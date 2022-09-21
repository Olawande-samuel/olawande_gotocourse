import React from 'react'
// import { icons } from './Companies'
import {Microsoft, PWC, Samsung, Verizon, Walmart,Shell, Uber, Shopify, Twitter, Tmobile, Slack, Mastercard, Facebook, Ey, Boa, Deloitte, KPMG, Google, Chase, Tesla, Geico, Lucid, Zoom, AWS, Tesco } from "../images/components/svgs"

export const icons = [<Deloitte />, <Shopify />, <Google />, <Chase />,  <PWC />,<Microsoft />, <Samsung />, <Verizon />, <Walmart />,<Shell />, <Uber />,  <Tmobile />,<KPMG /> , <Twitter />, <Slack />,  <Tesco />, <Facebook />, <Ey />, <Boa />,
<Tesla />, <Geico />, <AWS />, <Lucid />, <Zoom />,

]
const Experienced = () => {
  return (
    <section className="bootcamp" style={{padding: "3.3625rem 2.3625rem"}}>
      <div className=" container-lg bootcamp_content">
      <div className="d-flex row  flex-md-row content justify-content-between">
          <div className="col-md-4">
            <header className="text-center text-lg-start ">
              <h4 className="title" style={{fontSize:"27px"}} >Learn From Industry Experts</h4>
            </header>
            <main className="mt-3">
              <p className="text paragraph">
                Gotocourse Instructors are experienced practitioners who work at world's most innovative firms, you are going to  learn the most in-demand skills relevant in today’s workplace.
              </p>
            </main>
          </div>
          <div className="col-md-8">
            <div className="d-flex flex-wrap  justify-content-center px-lg-5 mt-5 pe-lg-0" style={{gap:"1rem"}}>
            {icons.slice(0, 6).map(icon=>(
                <div className="d-flex align-items-center" >
                <i className="icon experienced_icon" style={{width:"100px", height:"50px"}}>{icon}</i>
                </div>
            ))}
            </div>  
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experienced
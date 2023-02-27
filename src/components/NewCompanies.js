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
import styled from 'styled-components'

// import {Microsoft, PWC, Samsung, Verizon, Walmart,Shell, Uber, Shopify, Twitter, Tmobile, Slack, Mastercard, Facebook, Ey, Boa, Deloitte, KPMG, Google, Chase, Tesla, Geico, Lucid, Zoom, AWS, Tesco } from "../images/components/svgs"

// export const icons = [<Deloitte />, <Shopify />, <Google />, <Chase />,  <PWC />,<Microsoft />, <Samsung />, <Verizon />, <Walmart />,<Shell />, <Uber />,  <Tmobile />,<KPMG /> , <Twitter />, <Slack />,  <Tesco />, <Facebook />, <Ey />, <Boa />,
// <Tesla />, <Geico />, <AWS />, <Lucid />, <Zoom />,

// ]
const compicons =  [Deloitte, Shopify, Facebook,Google, Chase,  PWC,Microsoft, Walmart,Samsung, Verizon, Shell, Uber,  Tmobile,KPMG , Twitter, Slack,  Tesco,  Ey, Boa,
Tesla, Geico, AWS, Lucid, Zoom,

]

const Container = styled.section`
background: rgba(214, 220, 255, 0.3);
padding: 2rem 0;

.container {
  .company{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    p{
      margin-bottom: unset;
      font-family: 'Montserrat';
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
    }

    .companylogo{
      display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    }

  }
}


@media (max-width: 1024px) {

.container{
  .company{
    flex-direction: column;
      gap: .5rem;

    .companylogo{
      gap: .5rem;
    }

  }
}

}
@media (max-width: 768px) {

  .container{
    .company{
      flex-direction: column;
      gap: .5rem;

  
      .companylogo{
        display: grid;
        grid-template-columns: repeat(2 , 1fr);
        gap: 2rem;
      }

    }
  }
  
}

`
const NewCompanies = () => {
  return (
    <Container >
      <div className="container">
      
        <div className='company'>
            <p>Some companies our grads work at:</p>

            <div className="companylogo">
            {
              compicons.slice(0, 8).map((icon, i)=>(
                <div className="d-flex justify-content-center align-items-center" style={{width:"100px"}} key={i}>
                  <img src={icon} alt="" style={{width:"100px", height: i === 10 || i === 23 ? "20px" : "30px", maxWidth:"100%"}} />
                </div>
              ))
            }

            </div>
        </div>
      </div>
    </Container>
  )
} 

export default NewCompanies
import React from 'react'
import styled from 'styled-components'
import { VirtualCard } from './landingComponents'
import virtImg from "../../images/landing/virtual event.png"
const VirtSection = styled.section`
    padding-block: 2rem;
    .virtual_content{ 
        display: grid;
        gap:1rem;
    }
    header {
        margin-bottom: 1rem;
        
        h6 {
            font-weight: 700;
        }
    }

    .virt_Card_wrapper {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 2rem;

    }
    .virt_img_wrapper {
        padding: 1.5rem;
        display: grid;
        padding-top:0;
        place-items: center;
        
        img {
            max-width:100%;
        }
    }
   
    @media screen and (min-width: 700px){
        .virtual_content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    }

    

`


const VirtualTraining = () => {
  return (
    <VirtSection>
        <div className="container">
            <header>
                <h6>VIRTUAL LIVE TRAINING COURSES</h6>
            </header>
            <div className="virtual_content">
                <div className="virt_Card_wrapper">
                    <VirtualCard />
                    <VirtualCard />
                </div>
                <div className="virt_img_wrapper">
                    <img src={virtImg} alt="" />
                </div>
            </div>
        </div>
    </VirtSection>
  )
}

export default VirtualTraining
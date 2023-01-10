import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '../../../components/Layout'
import { useAuth } from '../../../contexts/Auth';
import { Box, Tabs, Tab, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { CourseWrapper, Main } from './style';

import cybersecurity from "../../../images/cybersecurity.webp"
import { toast } from 'react-toastify';
import { useLocalStorage } from '../../../hooks';
import { COURSE_CATEGORY_KEY } from '../../../constants';
import { AdvancedError } from '../../../classes';
import styled from 'styled-components'
import { ExeEducation, Head, InDemand, UpskillCourseCard } from '../../../components/NewLanding/landingComponents';
import short from '../../../images/short.png'
import executive from '../../../images/executive.png'
import demand from '../../../images/demand.png'
import headstart from '../../../images/Heads.png'
import pathfinder from '../../../images/Pathfinder.png'

import skill from '../../../images/upskill.webp'
import tech from '../../../images/tech.png'
import { Question } from '../../Course/Details';
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Microsoft from "../../../images/logos/microsoft.svg"
import PWC from "../../../images/logos/pwc.svg"
import Samsung from "../../../images/logos/samsung.svg"
import Verizon from "../../../images/logos/verizon.svg"
import Walmart from "../../../images/logos/walmart.svg"
import Shell from "../../../images/logos/shell.svg"
import Uber from "../../../images/logos/uber.svg"
import Shopify from "../../../images/logos/shopify.svg"
import Twitter from "../../../images/logos/twitter.svg"
import Tmobile from "../../../images/logos/t-mobile.svg"
import Slack from "../../../images/logos/slack.svg"
import Facebook from "../../../images/logos/facebook.svg"
import Ey from "../../../images/logos/ey.svg"
import Boa from "../../../images/logos/boa.svg"
import Deloitte from "../../../images/logos/deloitte.svg"
import KPMG from "../../../images/logos/kpmg.svg"
import Google from "../../../images/logos/google.svg"
import Chase from "../../../images/logos/chase.svg"
import Tesla from "../../../images/logos/tesla.svg"
import Geico from "../../../images/logos/geico.svg"
import Lucid from "../../../images/logos/lucid.svg"
import Zoom from "../../../images/logos/zoom.svg"
import AWS from "../../../images/logos/aws.svg"
import Tesco from "../../../images/logos/tesco.svg"
import ReactPaginate from 'react-paginate';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
    grid-auto-rows: 460px;
    overflow: hidden;
    gap: 1.5rem;
    justify-content:space-around;
    margin: 1rem 0 ;
    padding: 2rem 0;
    

    /* @media screen and (max-width:710px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
    `

const ShortHero = styled.div`

  width: 100%;
  padding-top:2rem;
  display: grid;
  gap: 1rem;
  align-items: center;

    h3{
      font-weight: 700;
      font-size: clamp(1.875rem, 1.3176rem + 2.7869vw, 4rem);
      line-height: 65px;
    }

    p{
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      padding: .5rem 0;
      width: min(100%, 412px)
    }

    .left{
      order: 2;
    }

    .right{

      order: 1;
      padding-left:0;
      display: flex;
      justify-content: center;
      align-items: center;

      img{
        max-width: 100%;
        max-height: 450px;
      }

    } 
    
    @media (min-width: 512px){
      
      grid-template-columns: 1fr 1fr;


      .left{
      order: 1;
    }

    .right{
      order: 2;
      
    }
  }
    
`

const ShortMiddle = styled.div`
background: #EBEBEB;
padding-bottom: 3rem;

h4{
  color: #464646;
  font-weight: 700;
  text-align: center;
  padding: 2rem 0;
  font-size: 32px;
  line-height: 24px;
}



`

const ShortMiddleContent = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;


.item{
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  color: #464646;

  .benefits{
      p{
        font-weight: 700;
        font-size: 20px;
        line-height: 12px;
        margin-bottom: 0;
      }

      span{
        font-weight: 500;
        font-size: 12px;
      }

  }


}

@media (max-width: 768px){
  flex-direction: column;
  gap: 1rem;

  .item{
    flex-direction: column;
    text-align: center;
  }
}


`

const Section = styled.section`
    padding-block: 5rem;
 
    header {
        margin-bottom: 4rem;
        text-align:center;

        h3 {
            width: min(100% - .2rem, 550px);
            margin-inline:auto;
        }

        
    }

    img {
        width: 100px;
        height: 50px;
        max-width: 100%;
    }


 `

const UpskillHero = styled.div`
width: 100%;
// border: 2px solid red;
display: flex;
align-items: center;
justify-content: space-between;
/* min-height: 70vh; */

    h3{
      font-weight: 700;
      font-size: clamp(2.9125rem, 2.7679rem + 0.2232vw, 3.125rem);
      line-height: 45px;
    }
    p{
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      padding: .5rem 0;
    }

    .left{
      flex: .6;
    }

    .right{
      flex: .4;

       img{
         max-width: 100%;
         max-height: 450px;
       }
 
     }  

    

   
     
     @media (max-width: 768px){
      flex-direction: column-reverse;
      height: unset;

      .left{
        text-align: center;
        margin: 2rem 0;
      }
    }
    
     
 `

const ExecutiveHero = styled.div`
width: 100%;
// border: 2px solid red;
display: flex;
align-items: center;
justify-content: space-between;
min-height: 40vh;

    h3{
      font-weight: 700;
      font-size: clamp(2.8125rem, 2.7679rem + 0.2232vw, 3.125rem);
      line-height: 45px;
    }

    p{
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      padding: .5rem 0;
    }

    .left{
      flex: .6;
      // border: 2px solid blue;

    }

    .right{
      flex: .3;
      // border: 2px solid blue;


       img{
         max-width: 100%;
         max-height: 450px;
         /* height: 100%; */
       }
 
     }  


     @media (max-width: 768px){
      flex-direction: column-reverse;

      .left{
        text-align: center;
        margin: 2rem 0;
      }
    }
     
 `
const topicons = [Deloitte, Facebook, Shopify, Google, PWC, Microsoft]

const bottomicons = [Chase, Walmart, KPMG, Ey, Samsung, Verizon, Shell, Uber, Tmobile, Twitter, Slack, Tesco, Boa, Tesla, Geico, AWS, Lucid, Zoom]

// const compicons =  [Deloitte, Shopify, Facebook,Google, Chase,  PWC,Microsoft, Walmart,Samsung, Verizon, Shell, Uber,  Tmobile,KPMG , Twitter, Slack,  Tesco,  Ey, Boa,
//   Tesla, Geico, AWS, Lucid, Zoom,

//   ]


const Companies = () => {
  return (
    <section className="wrapper my-5">
      <div className="container">
        <header className='mb-2' >
          <h4 className="title text-center" style={{ color: "#464646" }}>Some of the places our learners  work</h4>
        </header>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-3" style={{ gap: "1.5rem" }}>
          {
            topicons.map((icon, i) => (
              <div className="d-flex justify-content-center align-items-center" style={{ width: "100px", height: "60px" }} key={i}>
                {/* <i className="icon" style={{width:"100px", height:"50px"}}>{icon}</i> */}
                <img src={icon} alt="" style={{ width: "100px", height: i === 10 || i === 23 ? "20px" : "30px", maxWidth: "100%" }} />
              </div>
            ))
          }

        </div>
        <div className="service_box_wrapper d-flex flex-wrap justify-content-center px-lg-5 mt-3" style={{ gap: "1.5rem" }}>
          {bottomicons.slice(0, 8).map((icon, i) => (
            <div className="d-flex justify-content-center align-items-center" style={{ width: "100px", height: "60px" }} key={i}>
              {/* <i className="icon" style={{width:"100px", height:"50px"}}>{icon}</i> */}
              <img src={icon} alt="" style={{ width: "100px", height: i === 10 || i === 23 ? "20px" : "30px", maxWidth: "100%" }} />
            </div>
          ))
          }
        </div>
      </div>
    </section>
  )
}


function ShortMid() {
  return (
    <ShortMiddle>

      <h4>What makes us different</h4>

      <ShortMiddleContent>
        <div className='item'>
          <svg width="40" height="25" viewBox="0 0 80 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.0746 53.927C11.8013 50.6537 9.20479 46.7678 7.43329 42.491C5.66178 38.2143 4.75 33.6305 4.75 29.0013C4.75 24.3722 5.66178 19.7884 7.43329 15.5117C9.20479 11.2349 11.8013 7.34895 15.0746 4.07568M64.926 4.07568C68.1993 7.34895 70.7958 11.2349 72.5673 15.5117C74.3388 19.7884 75.2506 24.3722 75.2506 29.0013C75.2506 33.6305 74.3388 38.2143 72.5673 42.491C70.7958 46.7678 68.1993 50.6537 64.926 53.927M26.151 42.8468C22.4797 39.1743 20.4172 34.1941 20.4172 29.0013C20.4172 23.8086 22.4797 18.8284 26.151 15.1559M53.8496 15.1559C57.5209 18.8284 59.5834 23.8086 59.5834 29.0013C59.5834 34.1941 57.5209 39.1743 53.8496 42.8468M43.917 29.0013C43.917 30.0401 43.5043 31.0363 42.7698 31.7708C42.0353 32.5054 41.0391 32.918 40.0003 32.918C38.9615 32.918 37.9653 32.5054 37.2308 31.7708C36.4963 31.0363 36.0836 30.0401 36.0836 29.0013C36.0836 27.9626 36.4963 26.9664 37.2308 26.2318C37.9653 25.4973 38.9615 25.0847 40.0003 25.0847C41.0391 25.0847 42.0353 25.4973 42.7698 26.2318C43.5043 26.9664 43.917 27.9626 43.917 29.0013V29.0013Z" stroke="#464646" stroke-width="7.83333" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div className='benefits'>
            <p>100% Online</p>
            <span>Study online with ease</span>
          </div>
        </div>

        <div className='item'>
          <svg width="40" height="25" viewBox="0 0 70 58" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.9991 2.99951V15.9995M8.99906 15.9995L17.1241 24.1245M52.8741 24.1245L60.9991 15.9995M5.74906 45.2495H15.4991M34.9991 45.2495L38.2491 25.7495M54.4991 45.2495H64.2491M23.6241 55.0028H8.99906C4.76988 49.3811 2.48799 42.5343 2.49906 35.4995C2.49906 17.5498 17.0493 2.99951 34.9991 2.99951C52.9488 2.99951 67.4991 17.5498 67.4991 35.4995C67.4991 42.8185 65.0811 49.572 60.9991 55.0028L46.3741 54.9995" stroke="#464646" stroke-width="4.875" stroke-linecap="round" stroke-linejoin="round" />
          </svg>

          <div className='benefits'>
            <p>Unlimited Access</p>
            <span>24/7 unlimited access with pre-recorded  lectures</span>
          </div>
        </div>

        <div className='item'>
          <svg width="30" height="30" viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M51.1989 4.06251H35.5926C35.1074 4.06215 34.6419 4.25385 34.2977 4.59571L3.09766 35.7881C2.41467 36.4744 2.03125 37.4033 2.03125 38.3716C2.03125 39.3399 2.41467 40.2687 3.09766 40.9551L17.9512 55.8086C18.6377 56.4917 19.5668 56.8751 20.5353 56.8751C21.5038 56.8751 22.4329 56.4917 23.1194 55.8086L54.3106 24.6289C54.6524 24.2847 54.8441 23.8191 54.8438 23.334V7.71876C54.8461 7.23892 54.7535 6.76335 54.5713 6.31944C54.3891 5.87553 54.1209 5.47205 53.7821 5.13221C53.4434 4.79238 53.0407 4.52292 52.5974 4.33933C52.1541 4.15574 51.6788 4.06166 51.1989 4.06251V4.06251Z" stroke="#464646" stroke-width="4.0625" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M44.6875 18.2813C43.884 18.2813 43.0986 18.043 42.4305 17.5966C41.7624 17.1502 41.2417 16.5157 40.9342 15.7734C40.6268 15.0311 40.5463 14.2142 40.7031 13.4262C40.8598 12.6381 41.2467 11.9143 41.8149 11.3461C42.383 10.778 43.1069 10.3911 43.8949 10.2343C44.683 10.0776 45.4998 10.158 46.2422 10.4655C46.9845 10.773 47.619 11.2937 48.0653 11.9617C48.5117 12.6298 48.75 13.4153 48.75 14.2188C48.75 15.2962 48.322 16.3295 47.5601 17.0914C46.7983 17.8532 45.7649 18.2813 44.6875 18.2813Z" fill="#464646" />
            <path d="M29.1992 60.9375L62.4609 27.6758C62.6263 27.509 62.7565 27.3106 62.8437 27.0926C62.9309 26.8745 62.9735 26.6411 62.9688 26.4062V10.1562" stroke="#464646" stroke-width="4.0625" stroke-linecap="round" stroke-linejoin="round" />
          </svg>


          <div className='benefits'>
            <p>Low fees</p>
            <span>Our fees are low and easy to
              pay online</span>
          </div>
        </div>


      </ShortMiddleContent>
    </ShortMiddle>
  )

}

const UpComeComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <UpskillHero>
          <div className="left">
            <h3>
              <span>Discover Our Exciting Upcoming Courses</span>
              {/* <span className="d-block">potential by upgrading</span> */}
              {/* <span className="d-block">your skillsets.</span> */}

            </h3>
            <p>Choose from a Wide Range of Programs and Workshops for all ages and interests Our courses are for everyone, from complete beginners to professional artists and designers. We have something for everyone!</p>
          </div>
          <div className="right">
            <img src={skill} alt="" />
          </div>
        </UpskillHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />
      <Question />



    </div>

  )
}
const ShortCourseComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ShortHero>
          <div className="left">
            <h3>
              <span>Short courses for</span>
              <span className="d-block">knowledge boost</span>
            </h3>
            <p>Choose from wide range of short courses  and tech
              Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={short} alt="" />
          </div>
        </ShortHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>

        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />

      <Question />



    </div>

  )
}

const HeadstartComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ExecutiveHero>
          <div className="left">
            <h3>
              <span>Headstart Courses </span>
              <span className="d-block">for Kids and  Teens</span>
            </h3>

            <p>Accelerate Your Learning and Jumpstart Your Future with Our <br/> Age-Appropriate Programs. These courses are designed <br/> to help kids and teens get a head start on their tech education.</p>
          </div>
          <div className="right">
            <img src={headstart} alt="" />
          </div>
        </ExecutiveHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <Head {...item} key={item.bootcampId} />
            ))
          }

        </Grid>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />
      <Question />



    </div>

  )
}

const PathComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };


  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ShortHero>
          <div className="left">
            <h3>
              <span>Pathfinder Courses </span>
              <span className="d-block">for Teens and Adults</span>  
            </h3>
            {/* <h3>
              knowledge boost
            </h3> */}
            <p>Explore Your Passions and Develop New Skills with Our Dynamic, Engaging Programs. We will take you through some courses to a master-level and develop your path to getting hired.</p>
          </div>
          <div className="right">
            <img src={pathfinder} alt="" />
          </div>
        </ShortHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>

        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />

      <Question />



    </div>

  )
}

const UpskillComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()

  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <UpskillHero>
          <div className="left">
            <h3>
              <span>Increase your earning</span>
              <span className="d-block">potential by upgrading</span>
              <span className="d-block">your skillsets.</span>
              
            </h3>
            <p>Choose from wide range of upskill courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={skill} alt="" />
          </div>
        </UpskillHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />
      <Question />



    </div>

  )
}

const TechComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <UpskillHero>
          <div className="left">
            <h3> Learn Strategies & </h3>
            <h3>Global Skills </h3>
            <p>Launch  and Scale, Wealth Creation and Financial Freedom.</p>
          </div>
          <div className="right">
            <img src={tech} alt="" />
          </div>
        </UpskillHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />
      <Question />



    </div>

  )
}

const ExecutiveComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ExecutiveHero>
          <div className="left">
            <h3>
              Acquire strategic skills to
            </h3>
            <h3>
              boost business growth


            </h3>
            <p>Choose from wide range of upskill courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={executive} alt="" />
          </div>
        </ExecutiveHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <ExeEducation {...item} key={item.bootcampId} />
            ))
          }

        </Grid>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />
      <Question />



    </div>

  )
}

const DemandComponent = ({ bootcampTrainingInfo, itemsPerPage }) => {
  const { generalState: { navHeight } } = useAuth()
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = bootcampTrainingInfo?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(bootcampTrainingInfo?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % bootcampTrainingInfo?.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ExecutiveHero>
          <div className="left">
            <h3>
              Technical  skills most
            </h3>
            <h3>
              needed by companies and
            </h3>
            <h3>
              increase your earnings
            </h3>

            <p>Choose from wide range of In-demand courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={demand} alt="" />
          </div>
        </ExecutiveHero>
      </div>

      <ShortMid />

      <div className="container">
        <Grid>
          {
            currentItems?.map(item => (
              <InDemand {...item} key={item.bootcampId} />
            ))
          }

        </Grid>
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          // previousLabel="< previous"
          previousLabel="<"
          // previousLabel="&#8592;"
          renderOnZeroPageCount={null}
        />

      </div>

      <Companies />
      <Question />



    </div>

  )
}

const CourseComponent = () => {
  const [loading, setLoading] = useState(false)
  const [bootcampTrainingInfo, setBootcampTrainingInfo] = useState([]);

  const { getItem } = useLocalStorage();

  const bootcampTraining = getItem("gotocourse-bootcampdata");
  const userdata = getItem("gotocourse-userdata");

  const {
    generalState: { navHeight },
    studentFunctions: { wishlistCourse },
    otherFunctions: { fetchCategories, fetchCourses, fetchBootcamps },
  } = useAuth();

  // const categories = useQuery(["categories"], () => fetchCategories(), {
  //   onSuccess: res => {
  //     console.log("categories", res.data)
  //   },
  //   onError: err => console.error(err)

  // });
  // const courses = useQuery(["courses"], () => fetchCourses(), {
  //   onSuccess: res => {
  //     console.log("courses", res.data)
  //   },
  //   onError: err => console.error(err)

  // });

  const { id } = useParams()

  const change = id.split("_").join(" ")




  const bootcamps = useQuery(["bootcamps"], () => fetchBootcamps(), {
    onSuccess: res => {
      // console.log({res})
      // console.log(res.data.filter(item => item.subCategory === id && item.isActive))

      if (res.data) {
        const first = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-01-19T00:00:00.000Z" && item.isActive) : [];
        const second = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive) : [];
        const third = res.data?.length > 0 ? res.data?.filter(item => item.startDate !== "2023-01-05T00:00:00.000Z" && item.startDate !== "2023-01-19T00:00:00.000Z" && item.isActive).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
        const all = [...first, ...second, ...third];
        setBootcampTrainingInfo(all)
      // } else if (res.data) {
      //   setBootcampTrainingInfo(res.data.filter(item => item.subCategory === id && item.isActive))
      //   return

      } else {
        setBootcampTrainingInfo([])

      }

    },
    onError: err => console.error(err)

  });

  const navigate = useNavigate();






  return (
    <Layout>

      <div>

        {(id === "SHORT_COURSES") ? <ShortCourseComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
          (id === "UPSKILL_COURSES") ? <UpskillComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
            (id === "EXECUTIVE_COURSES") ? <ExecutiveComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
              (id === "IN_DEMAND") ? <DemandComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
                (id === "TECH_ENTREPRENEURSHIP") ? <TechComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
                  (id === "PATH_FINDERS") ? <PathComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
                    (id === "HEAD_START") ? <HeadstartComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
                      (id === "upcoming") ? <UpComeComponent bootcampTrainingInfo={bootcampTrainingInfo} itemsPerPage={12} /> :
                        ""
        }


      </div>
    </Layout>
  )
}


export default CourseComponent










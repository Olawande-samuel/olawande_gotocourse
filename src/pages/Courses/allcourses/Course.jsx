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
import { ExeEducation, InDemand, UpskillCourseCard } from '../../../components/NewLanding/landingComponents';
import short from '../../../images/short.png'
import executive from '../../../images/executive.png'
import demand from '../../../images/demand.png'
import skill from '../../../images/skill.png'
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

import cisco from "../../../images/landing/logos/cisco-2.svg"
import comptia from "../../../images/landing/logos/comptia.png"
import ec from "../../../images/landing/logos/ec_council.png"
import isc from "../../../images/landing/logos/ics.jpeg"
import isaca from "../../../images/landing/logos/isaca.jpeg"
import microsoft from "../../../images/landing/logos/microsoft.svg"
import pecb from "../../../images/landing/logos/pecb.jpeg"
import pmi from "../../../images/landing/logos/pmi.png"



const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
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
display: flex;
align-items: center;

    h3{
      font-weight: 700;
      font-size: 40px;
      line-height: 45px;
    }

    p{
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      padding: .5rem 0;
    }

    .left{
      flex: .5;
    }

    .right{
      flex: .5;
      height: 70vh;


      img{
        width: 100%;
        height: 100%;
        object-fit:cover;
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
  align-items: center;
  gap: 1rem;
  color: #464646;

  .benefits{
      p{
        font-weight: 700;
        font-size: 20px;
        line-height: 12px;
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

    h3{
      font-weight: 700;
      font-size: 40px;
      line-height: 45px;
    }

    p{
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      padding: .5rem 0;
    }

    .left{
      flex: .5;

    }

    .right{
      flex: .3;

       img{
         width: 100%;
         height: 100%;
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

const ExecutiveHero = styled.div`
width: 100%;
// border: 2px solid red;
display: flex;
align-items: center;
justify-content: space-between;

    h3{
      font-weight: 700;
      font-size: 40px;
      line-height: 45px;
    }

    p{
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      padding: .5rem 0;
    }

    .left{
      flex: .6;
      // border: 2px solid blue;

    }

    .right{
      flex: .3;

       img{
         width: 100%;
         height: 100%;
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


const myLogos = [cisco, comptia, ec, isc, isaca, microsoft, pecb, pmi]

const Logos = () => {
  return (
    <Section>
      <div className="container">
        <header>
          <h3>Some of the places our learners  work</h3>
        </header>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          loop={false}
          speed={1500}
          autoplay={{ delay: 2500 }}
          spaceBetween={0}
          slidesPerView={1}
          // navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            // when window width is >= 640px
            575: {
              slidesPerView: 4,
              spaceBetween: 5,
            },
            700: {
              slidesPerView: 5,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 8,
              spaceBetween: 3,
            },
            1704: {
              slidesPerView: 7,
              spaceBetween: 3,
            },
          }}
        >
          {myLogos.map((item, i) => (
            <SwiperSlide key={i}>
              <img src={item} alt="" />
            </SwiperSlide>
          ))}
        </Swiper>


      </div>
    </Section>
  )
}


const ShortCourseComponent = ({ bootcampTrainingInfo }) => {

  const { generalState: { navHeight }}= useAuth()
  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ShortHero>
          <div className="left">
            <h3>
              Short courses for knowledge boost
            </h3>
            <p>Choose from wide range of short courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={short} alt="" />
          </div>
        </ShortHero>
      </div>

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
              <span>24/7 unlimited accessbwith pre-recorded  lectures</span>
            </div>
          </div>

          <div className='item'>
            <svg width="30" height="30" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.1989 2.06251H35.5926C35.1074 2.06215 34.6419 2.25385 34.2977 2.59571L3.09766 33.7881C2.41467 34.4744 2.03125 35.4033 2.03125 36.3716C2.03125 37.3399 2.41467 38.2687 3.09766 38.9551L17.9512 53.8086C18.6377 54.4917 19.5668 54.8751 20.5353 54.8751C21.5038 54.8751 22.4329 54.4917 23.1194 53.8086L54.3106 22.6289C54.6524 22.2847 54.8441 21.8191 54.8438 21.334V5.71876C54.8461 5.23892 54.7535 4.76335 54.5713 4.31944C54.3891 3.87553 54.1209 3.47205 53.7821 3.13221C53.4434 2.79238 53.0407 2.52292 52.5974 2.33933C52.1541 2.15574 51.6788 2.06166 51.1989 2.06251V2.06251Z" stroke="#464646" stroke-width="4.0625" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='benefits'>
              <p>Low fees</p>
              <span>Our fees are low and easy to
                pay online</span>
            </div>
          </div>


        </ShortMiddleContent>
      </ShortMiddle>

      <div className="container">
        <Grid>
          {
            bootcampTrainingInfo?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>

      </div>

      <Logos />

      <Question />



    </div>

  )
}


const UpskillComponent = ({ bootcampTrainingInfo }) => {
  const { generalState: { navHeight }}= useAuth()
  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <UpskillHero>
          <div className="left">
            <h3>
              Increase your earning
              potential by upgrading
              your skillsets.
            </h3>
            <p>Choose from wide range of upskill courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={skill} alt="" />
          </div>
        </UpskillHero>
      </div>

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
              <span>24/7 unlimited accessbwith pre-recorded  lectures</span>
            </div>
          </div>

          <div className='item'>
            <svg width="30" height="30" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.1989 2.06251H35.5926C35.1074 2.06215 34.6419 2.25385 34.2977 2.59571L3.09766 33.7881C2.41467 34.4744 2.03125 35.4033 2.03125 36.3716C2.03125 37.3399 2.41467 38.2687 3.09766 38.9551L17.9512 53.8086C18.6377 54.4917 19.5668 54.8751 20.5353 54.8751C21.5038 54.8751 22.4329 54.4917 23.1194 53.8086L54.3106 22.6289C54.6524 22.2847 54.8441 21.8191 54.8438 21.334V5.71876C54.8461 5.23892 54.7535 4.76335 54.5713 4.31944C54.3891 3.87553 54.1209 3.47205 53.7821 3.13221C53.4434 2.79238 53.0407 2.52292 52.5974 2.33933C52.1541 2.15574 51.6788 2.06166 51.1989 2.06251V2.06251Z" stroke="#464646" stroke-width="4.0625" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='benefits'>
              <p>Low fees</p>
              <span>Our fees are low and easy to
                pay online</span>
            </div>
          </div>


        </ShortMiddleContent>
      </ShortMiddle>

      <div className="container">
        <Grid>
          {
            bootcampTrainingInfo?.map(item => (
              <UpskillCourseCard {...item} key={item.bootcampId} />
            ))
          }

        </Grid>

      </div>

      <Logos />

      <Question />



    </div>

  )
}


const ExecutiveComponent = ({ bootcampTrainingInfo }) => {
  const { generalState: { navHeight }}= useAuth()
  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ExecutiveHero>
          <div className="left">
            <h3>
              Acquire strategic skills to
            
              boost business growth
              your skillsets
            </h3>
            <p>Choose from wide range of upskill courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={executive} alt="" />
          </div>
        </ExecutiveHero>
      </div>

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
              <span>24/7 unlimited accessbwith pre-recorded  lectures</span>
            </div>
          </div>

          <div className='item'>
            <svg width="30" height="30" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.1989 2.06251H35.5926C35.1074 2.06215 34.6419 2.25385 34.2977 2.59571L3.09766 33.7881C2.41467 34.4744 2.03125 35.4033 2.03125 36.3716C2.03125 37.3399 2.41467 38.2687 3.09766 38.9551L17.9512 53.8086C18.6377 54.4917 19.5668 54.8751 20.5353 54.8751C21.5038 54.8751 22.4329 54.4917 23.1194 53.8086L54.3106 22.6289C54.6524 22.2847 54.8441 21.8191 54.8438 21.334V5.71876C54.8461 5.23892 54.7535 4.76335 54.5713 4.31944C54.3891 3.87553 54.1209 3.47205 53.7821 3.13221C53.4434 2.79238 53.0407 2.52292 52.5974 2.33933C52.1541 2.15574 51.6788 2.06166 51.1989 2.06251V2.06251Z" stroke="#464646" stroke-width="4.0625" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='benefits'>
              <p>Low fees</p>
              <span>Our fees are low and easy to
                pay online</span>
            </div>
          </div>


        </ShortMiddleContent>
      </ShortMiddle>

      <div className="container">
        <Grid>
          {
            bootcampTrainingInfo?.map(item => (
              <ExeEducation {...item} key={item.bootcampId} />
            ))
          }

        </Grid>

      </div>

      <Logos />

      <Question />



    </div>

  )
}

const DemandComponent = ({ bootcampTrainingInfo }) => {
  const { generalState: { navHeight }}= useAuth()
  return (
    <div style={{ marginTop: navHeight }}>
      <div className='container'>
        <ExecutiveHero>
          <div className="left">
            <h3>
              Technical  skills most
              
              needed by companies and
            
              increase your earnings
            </h3>

            <p>Choose from wide range of upskill courses  and tech Entrepreneurship  across various categories.</p>
          </div>
          <div className="right">
            <img src={demand} alt="" />
          </div>
        </ExecutiveHero>
      </div>

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
              <span>24/7 unlimited accessbwith pre-recorded  lectures</span>
            </div>
          </div>

          <div className='item'>
            <svg width="30" height="30" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M51.1989 2.06251H35.5926C35.1074 2.06215 34.6419 2.25385 34.2977 2.59571L3.09766 33.7881C2.41467 34.4744 2.03125 35.4033 2.03125 36.3716C2.03125 37.3399 2.41467 38.2687 3.09766 38.9551L17.9512 53.8086C18.6377 54.4917 19.5668 54.8751 20.5353 54.8751C21.5038 54.8751 22.4329 54.4917 23.1194 53.8086L54.3106 22.6289C54.6524 22.2847 54.8441 21.8191 54.8438 21.334V5.71876C54.8461 5.23892 54.7535 4.76335 54.5713 4.31944C54.3891 3.87553 54.1209 3.47205 53.7821 3.13221C53.4434 2.79238 53.0407 2.52292 52.5974 2.33933C52.1541 2.15574 51.6788 2.06166 51.1989 2.06251V2.06251Z" stroke="#464646" stroke-width="4.0625" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            <div className='benefits'>
              <p>Low fees</p>
              <span>Our fees are low and easy to
                pay online</span>
            </div>
          </div>


        </ShortMiddleContent>
      </ShortMiddle>

      <div className="container">
        <Grid>
          {
            bootcampTrainingInfo?.map(item => (
              <InDemand {...item} key={item.bootcampId} />
            ))
          }

        </Grid>

      </div>

      <Logos />

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
        setBootcampTrainingInfo(res.data.filter(item => item.subCategory === id && item.isActive))
        return
      }
      setBootcampTrainingInfo({})

    },
    onError: err => console.error(err)

  });

  const navigate = useNavigate();






  return (
    <Layout>

    <div>

        {(id === "SHORT_COURSES") ? <ShortCourseComponent bootcampTrainingInfo={bootcampTrainingInfo} /> :
          (id === "UPSKILL_COURSES") ? <UpskillComponent bootcampTrainingInfo={bootcampTrainingInfo} /> :
            (id === "EXECUTIVE_COURSES") ? <ExecutiveComponent bootcampTrainingInfo={bootcampTrainingInfo} /> :
              (id === "IN_DEMAND") ? <DemandComponent bootcampTrainingInfo={bootcampTrainingInfo} /> :
                (id === "TECH_ENTREPRENEURSHIP") ? <ShortCourseComponent bootcampTrainingInfo={bootcampTrainingInfo} /> : ""
        }


      </div>
    </Layout>
  )
}


export default CourseComponent










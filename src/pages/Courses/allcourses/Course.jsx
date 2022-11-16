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
import { UpskillCourseCard } from '../../../components/NewLanding/landingComponents';

const Header = styled.header`
width: 100%;
text-align: center;
padding: 1rem;
background: #0C2191;
color: #fff;

`
const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 230px), 230px));
    gap: 1.5rem;
    justify-content:space-around;
    margin: 1rem 0 ;
    

    /* @media screen and (max-width:710px){
        grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (max-width:500px){
        grid-template-columns: min(100%, 380px);
        justify-content:center;
    } */
    `

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

  const categories = useQuery(["categories"], () => fetchCategories(), {
    onSuccess: res => {
      console.log("categories", res.data)
    },
    onError: err => console.error(err)

  });
  const courses = useQuery(["courses"], () => fetchCourses(), {
    onSuccess: res => {
      console.log("courses", res.data)
    },
    onError: err => console.error(err)

  });

  const { id } = useParams()

  const change= id.split("_").join(" ")


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




  async function handleBootstrapEnrollment(e) {
    e.preventDefault();
    if (userdata?.token) {
      navigate("payment")
    } else {
      navigate("/login")
    }
  }
  async function addToWishList() {

    if (userdata !== null) {
      try {
        setLoading(true)
        const response = await wishlistCourse(bootcampTraining.bootcampId, userdata?.token)
        const { success, message, statusCode } = response
        if (!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
        toast.success(message)
      } catch (error) {
        console.error(error)
        toast.error(error.message);
      } finally {
        setLoading(false)
      }


    } else {
      navigate("/login")
    }
  }

  return (
    <Layout>
      <Header>
        <h3 style={{textTransform: "capitalize"}}>{change}</h3>
      </Header>
      <div className="container">
        <Grid>
          {
            bootcampTrainingInfo?.map(item => (
              <UpskillCourseCard {...item} />
            ))
          }

        </Grid>

      </div>
    </Layout>
  )
}


export default CourseComponent










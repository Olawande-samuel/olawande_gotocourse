import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../../components/Layout'
import { useAuth } from '../../../contexts/Auth';
import { Box, Tabs, Tab, Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import { CourseWrapper, Main } from './style';

import cybersecurity from "../../../images/cybersecurity.webp"
const AllCourses = () => {

  return (
    <Layout>
      <div className="container">
        <TabsComp />
      </div>
    </Layout>
  )
}


export default AllCourses

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} style={{ height: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function TabsComp(){
  const [value, setValue] = useState(0);
  const {
    otherFunctions: { fetchCategories, fetchCourses },
  } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = useQuery(["categories"], () => fetchCategories());
  const courses = useQuery(["courses"], () => fetchCourses());
  
  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"

        TabIndicatorProps={{sx:{backgroundColor: '#0C2191'}}} 
        sx={{
          "& button": {color:'#0C2191'},
          "& button.Mui-selected": {color:'#0C2191 !important', fontWeight: 'bold'},
        }}
      >
        <Tab
          label={"ALL CATEGORIES"}
          className="text-capitalize fw-bolder text-dark"
          {...a11yProps(0)}
        ></Tab>
        {categories.data?.data?.map((h, i) => (
          <Tab
            key={i + 1}
            label={h.name}
            className="text-capitalize fw-bolder text-dark"
            {...a11yProps(i + 1)}
          />
        ))}
      </Tabs>

      <TabPanel
        value={value}
        index={0}
        style={{ height: "100%", width: "100%", paddingBottom: "1rem" }}
        key={0}
      >
        <div className="popular_views">
          <Main>
            {courses.data?.data?.map((item) => (
              <Course {...item} all={item} type="course"/>

            ))}

          </Main> 
          </div>
      </TabPanel>
      {categories.data?.data?.map((item, index) => (
        <TabPanel
          value={value}
          index={index + 1}
          style={{ height: "100%", width: "100%" }}
          key={index + 1}
        >
          <div className="popular_views">
            <CoursesContainer  category={item} key={index}  />
          </div>
        </TabPanel>
      ))}
     
    </>
  )
}

function CoursesContainer({ category, tab_number, popular }) {
  const {
    otherFunctions: { fetchCategory, searchCategories },
  } = useAuth();


  const courses = useQuery(["categ"], () => searchCategories(category?.name), {
    notifyOnChangeProps:["category", "isFetching"]
  })

  useEffect(()=>{
    if(category && popular !== true){
      courses.refetch()
    }
  },[category])

  
  return (
  <>
    <Main>
      {

        courses.isFetching ? 

          [0, 0, 0, 0].map((_, i)=>(
            <Skeleton key={i} className="col-md-9 p-2 p-md-3 pe-md-4" variant='rectangular' width={230} height={200} animation="wave" sx={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
          ))
        :

        courses.data?.data?.map((course) => (
            <Course {...course} all={course} type="course" />

        ))

      }
    </Main>    
  </>
  
);
}


function Course({name, bannerImg, courseImg, all, type}){
  const navigate = useNavigate();

  function handleNavigate(){     

  if(type === "category"){
    localStorage.setItem("gotocourse-category", JSON.stringify(all))
    navigate(`/categories/${name.trim().split(" ").join("-").toLowerCase()}`)
  }else {
    localStorage.setItem("gotocourse-courseInfo", JSON.stringify(all))
    localStorage.setItem("gotocourse-courseId", all.courseId)
    navigate(`/categories/${all?.category.trim().split(" ").join("-").toLowerCase()}/courses/${name.trim().split(" ").join("-").toLowerCase()}`)
  }
}
  return (
    <CourseWrapper onClick={handleNavigate}>
      <img src={bannerImg ? bannerImg : courseImg} alt="" />
      <small>{name}</small>
    </CourseWrapper>
  )
}

import {useEffect} from 'react'
import { Box, Tabs, Tab, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

import placeholder from "../../images/cybersecurity.webp";
import SwiperCore, {
  Navigation,
  Autoplay,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

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

export function Category() {
  const [value, setValue] = useState(0);
  const {
    otherFunctions: { fetchCategories, fetchCourses },
  } = useAuth();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const categories = useQuery(["categories"], () => fetchCategories());
  const courses = useQuery(["courses"], () => fetchCourses());

  // console.log(courses.data?.data?.filter(course=>course.category.toLowerCase() === categories.data.data[1]?.name.toLowerCase()))
  // console.log(courses.data?.data?.map(item=>console.log(item.name)))

  return (
    <section className="newCategories">
      <header>
        <h1 className="newCategories_header">Popular Courses</h1>
      </header>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"
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
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          loop={true}
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
              slidesPerView: 2,
              spaceBetween: 5,
            },
            700: {
              slidesPerView: 3,
              spaceBetween: 5,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 28,
            },
          }}
        >
          {categories.data?.data?.map((item) => (
            <SwiperSlide key={item.categoryId}>
              <CategoryCard {...item} type="category" all={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </TabPanel>

      {categories.data?.data?.map((item, index) => (
        <TabPanel
          value={value}
          index={index + 1}
          style={{ height: "100%", width: "100%" }}
          key={index + 1}
        >
          <CoursesContainer courses={courses} category={item} />
        </TabPanel>
      ))}
    </section>
  );
}
function CoursesContainer({ category }) {
  const {
    otherFunctions: { fetchCategory, searchCategories },
  } = useAuth();


  const courses = useQuery(["categ"], () => searchCategories(category?.name), {
    notifyOnChangeProps:["category", "isFetching"]
  })

  useEffect(()=>{
    if(category){
      courses.refetch()
    }
  },[category])

  
  return (
    <>
    {
    courses.isFetching ? 
    <div className="d-flex" style={{gap:"1rem"}}>
     { [0, 0, 0].map((_, i)=>(
        <Skeleton key={i} className="col-md-9 p-2 p-md-3 pe-md-4" variant='rectangular' width={350} height={250} animation="wave" sx={{borderTopLeftRadius: 10, borderTopRightRadius: 10}} />
        ))}
      </div>
  :
    <Swiper
      // install Swiper modules
      modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
      // loop={true}
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
          slidesPerView: 2,
          spaceBetween: 5,
        },
        700: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        1024: {
          slidesPerView: 3.5,
          spaceBetween: 28,
        },
      }}
    >
      {courses.data?.data?.map((course) => (
          <SwiperSlide key={course.courseId}>
            <CategoryCard {...course} all={course} key={course.courseId} />
          </SwiperSlide>
        ))}
    </Swiper>
    }
    </>
  
  );
}

function CategoryCard({
  type,
  bannerImg,
  courseId,
  courseImg,
  name,
  instructorName,
  category,
  all,
}) {
  const navigate = useNavigate()

  function handleCourseSelect( type){        

    if(type === "category"){
      localStorage.setItem("gotocourse-category", JSON.stringify(all))
      navigate(`categories/${name.split(" ").join("-").toLowerCase()}`)
    }else {
      localStorage.setItem("gotocourse-courseInfo", JSON.stringify(all))
      localStorage.setItem("gotocourse-courseId", all.courseId)
      navigate(`/categories/${category?.split(" ").join("-")}/courses/${name.split(" ").join("-").toLowerCase()}}`)
    }
}
  return (
    <div onClick={()=>handleCourseSelect(type)} >
      <div
        className={`card newCategories_card`}
        style={{ cursor: "pointer", height: "100%" }}
      >
        <img
          src={
            type === "category"
              ? bannerImg
              : courseImg
              ? courseImg
              : placeholder
          }
          alt=""
          className={`card-img-top newCategories_image`}
        />
        <div className={`card-body newCategories_card-body`}>
          <h6
            className={`card-title newCategories_card-title text-center fw-bolder`}
          >
            {name}
          </h6>
          {/* <h6 className={`card-subtitle `}>{category}</h6> */}
          {/* add line-clamp to this v */}
          {/* <p className={`text-center `}>{instructorName}</p> */}
        </div>
      </div>
    </div>
  );
}

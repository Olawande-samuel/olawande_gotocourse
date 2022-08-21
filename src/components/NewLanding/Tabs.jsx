import { Box, Tabs, Tab } from "@mui/material";
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


  console.log({value})
  return (
    <section className="newCategories">
      <header>
        <h1 className="newCategories_header">Popular Categories</h1>
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
            label={h.name}
            className="text-capitalize fw-bolder text-dark"
            {...a11yProps(i + 1)}
          />
        ))}
      </Tabs>

      <TabPanel
        value={value}
        index={0}
        style={{ height: "100%", width: "100%", paddingBottom:"1rem" }}
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
          {courses.data?.data?.map((item) => (
            <SwiperSlide key={item.courseId}>
              <CategoryCard {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </TabPanel>

      {categories.data?.data?.map((item, index) => (
        <TabPanel
          value={value}
          index={index + 1}
          style={{ height: "100%", width: "100%" }}
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
          {courses.data?.data?.filter(course=>course.category.toLowerCase() === item.name.toLowerCase()).map((course) => (
            <SwiperSlide key={course.courseId}>
              <CategoryCard {...course} all={course}  key={course.courseId} />
            </SwiperSlide>
          ))}
        </Swiper>
      
        </TabPanel>
      ))}
    </section>
  );
}

function CategoryCard({ courseId, courseImg, name, instructorName, category, all }) {
  
  return (
    <Link to={`categories/${category.split(" ").join("-").toLowerCase()}/courses/${name.split(" ").join("-").toLowerCase()}`}>
    <div
      className={`card newCategories_card`}
      style={{ cursor: "pointer", height: "100%" }}
    >
      <img
        src={courseImg ? courseImg : placeholder}
        alt=""
        className={`card-img-top newCategories_image`}
      />
      <div className={`card-body newCategories_card-body`}>
          <h6 className={`card-title newCategories_card-title text-center fw-bolder`}>{name}</h6>
        {/* <h6 className={`card-subtitle `}>{category}</h6> */}
        {/* add line-clamp to this v */}
        {/* <p className={`text-center `}>{instructorName}</p> */}
      </div>
    </div>
        </Link>
  );
}

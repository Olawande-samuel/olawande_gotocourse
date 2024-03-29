
import { useEffect } from 'react'
import { Box, Tabs, Tab, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";
import { motion } from "framer-motion"
import placeholder from "../../images/cybersecurity.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Autoplay, Pagination, Scrollbar, A11y, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";

import { COURSE_CATEGORY_KEY, gotoclass } from '../../constants';
import { CelebCard } from '../../pages/Celebrity';

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

export function Category({ size = 4, midSize = 4, gap = 10 }) {

  return (
    <section className="mt-4">
      <div className="container-xxl">
        <header className="newCategories_header_wrapper">
          <h1 className="newCategories_header">A broad selection of courses</h1>
          <p className="sub_title text-start" style={{ width: "min(100% - 1rem, 1300px)" }}>
            With over  50 tailored courses taught by industry experts on Gotocourse, you will be exposed to required skills required to launch or scale your career in as little as 3 to 5 months—even if you don’t have any previous experience.
          </p>
        </header>
        <TabsComp />

      </div>
    </section>
  );

}

export function TrainCategory({ size = 4, midSize = 4, gap = 10 }) {

  return (
    <section className="mt-4">
      <div className="container-xxl">
        <header className="newCategories_header_wrapper">
          <h1 className="newCategories_header text-center">Courses Available</h1>
          <p className="sub_title text-center" style={{ width: "min(100% - 1rem, 1300px)" }}>
            Access a wide range of in-demand tech and business skills courses taught by industry <br /> experts specially curated for you.
          </p>
        </header>
        <TrainTabsComp />
        {/* <WomenTabsComp /> */}

      </div>
    </section>
  );

}

export function TrainTabsComp() {
  const {
    // otherFunctions: { fetchCategories, fetchCourses },
    otherFunctions: { fetchCourses, fetchBootcamps }
  } = useAuth();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isSuccess } = useQuery(["bootcamps"], () => fetchBootcamps());

  const all = data?.data?.length > 0 ? data?.data?.filter(item => item.category === "TRAIN2 WORKABROAD") : [];

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"

        TabIndicatorProps={{ sx: { backgroundColor: '#000', display: "none" } }}
        sx={{
          "& button": { color: '#000' },
          "& button.Mui-selected": { color: '#000 !important', fontWeight: 'bold', fontSize: "18px" },
        }}
      >
        <Tab
          label={"Train to work abroad programme"}
          className="text-capitalize fw-bolder text-dark"
          {...a11yProps(0)}
        >

        </Tab>
        {/* {categories.data?.data?.map((h, i) => (
          <Tab
            key={i + 1}
            label={h.name}
            className="text-capitalize fw-bolder text-dark"
            {...a11yProps(i + 1)}
          />
        ))} */}
      </Tabs>

      <TabPanel
        value={value}
        index={0}
        style={{ height: "100%", width: "100%", paddingBottom: "1rem" }}
        key={0}
      >
        <div className="popular_views dark_border">
          <Link to={`/categories`} className="d-inline-flex">
            <motion.button
              whileHover={{
                boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                backgroundColor: "#eee"
              }}
              className="btn-plain new_categories_btn py-2 px-4 mb-4 rounded-0">Explore Courses</motion.button>
          </Link>
          <Swiper
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            loop={true}
            speed={1500}
            autoplay={{ delay: 3500 }}
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1704: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
            }}
          >
            {all?.map((item, i) => (
              <SwiperSlide key={item.bootcampId}>
              <CourseCard  {...item} all={item} />
            </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </TabPanel>

      {/* {categories.data?.data?.map((item, index) => (
        <TabPanel
          value={value}
          index={index + 1}
          style={{ height: "100%", width: "100%" }}
          key={index + 1}
        >
          <div className="popular_views dark_border">
            <h1 className="newCategories_header">Expand your opportunities with <span className="text-capitalize">{item.name.toLowerCase()}</span></h1>
            <Link to={`/categories/${item.name}`} className="d-inline-flex">
              <motion.button
                whileHover={{ 
                  boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                  textShadow:"0px 0px 8px rgb(255, 255, 255)",
                  backgroundColor: "#eee"
                }}
                className="btn-plain py-2 px-4  mb-4 rounded-0">Explore <span className="text-capitalize">{item.name.toLowerCase()}</span></motion.button>
            </Link>
            <CoursesContainer courses={courses} category={item} key={index}  />
          </div>
        </TabPanel>
      ))} */}

    </>
  )
}




export function WomenTabsComp() {
  const {
    // otherFunctions: { fetchCategories, fetchCourses },
    otherFunctions: { fetchCourses, fetchBootcamps }
  } = useAuth();

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data, isSuccess } = useQuery(["bootcamps"], () => fetchBootcamps());

  const all = data?.data?.length > 0 ? data?.data?.filter(item => item.category === "TRAIN2 WORKABROAD") : [];

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="scrollable"

        TabIndicatorProps={{ sx: { backgroundColor: '#000', display: "none" } }}
        sx={{
          "& button": { color: '#000' },
          "& button.Mui-selected": { color: '#000 !important', fontWeight: 'bold', fontSize: "18px" },
        }}
      >
        <Tab
          label={"Women in tech programme"}
          className="text-capitalize fw-bolder text-dark"
          {...a11yProps(0)}
        >

        </Tab>
        {/* {categories.data?.data?.map((h, i) => (
          <Tab
            key={i + 1}
            label={h.name}
            className="text-capitalize fw-bolder text-dark"
            {...a11yProps(i + 1)}
          />
        ))} */}
      </Tabs>

      <TabPanel
        value={value}
        index={0}
        style={{ height: "100%", width: "100%", paddingBottom: "1rem" }}
        key={0}
      >
        <div className="popular_views dark_border">
          <Link to={`/categories`} className="d-inline-flex">
            <motion.button
              whileHover={{
                boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                backgroundColor: "#eee"
              }}
              className="btn-plain new_categories_btn py-2 px-4 mb-4 rounded-0">Explore Courses</motion.button>
          </Link>
          <Swiper
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            loop={true}
            speed={1500}
            autoplay={{ delay: 3500 }}
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1704: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
            }}
          >
            {all?.map((item, i) => (
              <SwiperSlide key={item.bootcampId}>
                <CourseCard  {...item} all={item} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </TabPanel>

      {/* {categories.data?.data?.map((item, index) => (
        <TabPanel
          value={value}
          index={index + 1}
          style={{ height: "100%", width: "100%" }}
          key={index + 1}
        >
          <div className="popular_views dark_border">
            <h1 className="newCategories_header">Expand your opportunities with <span className="text-capitalize">{item.name.toLowerCase()}</span></h1>
            <Link to={`/categories/${item.name}`} className="d-inline-flex">
              <motion.button
                whileHover={{ 
                  boxShadow: "0px 0px 8px rgb(0, 0, 0)", 
                  textShadow:"0px 0px 8px rgb(255, 255, 255)",
                  backgroundColor: "#eee"
                }}
                className="btn-plain py-2 px-4  mb-4 rounded-0">Explore <span className="text-capitalize">{item.name.toLowerCase()}</span></motion.button>
            </Link>
            <CoursesContainer courses={courses} category={item} key={index}  />
          </div>
        </TabPanel>
      ))} */}

    </>
  )
}


function PopularContainer({ category, tab_number, popular }) {
  const {
    otherFunctions: { fetchCourses, searchCategories },
  } = useAuth();


  const courses = useQuery(["popular"], () => fetchCourses(), {
    notifyOnChangeProps: ["all course", "isFetching"]
  })

  useEffect(() => {
    if (category) {
      courses.refetch()
    }
  }, [category])


  return (
    <>
      {
        <Swiper
          // install Swiper modules
          modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
          loop={true}
          speed={1500}
          autoplay={{ delay: 2000 }}
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
              slidesPerView: tab_number ? tab_number : 4,
              spaceBetween: 28,
            },
            1704: {
              slidesPerView: 4.5,
              spaceBetween: 28,
            },
          }}
        >
          {
            courses.isFetching ?
              <SwiperSlide>
                <div className="d-flex" style={{ gap: "1rem" }}>
                  {[0, 0, 0, 0].map((_, i) => (
                    <Skeleton key={i} className="col-md-9 p-2 p-md-3 pe-md-4" variant='rectangular' width={250} height={200} animation="wave" sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                  ))}
                </div>
              </SwiperSlide>
              :
              courses.data?.data?.map((course) => (
                <SwiperSlide key={course.courseId}>
                  <CategoryCard {...course} all={course} key={course.courseId} />
                </SwiperSlide>
              ))
          }
        </Swiper>

      }
      <div className="d-flex">
        <Link to={`/courses`} className="d-inline-flex ms-auto">
          <motion.button
            whileHover={{
              boxShadow: "0px 0px 8px rgb(0, 0, 0)",
              textShadow: "0px 0px 8px rgb(255, 255, 255)",
              backgroundColor: "#eee"
            }}
            className="btn-plain new_categories_btn py-2 px-4 mb-4 rounded-0">Explore Courses</motion.button>
        </Link>
      </div>
    </>

  );
}
function CoursesContainer({ category, tab_number, popular }) {
  const {
    otherFunctions: { fetchCategory, searchCategories, fetchBootcamps },
  } = useAuth();


  const courses = useQuery(["categ"], () => searchCategories(category?.name), {
    notifyOnChangeProps: ["category", "isFetching"]
  })
  const classes = useQuery(["fetch classes", category], () => fetchBootcamps(), {
    notifyOnChangeProps: ["category", "isFetching"]
  })

  console.log(classes.data?.data?.filter(c => c.category === category))
  console.log({ category })
  useEffect(() => {
    if (category && popular !== true) {
      courses.refetch()
    }
  }, [category])


  return (
    <>

      <Swiper
        // install Swiper modules
        modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
        loop={true}
        speed={1500}
        autoplay={{ delay: 2000 }}
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
            slidesPerView: tab_number ? tab_number : 4,
            spaceBetween: 28,
          },
          1704: {
            slidesPerView: 4,
            spaceBetween: 28,
          },
        }}
      >

        {
          classes.isFetching ?
            <div className="d-flex" style={{ gap: "1rem" }}>
              {[0, 0, 0, 0].map((_, i) => (
                <SwiperSlide key={i}>
                  <Skeleton key={i} className="col-md-9 p-2 p-md-3 pe-md-4" variant='rectangular' width={250} height={200} animation="wave" sx={{ borderTopLeftRadius: 10, borderTopRightRadius: 10 }} />
                </SwiperSlide>
              ))}
            </div>
            :
            classes.data?.data?.filter(c => c.category === category.name && c.isActive).map((course) => (
              <SwiperSlide key={course.courseId}>
                <CategoryCard {...course} all={course} key={course.bootcampId} />
              </SwiperSlide>
            ))
        }
      </Swiper>
    </>

  );
}

export function TabsComp() {
  const {
    otherFunctions: { fetchCategories, fetchCourses },
  } = useAuth();

  const [value, setValue] = useState(0);
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

        TabIndicatorProps={{ sx: { backgroundColor: '#F75C4E' } }}
        sx={{
          "& button": { color: '#F75C4E' },
          "& button.Mui-selected": { color: '#F75C4E !important', fontWeight: 'bold' },
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
        <div className="popular_views dark_border">
          <Link to={`/categories`} className="d-inline-flex">
            <motion.button
              whileHover={{
                boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                backgroundColor: "#eee"
              }}
              className="btn-plain new_categories_btn py-2 px-4 mb-4 rounded-0">Explore Categories</motion.button>
          </Link>
          <Swiper
            modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
            loop={true}
            speed={1500}
            autoplay={{ delay: 3500 }}
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
              1704: {
                slidesPerView: 4.5,
                spaceBetween: 20,
              },
            }}
          >
            {categories.data?.data?.map((item, i) => (
              <SwiperSlide key={item.categoryId}>
                <CategoryCard {...item} type="category" all={item} />
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </TabPanel>

      {categories.data?.data?.map((item, index) => (
        <TabPanel
          value={value}
          index={index + 1}
          style={{ height: "100%", width: "100%" }}
          key={index + 1}
        >
          <div className="popular_views dark_border">
            <h1 className="newCategories_header">Expand your opportunities with <span className="text-capitalize">{item.name.toLowerCase()}</span></h1>
            <Link to={`/categories/${item.name}`} className="d-inline-flex">
              <motion.button
                whileHover={{
                  boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                  textShadow: "0px 0px 8px rgb(255, 255, 255)",
                  backgroundColor: "#eee"
                }}
                className="btn-plain py-2 px-4  mb-4 rounded-0">Explore <span className="text-capitalize">{item.name.toLowerCase()}</span></motion.button>
            </Link>
            <CoursesContainer courses={courses} category={item} key={index} />
          </div>
        </TabPanel>
      ))}
      {/* <div className="popular_views">
        <h1 className="newCategories_header">Popular courses students are viewing</h1>
        <PopularContainer tab_number={4} courses={courses} category={"CLOUD COMPUTING"} />
      </div> */}
    </>
  )
}

function CategoryCard({
  type,
  bannerImg,
  bootcampImg,
  title,
  bootcampId,
  courseId,
  courseImg,
  name,
  instructorName,
  category,
  all,
}) {
  const navigate = useNavigate()

  function handleCourseSelect(type) {
    if (type === "category") {
      localStorage.setItem(COURSE_CATEGORY_KEY, JSON.stringify(all))
      navigate(`/categories/${name.split(" ").join("-").toLowerCase()}`)
    } else {
      localStorage.setItem("gotocourse-courseInfo", JSON.stringify(all))
      localStorage.setItem("gotocourse-courseId", all.courseId)
      navigate(`/categories/${all.category?.trim().split(" ").join("-").toLowerCase()}/courses/${title.trim().split(" ").join("-").toLowerCase()}/${bootcampId.trim()}`)
    }
  }
  return (
    <div onClick={() => handleCourseSelect(type)} className="newCategories_card_wrapper" >
      <div
        className={`card newCategories_card`}
        style={{ cursor: "pointer", height: "100%" }}
      >
        <img
          src={
            type === "category" ? bannerImg : bootcampImg ? bootcampImg : placeholder}
          alt=""
          className={`card-img-top newCategories_image`}
        />
        <div className={`card-body newCategories_card-body`}>
          <h6
            className={`card-title newCategories_card-title text-center`}
          >
            {name ? name : title}
          </h6>
          {/* <h6 className={`card-subtitle `}>{category}</h6> */}
          {/* add line-clamp to this v */}
          {/* <p className={`text-center `}>{instructorName}</p> */}
        </div>
      </div>
    </div>
  );
}


function CourseCard({
  title, 
  bootcampImg, 
  bootcampId, 
  category, 
  subCategory, 
  description, 
  startDate, 
  duration, 
  price, 
  packages, 
  popupTitle, 
  popupArr, 
  all
}) {
  const navigate = useNavigate()

  
  return (
    <div onClick={() =>  gotoclass(title, category, bootcampId, navigate)} className="newCategories_card_wrapper" >
      <div
        className={`card newCategories_card`}
        style={{ cursor: "pointer", height: "100%" }}
      >
        <img
          src={bootcampImg}
          alt=""
          className={`card-img-top newCategories_image`}
        />
        <div className={`card-body newCategories_card-body`}>
          <h6
            className={`card-title newCategories_card-title text-center`}
          >
            {title}
          </h6>
          {/* <h6 className={`card-subtitle `}>{category}</h6> */}
          {/* add line-clamp to this v */}
          {/* <p className={`text-center `}>{instructorName}</p> */}
        </div>
      </div>
    </div>
  );
}

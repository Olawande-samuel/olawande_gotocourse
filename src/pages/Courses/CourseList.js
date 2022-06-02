import React from 'react'


import Layout from '../../components/Layout'
import { careers } from '../../components/Career' 
import style from "./courses.module.css"
const CourseList = () => {
  return (
    <Layout>
        <div className={`container ${style.block}`}>
            <div className={style.breadcrumbs_wrapper}>
                <nav arial-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Homepage</li>
                        <li className="breadcrumb-item active">Courses</li>
                    </ol>
                </nav>
            </div>
            <div className={`d-flex justify-content-between align-items-center ${style.top}`}>
                <h3 className={style.section_title}>Categories</h3>
                <div className={`${style.input_wrapper} d-flex`}>
                    <input type="search" name="search" id="search" className="form-control" placeholder="Search category" />
                    <button className="button">Search</button>
                </div>
            </div>
            <main className={style.main}>
                {careers.map(career=>(
                    <Card  {...career} />
                ))}
            </main>
        </div>
    </Layout>
  )
}

export default CourseList

const Card =()=>{
    return(
        <div>card</div>
    )
}


{/* <section className="wrapper hero">
          <div className=" hero_container">
            <div className="hero_item">
              <motion.div
                className="hero_left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 1.5 }}
              >
                <h1 className="hero_text">
                  We make Teaching and learning Tech skills Accessible
                </h1>
                <div className="d-flex">
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="form-control"
                  />
                  <button className="btn search_btn">
                    <FaSearch />
                  </button>
                </div>
                <div className="d-flex  keyword_wrapper  mt-4">
                  <span>Popular: </span>
                  <div className="d-flex flex-wrap pill_wrapper">
                    <button className="pill">UI/UX</button>
                    <button className="pill">Web design</button>
                    <button className="pill">Cybersecurity</button>
                  </div>
                </div>
                <p className="hero_subtext text-center text-md-start">
                  Join hundreds of people that trust Gotocourse to teach and
                  learn in-demand tech skills
                </p>
              </motion.div>
              <motion.div
                className="hero_right"
                initial={{ x: 800 }}
                animate={{ x: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 110,
                  delay: 0.2,
                  duration: 0.8,
                }}
              >
                <Image image={gen} alt="Testing" effect="blur" />
              </motion.div>
            </div>
          </div>
        </section> */}
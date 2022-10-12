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


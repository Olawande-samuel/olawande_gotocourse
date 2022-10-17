import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {MdNavigateNext} from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Breadcrumbs, Skeleton } from "@mui/material";




import Layout from "../../../components/Layout";
import { useEffectOnMount, useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import { AdvancedError } from "../../../classes";
import {COURSE_CATEGORY_KEY, capitalize, getDate} from "../../../constants";




const CourseContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: center;
    padding: 20px 40px;

    @media screen and (max-width: 466px){
        padding: 20px;
    }
`;

const CourseTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    padding: 20px;

    @media screen and (max-width: 812px){
        flex-direction: column;
        gap: 20px;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 0;
    }
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 400;
    font-size: 1rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed': 'pointer'};

    &:hover {
        color:#0C2191
    }
`;


const CourseBody = styled.div`
    width: 100%;
    padding: 0px;
    display: grid;
    grid-template-columns: 1fr;
`

const Card = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 10px;
    cursor: pointer;

    @media screen and (max-width: 590px){
        flex-direction: column;
        gap: 20px;
    }
`

const CardImageContainer = styled.div`
    max-width: 400px;
    height: 100%;
    flex-basis: 40%;

    & img {
        width: 100%;
        min-height: 240px;
        object-fit: cover;
    }
`

const CardBody = styled.div`
    flex: 1;
    margin-left: 30px;
    max-width: 800px;
    height: 100%;
    display: flex;
    flex-direction: column;

    & h2 {
        font-size: 24px;
        color: #0C2191;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 20px;
    }

    & p {
        color: #070F18;
        font-size: 13px;
        line-height:26px;
        margin-bottom: 30px;
        font-style: normal;

        @media screen and (max-width: 977px){
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
`

const Separator = styled.hr`
    width: 100%;
    height: 1px;
    border: none;
    background-color: #000;
`

const Date = styled.div`
    display: flex;
    flex-direction: column;

    & h3 {
        font-size: 1rem;
        font-weight: 700;
    }

    & span {
        font-weight: 200;
        font-size: 0.8rem;
    }
`


const Course = () => {
    const {otherFunctions: {searchCategories}} = useAuth();
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();
    const {getItem} = useLocalStorage();
    let category = getItem(COURSE_CATEGORY_KEY);


   

    useEffectOnMount(() => {
        
        
        (async () => {
            try{
                const res = await searchCategories(category.name);
                const {message, statusCode, success} = res;
                if(!success) throw new AdvancedError(message, statusCode);
                else {
                    const {data} = res;
                    setCourses(_ =>  [...data]);
                }
            }catch(err){
               console.error(err)
            }
        })()
        return () => console.log("Course page is unmounted");
    }, [])


    function gotoCourseHandler(e, name){
        navigate(encodeURIComponent(name))
    }


    return (
        <Layout background="category">
            <ToastContainer />
            <CourseContainer>
                <CourseTop>
                    <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                        <BreadcrumbLink to="/">
                            Home
                        </BreadcrumbLink>
                        <BreadcrumbLink to="/categories">
                            Categories
                        </BreadcrumbLink>
                        <BreadcrumbLink to={`/categories/${encodeURIComponent(category.name)}`}>
                            {capitalize(category.name)}
                        </BreadcrumbLink>
                        <BreadcrumbLink to="#" $isCurrentPage>
                            Courses
                        </BreadcrumbLink>

                    </Breadcrumbs>
                </CourseTop>

                <CourseBody>
                    {
                        courses.length !== 0 ? 
                        courses.map(({courseImg, description, name, startDate, endDate}, i) => (
                            <CourseCard key={i} startDate={startDate} endDate={endDate} image={courseImg} 
                            description={description} gotoCourseHandler={gotoCourseHandler}
                            name={name} separator={(courses.length - 1) === i ? false : true} />
                        )) : Array(4).fill(undefined).map((_, i) => (
                            <Skeleton sx={{marginBottom: 10}} animation="wave" key={i} variant="rectangular" width={"100%"} height={350} />
                        ))
                    }
                </CourseBody>
            </CourseContainer>
        </Layout>
    )
}


function CourseCard({image, name, description, separator, startDate, endDate, gotoCourseHandler}){
    return (
        <>
            <Card onClick={e => gotoCourseHandler(e, name)}>
                <CardImageContainer>
                    <img src={image} alt="Card Image" />
                </CardImageContainer>
                <CardBody>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    {/* <Date>
                        <h3>Date</h3>
                        <span>{`${getDate(startDate)} - ${getDate(endDate)}`}</span>
                    </Date> */}
                </CardBody>
            </Card>
            {separator && <Separator />}
        </>
    )
}



export default Course;
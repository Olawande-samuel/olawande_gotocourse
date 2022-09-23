import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import {MdNavigateNext} from "react-icons/md";
import {BiArrowToRight} from "react-icons/bi";
import {FaDownload} from "react-icons/fa";
import {Breadcrumbs, Skeleton} from "@mui/material";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";



import Layout from "../../../components/Layout";
import { useEffectOnMount } from "../../../hooks";
import Loader from "../../../components/Loader";
import { useAuth } from "../../../contexts/Auth";
import { AdvancedError } from "../../../classes";
import { capitalize, getDate } from "../../../constants";



const DetailContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: center;
`;

const CategoryTop = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 40px;
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 400;
    font-size: 0.9rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed': 'pointer'};

    &:hover {
        color: ${props => props.$isCurrentPage ? '#666363' : "#0C2191"}
    }
`

const DetailBody = styled.div`
    width: 100%;
`;


const DetailImage = styled.div`
    width: 100%;
    background-repeat: no-repeat !important;
    background-size: cover !important;
    background-position: center !important;
    height: min(70vh, 600px);
    position: relative;

    & h2 {
        position: absolute;
        bottom:20px;
        width: 100%;
        text-align: center;
        fontweight: 700;
        font-size: 52px;
        color: white;
        letter-spacing: 0.4px;
        text-transform: capitalize !important;
    }
`;


const DetailBodyContent = styled.div`
    display: flex;
    width: 100%;
    gap: 20px;
    padding: 40px;

    @media screen and (max-width: 1025px){
        flex-direction: column;
    }

    @media screen and (max-width: 535px){
        padding: 20px;
    }
`;

const DetailLeft = styled.div`
    width; 100%;
    padding: 20px;

    @media screen and (max-width: 535px){
        padding: 10px;
    }
`;

const DetailDescription = styled.p`
    font-weight: 400;
    color: #070F18;
    font-size: 16px;
    line-height: 32px;
    width: 95%;
`;

const DetailRight = styled.div`
    width: 100%;
`;

const CareerCard = styled.div`
    padding: 40px 20px;
    border: 1px solid rgba(217, 217, 217, 0.4);
    background-color: white;
    border-radius: 10px;
    min-width: 300px;
    max-width: 450px;


    & p {
        font-size: 16px;

        @media screen and (max-width: 1175px){
            font-size: 14px;
        }
    }

    & ul {
        margin: 0;
        padding: 0;
        list-style-type: none;

        & li {
            line-height: 1.8;
            display: flex;
            align-items: center;
            font-size: 14px;

            @media screen and (max-width: 1175px){
                font-size: 12px;
            }
        }
    }
`

const Dot = styled.span`
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #0C2191;
    margin-right: 10px;
`;

const NicheContainer = styled.div`
    margin-top: 100px;
    width: 100%;
    letter-spacing:0.3px;

    & p {
        width: 100%;
        margin-bottom: 20px;
        font-weight: 300;
    }

    @media screen and (max-width: 1025px){
        margin-top: 50px;
    }
`;

const Niches = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Niche = styled.div`
    display: flex;
    align-items: flex-start;
    width: 100%;
    margin-bottom: 15px;
`;

const NicheBody = styled.div`
    flex: 1;
    font-weight: 400;
    & p {
        width: 90%;
    }
`


const Header = styled.h2`
    font-weight: 100;
    color: #0C2191;
    font-size: 24px;
    margin-bottom: 20px;
    text-transform: capitalize;
`;

const DownloadButton = styled.button`
    border: 2px solid #0C2191;
    padding: 10px;
    color: #0C2191;
    background-color: white;
    float: right;
    display: inline-block;
    outline: none;
    margin-right: 40px;
`;

const DetailCourseContainer = styled.div`
    margin-top: 100px;
    width: 100%;
    padding:40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;



    & h2 {
        color: #0C2191;
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        margin-bottom; 20px;
    }

    & > p {
        color: #9F9F9F;
        font-weight: 700;
        font-size: 16px;
        line-height:24px;
        text-align: center;
        width: 70%;
    }

    & a {
        font-weight: 100;
        font-size: 24px;
        color: #0C2191;
        align-self: flex-end;
        display: block;

        & svg {
            margin-left: 20px;
        }
    }
`;

const DetailCourses = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 30px;
`;

const CourseCard = styled.div`
    padding: 5px;
    // margin: 15px;
    cursor: pointer;
    // width: 300px;
`;

const CourseImageContainer = styled.div`
    // width: 300px;
    height: 180px;
    margin-bottom: 15px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CourseBody = styled.div`
    & h4 {
        font-weight: 800;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 20px;
    }
`;

const CourseDuration = styled.div`
    & h6 {
        font-weight: 700;
        font-size: 16px;
        margin:0;
    }
    & p {
        padding: 0;
        margin: 0;
        font-weight: 400;
        font-size: 14px;
    }
`;


const Detail = ({preview}) => {
    const [details, setDetails] = useState({});
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);   
    const location = useLocation();


    const {generalState, setGeneralState, otherFunctions: {searchCategories}} = useAuth();
    const [categoryCourses, setCategoryCourses]= useState([])
    const {id} = useParams()
    const ref = useRef(false);
    const navigate = useNavigate()

    // const [categoryDetails, setCategoryDetails]= useState({})

    let categoryDetails = {}
    
    if(!preview?.name){
      const data = localStorage.getItem("gotocourse-category")
      if (data){
        categoryDetails = JSON.parse(data)          
      } else {
        navigate("/not-found")
      }
    } else {
      categoryDetails = preview          
    }
  
    // fetch courses under each category
    useEffect(()=>{
      if(!preview?.name){
  
      if(ref.current) return
        (async()=>{
          if(categoryDetails){
          try{
  
            setGeneralState({...generalState, loading: true})
            const res = await searchCategories(categoryDetails?.name);
            const {success, message, statusCode} = res;
              if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode)
              if(res.data.length > 0){
                setCategoryCourses(res.data) 
            }
          
        }catch(err){
            toast.error(err.message, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
        }finally{
          setGeneralState({...generalState, loading: false})
        }
        } else {
          navigate("/not-found")
        }
        })()
        ref.current = true
      } 
      
    },[categoryDetails?.name])
  
    //NB: use dummy if no data exist
    useEffect(()=>{
      if(preview?.name) {
        categoryDetails = preview;
      }
    // ref.current = true
    },[id, preview])
  
    return (
        <Layout background="category">
            {/* {loading && <Loader />} */}
            <ToastContainer /> 
            <DetailContainer>
                <CategoryTop>
                    <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                        <BreadcrumbLink to="/">
                            Home
                        </BreadcrumbLink>
                        <BreadcrumbLink to="/categories">
                            Categories
                        </BreadcrumbLink>
                        <BreadcrumbLink $isCurrentPage={true} to="#">{categoryDetails ? capitalize(categoryDetails?.name) : <Skeleton animation="wave" variant="rectangular" width={100} height={30} />}</BreadcrumbLink>
                    </Breadcrumbs>
                </CategoryTop>
                <DetailBody>
                    <DetailImage style={{background: `linear-gradient(1.66deg, rgba(44, 43, 44, 0.83) 24.55%, rgba(12, 33, 145, 0) 115.79%), url(${categoryDetails?.bannerImg})`}}>
                        <h2>{categoryDetails ? capitalize(categoryDetails?.name) : <Skeleton animation="wave" variant="rectangular" width={100} height={30} />}</h2>
                    </DetailImage>
                    <DetailBodyContent>
                        <DetailLeft>
                            <DetailDescription>
                                {categoryDetails ? categoryDetails.description : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}
                            </DetailDescription>

                            <NicheContainer>
                                <Header>{categoryDetails ? `${capitalize(categoryDetails?.name)} Niche` : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</Header>
                                <p>{categoryDetails ? categoryDetails.nicheDescription : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</p>
                                <Niches>
                                    {
                                        categoryDetails ? 
                                        categoryDetails.nicheItems.map(({name, description}, i) => (
                                        <Niche key={i}>
                                                <Dot />
                                                <NicheBody>
                                                    <h6>{name}</h6>
                                                    <p>{description}</p>
                                                </NicheBody>
                                        </Niche>)) : Array(4).fill(undefined).map((_, i) => (
                                            <Niche key={i}>
                                                <Dot />
                                                <NicheBody>
                                                <Skeleton animation="wave" variant="rectangular" width={"90%"} >
                                                    <h6>.</h6>
                                                </Skeleton>
                                                <Skeleton animation="wave" variant="rectangular" width={"90%"} >
                                                    <p>.</p>
                                                </Skeleton>
                                                </NicheBody>
                                            </Niche>
                                        ))
                                    }
                                </Niches>
                            </NicheContainer>
                        </DetailLeft>
                        <DetailRight>
                            <CareerCard>
                                <Header>Career Prospect</Header>
                                <p>{categoryDetails ? categoryDetails.career : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={50} />}</p>
                                <ul>
                                    {
                                        categoryDetails ? categoryDetails.careerList.map(({name, _id}, i) => (
                                            <li key={i}>
                                                <Dot />
                                                {name}
                                            </li>
                                        )) : Array(4).fill(undefined).map((_, i) => (
                                            <li key={i}>
                                                <Dot />
                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={50} />
                                            </li>
                                        ))
                                    }
                                </ul>
                            </CareerCard>
                        </DetailRight>
                    </DetailBodyContent>
                    <DownloadButton>
                        Download Curriculum <FaDownload />
                    </DownloadButton>
                    <div className="container">
                        <DetailCourseContainer>
                            <h2>{categoryDetails ? `${capitalize(categoryDetails?.name)} Courses` : <Skeleton animation="wave" variant="rectangular" width={300} height={30} /> }</h2>
                            <p>{categoryDetails ? categoryDetails.nicheDescription : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</p>
                            <DetailCourses>
                            <Swiper
                                // install Swiper modules
                                modules={[Navigation, Autoplay, Pagination, Scrollbar, A11y]}
                                loop={true}
                                speed={1500}
                                autoplay={{delay:2500}}
                                spaceBetween={0}
                                slidesPerView={1}
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                                breakpoints={{
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
                                        slidesPerView: 2.5,
                                        spaceBetween: 5,
                                    },
                                    1024: {
                                        slidesPerView: 3.5,
                                        spaceBetween: 5,
                                    },
                                }}
                                >
                                {
                                    categoryCourses.length ? categoryCourses.map((course, i) => (
                                        <SwiperSlide key={i}>
                                        <CourseCard onClick={()=>{
                                            localStorage.setItem("gotocourse-courseInfo", JSON.stringify(course))
                                            localStorage.setItem("gotocourse-courseId", course.courseId)
                                            navigate(`courses/${course.name.replace(/\s+/g, '-').toLowerCase()}`)
                                        }} >
                                            <CourseImageContainer>
                                                <img src={course.courseImg} alt="Course Image" />
                                            </CourseImageContainer>
                                            <CourseBody>
                                                <h4>{course.name}</h4>
                                                {/* <CourseDuration>
                                                    <h6>Duration</h6>
                                                    <p>{`${getDate(course.startDate)} - ${getDate(course.endDate)}`}</p>
                                                </CourseDuration> */}
                                            </CourseBody>
                                        </CourseCard>
                                        </SwiperSlide>
                                    )) : Array(4).fill(undefined).map((_, i) => (
                                        <SwiperSlide key={i}>
                                        <CourseCard>
                                            <CourseImageContainer>
                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={"100%"} />
                                            </CourseImageContainer>
                                            <CourseBody>
                                                <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30}>
                                                    <h4>.</h4>
                                                </Skeleton>
                                                <CourseDuration>
                                                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30}>
                                                        <h6>.</h6>
                                                    </Skeleton>
                                                    <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30}>
                                                        <p>.</p>
                                                    </Skeleton>
                                                </CourseDuration>
                                            </CourseBody>
                                        </CourseCard>
                                        </SwiperSlide>
                                    ))
                                }
                            </Swiper>
                            </DetailCourses>
                            <Link to="courses">
                                View more <BiArrowToRight />
                            </Link>
                        </DetailCourseContainer>
                    </div>
                </DetailBody>
            </DetailContainer>
        </Layout>
    )
}




export default Detail;

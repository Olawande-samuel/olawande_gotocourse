import React, {useState} from "react";
import styled from "styled-components";
import {useLocation} from "react-router-dom";
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
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
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
    display: grid;
    width: 100%;
    gap: 20px;
    grid-template-columns: 1.3fr 0.7fr;
    padding: 40px;
    padding-bottom:0;
`;

const DetailLeft = styled.div`
    width; 100%;
    padding: 20px;
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


    & p {
        font-size: 16px;
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
    overflow-x: scroll;
    display: flex;
    margin-bottom: 30px;
`;

const CourseCard = styled.div`
    padding: 5px;
    margin: 15px;
    cursor: pointer;
    width: 300px;
`;

const CourseImageContainer = styled.div`
    width: 300px;
    height: 250px;
    margin-bottom: 15px;

    & img {
        width: 100%;
        height: 100%;
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


const Detail = () => {
    const [details, setDetails] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const {otherFunctions: {fetchCategory, searchCategories}} = useAuth();
    const location = useLocation();



    useEffectOnMount(() => {
        console.log("Category Details page is mounted");
        (async() => {
            try{
                const name = location.search.split("=")[1];
                console.log(name);
                if(name.trim() === "") throw new AdvancedError("Invalid course name", 0);
                else{
                    const res = await fetchCategory(name);
                    const {success, message, statusCode} = res;
                    if(!success) throw new AdvancedError(message, statusCode);
                    else {
                        const {data} = res;
                        setDetails(_ => { return {...data}})
                        console.log(data);
                        toast.success(message, {
                            position: "top-right",
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        const r = await searchCategories(data?.name);
                        console.log(r);
                        const {message: msg, statusCode: code, success: s} = r;
                        if(!s) throw new AdvancedError(msg, code);
                        else{
                            const {data} = r;
                            setCourses(_ => [...data]);
                        }
                    }
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
            }finally{setLoading(_ => false)}
        })()
        return () => console.log("Category Details page is unmounted");
    }, [])


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
                        <BreadcrumbLink to="/categories/all">
                            Categories
                        </BreadcrumbLink>
                        <BreadcrumbLink $isCurrentPage={true} to="#">{details ? capitalize(details?.name) : <Skeleton animation="wave" variant="rectangular" width={100} height={30} />}</BreadcrumbLink>
                    </Breadcrumbs>
                </CategoryTop>
                <DetailBody>
                    <DetailImage style={{background: `linear-gradient(1.66deg, rgba(44, 43, 44, 0.83) 24.55%, rgba(12, 33, 145, 0) 115.79%), url(${details?.bannerImg})`}}>
                        <h2>{details ? capitalize(details?.name) : <Skeleton animation="wave" variant="rectangular" width={100} height={30} />}</h2>
                    </DetailImage>
                    <DetailBodyContent>
                        <DetailLeft>
                            <DetailDescription>
                                {details ? details.description : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}
                            </DetailDescription>

                            <NicheContainer>
                                <Header>{details ? `${capitalize(details?.name)} Niche` : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</Header>
                                <p>{details ? details.nicheDescription : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</p>
                                <Niches>
                                    {
                                        details ? 
                                        details.nicheItems.map(({name, description}, i) => (
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
                                <p>{details ? details.career : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={50} />}</p>
                                <ul>
                                    {
                                        details ? details.careerList.map(({name, _id}, i) => (
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
                    <DetailCourseContainer>
                        <h2>{details ? `${capitalize(details?.name)} Courses` : <Skeleton animation="wave" variant="rectangular" width={300} height={30} /> }</h2>
                        <p>{details ? details.nicheDescription : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</p>
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
                                spaceBetween: 0,
                            },
                            700: {
                                slidesPerView: 2.5,
                                spaceBetween: 0,
                            },
                            1024: {
                                slidesPerView: 3.5,
                                spaceBetween: 5,
                            },
                            }}
                            >
                            {
                                courses.length ? courses.map(({courseImg, endDate, startDate, name}, i) => (
                                    <SwiperSlide key={i}>
                                    <CourseCard>
                                        <CourseImageContainer>
                                            <img src={courseImg} alt="Course Image" />
                                        </CourseImageContainer>
                                        <CourseBody>
                                            <h4>{name}</h4>
                                            <CourseDuration>
                                                <h6>Duration</h6>
                                                <p>{`${getDate(startDate)} - ${getDate(endDate)}`}</p>
                                            </CourseDuration>
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
                        <Link to="/courses">
                            View more <BiArrowToRight />
                        </Link>
                    </DetailCourseContainer>
                </DetailBody>
            </DetailContainer>
        </Layout>
    )
}




export default Detail;

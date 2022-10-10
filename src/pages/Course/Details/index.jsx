import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {useParams, useNavigate, Navigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import {MdNavigateNext} from "react-icons/md";
import {BiArrowToRight} from "react-icons/bi";
import {Breadcrumbs, Skeleton} from "@mui/material";
import { Navigation, Autoplay, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";



import Layout from "../../../components/Layout";
import { useEffectOnMount, useLocalStorage } from "../../../hooks";
import { useAuth } from "../../../contexts/Auth";
import { AdvancedError } from "../../../classes";
import { capitalize, getDate, COURSE_CATEGORY_KEY } from "../../../constants";
import person from "../../../images/person_question.png";
import pinkBg from "../../../images/course_bg_pink.png";




const DetailContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    jusitfy-content: center;
`;

const CourseTop = styled.div`
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
    background: ${(props) => props.background};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: min(80vh, 600px);
    position: relative;
`;


const DetailsHero = styled.div`
    position: absolute;
    width: 100%;
    text-align: center;
    color: white;
    letter-spacing: 0.4px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(359.13deg, rgba(47, 47, 48, 0.89) 36.82%, rgba(0, 12, 74, 0.5) 119.09%);

    & h2 {
        fontweight: 800;
        font-size: 52px;
        margin-bottom: 20px;
    }

    & p {
        color: var(--white);
        font-weight: 200;
        font-size: 20px;
    }
`;


const ButtonContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;


const Button = styled.div`
    cursor: pointer;
    padding: 15px 20px;
    border-radius: 10px;
    font-weight: 400;
    border: ${props => props.$isCTA ? 'none' : '1px solid #ccc'};
    background-color: ${props => props.$isCTA ? "#F75C4E" : 'transparent'};
    outline: none;
    color: var(--white);
    margin: 20px;
`


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
    flex: 1;
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
    // width: 100%;
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
    margin: 15px;
    cursor: pointer;
    width: 300px;
`;

const CourseImageContainer = styled.div`
    width: 300px;
    height: 180px;
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



const QuestionLayout = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    // align-items: center;
    justify-content: center;
    min-height: 80vh;
`;


const BgImage = styled.img`
    position: absolute;
    width: 400px;
    translate: 60% 60%;
    top: 50px;
    z-index: -1;

    @media screen and (max-width: 903px){
        translate: 30% 90%;
    }

    @media screen and (max-width: 650px){
        display: none;
    }
`;


const QuestionContainer = styled.div`
    border-radius: 10px;
    width: min(100% - 5rem, 750px);
    margin-inline: auto;
    background-color: #F9F9F9;
    padding: 20px 40px;
    box-shadow: 0px 153.692px 153.692px rgba(0, 0, 0, 0.09);
    z-index: 2;
    max-height: 500px;
    margin-top: 50px;

    @media screen and (max-width: 725px){
        max-height: 600px;
    }

    @media screen and (max-width: 545px){
        width: min(100% - 2rem, 750px);
    }
`

const PersonInfo = styled.div`
    width: 100%;
    display: flex;
    align-items: center;

    @media screen and (max-width: 625px){
        flex-direction: column;

        & div {
            text-align: center;
        }
    }

    & div {
        margin-left: 10px;

        & h2 {
            font-weight: 600;
            font-size: 50px;
            color: #0C2191;
            margin: 0;
            margin-bottom: 10px;
        }

        & p {
            color: #0C2191;
            font-size: 26px;
            font-weight: 300;
            margin: 0;
        }


        @media screen and (max-width: 903px){
           & h2 {
            font-size: 40px;
           }

           & p {
            font-size: 22px;
           }
        }


        @media screen and (max-width: 745px) {
            & h2 {
                font-size: 34px;
            }
    
            & p {
                font-size: 17px;
            }
        }


        @media screen and (max-width: 625px) {
            & h2 {
                font-size: 26px;
            }
    
            & p {
                font-size: 14px;
            }
        }

    }
`;

const Avatar = styled.img`
    width: 150px;
    height: 150px;
    object-fit: contain;
`;

const QuestionForm = styled.form`
    padding: 20px;
    width: 100%;

    & button {
        margin-top: 10px;
        border: none;
        border-radius: 10px;
        background-color: #0C2191;
        color: var(--white);
        font-size: 1.2rem;
        padding: 15px 40px;
        font-weight: 400;

        @media screen and (max-width: 745px) {
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 685px) {
        padding: 20px 0px;
    }
`;


const InputContainer = styled.div`
    width: 100%;
    margin-bottom: 30px;
`;


const HalfInputContainer = styled(InputContainer)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;

    @media screen and (max-width: 725px){
        grid-template-columns: 1fr;
    }
`;


const Input = styled.input`
    border: 1px solid #464646;
    background-color: #f1f1f1;
    border-radius: 10px;
    width: 100%;
    line-height: 2;
    padding: 12px;
    outline: none;
    font-size: 0.85rem;
    letter-spacing: 0.4px;
`



const Detail = () => {
    const [details, setDetails] = useState(null);
    const {getItem} = useLocalStorage();
    let category = getItem(COURSE_CATEGORY_KEY);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const {otherFunctions: {searchCategories}} = useAuth();
    const params = useParams();

    
    const courseName = params.course ? params.course.split("-").join(" ") : params.profile.split("-").join(" ")


    useEffect(() => {
        
        
        // window.scrollTo(0,0);
        if(!params || !category.name) navigate(-1);
        else {
            (async() => {
                try{
                    
                    const res = await searchCategories(category.name);
                    const {message, statusCode, success} = res;
                    if(!success) throw new AdvancedError(message, statusCode);
                    else {
                        const {data} = res;
                        
                        let dets = data.find(d => d.name.toLocaleLowerCase() === courseName.toLocaleLowerCase());
                        
                        setDetails(_ => {
                            return {
                                ...dets
                            }
                        })
                        setCourses(_ =>  [...data.filter(d => d.name.trim().toLocaleLowerCase() !== courseName.trim().toLocaleLowerCase())]);
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
                }
            })()
        }
        return () => console.log("done")
    }, [courseName, details?.name])


    return (
        <Layout background="category">
            <ToastContainer /> 
            <DetailContainer>
                <CourseTop>
                    <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                        <BreadcrumbLink to="/">
                            Home
                        </BreadcrumbLink>
                        <BreadcrumbLink to="/categories/all">
                            Categories
                        </BreadcrumbLink>
                        <BreadcrumbLink to={`/category/${category.name.split(" ").join("-")}`}>
                            {capitalize(category.name)}
                        </BreadcrumbLink>
                        <BreadcrumbLink to={`/category/${category.name.split(" ").join("-")}/courses`}>
                            Courses
                        </BreadcrumbLink>
                        <BreadcrumbLink $isCurrentPage to="#">{details?.name ? capitalize(details?.name) : <Skeleton animation="wave" variant="rectangular" width={100} height={30} />}</BreadcrumbLink>
                    </Breadcrumbs>
                </CourseTop>
                <DetailBody>
                    <DetailImage background={`url(${details?.courseImg}), rgba(0, 0, 0, 0.7)`}>
                        <DetailsHero>
                            {/* <h2>{details ? capitalize(details?.name) : <Skeleton animation="wave" variant="rectangular" width={100} height={30} />}</h2> */}
                            <DetailDescription>
                                {details ? details.description : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}
                            </DetailDescription>
                            {/* <ButtonContainer>
                                <Button $isCTA>Enroll now</Button>
                                <Button>Add to wishlist</Button>
                            </ButtonContainer> */}
                        </DetailsHero>
                    </DetailImage>
                    <DetailBodyContent>
                        <DetailLeft>
                        <Header>Course Overview</Header>
                            <DetailDescription>
                                {details ? details.description : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}
                            </DetailDescription>

                            <NicheContainer>
                                {/* <Header>{details ? `${capitalize(details?.name)} Niche` : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</Header> */}
                                <p>{details ? details.nicheDescription : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={30} />}</p>
                                <Niches>
                                    {
                                        details ? 
                                        
                                        details.syllabus?.map(({title, description}, i) => (
                                        <Niche key={i}>
                                                <Dot />
                                                <NicheBody>
                                                    <h6>{title}</h6>
                                                    <p>{description}</p>
                                                </NicheBody>
                                        </Niche>)) 
                                        
                                        :
                                        
                                        Array(4).fill(undefined).map((_, i) => (
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
                                {/* <p>{details ? details.career : <Skeleton animation="wave" variant="rectangular" width={"100%"} height={50} />}</p>
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
                                </ul> */}
                            </CareerCard>
                        </DetailRight>
                    </DetailBodyContent>
                    {/* <DownloadButton>
                        Download Curriculum <FaDownload />
                    </DownloadButton> */}
                    <DetailCourseContainer>
                        {/* <h2>{details ? `Other ${capitalize(details?.name)} Courses` : <Skeleton animation="wave" variant="rectangular" width={300} height={30} /> }</h2> */}
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
                                spaceBetween: 5,
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
                                    <CourseCard onClick={e => navigate(`/category/${category.name.split(" ").join("-")}/courses/${name.split(" ").join("-")}`)}>
                                        <CourseImageContainer>
                                            <img src={courseImg} alt={name} />
                                        </CourseImageContainer>
                                        <CourseBody>
                                            <h4>{name}</h4>
                                            {/* <CourseDuration>
                                                <h6>Duration</h6>
                                                 <p>{`${getDate(startDate)} - ${getDate(endDate)}`}</p> 
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
                        <Link to={`/category/${encodeURIComponent(category)}/courses`}>
                            View more <BiArrowToRight />
                        </Link>
                    </DetailCourseContainer>
                    <Question />
                </DetailBody>
            </DetailContainer>
        </Layout>
    )
}




export function Question(){
    const [formstate, setFormstate] = useState({
        question: "",
        firstName: "",
        lastName: "",
    })

    function changeHandler(e){
        const{name, value} = e.target;
        setFormstate(old => {
            return {
                ...old,
                [name]: value
            }
        })
    }

    async function submitHandler(e){
        e.preventDefault();
        
    }


    return (
        <QuestionLayout>
            <BgImage src={pinkBg} alt="Pink Bg" />
            <QuestionContainer>
                <PersonInfo>
                    <Avatar src={person} alt="Person" />
                    <div>
                        <h2>Got questions?</h2>
                        <p>Ask Kenneth</p>
                    </div>
                </PersonInfo>
                <QuestionForm onSubmit={submitHandler}>
                    <InputContainer>
                        <Input type="text" onChange={changeHandler} value={formstate.question} placeholder="Hi Kenneth, I have a question regarding Gotocourse classes" />
                    </InputContainer>
                    <HalfInputContainer>
                        <Input type="text" onChange={changeHandler} value={formstate.firstName} placeholder="First Name" />
                        <Input type="text" onChange={changeHandler} value={formstate.lastName} placeholder="Last Name" />
                    </HalfInputContainer>
                    <button>Ask Kenneth</button>
                </QuestionForm>
            </QuestionContainer>
        </QuestionLayout>
    )
}



export default Detail;

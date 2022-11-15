import { BsCalendar3, BsStarFill } from "react-icons/bs"
import styled from "styled-components"
import great from "../../../images/landing/executive.png"
import techie from "../../../images/landing/career_courses.png"
import webimage from "../../../images/landing/webinar.png"
import DOMPurify from "dompurify"
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from "react"
import { Box } from "@mui/material"
import { useEffect } from "react"
import { shortPopUpContent } from "../ShortCourses"
import { inDemandPopUpContent } from "../IndemandClasses"
import { useNavigate } from "react-router-dom"
import { getDate, gotoclass, gotoclassPayment, KEY } from "../../../constants"
import { useAuth } from "../../../contexts/Auth"
import { useLocalStorage } from "../../../hooks"
import { useMutation } from "@tanstack/react-query"
import { border } from "@mui/system"
import { toast } from "react-toastify"
import { changeConstants } from "../../../pages/Dashboard/Teachers/CreateCourse"
import { upskillAltData } from "../UpskillCourse"

// GREAT OPPORTUNITIES

const ImageCard = styled.div`
    position: relative;
    background:#000;

    img {
        width:100%;
        height: 100%;
        opacity: 0.6;
    }

    p {
        position: absolute;
        bottom: 5px;
        /* right: 0; */
        left: 50%;
        width: 60%;
        transform: translateX(-50%);
        font-size: 17px;
        font-weight: 700;
        color: #fff;
        text-align: center;
    }
`
export function GreatImage({ img, title }) {
    return (
        <ImageCard>
            <img src={img} alt="" />
            <p>{title}</p>
        </ImageCard>
    )
}


// TECHPRENEURSHIP

const TechCard = styled.div`
    border: 1px solid #eee;
    position: relative;
    padding: clamp(0.625rem, 0.5179rem + 0.5357vw, 1rem) ;
    padding-left:clamp(1rem, 0.5179rem + 0.5357vw, 2.5rem);
    border-radius: 8px;
    box-shadow: 0px 2.65963px 6.64908px rgba(17, 121, 239, 0.15);

    > h6 {
        font-weight: 700;
        color: #272C37;
        margin-bottom: 1.7rem;
        text-transform: capitalize;
        
    }
    > div {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

    }
    .tag {
        padding: 4px 8px;
        background-color: #E2EDF9;
        color: #6C7480;
        display: inline-flex;
        display: grid;
        place-items:center;
        width:fit-content;
        text-transform: uppercase;
    }



    .tech_info {
        display: flex;
        flex-wrap:wrap;
        justify-content:space-between;
        margin-top: 2rem;
        font-size: 14px;
        color: #636363;

        .divider {
            width: 1px;
            height: 20px;
            background-color:#D2D6DE;
            margin-inline: 1.5rem;
        }
    }
    

    .bar {
        position: absolute;
        top:20px;
        left: 0;
        width:4px;
        height:40px;
        background: ${(props) => props.alternate === "blue" ? '#00C3E1' : props.alternate === "pink" ? '#FF8C90' : '#F1C44A'};

        
    }
    :nth-child(1) .bar{
        background:#FF8C90;
    }
    :nth-child(2) .bar{
        background: #00C3E1;
    }
    :nth-child(3) .bar{
        background:#F1C44A;
    }
    :nth-child(4) .bar{
        background:#FF8C90;
    }
    :nth-child(5) .bar{
        background: #00C3E1;
    }
    :nth-child(6) .bar{
        background:#F1C44A;
    }
    button {
        border: none;
        outline: none;
        padding: 3px 4px;
        color:var(--theme-blue);
        background: #fff;
        margin-top: 1rem;
    }
    .top_content {
        display: flex;
        gap: 0.3rem;
        margin-bottom: 1rem;
        justify-content:space-between;

        h6 {
            flex:60%;
            font-weight: 700;

        }

        img{
            flex:40%;
            height: 50px;
            max-width:120px;
            border-radius:18px;
            object-fit: cover;
            object-position: top;
        }
    }
    

`

export function TechPreCard({ title, duration, price, packages, bootcampImg, description, tag, ratings, totalRatings }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const [data, setData] = useState({})

    useEffect(() => {
        const shortListItem = shortPopUpContent.filter(item => item.ownedBy.trim().toLowerCase() === title.trim().toLowerCase())
        if (shortListItem.length > 0) {
            setData(shortListItem[0])
        }
        console.log({ shortListItem })
    }, [title])

    return (
        <TechCard>
            <h6>{title}</h6>
            <div>
                <div className="top_content">
                    <span className="tag">
                        {changeConstants(packages[0]?.title)}
                    </span>
                    <img src={bootcampImg} alt="" />
                </div>
                <div className="tech_info">
                    <span>
                        <i className="me-1"><BsCalendar3 /></i>
                        {duration}
                    </span>
                    <div className="divider"></div>
                    <span>$ {packages.length > 0 ? packages[0].price : price}</span>
                </div>
                <div>
                    <button aria-describedby={id} variant="contained" onClick={handleClick}>Learn more</button>
                </div>
            </div>
            <div className="bar"></div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }} className="pop_container">
                    <header>
                        <h5 className="fw-bold text-capitalize">{title}</h5>
                    </header>
                    <div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">{duration}</span>
                            <span className="fw-bold">$ {packages.length > 0 ? packages[0].price : price}</span>
                        </div>
                        <p>{data.title}</p>
                        <ul>
                            {
                                data?.list?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))
                            }
                        </ul>
                        <div className="pop_action">
                            <button>Enroll Now</button>
                            <button>Wishlist</button>
                        </div>
                    </div>
                </Box>
            </Popover>
        </TechCard>

    )
}


// EXECUTIVE EDUCATION


const ExecutiveCard = styled.div`
    border: .5px solid #eee;
    border-radius: 4px;
    position: relative;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 159px 64px rgba(0, 0, 0, 0.01), -6px 89px 54px rgba(0, 0, 0, 0.05), -3px 40px 40px rgba(0, 0, 0, 0.09), -1px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    /* transition: all .2s ease-in-out;

    &:hover {
        transform: scale(1.1)
    } */
    img {
        height: 150px;
        flex: 40%;
        /* height: 30%; */
        max-width:100%;
    }
    > div {
        flex: 60%;
        /* height: 70%; */
    }
    h6 {
        font-weight: 700;
        margin-bottom: .4rem;
        text-transform: capitalize;
        transition: all .2s ease-in-out;

        &:hover {
            color: var(--theme-orange)
        }
    }
    .description{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 12.5px;
    }
    .exe_content {
        padding: 2rem;
        padding-bottom: .8rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        span {
            font-size: 13px;
        }
    }
    .route_to_class {
        cursor: pointer;
        color: var(--theme-blue);
        
        :hover {
            color: var(--theme-orange);
        }
    }
`



export function ExeEducation({ title, date, img, bootcampImg, category, description, bootcampId, duration, price, packages, courses, list, color, i }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    // Call to Action
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { getItem } = useLocalStorage();

    const userdata = getItem(KEY)
    const { studentFunctions: { wishlistCourse } } = useAuth()
    const mutation = useMutation(([id, usertoken]) => wishlistCourse(id, usertoken), {
        onSuccess: (res) => {
            console.log({ res })
        },
        onError: (err) => console.error(err)
    })

    function addToWishlist() {
        if (userdata.token) {
            mutation.mutate([bootcampId, userdata.token])
            return
        } else {
            navigate("/login")
        }
    }
    return (
        <ExecutiveCard >
            <img src={img ? img : bootcampImg} alt="" className="exe_image" />
            <div className="exe_content">
                <div className="">
                    <h6 aria-describedby={id} onClick={() => gotoclass(title, category, bootcampId, navigate)}>{title}</h6>
                    <div className="description">
                        <p dangerouslySetInnerHTML={{ __html: description }} />

                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <span>$ {packages.length > 0 ? packages[0].price : price}</span>
                    <span>{duration}</span>
                </div>
                <div className="route_to_class">
                    <span onClick={()=>gotoclass(title, category, bootcampId, navigate)}>Learn more</span>
                </div>
            </div>
            {/* <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'center',
                horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }} className="pop_container">
                    <header>
                        <h5 className="fw-bold text-capitalize">{title}</h5>
                    </header>
                    <div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">{duration}</span>
                            <span className="fw-bold">$ {packages.length > 0 ? packages[0].price : price}</span>
                        </div>
                        <p className="pop_description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} />
                        <div className="pop_action">
                            <button >Enroll Now</button>    
                            <button onClick={addToWishlist}>Wishlist</button>    
                        </div>
                    </div>
                </Box>
            </Popover> */}
        </ExecutiveCard>
    )
}

{/* <ColoredTop colorr={i}>
    <p>gotocourse</p>
</ColoredTop>
<ContentBottom>
    <div className="star">
        <BsStarFill color="#FFCE31" size="1.5rem" />
    </div>
    <h6>{title}</h6>
    <div className="d-flex justify-content-between my-4">
        <span>{duration}</span>
        <span>$ {packages.length > 0 ? packages[0].price : price}</span>
    </div>
    <ul>
        {
            list?.map((item)=>(
                <li>{item}</li>

            ))
        }
    </ul>
</ContentBottom> */}

// INDEMAND

const InDemandCard = styled.div`
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 1rem clamp(0.625rem, 0.5179rem + 0.5357vw, 1rem);
    box-shadow: -9px 150px 60px rgba(0, 0, 0, 0.01), -5px 85px 51px rgba(0, 0, 0, 0.05), -2px 38px 38px rgba(0, 0, 0, 0.09), -1px 9px 21px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);

    .top_content {
        display: flex;
        gap: 0.3rem;
        margin-bottom: 1rem;

        h6 {
            flex:60%;
            font-weight: 700;

        }

        img{
            flex:40%;
            height: 50px;
            max-width:120px;
            border-radius:18px;
            object-fit: cover;
            object-position: top;
        }
    } 
    .mid_content{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        
        .mid_stats {
            font-size:12px;
            display:flex;
            justify-content: space-between;
            
            span:first-child {
                text-transform: capitalize;
            }
        }

        ul {
            font-size: 13px;
            font-weight:500
        }
        
    }
    .cta {
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        font-size: 13px;
        margin-top: 1rem;

        span:first-child {
            cursor: pointer;
            transition: color .3s ease; 

            :hover {
                color: var(--theme-blue)
            }
        }
        span:last-child {
            color: var(--theme-orange)
        }
        .ct_bar{
            width:1px;
            height:100%;
            background: #333;
        }
    }
`
export function InDemand({ title, bootcampImg, category, duration, price, packages, bootcampId, description, startDate }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { getItem } = useLocalStorage();

    const userdata = getItem(KEY)
    const { studentFunctions: { wishlistCourse } } = useAuth()



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    useEffect(() => {
        const ownListItem = inDemandPopUpContent.filter(item => item.ownedBy.trim().toLowerCase() === title.trim().toLowerCase())

        if (ownListItem.length > 0) {
            setData(ownListItem[0])
        }

    }, [title])

    const mutation = useMutation(([id, usertoken]) => wishlistCourse(id, usertoken), {
        onSuccess: (res) => {
            console.log({ res })
        },
        onError: (err) => console.error(err)
    })

    function addToWishlist() {
        if (userdata.token) {
            mutation.mutate([bootcampId, userdata.token])
            return
        } else {
            navigate("/login")
        }
    }



    return (
        <InDemandCard>
            <div className="top_content">
                <h6>{title}</h6>
                <img src={bootcampImg} alt="" />
            </div>
            <div className="mid_content">
                <div className="mid_stats">
                    <span>{packages.length > 0 ? packages[0].title.toLowerCase() : "Cohort"}</span>
                    <span>$ {packages.length > 0 ? packages[0].price : price}</span>
                    <span>{duration}</span>
                </div>
                <ul>
                    <li>Completion certificate</li>
                    <li>Earn upto $138k</li>
                </ul>
            </div>
            <div className="cta">
                <span aria-describedby={id} variant="contained" onClick={handleClick}>View course</span>
                <div className="ct_bar"></div>
                {/* <span onClick={()=> gotoclassPayment(title, category, bootcampId, navigate)}>Live Online</span> */}
                <span>Live Online</span>
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }} className="pop_container">
                    <header>
                        <h5 className="fw-bold text-capitalize">{title}</h5>
                    </header>
                    <div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">{duration}</span>
                            <span className="fw-bold">$ {packages.length > 0 ? packages[0].price : price}</span>
                        </div>
                        <p>{data.title}</p>
                        <ul>
                            {
                                data?.list?.map(li => (
                                    <li>{li}</li>

                                ))
                            }
                        </ul>
                        {/* <p className="pop_description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
                        <div className="pop_action">
                            <button onClick={() => gotoclass(title, category, bootcampId, navigate)}>Enroll Now</button>
                            {/* <button>Starting: {getDate(startDate)}</button>     */}
                            <button onClick={addToWishlist}>
                                {
                                    mutation.isLoading ? <div className="spinner-border text-white">
                                        <div className="visually-hidden">Loading...</div>
                                    </div>
                                        :
                                        <span>Wishlist</span>
                                }
                            </button>
                        </div>
                    </div>
                </Box>
            </Popover>
        </InDemandCard>
    )
}






// UPSKILL COURSES

const UpCoursesCard = styled.div`
    /* border: 2.2648px solid rgba(0, 114, 239, 0.5);
    padding: clamp(0.03125rem, -0.2813rem + 1.5625vw, 1.125rem);
    border-radius: 8px; */
    display: flex;
    flex-direction:column;
    box-shadow: -10px 159px 64px rgba(0, 0, 0, 0.01), -6px 90px 54px rgba(0, 0, 0, 0.05), -3px 40px 40px rgba(0, 0, 0, 0.09), -1px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    
    img {
        height: 40%;
        min-height: 40%;
        max-width: 100%;
        object-fit:cover;
        object-position: center;
        border: 1.5px solid #FFCE31;
    }
    small {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h5 {
        font-weight: 800;
        text-transform: capitalize;
        font-size: 16px;
        margin-block: .7rem;
        cursor: pointer;

    }
     
    button {
        color:#0072EF;
        font-size:14px;
        border:none;
        outline:none;
        background:#fff;
    }
    .up_content {
        padding-inline: 1.5rem;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        height: 60%;
        /* height: -webkit-fill-available; */


        .cta {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            font-size: 13px;
            margin-top: 1rem;
    
            span:first-child {
                cursor: pointer;
                transition: color .3s ease; 
    
                :hover {
                    color: var(--theme-blue)
                }
            }
            span:last-child {
                color: var(--theme-orange)
            }
            .ct_bar{
                width:1px;
                height:100%;
                background: #333;
            }
        }
    }
    .ct_bar{
            width:1px;
            height:100%;
            background: #333;
    }

    .foot {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .cta {
        font-size: 14px;
        border: none;
        outline: none;
        background:#fff;

            :hover {
                color: var(--theme-blue);
            }
        }
        span {
            font-size:14px;
            color: var(--theme-orange)
        }
    } 
    
`

const ShortCard = styled.div`
    /* border: 2.2648px solid rgba(0, 114, 239, 0.5);
    padding: clamp(0.03125rem, -0.2813rem + 1.5625vw, 1.125rem);
    border-radius: 8px; */
    display: flex;
    flex-direction:column;
    flex-shrink:0;
    width: 280px;
    height: 400px;
    // border: 2px solid red;
    box-shadow: -10px 159px 64px rgba(0, 0, 0, 0.01), -6px 90px 54px rgba(0, 0, 0, 0.05), -3px 40px 40px rgba(0, 0, 0, 0.09), -1px 10px 22px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
    
    img {
        height: 40%;
        min-height: 40%;
        max-width: 100%;
        object-fit:cover;
        object-position: center;
        border: 1.5px solid #FFCE31;
    }
    small {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    h5 {
        font-weight: 800;
        // text-transform: capitalize;
        font-size: 16px;
        margin-block: .7rem;
        cursor: pointer;

    }
    > div .cta {
        font-size: 14px;
        border: none;
        outline: none;
        background:#fff;

        :hover {
            color: var(--theme-blue);
        }
    }
    button {
        color:#0072EF;
        font-size:14px;
        border:none;
        outline:none;
        background:#fff;
    }
    .up_content {
        padding-inline: 1.5rem;
        padding-bottom: 1rem;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        height: 60%;
        /* height: -webkit-fill-available; */


        .cta {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
            font-size: 13px;
            margin-top: 1rem;
    
            span:first-child {
                cursor: pointer;
                transition: color .3s ease; 
    
                :hover {
                    color: var(--theme-blue)
                }
            }
            span:last-child {
                color: var(--theme-orange)
            }
            .ct_bar{
                width:1px;
                height:100%;
                background: #333;
            }
        }
    }
    
`

export function Short({ title, bootcampImg, bootcampId, description, duration, price, packages }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    // Call to Action
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { getItem } = useLocalStorage();

    const userdata = getItem(KEY)
    const { studentFunctions: { wishlistCourse } } = useAuth()
    const mutation = useMutation(([id, usertoken]) => wishlistCourse(id, usertoken), {
        onSuccess: (res) => {
            console.log({ res })
        },
        onError: (err) => console.error(err)
    })

    function addToWishlist() {
        if (userdata.token) {
            mutation.mutate([bootcampId, userdata.token])
            return
        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        const ownListItem = upskillAltData.filter(item => item.ownedBy.trim().toLowerCase() === title.trim().toLowerCase())
        if (ownListItem.length > 0) {
            setData(ownListItem[0])
        }

    }, [title])

    return (
        <ShortCard>
            <img src={bootcampImg} alt="" />
            <div className="up_content">
                <div>
                    <h5 aria-describedby={id} variant="contained" onClick={handleClick}>{title.toLowerCase()}</h5>
                    <div className="d-flex justify-content-between">
                        <small>{duration}</small>
                        <small>$ {packages.length > 0 ? packages[0].price : price}</small>
                    </div>
                </div>

                {/* <small dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
                <div className="cta">
                    <span aria-describedby={id} variant="contained" onClick={handleClick}>View course</span>
                    <div className="ct_bar"></div>
                    {/* <span onClick={()=> gotoclassPayment(title, category, bootcampId, navigate)}>Live Online</span> */}
                    <span>Self-Paced</span>
                </div>
            </div>

        </ShortCard>
    )
}

export function UpskillCourseCard({ title, bootcampImg, bootcampId, description, duration, price, packages }) {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    // Call to Action
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const { getItem } = useLocalStorage();

    const userdata = getItem(KEY)
    const { studentFunctions: { wishlistCourse } } = useAuth()
    const mutation = useMutation(([id, usertoken]) => wishlistCourse(id, usertoken), {
        onSuccess: (res) => {
            console.log({ res })
        },
        onError: (err) => console.error(err)
    })

    function addToWishlist() {
        if (userdata.token) {
            mutation.mutate([bootcampId, userdata.token])
            return
        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        const ownListItem = upskillAltData.filter(item => item.ownedBy.trim().toLowerCase() === title.trim().toLowerCase())
        if (ownListItem.length > 0) {
            setData(ownListItem[0])
        }

    }, [title])

    return (
        <UpCoursesCard>
            <img src={bootcampImg} alt="" />
            <div className="up_content">
                <div>
                    <h5 aria-describedby={id} variant="contained" onClick={handleClick}>{title.toLowerCase()}</h5>
                    <div className="d-flex justify-content-between">
                        <small>{duration}</small>
                        <small>$ {packages.length > 0 ? packages[0].price : price}</small>
                    </div>
                </div>

                {/* <small dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
                <div className="foot">
                    <button className="cta" aria-describedby={id} variant="contained" onClick={handleClick}>View More</button>
                    <div className="ct_bar"></div>

                    <span>{changeConstants(packages[0]?.title)}</span>
                </div>
                {/* <div>
                    <button aria-describedby={id} variant="contained" onClick={handleClick}>{"Explore >"}</button>
                </div> */}
            </div>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left',
                }}
            >
                <Box sx={{ p: 2 }} className="pop_container">
                    <header>
                        <h5 className="fw-bold text-capitalize">{title}</h5>
                    </header>
                    <div>
                        <div className="d-flex justify-content-between mb-3">
                            <span className="fw-bold">{duration}</span>
                            <span className="fw-bold">$ {packages.length > 0 ? packages[0].price : price}</span>
                        </div>
                        <p>{data.title}</p>
                        <ul>
                            {
                                data?.list?.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))
                            }
                        </ul>
                        {/* <p className="pop_description" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(description)}} /> */}
                        <div className="pop_action">
                            <button>Enroll Now</button>
                            <button>Wishlist</button>
                        </div>
                    </div>
                </Box>
            </Popover>
        </UpCoursesCard>
    )
}


// VIRTUAL LIVE

const LiveTrainingWrapper = styled.div`

    display: flex;
    padding: clamp(0.625rem, 0.5179rem + 0.5357vw, 1rem);
    gap:1rem;
    background-color: #EBEBFF;

    > div:first-child {
        flex:15%;

        .live_calendar{
            height:90px;
            width:70px;

            .top {
                padding: 3px 5px;
                background-color: var(--theme-blue);
                color:#fff;
                text-align: center;
                
                p {
                    font-size:15px;
                }


            }

            .bottom {
                background-color: #fff;
                color: var(--theme-blue);
                text-align: center;
                font-weight: 700;
            }
        }
    }
    
    p {
        font-size:14px;
    }

    > div:last-child {
        flex:85%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: .6rem;
        
        > p:first-child {
            font-size:16px;
            margin-bottom: 0;

        }

        span {
            height:1px;
            background-color: #000;
        }
        p:last:child {
            font-size:14px;
            margin-bottom: 4px;

            p {
                border-left: 1px solid #000;
                font-size:14px;

            }
        
        }
        
    }


`

export function VirtualCard() {
    return (
        <LiveTrainingWrapper>
            <div>
                <div className="live_calendar">
                    <div className="top">NOV</div>
                    <div className="bottom">10-12</div>
                </div>
            </div>
            <div>
                <p>Special Executive Master Programme in E-Government</p>
                <span></span>
                <p>
                    Hilton Hotel, Al Habtoor City, Dubai, United Arab Emirates
                    <p>| £ 13,000</p>
                </p>
            </div>
        </LiveTrainingWrapper>
    )
}

// LIVE WEBINAR 


const WebinarWrapper = styled.div`
    display: flex;
    flex-direction:column;
    box-shadow:  -11.7972px 191.9px 77.0747px rgba(0, 0, 0, 0.01), -7.07829px 107.747px 64.4911px rgba(0, 0, 0, 0.05), -3.14591px 47.9751px 47.9751px rgba(0, 0, 0, 0.09), -0.786477px 11.7972px 26.7402px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);


    .img_top{
        flex:40%;

        img {
            max-width: 100%;
        }
    }
    .content {
        padding: 1rem;
        display: flex;
        flex-direction:column;
        justify-content: space-between;
         
        h6 {
            font-size:16px;
        }

        div {
            p:first-child {
                font-size: 12px;
                margin-bottom: .5rem;
            }
            p{
                font-size: 12px;
                margin-bottom: 0;
            };
        }

    }
    > div:last-child {
        display: flex;
        justify-content: space-between;
        padding: .3rem 1rem;


        .tag {
            color: #078B4C;
            font-size: 13px;
        }

        .cta {
            color: var(--theme-blue);
            text-transform: uppercase;
            font-size: 13px;
        }
    }

`

export function LiveWebinarCard({ img, title, place, date, time }) {
    return (
        <WebinarWrapper>
            <div className="img_top">
                <img src={webimage} alt="" />
            </div>
            <div className="content">
                <h6>{title}</h6>
                <div>
                    <p>Gotocourse</p>
                    <p>{date} | {time}</p>
                </div>
            </div>
            <div>
                <div className="tag">FREE</div>
                <div className="cta">REGISTER NOW</div>
            </div>
        </WebinarWrapper>
    )
}


// YOUR SUCCESS 

const SuccessWrapper = styled.div`
    border-radius: 18px;
    padding:1rem clamp(0.625rem, 0.5179rem + 0.5357vw, 1rem);
    background: #F2F3FF;

    .icon_wrapper {
        height: 90px;
        /* max-width:50px; */
        margin-bottom: .5rem;

        img {
            max-width: 100%;
            height:100%;
        }
    }

    .content {
        font-size: 13px;
        /* padding-left: 1rem; */
    }


`

export function SuccessCard({ icon, description }) {
    return (
        <SuccessWrapper>
            <div className="icon_wrapper">
                <img src={icon} alt="" />
            </div>
            <p className="content">{description}</p>
        </SuccessWrapper>
    )
}




// EXPLORE COMPONENT 

const ClassWrapper = styled.section`
    padding-block: 2rem;

    header {

        h5 {
            color: #292D32;   
            font-weight: 700;
        }
        
    }
`

export function ClassTypeComponent({ children, header: head, header2, subtext, bottomTitle, bottomLink }) {
    return (
        <ClassWrapper>
            <div className="container">
                <header>
                    <h5>{head}</h5>
                    <h5>{header2}</h5>
                    <small>{subtext}</small>
                </header>
                <article>
                    {children}
                </article>
                <p className="text-center mt-4">{bottomTitle}</p>
            </div>
        </ClassWrapper>
    )
}




export default function BasicPopover() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <Button aria-describedby={id} variant="contained" onClick={handleClick}>
                Open Popover
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
            </Popover>
        </div>
    );
}
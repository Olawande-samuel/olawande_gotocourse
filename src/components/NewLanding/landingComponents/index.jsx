import { BsStarFill } from "react-icons/bs"
import  styled  from  "styled-components"
import great from "../../../images/landing/executive.png"
import techie from "../../../images/landing/career_courses.png"
import webimage from "../../../images/landing/webinar.png"
// GREAT OPPORTUNITIES

const ImageCard = styled.div`
    position: relative;

    img {
        width:100%;
        height: 100%;
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
export function GreatImage({img, title}){
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
        
    }
    
    .tag {
        padding: 4px 8px;
        background-color: #E2EDF9;
        color: #6C7480;
    }



        .tech_info {
            display: flex;
            flex-wrap:wrap;
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
        background: ${(props)=>props.alternate === "blue" ? '#00C3E1' : props.alternate === "pink" ? '#FF8C90' : '#F1C44A'};

        
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

`

export function TechPreCard({title, tag, ratings, totalRatings}) {
    return (
        <TechCard>
            <h6>AWS Solutions Architect</h6>
            <div>
                <span className="tag">
                    ADVANCED
                </span>
                <div className="tech_info">
                    <span>4.30 (7495 Ratings)</span>
                    <div className="divider"></div>
                    <span>31490 Learners</span>
                </div>
            </div>
            <div className="bar"></div>
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
    
`

const ColoredTop = styled.div`
    flex: 30%;
    height: 20%;
    background: ${(props)=>props.colorr === "reddish" ? "radial-gradient(50% 50% at 50% 50%, #FF9195 0%, #FF5D63 66%)" : (props.colorr === "blue" ? "radial-gradient(50% 50% at 50% 50%, #00C5E3 0%, #0099C3 99%)" : "radial-gradient(50% 50% at 50% 50%, #F4C652 0%, #D2AC00 92%)")};
    /* background: radial-gradient(50% 50% at 50% 50%, #FF9195 0%, #FF5D63 66%); */
    p{
        visibility: hidden;
    }
`
const ContentBottom = styled.div`
    position: relative;
    flex: 70%;
    height: 80%;
    font-size: 14px;
    padding:clamp(0.625rem, 0.5179rem + 0.5357vw, 1rem);
    padding-top:2rem;
    padding-right: 2rem;

    h6 {
        font-size:1rem;
        font-weight: 700;
    }
    .star {
        position:absolute;
        left: 10%;
        top: -20px;
        background: #fff;
        height: 40px;
        width: 40px;
        border-radius:50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`

export function ExeEducation({title, date, courses, list, color }){
    return (
        <ExecutiveCard>
            <ColoredTop colorr={color}>
                <p>gotocourse</p>
            </ColoredTop>
            <ContentBottom>
                <div className="star">
                    <BsStarFill color="#FFCE31" size="1.5rem" />
                </div>
                <h6>{title}</h6>
                <div className="d-flex justify-content-between my-4">
                    <span>{date}</span>
                    <span>{courses}</span>
                </div>
                <ul>
                    {
                        list.map((item)=>(
                            <li>{item}</li>

                        ))
                    }
                </ul>
            </ContentBottom>
        </ExecutiveCard>
    )
}


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

        .ct_bar{
            width:1px;
            height:100%;
            background: #333;
        }
    }
`
export function InDemand(){
    return (
        <InDemandCard>
            <div className="top_content">
                <h6>Business Analytics with Excel</h6>
                <img src={techie} alt="" />
            </div>
            <div className="mid_content">
                <div className="mid_stats">
                    <span>4.6</span>
                    <span>356k</span>
                    <span>4hr</span>
                </div>
                <ul>
                    <li>Completion certificate</li>
                    <li>Earn upto $138k</li>
                </ul>
            </div>
            <div className="cta">
                <span>View course</span>
                <div className="ct_bar"></div>
                <span>Start Learning</span>
            </div>
        </InDemandCard>
    )
}



// UPSKILL COURSES

const UpCoursesCard = styled.div`
    border: 2.2648px solid rgba(0, 114, 239, 0.5);
    padding: clamp(0.03125rem, -0.2813rem + 1.5625vw, 1.125rem);
    border-radius: 8px;

    h5 {
        font-weight: 800;
        color: #0072EF;
    }
    a {
        color:#0072EF;
        font-size:14px;
    }
    
`

export function UpskillCourseCard(params) {
    return (
        <UpCoursesCard>
            <h5>Products</h5>
            <small>Turn your content into a polished online course, subscription, or any other digital product you can imagine. </small>
            <div>
                <a href="/">Explore <i></i></a>
            </div>
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

export function VirtualCard(){
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

export function LiveWebinarCard({img, title, place, time}){
    return (
        <WebinarWrapper>
            <div className="img_top">
                <img src={webimage} alt="" />
            </div>
            <div className="content">
                <h6>A preview of sp certificate</h6>
                <div>
                    <p>Gotocourse</p>
                    <p>Monday, 09 Nov 22 | 9:00PM(CST) - 10PM(CST)</p>
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

export  function SuccessCard({icon, description}){
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

export function ClassTypeComponent({children, header:head, header2, subtext, bottomTitle, bottomLink}){
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



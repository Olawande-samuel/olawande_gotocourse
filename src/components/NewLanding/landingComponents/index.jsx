import {styled} from  "styled-components"

// GREAT OPPORTUNITIES

const ImageCard = styled.div`
    position: absolute;

    img {
        width:100%;
        height: 100%;
    }

    p {
        position: absolute;
        bottom: 20px;
        right: 0;
        left: 0;
        width: 50%;
        font-size: 14px;
        font-weight: 500;
        color: #fff;
    }
    
`
export function GreatImage({img, content}){
    return (
        <ImageCard>
            <img src="" alt="" />
            <p>Executive</p>
        </ImageCard>
    )
}


// TECHPRENEURSHIP

const TechCard = styled.div`
    border: 1px solid #eee;
    position: relative;
    > h6 {
        font-weight: 700;
        color: #272C37;
    }

    div:first-child {

        .tag {
            padding: 4px 8px;
            background-color: #E2EDF9;
            color: #6C7480;
        }

        .tech_info {
            display: flex;
            flex-wrap:wrap;

            .divider {
                width: 1px;
                height: 100%;
                background-color:#D2D6DE;
                margin-inline: 1.5rem;
            }
        }
    }

    .bar {
        position: absolute;
        width:4px;
        height:70px;
        background: ${(props)=>props.alternate === "blue" ? '#00C3E1' : props.alternate === "pink" ? '#FF8C90' : '#F1C44A'}
    }

`

export function TechPreCard({title, tag, ratings, totalRatings}) {
    return (
        <TechCard>
            <h6>AWS Solutions Architect</h6>
            <div>
                <div className="tag">
                </div>
                <div className="text_info">
                    <div className="divider"></div>
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
    flex: 20%;
    background-color: ${(props)=>props.color};
`
const ContentBottom = styled.div`
    position: relative;
    flex: 80%;
    font-size: 14px;

    h6 {
        font-size:1rem;
        font-weight: 700;
    }
    .star {
        position:absolute;
        left: 10%;
        top: -20px;
    }
`

export function ExeEducation(){
    return (
        <ExecutiveCard>
            <ColoredTop/>
            <ContentBottom>
                <div className="star"></div>
                <h6>Cloud Architect</h6>
                <div>
                    <span>11 Months</span>
                    <span>11 Courses</span>
                </div>
                <ul>
                    <li>31 tools & Rigorous curriculum</li>
                    <li>Master's certificate</li>
                    <li>Certification Aligned with Silver Microsoft Partner & 2 more</li>
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


`



// UPSKILL COURSES

const UpCoursesCard = styled.div`
    border: 2.2648px solid rgba(0, 114, 239, 0.5);
    padding: clamp(0.03125rem, -0.2813rem + 1.5625vw, 1.125rem);
    
`

export function UpskillCourseCard(params) {
    return (
        <UpCoursesCard>
            <h5>Products</h5>
            <small>Turn your content into a polished online course, subscription, or any other digital product you can imagine. </small>
            <a href="/">Explore <i></i></a>
        </UpCoursesCard>
    )
}   
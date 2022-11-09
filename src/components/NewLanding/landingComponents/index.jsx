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
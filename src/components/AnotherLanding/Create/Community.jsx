import styled from "styled-components"
import community from '../../../images/landing/community.png'

const Container = styled.div`
padding: 2rem;
background: #F0F4FF;

.communitycontent{
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;

    .communityleft{
        flex:.5; 
    }

    .communityright{
        flex:.5;
        display: flex; 
        flex-direction: column;

        h5{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            // line-height: 36px;
        }

        p{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #000000;
        }

        button{
            justify-items: flex-end;
            background: #0C2191;
            border-radius: 8px;
            border:2px solid white;
            color: #fff;
            padding: .5rem 1rem;
            font-weight: 700;
            font-size: 22px;
            line-height: 27px;
            width: 300px ;

    }
    }

}




@media (max-width:768px){
    .communitycontent{
        flex-direction: column;

        .communityleft{
            width: 100%;
            img{
                width: 100%;
                object-fit: cover;
            }
        }

    }
}
`
const Community = () => {
    return (
        <Container>
            <div className="communitycontent">

                <div className="communityleft">
                    <img src={community} alt="" width={400} />

                </div>
                <div className="communityright">
                       <h5>Be the biggest community of Educators </h5>
                    <p>We do more when we learn  and support each other. Be part of our community to achieve your goals and share knowledge with like minds.</p>
                    <button>Join community</button>
                </div>
            </div>
        </Container>
    )
}

export default Community
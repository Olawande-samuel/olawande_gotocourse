import styled from "styled-components"
import community from '../../../images/landing/community.png'

const Container = styled.div`
padding: 2rem 1rem;
// background: #F0F4FF;

.communitycontent{
    padding: 3rem 2rem;
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
            font-size: 28px;
            // line-height: 36px;
        }

        p{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
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
            font-size: 14px;
            line-height: 27px;
            width: 150px ;

        }
    }

}




@media (max-width:768px){
    .communitycontent{
        flex-direction: column;
        padding : 5rem 0;

        .communityleft{
            width: 100%;
            img{
                width: 100%;
                object-fit: cover;
            }
        }

        .communityright{
            text-align: center;
            align-items: center;
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
                    <h5>Join  the biggest community of Educators </h5>
                    <p>We do more when we learn  and support each other. <br />
                        Be part of our community to achieve your goals and <br />
                        share knowledge with like minds.</p>
                    <button>Join community</button>
                </div>
            </div>
        </Container>
    )
}

export default Community
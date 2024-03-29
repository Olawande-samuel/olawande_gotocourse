import { AiOutlineRight } from "react-icons/ai"
import { Link } from "react-router-dom"
import styled from "styled-components"
import tool from '../../../images/landing/tool.png'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
// padding: 6rem 1rem;
padding: 2rem 1rem;
gap: 2rem;

.tleft{
    flex: .4;
    // border: 2px solid red;

   img{
    max-width: 100%;
    max-height: 400px;
    object-fit: cover;
    // border: 2px solid yellow; 

   }


}

.toolsright{
    flex: .6;
    // border: 2px solid yellow;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 800;
        font-size: 26px;
        color: #0C1825;
        // line-height: 36px;
    }

    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 27px;
        color: #353535;

    }

    a{
        color: #0D60D8;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;

    }

}

@media (max-width: 768px){
    flex-direction: column;
    padding: 2rem;
    text-align: center;

    .toolsright{
        padding: 1rem 0;

    }

   
}
`

const Tools = () => {
    return (
        <Container className="container">
            <div className="tleft">
                <img src={tool} alt="" />
            </div>

            <div className="toolsright">

                <h4>Get all the tools you need all-in-one place</h4>
                <div>
                <p>Transform your knowledge into a thriving business with the best online course platform for professionals everywhere. Great educators love the use of Gotocourse to teach and engage learners .</p>
                {/* <Link to={'/'}>Learn more <AiOutlineRight /></Link> */}
                </div>

            </div>

        </Container>
    )
}

export default Tools
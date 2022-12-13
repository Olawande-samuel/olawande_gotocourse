import styled from "styled-components"
import last from '../../images/landing/last.png'
import third from '../../images/landing/third.png'
import second from '../../images/landing/second.png'
import one from '../../images/landing/one.png'
import { Link } from "react-router-dom"
import { AiOutlineArrowRight } from "react-icons/ai"
const Container = styled.div`
padding: 2rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.payhead h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: #1B1F29;
}

.payimages{
    display: flex;
    gap: 1rem;
    // border: 2px solid red;


    .payimg{
        flex: .25;
        gap: 1rem;
    // border: 2px solid green;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        img{
            width: 100%;
        }


        .paytext{
            p{
                font-family: 'ABeeZee';
                font-style: italic;
                font-weight: 400;
                font-size: 20px;
                line-height: 19px;
            }
    
            span{
                font-family: 'Inter';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 25px;
                color: #2C3242;
    
            }
    
            a{
                color: #175FFF;
                display: block;
                font-family: 'ABeeZee';
                font-style: italic;
                font-weight: 400;
                font-size: 16px;
                line-height: 18px;
            }
    
        }
    
    
    }


    
}


    

@media (max-width:768px){
    .payimages{
        flex-direction: column;
    }
}
`

const Payment = () => {
    return (
        <Container>
            <div className="payhead">
                <h4>Thousands of educators trust gotocourse for </h4>
                <h4>exceptional student experience</h4>
            </div>

            <div className="payimages">
                <div className="payimg">
                    <img src={one} alt="" />

                    <div className="paytext">
                        <p>course creation studio</p>
                        <span>
                            Create an immersive attendee experience with interactive programming for both digital and onsite audiences
                        </span>
                        <Link to={'/'}>Learn more <AiOutlineArrowRight /> </Link>

                    </div>
                </div>
                <div className="payimg">
                    <img src={second} alt="" />
                    <div className="paytext">
                        <p>Admin management</p>
                        <span>
                            Produce professional, reliable streams easily leveraging StreamYard's innovative broadcast studio                    </span>
                        <Link to={'/'}>Learn more <AiOutlineArrowRight /></Link>

                    </div>

                </div>
                <div className="payimg">
                    <img src={third} alt="" />

                    <div className="paytext">
                        <p>manage  payments</p>
                        <span>
                            Promote your event with beautiful, easy to build landing pages designed to drive registrations and ticket sales                    </span>
                        <Link to={'/'}>Learn more <AiOutlineArrowRight /></Link>

                    </div>
                </div>
                <div className="payimg">
                    <img src={last} alt="" />

                    <div className="paytext">
                    <p>Quiz/assessment management</p>
                    <span>
                        Optimize your in-person experience with best-in-class capabilities like badge printing and lead retrieval                    </span>
                    <Link to={'/'}>Learn more <AiOutlineArrowRight /></Link>

                </div>
                </div>
            </div>


        </Container>
    )
}

export default Payment
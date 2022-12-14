import styled from "styled-components"
import third from '../../../images/manage/three.png'
import second from '../../../images/manage/two.png'
import one from '../../../images/manage/one.png'

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
    justify-content: center;
    gap: 1rem;
    // border: 2px solid red;


    .payimg{
        flex: .3;
        gap: 1rem;
    // border: 2px solid green;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        img{
            width: 100%;
        }


        .paytext{
            .payheadtext{
                font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 20px;
            }
            p{
                font-family: 'Raleway';
font-style: normal;
font-weight: 500;
                font-size: 20px;
                line-height: 19px;
            }
    
            span{
                font-family: 'Raleway';
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

const Success = () => {
    return (
        <Container>
            <div className="payhead">
                <h4>Your Success is our #1 priority</h4>
                <h4>Do more with Gotocourse.</h4>
            </div>

            <div className="payimages">
                <div className="payimg">
                    <img src={one} alt="" />

                    <div className="paytext">
                        <p className="payheadtext">24/7 Support</p>
                        <span>
                            Our customer support team is
                            available 24/7/365 to assist you
                            with any questions, comments,
                            or concerns. We are dedicated to
                            providing a high level of customer
                            service and support.
                        </span>

                    </div>
                </div>
                <div className="payimg">
                    <img src={second} alt="" />
                    <div className="paytext">
                        <p className="payheadtext">Supportive community</p>
                        <span>
                            Our community of educators and learners is supportive, encouraging, and helpful. We encourage you to connect with other members for advice, tips, and support.
                        </span>
                    </div>

                </div>

                <div className="payimg">
                    <img src={third} alt="" />

                    <div className="paytext">
                        <p className="payheadtext">Business Advising</p>
                        <span>
                            Our team of business advisors has experience in the education industry and can help you create a plan for your business.
                        </span>
                    </div>
                </div>

            </div>


        </Container>
    )
}

export default Success
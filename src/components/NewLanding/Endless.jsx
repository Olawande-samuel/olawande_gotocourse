import man from "../../images/a/man.png";
import woman from "../../images/a/woman.png";
import one from "../../images/a/one.png";
import cohort from "../../images/a/cohort.png";

import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
   background: #F3F9FF;
   padding : .5rem 0;

   .container{
       .headercontent{
            text-align: center;
            padding-bottom: 2.5rem;
    
            h4{
                color: #000;
                font-size: 30px;
                padding-bottom: 1rem;
                font-family: 'Raleway';

            }
    
            p{
    
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 20px;
                color: #131313;
            }
    
        }

   }




`
const ContentBody = styled.div`
/* border: 2px solid red; */
/* height: 60vh; */
display: flex;
padding: 2rem;

.left{
    flex: .5;
    text-align: center;

    h6{
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        color: #131313;
        padding-bottom: 1.5rem;
    }

    p{
        font-family: 'Raleway';
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #9F9F9F;
    }
}

.right{
    flex: .5;
}




@media screen and (max-width:768px){
flex-direction: column;
padding: 2rem 0;


.left, .right{
        img{
            width: 100%
        }
}

} 
    
`

const ReverseBody = styled.div`
/* border: 2px solid red; */
padding: 2rem;
display: flex;

.left{
    flex: .5;
    text-align: center;

}

.right{
    flex: .5;
    h6{
        font-family: 'Raleway';
        font-weight: 700;
        font-size: 24px;
        line-height: 30px;
        color: #131313;
        padding-bottom: 1.5rem;
    }

    p{
        font-family: 'Raleway';
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        color: #9F9F9F;
    }
}

@media screen and (max-width:768px){
flex-direction: column;
padding: 2rem 0;

.right{
        text-align: center;
        img{
            width: 100%
        }
}

.left{
        img{
            width: 100%
        }
}

} 
    
`



const Endless = () => {

    return (
        <Container>
            <div className="container">
                <div className="headercontent">
                    <h4>ENDLESS POSSIBILITIES</h4>
                    <p>
                        Learn how to grow your online education business with resources specifically tailored <br />
                        to help you create , manage and grow your virtual education platform.

                    </p>
                </div>

                <ContentBody>
                    <div className="left">
                        <h6>Learn from industry Experts</h6>
                        <p>
                            Learn business skills from industry<br />
                            experts through Live classes,<br />
                            workshops, pre-recorded videos, and<br />
                            mentorship

                        </p>

                    </div>
                    <div className="right">
                        <img src={man} alt="" />

                    </div>

                </ContentBody>

                <ReverseBody>
                    <div className="left">
                        <img src={woman} alt="" />

                    </div>
                    <div className="right">
                        <h6>Live instructor-led learning</h6>
                        <p>
                            Our live instructor-led courses are designed to help<br />
                            you stay engaged and focused throughout the course,<br />
                            so you can get the most out of your learning experience.


                        </p>

                    </div>


                </ReverseBody>

                <ContentBody>
                    <div className="left">
                        <h6>One-on-one mentoring</h6>
                        <p>
                            We provide a one-on-one mentorship session <br />
                            on tools and skills to turn your knowledge into<br />
                            income and running a successful virtual academy.

                        </p>
                    </div>
                    <div className="right">
                        <img src={one} alt="" />

                    </div>

                </ContentBody>

                <ReverseBody>
                    <div className="left">
                        <img src={cohort} alt="" />

                    </div>

                    <div className="right">
                        <h6>Cohort learning</h6>
                        <p>
                            Looking for a more collaborative learning <br />
                            experience? Our cohort learning option allows you<br />
                            to join a group of like-minded individuals all <br />
                            working towards a common goal. You'll have the <br />
                            opportunity to engage with your peers, share your<br />
                            ideas, collaborate on projects and build lasting<br />
                            relationships with other learners.                     </p>
                    </div>


                </ReverseBody>




            </div>
        </Container>
    )
}




export default Endless
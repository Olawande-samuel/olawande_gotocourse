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
                        Join 20,000+ users who access learning anytime, anywhere, on any device <br />
                        Let our  real world experts give you a  good start, learn live and get mentored by  <br />
                        instructors with wide range of experience.

                    </p>
                </div>

                <ContentBody>
                    <div className="left">
                        <h6>Learn from industry Experts</h6>
                        <p>
                            Learn high in-demand skills from <br />
                            industry experts through Live classes,<br />
                            pre-recorded videos, and mentorship
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
                            Our live instructor-led courses are designed to<br />
                            help you stay engaged and focused <br />
                            throughout the course, so you can get the most<br />
                            out of your learning experience. With<br />
                            Gotocourse's live instructor-led learning, you'll<br />
                            have all the benefits of a traditional classroom<br />
                            with the convenience of online learning.
                        </p>

                    </div>
                   

                </ReverseBody>

                <ContentBody>
                    <div className="left">
                        <h6>One-on-one mentoring</h6>
                        <p>
                            Challenge yourself with a one-on-one mentorship <br />
                            session with industry experts and<br />
                            professionals and grow your career
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
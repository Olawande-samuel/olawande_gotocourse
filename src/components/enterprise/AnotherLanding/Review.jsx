import styled from "styled-components"
import review1 from '../../../images/landing/review1.png'
import review2 from '../../../images/landing/review2.png'
import review3 from '../../../images/landing/review3.png'
import quote from '../../../images/landing/quote.svg'
import others from '../../../images/landing/others.png'

const Container = styled.div`
background: url(${others});
background-repeat: no-repeat;
background-size: cover;
padding: 2rem 1rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.reviewhead h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 800;
    font-size: 26px;
    // font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: #1B1F29;
}

.reviewcontent{
    display: flex;
    gap: 1rem;


    .reviewdiv{
        flex: .33;       
        border: 1.01562px solid rgba(61, 64, 81, 0.4);
        border-radius: 30px;
        padding: 2rem;
        position: relative;
        min-height: 25rem;

        .reviewtop{
            display: flex;
            gap: 1rem;
        }

        .reviewbottom{
            // display: flex;
            // flex-direction: column;
            // gap: 1rem;

            position: absolute;
            bottom: 15px;


            .reviewpersonimg{
                // border: 2px solid red;
                width: 50px;
                height: 50px;

                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                }
            }

            .reviewpersoninfo{
            p{
                margin-top: .5rem;
                margin-bottom: 0;
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                // line-height: 29px;
                display: flex;
                align-items: center;
                color: #000;
            }

            p:nth-of-type(2){
                margin: 0;
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                // line-height: 29px;
                display: flex;
                align-items: center;
                color: #464646;
            }

        }
        }
    }
    
}

@media (max-width: 912px){
    .reviewcontent{
        // flex-direction: column;

        .reviewdiv{
            min-height: 30rem;
            // padding: 2rem .5rem;
            padding: 2rem .5rem;

        }
    }
}

@media (max-width:768px){
    .reviewcontent{
        flex-direction: column;

        .reviewdiv{
            min-height: 20rem;
            padding: 2rem .5rem;

        }
    }

   
}


.
`
const Review = () => {
    return (
        <Container>
            <div className="container">

            <div className="reviewhead">
                <h4>See what other educators are  </h4>
                <h4>saying about us</h4>
            </div>

            <div className="reviewcontent">
                <div className="reviewdiv">
                    <div className="reviewtop">
                        <div>
                            <img src={quote} alt="" />

                        </div>
                        <div>
                            <p>Gotocourse is the top platform for experts to share their knowledge. The advanced search and the intuitive UI make it easy for learners to find what they need. We are proud to partner with Gotocourse.</p>
                        </div>
                    </div>

                    <div className="reviewbottom">
                        <div className="reviewpersonimg">
                            <img src={review1} alt="" />

                        </div>
                        <div className="reviewpersoninfo">
                            <p>John Adewale</p>
                            <p>Zachsam</p>

                        </div>

                    </div>

                </div>

                <div className="reviewdiv">
                    <div className="reviewtop">
                        <div>
                            <img src={quote} alt="" />

                        </div>
                        <div>
                            <p>A real pleasure to work with. Gotocourse platform is super easy to use and we are happy with the steady increase in enrollments. The customer service is excellent</p>
                        </div>
                    </div>

                    <div className="reviewbottom">
                        <div className="reviewpersonimg">
                            <img src={review2} alt="" />

                        </div>
                        <div className="reviewpersoninfo">
                            <p>Catherine</p>
                            <p>Head of studies, Realztech Institute.</p>

                        </div>

                    </div>

                </div>

                <div className="reviewdiv">
                    <div className="reviewtop">
                        <div>
                            <img src={quote} alt="" />

                        </div>
                        <div>
                            <p>Gotocourse has helped me gained confidence alongside teaching. No matter what you are looking to teach, or gain confidence in teaching. Gotocourse’s tools make up the best environment for you.</p>
                        </div>
                    </div>

                    <div className="reviewbottom">
                        <div className="reviewpersonimg">
                            <img src={review3} alt="" />

                        </div>
                        <div className="reviewpersoninfo">
                            <p>Sarah Jones</p>
                            <p>BetaGRc</p>

                        </div>

                    </div>

                </div>


            </div>
            </div>



        </Container>
    )
}

export default Review
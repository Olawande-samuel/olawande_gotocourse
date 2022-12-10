import styled from "styled-components"
import review1 from '../../images/landing/review1.png'
import review2 from '../../images/landing/review2.png'
import review3 from '../../images/landing/review3.png'
import quote from '../../images/landing/quote.svg'

const Container = styled.div`
background: rgba(241, 248, 255, 0.69);
padding: 2rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.reviewhead h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: #1B1F29;
}

.reviewcontent{
    display: flex;
    gap: 1rem;


    .reviewdiv{
        flex: .33;       
        border: 1.19742px solid #3D4051;
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
                margin-bottom: 0;
                font-family: 'Segoe UI';
                font-style: normal;
                font-weight: 400;
                font-size: 15px;
                // line-height: 29px;
                display: flex;
                align-items: center;
                color: #464646;
            }

            p:nth-of-type(2){
                margin-bottom: 0;
                font-family: 'Segoe UI';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                // line-height: 29px;
                display: flex;
                align-items: center;
                color: #000;
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
            min-height: 30rem;
            padding: 2rem .5rem;

        }
    }

   
}


.
`
const Review = () => {
    return (
        <Container>
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
                            <p>The AvantStay team has been growing rapidly and, Wrangle is the tool behind the scenes keeping our workflows on track in Slack. Wrangle saves us hundreds of hours a month while also ensuring nothing gets lost in the chaos of Slack.</p>
                        </div>
                    </div>

                    <div className="reviewbottom">
                        <div className="reviewpersonimg">
                            <img src={review1} alt="" />

                        </div>
                        <div className="reviewpersoninfo">
                            <p>Reuben Doetsch</p>
                            <p>Cofounder and CTO, AvantStay</p>

                        </div>

                    </div>

                </div>

                <div className="reviewdiv">
                    <div className="reviewtop">
                        <div>
                            <img src={quote} alt="" />

                        </div>
                        <div>
                            <p>In companies, people have been abusing Slack for tickets for years. Wrangle fixes everything. As an Ops professional this is everything I have ever wanted. To have all this housed in Slack? Phenomenal.</p>
                        </div>
                    </div>

                    <div className="reviewbottom">
                        <div className="reviewpersonimg">
                            <img src={review2} alt="" />

                        </div>
                        <div className="reviewpersoninfo">
                            <p>KC Procter</p>
                            <p>Director of Operations, The Speaker Lab</p>

                        </div>

                    </div>

                </div>

                <div className="reviewdiv">
                    <div className="reviewtop">
                        <div>
                            <img src={quote} alt="" />

                        </div>
                        <div>
                            <p>As a startup, we run on slim margins but, we needed a way to automate and streamline our security compliance needs. Wrangle has allowed us to build out approval workflows that otherwise would have to be tracked and done manually, likely resulting in human error.</p>
                        </div>
                    </div>

                    <div className="reviewbottom">
                        <div className="reviewpersonimg">
                            <img src={review3} alt="" />

                        </div>
                        <div className="reviewpersoninfo">
                            <p>Isaac Painter</p>
                            <p>Senior Manager of Information Security, Aumni</p>

                        </div>

                    </div>

                </div>


            </div>



        </Container>
    )
}

export default Review
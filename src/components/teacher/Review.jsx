import styled from "styled-components"
// import star from "../../images/a/star.png";
// import greta from "../../images/a/greta.png";
// import woman from "../../images/a/coach.png";
// import green from "../../images/a/green.png";
import { FaStar } from "react-icons/fa";
import aisha from "../../images/aisha.png";
import steph from "../../images/steph.png";

const Container = styled.div`
padding:.5rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.reviewhead{
    text-align: center;
    header{
        margin-bottom: 1rem
    }
    h4{
       margin-bottom: 1rem;
       text-align: center;
       font-family: 'Raleway';
       font-style: normal;
       font-weight: 800;
       font-size: 28px;
    }

    p{
        font-family: 'Raleway';
        color: var(--theme-blue);
        font-size: 18px;

    }

    img{
        max-width: 100%;
    }

}


.reviewcontent{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: #000;
    /* border: 2px solid red; */


    .reviewdiv{
        /* background: #E1E2FF; */
        /* border-radius: 10px; */
        padding: 2rem;
        position: relative;
        min-height: 22rem;
        /* border: 2px solid green; */
        border: 1.17337px solid rgba(159, 159, 159, 0.1);
box-shadow: 0px 4.69347px 5.86683px rgba(12, 33, 145, 0.08);
border-radius: 23.4673px;

        .reviewtop{
            display: flex;
            gap: 1rem;
            font-weight: 400;
            font-size: 16px;
            padding: 1rem 0;
           
        }

        .reviewbottom{
            width:100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            position: absolute;
            bottom: 15px;
            right:0;
            left:0;
            padding: 0 2rem;


            .pers{
                display: flex;
                align-items: center;
                gap: 2rem;

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
                       // line-height: 29px;
                       display: flex;
                       align-items: center;
                   }
    
                   p:nth-of-type(1){
                       font-weight: 800;
                       font-size: 24px;
    
                   }
    
                   p:nth-of-type(2){
                       margin: 0;
                       font-family: 'Raleway';
                       font-style: normal;
                       font-weight: 400;
                       font-size: 18px;
                       // line-height: 29px;
                       display: flex;
                       align-items: center;
                   }
    
               }

            }

        }
    }
    
}

@media (max-width: 912px){
    .reviewcontent{
        grid-template-columns: 1fr;

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

            .reviewbottom{
                flex-direction: column;
                position: unset;
                bottom: unset;
                right:unset;
                left:unset;
                padding: unset;
            }

        }
    }

   
}



`
const Review = () => {
    return (
        <Container>
            <div className="container">

                <div className="reviewhead">
                    <header>
                        <h4>Reviews  </h4>
                        <p className="subtitle text-center mx-auto" style={{ width: "min(100% - 1rem, 700px)" }}>Care to know what the world say about us?</p>
                    </header>
                </div>

                <div className="reviewcontent">
                    <div className="reviewdiv">

                        <div className="reviewtop">
                            <div>
                                <p>It's not a fluke when I say that I've had the best experience on Gotocourse, after teaching on a few other platforms before. The administration is really accommodating and doesn't stifle my creative process. If you want a space where you can do what you truly love and still earn good money, Gotocourse is where I recommend!</p>
                            </div>
                        </div>
                        <div className="reviewbottom">
                            <div className="pers">
                                <div className="reviewpersonimg">
                                    <img src={aisha} alt="" />
                                </div>
                                <div className="reviewpersoninfo">
                                    <p>Aisha</p>
                                    <p>India</p>

                                </div>

                            </div>

                            <div className="rating">
                                {

                                    [...Array(5)].map((_, i) => (
                                        <FaStar style={{color:"#FFCB14"}}/>
                                    ))
                                }
                            </div>

                        </div>



                    </div>

                    <div className="reviewdiv">

                        <div className="reviewtop">

                            <div>
                                <p>
                                    As an IT expert who specializes in cybersecurity, I didn't start out wanting to be a teacher. However, when I learned that I could share my knowledge and develop courses at Gotocourse which I could also monetize, I jumped at the opportunity, and the journey has been a lot of fun. My love for the process of knowledge transfer has been greatly facilitated by the platform. The experience has been worth a while, thank you Gotocourse.
                                </p>
                            </div>
                        </div>

                        <div className="reviewbottom">
                            <div className="pers">
                            <div className="reviewpersonimg">
                                <img src={steph} alt="" />

                            </div>
                            <div className="reviewpersoninfo">
                                <p>Stephanie</p>
                                <p>Canada</p>

                            </div>

                            </div>

                            <div className="rating">
                                {

                                    [...Array(5)].map((_, i) => (
                                        <FaStar style={{color:"#FFCB14"}}/>
                                    ))
                                }
                            </div>

                        </div>



                    </div>

                    {/* <div className="reviewdiv">


                        <div className="reviewbottom">
                            <div className="reviewpersonimg">
                                <img src={green} alt="" />

                            </div>
                            <div className="reviewpersoninfo">
                                <p>Robert Greene</p>
                                <p>Author & Thought leader</p>

                            </div>

                        </div>

                        <div className="reviewtop">

                            <div>
                                <p>
                                “The future belongs <br/>
                                to those who learn <br/>
                                more skills and <br/>
                                combine them in <br/>
                                 creative ways.”
                                </p>
                            </div>
                        </div>

                    </div> */}


                </div>
            </div>



        </Container>
    )
}

export default Review
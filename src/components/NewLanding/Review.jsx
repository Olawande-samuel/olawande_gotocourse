import styled from "styled-components"
import star from "../../images/a/star.png";
import greta from "../../images/a/greta.png";
import woman from "../../images/a/coach.png";
import green from "../../images/a/green.png";


const Container = styled.div`
padding: 2rem 1rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.reviewhead{
    text-align: center;
    h4{
       margin-bottom: 2rem;
       text-align: center;
       font-family: 'Raleway';
       font-style: normal;
       font-weight: 800;
       font-size: 32px;
       color: #000;
    }

    p{
        font-family: 'Raleway';
    }

}


.reviewcontent{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    align-items: center;
    gap: 1rem;
    color: #000;
    /* border: 2px solid red; */


    .reviewdiv{
        /* background: #E1E2FF; */
        border-radius: 10px;
        padding: 2rem;
        position: relative;
        min-height: 25rem;
        /* border: 2px solid green; */


        .reviewtop{
            display: flex;
            gap: 1rem;
            font-style: italic;
            font-weight: 400;
            font-size: 18px;
            padding: 1rem 0;
            /* position: absolute;
            bottom: 15px; */
        }

        .reviewbottom{
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
                        <img src={star} alt="" />
                        <h4 style={{ color: "var(--theme-blue)", fontSize: "40px" }}>Be a Global Talent  </h4>
                        <p className="subtitle text-center mx-auto" style={{ width: "min(100% - 1rem, 700px)" }}>Globalization is a phenomenon that has transformed the way business is conducted. Multinational corporations have various parts of their operations and organizations spread out across different locations around the world.</p>
                    </header>
                </div>

                <div className="reviewcontent">
                    <div className="reviewdiv">
                        <div className="reviewbottom">
                            <div className="reviewpersonimg">
                                <img src={greta} alt="" />
                            </div>
                            <div className="reviewpersoninfo">
                                <p>Geeta Vasandani</p>
                                <p>Student success factor</p>

                            </div>

                        </div>
                        <div className="reviewtop">
                            <div>
                                <p>“You make your self <br/>
                                vulnerable if you have only <br/>
                                one skill in this fourth  <br/>
                                industrial revolution. ”</p>
                            </div>
                        </div>
                        


                    </div>

                    <div className="reviewdiv">


                        <div className="reviewbottom">
                            <div className="reviewpersonimg">
                                <img src={woman} alt="" />

                            </div>
                            <div className="reviewpersoninfo">
                                <p>Success Ojo</p>
                                <p>Director, GotoCourse</p>

                            </div>

                        </div>

                        <div className="reviewtop">

                            <div>
                                <p>
                                    “In a global economy <br/>
                                    where the most valuable <br/>
                                    skill you can sell is your <br/>
                                    knowledge, in- demand <br/>
                                     skill is no longer just a <br/>
                                     pathway to opportunity - it <br/>
                                      is a necessity”
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="reviewdiv">


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

                    </div>


                </div>
            </div>



        </Container>
    )
}

export default Review
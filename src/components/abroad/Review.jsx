import styled from "styled-components"
import people from '../../images/abroad/Ellipse.png'


const Container = styled.div`
padding: 2rem 1rem;
display: flex;
flex-direction: column;
align-items: center;
gap: 2rem;

.reviewhead h4{
    margin-bottom: 2rem;
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    // font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: var(--theme-blue);
}

.reviewcontent{
    display: flex;
    gap: 1rem;
    color: var(--theme-blue);


    .reviewdiv{
        flex: .33;       
        background: #E1E2FF;
border-radius: 10px;
        padding: 2rem;
        position: relative;
        min-height: 25rem;

        .reviewtop{
            display: flex;
            gap: 1rem;
            font-style: italic;
            padding: 1rem 0;
            /* position: absolute;
            bottom: 15px; */
        }

        .reviewbottom{
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



`
const Review = () => {
    return (
        <Container>
            <div className="container">

                <div className="reviewhead">
                    <h4>Success Stories from our Alumni  </h4>
                </div>

                <div className="reviewcontent">
                    <div className="reviewdiv">
                        <div className="reviewbottom">
                            <div className="reviewpersonimg">
                                <img src={people} alt="" />

                            </div>
                            <div className="reviewpersoninfo">
                                <p>John Adewale</p>
                                <p>Zachsam</p>

                            </div>

                        </div>
                        <div className="reviewtop">
                            <div>
                                <p>Gotocourse is the top platform for experts to share their knowledge. The advanced search and the intuitive UI make it easy for learners to find what they need. We are proud to partner with Gotocourse.</p>
                            </div>
                        </div>



                    </div>

                    <div className="reviewdiv">
                        

                        <div className="reviewbottom">
                            <div className="reviewpersonimg">
                                <img src={people} alt="" />

                            </div>
                            <div className="reviewpersoninfo">
                                <p>Catherine</p>
                                <p>Head of studies, Realztech Institute.</p>

                            </div>

                        </div>

                        <div className="reviewtop">
                            
                            <div>
                                <p>A real pleasure to work with. Gotocourse platform is super easy to use and we are happy with the steady increase in enrollments. The customer service is excellent</p>
                            </div>
                        </div>

                    </div>

                    <div className="reviewdiv">
                       

                        <div className="reviewbottom">
                            <div className="reviewpersonimg">
                                <img src={people} alt="" />

                            </div>
                            <div className="reviewpersoninfo">
                                <p>Sarah Jones</p>
                                <p>BetaGRc</p>

                            </div>

                        </div>

                        <div className="reviewtop">
                           
                           <div>
                               <p>Gotocourse has helped me gained confidence alongside teaching. No matter what you are looking to teach, or gain confidence in teaching. Gotocourse’s tools make up the best environment for you.</p>
                           </div>
                       </div>

                    </div>


                </div>
            </div>



        </Container>
    )
}

export default Review
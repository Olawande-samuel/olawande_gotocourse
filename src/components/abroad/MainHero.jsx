import styled from "styled-components";
import babe from '../../images/abroad/babe.png'
import hero from '../../images/abroad/map.png'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


const Container = styled.section`
margin-top: 5rem;
background: linear-gradient(180deg, #0C2191 0%, #000F62 100%);
  
`


const TopContainer = styled.div`
width: 100%;
font-family: 'Raleway';
color: #fff;
padding: 2rem 0;
display: flex;
flex-direction: column;
gap: 5rem;

.container{
    /* width: 80%; */
    /* margin: 0 auto; */
    display: flex;

    .heroleft{
        /* border: 2px solid red; */
        flex: .5;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

    
         h1{
            font-style: normal;
            font-weight: 900;
            font-size: 40px;
            line-height: 54px;
            padding: .3rem 0;
            color:var(--theme-orange)
         }
         p{
            font-weight: 400;
            font-size: 14px;
            line-height: 28px;

         }

         .icons{
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            /* justify-content: space-between; */

            .heroicons{
                display: flex;
                align-items: center;
                gap: .5rem
            }
         }


         button {
        margin-top: 2rem;
        border: none;
        border-radius: 7px;
        background: var(--theme-orange);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }




    }

    .heroright{
        /* border: 2px solid yellow; */
        flex: .5;
        height: 100%;
        padding: 1rem;

        img{
            max-width: 100%;
            max-height: 100%;
        }

    }

    .pad{
        padding: 2rem 2rem 2rem 0;
    }


    
  
}

@media (min-width: 820px ) and (max-width: 1024px){
    height: unset;

    .container{

            .heroleft{
                h1{
                font-size: 30px;
                line-height: 30px;
            }
        }
}
}



@media (max-width: 768px) {
        height: unset;
        text-align: center;

        .container{
            width: 100%;
            margin: unset;
            flex-direction: column-reverse;

            .heroleft{

                h1{
                font-size: 40px;
                line-height: 40px;
            }
        }

        .pad{
            padding: 2rem;
        }


        /* &:nth-of-type(2){
        flex-direction: column;

        }  */
    }

 
    
}

`
const BottomContainer = styled.div`
width: 100%;
font-family: 'Raleway';
color: #fff;
padding: 2rem 0;
display: flex;
flex-direction: column;
gap: 5rem;

.container{
    /* width: 80%; */
    /* margin: 0 auto; */
    display: flex;

    .heroleft{
        /* border: 2px solid yellow; */
        flex: .5;
        height: 100%;
        padding: 1rem;

        img{
            max-width: 100%;
            max-height: 100%;
        }

    }

    .heroright{
        /* border: 2px solid red; */
        flex: .5;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;

    
         h1{
            font-style: normal;
            font-weight: 900;
            font-size: 40px;
            line-height: 54px;
            padding: .3rem 0;
            color:var(--theme-orange)
         }
         p{
            font-weight: 400;
            font-size: 14px;
            line-height: 28px;

         }

         .icons{
            display: flex;
            flex-wrap: wrap;
            gap: 2rem;
            /* justify-content: space-between; */

            .heroicons{
                display: flex;
                align-items: center;
                gap: .5rem
            }
         }


         button {
        margin-top: 2rem;
        border: none;
        border-radius: 7px;
        background: var(--theme-orange);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }




    }

   



    
  
}

@media (min-width: 820px ) and (max-width: 1024px){
    height: unset;

    .container{

            .heroright{
                h1{
                font-size: 30px;
                line-height: 30px;
            }
        }
}
}



@media (max-width: 768px) {
        text-align: center;

        .container{
            width: 100%;
            flex-direction: column;
            gap: 2rem;

            .heroright{

                h1{
                font-size: 40px;
                line-height: 40px;
            }
        }

 


        /* &:nth-of-type(2){
        flex-direction: column;

        }  */
    }

 
    
}
`

const MainHero = () => {
    return (
        <Container>
            <Navbar />
            <TopContainer>
                <div className="container">

                    <div className="heroleft">
                        <h1>Supporting Africans <br />
                            get into Tech
                        </h1>
                        <p>
                            Welcome to Gotocourse Africa, an initiative that aims to empower Africans
                            with in-demand tech and business skills. In today's digital world, having these
                            skills is crucial for success, and we believe that everyone should have access
                            to them. We strive to IT skills accessible and affordable for everyone,
                            regardless of their location or background. Join us today and start your
                            journey towards a brighter future!

                        </p>

                        {/* <div className="icons">

                        <div className="heroicons">
                            <img src={circle} alt="" />
                            <span>
                                4 Month Training
                            </span>

                        </div>

                        <div className="heroicons">
                            <img src={bag} alt="" />
                            <span>
                                4 Month Training
                            </span>

                        </div>

                    </div> */}

                        <Link to={`/signup?trainee`}><button>Register for free</button> </Link>

                    </div>

                    <div className="heroright">
                        <img src={hero} alt="" />
                    </div>


                </div>
            </TopContainer>
            <BottomContainer>

                <div className="container">

                    <div className="heroleft " >
                        <img src={babe} alt="" />
                    </div>

                    <div className="heroright">
                        <h2>How we train and mentor students
                        </h2>
                        <p>
                            At Gotocourse Africa, we provide a supportive learning environment
                            with expert instructors and personalized mentorship, empowering our
                            students to succeed and reach their goals in the tech industry.

                        </p>





                    </div>




                </div>

            </BottomContainer>

        </Container>
    )
}

export default MainHero
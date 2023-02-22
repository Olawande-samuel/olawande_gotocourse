import styled from "styled-components";
// import hero from '../../images/abroad/train.png'
import hero from '../../images/abroad/newhero.png'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

// background-image: url(${hero});
// background-size: cover;
// background-repeat: no-repeat;
// background-position: center;

const Container = styled.div`
height: 60vh;
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);
margin-top: 5rem;

.container{
    display: flex;

    .heroleft{
        /* border: 2px solid red; */
        flex: .5;
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .welcome{
            font-weight: 700;
            font-size: 24px;
            line-height: 20px;
        }

         h1{
            font-style: normal;
            font-weight: 900;
            font-size: 60px;
            line-height: 54px;
            padding: .3rem 0;
         }


         button {
        margin-top: 2rem;
        border: 2px solid white;
        border-radius: 7px;
        background: var(--theme-blue);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }



    }

    .heroright{
        flex: .5;
        height: 100%;
        img{
            max-width: 100%;
            max-height: 100%;
        }

    }


    
  
}

@media (max-width: 768px) {
        height: unset;
        text-align: center;

        .container{
            flex-direction: column-reverse;

            .heroleft{

                h1{
                font-size: 40px;
                line-height: 40px;
            }
        }
    }
}

`

const Hero = () => {
    return (
        <Container>
            <Navbar />
            <div className="container">

                <div className="heroleft">
                    <p className="welcome">Welcome to</p>
                    <h1>Train to work
                        <span className="d-block">
                            abroad programme
                        </span>
                    </h1>
                    <p>Increase your chances of success in the<br />
                        global job market.</p>

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

        </Container>
    )
}

export default Hero
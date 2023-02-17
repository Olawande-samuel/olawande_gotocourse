import styled from "styled-components";
import hero from '../../images/abroad/train.png'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";


const Container = styled.div`
background-image: url(${hero});
background-size: cover;
background-repeat: no-repeat;
height: 100vh;
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);
margin-top: 5rem;
padding: 1rem 0;

.container{
    .heroleft{
        width: 50%;
        /* margin-top: 5rem; */
         h1{
            font-style: normal;
            font-weight: 900;
            font-size: 60px;
            line-height: 54px;
         }

         .icons{
            display: flex;
            align-items: center;
            gap: 1rem;
          

                .heroicons{
                    color: #0E00C9;
                    background: #DEEDFF;
                    border-radius: 12px;
                    padding: .5rem;
                }

         }

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

@media (max-width: 768px) {
        height: unset;
        text-align: center;

        .container{
        .heroleft{
            width: 100%;
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

                    <Link to={`/signup`}><button>Register for free</button> </Link>

                </div>


            </div>

        </Container>
    )
}

export default Hero
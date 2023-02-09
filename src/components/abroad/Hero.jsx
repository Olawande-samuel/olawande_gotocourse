import styled from "styled-components";
import hero from '../../images/abroad/train.png'
import circle from '../../images/abroad/circle.svg'
import bag from '../../images/abroad/bag.svg'
import Navbar from "./Navbar";


const Container = styled.div`
background-image: url(${hero});
background-size: cover;
background-repeat: no-repeat;
height: 100vh;
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);

.container{
    .heroleft{
        width: 50%;
        margin-top: 5rem;
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



`

const Hero = () => {
    return (
        <Container>
            <Navbar />
            <div className="container">

                <div className="heroleft">
                    <h1>Train to work
                        <span className="d-block">
                            abroad
                        </span>
                    </h1>
                    <p>Increase your chances of success in the<br />
                        global job market.</p>

                    <div className="icons">

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

                    </div>

                    <button>Enroll now</button>

                </div>


            </div>

        </Container>
    )
}

export default Hero
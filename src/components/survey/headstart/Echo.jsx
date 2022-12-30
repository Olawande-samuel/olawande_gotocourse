import { FiPlayCircle } from "react-icons/fi"
import styled from "styled-components"
import img1 from '../svg/img1.png'
import img2 from '../svg/img2.png'
import img3 from '../svg/img3.png'

const Container = styled.div`
background: rgba(141, 160, 255, 0.5);padding:  2rem 0;

.echo{

    h4{
        text-align: center;
        padding:  1rem 0;

    }

    .avatarcontainer{
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .echoprofile{
            display: flex;
            flex-direction: column;
            // gap:2rem;
            align-items: center;
            padding: 2rem 0 ;

            .avatarimg{
                width: 200px;
                height: 200px;
    
                img{
                    width: 100%;
                    height: 100%;
                }
            }

            p{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 700;
                font-size: 22px;
                color: #0C2191;
            }

            span{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                color: #0C2191;
            }
        }


    }
}


@media (max-width: 768px){
    .echo{
        .avatarcontainer{
            flex-direction: column;
        }
    }
}
`


const Echo = () => {
    return (
        <Container>
            <div className="echo container">
                <h4>
                    Echoes from Gotocourse Alumni
                </h4>

                <div className="avatarcontainer">
                    <div className="echoprofile">
                        <div className="avatarimg">
                            <img src={img1} alt="" />

                        </div>
                        <p>Funmi</p>
                        <span>Watch video <FiPlayCircle
                        // size="5rem" 
                        />
                        </span>

                    </div>

                    <div className="echoprofile">
                        <div className="avatarimg">
                            <img src={img2} alt="" />

                        </div>
                        <p>Lere</p>
                        <span>Watch video <FiPlayCircle
                        // size="5rem" 
                        />
                        </span>

                    </div>

                    <div className="echoprofile">
                        <div className="avatarimg">
                            <img src={img3} alt="" />

                        </div>
                        <p>Jummy</p>
                        <span>Watch video <FiPlayCircle
                        // size="5rem" 
                        />
                        </span>

                    </div>
                </div>

            </div>

        </Container>
    )
}

export default Echo
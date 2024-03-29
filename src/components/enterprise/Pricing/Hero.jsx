import { Link } from "react-router-dom"
import styled from "styled-components"
import heroimg from '../../../images/pricing/heroprice.png'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: #0C1825;
padding: .5rem 1rem;
margin-top: 4rem;



.heroleft{
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex:.6;

    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 900;
        font-size: clamp(2.8125rem, 2.25rem + 1.8vw, 3.0375rem);
    }
  
}

.heroright{
    flex:.4;
    width: 100%;
    height: 500px;
    padding: 2rem 0;

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

}

@media (max-width: 768px){
    flex-direction: column-reverse;
    text-align: center;

    .heroleft{
    
        .email{
            flex-direction: column;
            gap: unset;

        }
    }

    .heroright{
        
        width: 100%;
        img{
            width: 100%;
            object-fit: cover;
        }
    }
}


@media (max-width: 912px){

    .heroleft{
        .email{
            gap: unset;
            justify-content: space-between;

        }
    }
    .heroright{
        width: 100%;
        height: 400px;
        img{
            width: 100%;
            height: 100%;
            // object-fit: cover;
        }
    }
}


`
const Hero = () => {
    return (
        <Container className="container">

            <div className="heroleft">
                <div>
                    <h1>
                        <span> Discover the capabilities of </span>
                        <span className="d-block">Gotocourse and begin</span>
                        <span className="d-block">building your online course </span>
                        <span className="d-block">business now</span>
                    </h1>

                </div>
              
            </div>

            <div className="heroright">
                <img src={heroimg} alt=""
                    width={400}
                // height={200}
                />

            </div>

        </Container>

    )
}

export default Hero
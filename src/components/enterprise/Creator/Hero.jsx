import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
background: linear-gradient(180deg, #0B8FAC 0%, #071974 100%);
color: #fff;
padding: .5rem 1rem;
margin-top: 4rem;
height: 70vh;

.heroheader{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 900;
        font-size: clamp(2.8125rem, 2.25rem + 1.8vw, 3.0375rem);
        // font-size: clamp(2.25rem, 2.1429rem + .5357vw, 3rem);
    }
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
    }
}




   


@media (max-width: 768px){
    text-align: center;
    height: 90vh;

}


@media (max-width: 912px){

  
}


`
const Hero = () => {
    return (
        <Container>
                <div  className="heroheader container">
                    <h1>
                        <span>Learn Product Management from </span>
                        <span className="d-block">some of the best in the world</span>
                    </h1>

                    <p>Your one-stop platform for live learning. though t eb </p>

                </div>
               


        </Container>

    )
}

export default Hero
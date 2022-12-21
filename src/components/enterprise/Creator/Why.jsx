import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
color: #292D32;
padding: .5rem 1rem;
// margin-top: 4rem;
height: 70vh;

.heroheader{
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    h4{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 900;
        color: #1B1F29;
        font-size: 30x;
        // font-size: clamp(2.25rem, 2.1429rem + .5357vw, 3rem);
    }
    p{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        text-align: center;
    }
}




   


@media (max-width: 768px){
   
}


@media (max-width: 912px){

  
}


`
const Why = () => {
    return (
        <Container>
                <div  className="heroheader container">
                    <h4><span>Why our school?</span></h4>

                    <p>Our school provides the best learning experience for teachers and students alike. <br/>
                        Our school provides the best learning experience for teachers and students alike. Helping everyone <br/>
                        througOur school provides the best learning experience for teachers and students alike. <br/>
                        Helping everyone through
                        </p>

                </div>
               


        </Container>

    )
}

export default Why
import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
 padding: 3rem 0;
 
 .container{
    text-align: center;
    width: 70%;

     h4{
            font-weight: 700;
            font-size: 32px;
            line-height: 40px;
            color: #101213;
        }
       
    p{
        padding: 1rem 0;
        font-weight: 600;
        font-size: 14px;
    
    }

    button {
        margin-top: 2rem;
        border: 2px solid white;
        border-radius: 7px;
        background: var(--theme-orange);
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
        width: 150px;
    }


 }


`
const Train = () => {
    return (
        <Container>
            <div className="container">
                <h4>
                    We we train to move from <br />
                    Zero level to Expert.
                </h4>
                <p>
                    Not a tech savvy? That’s not a problem. We’ll train you from ground up to be a valuable asset and solution provider in the tech industry. Whether you are just starting out or looking to advance your career, we have the resources and expertise to help you achieve your goals. Join us today and take the first step towards a brighter future!
                </p>

                <Link to={'/signup'}> <button>Apply Now</button></Link>
               
            </div>

        </Container>

    )
}

export default Train
import { Link } from "react-router-dom"
import styled from "styled-components"
import redirect from '../../images/redirect.png'

const Container = styled.div`
background: #EFF2FF;
height: 100vh;
display: flex;
flex-direction: column;
justify-item: center;
align-items: center;
padding: 4rem 0;

img{
    // border: 2px solid red;
}

h4{
    font-family: 'Raleway';
font-style: normal;
font-weight: 700;
font-size: 36px;
line-height: 114.4%;
text-align: center;
color: #0C2191;
padding: 1rem 0;

}

p{
    font-family: 'Raleway';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 28px;
text-align: center;
padding: 1.5rem 0;
color: #292D32;
a{
    color: var(--theme-blue);
}
}

button {
    border: 2px solid white;
    border-radius: 7px;
    background: var(--theme-blue);
    color: #fff;
    padding: 0.5rem 1rem;
    font-weight: 700;
    font-size: 14px;
    line-height: 27px;
    width: 150px;
    a {
        color: #fff;
    }
}

`


const RedirectPage = () => {
    return (
        <Container>
            <img src={redirect} alt="" />
            <h4>Kindly log in to complete payment
            </h4>
            <Link to={'/login'}><button>Log in</button></Link>
            <p>Do not have an account?
                <Link to={'/signup'}> Register here</Link></p>

        </Container>
    )
}

export default RedirectPage
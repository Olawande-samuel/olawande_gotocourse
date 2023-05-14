import { Link } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`

background: #E7F2FF;
padding: 2rem 0;
color: var(--theme-blue);
width: 100%;

.content{
    text-align: center;
    width: 80%;
    margin:0 auto;
    h4{
       margin-bottom: 1.5rem;
       text-align: center;
       font-family: 'Raleway';
       font-style: normal;
       font-weight: 800;
       font-size: 24px;
    }

    p{
        font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 34px;
    }
    
    button {
                margin-top: 2rem;
                border: none;
                border-radius: 7px;
                background: var(--theme-blue);
                color: #fff;
                padding: 0.5rem 2rem;
                font-weight: 700;
                font-size: 14px;
                line-height: 27px;
                width: 200px;
            }
}
`

const Unlock = () => {
    return (
        <Container>
            <div className="container">
                <div className="content">

                    <h4>Unlock New Possibilities with Our EdTech Platform</h4>
                    <p>
                        we understand the challenges teachers face when transitioning to online learning. That’s why we’ve developed a <br/>
                        comprehensive edtech platform designed to help teachers stay connected with their students and create engaging online
                        learning experiences. Our platform is designed to help teachers access the latest educational technology, create virtual
                        classrooms, and access a range of online teaching tools. 
                    </p>

                    <Link to={`/qualifications`}><button>Get Started</button> </Link>
                </div>

            </div>
        </Container>
    )
}

export default Unlock
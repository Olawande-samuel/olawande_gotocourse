import styled from "styled-components"

const Container = styled.div`
 background: #C9D1FF;
 padding-top: 2rem;
   
p{
    font-weight: 600;
font-size: 22.538px;
line-height: 32px;
text-align: center;
color: var(--theme-blue);
margin-bottom: unset;

}

`
const Join = () => {
    return (
        <Container>
            <div className="container">
                <p>
                    Join Gotocourse to unleash untapped opportunities in borderless knowledge sharing <br />
                    across the world! We are ready to serve you anywhere you are
                </p>
            </div>

        </Container>

    )
}

export default Join
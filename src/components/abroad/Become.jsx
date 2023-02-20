import styled from "styled-components"

const Container = styled.div`
    padding: 2rem;
    text-align: center;
    background: #E1E7FF;


    h4{
        font-weight: 700;
font-size: 32px;
line-height: 48px;
color: #101213;
    }

    p{
        font-weight: 400;
font-size: 18px;
line-height: 32px;
    }
`

export const Become = () => {
    return (
        <Container>
            <div className="container">
                <h4>Become Global Talent by Learning on Gotocourse</h4>
                <p>The Train to Work Abroad is tailored in the direction of equipping individuals to work abroad and live the lives of their dreams. With our comprehensive training facilitated by world-class Tech experts and professionals, you can rest assured that this program is for you.</p>

            </div>
        </Container>
    )
}
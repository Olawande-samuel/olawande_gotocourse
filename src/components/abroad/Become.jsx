import styled from "styled-components"

const Container = styled.div`
    padding: 2rem;
    background: linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%);


    h4{
        font-weight: 700;
        font-size: 32px;
        line-height: 40px;
        color: #101213;
        text-align: center;
    }

    p{
        font-weight: 400;
        font-size: 16px;
        line-height: 40px;
        /* text-align: center; */

    }


    @media (max-width: 768px) {
        padding: 2rem  0;

    }
`

export const Become = () => {
    return (
        <Container>
            <div className="container">
                <h4>Become Global Talent by Learning on Gotocourse</h4>
                <p>The Train to Work Abroad is tailored in the direction of equipping individuals to work abroad
                    and live the lives of their dreams. With our comprehensive training facilitated by world-class
                    Tech experts and professionals, you can rest assured that this program is for you.</p>

            </div>
        </Container>
    )
}
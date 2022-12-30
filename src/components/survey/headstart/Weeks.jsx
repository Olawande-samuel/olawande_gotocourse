import styled from "styled-components"


const Container = styled.div`
padding: 2rem 0;
background: #ABCCFC;
text-align: center;

h4{
    font-family: "Raleway";
    font-weight: 500;
    color: #000;
    font-size: 30px;
    padding: 1rem 0 ;
}

p{
    font-family: "Raleway";
    font-size: 18px

}

button {
    align-self: flex-start;
    border: none;
    border-radius: 24px;
    background: #2A32C5;
    color: #fff;
    padding: 0.5rem 1rem;
    font-weight: 700;
    font-size: 14px;
    line-height: 27px;
    a {
        color: #fff;
    }
}
`

const Weeks = () => {
    return (
        <Container>
            <div className="container">
                <h4>Courses runs between 3 weeks to 6 weeks</h4>
                <p>
                    Fun and creative way to introduce tech and problem solving skills to young people. <br />
                    This training program  helps young people set themselves up for lifetime opportunities <br />
                    for success through coaching and mentoring
                </p>

                <button>Start my application</button>
            </div>

        </Container>
    )
}

export default Weeks
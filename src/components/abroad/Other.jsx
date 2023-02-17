import styled from "styled-components"


const Container = styled.div`
padding: 2rem 0;

.container{
    display: flex;
    flex-direction: column;
    justify-content: center;

    h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 800;
    font-size: 32px;
    // font-size: clamp(2.1rem, 2.1429rem + .5357vw, 2.5rem);
    // line-height: 54px;
    color: var(--theme-blue);
    margin-bottom: 1.5rem;
    }

    ul{
        margin: 0;
        padding: 0;
        color: var(--theme-blue);
        display: flex;
        justify-content: space-between;
        width: 70%;
        margin: 0 auto;

        .first{
            /* border: 2px solid red; */
            display: flex;
            flex-direction: column;
            align-items: end;
        }

        li{
            padding: .2rem 0;
        }

    }


    @media (max-width: 768px) {

        ul{
            flex-direction: column;

            .first{    
            align-items: start;
            }
        }
        
    }
}
    


`
const Other = () => {
    return (
        <Container>
            <div className="container">
                <h4>Other things you stand to benefit</h4>

                <ul>
                    <div className="first">
                        <li> Portfolio  and profile optimization by world-class experts</li>
                        <li>Resume revamp</li>
                        <li>Linkedin Optimization</li>
                    </div>
                    <div className="second">
                        <li>Hands-on training</li>
                        <li>Industry-based tutelage for global positioning.</li>
                    </div>
                </ul>
            </div>

        </Container>

    )
}

export default Other
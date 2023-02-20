import styled from "styled-components"

const Container = styled.div`
text-align: center;
padding: 3rem 0;
    
.container{
    h4{
        font-style: italic;
        font-weight: 600;
        font-size: 30px;
        line-height: 40px;
        color: #262626;
    }

    .boxitem{
        background: #FFFFFF;
        border-radius: 40px;
        padding: 2rem;

        h6{
        font-style: italic;
        font-weight: 600;
        font-size: 24px;
        line-height: 40px;
        color: #262626;
         }

        .ratings{
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            padding: 2rem 0;

            .rating{
                p{
                    font-style: normal;
                    font-weight: 700;
                    font-size: 28px;
                    line-height: 32px;
                    color: #131313;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .boxitem{
        

        .ratings{
            grid-template-columns: 1fr;
        }
    }  
    }
}
`
export const Build = () => {
    return (
        <Container>
            <div className="container">

                <h4>Build your future with GotoCourse</h4>

                <div className="boxitem">
                    <h6>We have years of experience doing this with proof</h6>
                    
                    <div className="ratings">

                        <div className="rating">
                            <p>1k+</p>
                            <span>alumni since <br/>we started</span>
                        </div>

                        <div className="rating">
                            <p>87%</p>
                            <span>find a tech job after six <br/> months*</span>
                        </div>

                        <div className="rating">
                            <p>79%</p>
                            <span>of students complete our <br/>programs*</span>
                        </div>
                    </div>

                </div>

            </div>
        </Container>
    )
}
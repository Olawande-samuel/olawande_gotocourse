import styled from "styled-components"

const Container = styled.div`
    padding: 5rem 0;

    .content{
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;

        h4{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 28px;
            color: #1B1F29;
        }


        .items{
            width: 80%;
            padding: 2rem 4rem;
            background: #EAF4FF;
            border-radius: 30px;

            h5{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                color: #1B1F29;
            }
            p{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 500;
                font-size: 16px;
                line-height: 27px;
                color: #1B1F29;
            }
        }

    }

    @media (max-width: 768px){
        .content{
            width: 100%;
            .items{
                padding: 2rem;
    
            }

        }
    }

`
const Faq = () => {
    return (
        <Container className="container">
            <div className="content">
                <h4>FAQ</h4>
                <div className="items">
                    <h5>How do I register</h5>
                    <p>An all-in-one event management platform that makes planning, producing, and reliving event experiences easier than ever.. Our school provides the best learning experience for teachers and students alike. Helping everyone throug. Our school provides the best learning experience for teachers and students alike. Helping everyone throug</p>
                </div>

                <div className="items">
                    <h5>How do I register</h5>
                    <p>An all-in-one event management platform that makes planning, producing, and reliving event experiences easier than ever.. Our school provides the best learning experience for teachers and students alike. Helping everyone throug. Our school provides the best learning experience for teachers and students alike. Helping everyone throug</p>
                </div>
            </div>

        </Container>
    )
}

export default Faq
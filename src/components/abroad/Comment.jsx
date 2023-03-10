import styled from "styled-components"
import greta from "../../images/a/greta.png";
import woman from "../../images/a/coach.png";
import green from "../../images/a/green.png";
const Container = styled.section`
    padding: 5rem 0;

.container{
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;


    .items{
        display: flex;
        background: #FFFFFF;
        box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
        border-radius: 4px;
        padding: 2rem;

        .img{
            flex: .3;

        }

        .comment{
            flex:.7;
            display: flex;
            flex-direction: column;

            .commenter{
                p{
                    font-style: normal;
                    font-weight: 700;
                    font-size: 24px;
                    line-height: 23px;
                    margin-bottom: 0;
                }
            }
        }
    }

}

@media (max-width: 768px) {

        .container{
           grid-template-columns: 1fr;
           .items{
               flex-direction: column;

           }

            
        }

 
    }


    
`

const Comment = () => {
    return (
        <Container>
            <div className="container">
                <div className="items">
                    <div className="img">
                        <img src={woman} alt="" />
                    </div>
                    <div className="comment">
                        <p>
                            “In a global economy where the most valuable skill you can sell is your knowledge, in- demand skill is no longer just a pathway to opportunity - it is a necessity”
                        </p>
                        <div className="commenter">
                            <p>Success Ojo </p>
                            <span>Director, Gotocourse</span>
                        </div>
                    </div>

                </div>
                <div className="items">
                    <div className="img">
                        <img src={greta} alt="" />
                    </div>
                    <div className="comment">
                        <p>
                            “You make your self vulnerable if you have only one skill in this fourth  industrial revolution. ”
                        </p>
                        <div className="commenter">
                            <p>Geeta Vasandani</p>
                            <span>Student Success Factor</span>
                        </div>
                    </div>

                </div>
                <div className="items">
                    <div className="img">
                        <img src={green} alt="" />
                    </div>
                    <div className="comment">
                        <p>
                        “The future belongs to those who learn more skills and combine them in creative ways.”
                        </p>
                        <div className="commenter">
                            <p>Robert Greene</p>
                            <span>Author & Thought leader </span>
                        </div>
                    </div>

                </div>
            </div>

        </Container>
    )
}

export default Comment
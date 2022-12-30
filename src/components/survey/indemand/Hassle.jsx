import styled from "styled-components"
import mentorship from '../svg/mentorship.svg'
import video from '../svg/video.svg'
import payment from '../svg/payment.svg'


const Container = styled.div`
width: 80%;
margin: 0 auto;
padding:  2rem 0;


h4{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 30px;
    line-height: 47px;
    color: #000000;
}

.hasslecontent{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 2rem 0;

    .hassleitem{
        flex: .3;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        img{
            width: 30px;
            height: 30px;
        }
    }
}

@media (max-width: 768px){
    .hasslecontent{
        flex-direction: column;
    }
}

`
const Hassle = () => {
    return (
        <Container>
            <h4>With Gotocourse you will have a hassle free learning :</h4>
            <div className="hasslecontent">
                <div className="hassleitem">
                    <img src={mentorship} alt="" />
                    <p>1:1 Mentorship</p>
                    <p>
                        Connect with real world experts <br />
                        with proven experience and <br />
                        strategies
                    </p>
                </div>
                <div className="hassleitem">
                    <img src={video} alt="" />

                    <p>Live learning</p>
                    <p>
                        Instructor-led live learning<br />
                        structured to support every<br />
                        learner abilities
                    </p>
                </div>
                <div className="hassleitem">
                <img src={payment} alt="" />

                    <p>Flexible payment options</p>
                    <p>
                        Explore Gotocourse flexible <br />payment options that fit<br /> every need
                    </p>
                </div>
            </div>

        </Container>
    )
}

export default Hassle
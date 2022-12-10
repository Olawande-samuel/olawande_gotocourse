import styled from "styled-components"
import midpic from '../../images/landing/midpic.png'

const Container = styled.div`
padding: 2rem;

.contentp{
    text-align: center;
    padding: 2rem;

}

`

const Top = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 2rem;


&>:first-child{   
    flex:.5;
    // border:2px solid red;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
}

&>:last-child{
    // border:2px solid yellow;
    flex:.5;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 98.02%;
    color: #0C2191;
}

@media (max-width: 768px){
    flex-direction: column;
    text-align: center;

}

`
const Middle = styled.div`
display: flex;
gap: 2rem;
width: 100%;

.middlecontentleft{
    flex: .4;
}

.middlecontentright{
    flex:.6;
    width: 100%;
    display: grid;
    grid-template-columns: repeat( 2, 1fr); 
    gap: 2rem;


    .miditem{
        background: #FAFBFF;
        border: 1px solid #F1F2F5;
        border-radius: 12px;
        padding: 2rem;
        text-align: center;

        p{
            font-family: 'ABeeZee';
            font-style: italic;
            font-weight: 400;
            font-size: 20px;
            line-height: 36px;
        }

        span{
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #717580;
        }
    }
}

@media (max-width: 912px){
    .middlecontentleft{
        width: 100%;
        img{
            width: 100%;
            // object-fit: cover;
        }
    }
}

@media (max-width: 768px){
    flex-direction: column;

    .middlecontentleft{
            width: 100%;
            img{
                width: 100%;
                object-fit: cover;
            }
    }

    .middlecontentright{
        grid-template-columns: 1fr; 

    }
}

`
const User = () => {
    return (
        <Container>
            <Top>
                <div>
                    <p>Great educators use Gotocourse to <br />
                        teach and engage learners .</p>

                </div>
                <div>
                    <p> 22,000+ users globally
                    </p>
                </div>
            </Top>
            <div className="contentp">
            <p>Gotocourse provides everything you need to get started  and grow </p>

            </div>


            <Middle>
                <div className="middlecontentleft">
                    <img src={midpic} alt="" width={400}/>
                </div>

                <div className="middlecontentright">

                    <div className="miditem">
                        <p>Onboard With Ease</p>
                        <span>
                            Sell your courses through Hopin events, with all sorts of features to make it a complete experience.
                        </span>
                    </div>

                    <div className="miditem">
                        <p>Interractive dasboard</p>
                        <span>Webinars tend to be one-sided. Listeners are passively attending Hopin ups the engagement.</span>
                    </div>

                    <div className="miditem">
                        <p>Monetize classes</p>
                        <span>
                            Host a physical event, and stream it into Hopin with all our interactive segments for your online audience.
                        </span>
                    </div>

                    <div className="miditem">
                        <p>Engage with learners</p>
                        <span>
                            Connect people online with ease through one to one meetings in succession via video.

                        </span>
                    </div>

                    <div className="miditem">
                        <p>Flexible learning</p>
                        <span>
                            Connect people online with ease through one to one meetings in succession via video.

                        </span>
                    </div>

                    <div className="miditem">
                        <p>Global reach</p>
                        <span>
                            Connect people online with ease through one to one meetings in succession via video.

                        </span>
                    </div>

                </div>
            </Middle>

        </Container>

    )
}

export default User
import styled from "styled-components"
import npt from '../../../images/create/npt.svg'
import government from '../../../images/create/government.svg'
import camp from '../../../images/create/camp.svg'
import bag from '../../../images/create/bag.svg'
import hat from '../../../images/create/hat.svg'
import lib from '../../../images/create/lib.svg'


const Container = styled.div`
width: 100%;
padding: 5rem 1rem;

h5{
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 900;
    font-size: 28px;
    text-align: center;
    color: #111111;
    // line-height: 54px;
}

    p{
        font-family: 'Raleway';
        font-style: italic;
        font-weight: 500;
        text-align: center;
        font-size: 20px;
        color: #000;


    }

.list__content{
    width: 100%;
    padding:2rem 4rem ;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .list__item{
        // border: 2px solid red;
        display: flex;
        flex-direction: column;
        padding: 1rem;

        img{
            width: 50px;
            height: 50px;
        }

        p{
            font-family: 'Raleway';
            font-style: italic;
            font-weight: 100;
            font-size: 20px;
            color: #1B1F29;
            text-align: start;

        }

        span{
            
            font-family: 'Gilroy';
            font-style: normal;
            font-weight: 300;
            font-size: 20px;
            line-height: 23px;
            color: #717580;
        }

    }

}

@media (max-width:768px){
    .list__content{
        grid-template-columns:  1fr;
        padding:2rem;
        text-align: start;


    }
}


`

const Educator = () => {
    return (
        <Container>
            <h5>Educators and institutions of all sizes use Gotocourse</h5>
            <p>Explore Gotocourse to upskill for better performance, provide access to your content, experts <br/>
                and training to empower your learners and drive career development. </p>


            <div className="list__content">

                <div className="list__item">
                    <img src={lib} alt="" />
                    <div>
                        <p> Training insitutions</p>
                        <span>Institutions use Gotocourse to deliver skills and knowledge to their trainees.
                        </span>
                    </div>

                </div>

                <div className="list__item">
                    <img src={npt} alt="" />
                    <div>
                        <p>Non profit orgainzations</p>
                        <span>
                            NGOs use Gotocourse to teach their volunteers and help manage their fundraising campaigns
                        </span>

                    </div>

                </div>

                <div className="list__item">
                    <img src={government} alt="" />

                    <div>
                        <p>Government</p>
                        <span>Government agencies, all over the world, use Gotocourse to manage their training and onboarding.</span>
                    </div>

                </div>

                <div className="list__item">
                    <img src={camp} alt="" />
                    <div>
                        <p>Bootcamps</p>
                        <span>With Gotocourse, bootcamps manage coursework, student progress, and instructor feedback.</span>
                    </div>

                </div>



                <div className="list__item">
                    <img src={bag} alt="" />
                    <div>
                        <p>Businesses</p>
                        <span>Business personnel use Gotocourse to make profitable business decisions and upskill their performance.</span>
                    </div>

                </div>


                <div className="list__item">
                    <img src={hat} alt="" />
                    <div>
                        <p>Independent educators</p>

                        <span>Educators use Gotocourse to show their expertise and build a reputation.</span>
                    </div>
                </div>




            </div>

        </Container>
    )
}

export default Educator
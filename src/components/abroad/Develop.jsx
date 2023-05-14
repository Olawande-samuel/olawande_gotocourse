import styled from "styled-components"
import shake from '../../images/abroad/shake.svg'
import computer from '../../images/abroad/computer.svg'
import desktop from '../../images/abroad/desktop.svg'

const Container = styled.div`
background: #EFF2FF;
padding: 2rem;

  .container{

    h4{
        text-align: center;
        font-weight: 700;
        font-size: 38px;
        line-height: 50px;
        color: #101213;
    }
    .content{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 3rem 0;


        .item{
            padding: 1rem;

            p{
                font-weight: 700;
                font-size: 18px;
                line-height: 18px;
                color: #fff;
                padding: 1rem 0;
            }

            span{
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                color: #fff;

            }
    
        }
    }

    @media (max-width: 768px) {
        .content{
        grid-template-columns: 1fr;
        }
    }


  }

`
const Develop = () => {
    return (
        <Container>
            <div className="container">


                <h4>We have developed the best way <br/> to learn any tech Skill</h4>
                <div className="content">

                <div className="item" style={{background: "#A5683C"}}>
                        <img src={shake} alt="" />
                        <br />
                        <p>Mentorship</p>

                        <span>
                        Connect with real-world experts with <br />
                        proven experience and strategies that<br />
                         will help you step up your game.
                           
                        </span>

                    </div>

                    <div className="item" style={{background: "#5B3CA5"}}>
                        <img src={computer} alt="" />
                        <br />
                        <p>
                        Live learning

                        </p>
                        <span>
                        Instructor-led live learning structured to <br /> support every learner's abilities  <br />and convenience. 


                        </span>

                    </div>

                    <div className="item" style={{background: "#359271"}}>
                        <img src={desktop} alt="" />
                        <br />
                        <p>Flexible payment options</p>

                        <span>
                        Explore Gotocourse flexible payment <br />
                         options that fit every of your needs. 
                           


                        </span>

                    </div>

                </div>

            </div>


        </Container>

    )
}

export default Develop
import styled from "styled-components"
import shake from '../../images/abroad/shake.svg'
import computer from '../../images/abroad/computer.svg'
import desktop from '../../images/abroad/desktop.svg'

const Container = styled.div`
background: #EFF2FF;

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

            p{
                font-weight: 700;
                font-size: 18px;
                line-height: 18px;
                color: #0E00C9;
                padding: 1rem 0;
            }

            span{
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                color: #000000;

            }
    
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

                    <div className="item">
                        <img src={shake} alt="" />
                        <br />
                        <p>Real life experience</p>

                        <span>
                            With Partnerships with more than<br />
                            200 companies, you will learn with a<br />
                            real-life internship. 4 Month Training +<br />
                            5 Month Internship
                        </span>

                    </div>

                    <div className="item">
                        <img src={computer} alt="" />
                        <br />
                        <p>
                            Best learning experience
                        </p>
                        <span>
                            We're building an outstanding <br />
                            alternative to university and<br />
                            corporate training via professional internship

                        </span>

                    </div>

                    <div className="item">
                        <img src={desktop} alt="" />
                        <br />
                        <p>Dedicated Company's Direct Supervisor</p>

                        <span>
                            We have a dedicated and passionate<br />
                            supervisor who will guide, direct and<br />
                            oversee the work of the students.


                        </span>

                    </div>

                </div>

            </div>


        </Container>

    )
}

export default Develop
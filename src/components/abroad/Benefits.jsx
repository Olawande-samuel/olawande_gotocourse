import styled from "styled-components"
import personalize from '../../images/abroad/personalize.svg'
import engage from '../../images/abroad/engage.svg'
import convenience from '../../images/abroad/convenience.svg'

const Container = styled.div`
 background: #EFF2FF;
  padding: 2rem;

  .container{
    .content{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 3rem 0;


        .item{

            p{
                font-weight: 700;
                font-size: 28px;
                line-height: 43px;
                color: var(--theme-blue);
            }

            span{
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #000000;

            }
    
        }
    }


  }

`
const Benefit = () => {
    return (
        <Container>
            <div className="container">
                <div className="content">

                    <div className="item">
                        <img src={engage} alt="" />
                        <p>
                            Engaging,
                            <br />
                            experienced tutors

                        </p>
                        <span>
                            Our tutors know that it’s important to <br />
                            help you feel confident and inspired to <br />
                            conquer your learning goals.
                        </span>

                    </div>

                    <div className="item">
                        <img src={personalize} alt="" />
                        <p>
                            Personalized one-
                            <br />
                            on-one sessions

                        </p>
                        <span>
                            Everyone learns in their own way. Our <br />
                            tutors tailor sessions to your learning<br />
                            needs and help you stay engaged.

                        </span>

                    </div>

                    <div className="item">
                        <img src={convenience} alt="" />
                        <p>
                            Convenient, online,
                            <br />
                            and on your time
                        </p>
                        <span>
                            With online sessions and flexible<br />
                            scheduling, Remind tutors go <br />
                            wherever you go—and whenever you<br />
                            need help.

                        </span>

                    </div>

                </div>

            </div>


        </Container>

    )
}

export default Benefit
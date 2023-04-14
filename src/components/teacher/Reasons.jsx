import styled from "styled-components"
import personalize from '../../images/paper.png'
import engage from '../../images/grad.png'
import convenience from '../../images/lap.png'

const Container = styled.div`
 /* background: #EFF2FF; */
  padding: 2rem;

  .container{
    .content{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2rem;
        padding: 3rem 0;


        .item{
            text-align: center;

            img{
                max-width: 100px;
            }

            p{
                font-weight: 700;
                font-size: 18px;
                line-height: 43px;
            }

            span{
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #1C1D1F;

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
const Reasons = () => {
    return (
        <Container>
            <div className="container">
                <div className="content">

                    <div className="item">
                        <img src={convenience} alt="" />
                        <p>
                            Instruct using your own methods
                        </p>
                        <span>
                        Design and deliver courses that reflect your unique teaching style and expertise, using our user-friendly course creation tools.
                        </span>

                    </div>

                    <div className="item">
                        <img src={personalize} alt="" />
                        <p>
                            Encourage  learners

                        </p>
                        <span>
                        Create an interactive and supportive learning environment with quizzes, 
                        assessments, and a live class tool. Plus, stay connected with your students 
                        through our secure chat and mail system.



                        </span>

                    </div>

                    <div className="item">
                        <img src={engage} alt="" />
                        <p>
                            Earn financial and professional satisfaction
                        </p>
                        <span>
                        Monetize your courses and build your reputation as a 
                        subject-matter expert. Plus, access our creator suite 
                        and class management tools to streamline your teaching process and enhance your professional development.



                        </span>

                    </div>

                </div>

            </div>


        </Container>

    )
}

export default Reasons
import styled from "styled-components";
import tech from "../../images/a/tech.png";
import skill from "../../images/a/skill.png";
import cap from "../../images/a/cap.png";

const Container = styled.div`
   background: #fff;
   padding : 2rem 0;

   .container{
       .headercontent{
            text-align: center;
            padding-bottom: 2.5rem 0;
    
            h4{
                color: #000;
                font-size: 30px;
            }
    
            p{
    
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 20px;
                color: #131313;
            }
    
        }

        .contentbody{
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, minmax(min(250px, 300px), 300px));
        grid-auto-rows: minmax(min-content, 450px);
        overflow: hidden;
        gap: 2.5rem;
        justify-content: center;

        h6{
                color: #000;
                font-size: 30px;
                padding-bottom: 1rem;
                font-weight: 700;
                text-align: center;

            }
    
            li{
    
                font-family: 'Montserrat';
                font-style: normal;
                font-weight: 400;
                font-size: 18px;
                line-height: 20px;
                color: #131313;
            }


        .blue{
            background: #D7EAFF;
            border-radius: 10px;  
            padding: 1rem ;
            position: relative;
            

            img{
                position: absolute;
                bottom: 0;
            }
            }

        .orange{
            background: #FFE9E8;
            border-radius: 10px;   
            padding: 1rem ;
            position: relative;


         
            img{
                position: absolute;
                bottom: 0;
            }
    
        }
        
    }

   }


@media screen and (max-width: 1250px) {

.container{
    .contentbody{
        grid-template-columns: repeat(auto-fit, minmax(min(180px, 240px), 240px));
        justify-content: space-evenly;
        gap: 1rem;

    }
}
}
@media screen and (max-width:500px){
.container{
    .contentbody{
        grid-template-columns: min(100%, 280px);
        justify-content:center;
        
    }
}
} 




`

const HowLearn = () => {

    return (
        <Container>
            <div className="container">
                <div className="headercontent">
                    <h4> How you will learn</h4>
                </div>

                <div className="contentbody">
                    <div className="blue">
                        <h6>Tech <br />
                            Immersion <br />
                            Programme</h6>

                        <ul>
                            <li>Live class</li>
                            <li>Cohort learning</li>
                            <li>Interactive content & videos</li>
                            <li>Quiz</li>
                        </ul>

                        <img src={tech} alt="" />

                    </div>

                    <div className="orange">
                        <h6>Capstone  <br />
                            projects</h6>

                        <ul>
                            <li>  Work on real life projects</li>
                            <li>Research</li>
                            <li>Learn from real world expert</li>
                        </ul>

                        <img src={cap} alt="" />

                    </div>
                    <div className="blue">
                        <h6>Upskilling &  <br />
                            mentoring
                        </h6>

                        <ul>
                            <li> Learn new skills through short trainings, workshops, webinars and bootcamps</li>
                            <li>Get mentorship from professionals working in the field.</li>

                        </ul>

                        <img src={skill} alt="" />

                    </div>
                </div>



            </div>
        </Container>
    )
}




export default HowLearn
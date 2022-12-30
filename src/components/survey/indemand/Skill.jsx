import styled from "styled-components"
import lady from '../svg/lady.png'

const Container = styled.div`
padding: 5rem 1rem;


.contentcontainer{
    display: flex;
    align-items: center;
    gap: 3rem;
    
    .courseleft{
        flex: .5;
        img{
            // width: 100%;
            max-height: 400px;
            // object-fit: cover;
        }
    }

    .courseright{
        flex: .5;
        display: flex; 
        flex-direction: column;
        gap: .5rem;

        h4{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 900;
            font-size: 30px;
            color: #000;

        }
        
    
        p{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 24px;
            color: #000000;
        }

    
    }


    }

    @media (max-width: 912px){

        .contentcontainer {
            .courseleft{
                width: 100%;
                height: 300px;
                img{
                    width: 100%;
                    height: 100%;
                    // object-fit: cover;
                }
            }

        }
    
    }

    @media (max-width:768px){
        .contentcontainer{
            flex-direction: column;

            .courseleft{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                }
            }

        }
    }

`
const Skill = () => {
    return (
        <Container>
            <div className="contentcontainer container">

                <div className="courseleft">
                    <img src={lady} alt=""
                    // width={600} 
                    />

                </div>

                <div className="courseright">
                    <div>
                        <div>
                            <h4>
                                <span>
                                Acquire skills necessary for 
                                </span>
                                <span className="d-block">
                                a new tech career
                                </span>
                            </h4>
                            {/* <p>
                                Take your I.T skills to the next level !
                                At Gotocourse, building in-demand tech skills  with  confidence and excellent career transition/advancement are our priorities. <br />

                                Our nurturing environment gives every student a lifetime and meaningful learning of tech skills that  get them ready for work ,Gotocourse  is the right place for you!
                            </p> */}

                            <ul>
                                <li>Break into a rewarding tech field, even with no experience. </li>
                                <li>Join cohort of like minds in</li>
                                <li>Learn from instructor led live learning, personal mentor, and career support.</li>
                            </ul>

                        </div>

                    </div>
                   

                </div>
            </div>



        </Container>
    )
}

export default Skill
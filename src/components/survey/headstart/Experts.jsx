import styled from "styled-components"
import experts from '../svg/women.png'

const Container = styled.div`
padding: 2rem 1rem;
    color: #1B1F29;
    // border: 2px solid red;
    font-family: 'Raleway';

    h4{
        text-align: center;
        font-weight: 700;
        font-size: 30px;
        line-height: 47px;
        color: #000000;
        padding: 2rem 0;
    }


    .joincontent{
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        align-items: center;
        // border: 2px solid green;


        .joinleft{
            flex: .5;
            display: flex; 
            flex-direction: column;
            gap: 2rem;
            // border: 2px solid yellow;

            h5{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 800;
                font-size: 28px;
                color: #1B1F29;

            }

            
            
        
            p{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                color: #1B1F29;            
            }

           
    
        
    
        }
    
        .joinright{
            flex: .5;
            // border: 2px solid blue;

            img{
                width: 100%;
                object-fit: cover;
            }
      
        }

    } 
    
    @media (max-width:768px){
        text-align: center;

        .joincontent{
            flex-direction: column;

            .joinright{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                }
            }

            .joinleft{
                p{
                    padding: 2rem 0;
                }
            }
    
        }
    }
   

`
const Experts = () => {
    return (
        <Container>
            <h4>Learning is done  from real world Experts</h4>
            <div className="joincontent container">
                <div className="joinleft">
                    <div>
                        <h5>
                            <span>We are passionate about </span>
                            <span className="d-block">impacting knowledge</span>
                        </h5>

                        <p>
                            Gotocourse trainers are expert in training young people to succeed.
                            <br />Unique talents are nurtured through our varied and exciting <br />
                            courses while our stimulating and inspiring teaching develops  <br />
                            learner’s strengths and ignite their  imaginations.

                        </p>

                    </div>


                </div>

                <div className="joinright">
                    <img src={experts} alt=""
                    // width={600}
                    />

                </div>

            </div>

        </Container>
    )
}

export default Experts

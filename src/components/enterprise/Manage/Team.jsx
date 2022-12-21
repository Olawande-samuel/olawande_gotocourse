import styled from "styled-components"
import what from '../../../images/manage/team.png'

const Container = styled.div`
padding: 2rem 1rem;
    color: #1B1F29;
    // background: #F0F4FF;

    .joincontent{
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        align-items: center;

        .joinleft{
            flex: .5;
            display: flex; 
            flex-direction: column;
            gap: 2rem;
    
            h4{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 700;
                font-size: 30px;
                color: #1B1F29;
                line-height: 22px;

            }
            
        
            p{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #1B1F29;    
                margin-top: 1rem;        
        
            }

           
    
        
    
        }
    
        .joinright{
            flex: .5;
            img{
                width: 100%;
                height: 100%;
                // object-fit: cover;
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
const Team = () => {
    return (
        <Container className="container">
            <div className="joincontent">
                <div className="joinleft">
                    <div>
                    <h4>Work progressively with your team</h4>
                        <p>
                            Easily scale without fear. Move from soloprenuer into a bigger <br/>
                             team  without the fear of loosing control or not having the <br/>
                             proper tool to manage work activities and the team.
                             <br/><br/>
                            Do more with your team and be in control with our in built<br/>
                             CRM tool designed with you in mind.
                        </p>
                    </div>


                </div>

                <div className="joinright">
                    <img src={what} alt=""
                    // width={600}
                    />

                </div>

            </div>

        </Container>
    )
}

export default Team

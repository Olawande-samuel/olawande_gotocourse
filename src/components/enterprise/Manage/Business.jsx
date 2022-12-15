import styled from "styled-components"
import what from '../../../images/manage/what.png'

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
const Business = () => {
    return (
        <Container className="container">
            <div className="joincontent">
                <div className="joinleft">
                    <div>
                        <h4>Manage records with</h4>
                        <h4>ease and do more .  </h4>
                        <p>
                            Grow your business with every tool you <br />
                            need inside one easy-to-use platform. <br />
                            Run your online business without <br />
                            limitations. Download learners record ,<br />
                            record attendance and have access to <br /> 
                            student information via an interactive dashboard.
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

export default Business

import styled from "styled-components"
import what from '../../../images/manage/pay.png'

const Container = styled.div`
    padding: 2rem;
    color: #1B1F29;
    background: #F0F4FF;

    .joincontent{
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        align-items: center;

        .joinright{
            flex: .5;
            display: flex; 
            flex-direction: column;
            gap: 2rem;
    
            h4{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 700;
                font-size: 28px;
                color: #1B1F29;
                line-height: 22px;

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
    
        .joinleft{
            flex: .5;
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

            .joinleft{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                }
            }

            .joinright{
                p{
                    padding: 2rem 0;
                }
            }
    
        }
    }
   

`
const Record = () => {
    return (
        <Container>
            <div className="joincontent">

                <div className="joinleft">
                    <img src={what} alt=""
                    // width={600}
                    />

                </div>
                <div className="joinright">
                    <div>
                        <h4>Manage records with</h4>
                        <h4>ease and do more .  </h4>
                        <p>
                            Grow your business with every tool you
                            need inside one easy-to-use platform.
                            Run your online business without limitations. Download learners record , record attendance and have access to student information via an interactive dashboard.
                        </p>
                    </div>


                </div>



            </div>

        </Container>
    )
}

export default Record

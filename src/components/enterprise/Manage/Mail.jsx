import styled from "styled-components"
import what from '../../../images/manage/mail.png'

const Container = styled.div`
padding: 2rem 1rem;
    color: #1B1F29;
    background: #F0F4FF;

    .joincontent{
        display: flex;
        gap: 3rem;
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
                font-weight: 800;
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
                margin-top: 2rem;          
            }

           
    
        
    
        }
    
        .joinleft{
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
const Mail = () => {
    return (
        <Container>
            <div className="joincontent container">

                <div className="joinleft">
                    <img src={what} alt=""
                    // width={600}
                    />

                </div>
                <div className="joinright">
                    <div>
                        <h4>Enjoy secure  chat </h4>
                        <h4>and mail system</h4>
                        <p>
                        Explore our simple  two-way interaction tool for teachers and school
                        <br/> admins  to  send coupons, clear doubts, broadcast announcements,<br/>
                         or just send some motivational messages.                        </p>
                    </div>


                </div>



            </div>

        </Container>
    )
}

export default Mail

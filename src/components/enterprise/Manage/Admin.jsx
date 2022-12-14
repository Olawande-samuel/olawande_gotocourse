import styled from "styled-components"
import what from '../../../images/manage/admin.png'

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
                margin-top: 2rem;        
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
const Admin = () => {
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
                    <h4>Manage workflows </h4>
                        <h4>and priviledges  </h4>
                        <p>
                            We make it so easy to work with your team and multiple administrative staff by allowing you to control access and  give only required permissions  to what  needed to done by each member of the team.
                        </p>

                       
                    </div>


                </div>



            </div>

        </Container>
    )
}

export default Admin

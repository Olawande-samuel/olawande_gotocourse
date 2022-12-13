import styled from "styled-components"
import what from '../../../images/manage/solution.png'

const Container = styled.div`
    padding: 2rem;
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
    
        .joinright{
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
const Solution = () => {
    return (
        <Container>
            <div className="joincontent">
                <div className="joinleft">
                    <div>
                    <h4>A single solution for all your </h4>
                    <h4>business needs</h4>
                        <p>
                        Get access to coaching packages, marketing support for your business and talent, email marketing system, an online payment processing—everything you need to grow a flourishing coaching practice is here at your fingertips..
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

export default Solution

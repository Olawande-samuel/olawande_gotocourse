import styled from "styled-components"
import sell from '../../../images/landing/sell.png'

const Container = styled.div`
    padding: 2rem;
    color: #1B1F29;
    
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
const Sell = () => {
    return (
        <Container>
            <div className="joincontent">
                <div className="joinleft">
                    <div>
                        <h4>Create & sell courses for</h4>
                        <h4>everyone, anywhere</h4>
                        <p>
                            Create your learning space and get paid for
                            your expertise, manage payments via a 
                            secured payment system.
                        </p>

                    </div>


                </div>

                <div className="joinright">
                    <img src={sell} alt=""
                        // width={600}
                    />

                </div>

            </div>

        </Container>
    )
}

export default Sell
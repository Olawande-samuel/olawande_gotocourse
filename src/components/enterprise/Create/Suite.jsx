import styled from "styled-components"
import business from '../../../images/create/suite.png'

const Container = styled.div`
    padding: 2rem;
    color: #1B1F29;
    background: #F0F4FF;

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

            
           
            button{
                border:2px solid var( --theme-blue);
                border-radius: 7px;
                color: var( --theme-blue);
                background: #fff;
                padding: .5rem 1rem;
                font-weight: 700;
                font-size: 14px;
                line-height: 27px;
                width: 30%;
    
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
const Suite = () => {
    return (
        <Container>
            <div className="joincontent">
                <div className="joinleft">
                    <div>
                        <h4>Online course creation that’s  </h4> 
                        <h4>quick and easy</h4>   
                        <p>
                        With Gotocourse course creation studio , you will have everything to turn your knowledge to course in minutes. No tech skill required 
                        </p>                    
                    </div>

                    <button>Get started</button>


                </div>

                <div className="joinright">
                    <img src={business} alt=""
                        // width={600}
                    />

                </div>

            </div>

        </Container>
    )
}

export default  Suite

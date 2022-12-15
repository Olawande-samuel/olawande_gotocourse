import { Link } from "react-router-dom"
import styled from "styled-components"
import business from '../../../images/create/suite.png'

const Container = styled.div`
padding: 5rem 1rem;
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
                color: #000;
                line-height: 22px;

            }
            
        
            p{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 22px;
                color: #111217;           
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
                width: 150px;
    
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
        padding: 2rem;

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
                align-items: center;
                
                p{
                    padding: 2rem 0;
                }
            }
    
        }
    }
   

`
const Suite = () => {
    return (
        <Container className="container">
            <div className="joincontent">
                <div className="joinleft">
                    <div>
                    <div>
                        <h4>Online course creation that’s  </h4>
                        <h4>quick and easy</h4>

                    </div>
                    <p style={{marginTop: "1rem"}}>
                        With Gotocourse course creation <br />
                        studio , you will have everything to <br />
                        turn your knowledge to course in minutes. <br />
                        No tech skill required
                    </p>

                    </div>
                    <Link to={`/enterprise-signup`}> <button>Get started</button></Link>


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

export default Suite

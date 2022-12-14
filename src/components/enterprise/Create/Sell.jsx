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
                align-items: center;
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
                            Payment processing is one thing that Gotocourse has done so well. <br/>
                            We integrate with Stripe ,PayPal  and flutterway to make payments quick and seamless.<br/>
    
                            Create Incentives for  your students to refer their friends <br/>
                            with student referrals. Take advantage of the  affiliate marketing <br/>
                            tools to recruit partners to promote your business on Gotocourse.
                        </p>

                    </div>

                    <button>Start Now</button>


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
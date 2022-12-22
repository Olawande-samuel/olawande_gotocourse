import styled from "styled-components"
import what from '../../../images/manage/testimonial.png'

const Container = styled.div`
padding: 2rem 1rem;
    color: #1B1F29;
    // border: 2px solid red;


    .joincontent{
        display: flex;
        // border: 2px solid yellow;
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
                font-weight: 500;
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
                color: #111111;  
                margin-top: 1rem;          
            }

           
    
            button{
                border:2px solid white;
                border-radius: 7px;
                background: var( --theme-blue);
                color: #fff;
                padding: .5rem 1rem;
                font-weight: 700;
                font-size: 14px;
                line-height: 27px;
                width: 150px;
    
        }
        
    
        }
    
        .joinleft{
            flex: .5;
            // border: 2px solid blue;
            text-align: left;
            img{
                width: 500px;
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
                align-items: center;
                p{
                    padding: 2rem 0;
                }
            }
    
        }
    }
   

`
const Testimonial = () => {
    return (
        <Container className="container">
            <div className="joincontent">

                <div className="joinleft">
                    <img src={what} alt=""
                    // width={600}
                    />

                </div>
                <div className="joinright">
                    <div>
                        <h4>See what other educators are  </h4>
                        <h4>saying about us</h4>
                        <p>
                        Join 10,000+ educators creating better experiences
                       </p>
                    </div>

                    <button>Sign up for Free</button>

                </div>



            </div>

        </Container>
    )
}

export default Testimonial

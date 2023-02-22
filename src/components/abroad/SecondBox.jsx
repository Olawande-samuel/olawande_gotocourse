import styled from "styled-components"
import homegirl from '../../images/abroad/homegirl.png'
import moneyman from '../../images/abroad/moneyman.png'
import { Link } from "react-router-dom"

const Container = styled.div`
background: #E1E7FF;
padding: 1rem 4rem;
width: 100%;


.container{
    .topbox{
      display: grid;
      /* grid-template-columns: repeat(2, minmax(190px, 350px)); */
      grid-template-columns: repeat(2, 1fr);
      gap: 5rem;
      width: 100%;
      justify-content: center;
      padding-bottom: 1.5rem;


      .boxes{
      border-radius: 32px;
      padding: 2rem;
      position: relative;
      min-height: 280px;
      width: 100%;
      background: #FFFFFF;

      p{
          font-style: italic;
          font-weight: 600;
          font-size: 23px;
          line-height: 30px;
      }

      span{
          font-style: italic;
          font-weight: 300;
          font-size: 16px;
          line-height: 27px;
      }
      .boxbtn{
        width: 100%;
        position: absolute;
        bottom: 20px;
        /* text-align:center; */
        
              button {
                margin-top: 2rem;
                border: 2px solid white;
                border-radius: 7px;
                background: var(--theme-blue);
                color: #fff;
                padding: 0.5rem 1rem;
                font-weight: 700;
                font-size: 14px;
                line-height: 27px;
            }

      }

      }

  }

  
}



@media (max-width: 768px) {
    padding: 1rem;

    .container{
        .topbox{
            grid-template-columns: 1fr;

        .boxes{
            display: flex;
            flex-direction: column;

            .boximg img{
            justify-self: end;
            position: unset;
            width: 200px;
            height: 150px;
            object-fit: contain;
            /* border: 2px solid yellow; */
            }
        }

       

    }

   
   
    }
}

`

export const SecondBox = () => {
    return (
        <Container>
            <div className="container">
                <div className="topbox">
                    <div className="boxes">
                        <p>Employment placement assistance</p>
                        <span>We provide all the needed support and connection to getting high paying remote jobs</span>

                        <div className="boxbtn">
                            <Link to={`/signup?trainee`}><button>Register for free</button> </Link>

                        </div>

                    </div>

                    <div className="boxes">
                        <p>Earn in foreign currencies</p>
                        <span>Learn the tools, skills and resources needed to earn in forerign currencies right from where you are.</span>

                        <div className="boxbtn">
                            <Link to={`/signup?trainee`}><button>Register for free</button> </Link>

                        </div>
                    </div>

                </div>
            

            </div>


        </Container>
    )
}
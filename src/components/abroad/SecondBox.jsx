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
      grid-template-columns: repeat(2, minmax(190px, 350px));
      gap: 2rem;
      width: 100%;
      justify-content: center;
      padding-bottom: 1.5rem;


      .boxes{
      border-radius: 32px;
      padding: 2rem 1rem;
      position: relative;
      min-height: 350px;
      width: 100%;


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
        text-align:center;
        
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

      
      .boxes:nth-of-type(1){
          background: #EDFFFB;

      }

      .boxes:nth-of-type(2){
          background: #FFF9F9;
      }
  }

  .bottombox{
    display: flex;
    flex-direction: column;
    gap: 2rem; 
    padding: 1.5rem;
    /* width: 80%; */
    /* margin: 0 auto; */

    .boxes{
        display: flex;
        background: #EDFFFB;
        border-radius: 24px;

        .firstbox, .secondbox{
            flex: 5;

            img{
                max-width:100%;
                max-height: 100%;

            }
        }

        .firstbox{
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 0 1rem;

            p{
                font-style: italic;
                font-weight: 600;
                font-size: 26px;
                line-height: 30px;
            }

            span{
                font-style: italic;
                font-weight: 300;
                font-size: 16px;
                line-height: 27px;
            }

        }

        .secondbox{
            text-align: end;

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

    .bottombox{
            .boxes{
            flex-direction: column-reverse;
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
                <div className="bottombox">
                    <div className="boxes">
                        <div className="firstbox">
                            <p>Learn and work from your <br/> home country</p>
                            <span>
                                Learn and acquire skills that allow you <br/> work from your home country and <br/> anywhere in the world.


                            </span>
                        </div>

                        <div className="secondbox">
                            <img src={moneyman} alt="" />
                        </div>

                    </div>

                </div>



            </div>


        </Container>
    )
}
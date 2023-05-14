import { Link } from "react-router-dom"
import styled from "styled-components"
import moneyman from '../../images/abroad/moneyman.png'

const Container = styled.div`
/* background: #E1E7FF; */
background: rgba(214, 220, 255, 0.3);
/* background: linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%); */
width: 100%;
padding: 0 2rem;


.container{
    .contheader{
        text-align: center;
        padding: 2rem 0;
            
        h5 {
            color: #292D32;   
            font-weight: 700;
            font-size: 28px;
            padding-bottom: .7rem;
        }

        p{
            font-size: 16px;
            font-weight: 400;
            text-align: center;
            line-height: 20px;
            font-style: italic;
            color: #292D32;   

        }
    }


    .bottombox{
        display: flex;
        flex-direction: column;
        gap: 2rem; 
        height: 100%;

    .boxes{
        display: flex;
        background: #FFEDED;

        border-radius: 10px;
        height: 100%;
        padding: 1rem 2rem;


        .firstbox{
            flex: .3;
            img{
                max-width:100%;
                max-height: 100%;

            }
        }

        .secondbox{
            flex: .7;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 0 1rem;

            p{
                font-style: italic;
                font-weight: 600;
                font-size: 28px;
                line-height: 40px;
                text-align: right;
            }

            button {
            margin: 2rem 0;
            border: 2px solid var(--theme-blue);
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
    height: unset;

    .container{
        .bottombox{
            .boxes{
            flex-direction: column-reverse;
            padding: 1rem 0;

            .secondbox{
                padding: 0;

                p{
                    text-align: center;

                }
            }
            }
        }

    }

}

`

export const NewBox = () => {
    return (
        <Container>
            <div className="container">
                <div className="contheader">
                    <h5>Get trained to get the job</h5>
                    <p>Learn the tools, skills and resources needed to stand out in global talent market.
                    </p>

                </div>


                <div className="bottombox">
                    <div className="boxes">

                        <div className="firstbox">
                            <img src={moneyman} alt="" />
                        </div>

                        <div className="secondbox">
                            <p>Become one of the most
                                <span className="d-block">sought after in the market</span> </p>
                            <Link to={`/signup?trainee`}><button>Join  expert community</button> </Link>

                        </div>





                    </div>

                </div>

            </div>


        </Container>
    )
}
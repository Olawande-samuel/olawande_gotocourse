import styled from "styled-components"
import moneyman from '../../images/abroad/moneyman.png'

const Container = styled.div`
background: #E1E7FF;
padding: 2rem;
width: 100%;


.container{
    .bottombox{
    display: flex;
    flex-direction: column;
    gap: 2rem; 

    .boxes{
        display: flex;
        background: #FFEDED;
        border-radius: 24px;

        .firstbox, .secondbox{
            flex: 5;

            img{
                max-width:100%;
                max-height: 100%;

            }
        }

        .secondbox{
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


        }

        .firstbox{
            text-align: end;

        }
    }

   
  }





  
}



@media (max-width: 768px) {
    padding: 1rem;

    .container{
        .bottombox{
            .boxes{
            flex-direction: column-reverse;
            }
        }

    }

}

`

export const NewBox = () => {
    return (
        <Container>
            <div className="container">

                <div className="bottombox">
                    <div className="boxes">

                    <div className="firstbox">
                            <img src={moneyman} alt="" />
                        </div>

                        <div className="secondbox">
                            <p>Become one of the most
                                <span className="d-block">sought after in the market</span> </p>

                        </div>

                      



                    </div>

                </div>

            </div>


        </Container>
    )
}
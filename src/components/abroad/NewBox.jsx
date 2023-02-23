import styled from "styled-components"
import moneyman from '../../images/abroad/moneyman.png'

const Container = styled.div`
/* background: #E1E7FF; */
background: linear-gradient(90deg, #FFFFFF 2.32%, rgba(239, 242, 255, 0) 94.98%);

width: 100%;
height: 40vh;
padding: 0 2rem;


.container{

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

            .secondbox{
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
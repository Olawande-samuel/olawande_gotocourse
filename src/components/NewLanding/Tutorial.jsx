import { Link } from "react-router-dom"
import styled from "styled-components"
import medal from '../../images/medal.png'

const Container = styled.div`
padding: 2rem 1rem;
    display: flex;
    align-items: center;


    .courseleft{
        flex: .5;
        height: 60vh;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 62px 0px 0px 62px;
        }
  
    }

    .courseright{
        flex: .5;
        width: 100%;
    min-height: 60vh;
    background: #D1E5FF;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .5rem;
        border-radius: 0 62px 62px 0px;

        /* border: 2px solid red; */

        h5{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 800;
            font-size: 28px;
            color: var(--theme-blue);
        }
        
    
        a {
            color: #fff;

            button {
                border: none;
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

    @media (max-width: 912px){
        .courseleft{
            /* width: 100%;
            height: 300px;
            img{
                width: 100%;
                height: 100%;
                // object-fit: cover;
            } */
        }
    
    }

    @media (max-width:768px){
            flex-direction: column;

            .courseleft{
                width: 100%;
                img{
                    width: 100%;
                    object-fit: cover;
                    border-radius: 62px;

                }
            }

            .courseright{
                border-radius: 62px;
                min-height: 40vh;

            }
        }

`
const Tutorial = () => {
    return (
        <Container className="container">
            <div className="courseleft">
                <img src={medal} alt="" width={600} />

            </div>

            <div className="courseright">
                <h5>
                    <span>Gotocourse is </span>
                    <span className="d-block">intuitive and </span>
                    <span className="d-block">easy to use</span>

                </h5>

                <Link to={`/`}>
                    <button>
                        Learn how it works
                    </button>
                </Link>



            </div>



        </Container>
    )
}

export default Tutorial
import styled from "styled-components";
import hero from '../../images/teach.png'
import { Link } from "react-router-dom";

// background-image: url(${hero});
// background-size: cover;
// background-repeat: no-repeat;
// background-position: center;

const Container = styled.div`
/* height: 60vh; */
width: 100%;
font-family: 'Raleway';
color: var(--theme-blue);
margin-top: 6rem;
background: radial-gradient(50% 50% at 50% 50%, rgba(196, 220, 246, 0.26) 51.56%, rgba(110, 177, 254, 0.37) 100%);

.container{
    display: flex;

    .heroleft{
        /* border: 2px solid red; */
        flex: .6;
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;

       

         h1{
            font-style: normal;
            font-weight: 900;
            font-size: 40px;
            line-height: 44px;
            padding: .3rem 0;
         }


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

    .heroright{
        flex: .4;
        height: 400px;
        text-align: center;
        img{
            max-width: 100%;
            max-height: 100%;
        }

    }


    
  
}

@media (min-width: 820px ) and (max-width: 1024px){
    height: unset;

    .container{
            .heroleft{
                h1{
                font-size: 30px;
                line-height: 30px;
            }
        }
}
}



@media (max-width: 768px) {
        height: unset;
        text-align: center;
        margin-top: unset;

        .container{
            flex-direction: column-reverse;

            .heroleft{

                h1{
                font-size: 40px;
                line-height: 40px;
            }
        }
    }
}

`

const Hero = () => {
    return (
        <Container>
            <div className="container">

                <div className="heroleft">
                    <h1>Gotocourse is everything

                        <span className="d-block">
                            you need to teach what you love!
                        </span>
                    </h1>
                    <p>Before you begin your journey, check if you are<br />
                        eligible to teach on Gotocourse by answering  some questions</p>

                    
                    <Link to={`/qualifications`}><button>Get started</button> </Link>

                </div>

                <div className="heroright">
                    <img src={hero} alt="" />
                </div>


            </div>

        </Container>
    )
}

export default Hero
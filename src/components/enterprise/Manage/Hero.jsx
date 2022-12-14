import { BiRightArrowAlt } from "react-icons/bi"
import { Link } from "react-router-dom"
import styled from "styled-components"
import heroimg from '../../../images/manage/hero.png'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
color: #0C1825;
padding: .5rem 2rem;



.heroleft{
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex:.5;

    h1{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 900;
        font-size: clamp(2.25rem, 2.1429rem + .5357vw, 3rem);
    }
    ul{
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 500;
        font-size: 18px;
        line-height: 27px;
        color: var(--theme-blue);

    }

    .email{
        display: flex;
        align-items: center;
        gap: 2rem;

        a{
            color: var(--theme-blue);
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
    
        }
    }

}

.heroright{
    flex:.5;
    width: 100%;
    height: 500px;
    padding: 2rem 0;

    img{
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

}

@media (max-width: 768px){
    flex-direction: column-reverse;
    text-align: center;

    .heroleft{
    
        .email{
            flex-direction: column;
            gap: unset;

        }
    }

    .heroright{
        
        width: 100%;
        img{
            width: 100%;
            object-fit: cover;
        }
    }
}


@media (max-width: 912px){

    .heroleft{
        .email{
            gap: unset;
            justify-content: space-between;

        }
    }
    .heroright{
        width: 100%;
        height: 400px;
        img{
            width: 100%;
            height: 100%;
            // object-fit: cover;
        }
    }
}


`
const Hero = () => {
    return (
        <Container>

            <div className="heroleft">
                <div>
                    <h1>All-in-one platform</h1>
                    <h1>to manage live classes</h1>

                </div>
                <ul>
                    <li>Create everything tech and business skills training.</li>
                    <li>Build your training space the way you want<br/>for  who you want  everywhere</li>
                </ul>

                <div className="email">
                    <button>Start for free</button>
                </div>

            </div>

            <div className="heroright">
                <img src={heroimg} alt="" 
                width={400} 
                // height={200}
                />

            </div>

        </Container>

    )
}

export default Hero
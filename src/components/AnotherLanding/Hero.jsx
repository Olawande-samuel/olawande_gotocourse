import styled from "styled-components"
import heroimg from '../../images/landing/herright.png'

const Container = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
background: linear-gradient(180deg, #0B8FAC 0%, #071974 100%);
color: #fff;
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
        color: #fff;

    }
    p{
        color: #B5C0D0;
    }

    .email{
        display: flex;
        align-items: center;
        gap: 2rem;

        input{
            width: 58% !important;
            padding: 1rem;
            border: none;
            outline: none;
            border-radius: 7px;
        }
        input::placeholder{
            color: #9F9F9F;
        }

        button{
                background: #fff;
                border:2px solid white;
                border-radius: 7px;
                color: #0C2191;
                padding: .5rem 1rem;
                font-weight: 700;
                font-size: 18px;
                line-height: 27px;
    
        }
    }

}

.heroright{
    flex:.5;
    width: 100%;
    // border: 2px solid yellow;

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
                <h1>to power  live classes.</h1>

                </div>
                <ul>
                    <li>Create everything tech and business skills training.</li>
                    <li>Build your training space the way you want<br/>for  who you want  everywhere</li>
                </ul>

                <div className="email">
                    <input type="email" placeholder="Enter your email address" />
                    <button>Start for free</button>
                </div>

                <p> no credit card required.</p>
            </div>

            <div className="heroright">
                <img src={heroimg} alt="" width={500} />

            </div>

        </Container>

    )
}

export default Hero
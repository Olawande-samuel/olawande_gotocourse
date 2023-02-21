import styled from "styled-components"
import friends from '../../images/abroad/Interview.png'
import nv from '../../images/abroad/moneyman.png'
import homegirl from '../../images/abroad/homegirl.png'

const Container = styled.div`
background: #E1E7FF;
padding: 2rem 4rem;
width: 100%;


.container{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    width: 100%;

    .box{
        /* height: 30px; */
        /* border: 2px solid red;         */
        border-radius: 32px;
        padding: 2rem 1rem;
        position: relative;
        min-height: 350px;
        width: 100%;


        p{
            font-style: italic;
        font-weight: 600;
        font-size: 26px;
        line-height: 30px;
        }

        span{
            font-style: italic;
        font-weight: 300;
        font-size: 18px;
        line-height: 27px;
        }

        .boximg img{
            position: absolute;
            bottom: 5px;
            right:5px;
            width: 200px;
            height: 150px;
            object-fit: contain;
            /* border: 2px solid green; */
        }
    }

    .box:nth-of-type(1){
        background: #FFFFFF;
    }

    .box:nth-of-type(2){
        background: #DEFFF8;
    }

    .box:nth-of-type(3), .box:nth-of-type(4){
        grid-column: 1 / span 3;
        display: flex;
        background: #EDFFFB;
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


        }

        .secondbox{
            text-align: end;

        }
    }

    .box:nth-of-type(4){
        background: #FFF7F7;
    }

}


@media (max-width: 768px) {
    padding: 1rem;

    .container{
        grid-template-columns: 1fr;

        .box{
            display: flex;
            flex-direction: column;

            .boximg img{
            justify-self: end;
            position: unset;
            width: 200px;
            height: 150px;
            object-fit: contain;
            border: 2px solid yellow;
            }
        }

        .box:nth-of-type(3),.box:nth-of-type(4){
            grid-column: unset;
            flex-direction: column-reverse;
        }
   
    }
}

`

export const SecondBox = () => {
    return (
        <Container>
            <div className="container">
                <div className="box">
                    <p>Employment placement assistance</p>
                    <span>We provide all the needed support and connection to getting high paying remote jobs</span>

                    <div className="boximg">
                        <img src={friends} alt="" />

                    </div>

                </div>

                <div className="box">
                    <p>Earn in foreign currencies</p>
                    <span>Learn the tools, skills and resources needed to earn in forerign currencies right from where you are.</span>

                    <div className="boximg">
                        <img src={nv} alt="" />

                    </div>

                </div>
                <div className="box">
                    <div className="firstbox">
                        <p>Learn and work from your home country</p>
                        <span>
                        Learn and acquire skills that allow you work from your home country and anywhere in the world.


                        </span>
                    </div>

                    <div className="secondbox">
                        <img src={homegirl} alt="" />
                    </div>

                </div>

    

            </div>


        </Container>
    )
}
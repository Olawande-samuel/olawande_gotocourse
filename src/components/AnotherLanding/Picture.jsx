
import styled from "styled-components"
import npt from '../../images/landing/npt.svg'
import government from '../../images/landing/government.svg'
import camp from '../../images/landing/camp.svg'
import bag from '../../images/landing/bag.svg'
import hat from '../../images/landing/hat.svg'
import lib from '../../images/landing/lib.svg'
import grid1 from '../../images/landing/grid1.png'
import grid2 from '../../images/landing/grid2.png'
import grid3 from '../../images/landing/grid3.png'
import grid4 from '../../images/landing/grid4.png'
import grid5 from '../../images/landing/grid5.png'
import grid6 from '../../images/landing/grid6.png'

const Container = styled.div`
padding: 2rem;
text-align: center;
width: 100%;

h4{
    padding: 2rem 0 ; 
}

.picture__content{
    display: flex;
    justify-content: space-between;
    gap: 3rem;

    .picture__left{
        // border: 2px solid red;
        flex: .5;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;

        img{
            width: 100%;
            // height: 100%;
        }

        .picture1{
            grid-column: 1/span 2;
            grid-row: 1 /span 1
        
        }

        .picture2{
            grid-column: 3/ span 2;
            grid-row: 1 /span 1

            
        }

        .picture3{
            grid-column: 1/ span 2;
            grid-row: 2 /span 2


        }

        .picture4{
            grid-column: 3/ span 1;
            grid-row: 2 /span 1

        }

        .picture5{
            grid-column: 4;
            grid-row: 2 /span 1

        }

        .picture6{
            grid-column: 3/ span 2;
            grid-row: 3 /span 1

        }
    }

    .picture__right{
        // border: 2px solid yellow;
        flex: .5;
        display: flex;
        gap: 2rem;
        flex-direction: column;


        .picture__item{
            display: flex;
            align-items: center;
            gap: 1rem;
            font-family: 'Roboto';
            font-style: normal;
            font-weight: 600;
            font-size: clamp(1rem , 0.9286rem + 0.3571vw, 1.5rem);
            line-height: 30px;
            color: #000F62;
        }
    }

}

@media (max-width:768px){
    .picture__content{
        flex-direction: column;

    }
}


`

const Picture = () => {
    return (
        <Container>
            <h4>Educators and institutions of all sizes use Gotocourse</h4>


            <div className="picture__content">

                <div className="picture__left">
                    <div className="picture1">
                        <img src={grid1} alt="" />
                    </div>
                    <div className="picture2">
                    <img src={grid2} alt="" />
                    </div>
                    <div className="picture3">
                    <img src={grid3} alt="" />

                    </div>
                    <div className="picture4">
                    <img src={grid4} alt="" />

                    </div>

                    <div className="picture5">
                    <img src={grid5} alt="" />

                    </div>

                    <div className="picture6">
                    <img src={grid6} alt="" />

                    </div>

                  

                </div>

                <div className="picture__right">
                    <div className="picture__item">
                        <img src={hat} alt="" />
                        Independent educators
                    </div>

                    <div className="picture__item">
                        <img src={lib} alt="" />
                        Training insitutions
                    </div>

                    <div className="picture__item">
                        <img src={bag} alt="" />
                        Businesses
                    </div>

                    <div className="picture__item">
                        <img src={npt} alt="" />
                        Non profit orgainzations
                    </div>

                    <div className="picture__item">
                        <img src={camp} alt="" />
                        Bootcamps
                    </div>

                    <div className="picture__item">
                        <img src={government} alt="" />
                        Government
                    </div>

                </div>
            </div>

        </Container>

    )
}

export default Picture
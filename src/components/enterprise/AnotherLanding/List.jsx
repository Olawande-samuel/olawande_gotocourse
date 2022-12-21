
import styled from "styled-components"
import npt from '../../../images/landing/npt.svg'
import government from '../../../images/landing/government.svg'
import camp from '../../../images/landing/camp.svg'
import bag from '../../../images/landing/bag.svg'
import hat from '../../../images/landing/hat.svg'
import lib from '../../../images/landing/lib.svg'


const Container = styled.div`
width: 100%;
padding: 3rem 0;

h5{
    padding: 2rem; 
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    // line-height: 54px;
}

.listcontainer{
    background: #E7F1FF;

    .list__content{
        width: 100%;
        padding:3rem 2rem ;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
       
    
        .list__item{
            // border: 2px solid red;
            padding: 1rem 0;
            color: var( --theme-blue);
            display: flex;
            align-items: center;
            justify-content: center;
    
            span{
                font-size: 1.3rem;
            }
    
            img{
                width: 20px;
                height: 20px;
                margin-right: 1rem;
            }
    
        }
    
    }
}


@media (max-width:768px){
    .listcontainer{
        .list__content{
            grid-template-columns:  1fr;
            padding:2rem;
            text-align: start;

            .list__item{
                span{
                    font-size: 1rem;
                }

            }
        }    

    }
}


`

const List = () => {
    return (
        <Container >
            <div className="container">
                <h5>Educators and institutions of all sizes use Gotocourse</h5>

            </div>

            <div className="listcontainer">

                <div className="list__content container">

                    <div className="list__item">
                        <img src={hat} alt="" />
                        <span>Independent educators</span>
                    </div>

                    <div className="list__item">
                        <img src={lib} alt="" />
                        <span> Training insitutions</span>

                    </div>

                    <div className="list__item">
                        <img src={bag} alt="" />
                        <span>Businesses</span>

                    </div>

                    <div className="list__item">
                        <img src={npt} alt="" />
                        <span>Non profit orgainzations</span>

                    </div>

                    <div className="list__item">
                        <img src={camp} alt="" />
                        <span>Bootcamps</span>

                    </div>

                    <div className="list__item">
                        <img src={government} alt="" />
                        <span>Government</span>

                    </div>

                </div>
            </div>

        </Container>

    )
}

export default List
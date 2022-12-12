
import styled from "styled-components"
import npt from '../../images/landing/npt.svg'
import government from '../../images/landing/government.svg'
import camp from '../../images/landing/camp.svg'
import bag from '../../images/landing/bag.svg'
import hat from '../../images/landing/hat.svg'
import lib from '../../images/landing/lib.svg'


const Container = styled.div`
width: 100%;
padding: 2rem 0;
text-align: center;

h5{
    padding: 2rem; 
    text-align: center;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 26px;
    // line-height: 54px;
}

.list__content{
    width: 100%;
    background: #E7F1FF;
    padding:2rem 4rem ;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .list__item{
        // border: 2px solid red;
        padding: 1rem;
        color: var( --theme-blue);

        img{
            width: 18px;
            height: 18px;
            margin-right: 1rem;
        }

    }

}

@media (max-width:768px){
    .list__content{
        grid-template-columns:  1fr;
        padding:2rem;
        text-align: start;


    }
}


`

const List = () => {
    return (
        <Container>
            <h5>Educators and institutions of all sizes use Gotocourse</h5>


            <div className="list__content">

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

        </Container>

    )
}

export default List
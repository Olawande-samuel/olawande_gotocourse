import Layout from "../../components/Layout";
import { MainContainer } from "./CelebProfile";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import img1 from '../../images/celebs/Rectangle606.png'
import vector from '../../images/celebs/Vector.png'

const Main = styled(MainContainer)`
width: 100vw;

`

const Content = styled.div`
// display: flex;
// flex-wrap: wrap;

display: grid;
grid-template-columns:repeat(3, 1fr);
gap: 1rem;

@media (max-width: 912px){
    grid-template-columns: 1fr;

}

`

const Card = styled.div`
// flex-shrink: 0;
width: 25rem;
height: 30rem;
border: 2px solid red;

.img{
    height: 70%;

    img{
        width: 100%;
        height: 100%
    }

}

.info{
    height: 30%;
    padding: 1rem .5rem;

    p{
        font-weight: 600;
        font-size: 20px;
        line-height: 33px;
        margin-bottom: 0;

    }

    span{
        font-weight: 400;
        line-height: 24px;
        font-size: 12px

    }

    .cost{
        display: flex;
        padding: 1rem 0;
        align-items: center;
        justify-content: space-between;
    }
}


`

export default function TechnicalCelebs() {
    const location = useLocation()
    const bread = location.pathname?.split("/")

    return (
        <>
            <Layout>
                <Main>
                    <div className="container">

                        <div className="breadwrapper">
                            <nav arial-label="breadcrumb">
                                <ol className="breadcrumb">
                                    {
                                        bread?.slice(1).map((item, idx) => (
                                            <li className="breadcrumb-item  text-uppercase" key={idx}>
                                                <Link style={{ color: "#FFF" }} to={`${bread.slice(0, idx + 2).join("/")}`}>{item.split("-").join(" ")}</Link>
                                            </li>
                                        ))
                                    }
                                </ol>
                            </nav>
                        </div>

                         <Content>
                            {[...Array(20)].map((card,id)=> (

                                <Card key={id}>
                                    <div className="img">
                                        <img src={img1} alt="" />
                                    </div>
                                    <div className="info">
                                        <p>Remi Diaro</p>
                                        <span>Productivity and Capacity Management</span>
                                        <div className="cost">
                                            <span>$200</span>
                                            <div className="bolt">
                                                <img src={vector} alt="" width="20" height="20" />
                                                <span>24Hrs</span>

                                            </div>
                                        </div>

                                    </div>
                                </Card>
                            ))
                            }

                        </Content> 
                    </div>
                </Main>
            </Layout> 
        </>
    )
}
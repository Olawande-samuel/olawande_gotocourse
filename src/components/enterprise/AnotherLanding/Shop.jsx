import { AiOutlineCheck } from "react-icons/ai"
import { Link } from "react-router-dom"
import styled from "styled-components"
import live from '../../../images/landing/shop.png'

const Container = styled.div`
    padding: 4rem 1rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    // border: 2px solid red;


    .liveleft{
        flex: .5;
        // border: 2px solid green;

        img{
            width: 100%;
            max-height: 400px;
            // object-fit: cover;
            // border: 2px solid yellow;

        }
  
    }

    .liveright{
        // border: 2px solid blue;
        flex: .5;
        display: flex; 
        flex-direction: column;
        gap: .5rem;

        h4{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 800;
            font-size: 34px;
            padding: 1rem 0;
            // line-height: 36px;
            color: #1B1F29;
        }
        div{
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: .5rem 2rem;
    
            span{
                font-family: 'Raleway';
                font-style: normal;
                font-weight: 400;
                font-size: 16px;
                line-height: 24px;
                color: #2E9AFE;
                flex-shrink: 0;
                background: #EAF5FF;
                border-radius: 30px
                // padding: 30px;
            }

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

    @media (max-width: 912px){
        .liveleft{
            width: 100%;
            height: 300px;
            img{
                width: 100%;
                height: 100%;
                // object-fit: cover;
            }
        }
    }

    @media (max-width:768px){
            flex-direction: column;

            .liveleft{
                width: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .liveright{
                text-align: center;

                .landingtags{
                    justify-content: center;

                }
            }
    }

`
const Shop = () => {
    return (
        <Container className="container">
             <div className="liveleft">
                <img src={live} alt="" 
                // height={400} 
                />

            </div>

            <div className="liveright">
                <h4>
                    <span>One-Stop Shop for All Your </span>
                    <span className="d-block">Training Business Operations</span>
                </h4>
                <div>
                    <p>
                        Everything your business needs to create, manage, <br />
                        market your courses efficiently and attain global reach. <br />

                 <br />

                        Gotocourse have created systems that work for your business. <br />
                        Having everything in one platform so you don't have to do all  <br />
                        of this stuff all over the place. The result? You’re able to save  <br />
                        time , serve your customers better and grow your business with <br />
                        every tool you need
                    </p>

                </div>

                <div className="landingtags">
                    <span>Course creation studio</span>
                    <span>Secure Business communication</span>
                    <span>Payment processing Management</span>
                    <span>School record management system</span>
                    <span>Classroom management</span>
                </div>

                <Link to={`/enterprise-signup`}><button>Join for free</button></Link>

            </div>
           




        </Container>
    )
}

export default Shop
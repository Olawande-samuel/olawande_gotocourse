import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Layout from "../../components/Layout";


const Main = styled.div`
height: 80vh;
width: 100%;
background: #E5E5E5;
font-family: 'Inter';
font-style: normal;


// @media (max-width: 920px){
//     height: 50vh;
  

// }
`

const Content = styled.div`
padding: 4rem;
width: 60%;
margin: 0 auto;
height: 100%;
text-align: center;

h1{
    font-weight: 700;
    font-size: 50px;
    line-height: 120%;
}


    button{
        width: 80%;
        margin-top: 2rem;
        background: #F75C4E;
        border-radius: 10px;
        padding: 1rem 2rem;
        outline: none;
        border: none;
        font-weight: 400;
        font-size: 18px;
        line-height: 150%;



        a{
            display: block;
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;
            text-align: center;
            text-decoration-line: underline;    
            color: #FFFFFF;
        }
    }

    @media (max-width: 920px){
        width: 100%;
        padding: 2rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1{
            font-size: 36px;
        }

        button{
            padding: 1rem;    

            a{
                font-weight: 400;
                font-size: 14px;
                line-height: 150%;  
            }
        }

    }

`

export default function Confirm() {
    return (
        <>
            <Layout>
                <Main>
                <Content className="container">
                        <h1>Your email was used for
                            Free Sign Up</h1>

                        <button>
                       <Link to="/dashbboard">Go to my account</Link> 
                        </button>


                    </Content>

                </Main>
            </Layout>
        </>
    )

}
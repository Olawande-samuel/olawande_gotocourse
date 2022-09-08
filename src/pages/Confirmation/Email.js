import styled from 'styled-components'
import Layout from "../../components/Layout";


const Main = styled.div`
height: 80vh;
width: 100%;
background: #E5E5E5;
font-family: 'Inter';
font-style: normal;
`

const Content = styled.div`
background:#ECEFFF;
padding: 2rem;
width: 80%;
margin: 0 auto;
height: 100%;
text-align: center;

h1{
    font-weight: 700;
    font-size: 54px;
    line-height: 150%;
}

p{
    font-weight: 400;
font-size: 20px;
line-height: 150%;
}

a{
    display: block;
    font-weight: 400;
    font-size: 18px;
    line-height: 150%;
    text-align: center;
    text-decoration-line: underline;    
    color: #000F62;
}

.btn{
    margin-top: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    justify-content: center;


    button{
        
        background: #FAFAFA;
        border: 1px solid #000000;
        border-radius: 10px;
        padding: 1rem 2rem;    
        outline: none;
        border: none;

        a{
            font-weight: 400;
            font-size: 18px;
            line-height: 150%;  
        }
    }
}

@media (max-width: 920px){
    width: 100%;
    // padding: unset;
    margin: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1{
        font-size: 36px;
    }

    p, a{
        font-size: 16px; 
    }
    
    .btn{
        button{
            padding: 1rem;    

            a{
                font-weight: 400;
                font-size: 14px;
                line-height: 150%;  
            }
        }

    }
}

`

export default function Email() {
    return (
        <>
            <Layout>
                <Main >
                    <Content className="container">
                        <h1>Activation Email Sent!</h1>
                        <p>
                            We've sent an email to olamidebalogun56@gmail.com.
                            Click the confirmation link in that email to begin using Gotocourse.
                        </p>
                        <a href="!#">Resend another mail</a>

                        <div className="btn">
                            <button>
                                <a href="!#"> Open Gmail</a>
                               
                            </button>

                            <button>
                                <a href="!#"> Open Gmail</a>
                            </button>
                        </div>
                    </Content>

                </Main>
            </Layout>
        </>
    )

}
import styled from "styled-components"

const Container = styled.section`
   background: linear-gradient(131.29deg, #1000E8 0%, #020063 100%);
   height: 80vh;
   padding: 1rem 0;
   
   
   .container{

    .inputbox{
        width: min(100% - .5rem, 500px);
        margin: 0 auto;
        padding: 2rem 4rem;
        background: #fff;
        border-radius: 10px;

        h2{
            
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            /* line-height: 42px; */
            color: #0C2191;
            text-align: center;
        }

        p{
            margin-top: 2rem;
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            /* line-height: 42px; */
            color: #0C2191;
            text-align: center;   
        }

        input{
            margin-top: 2rem;
            background: #E9F2FF;
            border-radius: 10px;
            padding: .7rem;
            border: 2px solid var(--theme-blue);
            border: none;
            outline: none;

            &::placeholder{
                color: #0C2191;
                font-weight: 400;
                font-size: 14px;
 
            }

        }
        button {
        margin-top: 2rem;
        width: 100%;
        border: none;
        outline: none;
        border-radius: 7px;
        background: var(--theme-blue);
        color: #fff;
        padding: 0.7rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
    }

        
    }
   }

/*    
   @media (width: 912px) {
   height: 50vh;
    
   } */


   @media (max-width: 768px) {
    /* height: 40vh; */

    .container{
        .inputbox{
            width: 100%;
        }
    }
    
   }

`
const Ready = () => {
    return (
        <Container>
            <div className="container">
                <div className="inputbox">
                    <h2>Ready to launch your
                        <span className="d-block">dream career?</span>
                    </h2>

                    <p>Secure a spot today</p>

                <input type="text" name="" id="" placeholder="Enter your email"/>

                <button>Apply now</button>
                </div>

            </div>

        </Container>
    )
}

export default Ready
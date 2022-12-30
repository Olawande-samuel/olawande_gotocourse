import styled from "styled-components"
import demand from '../svg/demand.png'

const Container = styled.div`
background: url(${demand}); 
background-position: center;
background-size: cover;
background-repeat: no-repeat;
color: #000000;
margin-top: 4rem;
padding: 2rem 0;
font-family: 'Raleway';


.container{
    width: 100%;
    display: flex;
    flex-direction: column;
    // align-items: center;
}

h1{
    font-weight: 900;
    font-size: 38px;
    font-family: 'Raleway';

}

@media(max-width: 768px){
    .container{
        text-align: center;
    }
}


`
const Forms = styled.div`
margin-top: 4rem;
width: 80%;


form{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;


    .topform, .bottomform{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        label{
            flex:.4;
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 27px;
            color: #0C2191;
            width: 100%;

            input{
                padding: .5rem;
                border: 1px solid #0C2191;
                border-radius: 10px;
                outline: none;
                width: 100%;

            }
        }
    }

    button {
        align-self: flex-start;
        border: 2px solid white;
        border-radius: 7px;
        background:  #0C2191;
        color: #fff;
        padding: 0.5rem 1rem;
        font-weight: 700;
        font-size: 14px;
        line-height: 27px;
        width: 40%;
        a {
            color: #fff;
        }
    }

}

@media (max-width: 768px){
    width: 100%;

    form{
        .topform, .bottomform{
            flex-direction: column;  
        }
    
        button{
            width: 100%;
    
        }

    }
    

}
`


const Top = () => {
    return (
        <Container>
            <div className="container">
            <h1>
                <span>Learn In demand skills to launch  a new</span>
                <span className="d-block">career in 3 - 6 months</span>
            </h1>
            <p>
            At Gotocourse, building in-demand tech skills  with  confidence and excellent career transition/<br/> advancement are our
            priorities. Our nurturing environment gives every student a lifetime and meaningful  <br/> learning of tech skills that  get them
            ready for work ,Gotocourse  is the right place for you!
            </p>

            <Forms>
                <form>

                    <div className="topform">
                        <label htmlFor="">Which program are you interested in
                            <input type="text" />
                        </label>

                        <label htmlFor="">Your Full  name
                            <input type="text" />
                        </label>

                    </div>

                    <div className="bottomform">
                        <label htmlFor="">Phone number
                            <input type="text" />
                        </label>

                        <label htmlFor="">Email
                            <input type="text" />
                        </label>
                    </div>


                    <button>Submit</button>

                </form>

            </Forms>
            </div>
        </Container>

    )
}

export default Top
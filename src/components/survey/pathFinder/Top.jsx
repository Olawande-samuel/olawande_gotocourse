import styled from "styled-components"
import headstart from '../svg/path.png'

const Container = styled.div`
background: url(${headstart}); 
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
        border: none;
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
        <Container >
            <div className="container">

                <h1>
                    <span>Pathfinder Courses for Teens </span>
                    <span className="d-block">and Adults</span>
                </h1>
                <ul>
                    <li>Sparkup IT skill development through coaching and mentoring from real world experts</li>
                    <li>Achieve your goal in a program that runs through 3 weeks to 6 weeks.</li>
                    <li> We will take you through foundation to advance-level </li>


                </ul>

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
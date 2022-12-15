import styled from "styled-components"

const Container = styled.div`

h1{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 120%;
    color: #0C2191;
    text-align: center;
    margin: 2rem 0;

}

form{
    margin: 0 auto;
    width: 50%; 
    // border: 2px solid red;
    display: flex;
    flex-direction: column;
    gap: 1rem;


        label{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            color: #678391;
            width: 100%;

        }

        input{
            padding: 1rem;
            border: 1px solid #CCD6DA;
            border-radius: 5px;
            outline: none;
            width: 100%;

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
            width: 100%;

    }
}

@media (max-width: 768px){
    form{
        width: 100%;
    }

}
`
const EnterpriseOnboarding = () => {
    return (
        <Container className="container">
            <h1>We will like to know more about you</h1>

            <form action="">

                <label htmlFor="">I primarily identify as
                    <input type="text" name="" id="" />
                </label>
                <label htmlFor="">Are you already taking an online course
                    <input type="text" name="" id="" />
                </label>

                <label htmlFor="">What’s the size of the audience
                    <input type="text" name="" id="" />
                </label>
                <label htmlFor="">What topic is more relevant to you
                    <input type="text" name="" id="" />
                </label>
                <button>Next</button>
            </form>



        </Container>

    )
}

export default EnterpriseOnboarding
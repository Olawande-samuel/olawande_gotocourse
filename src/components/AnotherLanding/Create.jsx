import styled from "styled-components"
import dashboard from '../../images/landing/dashboard.png'

const Container = styled.div`
padding: 2rem;
background: #F0F4FF;

h4{
    padding: 2rem 0;
    text-align: center;
    color: #1B1F29;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;
}


.createcontent{
    display: flex;
    align-items: center;
    gap: 2rem;

    .createleft{
        flex:.5;

    }
    .createright{
        display: flex; 
        flex: .5;
        flex-direction: column;

        h5{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 700;
            font-size: 24px;
            // line-height: 36px;
        }

        p{
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #000000;
        }
    }

}

@media (max-width: 912px){
    .createleft{
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
    .createcontent{
        flex-direction: column;

        .createleft{
            width: 100%;
            img{
                width: 100%;
                object-fit: cover;
            }
    }

    }
}
`
const Create = () => {
    return (
        <Container>
            <h4>Create & sell courses for everyone, anywhere</h4>
            <div className="createcontent">

                <div className="createleft">
                    <img src={dashboard} alt="" width={600} />

                </div>
                <div className="createright">
                    <div>
                        <h5>Leverage on our themes to</h5>
                        <h5> customize your space</h5>
                    </div>
                    <p>Build  and showcase your leaning site with themes designed
                        <br /> for selling education.</p>
                </div>
            </div>
        </Container>
    )
}

export default Create
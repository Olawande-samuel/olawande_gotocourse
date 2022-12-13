import styled from "styled-components"
import dashboard from '../../../images/landing/dashboard.png'

const Container = styled.div`
padding: 2rem;

.createheader{
    padding: 2rem;
}

h4{
    text-align: center;
    color: #1B1F29;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    // line-height: 48px;
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
            <div className="createheader">
                <h4>All-in-one platform</h4>
                <h4>to manage live classes</h4>
            </div>
            <div className="createcontent">

                <div className="createleft">
                    <img src={dashboard} alt="" width={600} />

                </div>
                <div className="createright">
                    <div>
                        <h5>Leverage on our themes to</h5>
                        <h5> customize your space</h5>
                    </div>
                    <p>Want to start from absolute scratch? Customize your space with our customization templates and intuitive design tools, we empower educators in creating an engaging course quickly and easily.</p>
                </div>
            </div>
        </Container>
    )
}

export default Create
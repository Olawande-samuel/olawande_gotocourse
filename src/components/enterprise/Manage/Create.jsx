import styled from "styled-components"
import manage from '../../../images/manage/midmanage.png'

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
                <h4>Gotocourse is everything you need,</h4>
                <h4>no plugins or integrations required.</h4>
                <p>
                    We provide you the tools you need to manage  your training online with ease.
                    Take your business to greater heights by managing your
                    training business with an easy to use live learning platform.
                </p>
            </div>
            <div className="createcontent">

                <div className="createleft">
                    <img src={manage} alt="" width={600} />

                </div>
                <div className="createright">
                    <div>
                        <h5>Track Everything</h5>
                    </div>
                    <p>With incredible and interactive dashboard to track and stay organized you are empowered to track everything. Track earnings, performance , attendance, admissions. </p>
                </div>
            </div>
        </Container>
    )
}

export default Create
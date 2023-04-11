import styled from "styled-components"



const Container = styled.section`
    background: var(--theme-blue);

    .content{
        width: min(100% - .3rem, 800px);
        padding:1rem 2rem;
        margin: 0 auto;
        font-family: 'Josefin Sans', sans-serif;

        .overflowstats {
        width: 100%;
        padding: .6rem;
        /* border: 2px solid red; */
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-family: 'Josefin Sans', sans-serif;


           

        }

        .overflowstats_wrapper {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        height: 100%;
        }

        .overflowstats_wrapper > div {
        flex-basis: 50%;
        }
        .overflowstat {
            text-align: center;
            color: #fff;
           
        }
        .overflowstat h5 {
        font-weight: 700;
        margin-bottom: 0;
        color: #fff;
        font-size: clamp(1.5rem, 1.3rem + 1.8vw, 2rem);
        }
        .overflowstats small {
        font-size: 10px;
        width: 80%;
        margin: auto;
        display: block;
        }


        .overflowbold{
            padding: .5rem 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: .7rem;
            p{
                /* font-family: 'Raleway'; */
                font-weight: 700;
                font-size: 32px;
                line-height: 40px;
                color: #fff;

            }

            h6{
                font-weight: 700;
                font-size: clamp(1.5rem, 1.3rem + 1.8vw, 2rem);
                line-height: 25px;
                color: #fff;
            
            }

            span{
                /* font-family: 'Montserrat'; */
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 24px;
                color: #fff;
            }
        }
    }

    /* @media (width: 1024px) and (width: 1440px){
        height: 150vh; 
        border: 2px solid blue;

    } */

@media (max-width: 768px) {
    height: unset;

    .content{
        position: unset;
        top: unset;
        left: unset;
        /* background: #FFFFFF; */
        border: none;
        width: 100%;
        height: 100%;
        padding: unset;
        transform: translateX(0);

        /* .overflowstats {
            min-height: 100%;
            height: 100%;
        } */

        .overflowstats_wrapper {
            flex-wrap:wrap;
            justify-content:center;
        }
        
        .overflowstats_wrapper > div {
            flex-basis: 33%;
            margin-bottom: 1rem;
        }

        .overflowstat h5 {
            /* font-weight: 700; */
            font-size: 1rem;
            margin-bottom: 0;
        }
        .overflowstat small {
            font-size: 10px;
            /* width: 80%;
            margin: auto;
            display: block; */
            
        }
    }


}


`
const Stat = () => {
    return (
        <Container>
            <div className="content">
                <section className="overflowstats">
                    <div className="overflowstats_wrapper h-100">
                        {statData.map((item, index) => (
                            <div className="overflowstat" key={index + item.title}>
                                {item.sup && <small>{item.sup}</small>}
                                <h5>{item.title}</h5>
                                <small>{item.content}</small>
                            </div>
                        ))}
                    </div>
                </section>

               
            </div>

        </Container>
    )
}

export default Stat

const statData = [
    {
        title: "20k+",
        content: "Teachers",
    },
    {
        title: "773M",
        content: "Enrollments",
    },
    {
        // sup: "More than",
        title: "180+",
        content: "Countries",
    },
    {
        // sup: "More than",
        title: "13,400+",
        content: "Enterprise customers",
    },

];

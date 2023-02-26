import styled from "styled-components"

const Container = styled.section`
    min-height: 70vh;
    /* border: 2px solid red; */
    position: relative;

    .content{
        position: absolute;
        top: -100px;
        /* left: 10%; */
        background: #FFFFFF;
        border: 1px solid #9FA9FF;
        border-radius: 15px;
        width: min(100% - .3rem, 800px);
        /* height: 100%; */
        padding: 2rem;
        margin-inline: auto;
        left: 50%;
        transform: translateX(-50%);
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
            color: var(--theme-blue);
            &:nth-child(odd){
                margin-top: 10px;
            }
        }
        .overflowstat h5 {
        font-weight: 700;
        margin-bottom: 0;
        color: #000;
        font-size: 32px;
        }
        .overflowstats small {
        font-size: 10px;
        width: 80%;
        margin: auto;
        display: block;
        }


        .overflowbold{
            padding: 2rem 0;
            text-align: center;
            display: flex;
            flex-direction: column;
            gap: 2rem;
            p{
                /* font-family: 'Raleway'; */
                font-weight: 700;
                font-size: 32px;
                line-height: 40px;
                color: #131313;

            }

            span{
                /* font-family: 'Montserrat'; */
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 24px;
                color: #131313;
            }
        }
    }

@media (max-width: 768px) {

    .content{
        position: unset;
        top: unset;
        left: unset;
        background: #FFFFFF;
        border: none;
        width: 100%;
        height: 100%;
        padding: unset;

        .overflowstats {
            min-height: 100%;
            height: 100%;
        }

        .overflowstats_wrapper {
            flex-wrap:wrap;
            justify-content:flex-start;
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
const Overflow = () => {
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

                    <div className="overflowbold">
                        <p>
                        Join live classes on our proprietary <br/> learning platform, followed by career <br/> coaching and interview prep
                        </p>

                        <span>
                        To be the No 1 global platform where millions of learners connect <br/>
                         with top tech educators and bootcamps in order to help upskill, <br/>
                         boost productivity and reduce the cost of learning.

                        </span>
                    </div>
            </div>

        </Container>
    )
}

export default Overflow


const statData = [
    {
        title: "20k+",
        content: "Registered Students",
    },
    {
        title: "98%",
        content: "Completion & Retention rate",
    },
    {
        // sup: "More than",
        title: "89%",
        content: "Tranined students already have jobs",
    },

];

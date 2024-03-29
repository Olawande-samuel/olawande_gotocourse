import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components"
import { AdvancedError } from "../../classes";
import { useAuth } from "../../contexts/Auth";

const Container = styled.section`
   background: linear-gradient(131.29deg, #1000E8 0%, #020063 100%);
   padding: .5rem 0 3rem 0;
   /* border: 2px solid red; */
   
   
   .container{

    .inputbox{
        width: min(100% - .5rem, 500px);
        margin: 0 auto;
        padding: 2rem 4rem;
        background: #fff;
        border-radius: 10px;
        /* border: 2px solid yellow; */

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


const OverflowContainer = styled.section`
    height: 65vh; 
    position: relative;
    /* border: 2px solid green; */
    padding: 0.5rem 0;

    .content{
        position: absolute;
        top: -30px;
        background: #FFFFFF;
        border: 1px solid #9FA9FF;
        border-radius: 15px;
        width: min(100% - .3rem, 800px);
        padding:1rem 2rem;
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
                color: #131313;

            }

            h6{
                font-weight: 700;
                font-size: 16px;
                line-height: 25px;
                color: var(--theme-blue);
            
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
        background: #FFFFFF;
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
export const NewReady = () => {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        email: ""
    })
    const { studentFunctions: { addMarket, } } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {

            const res= await addMarket(formData)
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            if (statusCode === 1) {
                toast.success(message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(false)
                setFormData({
                    fullName: "",
                    email: ""
                })

            }
        } catch (error) {
            setLoading(false)
            console.log({ error });
            toast.error(error, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

    }
    return (
        <section>
            
            <Container>
                <div className="container">
                    <div className="inputbox">
                        <h2>Ready to learn skills needed to maximize 
                        your digital learning platform?
                        </h2>

                        <p>Secure a spot today</p>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="fullName" value={formData.fullName} placeholder="Enter you full name" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                            <input type="text" name="email" value={formData.email} placeholder="Enter your email" onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />

                            {
                                loading ?
                                    (
                                        <button className="button button-md log_btn w-100"
                                            disabled={loading}>
                                            <div className="spinner-border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                        </button>
                                    )
                                    :
                                    <button>Apply now</button>
                            }

                        </form>

                    </div>

                </div>


            </Container>
            <Overflow />

        </section>
    )
}



export const Overflow = () => {
    return (
        <OverflowContainer>
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
                    Join short courses on our proprietary <br/>
learning platform, followed by hand-<br/>
holding and advisory sessions                    </p>

                    <h6>OUR GOAL</h6>

                    <span>
                    To be a leader in helping creators and educators on their journey of learning and development, using technology to provide access to quality education and improve learning outcomes.

                    </span>
                </div>
            </div>

        </OverflowContainer>
    )
}




const statData = [
    {
        title: "20k+",
        content: "Registered Users",
    },
    {
        title: "98%",
        content: "Completion & Retention rate",
    },
    {
        // sup: "More than",
        title: "89%",
        content: "Alumni have active online academy",
    },

];

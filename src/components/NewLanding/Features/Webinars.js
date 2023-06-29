import { Link, useNavigate } from 'react-router-dom'
import styles from './webinars.module.scss'
import { useState } from 'react';
import { useAuth } from '../../../contexts/Auth';
import { useQuery } from '@tanstack/react-query';

const Webinars = () => {
    const [webinars, setWebinars] = useState([])

    const { generalState: { isMobile, loading }, setGeneralState, generalState, studentFunctions: { getWebinar, getAWebinar } } = useAuth();
    let navigate = useNavigate()

    const webinarData = useQuery(["fetch webinar"], () => getWebinar(), {
        onSuccess: (res) => {
            if (res.data.length > 0) {
                console.log("webinar data", res.data);
                setWebinars(res.data)

            }
        }
    })
    return (
        <section className={styles.courses}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Upcoming webinars/ workshops</h2>

                </div>

                <div className={styles.content}>
                    {webinars.length > 0 && webinars.slice(0,3)?.map((item, i) => (
                    <div className={styles.item} key={i}>

                        <div className={styles.image}>
                            <img
                                src={`${process.env.REACT_APP_IMAGEURL}${item.webinarImg}`} 
                                alt={item.title}
                                width={300}
                                height={150}

                            />
                        </div>

                        <div className={styles.text}>
                            <p>{item.title}</p>

                            <div className={styles.type}>
                            <span>{new Intl.DateTimeFormat('en-US').format(new Date(item.date))} | {item.time} {item.time?.split(":")[0] >= 12 ? "" : "am"}</span>
                            <span>{item.type}</span>

                            </div>
                        </div>

                        <div className={styles.button}>
                            <Link to={`/`}>
                                <button>Apply Now</button>

                            </Link>
                        </div>
                    </div>

                    ))}

                </div>
            </div>

        </section>
    )
}

export default Webinars


const data = [
    {
        img: "/academy/dummy/webinar1.png",
        imgText: "first course",
        title: "Winning growth and marketing strategies for virtual educators.",
        type:"Live Virtual ",
        date:"17 July, 2023"


    },
    {
        img: "/academy/dummy/webinar2.png",
        imgText: "second course",
        title: "5 pillars of content development (How to seemlessly digitize your content)",
        type:"Live Virtual ",
        date:"26th July, 2023"
    },
    {
        img: "/academy/dummy/webinar3.png",
        imgText: "third course",
        title: "Disrupting the virtual education space",
        type:"Live Virtual ",
        date:"7th September, 2023"
    },
    
]
import { Link, useNavigate } from 'react-router-dom'
import styles from './course.module.scss'
import { useAuth } from '../../../contexts/Auth';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { gotoclass } from '../../../constants';

const Features = () => {
    const { otherFunctions: { fetchBootcamps }, } = useAuth();
  const [shorts, setShorts] = useState([])
  const navigate = useNavigate()

  const classes = useQuery(["fetch classes"], () => fetchBootcamps(), {
    notifyOnChangeProps: ["category", "isFetching"],

    onSuccess: (res) => {
      if (res?.data?.length > 0) {
        // const first = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-01-19T00:00:00.000Z" && item.isActive) : [];
        // const second = res.data?.length > 0 ? res.data?.filter(item => item.startDate.includes("2023-01") && !item.startDate.includes("2023-01-19T00:00:00.000Z") && item.isActive).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
        let ids = [
         "63f74cdc78429071a01a00bf",
         "63717978f0eaad8dcf392eeb"
        ]
        
        const first = res.data?.length > 0 ? res.data?.filter(item => item.bootcampId === "636de01bbc7cb9bcc9c9b119" && item.isActive) : [];
        const second = res.data?.length > 0 ? res.data?.filter(item => item.bootcampId === "63f68ab678429071a0195c6d" && item.isActive) : [];
        const third = res.data?.length > 0 ? res.data?.filter(item => item.bootcampId === "63717aa2f0eaad8dcf3930a7" && item.isActive) : [];
        const fourth = res.data?.length > 0 ? res.data?.filter(item => item.bootcampId === "6430661e1485c80cb3261471" && item.isActive) : [];

        const fifth = res.data?.length > 0 ? res.data?.filter(item => !ids.includes(item.bootcampId) && item.startDate?.includes("2023-03") && item.isActive  &&  item.category !== "TRAIN2 WORKABROAD").sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];

        // const second = res.data?.length > 0 ? res.data?.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive) : [];
        // const third = res.data?.length > 0 ? res.data?.filter(item => item.startDate !== "2023-01-05T00:00:00.000Z" && item.startDate !== "2023-01-19T00:00:00.000Z" && item.isActive).sort((a, b) => new Date(a.startDate) - new Date(b.startDate)) : [];
        const all = [...first, ...second, ...third, ...fourth, ...fifth];

        // const uppers = res.data.filter(item => item.startDate === "2023-01-05T00:00:00.000Z" && item.isActive);
        // console.log({ uppers });
        setShorts(all)
      }
    }
  })
    return (
        <section className={styles.courses}>
            <div className="container">
                <div className={styles.header}>
                    <h2>Feature courses</h2>

                </div>

                <div className={styles.content}>
                    { shorts?.filter(item => item.isActive).sort(() => 0.5 - Math.random())?.slice(0, 6)?.map((item, i) => (
                    <div className={styles.item} key={i}>

                        <div className={styles.image}>
                            <img
                                src={item.bootcampImg}
                                alt={item.title}
                                width={300}
                                height={150}

                            />
                        </div>

                        <div className={styles.text}>
                            <p>{item.title}</p>
                            <ul>
                                <li>100% virtual</li>
                                <li>Very practical</li>
                                <li>Highly interactive</li>
                            </ul>
                        </div>

                        <div className={styles.button}>
                           
                                <button onClick={() => gotoclass(item.title, item.category, item.bootcampId, navigate)}>Apply Now</button>

                        </div>
                    </div>

                    ))}

                </div>
            </div>

        </section>
    )
}

export default Features


const data = [
    {
        img: "/academy/dummy/course1.png",
        imgText: "first course",
        title: "Turning your passion into profit",

    },
    {
        img: "/academy/dummy/course2.png",
        imgText: "second course",
        title: "How to incporate AI tools into course creation",

    },
    {
        img: "/academy/dummy/course3.png",
        imgText: "third course",
        title: "A-Z of Facebook Ads",

    },
    {
        img: "/academy/dummy/course4.png",
        imgText: "fourth course",
        title: "Cybersecurity for virtual academy creators",

    },
    {
        img: "/academy/dummy/course5.png",
        imgText: "fifth course",
        title: "How to leverage on data for business decision making",

    },
    {
        img: "/academy/dummy/course6.png",
        imgText: "sixth course",
        title: "How to create virtual school in few steps",

    }
]
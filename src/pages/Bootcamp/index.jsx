import {useEffect, useState} from "react";


import Layout from "../../components/Layout";
import clsx from "./styles.module.css";
import {useLocalStorage} from "../../hooks"
import { getDate } from "../../constants";
import { useNavigate } from "react-router-dom";
import BootcampImage from  "../../images/bootcamp.png"


const Bootcamp = () => {
    const {getItem} = useLocalStorage();
    const [bootcampInfo, setBootcampInfo] = useState({})
    const bootcamp = getItem("gotocourse-bootcampdata")
    const navigate = useNavigate()
    useEffect(() => {
        console.log("Bootcamp is mounted");
        if(bootcamp){
            setBootcampInfo(bootcamp)
        }
        return () => console.log("Bootcamp is unmounted");
    }, [])

    const details = [
        {
            key: 'Duration',
            value: '10 weeks'
        },
        {
            key: 'Days',
            value: 'Jun 26 - Sept 04'
        },
        {
            key: 'Time',
            value: '09:00 - 14:00'
        },
    ]

    return (
        <Layout>
            <div className={clsx.bootcamp}>
                <div className={clsx.bootcamp_content}>
                    <h2>{bootcampInfo?.title}</h2>
                    <p>{bootcampInfo?.description ? bootcampInfo?.description : bootcampInfo?.content}</p>
                    <div className={clsx.bootcamp_details}>
                        {/* {
                            details.map(({key, value}, i) => (
                                <div key={i}>
                                    <p>{key}</p>
                                    <span>{value}</span>
                                </div>
                            ))
                        } */}

                        <div>
                            <p>Duration</p>
                            <span>{bootcampInfo?.duration ? bootcampInfo?.duration: "10 weeks" }</span>
                        </div>
                        <div>
                            <p>Date</p>
                            <span>{`${bootcampInfo?.startDate ? getDate(bootcampInfo?.startDate) : "Jun 26"} - ${bootcampInfo?.endDate ? getDate(bootcampInfo?.endDate) : "Sept 04"}`}</span>
                        </div>
                        {/* <div>
                            <p>Time</p>
                            <span>{`${bootcampInfo?.startTime ? bootcampInfo?.startTime : "09:00"} - ${bootcampInfo?.endTime ? bootcampInfo?.endTime : "14:00"}`}</span>
                        </div> */}
                    </div>
                    {bootcampInfo?.instructorName ? 
                    <button type="button" onClick={()=> navigate("payment")}>Apply Now</button>
                    : null
                    }
                </div>


                <div className={clsx.bootcamp_image}>
                    <div className={clsx.image_container} style={{backgroundImage:`url(${bootcampInfo?.image ? bootcampInfo?.image: bootcampInfo?.bootcampImg})`}}></div>
                </div>
            </div>
        </Layout>
    )
}



export default Bootcamp;
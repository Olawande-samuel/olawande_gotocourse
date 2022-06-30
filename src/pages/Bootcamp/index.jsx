import {useEffect, useState} from "react";


import Layout from "../../components/Layout";
import clsx from "./styles.module.css";




const Bootcamp = () => {
    useEffect(() => {
        console.log("Bootcamp is mounted");
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
                    <h2>Cyber Security Bootcamp</h2>
                    <p>Learn cybersecurity in 24 weeks of online classes to qualify for jobs paying $78,800 or more. You will pay nothing till you get hired and train through saleforce programming projects. Prerequisites : there are no requirements for education or work experience . We will first teach you the admin and app builder basics and then progress to salesforce programming.</p>
                    <div className={clsx.bootcamp_details}>
                        {
                            details.map(({key, value}, i) => (
                                <div key={i}>
                                    <p>{key}</p>
                                    <span>{value}</span>
                                </div>
                            ))
                        }
                    </div>

                    <button>Apply Now</button>
                </div>


                <div className={clsx.bootcamp_image}>
                    <div className={clsx.image_container}></div>
                </div>
            </div>
        </Layout>
    )
}



export default Bootcamp;
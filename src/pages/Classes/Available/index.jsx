import React, { useState } from "react";



import clsx from "./styles.module.css";
import { Reviews } from "../../Teacher/components";
import Layout from "../../../components/Layout";
import { useEffectOnMount } from "../../../hooks";
// import topGirl from "../../../images/Girlwithhallow.png";
import { useAuth } from "../../../contexts/Auth";
import { Bootcamp, StudentViews } from "./components";
import { AdvancedError } from "../../../classes";
import img from "../../../images/bola.png";
import boySitting from "../../../images/boy_sitting.png";
import { Link } from "react-router-dom";
import PaginatedClasses from "./Paginated";
import teacher from "../../../images/Girlwithhallow.png"

const reviews = [
    {
        review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
        avatar: img,
        name: "Ope",
        location: "Lagos, Nigeria"
    },
    {
        review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
        avatar: img,
        name: "James",
        location: "Houston, Texas"
    },
    {
        review: "I had a wonderful experience and can confidently say that GotoCourse is the place to be as a teacher . I highly recommend them",
        avatar: img,
        name: "Ike",
        location: "Abuja, Nigeria"
    },
]

const tabs = ["All Classes",
    //  "Data Science", "Project Management", "Cybersecurity & Assurance", "Digital Marketing"
]
// const bootcamps = [
//     {
//         image: bootcamp,
//         title: "Coding Bootcamp",
//         content: "Learn Coding in 10 weeks of online classes and be sure to set yourself up for high-paying jobs in your chosen career path on completion of your training.",
//         duration: "10 weeks",
//         startDate: "Sep 25",
//         endDate: "Dec 04",
//         price: 800
//     },
//     {
//         image: bootcamp,
//         title: "Coding Bootcamp",
//         content: "Learn Coding in 10 weeks of online classes and be sure to set yourself up for high-paying jobs in your chosen career path on completion of your training.",
//         duration: "10 weeks",
//         startDate: "Sep 25",
//         endDate: "Dec 04",
//         price: 800
//     },
//     {
//         image: bootcamp,
//         title: "Coding Bootcamp",
//         content: "Learn Coding in 10 weeks of online classes and be sure to set yourself up for high-paying jobs in your chosen career path on completion of your training.",
//         duration: "10 weeks",
//         startDate: "Sep 25",
//         endDate: "Dec 04",
//         price: 800
//     },
// ]


const Available = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [bootcamps, setBootcamps] = useState([]);
    const { otherFunctions: { fetchBootcamps } } = useAuth();
    useEffectOnMount(() => {
        console.log('Available classes showing');
        (async () => {
            try {
                const res = await fetchBootcamps();
                const { success, message, statusCode } = res;
                if (!success) throw new AdvancedError(message, statusCode);
                else {
                    const { data } = res;
                    setBootcamps(_ => data.filter(d => d.isActive));

                }
                console.log(res);
            } catch (err) {
                console.error(err)
            }
        })()
        return () => console.log('Removing available classes');
    }, [])


    function switchTab(e, i) {
        setActiveTab(_ => i);
    }


    return (
        <Layout>
            <div className={clsx.available_classes}>
                {/* <div className={clsx.classes_top}>
                    <div className="container">
                        <div className={clsx.classes_hero}>

                            <div className={clsx.classes_top_left}>
                                <h2>The Best time to get trained is now</h2>
                                <p>
                                    Choose from our available classes with new additions published regularly
                                </p>
                            </div>
                            <div className={clsx.top_right_layout}>
        
                            </div>
                        </div>
                    </div>
                </div> */}


                <div className={clsx.jumbotron}>
                    <div className={`container ${clsx.jumbotron__cover}`}>
                        <div className={clsx.jumbotron__absolute}>
                            <h1>The Best time to get trained is now</h1>
                            <p>
                                Choose from our available classes with new additions published regularly
                            </p>
                        </div>
                        <div className={clsx.jumb_container}>
                            <img src={teacher} alt="" />
                        </div>

                    </div>
                </div>



                <div className={clsx.classes_body}>
                    <div className="container">
                        <div className={clsx.tabs}>
                            {
                                tabs.map((el, i) => (
                                    <span key={i} onClick={e => switchTab(e, i)} className={activeTab === i ? clsx.active_tab : clsx.tab}>
                                        {el}
                                    </span>
                                ))
                            }
                        </div>
                        <PaginatedClasses list={bootcamps} />
                        {/* <div className={clsx.students}>
                            <h3>Students are viewing</h3>
                            <div className={clsx.student_views}>
                                {
                                    bootcamps.reverse().map(({duration, bootcampImg, endDate, startDate, title, price}, i) => (
                                        <StudentViews key={i} duration={duration} price={price} image={bootcampImg} endDate={endDate} startDate={startDate} title={title} />
                                    ))
                                }
                            </div>
                        </div> */}
                        {/* <Reviews reviews={reviews} bgColor="#fff" /> */}
                        <div className={clsx.classes_start}>
                            <div className="container">
                                <div className={clsx.start_left}>
                                    <img src={boySitting} alt="Boy Sitting" />
                                </div>
                                <div className={clsx.start_right}>
                                    <h3>Start and accelerate your tech career through a great learning experience</h3>
                                    <Link to="/signup">
                                        <button>Register Now</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}



export function ClassLists({ bootcamps }) {
    return (
        <div className={clsx.bootcamps}>
            {
                bootcamps?.map((item, i) => (
                    <Bootcamp key={i} {...item} all={item} />
                ))
            }
        </div>
    )
}
export default Available;
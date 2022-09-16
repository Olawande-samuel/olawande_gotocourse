import React, {useState} from "react";
import {ToastContainer, toast} from "react-toastify";



import clsx from "./styles.module.css";
import { Reviews } from "../../Teacher/components";
import Layout from "../../../components/Layout";
import { useEffectOnMount } from "../../../hooks";
import topGirl from "../../../images/classes_top_girl.png";
import { useAuth } from "../../../contexts/Auth";
import { Bootcamp, StudentViews } from "./components";
import { AdvancedError } from "../../../classes";
import img from "../../../images/bola.png";
import boySitting from "../../../images/boy_sitting.png";
import { Link } from "react-router-dom";


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
    const {otherFunctions: {fetchBootcamps}} = useAuth();
    const [activeTab, setActiveTab] = useState(0);
    const [loading, setLoading] = useState(true);
    const [bootcamps, setBootcamps] = useState([]);
    useEffectOnMount(() => {
        console.log('Available classes showing');
        (async() => {
            try{
                const res = await fetchBootcamps();
                const {success, message, statusCode} = res;
                if(!success) throw new AdvancedError(message, statusCode);
                else {
                    const {data} = res;
                    setBootcamps(_ => data.filter(d => d.isActive));
                    toast.success(message, {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                console.log(res);
            }catch(err){
                toast.success(err.message, {
                    position: "top-right",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        })()
        return () => console.log('Removing available classes');
    }, [])


    function switchTab(e, i){
        setActiveTab(_ => i);
    }


    return (
        <Layout>
            <ToastContainer />
            <div className={clsx.available_classes}>
                <div className={clsx.classes_top}>
                    <div className={clsx.classes_top_left}>
                        <h2>Enroll in any of our 
                            Intensive Bootcamp to
                            get hands-on experience
                            with expert-led training,
                            and advance or launch a 
                            new career in tech you would
                            be proud of.
                        </h2>
                        <p>
                        Chart your path to a great career in tech
                        </p>
                    </div>
                    <div className={clsx.classes_top_right}>
                        <div className={clsx.top_right_layout}>
                            <img className={clsx.top_right_girl} src={topGirl} alt="Top Girl" />
                        </div>
                    </div>
                </div>

                <div className={clsx.classes_body}>
                    <h2>We’ve got all you need in our comprehensive course catalog</h2>
                    <p>Choose from our available classes with new additions published regularly</p>
                    <div className={clsx.tabs}>
                        {
                            tabs.map((el, i) => (
                                <span key={i} onClick={e => switchTab(e, i)} className={activeTab === i ? clsx.active_tab : clsx.tab}>
                                    {el}
                                </span>
                            ))
                        }
                    </div>
                    <div className={clsx.bootcamps}>
                        {
                            bootcamps.map((item, i) => (
                                <Bootcamp key={i} {...item} all={item} />
                            ))
                        }
                    </div>
                    <div className={clsx.students}>
                        <h3>Students are viewing</h3>
                        <div className={clsx.student_views}>
                            {
                                bootcamps.reverse().map(({duration, bootcampImg, endDate, startDate, title, price}, i) => (
                                    <StudentViews key={i} duration={duration} price={price} image={bootcampImg} endDate={endDate} startDate={startDate} title={title} />
                                ))
                            }
                        </div>
                    </div>
                    <Reviews reviews={reviews} bgColor="#fff" />
                    <div className={clsx.classes_start}>
                        <img src={boySitting} alt="Boy Sitting" />
                        <div className={clsx.start_right}>
                            <h3>Start and accelerate your tech career through a great learning experience</h3>
                            <Link to="/signup">
                                <button>Register Now</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}




export default Available;
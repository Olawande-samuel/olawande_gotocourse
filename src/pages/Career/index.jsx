import {useEffect} from "react";


import clsx from "./styles.module.css";
import Layout from "../../components/Layout";
import img from "../../images/careerBg.webp"
import career01 from "../../images/career01.png";
import career02 from "../../images/career02.png";
import { Link } from "react-router-dom";




const Career = () => {
    useEffect(() => {
        console.log("Career page is mounted");
        return () => console.log("Removing the Career page");
    }, [])

    ///styles
    const imgStyle = {
        position: "relative",
        top:0,
        left: 0,
        width: "100%",
        height: "min(70vh, 600px)",
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }

    const dot = {
        width: 15,
        height: 15,
        display: "inline-block",
        borderRadius: "50%",
        backgroundColor: "var(--grey)",
        marginRight: 20
    }


    ///data
    const openings = ["Social Media Manager", "Virtual Assistant", "Product Marketer"];
    const cultures = [
        "The work culture should be filled here.",
        "The core values of the organisation should be here.",
        "Benefits of working with Gotocourse"
    ]


    return (
        <Layout>
            <div className={clsx.career_container}>
                <div className={clsx.career_first} style={imgStyle}>
                    <div className={clsx.imgBg}>
                        <h1>Grow with us</h1>
                        <p>Would you love to join our team?</p>
                    </div>
                </div>
                <div className={clsx.career_main}>
                    <div className={clsx.career_openings}>
                        <h2>Job Openings</h2>
                        <p>We have various openings for a professional like you</p>
                        <ul>
                            {
                                openings.map((o, i) => (
                                    <li key={i}><div style={dot}></div> {o}</li>
                                ))
                            }
                        </ul>
                        <button className="mt-2 button-md button text-white">Apply now</button>
                    </div>
                    <div className={clsx.career_commitment}>
                        <div className={clsx.commitment_left}>
                            <img src={career01} alt="Career 01" />
                        </div>
                        <div className={clsx.commitment_right}>
                            <h2>Our Commitment</h2>
                            <p>Gotocourse is committed to empowering individuals with high in-demand skills necessary for this tech-savvy Era. Our team consists of problem-solving, passionate, and tech-savvy individuals who deliver quality educational experiences for our students to move the whole organization's vision forward.
                            If you think you are the one we are looking for, we would love to meet you.</p>
                        </div>
                    </div>
                    <div className={clsx.career_culture}>
                        <div className={clsx.culture_left}>
                            <h2>Our Culture and Benefit</h2>
                            <ul>
                                {
                                    cultures.map((c, i) => (
                                        <li key={i}><div style={dot}></div> {c}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className={clsx.culture_right}>
                            <img src={career02} alt="Career 02" />
                        </div>
                    </div>
                    <div className={clsx.career_teaching}>
                        <h2>Become a Teacher</h2>
                        <p>
                            <span><div style={dot}></div> Sharing Knowledge</span> <br />
                            We have a top-notch teaching platform where you can share knowledge seamlessly with your students.
                        </p>
                        <p>
                            <div style={dot}></div> Teaching Opportunities <br />
                            You can choose to teach with us, either Part-time of Full-time.
                        </p>

                            <button className="mt-2 button-md button text-white">
                            <Link to="/become-a-teacher" className="text-white">
                                Apply Now
                            </Link>
                            </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}



export default Career;
import React from "react";
import { Link, useNavigate } from "react-router-dom";



import clsx from "./styles.module.css";
import { getDate } from "../../../constants";



export const Bootcamp = ({description, duration, bootcampImg, endDate, startDate, title, price, all}) => {
    const navigate =useNavigate();

    function navigateToDetails(){
        localStorage.setItem("gotocourse-bootcampdata", JSON.stringify(all))
        navigate("/classes/class")
    }

    return(
        <div className={clsx.bootcamp}
        //  onClick={navigateToDetails}
         >
            <div className={clsx.bootcamp_container}>
                <div className={clsx.image_wrapper}>
                    <img src={bootcampImg} alt={title} />
                </div>
                <div className={clsx.bootcamp_container_meta}>
                    <div className={clsx.bootcamp_top}>
                        <div>
                            <h5>{title}</h5>
                            <p>{description}</p>
                        </div>
                        <div className={clsx.bootcamp_price}>
                            <h5>{new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(price).split(".")[0]}</h5>
                        </div>
                    </div>
                    <div className={clsx.bootcamp_bottom}>
                        <span className={clsx.meta_left}>
                            <h6>Duration</h6>
                            <p>{duration}</p>
                        </span>
                        <span className={clsx.meta_right}>
                            <h6>Date</h6>
                            <p>{getDate(startDate)} - {getDate(endDate)}</p>
                        </span>
                        <div className={`ms-auto ${clsx.boot_button}`}>
                            <button className="button p-2 ">Learn More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export const StudentViews = ({image, title, duration, startDate, endDate, price}) => (
    <div className={clsx.student_view}>
        <img src={image} alt={title} />
        <h4>{title}</h4>
        <p>{new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(price).split(".")[0]}</p>
        <div className={clsx.student_view_footer}>
            <span className={clsx.footer_left}>
                <h4>Duration</h4>
                <p>{duration}</p>
            </span>
            <span className={clsx.footer_right}>
                <h4>Date</h4>
                <p>{getDate(startDate)} - {getDate(endDate)}</p>
            </span>
        </div>
    </div>
)
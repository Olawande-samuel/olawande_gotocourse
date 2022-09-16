import React from "react";
import { Link } from "react-router-dom";



import clsx from "./styles.module.css";
import { getDate } from "../../../constants";


export const Bootcamp = ({image, title, content, duration, startDate, endDate, price}) => (
    <div className={clsx.bootcamp}>
        <div className={clsx.bootcamp_left}>
            <img src={image} alt={title} />
            <div className={clsx.bootcamp_left_meta}>
                <h3>{title}</h3>
                <p>{content}</p>
                <div className={clsx.left_meta}>
                    <span className={clsx.meta_left}>
                        <h4>Duration</h4>
                        <p>{duration}</p>
                    </span>
                    <span className={clsx.meta_right}>
                        <h4>Date</h4>
                        <p>{getDate(startDate)} - {getDate(endDate)}</p>
                    </span>
                </div>
            </div>
        </div>
        <div className={clsx.bootcamp_right}>
            <h2>{new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(price).split(".")[0]}</h2>
        </div>
    </div>
)



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
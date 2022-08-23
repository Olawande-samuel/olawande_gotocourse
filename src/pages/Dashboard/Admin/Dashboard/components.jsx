import { Icon } from "@mui/material";
import React, { useEffect } from "react";



import clsx from "./styles.module.css";



export const HeaderCard = ({icon, title, value, color}) => {
    return (
        <div className={clsx.dashboard_card}>
            <div className={clsx.card_left}>
                <span style={{backgroundColor: color}}>
                   {icon}
                </span>
            </div>
            <div className={clsx.card_right}>
                <p>{title}</p>
                <h4>{value}</h4>
            </div>
        </div>
    )
}



export const ChartCard = ({header, chart}) => (
    <div className={clsx.chart_card}>
        <h3>{header}</h3>
        <div className={clsx.chart}>
            {chart}
        </div>
    </div>
)


export const Rundown = ({type, color, value}) => (
    <div className={clsx.rundown}>
        <div className={clsx.rundown_top}>
            <span style={{border: `2px solid ${color}`, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
             width: 8.5, height: 9, 
             borderRadius: "50%", marginRight: 10,backgroundColor: "white"}}></span>{type}
        </div>
        <p>
            {value}
        </p>
    </div>
)


export const Community = ({image, name, message, time, conversations}) => (
    <div className={clsx.community}>
        <div className={clsx.community_left}>
            <div className={clsx.community_image}>
                <img src={image} alt="Display Picture" />
            </div>
            <div className={clsx.community_info}>
                <h4>{name}</h4>
                <p>{message}</p>
            </div>
        </div>

        <div className={clsx.community_right}>
            <span>{time}</span>
            <p className={clsx.community_message__info}>
            <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 8.63091C0 3.86417 3.86421 0 8.63091 0H15.3691C20.1358 0 24 3.86417 24 8.63091C24 13.3977 20.1358 17.2619 15.3691 17.2619H10.2857V21.4286C10.2857 21.4286 0 19.3452 0 8.63091Z" fill="#333333"/>
</svg>
<h5>({conversations})</h5>
            </p>
        </div>
    </div>
)
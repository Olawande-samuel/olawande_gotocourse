import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";



import clsx from "./styles.module.css";
import {Admin} from "../";
import MyChart from "../../../../components/Chart";
import { ChartCard } from "../Dashboard/components";


const cardData = [
    {
        icon: <svg width="63" height="47" viewBox="0 0 63 47" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.1188 23.5C23.1188 25.6413 23.9713 27.6948 25.4889 29.2089C27.0065 30.723 29.0648 31.5736 31.211 31.5736C33.3572 31.5736 35.4154 30.723 36.933 29.2089C38.4506 27.6948 39.3032 25.6413 39.3032 23.5C39.3032 21.3587 38.4506 19.3052 36.933 17.7911C35.4154 16.277 33.3572 15.4264 31.211 15.4264C29.0648 15.4264 27.0065 16.277 25.4889 17.7911C23.9713 19.3052 23.1188 21.3587 23.1188 23.5ZM62.5827 21.6402C55.7333 7.24463 45.3796 0 31.5 0C17.6132 0 7.2667 7.24463 0.417221 21.6474C0.142485 22.2278 0 22.8617 0 23.5036C0 24.1455 0.142485 24.7794 0.417221 25.3598C7.2667 39.7554 17.6204 47 31.5 47C45.3868 47 55.7333 39.7554 62.5827 25.3526C63.1391 24.1848 63.1391 22.8296 62.5827 21.6402ZM31.211 36.1871C24.1881 36.1871 18.4946 30.5067 18.4946 23.5C18.4946 16.4933 24.1881 10.8129 31.211 10.8129C38.2339 10.8129 43.9273 16.4933 43.9273 23.5C43.9273 30.5067 38.2339 36.1871 31.211 36.1871Z" fill="#F75C4E"/>
        </svg>,
        title: "Visits",
        value: 850,
        color: "#FFF5F5",
        info: null        
    },
    {
        icon: <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 12.4998V7.49984C7.50003 6.05203 7.91912 4.63518 8.70666 3.42031C9.49421 2.20544 10.6165 1.24449 11.9382 0.653438C13.2599 0.0623893 14.7244 -0.133485 16.1549 0.089458C17.5854 0.312401 18.9209 0.944632 20 1.90983C21.0791 0.944632 22.4146 0.312401 23.8451 0.089458C25.2756 -0.133485 26.7401 0.0623893 28.0618 0.653438C29.3835 1.24449 30.5058 2.20544 31.2933 3.42031C32.0809 4.63518 32.5 6.05203 32.5 7.49984V12.4998H36.25C37.2446 12.4998 38.1984 12.8949 38.9016 13.5982C39.6049 14.3014 40 15.2553 40 16.2498V39.9998C40.0007 41.6684 39.5835 43.3106 38.7866 44.7766C37.9896 46.2426 36.8382 47.4856 35.4375 48.3923L34.075 48.1523C32.1375 47.8123 30.14 46.7448 28.6375 45.2223C27.1375 43.6998 26.25 41.8573 26.25 39.9998V12.4998H28.75V7.49984C28.7501 6.72792 28.5119 5.97479 28.0681 5.34324C27.6242 4.7117 26.9963 4.23251 26.27 3.97108C25.5437 3.70966 24.7544 3.67874 24.0099 3.88254C23.2654 4.08635 22.6019 4.51495 22.11 5.10984C22.3625 5.85984 22.5 6.66484 22.5 7.49984V39.9998C22.5 43.0723 23.955 45.8148 25.9675 47.8548C26.779 48.6747 27.6854 49.3948 28.6675 49.9998H10C7.34784 49.9998 4.8043 48.9463 2.92893 47.0709C1.05357 45.1955 0 42.652 0 39.9998V16.2498C0 15.2553 0.395088 14.3014 1.09835 13.5982C1.80161 12.8949 2.75544 12.4998 3.75 12.4998H7.5ZM11.25 7.49984V12.4998H18.75V7.49984C18.75 6.50527 18.3549 5.55145 17.6517 4.84818C16.9484 4.14492 15.9946 3.74984 15 3.74984C14.0054 3.74984 13.0516 4.14492 12.3483 4.84818C11.6451 5.55145 11.25 6.50527 11.25 7.49984Z" fill="#304D74"/>
        </svg>,        
        title: "Sales",
        value: 35,
        color: "#EEF9FF",
        info: "See all"       
    },
    {
        icon: <svg width="49" height="49" viewBox="0 0 49 49" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48.125 42.875V6.125C48.125 4.73261 47.5719 3.39726 46.5873 2.41269C45.6027 1.42812 44.2674 0.875 42.875 0.875H6.125C4.73261 0.875 3.39726 1.42812 2.41269 2.41269C1.42812 3.39726 0.875 4.73261 0.875 6.125V42.875C0.875 44.2674 1.42812 45.6027 2.41269 46.5873C3.39726 47.5719 4.73261 48.125 6.125 48.125H42.875C44.2674 48.125 45.6027 47.5719 46.5873 46.5873C47.5719 45.6027 48.125 44.2674 48.125 42.875ZM16.625 40.25H11.375V24.5H16.625V40.25ZM27.125 40.25H21.875V11.375H27.125V40.25ZM37.625 40.25H32.375V19.25H37.625V40.25Z" fill="#F75C4E"/>
        </svg>,
        title: "Income",
        value: new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(3000).split(".")[0],
        color: "#EDFFF1",
        info: "See all"        
    },
    {
        icon: <svg width="63" height="44" viewBox="0 0 63 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.85552 2.20589C5.67385 0.607946 9.49513 1.18128e-07 13.3144 1.18128e-07C25.4388 -0.000982025 37.5622 6.12268 49.6865 6.12268C52.7272 6.12268 55.7659 5.73768 58.8066 4.77518C59.1482 4.66714 59.4908 4.61607 59.8254 4.61607C61.5195 4.61607 63 5.92429 63 7.74027V38.8997C63 40.1402 62.2883 41.3158 61.1455 41.7931C57.3271 43.3921 53.5059 44 49.6865 44C37.5622 44 25.4378 37.8763 13.3135 37.8763C10.2728 37.8763 7.23406 38.2613 4.19337 39.2238C3.8518 39.3319 3.50924 39.3829 3.17456 39.3829C1.48048 39.3829 0 38.0747 0 36.2587V5.10027C0.000984192 3.85884 0.712681 2.6842 1.85552 2.20589ZM58.2751 9.84304C56.2945 10.338 54.2274 10.5865 52.1012 10.7201C52.68 13.6066 55.2236 15.7821 58.2751 15.7821V9.84304ZM58.2751 37.8341V33.1414C54.8918 33.1414 52.1543 35.8197 52.0037 39.1718C54.2215 38.994 56.2945 38.5521 58.2751 37.8341ZM31.5005 31.4286C35.8504 31.4286 39.3754 27.2063 39.3754 22C39.3754 16.7927 35.8494 12.5714 31.5005 12.5714C27.1516 12.5714 23.6256 16.7927 23.6256 22C23.6256 27.2083 27.1526 31.4286 31.5005 31.4286ZM4.72591 34.157C6.45051 33.7258 8.24106 33.4842 10.073 33.328C9.49513 30.7666 7.36596 28.822 4.72591 28.488V34.157ZM4.72591 10.9676C7.7666 10.5836 10.1261 8.05062 10.2196 4.9225C8.29618 5.13563 6.4702 5.53437 4.72591 6.16589V10.9676Z" fill="#304D74"/>
        </svg>,
        title: "Profit",
        value: new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(1500).split(".")[0],
        color: "#EDFFF1",
        info: null    
    },
    {
        icon: <svg width="56" height="45" viewBox="0 0 56 45" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M27.7308 0.0210795C27.2394 0.0912431 26.7874 0.328066 26.4514 0.69148L12.2489 15.0141H2.15385C0.861538 15.0141 0 15.8708 0 17.1559V21.4396C0 22.7247 0.861538 23.5815 2.15385 23.5815H2.35631L8.21046 43.5285C8.42585 44.3853 9.28738 45 10.3643 45H45.9028C46.7643 45 47.6259 44.3831 48.0566 43.5264L53.8462 23.5815C55.1385 23.5815 56 22.7247 56 21.4396V17.1559C56 15.8708 55.1385 15.0141 53.8462 15.0141H43.9514L29.5508 0.62294C29.3148 0.389623 29.0276 0.213857 28.7119 0.109432C28.3961 0.0050082 28.0603 -0.0252336 27.7308 0.0210795ZM28 5.24292L37.8948 15.0141H18.3077L28 5.24078V5.24292ZM37.828 20.9705C38.2588 20.9705 38.6465 21.1183 38.9695 21.4396L40.5203 22.9132C41.1665 23.5558 41.1665 24.6781 40.5203 25.3207L27.5972 38.1718C26.9511 38.8143 25.8203 38.8143 25.172 38.1718L17.9049 30.8766C17.2588 30.2341 17.2588 29.1781 17.9049 28.5356L19.3846 26.9934C20.0308 26.3509 21.0948 26.3509 21.7409 26.9934L26.5203 31.7484L36.6154 21.4396C36.9422 21.1313 37.3776 20.9628 37.828 20.9705Z" fill="#F75C4E"/>
        </svg>,
        title: "Paid Commission",
        value: new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(7000).split(".")[0],
        color: "#FFF5F5",
        info: "Payment history"        
    },
    {
        icon: <svg width="53" height="41" viewBox="0 0 53 41" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.53585 0.892578C6.36913 0.892578 4.29115 1.75331 2.75904 3.28541C1.22694 4.81752 0.366211 6.8955 0.366211 9.06222V10.6961H52.6432V9.06222C52.6432 6.8955 51.7825 4.81752 50.2504 3.28541C48.7183 1.75331 46.6403 0.892578 44.4736 0.892578H8.53803H8.53585ZM0.366211 31.9372V13.964H52.6432V31.9372C52.6432 34.1039 51.7825 36.1819 50.2504 37.714C48.7183 39.2461 46.6403 40.1069 44.4736 40.1069H8.53803C6.37131 40.1069 4.29333 39.2461 2.76122 37.714C1.22912 36.1819 0.36839 34.1039 0.36839 31.9372H0.366211ZM35.7593 25.9461C35.3259 25.9461 34.9103 26.1183 34.6039 26.4247C34.2975 26.7311 34.1254 27.1467 34.1254 27.5801C34.1254 28.0134 34.2975 28.429 34.6039 28.7354C34.9103 29.0419 35.3259 29.214 35.7593 29.214H43.3843C43.8176 29.214 44.2332 29.0419 44.5396 28.7354C44.8461 28.429 45.0182 28.0134 45.0182 27.5801C45.0182 27.1467 44.8461 26.7311 44.5396 26.4247C44.2332 26.1183 43.8176 25.9461 43.3843 25.9461H35.7593Z" fill="#304D74"/>
        </svg>,
        title: "Unpaid Commission",
        value: new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'}).format(8500).split(".")[0],
        color: "#EEF9FF",      
    },
]




const Affiliate = () => {
    
    const [select, setSelect] = useState("30 days")

    function changeHandler(e){
        setSelect(_ => e.target.value);
    }

    return (
        <Admin header="Affiliate">
            <div className={clsx.affiliate}>
                <div className={clsx.affiliate_container}>
                    <select className={clsx.affiliate_select} value={select} onChange={changeHandler}>
                        <option value="30 days">Last 30 days</option>
                        <option value="60 days">Last 60 days</option>
                        <option value="90 days">Last 90 days</option>
                    </select>

                    <div className={clsx.affiliate_cards}>
                        {
                            cardData.map(({icon, title, value, color, info}, i) =>(
                                <AffiliateCard icon={icon} key={i} title={title} value={value} color={color} info={info} />
                            ))
                        }
                    </div>
                    <div className={clsx.affiliate_chart}>
                        <ChartCard className={clsx.chart_card} chart={<MyChart />} header="Referral traffic"  />
                    </div>
                </div>
            </div>
        </Admin>
    )
}

function AffiliateCard({icon, title, value, color, info}){
    return (
        <div className={clsx.affiliate_card} style={{backgroundColor: color}}>
            <div className={clsx.affiliate_card__content}>
                {icon}
                <h4>{value}</h4>
                <p>{title}</p>
            </div>
            {info && (<div className={clsx.affiliate_card__absolute}>
                <Link to="#">{info +" >"}</Link>
            </div>)}
        </div>
    )
}


export default Affiliate;
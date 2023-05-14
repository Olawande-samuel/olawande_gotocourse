import React, {useEffect, useRef} from "react";
import {BiPlayCircle} from "react-icons/bi"


import clsx from "./styles.module.css";
import { Teachers } from "../";
import poster from "../../../../images/help_poster.png";



const Help = () => {
    const videoRef = useRef();


    function showPlayHandler(e){
        let target = e.currentTarget;
        target.querySelector(".video_play").style.display = "flex";
    }


    function hidePlayHandler(e){
        let target = e.currentTarget;
        target.querySelector(".video_play").style.display = "none";
    }

    return (
        <Teachers header="Help">
            <div className={clsx.help}>
                <div className={clsx.help_container}>
                    <div className={clsx.help_videos}>
                        {
                            (new Array(4)).fill(null).map((e, i) => (
                                <div className={clsx.video_container} onMouseOut={hidePlayHandler} onMouseOver={showPlayHandler} key={i}>
                                    <div ref={videoRef} className={`${clsx.video_play} video_play`}>
                                        <BiPlayCircle />
                                    </div>
                                    <video width="400" height="350" poster={poster}>
                                        <source src="#" type="video/mp4" />
                                    </video>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </Teachers>
    )
}



export default Help;
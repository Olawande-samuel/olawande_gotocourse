import {motion} from "framer-motion";

import clsx from "./styles.module.css";



export function Jumbotron(){
    return (
        <div className={clsx.jumbotron}>
            <div className={clsx.jumbotron__absolute}>
                <h1>There Is No Successful Student Without A <br/>Teacher</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea ac neque amet, sagittis, laoreet augue consequat vestibulum egestas nunc sed quisque in sit ridiculus.</p>
                <motion.button
                 transition={{
                     ease: 'easeInOut',
                     duration: 0.5
                 }}
                 whileHover={{
                    scale: 1.1,
                    textShadow: "0px 0px 8px rgb(255, 255, 255)"
                }}>Become a teacher</motion.button>
            </div>
        </div>
    )
}
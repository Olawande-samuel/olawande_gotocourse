import {motion} from "framer-motion";
import {Link } from "react-router-dom"

import clsx from "./styles.module.css";



export function Jumbotron(){
    return (
        <div className={clsx.jumbotron}>
            <div className={`container ${clsx.jumbotron__cover}`}>
            <div className={clsx.jumbotron__absolute}>
                <h1>There Is No Successful Student Without A Teacher</h1>
                <p>Absolutely, no one can succeed in their practical lives without teachers. Students also need someone who can show simplify terms in real life. Not only as a coach, but start as a mentor to guide students along their academic lives.</p>
                <div className="w-100" style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Link to="/teacher/signup">

                <motion.button
                 transition={{
                     ease: 'easeInOut',
                     duration: 0.5
                    }}
                 whileHover={{
                    scale: 1.1,
                    textShadow: "0px 0px 8px rgb(255, 255, 255)"
                }}  >Become a teacher</motion.button>
                </Link>

                </div>
            </div>
            </div>
        </div>
    )
}
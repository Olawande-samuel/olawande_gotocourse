import { Link } from 'react-router-dom'
import styles from './hero.module.scss'




const Hero = ({ img, imgtext, color,link, width, height, span, title, list, firstbtn, secondbtn, text }) => {

    return (
        <header className={styles.herocontainer}>
            <div className="container">
                <div className={styles.herocontent}>
                    <div className={styles.heroright}>

                        <h1 style={{color:color}}>{title}</h1>
                        {
                            list &&
                            <ul>
                                {
                                    list?.map((item, i) => (
                                        <li key={i}>{item}</li>

                                    ))
                                }
                            </ul>
                        }
                        {
                            span &&
                        <span>{span}</span>
                        }
                        <div className={styles.buttons}>
                            {
                                firstbtn &&
                                <Link to={ link ? link :`/login`} target='_blank' >
                                    <button className={styles.firstbtn}> {firstbtn}</button>
                                </Link>    
                            }
                            {
                                secondbtn && 
                                <Link to={`https://www.gotocourse.com/calender`}>
                                    <button className={styles.secondbtn}> {secondbtn}</button>
                                </Link>
                            }
                        </div>
                        <div className={styles.text}>
                            <span>{text}</span>

                        </div>


                    </div>

                    <div className={styles.heroleft}>
                        <img
                            src={img}
                            alt={imgtext}
                            width={width ?? 600}
                            height={height ?? 400}

                        />
                    </div>




                </div>


            </div>

        </header>
    )
}

export default Hero
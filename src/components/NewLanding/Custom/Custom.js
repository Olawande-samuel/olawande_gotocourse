import { Link } from 'react-router-dom';
import styles from './custom.module.scss'

const Custom = ({ img, imgText, title, text, button, background, imgheight, imgWidth }) => {
    return (
        <section className={styles.customise} style={{background: background}}>
            <div className="container">
                <div className={styles.content}>
                <div className={styles.right}>
                        <h5>{title}</h5>
                        <div className={styles.text}>
                            <p>{text}</p>

                            {button &&
                                <div className={styles.button}>

                                    <Link to={`/login`} >
                                        <button>{button}</button>
                                    </Link>

                                </div>

                            }



                        </div>
                    </div>
                    <div className={styles.left}>
                        <div className={styles.image}>
                            <img
                                src={img}
                                alt={imgText}
                                width={imgWidth?? "500"}
                                height={imgheight ?? "500"}

                            />

                        </div>

                    </div>

                   

                </div>




            </div>

        </section>
    )
};

export default Custom;

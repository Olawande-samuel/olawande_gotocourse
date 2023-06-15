import styles from './experts.module.scss'
import badge from '../../../images/landing/badge.svg'
import learn_experts from '../../../images/landing/learn_experts.webp'
const Experts = () => {
    return (
        <section className={styles.experts}>
            <div className="container">
                <div className={styles.expertscontent}>

                    <div className={styles.expertsright}>
                        <div className={styles.header}>
                        <h2>
                            Learn from industry Experts
                        </h2>
                        <span>Get started in three simple steps.</span>

                        </div>
                        <div className={styles.expertsside}>
                            <div className={styles.description}>
                                <img
                                    src={badge}
                                    alt="badge icon"
                                    width={20}
                                    height={20}
                                />

                                <p>
                                    <span>Enroll for a course </span><br />
                                    Once you find the course you are interested in, enroll by filling your name and other required details


                                </p>

                            </div>

                            <div className={styles.description}>

                                <img
                                    src={badge}
                                    alt="badge icon"
                                    width={20}
                                    height={20}
                                />

                                <p>
                                    <span> Get admitted</span>
                                   <br />
                                    Participants will be admitted into the chosen school once their information is verified.
                                </p>
                            </div>

                            <div className={styles.description}>

                                <img
                                    src={badge}
                                    alt="badge icon"
                                    width={20}
                                    height={20}
                                />


                                <p>
                                    <span>Start learning</span>
                                    <br />

                                    Participants can access learning materials and take quizzes as soon as they admitted.                                </p>
                            </div>

                         


                        </div>


                    </div>
                    <div className={styles.expertsleft}>
                        <div className={styles.image}>
                            <img
                                src={learn_experts}
                                alt="a girl sitting on a chair,learning"
                                width="500"
                                height="600"
                            />

                        </div>


                    </div>
                </div>



            </div>

        </section>
    )
}

export default Experts
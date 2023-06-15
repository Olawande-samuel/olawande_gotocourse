import styles from './review.module.scss'
import star from "../../../images/a/star.png";
import review1 from "../../../images/landing/review1.png";
import review2 from "../../../images/landing/review2.png";
import review3 from "../../../images/landing/review3.png";



const Review = () => {
    return (
        <section className={styles.review}>
            <div className="container">

                <div className={styles.header}>
                    <img 
                    src={star} 
                    alt={star}
                    width={250} 
                    height={50} />
                    <h4>Testimonials </h4>

                </div>

                <div className={styles.content}>
                    {
                        data.map((item, i) => (
                            <div className={styles.item} key={i}>
                                <div className={styles.top}>
                                    <div className={styles.image}>
                                        <img 
                                        src={item.img} 
                                        alt={item.imgText} 
                                        width={50} 
                                        height={50} />
                                    </div>
                                    <div className={styles.info}>
                                        <p>{item.name}</p>
                                        <span>{item.date}</span>

                                    </div>

                                </div>


                                <div className={styles.text}>
                                    <p>{item.title}</p>
                                </div>



                            </div>
                        ))
                    }








                </div>
            </div>



        </section>
    )
}

export default Review

const data = [
    {
        img: review1,
        imgText: "first review",
        title: `“Gotocourse is incredibly
         user-friendly and the
          content is top-notch.
           The instructors are experts in their field and they are passionate about teaching.”`,
        name: "John Snath ",
        date: "The Cross Bible School"


    },
    {
        img: review2,
        imgText: "first review",
        title: `“The courses are engaging and informative, and the instructors are knowledgeable and helpful.”`,
        name: "Thomas Adeniran",
        date: "Drapes Consulting"


    },
    {
        img: review3,
        imgText: "first review",
        title: `“Gotocourse resources are affordable, flexible, and high-quality. I've already learned so much which has helped grow my school”`,
        name: "Robert Pepper ",
        date: "Tem’s Business School"


    },

]
import Layout from "../../components/Layout"
import style from "./style.module.css"
import blob from "../../images/how-it-works/blob.png"
import mentors from "../../images/how-it-works/mentors.png"
import affiliate from "../../images/how-it-works/affiliate.png"


import studentRegister from '../../images/videos/students/student_registration.mp4'
import studentSignIn from '../../images/videos/students/sign_in_student.mp4'
import studentEnroll from '../../images/videos/students/enroll_in_class.mp4'
import studentWishlist from '../../images/videos/students/add_items_to_wishlist.mp4'
import studentProfile from '../../images/videos/students/how_to_edit_profile.mp4'
import studentNotification from '../../images/videos/students/student_notification.mp4'
import studentPayment from '../../images/videos/students/student_history_and_payment.mp4'
import studentLogout from '../../images/videos/students/student_logout_final.mp4'



export function HIW() {
    const data = {
        title: "Complete guide to Gotocourse navigation as a mentor",
        button: false,
        img: mentors
    }
    const videos = [
        {
            name: "register",
            link: studentRegister
        },
        {
            name: "login",
            link: studentSignIn
        },
        {
            name: "enroll",
            link: studentEnroll
        },
        {
            name: "wishlist",
            link: studentWishlist
        },
        {
            name: "Edit profile",
            link: studentProfile
        },
        {
            name: "notification",
            link: studentNotification
        },
        {
            name: "payment",
            link: studentPayment
        },
        {
            name: "logout",
            link: studentLogout
        },
    ]
    return (
        <Layout>
            <Hero {...data} />
            <Instructional videos={videos} />
        </Layout>
    )
}


export function HIWAffiliate() {
    const data = {
        title: "Complete guide to Gotocourse navigation as an affiliate",
        button: false,
        img: affiliate
    }

    const videos = [
        {
            name: "register",
            link: studentRegister
        },
        {
            name: "login",
            link: studentSignIn
        },
        {
            name: "enroll",
            link: studentEnroll
        },
        {
            name: "wishlist",
            link: studentWishlist
        },
        {
            name: "Edit profile",
            link: studentProfile
        },
        {
            name: "notification",
            link: studentNotification
        },
        {
            name: "payment",
            link: studentPayment
        },
        {
            name: "logout",
            link: studentLogout
        },
    ]
    return (
        <Layout>
            <div className={style.others}>
                <Hero {...data} />
                <Instructional videos={videos} />
            </div>
        </Layout>
    )
}


export function Hero({ title, img }) {
    console.log({title});

    return (
        <div className={style.hero}>
            <div className="container">
                <div className={style.textImage}>
                    <div className={style.text_section}>
                        <h2 className={style.text_section_header}>{title}</h2>
                    </div>
                    <div className={style.image_section}>
                        <BlobImage img={img} />
                    </div>
                </div>
            </div>
        </div>
    )
}


export function BlobImage({ img }) {
    return (
        <div>
            <div className={style.blob_images}>
                <img src={blob} alt="" className={style.blob_first_image} />
                <img src={img} alt="" className={style.blob_second_image} />
            </div>
        </div>
    )
}

export function Instructional({ videos }) {

    return (
        <div className={style.instructional_wrapper}>
            <div className="container">
                <h2 className={style.instructional_header}>Instructional Videos</h2>

                <div className={style.instructional_grid}>
                    {
                        videos.map((item, id) => (
                            <InstructionalCard item={item} key={id} />
                        ))
                    }
                </div>

            </div>
        </div>
    )
}

export function InstructionalCard({ item }) {
    console.log({ item });
    return (
        // <Suspense fallback={<Loader />}>

            <div className={style.instructional_images}>
                <div className={style.instructional_titles}>
                    <p className={style.instructional_type}>Videos</p>
                    <p>{item.name}</p>
                </div>
                <video src={item.link} controls type="video/mp4" />
            </div>
        // </Suspense>

    )
}

// export default HIW
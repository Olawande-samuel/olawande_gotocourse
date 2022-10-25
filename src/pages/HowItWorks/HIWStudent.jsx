import student from "../../images/how-it-works/student.png"
import studentRegister from '../../images/videos/students/student_registration.mp4'
import studentSignIn from '../../images/videos/students/sign_in_student.mp4'
import studentEnroll from '../../images/videos/students/enroll_in_class.mp4'
import studentWishlist from '../../images/videos/students/add_items_to_wishlist.mp4'
import studentProfile from '../../images/videos/students/how_to_edit_profile.mp4'
import studentNotification from '../../images/videos/students/student_notification.mp4'
import studentPayment from '../../images/videos/students/student_history_and_payment.mp4'
import studentLogout from '../../images/videos/students/student_logout_final.mp4'
import Layout from "../../components/Layout"
import { Hero, Instructional } from "."
import style from "./style.module.css"


export default function HIWStudent() {
    const data = {
        title: "Complete guide to Gotocourse navigation as a student",
        button: false,
        img: student
    }

    const videos = [
        {
            name: "How to register as a student",
            link: studentRegister
        },
        {
            name: "How to sign in to your dashboard as a student",
            link: studentSignIn
        },
        {
            name: "How to enroll for a class as a student",
            link: studentEnroll
        },
        {
            name: "How to add item to your wishlist as a student",
            link: studentWishlist
        },
        {
            name: "How to edit your profile as a student",
            link: studentProfile
        },
        {
            name: "How to check your notifications as a student",
            link: studentNotification
        },
        {
            name: "How to check history and payment status",
            link: studentPayment
        },
        {
            name: "How to logout from student's dashboard",
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
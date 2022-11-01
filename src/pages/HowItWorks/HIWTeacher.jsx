
import teacherRegister from '../../images/videos/teachers/teacher_registration_final.mp4'
import teacherSignIn from '../../images/videos/teachers/teacher_sign_in_final.mp4'
import teacherPassword from '../../images/videos/teachers/password_change_-_teacher.mp4'
import teacherResetPassword from '../../images/videos/teachers/teacher_how_to_reset_password.mp4'
import teacherProfile from '../../images/videos/teachers/teacher_how_to_edit_profile.mp4'
import teacherNotification from '../../images/videos/teachers/teacher_notification_final_.mp4'
import teacherLogout from '../../images/videos/teachers/teacher_logout_final.mp4'
import Layout from "../../components/Layout"
import { Hero, Instructional } from "."
import style from "./style.module.css"
import teacher from "../../images/how-it-works/teacher.png"

export default function HIWTeacher() {
    const data = {
        title: "Complete guide to Gotocourse navigation as a teacher",
        button: false,
        img: teacher
    }

    const videos = [
        {
            name: "How to register as a teacher",
            link: teacherRegister
        },
        {
            name: "How to sign in to your dashboard as a teacher",
            link: teacherSignIn
        },
        {
            name: "How to change your password as a teacher",
            link: teacherPassword
        },
        {
            name: "How to reset your password as a teacher",
            link: teacherResetPassword
        },
        {
            name: "How to edit your profile as a teacher",
            link: teacherProfile
        },
        {
            name: "How to check your notifications as a teacher",
            link: teacherNotification
        },
        {
            name: "How to logout from teacher's dashboard",
            link: teacherLogout
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
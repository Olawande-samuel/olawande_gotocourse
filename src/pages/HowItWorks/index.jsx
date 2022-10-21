import Layout from "../../components/Layout"
import style from "./style.module.css"
import blob from "../../images/how-it-works/blob.png"
import mentors from "../../images/how-it-works/mentors.png"
import affiliate from "../../images/how-it-works/affiliate.png"
import student from "../../images/how-it-works/student.png"
import teacher from "../../images/how-it-works/teacher.png"
import vidcard from "../../images/how-it-works/videocard.png"
import studentRegister from '../../images/videos/students/student_registration.mp4'
import studentSignIn from '../../images/videos/students/sign_in_student.mp4'
import studentEnroll from '../../images/videos/students/enroll_in_class.mp4'
import studentWishlist from '../../images/videos/students/add_items_to_wishlist.mp4'
import studentProfile from '../../images/videos/students/how_to_edit_profile.mp4'
import studentNotification from '../../images/videos/students/student_notification.mp4'
import studentPayment from '../../images/videos/students/student_history_and_payment.mp4'
import studentLogout from '../../images/videos/students/student_logout_final.mp4'
import teacherRegister from '../../images/videos/teachers/teacher_registration_final.mp4'
import teacherSignIn from '../../images/videos/teachers/teacher_sign_in_final.mp4'
import teacherPassword from '../../images/videos/teachers/password_change_-_teacher.mp4'
import teacherResetPassword from '../../images/videos/teachers/teacher_how_to_reset_password.mp4'
import teacherProfile from '../../images/videos/teachers/teacher_how_to_edit_profile.mp4'
import teacherNotification from '../../images/videos/teachers/teacher_notification_final_.mp4'
import teacherLogout from '../../images/videos/teachers/teacher_logout_final.mp4'


const HIW = ()=> {
    const data = {
        title:"Complete guide to Gotocourse navigation as a mentor",
        button: false,
        img: mentors
    }
    const videos=[
        {
            name:"register",
            link:studentRegister
        },
        {
            name:"login",
            link:studentSignIn
        },
        {
            name:"enroll",
            link:studentEnroll
        },
        {
            name:"wishlist",
            link:studentWishlist
        },
        {
            name:"Edit profile",
            link:studentProfile
        },
        {
            name:"notification",
            link:studentNotification
        },
        {
            name:"payment",
            link:studentPayment
        }, 
        {
            name:"logout",
            link:studentLogout
        },
    ]
    return  (
        <Layout>
            <Hero {...data} />
            <Instructional videos={videos}/>
        </Layout>
    )
}
export function HIWStudent(){
    const data = {
        title:"Complete guide to Gotocourse navigation as a student",
        button: false,
        img: student
    }

    const videos=[
        {
            name:"How to register as a student",
            link:studentRegister
        },
        {
            name:"How to sign in to your dashboard as a student",
            link:studentSignIn
        },
        {
            name:"How to enroll for a class as a student",
            link:studentEnroll
        },
        {
            name:"How to add item to your wishlist as a student",
            link:studentWishlist
        },
        {
            name:"How to edit your profile as a student",
            link:studentProfile
        },
        {
            name:"How to check your notifications as a student",
            link:studentNotification
        },
        {
            name:"How to check history and payment status",
            link:studentPayment
        }, 
        {
            name:"How to logout from student's dashboard",
            link:studentLogout
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
export function HIWTeacher(){
    const data = {
        title:"Complete guide to Gotocourse navigation as a teacher",
        button: false,
        img: teacher
    }
   
    const videos=[
        {
            name:"How to register as a teacher",
            link:teacherRegister
        },
        {
            name:"How to sign in to your dashboard as a teacher",
            link:teacherSignIn 
        },
        {
            name:"How to change your password as a teacher",
            link:teacherPassword
        },
        {
            name:"How to reset your password as a teacher",
            link:teacherResetPassword
        },
        {
            name:"How to edit your profile as a teacher",
            link:teacherProfile
        },
        {
            name:"How to check your notifications as a teacher",
            link:teacherNotification
        },
        {
            name:"How to logout from teacher's dashboard",
            link:teacherLogout
        },
    ]
 
    return (
        <Layout>
            <div className={style.others}>
                <Hero {...data} />
                <Instructional videos={videos}/>
            </div>
        </Layout>
    )
}
export function HIWAffiliate(){
    const data = {
        title:"Complete guide to Gotocourse navigation as an affiliate",
        button: false,
        img: affiliate
    }

    const videos=[
        {
            name:"register",
            link:studentRegister
        },
        {
            name:"login",
            link:studentSignIn
        },
        {
            name:"enroll",
            link:studentEnroll
        },
        {
            name:"wishlist",
            link:studentWishlist
        },
        {
            name:"Edit profile",
            link:studentProfile
        },
        {
            name:"notification",
            link:studentNotification
        },
        {
            name:"payment",
            link:studentPayment
        }, 
        {
            name:"logout",
            link:studentLogout
        },
    ]
    return (
        <Layout>
            <div className={style.others}>
                <Hero {...data} />
                <Instructional  videos={videos}/>
            </div>
        </Layout>
    )
}


function Hero({title, img}){
    
    return (
        <div className={style.hero}>
            <div className="container">
                <div className={style.textImage}>
                    <div className={style.text_section}>
                        <h2 className={style.text_section_header}>{title}</h2>
                    </div>
                    <div className={style.image_section}>
                        <BlobImage img={img}  />
                    </div>
                </div>
            </div>
        </div>
    )
}


function BlobImage({img}){
    return (
        <div>
            <div className={style.blob_images}>
                <img src={blob} alt="" className={style.blob_first_image} />
                <img src={img} alt="" className={style.blob_second_image} />
            </div>
        </div>
    )
}

function Instructional({videos}){
    
    return (
        <div className={style.instructional_wrapper}>
            <div className="container">
                <h2 className={style.instructional_header}>Instructional Videos</h2>
                
                <div className={style.instructional_grid}>
                    {
                        videos.map((item, id)=>(
                            <InstructionalCard item={item} key={id}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function InstructionalCard({item}){
    console.log({item});
    return (
        <div className={style.instructional_images}>
            <div className={style.instructional_titles}>
                <p className={style.instructional_type}>Videos</p>
                <p>{item.name}</p>
            </div>
            <video src={item.link} controls type="video/mp4"/>
        </div>
    )
}

export default HIW
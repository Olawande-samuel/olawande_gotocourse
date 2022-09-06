import Layout from "../../components/Layout"
import style from "./style.module.css"
import blob from "../../images/how-it-works/blob.png"
import mentors from "../../images/how-it-works/mentors.png"
import affiliate from "../../images/how-it-works/affiliate.png"
import student from "../../images/how-it-works/student.png"
import teacher from "../../images/how-it-works/teacher.png"
import vidcard from "../../images/how-it-works/videocard.png"

const HIW = ()=> {
    const data = {
        title:"Complete guide to Gotocourse navigation as a mentor",
        button: false,
        img: mentors
    }
    return  (
        <Layout>
            <Hero {...data} />
            <Instructional />
        </Layout>
    )
}
export function HIWStudent(){
    const data = {
        title:"Complete guide to Gotocourse navigation as a student",
        button: false,
        img: student
    }
    return (
        <Layout>
            <div className={style.others}>
                <Hero {...data} />
                <Instructional />
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
    return (
        <Layout>
            <div className={style.others}>
                <Hero {...data} />
                <Instructional />
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
    return (
        <Layout>
            <div className={style.others}>
                <Hero {...data} />
                <Instructional />
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

function Instructional(){
    
    return (
        <div className={style.instructional_wrapper}>
            <div className="container">
                <h2 className={style.instructional_header}>Instructional Videos</h2>
                <div className={style.instructional_grid}>
                    {
                        [1, 2, 3, 4].map(item=>(
                            <InstructionalCard />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function InstructionalCard(){
    return (
        <div className={style.instructional_images}>
            <img src={vidcard} alt="" />
        </div>
    )
}

export default HIW
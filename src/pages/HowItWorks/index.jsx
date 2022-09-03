import Layout from "../../components/Layout"
import {HeroTypeSection} from "../Celebrity"
import style from "./style.module.css"
import blob from "../../images/how-it-works/blob.png"
import mentors from "../../images/how-it-works/mentors.png"
import affiliate from "../../images/how-it-works/affiliate.png"
import student from "../../images/how-it-works/student.png"
import teacher from "../../images/how-it-works/teacher.png"
import vidcard from "../../images/how-it-works/videocard.png"

const HIW = ()=> {
    return  (
        <Layout>
            <Hero />
            <Instructional />
        </Layout>
    )
}


function Hero({title, button, paragraph, btn_title}){
    const data = {
        title:"Compete guide to Gotocourse navigation as a student",
        button: false,
        paragrah:"",
        btn_title:"",
        img: affiliate
    }

    return (
        <div className={style.hero}>
            <div className="container">
                <HeroTypeSection title={data.title} button={data.button} paragraph={data.paragraph} btn_title={data.btn_title} >
                    <BlobImage img={data.img}  />
                </HeroTypeSection>
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
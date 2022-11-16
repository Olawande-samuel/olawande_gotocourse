import Layout from "../../components/Layout"
import { BestTools, Hero, ImageContent, ItWorks, ItWorksList, TextContent } from "./style"

import hang from "../../images/Teachers/hang.png";
import hiw from "../../images/Teachers/hiw.png";
import mail from "../../images/Teachers/mail.png";
import onDgo from "../../images/Teachers/onDgo.png";
import record from "../../images/Teachers/record.png";
import customised from "../../images/Teachers/customised.png";
import unlimited from "../../images/Teachers/unlimited.png";

import Meetifix from "../../images/landing/icons/Meetifix.png"
import Rekordia from "../../images/landing/icons/Rekordia.png"
import Quikonnet from "../../images/landing/icons/Quikonnet.png"
import Classpodia from "../../images/landing/icons/Classpodia.png"
import Quizim from "../../images/landing/icons/Quizim.png"

const Teachers = ()=> {
    return(
        <Layout>
            <Hero>
                
            </Hero>
            <ItWorks>
                <ItWorksList></ItWorksList>
            </ItWorks>
            <BestTools>
                <header>
                    <h5>Our Best tools</h5>
                    <p>Check incredible tools created on Gotocourse to make teaching cost effective</p>
                </header>
                <BestCards />
                <BestCards />
                <BestCards />
                <BestCards />
            </BestTools>
        </Layout>
    )
}


function BestCards(){
    return (
        <section>
            <div className="container">
                <div className="grid">
                    <ImageContent className="img_container">
                        <img src={unlimited} alt="" />
                    </ImageContent>
                    <TextContent className="text_container">
                        <div className="logo">
                            <img src={Meetifix} alt="" />
                        </div>
                        <h6>Hold unlimited live classes</h6>
                        <p>Teach great skills with the best teachers live online. Unlock the power of real-time learning without any barrier.</p>
                        <p></p>
                    </TextContent>
                </div>
            </div>
        </section>
    )
}
export default Teachers

const data = [

    {
        id:1,
        title: "Hold unlimited live classes",
        p1:"Teach great skills with the best teachers live online. Unlock the power of real-time learning without any barrier.",
        p2:"Teachers are empowered to conduct unlimited live classes with students with just a click of a button, and other features like class recording, screen-share and chat lobby.",
        logo: Meetifix,
        img:unlimited
    },
    {
        id:2,
        title: "Secured chat and mail system",
        p1:"Quikonnet is also a simple two-way interaction tool for teachers to Clear doubts, broadcast announcements, or just send some motivational messages.",
        p2:"",
        logo: Quikonnet,
        img: Quikonnet,

    },
    {
        id:3,
        title: "Course materials on the go",
        p1:"It is extremely simple to use and works smoothly even on low bandwidth.  Your students can see all assignments on the assignment page and all study materials (e.g., notes, documents, photos, and videos) can be uploaded and saved on Classpodia." ,
        p2:"Your students  have unlimited  access to study material on any device, anytime and  anywhere hence, they  are able to maximise their learning with  the provided study material after every class and any time they  need it.",
        logo: Classpodia,
        img:""
    },
    {
        id:4,
        title: "Student record system",
        p1:"Enjoy personalized performance reports. This friendly feature helps to send reminders, and take attendance automatically. It also makes daily basis and common tasks like sorting students into groups, recording assessments/attendance, and contacting students quick and easy. Students can also download gradesheets, attendance particulars etc as a CSV or PDF file." ,
        p2:"Your students  have unlimited  access to study material on any device, anytime and  anywhere hence, they  are able to maximise their learning with  the provided study material after every class and any time they  need it.",
        logo: Classpodia,
        img: Classpodia
    },
    {
        id:5,
        title: "Quizim",
        p1:"Create a quiz in a few seconds or take secure online quizes on any device, anywhere and at any time . Create quizzes in multiple choice tests, checkboxes, upload file attachment or assessment papers and have access to grades in real time just when made available." ,
        logo: Classpodia,
        img:""
    },
    {
        id:6,
        title: "Quizim",
        p1:"Create a quiz in a few seconds or take secure online quizes on any device, anywhere and at any time . Create quizzes in multiple choice tests, checkboxes, upload file attachment or assessment papers and have access to grades in real time just when made available." ,
        logo: Classpodia,
        img:""
    },
    {
        id:7,
        title: "Create course contents with the use of a single tool",
        p1:"This is a powerful educator’s companion designed to help course creators create their videos, course outline, and other material that will aid students leaning." ,
        logo: Classpodia,
        img:""
    },
]
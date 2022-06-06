
import Transition from "../images/careerTransition.png"
import Planning from "../images/careerTraining.png"
import Advancement from "../images/advancement.png"
const data = [
    {
        image:Transition,
        title:"Career Transition",
        text:"Are you looking to switch jobs or change your current career ? Gotocourse can help make that transition with ease",
    },
    {
        title:"Career Advancement",
        image:Advancement,
        text:"Fast track your career and earn that long deserved promotion at work. Gotocourse is here to help upskill ",
    },
    {
        image:Planning,
        title:"Career Planning",
        text:"A great career starts with the best planning . A career mentor on gotocourse can help you to achieve this goal.",
    },
]

export default function Development(){
    return (
        <section className="bootcamp">
            <div className=" container-lg bootcamp_content">
            <header className="text-center my-4">
                <h3 className="title">Career development</h3>
                <p
                className="sub_title mx-auto my-3"
                style={{ width: "min(100% - 1rem, 700px)" }}
                >
                Take control of your career path and position yourself for advancement
                </p>
            </header>
            <div className="bootcamp_list">
                    {data.map((career) => (
                        <DevelopmentBox {...career} />
                    ))}
                </div>
            </div>
        </section>
    );
    
}
function DevelopmentBox({image, title, text, link}){

    return (
        <div className="card bootcamp_card border-none">
            <div className="card-body bg-white d-flex flex-column justify-content-around">
                <div className="bootcamp_box_left w-50" >
                <img src={image} alt={title} className="img-fluid" style={{height:"100px"}} />
                </div>
                <div className="career_box_right d-flex flex-column mt-4">
                <header style={{ marginBottom: ".5rem" }}>
                    <h3 className="bootcampBox_title">{title}</h3>
                </header>
                <p className="details">{text}</p>
                </div>
            </div>
         </div>
    )
}
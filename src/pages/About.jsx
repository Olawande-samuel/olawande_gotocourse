import Layout from "../components/Layout"
import mission from "../images/mission.png";
import committed from "../images/committed.png";
import { useAuth } from "../contexts/Auth";
const About = ()=> {

    return(
        <Layout>
            <div className="about_wrapper" >
                {/* <main className="container"> */}
                <Jumbotron title="We believe in learning without limit" />
                <section className="about_article container">
                    <p>Learning involves two parties; the teacher and the student. We provide a platform where students can access quality certificate courses needed to build high in-demand technical skills without the barriers of costs or location.</p>
                    <p>We partner with Top-notch industry experts and Mentors to deliver the quality learning experience needed to make your career change journey seamless.</p>
                    <p>We offer borderless and self-paced training with a tailor-made flexible learning experience for each of our students ensuring you can upskill in the shortest period of time regardless of your engagements.</p>
                </section>
                <section className="about_mission py-3">
                    <div className="container d-flex " >
                        <div className="about_mission_img d-none d-md-block">
                            <img src={mission} className="img-fluid" alt="" />
                        </div>
                        <div className="about_mission_info">
                            <header>
                                <h2>Our Mission</h2>
                            </header>
                            <p className="text-start text-md-end">Creating access for Top industry experts to train 1 million immigrants and college graduates on high in-demand technical skills needed to land high-paying jobs by 2027.</p>
                        </div>
                    </div>
                </section>
                <section className="about_committed container">
                    <header className="about_committed_header">
                        <h2>Why are we committed to this?</h2>
                    </header>
                    <div className="d-flex">
                        <div className="about_committed_left">
                            <div className="d-flex flex-column justify-content-around align-items-center h-100">
                            <p>The number of immigrants and college graduates keeps increasing every day in the U.S and other parts of the world, there is a huge gap in technical skills for these sets of people to land the high-paying jobs they so desire.</p>
                            <p>Seeing this gap, our commitment lies in impacting you with the necessary high-in-demand skills needed to land the high-paying job you so desire, with a plethora of tutors and mentors committed to your growth within the shortest period of time at a convenient cost.</p>
                            </div>
                        </div>
                        <div className="about_committed_img d-none d-md-block">
                            <img src={committed} className="img-fluid" alt="" />
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default About

export const Jumbotron = ({title, contact})=>{
    const {  generalState: { navHeight }, } = useAuth();
    return (
        <section className="about_hero d-flex align-items-center" style={{height: `min(calc(100vh - ${navHeight}px ), 600px)`}}>
        <main className="container" style={{minHeight:"350px"}} >
            <h1>{title}</h1>
            {contact && 
            <ul>
                <li>Your interests, career goals</li>                   
                <li>Our programs, payment options</li>                   
                <li>Transitioning into Tech</li>                   
            </ul>
            }
        </main>
    </section>
    )
}


const Seamless = () => {

    const stay = [
        {
            title:"Course creator",
            content:"Create, upload and manage course content in simple and quick steps on the platform"
        },
        
        {
            title:"Live class",
            content:"Host live classes with your students using the integrated live class feature"
        },

        {
            title:"Meeting Scheduler",
            content:"Schedule live sessions with your students and notify them of the scheduled sessions."
        },
        {
            title:"Class console",
            content:"In-built chat system to enhance communication between teachers, students, and admin."
        },
        {
            title:"Mailing system",
            content:"Ease of dissemination of information to all users on the platform."
        },
        {
            title:"Quiz management system",
            content:"Create and manage students' assessments to track their progress"
        },
        {
            title:"Library",
            content:"Upload files and video content for students' perusal from anywhere, at anytime"
        },
    ]
  return (
    <div className='betterway'>
        <div className="container">
            <header>
                <h4>Gotocourse is an all-in-one platform that makes teaching and learning seamless</h4>
                <p className="subtitle">Our courses are designed with you in mind and built around proven learning principles with real-life application, top-of-the-range technology, and fully immersive exchange with industry experts; everything you need to start and advance your career in tech.We have created tools to enhance course creation, class delivery and classroom management</p>
            </header>
            <div className="stay">
                <div className="stay_left">
                    <img src={""} alt="" />
                </div>
                <div className="stay_right">
                    <ul>
                    {
                        stay.map((item, i) => (
                            <Cards {...item} key={i}  />
                        ))
                    }
                    </ul>
                </div>
            </div>
            {/* <div className="betterway_learning_models">
                {
                    data.map((data, i)=>(
                        <Models {...data} key={i} />
                    ))
                }
            </div> */}
        </div>
    </div>
  )
}

function Cards({title, content}){
    return (
        <li className="betterway_card mb-3">
            <header>
                <h5>{title}</h5>
            </header>
            <p>{content}</p>
        </li>
    )
}
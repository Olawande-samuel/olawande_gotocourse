

const Seamless = () => {

    const stay = [
        // {
        //     title:"Gotocourse promotes a better way to learn ",
        //     content:"Our courses are designed with you in mind and built around proven learning principles with real-life application, top-of-the-range technology, and fully immersive exchange with industry experts; everything you need to start and advance your career in tech."
        // },
        {
            title:"Learn and study on a flexible schedule",
            content:"Be in charge of your time, learn and study at your own preferred time without the limitation of fixed lessons and physical classrooms. Set your career goals and milestone and get started on building a great career you will be proud of."
        },
        {
            title:"Learn with a cohort",
            content:"Join a classroom to take instructor led training, do projects with learning partners, take quizzes, and build work related portfolio"
        },
        {
            title:"Self-paced Learning",
            content:"Self-paced courses that allow you to complete assignments at your own pace, making it easier to balance coursework with your other personal and professional responsibilities."
        },
        {
            title:"One-On-One Mentorship",
            content:"Challenge yourself with a one-on-one mentorship session with industry experts and professionals and grow your career."
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
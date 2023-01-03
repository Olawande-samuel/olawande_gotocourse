import { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Breadcrumbs, IconButton, Paper, Backdrop, Tooltip } from "@mui/material";
import { MdNavigateNext, MdShare, MdMoreVert, MdMenu, MdMessage } from "react-icons/md";
import { BiCloudDownload } from "react-icons/bi";
import { FaCaretRight, FaCaretLeft } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { RiVideoAddFill } from "react-icons/ri";
import Accordion from 'react-bootstrap/Accordion';
import ReactPaginate from 'react-paginate';
import { Sidebar } from "./components";
import { CustomButton } from './components/Sidebar';
import { useLocalStorage } from '../../../../hooks';
import quiz from '../../../../images/classroom_quiz.svg';
import { useAuth } from '../../../../contexts/Auth';
import { KEY } from '../../../../constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';


const Container = styled.div`
position: relative;

`
const IconContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: .8rem .4rem;
    width: 50px;
    height: auto;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    border: 1px solid var(--theme-blue);
    border-radius: 10px;
    background: #EEF5FF;
    box-shadow: 0px 203px 81px rgba(0, 0, 0, 0.01), 0px 114px 68px rgba(0, 0, 0, 0.05), 0px 51px 51px rgba(0, 0, 0, 0.09), 0px 13px 28px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
`

const ClassroomContainer = styled.div`
    width: 100%;
    height: calc(100vh - 75px);
    display: grid;
    grid-template-columns: 300px 1fr;
    margin: 0;
    margin-top: 75px;
    overflow-y: hidden;

    @media screen and (max-width: 960px){
        grid-template-columns: 1fr;
    }
`;

const BreadcrumbLink = styled(Link)`
    color: ${props => props.$isCurrentPage ? '#0C2191' : '#666363'};
    font-weight: 400;
    font-size: 0.9rem;
    cursor: ${(props) => props.$isCurrentPage ? 'not-allowed' : 'pointer'};

    &:hover {
        color:#0C2191
    }
`;


const ClassroomMain = styled.div`
    width: min(100% - 3rem, 950px);
    margin-inline: auto;
    height: 100%;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
`;


const ClassroomMainTop = styled.div`
    width: 100%;
    margin-block: 40px;
`;

const Navbar = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 20px;
    background-color: var(--textBlue);
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--white);
    box-shadow: 0px 0px 20px -5px #222;

    & h5 {
        font-weight: 300;
        font-size: 1.15rem;
    }
`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;

    & svg {
        color: var(--white);
    }
`;


const ClassroomMainBody = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const BodyContent = styled.div`
    width: 100%;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    // border: 2px solid green;

    .paper{
        display: flex;
        flex-direction: column;
        gap: .5rem;
        // border: 2px solid yellow;
    }
`

const BodyInfo = styled.div`
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;


    & h3 {
        font-size: 1rem;
        font-weight: 500;
    }
`;


const PaperTop = styled.div`
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    

    & h5 {
        font-weight: 300;
        font-size: 0.9rem;
        margin: 0;
    }
    div{

        padding: .3rem;

    }

    &>:first-child{
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    }
`;




const BodyActions = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;


const VideoAction = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
`;


const QuizAction = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 40px 0;
`;


const NextButton = styled(CustomButton)`
    font-size: 0.8rem !important;

    & svg {
        color: var(--textBlue);
        margin-left: 10px;
    }
`;


const PreviousButton = styled(NextButton)`
    & svg {
        margin-right: 10px;
    }
`

const Quiz = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;


const Note = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`

const QuizImageContainer = styled.div`
    width: 425px;
    height: 425px;
`;

const QuizImage = styled.img`
    width: 100%;
    height: 100%;
`;
const QuizButton = styled.button`
    background-color: #3f50b5 ;
    color: white ;
    border: none;
    outline: none;
    padding: .5rem;
    font-size: 12px;
    border-radius: 5px;
`;

const MarkButton = styled.button`
display: ${({display}) => display ? 'none' : 'block' };
    background-color: #3f50b5 ;
    color: white ;
    border: none;
    outline: none;
    padding: .5rem;
    font-size: 12px;
    border-radius: 5px;
`;

const MenuButton = styled(IconButton)`
    display: none;

    & svg {
        color: var(--white);
    }

    @media screen and (max-width: 960px){
        display: inline-block;
    }
`


const FileName = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: .5rem 0.4rem;
border: 1px solid rgba(0, 0, 0, 0.12);

p{
    font-size: 14px;
}

`
const FileDisplay = styled.div`
width: 100%;
height: 300px;
// border: 2px solid red;

video{
    width:100%;
    height: 100%;

}

img{
    width: 100%;
    height: 100%;
}


`
const QuizInfo = styled.div`
padding: 1rem;
border: 2px solid red;
border: 1px solid #004DB6;
font-size: 16px;
border-radius: 10px;
background: #EEF5FF;
box-shadow: 0px 203px 81px rgba(0, 0, 0, 0.01), 0px 114px 68px rgba(0, 0, 0, 0.05), 0px 51px 51px rgba(0, 0, 0, 0.09), 0px 13px 28px rgba(0, 0, 0, 0.1), 0px 0px 0px rgba(0, 0, 0, 0.1);
p{

}

span{

}



`

const QuesHeader = styled.div`
p{
    font-size: 14px;
    color: black;
    span{
        color: #004DB6;
        font-size: 12px;
        font-weight: 700;
    }
}


`

const QuestionOptions = styled.div`
    h4{
        color: #004DB6;
        font-size: 18px;
        font-weight: 700; 
    }

`

const Answer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    input{
        margin: 0 .5rem;
    }

`

const NotecContainer = styled.div`
// border: 2px solid red;
padding: .5rem 1rem; 
p{
    font-weight: 400;
    font-size: 15px;
    line-height: 30px;
}

ul{
    list-style: none;
    display: flex;
    gap: 2rem;
    margin: 1rem 0; 

    li a{
        padding : 1rem 2rem;
        color: var(--textBlue);
        border: 1px solid #3f50b5;
    }
}



`

{/* <QuizImageContainer>
            <QuizImage src={quiz} alt="Quiz Image" />
        </QuizImageContainer>
        <QuizButton>Open Quiz</QuizButton> */}

// const QuizContent = ({ q, id }) => {
//     console.log({q});
//     return (
//         <>
//             <Quiz key={id}>

//                 <QuizInfo>
//                     <p>Description: </p>
//                     <span>{q.note}</span>
//                     <p>Max Attempts: <span>{q.maxAttempts}</span></p>
//                     <p>Deadline: <span>{new Date(q?.endDate).toLocaleTimeString('en-US', {
//                         hour: '2-digit',
//                         minute: '2-digit'
//                     })}</span></p>
//                     <p>Number of submissions:  <span>1/1</span> </p>
//                     <p> Provisional Result (based on Objective): <span>0.00%</span></p>
//                 </QuizInfo>

//             </Quiz>
//             <div>
//                 {q.questions.length > 0 && q.questions.map((ques, index) => (
//                     <Accordion >
//                         <Accordion.Item eventKey={id} className="accord__body">
//                             <Accordion.Header className="accord__header"> Question {id + 1}</Accordion.Header>
//                             <Accordion.Body>
//                                 <QuesHeader className="queshead">
//                                     <p>Type: <span>{ques.type}</span></p>
//                                     <p>Grade: <span>{ques.grade}</span></p>
//                                 </QuesHeader>

//                                 <QuestionOptions>
//                                     <h4 dangerouslySetInnerHTML={{ __html: `${ques.title}` }}></h4>
//                                     {ques?.options && ques?.options.length > 0 && ques?.options.map((opt, i) => (
//                                         <Answer>
//                                             <label for="vehicle1">
//                                                 <input
//                                                     type="checkbox"
//                                                     value={opt.title}
//                                                     // name="isAnswer"
//                                                     onChange={e => {
//                                                         // const list = { ...formData }
//                                                         // list.questions[id].options[index]['isAnswer'] = e.target.checked;
//                                                         // console.log(list);
//                                                         // setFormData(list)
//                                                     }} />
//                                                 {opt.title}
//                                             </label>

//                                         </Answer>

//                                     ))}

//                                 </QuestionOptions>
//                                 <QuizAction>

//                                     <QuizButton>
//                                         Submit
//                                     </QuizButton>
//                                 </QuizAction>

//                             </Accordion.Body>
//                         </Accordion.Item>
//                     </Accordion>
//                 ))}

//             </div>


//         </>
//     )
// }

const NoteComponent = (contentItem) => {
    console.log({ contentItem });

    return (
        <NotecContainer>

            <div>
                < Note >
                    {/* <h4>Hey this is a demo note heading</h4> */}
                    <p dangerouslySetInnerHTML={{ __html: contentItem.contentItem?.body }}></p>

                </Note>
                {/* { note && <button ref={ref} onClick={() => handleCompleted(note.contentId)}>{note.contentId}</button>} */}
                {/* {
                    <QuizAction>
                        <QuizButton
                        // onClick={() => handleCompleted(note.contentId)}
                        >
                            Mark as Completed
                        </QuizButton>
                    </QuizAction>
                } */}
            </div>


        </NotecContainer>
    )
}

const FileComponent = (contentItem) => {
    console.log({ contentItem });

    const getExtention = (val) => {
        console.log({ val });

        if(val.split('/')[0] === "video"){
            return "video"
        }else return "image"

    }
    return (
        <div>
            <Paper variant='outlined' className="paper">
                <PaperTop>
                    <div>
                        <h5>{contentItem.contentItem.title}</h5>
                        <IconButton>
                            <MdMoreVert />
                        </IconButton>

                    </div>
                    <div>
                        <BodyActions>
                            <IconButton>
                                <BiCloudDownload />
                            </IconButton>
                            <CustomButton>Open</CustomButton>
                        </BodyActions>
                    </div>
                </PaperTop>

                <FileName>
                    <p>{contentItem.contentItem.title}</p>
                    <IconButton>
                        <MdMoreVert />
                    </IconButton>
                </FileName>

                <FileDisplay>
                    {getExtention(contentItem.contentItem.type) === "image" ? <img src={`${process.env.REACT_APP_IMAGEURL}${contentItem.contentItem.fileName}`} alt="" /> :
                        <video src={`${process.env.REACT_APP_VIDEOSURL}${contentItem.contentItem.fileName}`} controls ></video>
                    }

                </FileDisplay>


            </Paper>

        </div>
    )
}

const QuizComponent = ({ contentItem ,userdata}) => {
    console.log(contentItem);
    const { consoleFunctions: { attemptQuiz } } = useAuth();
    const [myAnswers, setMyAnswers] = useState({
        questionId:"",
        answers:[]
    })

    const [allAnswers, setAllAnswers] = useState([])


    useMemo(() => {
        setAllAnswers([myAnswers])
    },[myAnswers])

    console.log({myAnswers});
    console.log({allAnswers});

    const AnswerQuiz = async () => {
        const { data } = await attemptQuiz(userdata?.token,contentItem._id,  allAnswers)
        console.log({ data });


    }

    
    return (
        <>
            <Quiz>

                <QuizInfo>
                    <p>Description: </p>
                    <span>{contentItem.note}</span>
                    <p>Max Attempts: <span>{contentItem.maxAttempts}</span></p>
                    <p>Deadline: <span>{new Date(contentItem?.endDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span></p>
                    <p>Number of submissions:  <span>1/1</span> </p>
                    <p> Provisional Result (based on Objective): <span>0.00%</span></p>
                </QuizInfo>

            </Quiz>
            <div>
                {contentItem.questions.length > 0 && contentItem.questions.map((ques, index) => (
                    <Accordion >
                        <Accordion.Item eventKey={index} className="accord__body">
                            <Accordion.Header className="accord__header"> Question {index + 1}</Accordion.Header>
                            <Accordion.Body>
                                <QuesHeader className="queshead">
                                    <p>Type: <span>{ques.type}</span></p>
                                    <p>Grade: <span>{ques.grade}</span></p>
                                </QuesHeader>

                                <QuestionOptions>
                                    <h4 dangerouslySetInnerHTML={{ __html: `${ques.title}` }}></h4>
                                    {ques?.options && ques?.options.length > 0 && ques?.options.map((opt, i) => (
                                        <Answer>
                                            <label for="vehicle1">
                                                <input
                                                    type="checkbox"
                                                    value={opt.title}
                                                    // name="isAnswer"
                                                    onChange={e => {
                                                      setMyAnswers({
                                                        questionId:ques._id,
                                                        answers:[ ...myAnswers.answers, opt._id]
                                                      })
                                                    }} />
                                                {opt.title}
                                            </label>

                                        </Answer>

                                    ))}

                                </QuestionOptions>
                                <QuizAction>

                                    <QuizButton onClick={AnswerQuiz}>
                                        Submit
                                    </QuizButton>
                                </QuizAction>

                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}

            </div>


        </>
    )
}



const Classroom = () => {
    const [showMobile, setShowMobile] = useState(false);
    const [modules, setModules] = useState([]);
    const [contents, setContents] = useState([])
    const [title, setTitle] = useState("")
    const [bootcampName, setBootcampName] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();

    const contentId = searchParams.get("contentId");
    // const [active, setActive] = useState(false)
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)
    let queryClient =  useQueryClient()


    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)

    const [pickedType, setPickedType] = useState("")
    let [completed, setCompleted] = useState(0);

    const { id } = useParams()

    const { consoleFunctions: { fetchStudentDomains, fetchStudentQuiz, fetchStudentFile, fetchStudentNote, markAsCompleted }, studentFunctions: { fetchBootcamps } } = useAuth();
    const fetchBootcampsName = useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token), {
        onSuccess: (res) => {
            if (res.data && id) {
                setBootcampName(res.data.filter(d => d.bootcampId === id))
            }
        }
    })

    const fetchstudentDomains = useQuery(["fetch domains", id], () => fetchStudentDomains(userdata.token, id), {
        onSuccess: (res) => {
            // console.log(res.data)
            setModules(res.data)
        }
    })




    const reduceContent = useMemo(() => {
        return modules?.reduce((total, current) => [
            ...total, ...current.contents
        ], []);

    }, [modules])


    const completedContent = useMemo(() => {
        return reduceContent?.reduce((total, current) =>{
            console.log("text", current.items.filter(item => item.completedBy?.includes(userdata.id)))
           return total + current.items.length

        }
         ,0)

    }, [modules])


    console.log({completedContent});
    console.log({ reduceContent })


   useMemo(() => {

        if (reduceContent?.length > 0) {
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);
            if (findIndex === 0) {
                setPrev(true)
                setNext(false)


            } else if (findIndex === (reduceContent?.length - 1)) {
                setNext(true)
                setPrev(false)


            } else {
                setNext(false)
                setPrev(false)

            }
        }

    }, [reduceContent, contentId])

    const MoveButton = (type) => {
        if (reduceContent?.length > 0 && type === "next") {
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);
            // console.log({ findIndex });

            let val = ""
            if (findIndex !== (reduceContent?.length - 1)) {
                val = findIndex + 1;
                console.log({ val });
                setPickedType(reduceContent[val]?.type)
                setContents(reduceContent[val]?.items)
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
            } else {
                val = findIndex;
                setContents(reduceContent[val]?.items)
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
            }
        } else if (reduceContent?.length > 0 && type === "prev") {
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);
            let val = ""
            if (findIndex !== 0) {
                val = findIndex - 1;
                setPickedType(reduceContent[val]?.type)
                setContents(reduceContent[val]?.items)
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
            } else {
                val = findIndex;
                setPickedType(reduceContent[val]?.type)
                setContents(reduceContent[val]?.items)
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
            }
        }

    }


    useMemo(() => {
        if (reduceContent?.length > 0 && contentId){
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);
            if (findIndex > -1) {
                setPickedType(reduceContent[findIndex]?.type)
                setContents(reduceContent[findIndex]?.items) 
            }
        }
    },[reduceContent, contentId])


    const handleFileCompleted = async (contentId, fileId) => {
        console.log({ contentId });
        const { data, statusCode } = await markAsCompleted(userdata?.token, contentId, fileId)
        if(statusCode === 1){
            queryClient.invalidateQueries(["fetch domains"])
            console.log({ data });

        }


    }


    // const handleQuizCompleted = async (id, index) => {
    //     const { success } = await markAsCompleted(userdata?.token, id)
    //     if (success) {
    //         setCompleted((prev) => prev < reduceContent.length ? prev + 1 : prev)

    //     }


    // }

    console.log({ modules });

    // console.log({ contentId });

    console.log({completed});

    return (
        <Container>
            <Navbar>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <MenuButton onClick={e => setShowMobile(_ => true)}>
                        <MdMenu />
                    </MenuButton>
                    <h5 style={{ margin: 0 }}><Link to={`/student/console/myclasses`} style={{color: "#fff"}}>Classroom</Link></h5>
                </div>
                <NavLeft>
                    <IconButton>
                        <MdShare />
                    </IconButton>
                    <IconButton>
                        <MdMoreVert />
                    </IconButton>
                </NavLeft>
            </Navbar>
            <ClassroomContainer>
                <Backdrop
                    sx={{ color: '#fff', zIndex: 1000 }}
                    open={showMobile}
                    onClick={e => setShowMobile(_ => false)}
                >
                    <Sidebar isMobile={true} modules={modules}
                        // activeMedia={active} 
                        // changeActive={setActiveMediaHandler} 
                        completed={completed}
                        setContents={setContents}
                        setPickedType={setPickedType}
                        reduceContent={reduceContent}
                        setCompleted={setCompleted}
                    // active={active} 
                    // setActive={setActive}
                    />
                </Backdrop>
                <Sidebar
                    isMobile={false} modules={modules}
                    // activeMedia={active} 
                    // changeActive={setActiveMediaHandler} 
                    completed={completed}
                    setContents={setContents}
                    setPickedType={setPickedType}
                    reduceContent={reduceContent}
                    setCompleted={setCompleted}
                // active={active} 
                // setActive={setActive}

                />
                <ClassroomMain>
                    <ClassroomMainTop>
                        <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                            <BreadcrumbLink to="/">
                                Dashboard
                            </BreadcrumbLink>
                            <BreadcrumbLink to="#">
                                {bootcampName?.length > 0 && bootcampName[0].bootcampName}
                            </BreadcrumbLink>
                            <BreadcrumbLink to="#" $isCurrentPage={true}>
                                {title}
                            </BreadcrumbLink>
                        </Breadcrumbs>
                    </ClassroomMainTop>
                    <ClassroomMainBody>
                        <BodyInfo>
                            <h3>{title}</h3>
                            <CustomButton>Ask tutor a question</CustomButton>
                        </BodyInfo>

                        <BodyContent>
                            {pickedType === "FILE_VIDEO" &&
                                <>
                                    {contents?.length > 0 && contents?.map((content, id) => (
                                        <>
                                            <FileComponent contentItem={content} id={id} key={id} />
                                            <QuizAction >
                                                <MarkButton display={content.completedBy.includes(userdata.id) ? true : false}
                                                    onClick={() => handleFileCompleted(content.contentId, content.fileId)}
                                                >
                                                    Mark as Completed
                                                </MarkButton>
                                            </QuizAction>
                                        </>

                                    ))
                                    }
                                </>

                            }

                            {pickedType === "NOTE" && <>
                                {contents?.length > 0 && contents?.map((content, id) => (
                                    <>
                                        <NoteComponent contentItem={content} id={id} key={id} />

                                        <QuizAction >
                                            <MarkButton
                                                onClick={() => handleFileCompleted(content.contentId, content._id)}
                                            >
                                                Mark as Completed
                                            </MarkButton>
                                        </QuizAction>
                                    </>

                                ))
                                }

                            </>
                            }

                            {pickedType === "QUIZ" && <>
                                {contents?.length > 0 && contents?.map((content, id) => (
                                    <>
                                        <QuizComponent contentItem={content} id={id} key={id} userdata={userdata}/>
                                        <QuizAction >
                                            <MarkButton
                                                onClick={() => handleFileCompleted(content.contentId, content._id)}
                                            >
                                                Mark as Completed
                                            </MarkButton>
                                        </QuizAction>
                                    </>
                                ))
                                }




                            </>
                            }


                            {contentId && <QuizAction>
                                <PreviousButton variant="outlined" disabled={prev} onClick={() => MoveButton("prev")}>
                                    <FaCaretLeft />  Previous Content
                                </PreviousButton>
                                <NextButton variant="outlined" disabled={next} onClick={() => MoveButton("next")}>
                                    Next Content <FaCaretRight />
                                </NextButton>
                            </QuizAction>
                            }
                        </BodyContent>
                    </ClassroomMainBody>
                </ClassroomMain>
            </ClassroomContainer>

            <IconComponent classId={id} />
        </Container>
    )
}


const IconComponent = ({ classId }) => {
    const studentIcon = [
        {
            id: 1,
            icon: MdMessage,
            title: "Mail",
            link: `/student/console/myclasses/${classId}`
        },

        {
            id: 2,
            icon: RiVideoAddFill,
            title: "Live Class",
            link: "/student/live-class"
        },
    ];
    return (
        <IconContainer className='iconbar'>
            {studentIcon.map(({ title, id, icon: Icon, link }) => (
                <Tooltip title={title} key={id}>
                    <IconButton>
                        <Link to={link} className="d-inline-flex">
                            <Icon size="1.5rem" color="#0C2191" />
                        </Link>
                    </IconButton>
                </Tooltip>
            ))
            }
        </IconContainer>
    )
}




export default Classroom;
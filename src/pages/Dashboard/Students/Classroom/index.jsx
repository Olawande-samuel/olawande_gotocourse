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
import axios from 'axios'
import { DocumentViewer, ViewModal } from '../../components/classConsole/File';
import emptyImg from "../../../../images/empty.png"
import ReactQuill from 'react-quill';
import Loader from '../../../../components/Loader';
import { Document, Page } from 'react-pdf';
import { AdvancedError } from '../../../../classes';
import { toast } from 'react-toastify';


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
    /* background-color: var(--textBlue); */
    /* background: #004DB6; */
    /* background-color: var(--theme-blue); */


    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--white);
    /* box-shadow: 0px 0px 20px -5px #222; */

    .navbarright{
        width: 300px;
        background-color: var(--theme-blue);
        display: flex;
        align-items: center;
        padding: 20px;


        & h5 {
            font-weight: 300;
            font-size: 1.15rem;
            color: #fff;
        }
    }

`;

const NavLeft = styled.div`
    display: flex;
    align-items: center;

    & svg {
        color: var(--theme-blue);
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
     /* border: 2px solid green; */

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

    
// .empty{
//     background-image: url(${emptyImg});
//     background-repeat: no-repeat;
//     background-position: center;
//     width: 100%;
//     min-height: 50vh;
//      border: 2px solid red;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// }

// .empty p{
//     font-size: 28px;
//     font-family: 'Raleway';
//     color: #0C2191;

// }
`;


const VideoAction = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
`;


export const QuizAction = styled.div`
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
export const QuizButton = styled.button`
    background-color: #3f50b5 ;
    color: white ;
    border: none;
    outline: none;
    padding: .5rem;
    font-size: 12px;
    border-radius: 5px;
`;

const MarkButton = styled.button`
display: ${({ display }) => display ? 'none' : 'block'};
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
// height: 300px;
// border: 2px solid red;

video{
    width:100%;
    // height: 100%;

}

.img{
    height: 500px;
    img{
        max-width: 100%;
        max-height: 100%;
    }
   
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

export const QuesHeader = styled.div`
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

export const QuestionOptions = styled.div`
    h4{
        color: #004DB6;
        font-size: 18px;
        font-weight: 700; 
    }

`

export const Answer = styled.div`
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



const NoteComponent = (contentItem) => {
    console.log({ contentItem });

    return (
        <NotecContainer>

            <div>
                < Note >
                    {/* <h4>Hey this is a demo note heading</h4> */}
                    <p dangerouslySetInnerHTML={{ __html: contentItem.contentItem?.body }}></p>

                </Note>

            </div>


        </NotecContainer>
    )
}

const FileComponent = (contentItem) => {
    const [open, setOpen] = useState(false)
    // console.log(contentItem.contentItem);

    const getExtention = (val) => {
        // console.log({ val });

        if (val?.split('/')[0] === "video") {
            return "video"
        } else if ((val?.split('/')[1] === "pdf") || (val?.split('/')[1] === "pptx") || (val?.split('/')[1] === "ppt") || (val?.split('/')[1] === "doc") || (val?.split('/')[1] === "docx") || ((val?.split('/')[1] === "csv") || (val?.split('/')[1] === "clsx"))) {
            return "pdf"
        }
        else return "image"

    }


    function downloadContent(file, fileName, type) {
        if (getExtention(type) === "image") {

            axios({
                url: `${process.env.REACT_APP_IMAGEURL}${file}`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                console.log({ response })
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            });
        } else {
            axios({
                url: `${process.env.REACT_APP_VIDEOURL}${file}`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                console.log({ response })
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(href);
            });
        }


    }
    return (
        <div>
            <Paper variant='outlined' className="paper">
                <PaperTop>
                    <div>
                        <BodyActions>
                            <IconButton>
                                {contentItem?.contentItem?.downloadable && <BiCloudDownload onClick={() => downloadContent(contentItem.contentItem.fileName, contentItem.contentItem.title, contentItem.contentItem.type)} />}
                            </IconButton>
                            <CustomButton onClick={() => setOpen(true)}>Open</CustomButton>
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
                    {getExtention(contentItem?.contentItem?.type) === "image" ?
                        <div className="img">
                            <img src={`${process.env.REACT_APP_IMAGEURL}${contentItem?.contentItem?.fileName}`} alt="" />

                        </div>
                        :

                        getExtention(contentItem?.contentItem?.type) === "pdf" ?
                            <div className="pdf">

                                <DocumentViewer file={contentItem?.contentItem?.fileUri} />

                            </div>
                            :

                            <video src={`${process.env.REACT_APP_VIDEOURL}${contentItem?.contentItem?.fileName}`} controls controlsList="nodownload"></video>
                    }

                </FileDisplay>


            </Paper>

            <ViewModal
                open={open}
                setOpen={setOpen}
                file={getExtention(contentItem?.contentItem?.type) === "image" ?
                    `${process.env.REACT_APP_IMAGEURL}${contentItem?.contentItem?.fileName}` :
                    `${process.env.REACT_APP_VIDEOURL}${contentItem?.contentItem?.fileName}`
                }
                type={contentItem?.contentItem?.type}
                title={contentItem?.contentItem?.title}
            />

        </div>
    )
}

const QuizComponent = ({ contentItem, userdata, attemptedStatus }) => {
    console.log(contentItem);
    const { consoleFunctions: { attemptQuiz } } = useAuth();
    const [note, setNotes] = useState([])
    const [myAnswers, setMyAnswers] = useState([]);
    const [loading, setLoading] = useState(false);


    function setNote(text, quizId, questionId, questionIndex, quizIndex) {
        // for editor content
        let allNotes = note
        allNotes[quizIndex] = text
        setNotes(allNotes)

        // For Answers
        let allAnswers = myAnswers
        let questionForThis = allAnswers.findIndex(item => item.questionId === questionId)
        if (questionForThis === -1) {
            let thisAnswer = {
                questionId: questionId,
                answers: [text]
            }
            setMyAnswers([...myAnswers, thisAnswer])
        } else {
            let thisAnswer = {
                questionId: questionId,
                answers: [text]
            }
            allAnswers.splice(questionForThis, 1, thisAnswer)
            setMyAnswers(allAnswers)

        }
    }


    const handleInputChange = (e, questionId, index) => {
        const { value } = e.target;
        let list = [...myAnswers]
        // console.log({ questionId })
        let thisOption = list.findIndex(item => item.questionId === questionId)

        // console.log("questionId2Option: " + thisOption)
        if (thisOption === -1) {
            list.push({ questionId: questionId, answers: [value] })
        } else {
            list.splice(thisOption, 1, { questionId: questionId, answers: [value] })
        }
        setMyAnswers(list)
    }


    const AnswerQuiz = async () => {
        try {
            setLoading(true)
            const res = await attemptQuiz(userdata?.token, contentItem?._id, myAnswers)
            const { message, success, statusCode } = res;
            if (!success) throw new AdvancedError(message, statusCode);
            else if (statusCode === 1) {
                const { data } = res;
                if (data) {
                    toast.success(message, {
                        position: "top-right",
                        autoClose: 4000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });

                    setLoading(false)

                }

            }

        } catch (error) {
            setLoading(false)
            toast.error(error, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    console.log({ myAnswers });


    return (
        <>
            <Quiz>

                <QuizInfo>
                    <p>Description: <span>{contentItem.note}</span></p>
                    <p>Max Attempts: <span>{contentItem.maxAttempts}</span></p>
                    <p>Deadline: <span>{new Date(contentItem?.endDate).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</span></p>
                    <p>Number of submissions:  <span>{contentItem.attempts || 0}/{contentItem.maxAttempts}</span> </p>
                    <p> Provisional Result (based on Objective): <span>100.00%</span></p>
                </QuizInfo>

            </Quiz>
            <div>
                {contentItem?.questions?.length > 0 && contentItem?.questions.map((ques, index) => (
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

                                    {
                                        ques?.type === "THEORY" && ques?.options && ques?.options.length > 0 && ques?.options.map((opt, i) => (
                                            <>
                                                {opt.title}
                                                <Answer>
                                                    <ReactQuill theme="snow" value={note[index]} onChange={(e) => setNote(e, ques?._id, opt?._id, i, index)} />
                                                </Answer>


                                            </>
                                        ))


                                    }

                                    {ques?.type === "MULTIPLE_CHOICE" && ques?.options && ques?.options.length > 0 &&
                                        <>

                                            {ques?.options.map((opt, i) => (
                                                <Answer>
                                                    <label for={`answers${opt._id}`}>
                                                        <input
                                                            type="radio"
                                                            value={opt._id}
                                                            id={`answers${opt._id}`}
                                                            name={`answers${ques.title}`}
                                                            onChange={e => handleInputChange(e, ques?._id, index)} />
                                                        {opt.title}
                                                    </label>

                                                </Answer>

                                            ))}

                                        </>
                                    }


                                    {
                                        ques?.type === "FILE" && ques?.options && ques?.options.length > 0 &&
                                        <>
                                            <Answer>
                                                <label for="file">
                                                    <input
                                                        type="file"
                                                    // value={opt._id}
                                                    // name="answers"
                                                    // onChange={e => handleInputChange(e, ques?._id, index)} 
                                                    />
                                                </label>
                                            </Answer>


                                        </>

                                    }


                                </QuestionOptions>




                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}

                {attemptedStatus && <small style={{ color: "var(--theme-orange)" }}>Quiz has already been submitted {contentItem?.attempts} time(s)</small>}

                < QuizAction >
                    {
                        loading ?
                            (
                                <button className="button button-md log_btn w-100"
                                    disabled={loading}>
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </button>
                            )
                            :
                            <QuizButton onClick={() => AnswerQuiz("mutiple")} disabled={(+contentItem?.attempts) >= (+contentItem?.maxAttempts)}>
                                Submit
                            </QuizButton>
                    }
                </QuizAction>

            </div>


        </>
    )
}



const Classroom = () => {
    const [showMobile, setShowMobile] = useState(false);
    const [modules, setModules] = useState([]);
    const [contents, setContents] = useState([])
    const [bodyTitle, setBodyTitle] = useState("")
    const [bootcampName, setBootcampName] = useState({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [locked, setLocked] = useState(false);

    const [loading, setLoading] = useState(false);

    const contentId = searchParams.get("contentId");
    // const [active, setActive] = useState(false)
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)
    let queryClient = useQueryClient()


    const { getItem } = useLocalStorage()
    const userdata = getItem(KEY)

    const [pickedType, setPickedType] = useState("")

    const { id } = useParams()

    const { consoleFunctions: { fetchStudentDomains, markAsCompleted, markFileAsCompleted }, studentFunctions: { fetchBootcamps } } = useAuth();
    useQuery(["fetch my classes"], () => fetchBootcamps(userdata?.token), {
        onSuccess: (res) => {
            if (res.data && id) {
                setBootcampName(res.data.filter(d => d.bootcampId === id))
            }
        }
    })

    const { isLoading } = useQuery(["fetch domains", id], () => fetchStudentDomains(userdata.token, id), {
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

    const reduceItem = useMemo(() => {
        return reduceContent?.reduce((total, current) => [
            ...total, ...current.items
        ], []);

    }, [modules])


    const totalItem = useMemo(() => {

        let length = reduceItem?.length
        let isCompleted = reduceItem?.filter(item => item.completedBy?.includes(userdata.id))
        let isattempted = reduceItem?.filter(item => item.attemptedBy?.includes(userdata.id))

        return {
            total: length,
            isCompleted: isCompleted?.length + isattempted?.length
        };

    }, [modules])



    //check whether next and prev btn be disabled
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


    //move next and prev btn 
    const MoveButton = (type) => {
        if (reduceContent?.length > 0 && type === "next") {
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);
            console.log({ findIndex });



            let val = ""
            if (findIndex !== (reduceContent?.length - 1)) {
                val = findIndex + 1;
                console.log({ val });
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
                if (!reduceContent[val]?.isLocked) {
                    console.log("item is logged");
                    setLocked(false)
                    setPickedType(reduceContent[val]?.type)
                    setContents(reduceContent[val]?.items)
                    setBodyTitle(reduceContent[val]?.title)
                    return;

                } else {
                    setContents([])
                    console.log("item is  not locked");
                    setLocked(true)
                    setPickedType(reduceContent[val]?.type)
                    setBodyTitle(reduceContent[val]?.title)
                    return;

                }

            } else {
                val = findIndex;
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })

                if (!reduceContent[val]?.isLocked) {
                    console.log("item is locked");
                    setLocked(false)
                    setContents(reduceContent[val]?.items)
                    setBodyTitle(reduceContent[val]?.title)
                    setPickedType(reduceContent[val]?.type)
                    return;

                } else {
                    setContents([])
                    console.log("item is  not locked");
                    setLocked(true)
                    setBodyTitle(reduceContent[val]?.title)
                    setPickedType(reduceContent[val]?.type)
                    return;

                }

            }
        } else if (reduceContent?.length > 0 && type === "prev") {
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);

            let val = ""
            if (findIndex !== 0) {
                val = findIndex - 1;
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
                if (!reduceContent[val]?.isLocked) {
                    console.log("item is locked");

                    setLocked(false)
                    setPickedType(reduceContent[val]?.type)
                    setContents(reduceContent[val]?.items)
                    setBodyTitle(reduceContent[val]?.title)
                    return;

                } else {
                    console.log("item is  not locked");
                    setContents([])
                    setLocked(true)
                    setPickedType(reduceContent[val]?.type)
                    setBodyTitle(reduceContent[val]?.title)
                    return;

                }

            } else {
                val = findIndex;
                setSearchParams({
                    contentId: reduceContent[val]?.contentId
                })
                if (!reduceContent[val]?.isLocked) {
                    setLocked(false)
                    setPickedType(reduceContent[val]?.type)
                    setContents(reduceContent[val]?.items)
                    setBodyTitle(reduceContent[val]?.title)
                    return;

                } else {
                    setContents([])
                    setLocked(true)
                    setPickedType(reduceContent[val]?.type)
                    setBodyTitle(reduceContent[val]?.title)
                    return;

                }

            }
        }

    }

    //automatically populate content as long as it appears in the url
    useMemo(() => {
        if (reduceContent?.length > 0 && contentId) {
            const findIndex = reduceContent?.findIndex(content => content.contentId === contentId);
            const findItem = reduceContent?.find(content => content.contentId === contentId);
            if (findIndex > -1 && !findItem?.isLocked) {
                setLocked(false)
                setPickedType(reduceContent[findIndex]?.type)
                setContents(reduceContent[findIndex]?.items)
                setBodyTitle(reduceContent[findIndex]?.title)
                return;


            } else if (findIndex > -1 && findItem?.isLocked) {
                setPickedType(reduceContent[findIndex]?.type)
                setBodyTitle(reduceContent[findIndex]?.title)
                setLocked(true)
                return;

            } else {
                setContents([])
                setLocked(false)
                return;


            }
        } else if (reduceContent?.length > 0 && !contentId) {
            let firstItem = reduceContent[0];
            if (firstItem?.isLocked) {
                setSearchParams({
                    contentId: reduceContent[0]?.contentId
                })
                setPickedType(reduceContent[0]?.type)
                setBodyTitle(reduceContent[0]?.title)
                setLocked(true)
                return;

            } else {
                setSearchParams({
                    contentId: reduceContent[0]?.contentId
                })
                setLocked(false)
                setPickedType(reduceContent[0]?.type)
                setContents(reduceContent[0]?.items)
                setBodyTitle(reduceContent[0]?.title)
                return;
            }


        } else {
            setContents([])
            setLocked(false)
            return;
        }
    }, [reduceContent, contentId])


    const handleCompleted = async (contentId, fileId, type) => {
        console.log({ contentId });
        setLoading(true)
        try {

            const { data, statusCode } = await markAsCompleted(userdata?.token, contentId, fileId, type)
            if (statusCode === 1) {
                setLoading(false)
                queryClient.invalidateQueries(["fetch domains"])
                console.log({ data });

            }
        } catch (error) {
            setLoading(false)
            console.log({ error });
        }



    }


    const handleFileCompleted = async (contentId, contentsId, type) => {
        // console.log("token", userdata?.token);
        setLoading(true)

        let ids = [];
        contentsId.map(content => {
            ids.push(content.fileId)

        })
        try {
            const { data, statusCode } = await markFileAsCompleted(userdata?.token, contentId, ids, type)
            if (statusCode === 1) {
                setLoading(false)
                queryClient.invalidateQueries(["fetch domains"])
                console.log({ data });

            }

        } catch (error) {
            setLoading(false)
            console.log({ error });
        }

        // console.log({ ids });



    }





    // console.log({ contentId });


    console.log({ modules });
    console.log({ reduceContent });
    console.log({ reduceItem });
    console.log({ contents });
    console.log({ totalItem });

    return (
        <Container>
            {isLoading && <Loader />}

            <Navbar>
                <div className='navbarright'>
                    <MenuButton onClick={e => setShowMobile(_ => true)}>
                        <MdMenu />
                    </MenuButton>
    
                    <h5 style={{ margin: 0 }}><Link to={`/student/console/myclasses`} style={{ color: "#fff" }}>Classroom</Link></h5>
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
                        setContents={setContents}
                        setPickedType={setPickedType}
                        reduceContent={reduceContent}
                        progress={totalItem}
                        setBodyTitle={setBodyTitle}
                        setLocked={setLocked}
                    // active={active} 
                    // setActive={setActive}
                    />
                </Backdrop>

                <Sidebar
                    isMobile={false} modules={modules}
                    setContents={setContents}
                    setPickedType={setPickedType}
                    reduceContent={reduceContent}
                    progress={totalItem}
                    setBodyTitle={setBodyTitle}
                    setLocked={setLocked}

                // active={active} 
                // setActive={setActive}

                />
                <ClassroomMain>
                    <ClassroomMainTop>
                        <Breadcrumbs separator={<MdNavigateNext />} aria-label="breadcrumb">
                            <BreadcrumbLink to="/student">
                                Dashboard
                            </BreadcrumbLink>
                            <BreadcrumbLink to="/student/console/myclasses">
                                {bootcampName?.length > 0 && bootcampName[0].bootcampName}
                            </BreadcrumbLink>
                            {bodyTitle &&
                                <BreadcrumbLink to="#" $isCurrentPage={true}>
                                    {bodyTitle}
                                </BreadcrumbLink>

                            }
                        </Breadcrumbs>
                    </ClassroomMainTop>
                    <ClassroomMainBody>
                        <BodyInfo>
                            <h3>{bodyTitle}</h3>
                            {/* <CustomButton>Ask tutor a question</CustomButton> */}
                        </BodyInfo>

                        <BodyContent>


                            {pickedType === "FILE_VIDEO" &&
                                <>
                                    {contents?.length > 0 && contents?.map((content, id) => (
                                        <>
                                            <FileComponent contentItem={content} id={id} key={id} />
                                            {/* <QuizAction >
                                                    <MarkButton display={content?.completedBy?.includes(userdata.id) ? true : false}
                                                    onClick={() => handleFileCompleted(content.contentId, content.fileId, "files")}
    
                                                >
                                                    Mark as Completed
                                                </MarkButton>
                                            </QuizAction> */}
                                        </>

                                    ))

                                    }

                                    <QuizAction >
                                        {
                                            loading ?
                                                (
                                                    <button className="button button-md log_btn w-100"
                                                        disabled={loading}>
                                                        <div className="spinner-border" role="status">
                                                            <span className="visually-hidden">Loading...</span>
                                                        </div>
                                                    </button>
                                                )
                                                :
                                                <MarkButton display={(contents?.filter(content => content?.completedBy?.includes(userdata.id))?.length === contents?.length) ? true : false}

                                                    onClick={() => handleFileCompleted(contents[0]?.contentId, contents, "files")}
                                                >
                                                    Mark as Completed
                                                </MarkButton>
                                        }
                                    </QuizAction>
                                </>

                            }

                            {pickedType === "NOTE" && <>
                                {/* {contents?.length > 0 && contents?.map((content, id) => ( */}
                                {contents?.length > 0 &&

                                    <>
                                        <NoteComponent contentItem={contents[contents.length - 1]}
                                        // id={id} key={id} 
                                        />

                                        <QuizAction >
                                            {
                                                loading ?
                                                    (
                                                        <button className="button button-md log_btn w-100"
                                                            disabled={loading}>
                                                            <div className="spinner-border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </div>
                                                        </button>
                                                    )
                                                    :
                                                    <MarkButton
                                                        display={contents[contents.length - 1]?.completedBy?.includes(userdata.id) ? true : false}
                                                        onClick={() => handleCompleted(contents[contents.length - 1]?.contentId, contents[contents.length - 1]?._id, "notes")}
                                                    >
                                                        Mark as Completed
                                                    </MarkButton>
                                            }
                                        </QuizAction>
                                    </>

                                }

                            </>
                            }

                            {pickedType === "QUIZ" &&
                                contents?.length > 0 &&
                                <>
                                    <QuizComponent contentItem={contents[contents.length - 1]} id={id} key={id} userdata={userdata} attemptedStatus={contents[contents.length - 1]?.attemptedBy?.includes(userdata.id) ? true : false} />
                                    <QuizAction >

                                        <MarkButton
                                            display={contents[contents.length - 1]?.attemptedBy?.includes(userdata.id) ? true : false}
                                        // onClick={() => handleFileCompleted(content.contentId, content._id)}
                                        >
                                            Mark as Completed
                                        </MarkButton>
                                    </QuizAction>
                                </>

                            }

                            {
                                contents?.length === 0 && !locked && <div className="console_empty">
                                    <p>Content is Empty</p>
                                </div>

                            }

                            {
                                locked &&

                                <div className="console_empty">
                                    <p>Module is Locked</p>
                                </div>
                            }

                            {/* {
                                !contentId && reduceContent?.length > 0 &&
                                <div className="console_empty">
                                    <p>Pick and Item</p>
                                </div>
                            } */}

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
        </Container >
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
            link: `/student/console/myclasses/class/${classId}/live-class`
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
import axios from "axios";
import { BodyActions, FileDisplay, FileName, NotecContainer, PaperTop } from ".";
import { Paper } from "@mui/material";
import { CustomButton } from "./components/Sidebar";
import { DocumentViewer, ViewModal } from "../../components/classConsole/File";
import ReactQuill from "react-quill";
import Accordion from 'react-bootstrap/Accordion';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { toast, ToastContainer } from 'react-toastify';
import { useMemo, useState } from "react";
import { useLocalStorage } from "../../../../hooks";
import { KEY } from "../../../../constants";
import { useAuth } from "../../../../contexts/Auth";
import { useSearchParams } from "react-router-dom";
import Loader from "../../../../components/Loader";
import styled from "styled-components";

// import Loader from '../../../../components/Loader';

const Contain = styled.div`
.boxinput{
    .green{
        color: green
    }

    .red{
        color: red
    }
    
    span {
        margin-left: .5rem;

    }
    
}
`

const BodyContainer = styled.div`
    background: var(--blue-ish);;
    padding: 1rem;
    border-radius: 10px;

`

const NoteComponent = ({ contentItem, index }) => {
    return (
        <NotecContainer>

            <BodyContainer>
                Question {index + 1}: <div dangerouslySetInnerHTML={{ __html: contentItem?.title }}></div>
                My Answer:<div dangerouslySetInnerHTML={{ __html: contentItem?.answer }}></div>
                <p>Correct Answer: {contentItem?.isCorrect}</p>
                <p>Scored: {contentItem?.score}/ {contentItem?.grade}</p>


            </BodyContainer>


        </NotecContainer>
    )
}

const FileComponent = ({ contentItem, index }) => {
    const [open, setOpen] = useState(false)

    const getExtention = (val) => {
        if ((val?.split('.')[val?.split('.')?.length - 1] === "png") || (val?.split('.')[val?.split('.')?.length - 1] === "jpg") || (val?.split('.')[val?.split('.')?.length - 1] === "jpeg") || (val?.split('.')[val?.split('.')?.length - 1] === "svg")) {
            return "image"
        } else if ((val?.split('.')[val?.split('.')?.length - 1] === "pdf")) {
            return "pdf"
        } else if ((val?.split('.')[val?.split('.')?.length - 1] === "pptx") || (val?.split('.')[val?.split('.')?.length - 1] === "ppt") || (val?.split('.')[val?.split('.')?.length - 1] === "doc") || (val?.split('.')[val?.split('.')?.length - 1] === "undefined") || (val?.split('.')[val?.split('.')?.length - 1] === "docx") || (val?.split('.')[val?.split('.')?.length - 1] === "xlsx") || ((val?.split('.')[val?.split('.')?.length - 1] === "csv") || (val?.split('.')[val?.split('.')?.length - 1] === "clsx"))) {
            return "doc"
        }
        else return "video"

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

    console.log({ contentItem });
    return (
        <div>
            <Paper variant='outlined' className="paper">
                <BodyContainer>
                    Question {index + 1}: <div dangerouslySetInnerHTML={{ __html: contentItem?.title }}></div>
                    <p>Scored: {contentItem?.score}/ {contentItem?.grade}</p>
                    <p>My Submission :</p>

                </BodyContainer>
                <PaperTop>
                    <div>
                        <BodyActions>
                            <CustomButton onClick={() => setOpen(true)}>Open</CustomButton>
                        </BodyActions>
                    </div>
                </PaperTop>




                <FileDisplay>
                    {getExtention(contentItem?.answer) === "image" ?
                        <div className="img">
                            <img src={`${process.env.REACT_APP_IMAGEURL}${contentItem?.answer}`} alt="" />

                        </div>
                        :

                        getExtention(contentItem?.answer) === "pdf" ?
                            <div className="pdf">
                                <DocumentViewer
                                    file={`https://res.cloudinary.com/gotocourse-us/image/upload/v1664205986/files/${contentItem?.answer}`}
                                    name={contentItem?.answer?.split(".")[0]?.split("_")?.join(" ")}
                                />

                            </div>
                            :
                            getExtention(contentItem?.answer) === "doc" ?
                                <div className="pdf">
                                    <DocumentViewer
                                        file={`https://res.cloudinary.com/gotocourse-us/raw/upload/v1664205986/files/${contentItem?.answer}`}
                                        name={contentItem?.answer?.split(".")[0]?.split("_")?.join(" ")}
                                    />

                                </div>
                                :

                                <video src={`${process.env.REACT_APP_VIDEOURL}${contentItem?.answer}`} controls controlsList="nodownload"></video>
                    }

                </FileDisplay>


            </Paper>

            <ViewModal
                open={open}
                setOpen={setOpen}
                file={`https://res.cloudinary.com/gotocourse-us/raw/upload/v1664205986/files/${contentItem?.contentItem?.answer}`}
                type={contentItem?.type}
                title={contentItem?.title}
            />

        </div>
    )
}

const QuizComponent = ({ contentItem, index }) => {
    return (
        <BodyContainer>
            <Contain>

                Question {index + 1}: <div dangerouslySetInnerHTML={{ __html: contentItem?.title }}></div>
                {
                    contentItem?.options.map((opt, i) => (
                        <div key={i} className={`boxinput `}>
                            <input type="checkbox" checked={opt?.selected} className={opt?.isAnswer === true ? "green" : opt?.selected && opt?.isAnswer === true ? "green" : opt?.selected && opt?.isAnswer === false ? "red" : ""} />
                            <span className={opt?.isAnswer === true ? "green" : opt?.selected && opt?.isAnswer === true ? "green" : opt?.selected && opt?.isAnswer === false ? "red" : ""}>{opt?.title}</span>
                        </div>

                    ))
                }
                <p>Score: {contentItem?.score}</p>


            </Contain>
        </BodyContainer>


    )
}

const ConsoleAnswer = () => {
    const [assessment, setAssessment] = useState([])
    const [results, setResults] = useState({})
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    const [searchParams, setSearchParams] = useSearchParams();


    const { generalState: { isMobile }, consoleFunctions: { fetchAssessments } } = useAuth();


    const { isLoading } = useQuery(["fetch my assessments"], () => fetchAssessments(userdata?.token), {
        onSuccess: ({ data }) => {
            setAssessment(data)

        }
    })

    const classId = searchParams.get("classId")
    const contentId = searchParams.get("contentId")


    const gettingResult = useMemo(() => {
        let data = assessment?.find(assess => assess?.classId === classId && assess?.contentId === contentId)
        return setResults(data)
    }, [assessment, classId, contentId])

    const score = useMemo(() => {
        return results?.questions?.reduce((total, current) => total + current?.grade, 0)

    }, [gettingResult, results])



    return (
        <>
            {isLoading ? <Loader /> :
                results?.questions?.length > 0 ?
                    <div>
                        <div className="px-4 d-flex justify-content-end">
                            <button className="button py-2 px-2">scored: {results?.totalScore}/{score}</button>
                        </div>
                        {results?.questions?.map((result, index) => {
                            if (result.type === "THEORY") {
                                return <NoteComponent contentItem={result} key={index} index={index} />
                            } else if (result.type === "MULTIPLE_CHOICE") {
                                return <QuizComponent contentItem={result} key={index} index={index} />
                            } else {
                                return <FileComponent contentItem={result} key={index} index={index} />

                            }
                        })
                        }

                    </div>


                    :
                    <>
                        <p>No result Available</p>

                    </>
            }
        </>
    )
}

export default ConsoleAnswer
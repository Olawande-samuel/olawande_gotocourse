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
import Note from "../../components/classConsole/Note";
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

const NoteComponent = (contentItem, index) => {
 
    return (
        <NotecContainer>

            <div>
                Question {index + 1}: <div dangerouslySetInnerHTML={{ __html: contentItem?.contentItem?.title }}></div>
                My Answer:<div dangerouslySetInnerHTML={{ __html: contentItem?.contentItem?.answer }}></div>
                <p>Correct Answer: {contentItem?.contentItem?.isCorrect}</p>
                <p>Score: {contentItem?.contentItem?.score}</p>


            </div>


        </NotecContainer>
    )
}

const FileComponent = (contentItem) => {
    const [open, setOpen] = useState(false)

    const getExtention = (val) => {
        console.log({ val });
        console.log((val?.split('/')[val?.split('.')?.length - 1] === "docx"));

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

    console.log(getExtention(contentItem?.contentItem?.answer));
    return (
        <div>
            <Paper variant='outlined' className="paper">
                {
                    // !(getExtention(contentItem?.contentItem?.type) === "pdf") &&
                    <PaperTop>
                        <div>
                            <BodyActions>
                                {/* <IconButton>
                                    {contentItem?.contentItem?.downloadable && <BiCloudDownload onClick={() => downloadContent(contentItem.contentItem.fileName, contentItem.contentItem.title, contentItem.contentItem.type)} />}
                                </IconButton> */}
                                <CustomButton onClick={() => setOpen(true)}>Open</CustomButton>
                            </BodyActions>
                        </div>
                    </PaperTop>

                }

                <FileName>
                    {(getExtention(contentItem?.contentItem?.answer) !== "pdf" || (getExtention(contentItem?.contentItem?.type) !== "doc")) && <div dangerouslySetInnerHTML={{ __html: contentItem?.contentItem?.answer?.split("-").join(" ").split("_").join(" ") }}></div>}

                </FileName>

                <FileDisplay>
                    {getExtention(contentItem?.contentItem?.answer) === "image" ?
                        <div className="img">
                            <img src={`${process.env.REACT_APP_IMAGEURL}${contentItem?.contentItem?.answer}`} alt="" />

                        </div>
                        :

                        getExtention(contentItem?.contentItem?.answer) === "pdf" ?
                            <div className="pdf">
                                <DocumentViewer
                                    file={`https://res.cloudinary.com/gotocourse-us/image/upload/v1664205986/files/${contentItem?.contentItem?.answer}`}
                                    name={contentItem?.contentItem?.answer?.split(".")[0]?.split("_")?.join(" ")}
                                />

                            </div>
                            :
                            getExtention(contentItem?.contentItem?.answer) === "doc" ?
                                <div className="pdf">
                                    <DocumentViewer
                                        file={`https://res.cloudinary.com/gotocourse-us/raw/upload/v1664205986/files/${contentItem?.contentItem?.answer}`}
                                        name={contentItem?.contentItem?.answer?.split(".")[0]?.split("_")?.join(" ")}
                                    />

                                </div>
                                :

                                <video src={`${process.env.REACT_APP_VIDEOURL}${contentItem?.contentItem?.answer}`} controls controlsList="nodownload"></video>
                    }

                </FileDisplay>


            </Paper>

            <ViewModal
                open={open}
                setOpen={setOpen}
                file={`https://res.cloudinary.com/gotocourse-us/raw/upload/v1664205986/files/${contentItem?.contentItem?.answer}`}
                type={contentItem?.contentItem?.type}
                title={contentItem?.contentItem?.title}
            />

        </div>
    )
}

const QuizComponent = ({ contentItem, index }) => {
    return (
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


    useMemo(() => {
        let data = assessment?.find(assess => assess?.classId === classId && assess?.contentId === contentId)
        return setResults(data)
    }, [assessment, classId, contentId])


    return (
        <>
            {isLoading ? <Loader /> :

                results?.questions?.length > 0 ? results?.questions?.map((result, index) => {
                    if (result.type === "THEORY") {
                        return <NoteComponent contentItem={result} key={index} i={index} />
                    } else if (result.type === "MULTIPLE_CHOICE") {
                        return <QuizComponent contentItem={result} key={index} index={index} />
                    } else {
                        return <FileComponent contentItem={result} key={index} i={index} />

                    }
                })

                    :
                    <>
                        <p>No result Available</p>

                    </>
            }
        </>
    )
}

export default ConsoleAnswer
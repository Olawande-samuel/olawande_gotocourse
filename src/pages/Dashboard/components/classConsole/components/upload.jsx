import { useRef, useState } from "react"
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import clsx from "../../../../../components/globalStyles.module.css";
import { useAuth } from "../../../../../contexts/Auth";
import { AdvancedError } from "../../../../../classes";
import { useLocalStorage } from "../../../../../hooks";
import { KEY } from "../../../../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";



const UploadForm = ({ isOpen, setIsOpen, setPreviewImage, uploadType }) => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient()
    const [progress, setProgress] = useState(0)
    const { adminFunctions: { uploadFile }, consoleFunctions: { addFile } } = useAuth();
    const { getItem } = useLocalStorage();
    const value = getItem(KEY);
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const contentId = searchParams.get("content")
    const [filename, setFilename] = useState("")
    const { classId } = useParams()

    async function uploadFileHandler(e) {
        setLoading(true)
        const formdata = new FormData();
        formdata.append('file', file, file.name);
        console.log(file.name)


        var ajax = new XMLHttpRequest();

        // ajax.upload.addEventListener("progress", progressHandler, false);
        // ajax.addEventListener("load", completeHandler, false);
        // ajax.addEventListener("error", errorHandler, false);
        // ajax.addEventListener("abort", abortHandler, false);
        // ajax.open("POST", `${process.env.REACT_APP_BASEURL}/file/upload`);
        // ajax.setRequestHeader("Authorization",  "Bearer " + value.token); 
        // ajax.send(formdata);

        // cloudinary.uploader.upload(file, { upload_preset: "my_preset" }, (error, result) => {
        //     console.log(result, error);
        // });

      




    }


    function progressHandler(event) {
        console.log({ event })
        var percent = (event.loaded / event.total) * 100;
        console.log(percent)
        setProgress(Math.round(percent) + "% uploaded... please wait")
        // _("progressBar").value = Math.round(percent);
        // _("status").innerHTML = Math.round(percent) + "% uploaded... please wait";
    }

    function completeHandler(event) {
        setLoading(false)

        console.log(JSON.parse(event.target.response))

        let { data, message } = JSON.parse(event.target.response)
        toast.success(message)
        createFileContent(data.name, data.fileId, file.name)
        setIsOpen(false)
        setProgress(0); //wil clear progress bar after successful upload
    }

    function errorHandler(event) {
        setLoading(false)
        console.error(event)
        toast.error(event.message)
    }

    function abortHandler(event) {
        setLoading(false)
    }


    const mutation = useMutation(([token, data]) => addFile(token, data), {
        onSuccess: (res) => {
            console.log(res)
            setData(null)
            setFile(null)
            setImageUrl(null)
            queryClient.invalidateQueries("file content")
        },
        onError: (err) => console.error(err)
    })

    // create content after upload

    function createFileContent(file, fileId, fileName) {
        if (uploadType === "content") {
            // call file upload function
            mutation.mutate([value?.token, {
                classId,
                contentId,
                fileName: file,
                title: filename ? filename : fileName
            }])
        }
    }

    async function copy(_source) {
        await window.navigator.clipboard.writeText(_source);
        toast.success("Copied successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true
        })
    }

    function triggerUpload(e) {
        e.stopPropagation();
        let input = document.getElementById("uploadFile");
        input.click();
    }

    function changeHandler(e) {
        const { files } = e.target;
        if (files?.length !== 0) {
            setFile(_ => files[0]);

            setImageUrl(_ => {
                return URL.createObjectURL(files[0]);
            })
            setPreviewImage(URL.createObjectURL(files[0]))
        }
    }

    return (
        isOpen &&
        (
            <UploadFormContent
                setIsOpen={setIsOpen}
                data={data}
                triggerUpload={triggerUpload}
                changeHandler={changeHandler}
                file={file}
                imageUrl={imageUrl}
                loading={loading}
                copy={copy}
                uploadFileHandler={uploadFileHandler}
                filename={filename}
                setFilename={setFilename}
                progress={progress}
                setFile={setFile}
                setImageUrl={setImageUrl}
            />
        )
    )
}

export function UploadFormContent({ setIsOpen, setFile, setImageUrl, data, progress, triggerUpload, changeHandler, file, imageUrl, loading, copy, uploadFileHandler, filename, setFilename }) {
    return (
        <div className={clsx.upload_file__background} onClick={e => {
            if (e.target === e.currentTarget) {
                setIsOpen(_ => false);
                setFile(null)
                setImageUrl(false)
            }
        }}>
            <div className={clsx.uploda_file__container}>
                {data &&
                    <>

                        <input className="w-100" style={{ cursor: "pointer" }} type="text" readOnly value={data} onClick={e => copy(e.currentTarget.value)} />
                    </>
                }
                {
                    file &&
                    <>
                        <input type="text" name="filename" id="filename" className="form-control mb-4" placeholder="Enter file name" value={filename} onChange={(e) => setFilename(e.target.value)} />
                        {/* <h5 className="fw-bold" style={{color:"var(--theme-orange)", fontSize:"16px"}}>Click on Upload button</h5> */}
                    </>
                }
                {
                    !file &&
                    <div className={clsx.upload_file} onClick={triggerUpload}>
                        <input type="file" onChange={changeHandler} id="uploadFile" />
                        <h5 className="text-dark ">Choose a file </h5>

                    </div>
                }

                {imageUrl && (
                    <div className={clsx.upload_final}>
                        {loading ? <>
                            <div className="spinner-border text-primary" role="status" style={{ width: "4rem", height: "4rem" }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <small>{progress}</small>
                        </>
                            :
                            <button onClick={uploadFileHandler} style={{ background: "var(--theme-blue)", color: "#Fff" }} >Upload</button>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}



export default UploadForm;
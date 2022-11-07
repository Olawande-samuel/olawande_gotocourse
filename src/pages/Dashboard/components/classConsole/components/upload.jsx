import {useState} from "react"
import {toast} from "react-toastify";
import {useNavigate, useParams, useSearchParams} from "react-router-dom";

import clsx from "../../../../../components/globalStyles.module.css";
import {useAuth} from "../../../../../contexts/Auth";
import { AdvancedError } from "../../../../../classes";
import { useLocalStorage } from "../../../../../hooks";
import { KEY } from "../../../../../constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";




const UploadForm = ({isOpen, setIsOpen, setPreviewImage, uploadType }) => {

    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient()

    const {adminFunctions: {uploadFile}, consoleFunctions: {addFile}} = useAuth();
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
    const contentId = searchParams.get("content")

    const {classId} = useParams()

    async function uploadFileHandler(e){
        try{
            setLoading(true)
            const formdata = new FormData();
            formdata.append('file', file, file.name);
            const res = await uploadFile(formdata, value?.token);
            setLoading(false)

            const {success, message, statusCode} = res;
            if(!success || statusCode !== 1) throw new AdvancedError(message, statusCode);
            else {

                const {data} = res;
                createFileContent(data.name, data.fileId)
                setIsOpen(false)
                setData(_ => data.name);
                toast.success(message)
            }
        }catch(err){
            console.error(err.statusCode)
            setLoading(false)
            toast.error(err.message)
            if(err.statusCode === 2){
                localStorage.clear()
                // navigate("/")
            }
        }

    }

    const mutation = useMutation(([token, data])=>addFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            setData(null)
            setFile(null)
            setImageUrl(null)
            queryClient.invalidateQueries("file content")
        },
        onError: (err)=> console.error(err)
    })

    // create content after upload

    function createFileContent(file){
        if(uploadType === "content"){
            // call file upload function
            mutation.mutate([value?.token, {
                classId,
                contentId,
                fileName:file,
                title:"File"
            }])
        }
    }

    async function copy(_source){
        await window.navigator.clipboard.writeText(_source);
        toast.success("Copied successfully",{
            position:"top-right",
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop:false,
            closeOnClick: true,
            rtl:false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true
        })
    }

    function triggerUpload(e){
        e.stopPropagation();
        let input = document.getElementById("uploadFile");
        input.click();
    }

    function changeHandler(e){
        const {files} = e.target;
        if(files?.length !== 0){
            setFile(_ => files[0]);

            setImageUrl(_ => {
                return URL.createObjectURL(files[0]);
            })
            setPreviewImage(URL.createObjectURL(files[0]))
        }
    }

    return(
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
            />
        )
    )
}

export function UploadFormContent({setIsOpen, data, triggerUpload, changeHandler, file, imageUrl, loading, copy, uploadFileHandler}){
    return (
        <div className={clsx.upload_file__background} onClick={e => {
            if(e.target === e.currentTarget) {
                setIsOpen(_ => false);
            }
        }}>
            <div className={clsx.uploda_file__container}>
                {data && 
                <>
            
                <input className="w-100" style={{cursor: "pointer"}} type="text" readOnly value={data} onClick={e => copy(e.currentTarget.value)} />
                </>
                }
                <div className={clsx.upload_file} onClick={triggerUpload}>
                    <input type="file" onChange={changeHandler} id="uploadFile" />
                    {
                        file ? 
                        <>
                            <h5 className="fw-bold" style={{color:"var(--theme-orange)"}}>Click on Upload button</h5>
                        </>
                         :
                         <h5 className="text-dark ">Choose a file </h5>
                    
                    }
                </div>

                {imageUrl && (
                    <div className={clsx.upload_final}>
                        {loading ? 
                        <div className="spinner-border text-primary" role="status" style={{width:"4rem", height:"4rem"}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button onClick={uploadFileHandler} style={{background: "var(--theme-blue)", color:"#Fff"}} >Upload</button>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}



export default UploadForm;
import {useState} from "react"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

import clsx from "./globalStyles.module.css";
import {useAuth} from "../contexts/Auth";
import { AdvancedError } from "../classes";
import { useLocalStorage } from "../hooks";
import { KEY } from "../constants";




const UploadForm = ({isOpen, setIsOpen, setPreviewImage }) => {
    const navigate = useNavigate()

    const {adminFunctions: {uploadFile}} = useAuth();
    const {getItem} = useLocalStorage();
    const value = getItem(KEY);
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false)
 

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
                setData(_ => data.name);
                toast.success(message,{
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
        }catch(err){
            console.error(err.statusCode)
            setLoading(false)
            toast.error(err.message,{
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
            if(err.statusCode === 2){
                localStorage.clear()
                // navigate("/")
            }
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
        (<div className={clsx.upload_file__background} onClick={e => {
            if(e.target === e.currentTarget) {
                setIsOpen(_ => false);
                setFile(null)

            }
        }}>
            <div className={clsx.uploda_file__container}>
                {data && 
                <>
                <small className="d-block text-danger">Click the button below to copy file name</small>
                <small className="d-block text-danger">Paste content in the appropriate field</small>
                <input className="w-100" style={{cursor: "pointer"}} type="text" readOnly value={data} onClick={e => copy(e.currentTarget.value)} />
                </>
                }
                <div className={clsx.upload_file} onClick={triggerUpload}>
                    <input type="file" onChange={changeHandler} id="uploadFile" />
                    {imageUrl ? <img src={imageUrl} alt="Preview" /> : (<>
                    <h5 className="text-dark">Click to Upload</h5>
                    {/* <p>Only jpeg, jpg, png images are allowed</p> */}
                    </>) }
                </div>

                {imageUrl && (
                    <div className={clsx.upload_final}>
                        {loading ? 
                        <div className="spinner-border text-primary" role="status" style={{width:"4rem", height:"4rem"}}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        :
                        <button onClick={uploadFileHandler}>Upload</button>
                        }
                    </div>
                )}
            </div>
        </div>)
    )
}



export default UploadForm;
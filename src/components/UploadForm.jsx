import {useState} from "react"
import {toast} from "react-toastify";

import clsx from "./globalStyles.module.css";
import {useAuth} from "../contexts/Auth";
import { AdvancedError } from "../classes";





const UploadForm = ({isOpen, setIsOpen}) => {
    const {adminFunctions: {uploadFile}, generalState: {userdata}} = useAuth();
    const [imageUrl, setImageUrl] = useState(null);
    const [file, setFile] = useState(null);
    const [data, setData] = useState(null);



    async function uploadFileHandler(e){
        try{
            const formdata = new FormData();
            formdata.append('image', file, file.name);
            const res = await uploadFile(formdata, userdata?.token);
            console.log(res);   
            const {success, message, statusCode} = res;
            if(!success) throw new AdvancedError(message, statusCode);
            else {
                const {data} = res;
                console.log(data);
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
        console.log(input);
        input.click();
    }

    function changeHandler(e){
        const {files} = e.target;
        if(files?.length !== 0){
            setFile(_ => files[0]);
            setImageUrl(_ => {
                return URL.createObjectURL(files[0]);
            })
        }
    }

    return(
        isOpen && 
        (<div className={clsx.upload_file__background} onClick={e => {
            if(e.target === e.currentTarget) {
                console.log("Reached")
                setIsOpen(_ => false);
            }
        }}>
            <div className={clsx.uploda_file__container}>
                {data && <input type="text" readOnly value={data} onClick={e => copy(e.currentTarget.value)} />}
                <div className={clsx.upload_file} onClick={triggerUpload}>
                    <input type="file" onChange={changeHandler} id="uploadFile" />
                    {imageUrl ? <img src={imageUrl} alt="Preview" /> : (<>
                    <h5>Click to Upload</h5>
                    <p>Only jpeg, jpg, png images are allowed</p>
                    </>) }
                </div>

                {imageUrl && (
                    <div className={clsx.upload_final}>
                        <button onClick={uploadFileHandler}>Upload</button>
                    </div>
                )}
            </div>
        </div>)
    )
}



export default UploadForm;
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import clsx from "../../../../../components/globalStyles.module.css";


const UploadWidget = ({ fileUrl, setFileUrl, setFileData, type}) => {
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);

    useEffect(() => {
        cloudinaryRef.current = window?.cloudinary;

        console.log(cloudinaryRef?.current);
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: "ml_default", folder: "files",
        }, function (error, result) {
            if (result.event === "success") {
                console.log(result?.info?.secure_url);
                let ext = result?.info?.secure_url.split("/");
                let extension = ext[ext.length -1]
                console.log({extension});
                setFileUrl(extension)
                if(type === "console"){
                    setFileData(result.info)
                }
                return;
            }
            console.log(error);
        })
    }, [])

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

    return (
        <>
            <button onClick={() => {
                setFileUrl("")
                widgetRef?.current.open()

            }} style={{ color: "red", border: " none", outline: "none", padding: ".5rem" }}>Click to Upload file</button>


            {fileUrl &&
                <>

                    <input className="w-100" style={{ cursor: "pointer" }} type="text" readOnly value={fileUrl} onClick={e => copy(e.currentTarget.value)} />
                </>
            }

        </>
    )
}

export default UploadWidget 
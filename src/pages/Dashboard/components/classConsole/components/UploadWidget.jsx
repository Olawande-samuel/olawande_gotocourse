import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react"
import { toast } from "react-toastify";
import clsx from "../../../../../components/globalStyles.module.css";
import { KEY } from "../../../../../constants";
import { useAuth } from "../../../../../contexts/Auth";
import { useLocalStorage } from "../../../../../hooks";


const UploadWidget = ({ fileUrl, setFileUrl, setUploadData, type, theme}) => {
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);
    const {getItem} = useLocalStorage();
    const userdata = getItem(KEY)
    const {otherFunctions: {addNewFile}} = useAuth()

    const addToFile = useMutation(([token, data])=> addNewFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
            if(res.statusCode === 1){
                setUploadData(res.data)
                console.log("setting done")
            }
        },
        onError: err => console.error(err)
    })

    console.log({setUploadData})
    useEffect(() => {
        cloudinaryRef.current = window?.cloudinary;

        console.log(cloudinaryRef?.current);
        widgetRef.current = cloudinaryRef?.current?.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: "ml_default",
            folder: "files",
            sources: ["local"]

        }, function (error, result) {
            if (result.event === "success") {
                console.log({result});
                console.log(result?.info);
                let ext = result?.info?.secure_url.split("/");
                let extension = ext[ext.length -1]
                console.log({extension});
                setFileUrl(extension)
                addToFile.mutate([userdata.token, {
                    fileName: extension,
                    mimeType: result.info.resource_type +"/"+ result.info.format,
                    fileSize: result.info.bytes,
                    originalName:result.info.public_id.split("/")[1],
                    location:"/files",
                    uploadedBy:userdata.id
                }])
              
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
    console.log({theme})

    return (
        <>
            <button onClick={() => {
                setFileUrl("")
                widgetRef?.current.open()

            }} style={{ color: theme ? theme : "red", border: " none", outline: "none", padding: ".5rem" }}>Click to Upload file</button>

            {type !== "console" &&

                fileUrl &&
                <div className="my-2">
                    <label htmlFor="copy" className="form-label generic_label">Click on the text below to copy file image name</label>
                    <input id="copy" className="w-100 form-control" style={{ cursor: "pointer" }} type="text" readOnly value={fileUrl} onClick={e => copy(e.currentTarget.value)} />
                </div>
            }

        </>
    )
}

export default UploadWidget 
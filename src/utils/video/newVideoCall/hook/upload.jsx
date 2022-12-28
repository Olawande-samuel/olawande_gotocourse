import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../contexts/Auth";

const useRecordUpload =  (token, roomID) => {

    
    const [progress, setProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({})
    const {classId} = useParams()
    const {adminFunctions: {uploadFile}, teacherConsoleFunctions: {addFile}} = useAuth();
    
    console.log({classId})

    const postVideoToServer = async (videoblob) => {
        setLoading(true)

        const videoData = new FormData();
        videoData.append('file', videoblob, new Date().getTime());

        var ajax = new XMLHttpRequest();

        ajax.upload.addEventListener("progress", progressHandler, false);
        ajax.addEventListener("load", completeHandler, false);
        ajax.addEventListener("error", errorHandler, false);
        ajax.addEventListener("abort", abortHandler, false);
        ajax.open("POST", `${process.env.REACT_APP_BASEURL}/file/upload`);
        ajax.setRequestHeader("Authorization",  "Bearer " + token); 
        ajax.send(videoData);
    }

    function progressHandler(event) {
        console.log({event})
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
        setAlert({type: "success",  message})
        createFileContent(data.fileId)
        // setIsOpen(false)
        // setProgress(0); //wil clear progress bar after successful upload
    }
      
    function errorHandler(event) {
        setLoading(false)
        console.error(event)
        setAlert({type: "error",  message: event.message})
        // toast.error(event.message)
    }
    
    function abortHandler(event) {
        setLoading(false)
    }


    const mutation = useMutation(([token, data])=>addFile(token, data), {
        onSuccess: (res)=> {
            console.log(res)
        },
        onError: (err)=> console.error(err)
    })

    
    function createFileContent(file){
            // call file upload function
            mutation.mutate([token, {
                classId,
                fileId:file,
            }])
        
    }
    return {
        loading, 
        postVideoToServer,
        alert,
        progress,

    }
}

export default useRecordUpload
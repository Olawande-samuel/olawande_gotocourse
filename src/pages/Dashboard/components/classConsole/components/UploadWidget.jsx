import { useEffect, useRef } from "react"


const UploadWidget = () => {
    const cloudinaryRef = useRef(null);
    const widgetRef = useRef(null);

    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;

        console.log(cloudinaryRef.current);
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUD_NAME,
            uploadPreset: "",
            //     api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
            //     api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
        }, function (error, result) {
            if (result) {
                console.log({ result });
                return;
            }
            console.log(error);
        })
    }, [])

    return (
        <>
            <button onClick={() => widgetRef.current.open()} style={{ color: "red" }}>Click to Upload images</button>
        </>
    )
}

export default UploadWidget 
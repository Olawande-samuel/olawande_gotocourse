import clsx from "./styles.module.css";
import vector from "../../../../images/vector.png";
import React from "react";
import UploadForm from "../../../../components/UploadForm-new";
import Image from "../../../../components/Image";
import { Typography } from "@mui/material";

const CustomizeBanner = ({ onSubmit, oldBanner }) => {
    const [openImage, setOpenImage] = React.useState(false);

    function showUploadFormHandler() {
        setOpenImage((_) => true);
    }

    return (
        <>
            {oldBanner && <Image image={oldBanner} alt={"School Banner"} />}
            <form onSubmit={onSubmit}>
                <UploadForm
                    isOpen={openImage}
                    setIsOpen={setOpenImage}
                    onUpload={onSubmit}
                />
                <div
                    className={clsx.upload_file_box}
                    onClick={showUploadFormHandler}
                >
                    <img src={vector} alt={"Placeholder"} />
                    <Typography
                        style={{ fontWeight: "bold", textAlign: "center" }}
                    >
                        Upload a Banner
                    </Typography>
                    <Typography
                        style={{ textAlign: "center" }}
                        variant={"body2"}
                    >
                        {"Recommended format 250 by 60 pixels (jpeg or png)"}
                    </Typography>
                </div>
            </form>
        </>
    );
};

export default CustomizeBanner;

import { Button, Typography } from "@mui/material";
import React from "react";
import clsx from "./styles.module.css";

const CustomizeHeader = ({ onSubmit, oldHeader, oldSubheader }) => {
    const [header, setHeader] = React.useState(oldHeader);
    const [subheader, setSubheader] = React.useState(oldSubheader);

    const handleChangeHeader = (e) => {
        e.preventDefault();
        setHeader(e.target.value);
    };

    const handleChangeSubheader = (e) => {
        e.preventDefault();
        setSubheader(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ header, subheader });
    };

    return (
        <>
            <div className={clsx["header_text_field_div"]}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        color: "var(--text-light)",
                    }}
                >
                    <Typography className={clsx.header_text_label}>
                        H1 - Header One
                    </Typography>
                    <Typography variant="body2">
                        Recommended word length: 16
                    </Typography>
                </div>
                <input
                    className={clsx.header_text_field}
                    value={header}
                    type="text"
                    onChange={handleChangeHeader}
                />
            </div>
            <div className={clsx["header_text_field_div"]}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        color: "var(--text-light)",
                    }}
                >
                    <Typography className={clsx.header_text_label}>
                        Sub Title
                    </Typography>
                    <Typography variant="body2">
                        Recommended word length: 16
                    </Typography>
                </div>
                <input
                    className={clsx.header_text_field}
                    value={subheader}
                    type="text"
                    onChange={handleChangeSubheader}
                />
            </div>
            <div className={clsx.header_save_button_div}>
                <Button
                    className={clsx.header_save_button}
                    fullWidth
                    onClick={handleSubmit}
                >
                    Save
                </Button>
            </div>
        </>
    );
};

export default CustomizeHeader;

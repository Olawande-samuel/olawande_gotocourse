import { Button, Typography } from "@mui/material";
import React from "react";
import clsx from "./styles.module.css";

const CustomizeWhyOurSchool = ({ onSubmit, oldWhyOurSchool }) => {
    const [whyOurSchool, setWhyOurSchool] = React.useState(oldWhyOurSchool);

    const handleChangeWhyOurSchool = (e) => {
        e.preventDefault();
        setWhyOurSchool(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(whyOurSchool);
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
                        Why our school
                    </Typography>
                    <Typography variant="body2">
                        Recommended word length: 60
                    </Typography>
                </div>
                <textarea
                    className={clsx.header_text_field}
                    value={whyOurSchool}
                    onChange={handleChangeWhyOurSchool}
                    style={{ height: "200px" }}
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

export default CustomizeWhyOurSchool;

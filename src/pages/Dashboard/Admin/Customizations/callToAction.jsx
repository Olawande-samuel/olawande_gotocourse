import { Button, Checkbox, Input, TextField, Typography } from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import clsx from "./styles.module.css";

const CustomizeCallToAction = ({ onSubmit, oldCallToAction }) => {
    const [callToAction, setCallToAction] = React.useState(oldCallToAction);

    const handleChangeCTAText = (e) => {
        e.preventDefault();
        setCallToAction({ ...callToAction, text: e.target.value });
    };

    const handleChangeCTAColor = (value) => {
        setCallToAction({ ...callToAction, color: value });
    };

    const handleChangeCTAActive = (e) => {
        e.preventDefault();
        setCallToAction({ ...callToAction, active: e.currentTarget.checked });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!callToAction?.text) {
            toast.error("Call to Action Text is empty", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: false,
                pauseOnHover: false,
            });
            return;
        }
        if (!callToAction?.color) {
            toast.error("You haven't picked a color", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                newestOnTop: false,
                closeOnClick: true,
                rtl: false,
                pauseOnFocusLoss: true,
                draggable: false,
                pauseOnHover: false,
            });
            return;
        }
        onSubmit(callToAction);
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
                        Call To Action Button
                    </Typography>
                    <Typography variant="body2">
                        Recommended word length: 3 words
                    </Typography>
                </div>
                <input
                    className={clsx.header_text_field}
                    value={callToAction?.text || ""}
                    onChange={handleChangeCTAText}
                    type={"text"}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    padding: "10px 5px",
                    alignItems: "center",
                }}
            >
                {["#0C2191", "#0C9111", "#C21000"].map((value, index) => (
                    <div
                        key={index}
                        style={{
                            background: value,
                            width: "20px",
                            height: "20px",
                            marginRight: "20px",
                            ...(value === callToAction?.color
                                ? { border: "5px solid #ababab" }
                                : {}),
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            handleChangeCTAColor(value);
                        }}
                    />
                ))}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "30px",
                    }}
                >
                    <Checkbox
                        size="small"
                        checked={callToAction?.active || false}
                        onChange={handleChangeCTAActive}
                    />
                    <Typography className={clsx.header_text_label}>
                        Active
                    </Typography>
                </div>
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

export default CustomizeCallToAction;

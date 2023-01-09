import {
    Button,
    Card,
    CardActions,
    CardContent,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import clsx from "./styles.module.css";

function AddOrEditDialog({
    open,
    setOpen,
    activeFAQ,
    setActiveFAQ,
    index,
    FAQs,
    setFAQs,
}) {
    function handleSubmit(e) {
        e.preventDefault();
        const temp = [...FAQs];
        if (index >= 0) {
            temp.splice(index, 1, activeFAQ);
        } else {
            temp.push(activeFAQ);
        }
        setFAQs(temp);
        setOpen(false);
    }

    return (
        <>
            <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
                <DialogTitle
                    style={{
                        fontWeight: "bold",
                        color: "var(--theme-blue)",
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    {index >= 0 ? "Edit FAQ" : "Add FAQ"}
                    <IconButton
                        onClick={(e) => {
                            e.preventDefault();
                            setOpen(false);
                        }}
                    >
                        <MdCancel color="error" />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
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
                                Question
                            </Typography>
                        </div>
                        <input
                            className={clsx.header_text_field}
                            value={activeFAQ?.question || ""}
                            onChange={(e) => {
                                e.preventDefault();
                                setActiveFAQ({
                                    ...activeFAQ,
                                    question: e.target.value,
                                });
                            }}
                            type={"text"}
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
                                Answer
                            </Typography>
                            <Typography variant="body2">
                                Recommended word length: 20 words
                            </Typography>
                        </div>
                        <textarea
                            className={clsx.header_text_field}
                            value={activeFAQ?.answer || ""}
                            onChange={(e) => {
                                e.preventDefault();
                                setActiveFAQ({
                                    ...activeFAQ,
                                    answer: e.target.value,
                                });
                            }}
                            rows={50}
                            style={{ width: "100%", height: "200px" }}
                        />
                    </div>
                </DialogContent>
                <DialogActions
                    style={{
                        color: "var(--theme-blue)",
                        padding: "0 24px 20px",
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{
                            color: "var(--white)",
                            background: "var(--theme-blue)",
                        }}
                    >
                        {index >= 0 ? "Submit" : "Add"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const CustomizeFAQs = ({ onSubmit, oldFAQs }) => {
    const [FAQs, setFAQs] = React.useState(oldFAQs);
    const [activeFAQ, setActiveFAQ] = React.useState();
    const [activeFAQIndex, setActiveFAQIndex] = React.useState();
    const [openDialog, setOpenDialog] = React.useState(false);

    const deleteFAQ = (index) => {
        const temp = [...FAQs];
        temp.splice(index, 1);
        setFAQs(temp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(FAQs);
    };

    return (
        <>
            <div
                style={{ display: "flex", margin: "10px 0", flexWrap: "wrap" }}
            >
                {FAQs.map((faq, index) => (
                    <Card
                        key={index}
                        style={{ width: "200px", margin: "10px" }}
                    >
                        <CardContent>{faq.question}</CardContent>
                        <CardActions
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <Button
                                variant="text"
                                style={{ color: "var(--theme-blue)" }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveFAQ(faq);
                                    setActiveFAQIndex(index);
                                    setOpenDialog(true);
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                variant="text"
                                color="error"
                                onClick={(e) => {
                                    e.preventDefault();
                                    deleteFAQ(index);
                                }}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </div>
            <div
                className={clsx["header_text_field_div"]}
                style={{ color: "var(--theme-blue)" }}
            >
                <Button
                    className={clsx.header_text_label}
                    variant="text"
                    color="inherit"
                    size="large"
                    style={{
                        textTransform: "none",
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        setOpenDialog(true);
                        setActiveFAQ(undefined);
                        setActiveFAQIndex(undefined);
                    }}
                >
                    <div
                        style={{
                            alignItems: "center",
                            display: "flex",
                            padding: "0 10px",
                        }}
                    >
                        <Typography fontWeight={"bold"}>Add new FAQ</Typography>
                        <IoMdAddCircle
                            size={"25px"}
                            fontWeight={"bold"}
                            style={{ marginLeft: "5px" }}
                        />
                    </div>
                </Button>
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

            <AddOrEditDialog
                activeFAQ={activeFAQ}
                setActiveFAQ={setActiveFAQ}
                index={activeFAQIndex}
                FAQs={FAQs}
                setFAQs={setFAQs}
                open={openDialog}
                setOpen={setOpenDialog}
            />
        </>
    );
};

export default CustomizeFAQs;

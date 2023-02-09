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
    activeTestimonial,
    setActiveTestimonial,
    index,
    testimonials,
    setTestimonials,
}) {
    function handleSubmit(e) {
        e.preventDefault();
        const temp = [...testimonials];
        if (index >= 0) {
            temp.splice(index, 1, activeTestimonial);
        } else {
            temp.push(activeTestimonial);
        }
        setTestimonials(temp);
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
                    {index >= 0 ? "Edit Testimonial" : "Add Testimonial"}
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
                                Name
                            </Typography>
                        </div>
                        <input
                            className={clsx.header_text_field}
                            value={activeTestimonial?.name || ""}
                            onChange={(e) => {
                                e.preventDefault();
                                setActiveTestimonial({
                                    ...activeTestimonial,
                                    name: e.target.value,
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
                                Testimonial
                            </Typography>
                            <Typography variant="body2">
                                Recommended word length: 20 words
                            </Typography>
                        </div>
                        <textarea
                            className={clsx.header_text_field}
                            value={activeTestimonial?.testimonial || ""}
                            onChange={(e) => {
                                e.preventDefault();
                                setActiveTestimonial({
                                    ...activeTestimonial,
                                    testimonial: e.target.value,
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

const CustomizeTestominials = ({ onSubmit, oldTestimonials }) => {
    const [testimonials, setTestimonials] = React.useState(oldTestimonials);
    const [activeTestimonial, setActiveTestimonial] = React.useState();
    const [activeTestimonialIndex, setActiveTestimonialIndex] =
        React.useState();
    const [openDialog, setOpenDialog] = React.useState(false);

    const deleteTestimonial = (index) => {
        const temp = [...testimonials];
        temp.splice(index, 1);
        setTestimonials(temp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(testimonials);
    };

    return (
        <>
            <div
                style={{ display: "flex", margin: "10px 0", flexWrap: "wrap" }}
            >
                {testimonials.map((testimonial, index) => (
                    <Card
                        key={index}
                        style={{ width: "200px", margin: "10px" }}
                    >
                        <CardContent>{testimonial.name}</CardContent>
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
                                    setActiveTestimonial(testimonial);
                                    setActiveTestimonialIndex(index);
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
                                    deleteTestimonial(index);
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
                        setActiveTestimonial(undefined);
                        setActiveTestimonialIndex(undefined);
                    }}
                >
                    <div
                        style={{
                            alignItems: "center",
                            display: "flex",
                            padding: "0 10px",
                        }}
                    >
                        <Typography fontWeight={"bold"}>
                            Add new testimonial
                        </Typography>
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
                activeTestimonial={activeTestimonial}
                setActiveTestimonial={setActiveTestimonial}
                index={activeTestimonialIndex}
                testimonials={testimonials}
                setTestimonials={setTestimonials}
                open={openDialog}
                setOpen={setOpenDialog}
            />
        </>
    );
};

export default CustomizeTestominials;

import {
    Button,
    CircularProgress,
    List,
    ListItem,
    Switch,
    Typography,
} from "@mui/material";
import React from "react";
import { toast } from "react-toastify";
import clsx from "./styles.module.css";
import { KEY } from "../../../../constants";
import { useLocalStorage } from "../../../../hooks";
import { adminFunctions } from "../../../../contexts/createFunctions";

const CustomizeCourses = ({ onSubmit, oldCoursesToShow, school_id }) => {
    const [coursesToShow, setCoursesToShow] = React.useState(oldCoursesToShow);
    const [coursesInSchool, setCoursesInSchool] = React.useState();
    const [loading, setLoading] = React.useState();

    const { getItem } = useLocalStorage();

    let userdata = getItem(KEY);

    const toastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        newestOnTop: false,
        closeOnClick: true,
        rtl: false,
        pauseOnFocusLoss: true,
        draggable: true,
        pauseOnHover: true,
    };

    React.useEffect(() => {
        setLoading(true);
        adminFunctions
            .getCoursesInSchool(userdata?.token, school_id)
            .then((axiosRes) => {
                console.log(axiosRes);
                if (axiosRes.success) {
                    setCoursesInSchool(axiosRes.data || []);
                    setLoading(false);
                    toast.success(
                        "Fetched school courses successfully",
                        toastOptions
                    );
                    return;
                }
                setCoursesInSchool(undefined);
                setLoading(false);
                toast.error("Failed to fetch school courses", toastOptions);
            });
    }, []);

    const handleChangeCoursesToShow = (course, checked) => {
        const temp = [...coursesToShow];
        console.log({ temp });
        const found = temp.find((value) => value.id === course._id);
        if (found === undefined) {
            temp.push({
                id: course._id,
                hide: !checked,
            });
        } else {
            found.hide = !checked;
        }
        setCoursesToShow(temp);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(coursesToShow);
    };

    return (
        <>
            <div className={clsx["header_text_field_div"]}>
                <List>
                    {coursesInSchool &&
                        coursesInSchool.map((course, index) => (
                            <ListItem
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    width: "300px",
                                    justifyContent: "space-between",
                                }}
                            >
                                {course.name}
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <Switch
                                        checked={
                                            !coursesToShow.find(
                                                (_v) => _v.id === course._id
                                            )?.hide
                                        }
                                        onChange={(e) => {
                                            e.preventDefault();
                                            handleChangeCoursesToShow(
                                                course,
                                                e.currentTarget.checked
                                            );
                                        }}
                                    />
                                    <Typography
                                        style={{
                                            color: "var(--theme-blue)",
                                            marginLeft: "5px",
                                        }}
                                    >
                                        Show
                                    </Typography>
                                </div>
                            </ListItem>
                        ))}
                </List>
            </div>
            <div className={clsx.header_save_button_div}>
                <Button
                    className={clsx.header_save_button}
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? <CircularProgress /> : "Save"}
                </Button>
            </div>
        </>
    );
};

export default CustomizeCourses;

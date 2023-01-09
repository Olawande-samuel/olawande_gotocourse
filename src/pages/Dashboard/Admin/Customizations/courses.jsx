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
    const onClient = React.useRef(false);

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
        console.log({ onClient: onClient.current });
        if (!onClient.current) {
            onClient.current = true;
            return;
        }
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

        const foundIndex = temp.findIndex((value) => value === course._id);
        if (!checked && foundIndex >= 0) {
            temp.splice(foundIndex, 1);
            setCoursesToShow(temp);
        }
        if (checked && foundIndex < 0) {
            temp.push(course._id);
            setCoursesToShow(temp);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(coursesToShow);
    };

    return (
        <>
            <div className={clsx["header_text_field_div"]}>
                <List>
                    {coursesInSchool && !coursesInSchool.length && (
                        <Typography>There are no courses in school</Typography>
                    )}
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
                                        checked={coursesToShow.find(
                                            (_v) => _v === course._id
                                        )}
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

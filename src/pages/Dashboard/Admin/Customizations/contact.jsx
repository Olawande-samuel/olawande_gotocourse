import { Button, Typography } from "@mui/material";
import React from "react";
import { BsInstagram } from "react-icons/bs";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Facebook } from "../../../../images/components/svgs";
import clsx from "./styles.module.css";

const CustomizeContact = ({
    onSubmit,
    oldFacebook,
    oldTwitter,
    oldLinkedIn,
    oldInstagram,
    oldAdditionalContact,
}) => {
    const [facebook, setFacebook] = React.useState(oldFacebook);
    const [twitter, setTwitter] = React.useState(oldTwitter);
    const [instagram, setInstagram] = React.useState(oldInstagram);
    const [linkedIn, setLinkedIn] = React.useState(oldLinkedIn);
    const [additionalContact, setAdditionalContact] =
        React.useState(oldAdditionalContact);

    const handleChangeFacebook = (e) => {
        e.preventDefault();
        setFacebook(e.target.value);
    };

    const handleChangeTwitter = (e) => {
        e.preventDefault();
        setTwitter(e.target.value);
    };

    const handleChangeInstagram = (e) => {
        e.preventDefault();
        setInstagram(e.target.value);
    };

    const handleChangeLinkedIn = (e) => {
        e.preventDefault();
        setLinkedIn(e.target.value);
    };

    const handleChangeAdditionalContact = (e) => {
        e.preventDefault();
        setAdditionalContact(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ facebook, twitter, linkedIn, instagram, additionalContact });
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
                    <FaFacebook className={clsx.contact_icons} />
                    <input
                        className={clsx.header_text_field}
                        value={facebook}
                        type="text"
                        onChange={handleChangeFacebook}
                    />
                </div>
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
                    <FaTwitter className={clsx.contact_icons} />
                    <input
                        className={clsx.header_text_field}
                        value={twitter}
                        type="text"
                        onChange={handleChangeTwitter}
                    />
                </div>
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
                    <FaLinkedin className={clsx.contact_icons} />
                    <input
                        className={clsx.header_text_field}
                        value={linkedIn}
                        type="text"
                        onChange={handleChangeLinkedIn}
                    />
                </div>
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
                    <FaInstagram className={clsx.contact_icons} />
                    <input
                        className={clsx.header_text_field}
                        value={instagram}
                        type="text"
                        onChange={handleChangeInstagram}
                    />
                </div>
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
                        Additional Contact
                    </Typography>
                    <Typography variant="body2">
                        Recommended words length: 30 words
                    </Typography>
                </div>
                <input
                    className={clsx.header_text_field}
                    value={additionalContact}
                    type="text"
                    onChange={handleChangeAdditionalContact}
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

export default CustomizeContact;

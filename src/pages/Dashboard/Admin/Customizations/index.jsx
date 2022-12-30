import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import React from "react";
import { BiCloudDownload } from "react-icons/bi";
import { Admin } from "..";
import Loader from "../../../../components/Loader";
import useSchoolSettings from "../../../../hooks/useSchoolSettings";
import CustomizeBanner from "./banner";
import CustomizeCallToAction from "./callToAction";
import CustomizeCourses from "./courses";
import CustomizeFAQs from "./faq";
import CustomizeHeader from "./header";
import CustomizeLogo from "./logo";
import clsx from "./styles.module.css";
import CustomizeTestominials from "./testimonials";
import CustomizeWhyOurSchool from "./whyOurSchool";

const sidebar = [
    {
        name: "Logo",
        icon: <BiCloudDownload />,
        component: <CustomizeLogo />,
    },
    {
        name: "Header",
        icon: <BiCloudDownload />,
    },
    {
        name: "Banner",
        icon: <BiCloudDownload />,
    },
    {
        name: "Why Our School",
        icon: <BiCloudDownload />,
    },
    {
        name: "CTA",
        icon: <BiCloudDownload />,
    },
    {
        name: "Courses",
        icon: <BiCloudDownload />,
    },
    {
        name: "Testimonials",
        icon: <BiCloudDownload />,
    },
    {
        name: "FAQ",
        icon: <BiCloudDownload />,
    },
    {
        name: "Contact/Socials",
        icon: <BiCloudDownload />,
    },
];

const Customizations = () => {
    const [activeTab, setActiveTab] = React.useState(0);

    const school_id = "63ad4b3b3a250d6d89a3de80"; // test school ID
    const schoolSettingsHook = useSchoolSettings(school_id);
    const loading = schoolSettingsHook.loading;

    return (
        <Admin header="Customization">
            <div className={clsx["customization_profile"]}>
                <div className={clsx["customization_sidebar"]}>
                    <List>
                        {sidebar.map((item, index) => (
                            <ListItem
                                key={index}
                                onClick={(e) => {
                                    e?.preventDefault();
                                    setActiveTab(index);
                                }}
                                className={
                                    index === activeTab
                                        ? clsx["sidebar_selected_item"]
                                        : clsx["sidebar_item"]
                                }
                            >
                                <ListItemIcon
                                    className={
                                        index === activeTab
                                            ? clsx["sidebar_selected_icon"]
                                            : clsx["sidebar_icon"]
                                    }
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText>
                                    <Typography
                                        className={
                                            index === activeTab
                                                ? clsx["sidebar_selected_text"]
                                                : ""
                                        }
                                    >
                                        {item.name}
                                    </Typography>
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </div>
                {loading && <Loader />}
                <>
                    {activeTab === 0 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeLogo
                                onSubmit={schoolSettingsHook.updateSchoolLogo}
                                oldLogo={
                                    schoolSettingsHook.schoolSettings?.logo ||
                                    ""
                                }
                            />
                        </div>
                    )}
                    {activeTab === 1 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeHeader
                                onSubmit={
                                    schoolSettingsHook.updateSchoolHeaders
                                }
                                oldHeader={
                                    schoolSettingsHook.schoolSettings?.header ||
                                    ""
                                }
                                oldSubheader={
                                    schoolSettingsHook.schoolSettings
                                        ?.subheader || ""
                                }
                            />
                        </div>
                    )}
                    {activeTab === 2 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeBanner
                                onSubmit={schoolSettingsHook.updateSchoolBanner}
                                oldBanner={
                                    schoolSettingsHook.schoolSettings?.banner ||
                                    ""
                                }
                            />
                        </div>
                    )}
                    {activeTab === 3 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeWhyOurSchool
                                onSubmit={schoolSettingsHook.updateWhyOurSchool}
                                oldWhyOurSchool={
                                    schoolSettingsHook.schoolSettings
                                        ?.why_our_school || ""
                                }
                            />
                        </div>
                    )}
                    {activeTab === 4 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeCallToAction
                                onSubmit={
                                    schoolSettingsHook.updateCallToActionButton
                                }
                                oldCallToAction={
                                    schoolSettingsHook.schoolSettings?.cta || {
                                        text: "",
                                        color: "",
                                        active: false,
                                    }
                                }
                            />
                        </div>
                    )}
                    {activeTab === 5 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeCourses
                                onSubmit={(_) => {}}
                                oldCoursesToShow={
                                    schoolSettingsHook.schoolSettings
                                        ?.courses || []
                                }
                            />
                        </div>
                    )}
                    {activeTab === 6 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeTestominials
                                onSubmit={schoolSettingsHook.updateTestimonials}
                                oldTestimonials={
                                    schoolSettingsHook.schoolSettings
                                        ?.testimonials || []
                                }
                            />
                        </div>
                    )}
                    {activeTab === 7 && (
                        <div className={clsx["customization_content"]}>
                            <CustomizeFAQs
                                onSubmit={schoolSettingsHook.updateFAQs}
                                oldFAQs={
                                    schoolSettingsHook.schoolSettings?.FAQs ||
                                    []
                                }
                            />
                        </div>
                    )}
                </>
            </div>
        </Admin>
    );
};

export default Customizations;

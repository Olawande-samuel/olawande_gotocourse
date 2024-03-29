import { adminFunctions } from "../contexts/createFunctions";
import React from "react";
import useLocalStorage from "./useLocalStorage";
import { KEY } from "../constants";
import { toast } from "react-toastify";

const useSchoolSettings = (school_id) => {
    const [schoolSettings, setSchoolSettings] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const onClient = React.useRef(false);

    const { getItem } = useLocalStorage();

    let userdata = getItem(KEY);

    const displaySuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
        });
    };

    const displayError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            newestOnTop: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: true,
            draggable: true,
            pauseOnHover: true,
        });
    };

    const fetchSchoolSettings = React.useCallback(() => {
        setLoading(true);
        adminFunctions
            .fetchSchoolSettings(userdata?.token, school_id)
            .then((axiosRes) => {
                // console.log(axiosRes);
                if (axiosRes.success) {
                    setSchoolSettings(axiosRes.data);
                    setLoading(false);
                    displaySuccess("Fetched school settings successfully");
                    return;
                }
                setSchoolSettings(undefined);
                setLoading(false);
                displayError("Failed to fetch school settings");
            });
    }, []);

    React.useEffect(() => {
        if (!onClient.current) {
            onClient.current = true;
            return;
        }
        fetchSchoolSettings(school_id);
    }, []);

    const updateSchoolSettings = async (newSettings) => {
        setLoading(true);
        adminFunctions
            .updateSchoolSettings(userdata?.token, school_id, newSettings)
            .then((axiosRes) => {
                // console.log(axiosRes);
                if (axiosRes.success) {
                    setSchoolSettings(axiosRes.data);
                    setLoading(false);
                    displaySuccess("Successfully updated school settings");
                    return;
                }
                setSchoolSettings(undefined);
                setLoading(false);
                displayError("Failed to update school settings");
            });
    };

    const updateSchoolLogo = async (logoUrl) => {
        updateSchoolSettings({
            logo: logoUrl,
        });
    };

    const updateSchoolHeaders = async ({ header, subheader }) => {
        updateSchoolSettings({
            header: header,
            subheader: subheader,
        });
    };

    const updateSchoolBanner = async (bannerUrl) => {
        updateSchoolSettings({
            banner: bannerUrl,
        });
    };

    const updateWhyOurSchool = async (whyOurSchool) => {
        updateSchoolSettings({
            why_our_school: whyOurSchool,
        });
    };

    const updateCallToActionButton = async (cta) => {
        updateSchoolSettings({
            cta: cta,
        });
    };

    const updateTestimonials = async (testimonials) => {
        updateSchoolSettings({
            testimonials: testimonials,
        });
    };

    const updateFAQs = async (faqs) => {
        updateSchoolSettings({
            faq: faqs,
        });
    };

    const updateContact = async (contact) => {
        updateSchoolSettings({
            facebook: contact.facebook,
            twitter: contact.twitter,
            linkedIn: contact.linkedIn,
            instagram: contact.instagram,
            additional_contact: contact.additionalContact,
        });
    };

    return {
        schoolSettings,
        loading,
        updateSchoolLogo,
        updateSchoolHeaders,
        updateSchoolBanner,
        updateWhyOurSchool,
        updateCallToActionButton,
        updateTestimonials,
        updateFAQs,
        updateContact,
    };
};

export default useSchoolSettings;

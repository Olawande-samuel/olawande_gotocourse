import { useState } from "react";
import { Badge } from "@mui/material";
import { MdHistory } from "react-icons/md";
import {
    AiOutlineClose,
    AiOutlineSetting,
    AiOutlineDashboard,
    AiOutlineCaretDown
} from "react-icons/ai";
import {
    IoIosHome,
    IoIosPerson,
    IoIosChatbubbles,
    IoIosCash,
    IoIosHelpBuoy,
} from "react-icons/io";

import { FaCalendarAlt } from "react-icons/fa";
import {
    BiCategory,
    BiBell,
    BiBarChartSquare,
    BiHelpCircle,
    BiVideo,
    BiCustomize,
} from "react-icons/bi";
import { MdOutlineAddReaction, MdOutlineSell } from "react-icons/md";
import { FaTwitch } from "react-icons/fa";
import { useLocation, Link, NavLink, useNavigate } from "react-router-dom";
import { FiGift, FiSend, FiBookOpen } from "react-icons/fi";
import { FaRegMoneyBillAlt, FaMoneyBillWave } from "react-icons/fa";
import { motion } from "framer-motion";

import { AdvancedError } from "../../../classes";
import { useLocalStorage } from "../../../hooks";

import clsx from "./styles.module.css";
import Logo from "../../../components/Logo";
import { colors, KEY } from "../../../constants";
import { useAuth } from "../../../contexts/Auth";
import LogoutButton from "../../../components/LogoutButton";
import { LogoSidebar, Logosm } from "../../../images/components/svgs";
import { SiGooglechat, SiGoogleclassroom } from "react-icons/si";
import { BsNewspaper } from "react-icons/bs";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import { RiAdvertisementFill } from "react-icons/ri";
import { GiSandsOfTime } from "react-icons/gi";

import {Dropdown} from "react-bootstrap"

//mini-components
function SidebarItem({ icon: Icon, title, path, showBadge, ...props }) {
    const {
        generalState: { notifications, chat },
    } = useAuth();

    return (
        <div className={clsx.sidebar_item} {...props}>
            <Badge
                alignitems="center"
                badgeContent={
                    showBadge ? (path === "notifications" ? notifications : chat) : 0
                }
                color="secondary"
            >
                <p style={{marginBottom: 0}}>
                    <Icon className={clsx.sidebar_icon} color="white" size="1rem" />
                    <span className={clsx.sidebar_item_title}>{title}</span>
                </p>
            </Badge>
        </div>
    );
}

const Sidebar = () => {
    const location = useLocation();
    const { generalState, setGeneralState } = useAuth();
    const navigate = useNavigate();
    const { getItem } = useLocalStorage();
    let userdata = getItem(KEY);
    let route = location.pathname.split("/")[1];
    const [loading, setLoading] = useState(false);
    const [showStudent, setShowStudent] = useState("d-flex");

    function toggleStudent(){
        if(showStudent === "d-flex"){
            setShowStudent("d-none")
        }else {
            setShowStudent("d-flex")
        }
    }

    // for create. value should be gotten from localStorage
    const isCreator = userdata?.userType === "schools";

    let data = [];

    if (isCreator) {
        route = location.pathname;
        if (route.includes("admin")) {
            data = [
                {
                    icon: IoIosHome,
                    path: "",
                    title: "Dashboard",
                },
                {
                    icon: IoIosPerson,
                    path: "profile",
                    title: "My Profile",
                },
                {
                    icon: IoIosPerson,
                    path: "students",
                    title: "Students",
                },
                {
                    icon: FiSend,
                    path: "teachers",
                    title: "Teachers",
                },
                {
                    icon: FaTwitch,
                    path: "mentors",
                    title: "Mentors",
                },
                {
                    icon: IoIosCash,
                    path: "fees",
                    title: "Payments",
                },
                // {
                //     icon: FiGift,
                //     path: "courses",
                //     title: "Courses"
                // },
                {
                    icon: IoIosHelpBuoy,
                    path: "courses-categories",
                    title: "Course Categories",
                },
                {
                    icon: BiCategory,
                    path: "classes",
                    title: "Courses",
                },
                {
                    icon: BiVideo,
                    path: "live-class",
                    title: "Live Class",
                },
                {
                    icon: BiBell,
                    path: "notifications",
                    title: "Notifications",
                    showBadge: true,
                },
                {
                    icon: SiGooglechat,
                    path: "chat",
                    title: "Chat",
                    showBadge: true,
                },
                {
                    icon: IoIosCash,
                    path: "earnings",
                    title: "Earnings",
                },
                {
                    icon: AiOutlineSetting,
                    path: "settings",
                    title: "Settings",
                },
                {
                    icon: SiGoogleclassroom,
                    path: "class-console",
                    title: "Console",
                },
                {
                    icon: HiOutlinePresentationChartLine,
                    path: "webinar",
                    title: "Webinar",
                },
                {
                    icon: BsNewspaper,
                    path: "blog",
                    title: "Blog",
                },
                {
                    icon: BsNewspaper,
                    path: "customize",
                    title: "Customize",
                },
            ];
        } else if (route.includes("student")) {

            data = [
                {
                    icon: AiOutlineDashboard,
                    path: "",
                    title: "Dashboard",
                },
                {
                    icon: IoIosPerson,
                    path: "profile",
                    title: "My Profile",
                },
                {
                    icon: BiCategory,
                    path: "classes",
                    title: "Available Courses",
                },
                {
                    icon: BiCategory,
                    path: "myclasses",
                    title: "My Courses",
                },
                {
                    icon: BiVideo,
                    path: "live-class",
                    title: "Live Class",
                },

                // {
                //     icon: FiGift,
                //     path: "wishlist",
                //     title: "Cart",
                // },
                {
                    icon: MdOutlineAddReaction,
                    path: "referral",
                    title: "Referral",
                },
                {
                    icon: GiSandsOfTime,
                    path: "history",
                    title: "History",
                },
                {
                    icon: FaRegMoneyBillAlt,
                    path: "payment",
                    title: "Payment",
                },
                {
                    icon: BiBell,
                    path: "notifications",
                    title: "Notifications",
                    showBadge: true,
                },
                {
                    icon: SiGooglechat,
                    path: "chat",
                    title: "Chat",
                    showBadge: true,
                },
                {
                    icon: SiGoogleclassroom,
                    path: "console/myclasses",
                    title: "Class Console",
                    showBadge: true,
                },
                {
                    icon: BiHelpCircle,
                    path: "help",
                    title: "Help",
                },
            ];
        }
        if (route.includes("teacher")) {
            data = [
                {
                    icon: AiOutlineDashboard,
                    path: "",
                    title: "Dashboard",
                },
                {
                    icon: IoIosPerson,
                    path: "profile",
                    title: "My Profile",
                },
                // {
                //     icon: FiGift,
                //     path: "courses",
                //     title: "Courses"
                // },
                {
                    icon: BiCategory,
                    path: "classes",
                    title: "Courses",
                },
                {
                    icon: BiVideo,
                    path: "live-class",
                    title: "Live Class",
                },
                {
                    icon: IoIosCash,
                    path: "earnings",
                    title: "Earnings",
                },
                {
                    icon: MdOutlineAddReaction,
                    path: "referral",
                    title: "Referral",
                },
                {
                    icon: BiBell,
                    path: "notifications",
                    title: "Notifications",
                    showBadge: true,
                },
                {
                    icon: SiGooglechat,
                    path: "chat",
                    title: "Chat",
                    showBadge: true,
                },
                {
                    icon: BiHelpCircle,
                    path: "help",
                    title: "Help",
                },
                {
                    icon: SiGoogleclassroom,
                    path: "class-console",
                    title: "Console",
                },
            ];
        }
    } else {
        data =
            route === "admin"
                ? [
                    {
                        icon: IoIosHome,
                        path: "",
                        title: "Dashboard",
                    },
                    {
                        icon: IoIosPerson,
                        path: "profile",
                        title: "My Profile",
                    },
                    {
                        icon: IoIosPerson,
                        path: "students",
                        title: "Students",
                        sub: [
                            {
                                icon: IoIosPerson,
                                path: "/admin/students",
                                title: "All",
                            },
                            {
                                icon: IoIosPerson,
                                path: "/admin/students/enrolled",
                                title: "Enrolled",
                            },
                        ]
                    },
                    {
                        icon: FiSend,
                        path: "teachers",
                        title: "Teachers",
                    },
                    {
                        icon: FaTwitch,
                        path: "mentors",
                        title: "Mentors",
                    },
                    {
                        icon: IoIosCash,
                        path: "fees",
                        title: "Payments",
                    },
                    // {
                    //     icon: FiGift,
                    //     path: "courses",
                    //     title: "Courses"
                    // },
                    {
                        icon: IoIosHelpBuoy,
                        path: "courses-categories",
                        title: "Course Categories",
                    },
                    {
                        icon: BiCategory,
                        path: "classes",
                        title: "Courses",
                    },
                    // {
                    //     icon: BiVideo,
                    //     path: "live-class",
                    //     title: "Live Class",
                    // },
                    {
                        icon: BiBell,
                        path: "notifications",
                        title: "Notifications",
                        showBadge: true,
                    },
                    {
                        icon: SiGooglechat,
                        path: "chat",
                        title: "Chat",
                        showBadge: true,
                    },
                    {
                        icon: IoIosCash,
                        path: "earnings",
                        title: "Earnings",
                    },
                    {
                        icon: AiOutlineSetting,
                        path: "settings",
                        title: "Settings",
                    },
                    {
                        icon: SiGoogleclassroom,
                        path: "class-console",
                        title: "Console",
                    },
                    {
                        icon: HiOutlinePresentationChartLine,
                        path: "webinar",
                        title: "Webinar",
                    },
                    {
                        icon: BsNewspaper,
                        path: "blog",
                        title: "Blog",
                    },
                    {
                        icon: MdOutlineSell,
                        path: "ad-leads",
                        title: "Ad Leads"
                    },
                    {
                        icon: RiAdvertisementFill,
                        path: "marketing-leads",
                        title: "Marketing Leads"
                    },
                ]
                : route === "student"
                    ? [
                        {
                            icon: AiOutlineDashboard,
                            path: "",
                            title: "Dashboard",
                        },
                        {
                            icon: IoIosPerson,
                            path: "profile",
                            title: "My Profile",
                        },
                        {
                            icon: BiCategory,
                            path: "classes",
                            title: "Available Courses",
                        },
                        {
                            icon: BiCategory,
                            path: "myclasses",
                            title: "My Courses",
                        },
                        // {
                        //     icon: BiVideo,
                        //     path: "live-class",
                        //     title: "Live Class",
                        // },

                        // {
                        //     icon: FiGift,
                        //     path: "wishlist",
                        //     title: "Cart",
                        // },
                        {
                            icon: MdOutlineAddReaction,
                            path: "referral",
                            title: "Referral",
                        },
                        {
                            icon: GiSandsOfTime,
                            path: "history",
                            title: "History",
                        },
                        {
                            icon: FaRegMoneyBillAlt,
                            path: "payment",
                            title: "Payment",
                        },
                        {
                            icon: BiBell,
                            path: "notifications",
                            title: "Notifications",
                            showBadge: true,
                        },
                        {
                            icon: SiGooglechat,
                            path: "chat",
                            title: "Chat",
                            showBadge: true,
                        },
                        {
                            icon: SiGoogleclassroom,
                            path: "console/myclasses",
                            title: "Class Console",
                            showBadge: true,
                        },
                        {
                            icon: BiHelpCircle,
                            path: "help",
                            title: "Help",
                        },
                    ]
                    : route === "teacher"
                        ? [
                            {
                                icon: AiOutlineDashboard,
                                path: "",
                                title: "Dashboard",
                            },
                            {
                                icon: IoIosPerson,
                                path: "profile",
                                title: "My Profile",
                            },
                            // {
                            //     icon: FiGift,
                            //     path: "courses",
                            //     title: "Courses"
                            // },
                            {
                                icon: BiCategory,
                                path: "classes",
                                title: "Courses",
                            },
                            // {
                            //     icon: BiVideo,
                            //     path: "live-class",
                            //     title: "Live Class",
                            // },
                            {
                                icon: IoIosCash,
                                path: "earnings",
                                title: "Earnings",
                            },
                            {
                                icon: MdOutlineAddReaction,
                                path: "referral",
                                title: "Referral",
                            },
                            {
                                icon: BiBell,
                                path: "notifications",
                                title: "Notifications",
                                showBadge: true,
                            },
                            {
                                icon: SiGooglechat,
                                path: "chat",
                                title: "Chat",
                                showBadge: true,
                            },
                            {
                                icon: BiHelpCircle,
                                path: "help",
                                title: "Help",
                            },
                            {
                                icon: SiGoogleclassroom,
                                path: "class-console",
                                title: "Console",
                            },
                        ]
                        : route === "mentor"
                            ? [
                                {
                                    icon: AiOutlineDashboard,
                                    path: "",
                                    title: "Dashboard",
                                },
                                {
                                    icon: IoIosPerson,
                                    path: "profile",
                                    title: "My Profile",
                                },
                                {
                                    icon: IoIosCash,
                                    path: "earnings",
                                    title: "Earnings",
                                },
                                {
                                    icon: MdOutlineAddReaction,
                                    path: "referral",
                                    title: "Referral",
                                },
                                {
                                    icon: BiBell,
                                    path: "notifications",
                                    title: "Notifications",
                                    showBadge: true,
                                },
                                {
                                    icon: FaCalendarAlt,
                                    path: "scheduler",
                                    title: "Scheduler",
                                },
                                {
                                    icon: SiGooglechat,
                                    path: "chat",
                                    title: "Chat",
                                    showBadge: true,
                                },
                                {
                                    icon: BiHelpCircle,
                                    path: "help",
                                    title: "Help",
                                },
                            ]
                            : [
                                {
                                    icon: AiOutlineDashboard,
                                    path: "",
                                    title: "Dashboard",
                                },
                                {
                                    icon: FiGift,
                                    path: "sales",
                                    title: "Sales",
                                },
                                {
                                    icon: FaMoneyBillWave,
                                    path: "income",
                                    title: "Income",
                                },
                            ];
    }

    const toggleSidebar = () => {
        setGeneralState({
            ...generalState,
            showSidebar: !generalState.showSidebar,
        });
    };

    async function gotodashboard() {
        const data = getItem("gotocourse-userdata");

        if (data.userType === "student" || data.userType === "admin") {
            if (generalState.pledre.loginUser) {
                setLoading(true);
                try {
                    const response = await generalState.pledre.loginUser({
                        user_id: data.pledre._id,
                        user_type: "student",
                    });
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        } else if (data.pledre?.deleted === false && data.accessPledre) {
            if (generalState.pledre.loginUser) {
                setLoading(true);
                try {
                    const response = await generalState.pledre.loginUser({
                        user_id: data.pledre._id,
                        user_type: route,
                    });
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            }
        } else {
            throw new AdvancedError("User not authorized");
        }
    }
    const page = location.pathname.split("/")[1];
    return (
        <>
            <div
                className={`${generalState.showSidebar ? clsx.open : clsx.close}  ${clsx.sidebar
                    } sidebar ${isCreator && "creator"}`}
            >
                <i
                    className="d-md-none"
                    style={{
                        fontSize: "24px",
                        position: "absolute",
                        right: "-30px",
                        color: "#0C2191",
                        cursor: "pointer",
                        zIndex: "3000",
                    }}
                    onClick={toggleSidebar}
                >
                    <AiOutlineClose />
                </i>
                <div className="text-center">
                    {!isCreator ? (
                        <Link to="/">
                            <LogoSidebar />
                        </Link>
                    ) : (
                        <Link to="/school" className="h3 fw-bold text-white">
                            DASHBOARD
                        </Link>
                    )}
                </div>
                <div className={clsx.sidebar_items} id="sidebar__items">
                    {isCreator
                        ? data.map(({ icon, path, title, showBadge, admin }, i) => (
                            <NavLink
                                onClick={toggleSidebar}
                                to={`${route.includes("admin")
                                    ? "/school/admin"
                                    : route.includes("student")
                                        ? "/school/student"
                                        : route.includes("teacher")
                                            ? "/school/teacher"
                                            : route.includes("mentor")
                                                ? "/school/mentor"
                                                : "/school/affiliate"
                                    }${"/" + path}`}
                                key={i}
                            >
                                <SidebarItem
                                    location={location}
                                    icon={icon}
                                    title={title}
                                    path={path}
                                    showBadge={showBadge}
                                    admin={admin}
                                />
                            </NavLink>
                        ))
                        : data.map(({ icon, path, title, showBadge, admin, sub }, i) => (
                            <>
                                {
                                    sub ? 
                                   <div className={clsx.sidebar_item_button_wrapper}>
                                        <div className={clsx.sidebar_item_button} onClick={toggleStudent}>
                                            <span className="d-flex justify-content-between align-items-center gap-3">
                                                <IoIosPerson /> Students <AiOutlineCaretDown />
                                            </span>
                                        </div>
                                        <div className={`${clsx.sidebar_dropDown} ${showStudent}`}>
                                            <Link to="/admin/students" className="d-inline-block mb-2 text-start"><IoIosPerson /> All</Link>
                                            <Link to="/admin/students/enrolled" className="d-inline-block text-start"><IoIosPerson /> Enrolled</Link>
                                        </div>
                                   </div>
                                    :
                                    <NavLink
                                        onClick={toggleSidebar}
                                        to={`${route === "admin"
                                            ? "/admin"
                                            : route === "student"
                                                ? "/student"
                                                : route === "teacher"
                                                    ? "/teacher"
                                                    : route === "mentor"
                                                        ? "/mentor"
                                                        : "/affiliate"
                                            }${"/" + path}`}
                                        key={i}
                                    >
                                        <SidebarItem
                                            location={location}
                                            icon={icon}
                                            title={title}
                                            path={path}
                                            showBadge={showBadge}
                                            admin={admin}
                                        />
                                    </NavLink>

                                }
                            </>
                        ))}
                    <div
                        className="button_wrapper d-none text-center"
                        style={{ marginTop: "3rem" }}
                    >
                        <motion.button
                            whileHover={{
                                // boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                                textShadow: "0px 0px 8px rgb(255, 255, 255)",
                            }}
                            className="btn btn-primary"
                            style={{
                                padding: "10px 28px",
                                background: "var(--secondary)",
                                border: "1px solid var(--secondary)",
                            }}
                            onClick={gotodashboard}
                            disable={true}
                        >
                            {loading ? (
                                <div className="spinner-border text-light">
                                    <div className="visually-hidden">loading</div>
                                </div>
                            ) : (
                                "Go to Class"
                            )}
                        </motion.button>
                    </div>
                    {page === "affiliate" &&
                        (userdata?.userType === "student" ||
                            userdata?.userType === "teacher" ||
                            userdata?.userType === "mentor") && (
                            <div
                                className="button_wrapper text-center"
                                style={{ marginTop: "4rem" }}
                            >
                                <motion.button
                                    whileHover={{
                                        // boxShadow: "0px 0px 8px rgb(0, 0, 0)",
                                        textShadow: "0px 0px 8px rgb(255, 255, 255)",
                                    }}
                                    className="btn btn-primary"
                                    style={{
                                        padding: "10px 30px",
                                        background: "var(--secondary)",
                                        border: "1px solid var(--secondary)",
                                    }}
                                    onClick={(e) => navigate(`/${userdata?.userType}`)}
                                    disable={true}
                                >
                                    Go to{" "}
                                    {userdata?.userType === "student"
                                        ? "Student's"
                                        : userdata?.userType === "teacher"
                                            ? "Teacher's"
                                            : "Mentor's"}{" "}
                                    Dashboard
                                </motion.button>
                            </div>
                        )}
                    <div className="d-none">
                        <LogoutButton />
                    </div>
                </div>
            </div>
            <div
                onClick={toggleSidebar}
                className={`d-lg-none ${clsx.overlay} ${generalState.showSidebar ? clsx.overlayopen : clsx.overlayclose
                    }`}
            ></div>
        </>
    );
};

export default Sidebar;

import React, { useState, useRef, useEffect } from "react";
import Logo from "../images/Logo.png";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { Logosm } from "../images/components/svgs";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { categories as navList } from "../data";
import { useAuth } from "../contexts/Auth";
import { useLocalStorage } from "../hooks";
import { ScrollToTop } from "../pages/Courses";
import LogoutButton from "./LogoutButton";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useQuery } from "@tanstack/react-query";
import { KEY } from "../constants";
import logo from '../images/landing/LearnG2C.png'
import Teacerlogo from '../images/landing/Teacerlogo.png'


const Navbar = ({ background }) => {
	const { setGeneralState } = useAuth();
	const [show, setShow] = useState(false);
	const [drop, setDrop] = useState(false);
	const { getItem } = useLocalStorage();
	const [banner, setBanner] = useState({})


	const value = getItem(KEY);
	const location = useLocation();
	const navigate = useNavigate();
	const toggleNav = () => {
		setShow(!show);
	};

	const toggleDrop = () => {
		setDrop(!drop);
	};

	const dropRef = useRef(null);
	const heightRef = useRef(null);

	const status = OutsideClick(dropRef);

	useEffect(() => {
		localStorage.setItem("g2cNavHeight", heightRef.current.clientHeight);
		setGeneralState((old) => {
			return {
				...old,
				navHeight: heightRef?.current?.clientHeight,
			};
		});
	}, []);

	const { adminFunctions: { fetchBanner } } = useAuth();


	useQuery(["fetch banner"], () => fetchBanner(), {
		onSuccess: ({ data }) => {
			let newData = data.filter(d => d.metaKey === "HEADER_PROMOTION");
			setBanner(JSON.parse(newData[0]?.metaValue))

		}
	})



	const celebRoute = location.pathname.split("/")[1] === "lounge";
	const confirmEmail =
		location.pathname.split("/")[1] === "email" ||
		location.pathname.split("/")[1] === "confirm";
	const categoryRoute = background === "category";
	const landing = location.pathname.split("/")[1] !== "lounge";
	const mainpage = location.pathname.split("/")[1] === "learn-on-gotocourse";
	const teacher = location.pathname.split("/")[1] === "qualifications" || location.pathname.split("/")[1] === "gotocourse-teacher";
	function showDrop() { }

	const [showBanner, setShowBanner] = useState(true);
	const mybanner = localStorage.getItem("gotocourse-banner");
	return (
		<nav
			ref={heightRef}
			section="top"
			className={`nav navbar navbar-expand-lg flex-column ${landing || mainpage ? "navbar-light" : "navbar-dark"
				}`}
			style={{
				// background: celebRoute ? "#191046" : confirmEmail ? "#E5E5E5" : landing ? "var(--blue-ish)" :  mainpage ? "#fff": "var(--theme-blue)",
				background: celebRoute
					? "#191046"
					: confirmEmail
						? "#E5E5E5"
						: landing
							? "var(--blue-ish)"
							: "var(--theme-blue)",
				color:
					confirmEmail || landing || categoryRoute
						? "var(--theme-blue)"
						: "#fffff",
			}}
		>
			<ScrollToTop />
			{mainpage && showBanner && (
				<div className="d-flex align-items-center justify-content-center p-2 w-100 bg-white">
					<a
						// href="#upcoming"
						href={banner.link ? `${banner.link}` : "https://gotocourse.events/Free-Tech-course-training"}
						className="mb-0 fw-bold me-4"
						style={{ fontFamily: "Raleway" }}
						target="_blank"
						rel="noopener noreferrer"
					>
						{banner.text ? banner.text : "Free class Alert!! - Classes starts March 15, 2023 and Registraion closes May 10. Click to Apply Now!!!"}
					</a>
					<i>
						<AiOutlineCloseCircle
							size="1.5rem"
							onClick={() => {
								setShowBanner(false);
								localStorage.setItem("gotocourse-banner", false);
							}}
						/>{" "}
					</i>
				</div>
			)}
			<div
				className="container navbar-container align-items-center">
				<Link
					to="/"
					onClick={() => window.scrollTo(0, 0)}
					className="logo navbar-brand "
					style={{
						flex: ".25"
					}}
				>
					{confirmEmail || landing || categoryRoute || mainpage ? (
						// <Logosm color="var(--theme-blue)" />
				
				teacher  ?
						<img src = {Teacerlogo} alt = ""
						width = { 140 }
						style = {{ maxWidth: "100%" }}
						/>

						:

						<img src={logo} alt=""
							width={140}
							style={{ maxWidth: "100%" }}
						/>
					

					) : (
						// <Logosm />
						teacher  ?
						
						<img src = { Teacerlogo } alt = ""
						width = { 140 }
						style = {{ maxWidth: "100%" }}
						/>

						:

						<img src={logo} alt=""
							width={140}
							style={{ maxWidth: "100%" }}
						/>

					)}
					{/* <small className="d-block" style={{fontSize:"14px", color: landing || mainpage ? "var(--theme-blue)" : "#fff"}}>Learn without limits</small> */}
				</Link>
				<button type="button" className="navbar-toggler " onClick={toggleNav}>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className={`collapse navbar-collapse  justify-content-end  align-items-center mt-3 mt-lg-0 ${show ? "show" : ""
						}`}
					id="navbarNav"
				>
					<ul className="navbar-nav me-5">


						{
							!teacher &&
							<li className="nav-item holder">
								<Link
									to="/africa"
									className="link nav-link courses me-4"
									style={{
										color:
											landing || mainpage
												? "var(--theme-blue)"
												: "rgba(255, 255, 255)",
									}}
								>
									Go2Course Africa
								</Link>
							</li>
						}



						{(location.pathname.split("/")[1] === "" || celebRoute) && (
							<>
								<li className="nav-item holder">
									<Link
										className="link nav-link courses me-4"
										to="/categories"
										style={{
											color:
												landing || mainpage
													? "var(--theme-blue)"
													: "rgba(255, 255, 255)",
										}}
									>
										Categories
									</Link>
									{drop ? <NavList dropRef={dropRef} /> : null}
								</li>

							</>
						)}

						{confirmEmail && (
							<>
								<li className="nav-item holder">
									<Link
										className="link nav-link courses me-4"
										to="/course"
										style={{
											color: "#0C2191",
										}}
									>
										Course
									</Link>
									{drop ? <NavList dropRef={dropRef} /> : null}
								</li>
								<li className="nav-item holder">
									<Link
										className="link nav-link courses me-4"
										to="/dashboard"
										style={{
											color: "#0C2191",
										}}
									>
										Go to DashBoard
									</Link>
									{drop ? <NavList dropRef={dropRef} /> : null}
								</li>
							</>
						)}

						{value?.token ? (
							""
						) : (
							<>

								<li className="nav-item d-flex align-items-center nav_link d-lg-none">
									<Link
										to="/login"
										className="link"
										style={{
											color: landing || mainpage ? "var(--theme-blue)" : "#fff",
										}}
									>
										Sign In
									</Link>
								</li>
								<li className="nav-item d-flex align-items-center nav_link d-lg-none">
									<Link
										to="/signup"
										className="link"
										style={{
											color: landing || mainpage ? "var(--theme-blue)" : "#fff",
										}}
									>
										Register as a Student
									</Link>
								</li>
							</>
						)}
					</ul>
					{value?.token ? (
						<>
							<li className="me-3 nav_link">
								<motion.span
									style={{
										cursor: "pointer",
										color:
											confirmEmail || landing || mainpage
												? "#0C2191"
												: "rgba(255, 255, 255)",
									}}
									whileHover={{
										textShadow: "0px 0px 8px rgb(255, 255, 255)",
									}}
									transition={{ duration: 0.1 }}
									onClick={() => {
										localStorage.clear();

										navigate("/login");
									}}
								>
									Logout
								</motion.span>
							</li>
							<Link
								to={`${value.userType === "admin"
									? "/admin"
									: value.userType === "student"
										? "/student"
										: "/teacher"
									}`}
							>
								<motion.div
									whileHover={{
										textShadow: "0px 0px 8px rgb(255, 255, 255)",
									}}
									className="d-flex align-items-center nav_link"
									style={{
										color:
											confirmEmail || landing || mainpage
												? "#0C2191"
												: "rgba(255, 255, 255)",
										fontSize: "16px",
									}}
								>
									<i
										className="d-flex align-items-center justify-content-center me-2"
										style={{
											color:
												confirmEmail || landing || mainpage
													? "#0C2191"
													: "rgba(255, 255, 255)",
										}}
									>
										<FaRegUser />
									</i>
									<span>{value.firstName}</span>
								</motion.div>
							</Link>
						</>
					) : (
						<>
							<Link to="/login">
								<motion.button
									type="button"
									className="btn-plain button-md d-none d-lg-block signup newLogin"
									whileHover={{
										textShadow: "0px 0px 8px rgb(255, 255, 255)",
										boxShadow: "0px 0px 8px rgb(0, 0, 0)",
									}}
									transition={{ duration: 0.1 }}
								>
									<span>Sign in</span>
								</motion.button>
							</Link>

							<Link to="/signup">
								<motion.button
									type="button"
									className=" btn-plain d-none d-lg-block newRegister"
									whileHover={{
										textShadow: "0px 0px 8px rgb(255, 255, 255)",
										boxShadow: "0px 0px 8px rgb(0, 0, 0)",
									}}
									transition={{ duration: 0.1 }}
								>
									<span>Register as a Student</span>
								</motion.button>
							</Link>
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

const NavList = ({ dropRef }) => {
	const navigate = useNavigate();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
			className="drop"
			ref={dropRef}
		>
			<ul>
				{navList.map((list) => (
					<li key={list.name}>
						<div
							className="text-capitalize"
							style={{ cursor: "pointer", fontSize: "14px" }}
							onClick={() => {
								delete list.logo;
								localStorage.setItem(
									"gotocourse-category",
									JSON.stringify(list)
								);
								navigate(
									`/categories/${list.name.split(" ").join("-").toLowerCase()}`
								);
							}}
						>
							{list.name}
						</div>
					</li>
				))}
			</ul>
		</motion.div>
	);
};

function OutsideClick(ref) {
	const [isClicked, setIsClicked] = useState();
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsClicked(true);
			} else {
				setIsClicked(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
	return isClicked;
}

export function HowItWorks() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const navigate = useNavigate();

	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (user) => {
		setAnchorEl(null);
		if (user === "student") {
			navigate("/student-how-it-works");
		} else if (user === "affiliate") {
			navigate("/affiliate-how-it-works");
		} else if (user === "teacher") {
			navigate("/teachers-how-it-works");
		} else {
			navigate("/lounge/how-it-works");
		}
	};

	return (
		<div>
			<p
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				style={{
					background: "inherit",
					color: "#fff",
					textTransform: "capitalize",
					marginBottom: "0",
					fontSize: "14px",
				}}
			>
				How It Works
			</p>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
				style={{ zIndex: 2500 }}
			>
				<MenuItem onClick={() => handleClose("student")}>For Students</MenuItem>
				<MenuItem onClick={() => handleClose("mentor")}>For Mentors</MenuItem>
				<MenuItem onClick={() => handleClose("teacher")}>For Teacher</MenuItem>
				<MenuItem onClick={() => handleClose("affiliate")}>
					For Affiliates
				</MenuItem>
			</Menu>
		</div>
	);
}

export default Navbar;

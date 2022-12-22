import styled from "styled-components";
import { Badge } from "@mui/material";
import { AiOutlineCloseCircle, AiOutlineMenu } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import LogoutButton from "./LogoutButton"
import { Logosm } from "../../../images/components/svgs";
import { motion } from "framer-motion";
import { useAuth } from "../../../contexts/Auth";
import { useLocalStorage } from "../../../hooks";
import { KEY } from "../../../constants";
import { FaRegUser } from "react-icons/fa";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const Container = styled.div`
	width: 100%;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	background: #fff;
	z-index: 1000;
`
	
const NavContainer = styled.div`
	
	color: #0c1825;
	width: 100%;
	// border: 2px solid red;
	height: 4rem;
	/* position: fixed;
	left: 0;
	top: 0;
	right: 0; */
	background: #fff;
	z-index: 1000;

	.navcontainer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem 1rem;
		gap: 1rem;
		height: 100%;
		width: 100%;

		.hamburger {
			display: block;
		}

		.navbarlogo {
			flex: 0.2;
			// border: 2px solid yellow;
		}

		ul {
			// border: 2px solid red;
			flex: 0.8;
			list-style-type: none;
			display: none;
			align-items: center;
			justify-content: space-evenly;
			font-family: "Raleway";
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			padding-left: unset;
			margin-bottom: unset;

			.firstitems {
				flex: 0.7;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				// border: 2px solid green;
			}

			.seconditems {
				flex: 0.3;
				display: flex;
				justify-content: flex-end;
				gap: 1rem;
				// border: 2px solid purple;

				.first__btn {
					color: var(--theme-blue);
					border: 1px solid #bbbbbb;
					border-radius: 7px;
					padding: 0.5rem 1rem;
					font-weight: 700;
					font-size: 16px;
					line-height: 27px;

					a {
						color: var(--theme-blue);
					}
				}

				.second__btn {
					background: var(--theme-blue);
					border: 2px solid white;
					color: #fff;
					padding: 0.5rem 1rem;
					font-weight: 700;
					font-size: 14px;
					line-height: 27px;
					border-radius: 12px;

					a {
						color: #fff;
					}
				}
			}
		}
	}

	@media (min-width: 900px) {
		.navcontainer {
			ul {
				display: flex;
			}

			.hamburger {
				display: none;
			}
		}
	}

	@media (max-width: 1024px) {
		.navcontainer {
			ul {
				.firstitems {
					flex: 0.6;
				}

				.seconditems {
					flex: 0.4;
				}
			}
		}
	}

	@media (max-width: 912px) {
		.navcontainer {
			ul {
				.firstitems {
					flex: 0.6;
				}

				.seconditems {
					gap: unset;
					flex: 0.4;
				}
			}
		}
	}
`;

const Navbar = ({ toggleSidebar }) => {
	const { setGeneralState } = useAuth();
	const { getItem } = useLocalStorage();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const value = getItem(KEY);
	const location = useLocation();
	const navigate = useNavigate();
	const [showBanner, setShowBanner] = useState(true)
	const mainpage = location.pathname.split("/")[1] === ""

	return (
		<Container>

			{
				(mainpage) && showBanner &&
				<div className="d-flex align-items-center justify-content-center p-2 w-100">
				<p className="mb-0 fw-bold me-4"> <Link to="/signup" style={{color: "var(--theme-blue)", textDecoration:"underline"}}>Register now</Link> to learn on gotocourse</p>
				<i><AiOutlineCloseCircle size="1.5rem" onClick={()=>{
					setShowBanner(false)
					localStorage.setItem("gotocourse-banner", false)
					}} /> </i>
				</div>
			}

			<NavContainer>
			<div className="navcontainer container">
				<div className="navbarlogo">
					<Link to={`/`}>
						<Logosm color="var(--theme-blue)" />
					</Link>
				</div>

				<ul>
					<div className="firstitems">
						<div className="dropdown">
							<button className="dropbtn">Create on Gotocourse</button>
							<div className="dropdown-content">
								<Link to={`/create`}>Create</Link>
								<Link to={`/manage`}>Manage</Link>
								<Link to={`/pricing`}>Pricing</Link>
							</div>
						</div>

						<li>
							<Link to={`/learn-with-gotocourse`}>Learn with Gotocourse</Link>
						</li>
						<li></li>
					</div>

					{/* <div className="seconditems">
						{value?.token ? (
							<>
								<li className="me-3 nav_link">
									<motion.span
										style={{
											cursor: "pointer",
											color: "#0C2191",
										}}
										whileHover={{
											textShadow: "0px 0px 8px rgb(255, 255, 255)",
										}}
										transition={{ duration: 0.1 }}
										onClick={() => {
											localStorage.clear();

											navigate("/school/login");
										}}
									>
										Logout
									</motion.span>
								</li>
								<Link
									to={`${
										value.userType === "admin"
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
										style={{ color: "#0C2191", fontSize: "16px" }}
									>
										<i
											className="d-flex align-items-center justify-content-center me-2"
											style={{ color: "#0C2191" }}
										>
											<FaRegUser />
										</i>
										<span>{value.firstName}</span>
									</motion.div>
								</Link>
							</>
						) : (
							<>
								<li>
									<button className="first__btn">
										<Link to={`/school/login`}>Sign in</Link>{" "}
									</button>
								</li>

								<li>
									<button className="second__btn">
										<Link to={`/school/signup`}>Register for free</Link>
									</button>
								</li>
							</>
						)}
					</div> */}
				</ul>

				<div className="hamburger align-items-center">
					<i>
						<AiOutlineMenu
							style={{
								fontSize: "24px",
								color: "var(--theme-blue)",
								cursor: "pointer",
							}}
							onClick={toggleSidebar}
						/>
					</i>
				</div>
			</div>
			</NavContainer>
			
		</Container>
	);
};

export default Navbar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { KEY } from "../../constants";
import { useLocalStorage } from "../../hooks";
import { motion } from 'framer-motion'

export const Side = styled.div`
	position: fixed;
	display: flex;
	z-index: 1000;
	top: 0;
	bottom: 0;
	left: ${(props) => (props.showSidebar ? "0" : "-10000px")};
	width: 100%;
	height: 100vh;

	.empty {
		height: 100%;
		width: 20%;
	}

	ul {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
		height: 100%;
		width: 80%;
		list-style-type: none;
		background: var(--theme-blue);

		a {
			color: #fff;
		}

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
`;

const SideBar = ({ showSidebar, toggleSidebar }) => {
	const location = useLocation()
	const africa = location.pathname.split("/")[1]?.includes("africa")
	const school = location.pathname.split("/")[1]?.includes("school")
	const { getItem } = useLocalStorage();
	let navigate = useNavigate()
	const value = getItem(KEY);
	return (
		<Side showSidebar={showSidebar}>
			<ul>
				{
					!africa && <>
						<li>
							<Link to={`/create`}>Create</Link>
						</li>
						<li>
							<Link to={`/manage`}>Manage</Link>
						</li>
						<li>
							<Link to={`/learn-on-gotocourse`}>Learn with Gotocourse</Link>
						</li>
						<li>
							<Link to={`/pricing`}>Pricing</Link>
						</li>
					</>
				}

				{
					africa && <>
						<li>
							<Link to={`/learn-on-gotocourse`}>Learn with Gotocourse</Link>
						</li>
						<li>
							<Link to={`/create`}>Create on Gotocourse</Link>
						</li>
						<li>
							<Link to={`/africa/train-to-work`}>Train to work</Link>
						</li>

						<li>
							<Link to={`/africa/women-in-tech`}>Women in tech</Link>
						</li>
					</>
				}


				{!value?.token && school && <>


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
				}
				{value?.token && school &&
					<>
						<li className="me-3 nav_link">
							<motion.span
								style={{
									cursor: "pointer"
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
					</>
				}


				{!value?.token && africa && <>


					<li>
						<button className="first__btn">
							<Link to={`/login`}>Sign in</Link>{" "}
						</button>
					</li>

					<li>
						<button className="second__btn">
							<Link to={`/signup`}>Register for free</Link>
						</button>
					</li>

				</>
				}
				{value?.token && africa &&
					<>
						<li className="me-3 nav_link">
							<motion.span
								style={{
									cursor: "pointer",
									color: "rgba(255, 255, 255)",
									border: "1px solid #Fff",
									borderRadius:"10px",
									padding: ".5rem 1rem"
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
					</>
				}
			</ul>

			<div className="empty" onClick={toggleSidebar}></div>
		</Side>
	);
};

export default SideBar;

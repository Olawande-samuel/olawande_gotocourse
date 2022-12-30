import styled from "styled-components";
import { Link } from "react-router-dom";
import { Logosm } from "../svg/svgs";
import { useState } from "react";

const Container = styled.div`
	width: 100%;
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	z-index: 1000;
	background: #8CBDFF;
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
	background: #8CBDFF;
	z-index: 1000;

	.navcontainer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0.5rem 1rem;
		// gap: 1rem;
		height: 100%;
		width: 100%;
		// border: 2px solid red;

		.hamburger {
			display: block;
		}

		.navbarlogo {
			flex: 0.6;
			// border: 2px solid yellow;
		}

		ul {
			// border: 2px solid green;
			flex: 0.4;
			list-style-type: none;
			display: none;
			align-items: center;
			justify-content: flex-end;
			font-family: "Raleway";
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			padding-left: unset;
			margin-bottom: unset;

			.firstitems {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				// border: 2px solid blue;
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

	
`;

const Navbar = ({ toggleSidebar }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};



	return (
		<Container>



			<NavContainer>
				<div className="navcontainer container">
					<div className="navbarlogo">
						<Link to={`/`}>
							<Logosm color="var(--theme-blue)" />
						</Link>
					</div>

					{/* <div className="hamburger align-items-center">
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
					</div> */}
				</div>
			</NavContainer>

		</Container>
	);
};

export default Navbar;

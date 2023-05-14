import { Link } from "react-router-dom";
import styled from "styled-components";

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
			border-radius: 12px;
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
	return (
		<Side showSidebar={showSidebar}>
			<ul>
				<div className="firstitems d-flex flex-column align-items-center justify-content-center gap-4">
					{/* <a href="" className="d-inline-flex"> */}
					<a href="https://create.gotocourse.com/create-with-gotocourse" target="_blank" rel="noreferrer">
						<button className="first__btn">Create with Gotocourse</button>
					</a>
					{/* </a> */}
					<Link to="/learn-on-gotocourse" className="d-inline-flex">
						<button className="second__btn">Learn on Gotocourse</button>
					</Link>
					<Link to="/qualifications">
						<button className="first__btn">Teach on Gotocourse </button>
					</Link>
				</div>
			</ul>

			<div className="empty" onClick={toggleSidebar}></div>
		</Side>
	);
};

export default SideBar;

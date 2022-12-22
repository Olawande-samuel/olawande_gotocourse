import { Link } from "react-router-dom";
import styled from "styled-components";
import join from "../../../images/landing/join.png";

const Container = styled.div`
	background: #162574;
	padding: 2rem 5rem;
	color: #fff;

	.joincontent {
		// border: 2px solid red;
		display: flex;
		gap: 2rem;
		justify-content: space-between;

		.joinleft {
			flex: 0.5;
			display: flex;
			flex-direction: column;
			gap: 2rem;

			h4 {
				font-family: "Raleway";
				font-style: normal;
				font-weight: 700;
				font-size: 30px;
				line-height: 32px;
				color: #fff;
			}

			p {
				font-family: "Raleway";
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				line-height: 30px;
				color: #fff;
				opacity: 0.8;
			}

			button {
				justify-items: flex-end;
				background: #fff;
				border: 2px solid white;
				border-radius: 7px;
				color: #0c2191;
				padding: 0.5rem 1rem;
				font-weight: 700;
				font-size: 14px;
				line-height: 27px;
				width: 200px;
			}
		}

		.joinright {
			flex: 0.5;
		}
	}

	@media (max-width: 768px) {
		padding: 2rem;
		text-align: center;

		.joincontent {
			flex-direction: column-reverse;

			.joinright {
				width: 100%;
				img {
					width: 100%;
					object-fit: cover;
				}
			}

			.joinleft {
				align-items: center;
			}
		}
	}
`;
const Join = () => {
	return (
		<Container>
			<div className="container">
				<div className="joincontent">
					<div className="joinleft">
						<div>
							<h4>Join our learning </h4>
							<h4>marketplace</h4>
							<p>
								Thinking of how to market your courses? <br />
								Market and sell your courses on Learn with Gotocourse
								Marketplace
							</p>
						</div>

						<Link to={`/school/signup`}>
							{" "}
							<button>Join for free</button>
						</Link>
					</div>

					<div className="joinright">
						<img src={join} alt="" width={400} />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Join;

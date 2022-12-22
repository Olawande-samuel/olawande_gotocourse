import styled from "styled-components";
import global from "../../../images/landing/global.svg";
import custom from "../../../images/landing/custom.svg";
import monetize from "../../../images/landing/monetize.svg";
import partners from "../../../images/landing/partners.svg";
import progress from "../../../images/landing/progress.svg";
import ease from "../../../images/landing/ease.svg";
import { Link } from "react-router-dom";

const Container = styled.div`
	padding: 2rem 1rem;
`;

const Middle = styled.div`
	display: flex;
	align-items: center;
	gap: 2rem;
	width: 100%;

	.middlecontentleft {
		flex: 0.4;
		color: var(--theme-blue);

		h4 {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 900;
			font-size: 26px;
			color: var(--theme-blue);
			// line-height: 36px;
		}

		p {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 400;
			font-size: 16.5px;
			line-height: 27px;
			color: #2a44cc;
		}

		button {
			border: 2px solid white;
			border-radius: 7px;
			background: var(--theme-blue);
			color: #fff;
			padding: 0.5rem 1rem;
			font-weight: 700;
			font-size: 14px;
			line-height: 27px;
		}
	}

	.middlecontentright {
		flex: 0.6;
		width: 100%;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;

		.miditem {
			background: #fafbff;
			border: 1px solid #f1f2f5;
			border-radius: 12px;
			padding: 2rem;
			text-align: center;

			img {
				width: 50px;
				height: 50px;
			}

			p {
				font-family: "Raleway";
				font-style: norma;
				font-weight: 600;
				font-size: 20px;
				line-height: 36px;
			}

			span {
				font-family: "Raleway";
				font-style: normal;
				font-weight: 400;
				font-size: 14px;
				line-height: 24px;
				color: #717580;
			}
		}
	}

	@media (max-width: 912px) {
		.middlecontentleft {
			width: 100%;
			img {
				width: 100%;
				// object-fit: cover;
			}
		}
	}

	@media (max-width: 768px) {
		flex-direction: column;
		text-align: center;

		.middlecontentleft {
			width: 100%;
			img {
				width: 100%;
				object-fit: cover;
			}
		}

		.middlecontentright {
			grid-template-columns: 1fr;
		}
	}
`;
const User = () => {
	return (
		<Container className="container">
			<Middle>
				<div className="middlecontentleft">
					<h4>Get started and grow</h4>

					<p>
						Gotocourse provides everything you <br /> need to power your start
						and scale.
					</p>

					<Link to={`/school/signup`}>
						<button>Start free trial</button>
					</Link>
				</div>

				<div className="middlecontentright">
					<div className="miditem">
						<img src={ease} alt="" />

						<div>
							<p>Onboard With Ease</p>
							<span>
								Effective onboarding process that creates the foundation that
								gives students the confidence that they can succeed at your
								training program.{" "}
							</span>
						</div>
					</div>

					<div className="miditem">
						<img src={progress} alt="" />

						<div>
							<p>Track Progress</p>
							<span>
								Track your process in real time to make informed business
								decisions.
							</span>
						</div>
					</div>

					<div className="miditem">
						<img src={partners} alt="" />

						<div>
							<p>Engage with learners</p>
							<span>
								Engage students to help with meaningful discussions to make
								improvements based on their needs.
							</span>
						</div>
					</div>

					<div className="miditem">
						<img src={monetize} alt="" />

						<div>
							<p>Monetize classes</p>
							<span>
								Get paid for your classes via our flexible payment system.{" "}
							</span>
						</div>
					</div>

					<div className="miditem">
						<img src={custom} alt="" />

						<div>
							<p>Custom Landing Page</p>
							<span>
								Fast, easy-to-navigate and responsive landing pages for smooth
								experience
							</span>
						</div>
					</div>

					<div className="miditem">
						<img src={global} alt="" />

						<div>
							<p>Global reach</p>
							<span>
								Reach an increasing number of learners worldwide, interested in
								your expertise.
							</span>
						</div>
					</div>
				</div>
			</Middle>
		</Container>
	);
};

export default User;

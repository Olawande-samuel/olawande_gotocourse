import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import heroimg from "../../../images/create/hero.png";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #0c1825;
	padding: 0.5rem 1rem;
	margin-top: 4rem;

	.heroleft {
		// border: 2px solid red;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 0.6;

		h1 {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 900;
			// font-size: clamp(2.8125rem, 2.25rem + 1.8vw, 3.0375rem);
			// font-size: clamp(2.8rem, 2.25rem + 1.8vw, 3.0rem);
			font-size: 2.4rem;

		}
		p {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 500;
			font-size: 16px;
			line-height: 22px;
			color: var(--theme-blue);
		}

		.email {
			display: flex;
			align-items: center;
			gap: 2rem;

			a {
				color: var(--theme-blue);
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
	}

	.heroright {
		flex: 0.4;
		width: 100%;
		// height: 500px;
		// padding: 2rem 0;
		text-align: center;

		img {
			// width: 100%;
			// height: 100%;
			// object-fit: contain;
		}
	}

	@media (max-width: 768px) {
		flex-direction: column-reverse;
		text-align: center;
		align-items: center;

		.heroleft {
			.email {
				flex-direction: column;
				gap: unset;
			}
		}

		.heroright {
			// width: 100%;
			// img {
			// 	width: 100%;
			// 	object-fit: cover;
			// }
		}
	}

	@media (max-width: 912px) {
		.heroleft {
			.email {
				gap: unset;
				justify-content: space-between;
			}
		}
		.heroright {
			// width: 100%;
			// height: 400px;
			// img {
			// 	width: 100%;
			// 	height: 100%;
			// 	// object-fit: cover;
			// }
		}
	}
`;
const Hero = () => {
	return (
		<Container className="container">
			<div className="heroleft">
				<div>
					<h1>
						<span> Educators and Institutions </span>
						<span className="d-block">of all sizes use Gotocourse</span>
					</h1>
				</div>
				<p>
					Transform your knowledge into
					<br />
					profitable online course and go global.
				</p>

				<div className="email">
					<Link to={`/school/signup`}>
						{" "}
						<button>Start for free</button>
					</Link>
					<Link to={`/`}>
						Watch demo <BiRightArrowAlt />
					</Link>
				</div>
			</div>

			<div className="heroright">
				<img
					src={heroimg}
					alt=""
					// width={400}
					// height={200}
				/>
			</div>
		</Container>
	);
};

export default Hero;

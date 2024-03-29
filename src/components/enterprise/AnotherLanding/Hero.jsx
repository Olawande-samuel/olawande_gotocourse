import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import styled from "styled-components";
import heroimg from "../../../images/landing/heroight.png";

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: #0c1825;
	padding: 0.5rem 1rem;
	margin-top: 7rem;
	// border: 2px solid green;

	.heroleft {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		flex: 0.5;

		h1 {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 900;
			// font-size: clamp(2.8125rem, 2.25rem + 1.8vw, 3.0375rem);
			// font-size: clamp(2.25rem, 2.1429rem + .5357vw, 3rem);
			font-size: 2.4rem;
		}
		ul {
			font-family: "Raleway";
			font-style: normal;
			font-weight: 500;
			// font-size: 18px;
			// line-height: 27px;
			font-size: 16px;
			line-height: 22px;
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
				a {
					color: #fff;
				}
			}
		}
	}

	.heroright {
		flex: 0.5;
		width: 100%;
		// border: 2px solid yellow;
		text-align: center;

		img {
			max-width: 100%;
			max-height: 400px;
		}
	}

	@media (max-width: 768px) {
		flex-direction: column-reverse;
		text-align: center;

		.heroleft {
			.email {
				flex-direction: column;
				gap: unset;
			}
		}

		.heroright {
			width: 100%;
		}
	}

	@media (max-width: 912px) {
		.heroleft {
			.email {
				gap: unset;
				justify-content: space-between;
			}
		}
	}
`;
const Hero = () => {
	return (
		<Container className="container">
			<div className="heroleft">
				<div>
					<h1>
						<span>All-in-one platform to </span>
						<span className="d-block">build virtual schools</span>
					</h1>
				</div>
				<ul>
					<li>Create everything tech and business skills training.</li>
					<li>
						Build your training space the way you want
						<br />
						for who you want everywhere
					</li>
				</ul>

				<div className="email">
					<Link to={`/school/signup`}>
						<button> Create free account</button>
					</Link>
					<Link to={`/`}>
						Request demo <BiRightArrowAlt />
					</Link>
				</div>

				<p> No credit card required.</p>
			</div>

			<div className="heroright">
				<img src={heroimg} alt="" />
			</div>
		</Container>
	);
};

export default Hero;

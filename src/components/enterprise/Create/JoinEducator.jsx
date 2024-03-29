import { Link } from "react-router-dom";
import styled from "styled-components";
import confetti from "../../../images/create/flower.png";

const Container = styled.div`
	background: url(${confetti});
	background-repeat: no-repeat;
	background-size: cover;
	padding: 5rem 1rem;
	text-align: center;

	div {
		h5 {
			text-align: center;
			color: #0c2191;
			font-family: "Raleway";
			font-style: normal;
			font-weight: 800;
			font-size: 36px;
			// line-height: 48px;
		}
	}

	button {
		margin: 2rem 0;
		justify-items: flex-end;
		background: #0c2191;
		border-radius: 8px;
		border: 2px solid white;
		color: #fff;
		padding: 0.5rem 1rem;
		font-weight: 400;
		font-size: 14px;
		line-height: 27px;
		// width: 300px ;
	}

	@media (max-width: 768px) {
		padding: 2rem;
	}
`;

const JoinEducator = () => {
	return (
		<Container className="container">
			<div>
				<h5>Join 10,000+ educators</h5>
				<h5>creating better experiences</h5>
			</div>

			<Link to={`/school/signup`}>
				<button>Sign up for free</button>
			</Link>
		</Container>
	);
};

export default JoinEducator;

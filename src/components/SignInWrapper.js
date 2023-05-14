import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../images/Logo.png";
import { BiArrowBack } from "react-icons/bi";
import { Logo as ImageLogo, Logosm } from "../images/components/svgs";
import { ToastContainer } from "react-toastify";

const SignInWrapper = ({ image, children }) => {
	const navigate = useNavigate();
	return (
		<section className="signWrapper">
			<div className="back">
				<div
					onClick={() => {
						navigate("/learn-on-gotocourse");
					}}
				>
					<i>
						<BiArrowBack style={{ fontSize: "30px" }} color="#ffffff" />
					</i>
				</div>
			</div>
			<div className="signWrapper_background">
				<div className="signWrapper_logo_container">
					<h1>Welcome to</h1>
					<div className="signWrapper_logo">
						<Link to="/">
							<div className="signWrapper_logo_text text-center text-white">
								<h1>
									GO<span>2</span>COURSE
								</h1>
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div>
				<div
					style={{
						display: "grid",
						placeItems: "center",
						width: "min(100% - .5rem, 600px)",
						height: "100%",
						margin: "auto",
					}}
				>
					<header className="signWrapper_header">
						<Link to="/">
							<div className="signWrapper_logo_text text-center text-white">
								<h1>
									GO<span>2</span>COURSE
								</h1>
							</div>
						</Link>
					</header>
					<main className="mt-4">{children}</main>
				</div>
			</div>
		</section>
	);
};

export default SignInWrapper;

import React, { useMemo } from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useIntercom } from "react-use-intercom";
import { useAuth } from "../../contexts/Auth";
import { Center, HomeComponent } from "./landing.style";
import Navbar from "./Navbar";
import SideBar from "./Sidebar";
import Helmet from "react-helmet";

const NewHome = ({ mixpanel }) => {
	const {
		generalState: { showLandingSidebar },
		generalState,
		setGeneralState,
	} = useAuth();

	const toggleSidebar = () => {
		setGeneralState({
			...generalState,
			showLandingSidebar: !showLandingSidebar,
		});
	};

	const location = useLocation();

	useMemo(
		() =>
			mixpanel.track("new landing page visit", { location: location.pathname }),
		[]
	);

	const { shutdown } = useIntercom();

	useEffect(() => {
		shutdown();
	});

	return (
		<>
			<Helmet>
				<title>Gotocourse</title>
				<meta property="og:url" content="https://gotocourse.com" />
				<meta property="og:site_name" content="Gotocourse" />
				<meta name="description" content="Gotocourse is a platform for learning in-demand tech and business skills and enables you to create virtual learning school" />
			</Helmet>
			<HomeComponent>
				<Navbar toggleSidebar={toggleSidebar} />
				<SideBar
					showSidebar={showLandingSidebar}
					toggleSidebar={toggleSidebar}
				/>
				<Center>
					<div className="d-flex flex-column align-items-center">
						<h1>
							Build your virtual school here
							<span className="d-block">and learners start</span>
							<span className="d-block">from here</span>
						</h1>
					</div>
					<p>
						Gotocourse helps to create, manage, market and learn tech and
						business skills online
					</p>
					<div className="d-flex gap-3 mt-4">
						<a href="https://create.gotocourse.com/create-with-gotocourse" target="_blank" rel="noreferrer">
							<button>I'm a school creator</button>
						</a>
						<Link to="/learn-on-gotocourse">
							<button>I'm a Learner</button>
						</Link>
						<Link to="/qualifications">
							<button>I'm an Independent Teacher </button>
						</Link>
					</div>
				</Center>
			</HomeComponent>
		</>
	);
};

export default NewHome;

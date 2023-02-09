import React from "react";
import { Navigate } from "react-router-dom";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, isClicked: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div className="d-flex flex-column align-items-center justify-content-center">
					{/* <h1 className='text-white' onClick={()=> this.isClicked}>Something went wrong.</h1> */}
					<Navigate to="/learn-on-gotocourse" replace={true} />
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;

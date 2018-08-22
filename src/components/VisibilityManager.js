import { Component } from "react";

import { pageVisibilityApi } from "../pageVisibilityUtils";

const { hidden, visibilityChange } = pageVisibilityApi();

class VisibilityManager extends Component {
	state = {
		isVisible: true
	};

	componentDidMount() {
		document.addEventListener(visibilityChange, this.handleVisibilityChange, false);

		document.addEventListener("focus", this.forceVisibilityTrue, false);
		document.addEventListener("blur", this.forceVisibilityFalse, false);

		window.addEventListener("focus", this.forceVisibilityTrue, false);
		window.addEventListener("blur", this.forceVisibilityFalse, false);
	}

	handleVisibilityChange = forcedFlag => {
		// this part handles when it's triggered by the focus and blur events
		if (typeof forcedFlag === "boolean") {
			if (forcedFlag) {
				return this.setVisibility(true);
			}
			return this.setVisibility(false);
		}

		// this part handles when it's triggered by the page visibility change events
		if (document[hidden]) {
			return this.setVisibility(false);
		}
		return this.setVisibility(true);
	};

	forceVisibilityTrue = () => {
		this.handleVisibilityChange(true);
	};

	forceVisibilityFalse = () => {
		this.handleVisibilityChange(false);
	};

	setVisibility = flag => {
		this.setState(prevState => {
			if (prevState.isVisible === flag) return null;
			return { isVisible: flag };
		});
	};

	componentWillUnmount() {
		document.removeEventListener(visibilityChange, this.handleVisibilityChange, false);

		document.removeEventListener("focus", this.forceVisibilityTrue, false);
		document.removeEventListener("blur", this.forceVisibilityFalse, false);

		window.removeEventListener("focus", this.forceVisibilityTrue, false);
		window.removeEventListener("blur", this.forceVisibilityFalse, false);
	}

	render() {
		return this.props.children(this.state.isVisible);
	}
}

export default VisibilityManager;

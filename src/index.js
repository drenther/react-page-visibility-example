import React from "react";
import ReactDOM from "react-dom";

import VisiblityManager from "./components/VisibilityManager";
import Video from "./components/Video";

const App = () => (
	<VisiblityManager>
		{isVisible => <Video active={isVisible} src="https://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_30mb.mp4" />}
	</VisiblityManager>
);

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

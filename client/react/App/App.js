import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";

class AppClass extends React.Component {
	render() {
		return (
			<div id="app-container">
				<div id="top-title-container">
					<div id="top-title">Crowe Character</div>
					<div id="right-account">
						Your Id: SuperStud32 <button>Login to Save</button>
					</div>
				</div>
				<div id="main-container">
					<div id="top-nav-container">
						<div id="top-opaque"></div>
						<div id="page-title">New Character</div>
					</div>
				</div>
			</div>
		);
	}
}

AppClass.propTypes = {
};

const App = connect(
	state => state,
	dispatch => { return {}},
)(AppClass);

render(<Provider store={store}><App/></Provider>, document.getElementById('react'));

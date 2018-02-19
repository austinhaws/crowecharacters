import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";
import NewCharacter from "../NewCharacter/NewCharacter";
import shared from "./Shared";

shared.functions.appStartup();

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
					<NewCharacter {...this.props}/>
				</div>
				<div id="credit-footer">
					<div>Icons made by <a href="https://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
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

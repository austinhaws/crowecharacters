import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";

class AppClass extends React.Component {
	render() {
		return <div>Hello React World!</div>
	}
}
AppClass.propTypes = {
};

const App = connect(
	state => state,
	dispatch => { return {}},
)(AppClass);

render(<Provider store={store}><App/></Provider>, document.getElementById('react'));

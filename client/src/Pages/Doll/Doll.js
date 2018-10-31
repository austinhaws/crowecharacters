import React from "react";
import {history} from "../../Common/Routes";
import {Route, Switch} from "react-router-dom";
import Home from "../Home/Home";
import {Router} from "react-router";
import DollEdit from "./DollEdit";

const propTypes = {};
const defaultProps = {};

export default class Doll extends React.Component {

	render() {
		return (
			<Router history={history}>
				<Switch>
					<Route path="/doll/edit/:dollGuid" component={DollEdit}/>
					<Route path="/doll/new/:imageSetGuid" component={DollEdit}/>
					<Route component={Home}/>
				</Switch>
			</Router>
		);
	}
}

Doll.propTypes = propTypes;
Doll.defaultProps = defaultProps;

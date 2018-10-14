import React from "react";
import {Route, Router, Switch} from "react-router";
import TestWebservice from "./TestWebservice";
import {history} from "../../Common/Routes";

const propTypes = {};

const defaultProps = {};

export default class Test extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router history={history}>
					<Switch>
						<Route path="/test/webservice" component={TestWebservice}/>
						<Route render={() => <div>Unknown test route</div>}/>
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

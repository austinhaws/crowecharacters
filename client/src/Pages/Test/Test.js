import React from "react";
import {Route, Switch} from "react-router";
import TestWebservice from "./TestWebservice";

const propTypes = {};

const defaultProps = {};

export default class Test extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/test/webservice" component={TestWebservice}/>
					<Route render={() => <div>Unknown test route</div>}/>
				</Switch>
			</React.Fragment>
		);
	}
}

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

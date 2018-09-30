import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router";
import TestWebservice from "./TestWebservice";

const propTypes = {
	history: PropTypes.object.isRequired,
};

const defaultProps = {
};

export default class Test extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/test/webservice" render={() => <TestWebservice {...this.props}/>}/>
				</Switch>
			</React.Fragment>
		);
	}
}

Test.propTypes = propTypes;
Test.defaultProps = defaultProps;

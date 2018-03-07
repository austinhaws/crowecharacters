import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router";
import AdminImageList from "./AdminImageList";
import AdminImageNew from "./AdminImageNew";

export default class Admin extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/admin/image/new" render={() => <AdminImageNew {...this.props}/>}/>
					<Route render={() => <AdminImageList {...this.props}/>}/>
				</Switch>
			</React.Fragment>
		);
	}
}

Admin.propTypes = {
	history: PropTypes.object.isRequired,
};

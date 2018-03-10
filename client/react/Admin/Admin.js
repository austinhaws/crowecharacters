import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route, Switch} from "react-router";
import AdminImageList from "./AdminImageList";
import AdminImageNew from "./AdminImageNew";
import AdminBodyEdit from "./AdminBodyEdit";

export default class Admin extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/admin/body/edit/:bodyGuid/:imageGuid" render={props => <AdminBodyEdit {...this.props} bodyGuid={props.match.params.bodyGuid} imageGuid={props.match.params.imageGuid}/>}/>
					<Route path="/admin/image/new/:guid" render={props => <AdminImageNew {...this.props} bodyGuid={props.match.params.guid}/>}/>
					<Route path="/admin/image/list" render={() => <AdminImageList {...this.props}/>}/>
					<Route render={() => <Redirect to="/admin/image/list"/>}/>
				</Switch>
			</React.Fragment>
		);
	}
}

Admin.propTypes = {
	history: PropTypes.object.isRequired,
};

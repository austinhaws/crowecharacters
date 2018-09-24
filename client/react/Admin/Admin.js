import React from "react";
import PropTypes from "prop-types";
import {Redirect, Route, Switch} from "react-router";
import AdminImageNew from "./AdminImageNew";
import AdminBodyEdit from "./AdminBodyEdit";
import AdminBodyList from "./AdminBodyList";
import AdminBodyNew from "./AdminBodyNew";

const propTypes = {
	history: PropTypes.object.isRequired,
};

const defaultProps = {
};

export default class Admin extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Switch>
					<Route path="/admin/body/edit/:bodyGuid/:imageGuid" render={props => <AdminBodyEdit {...this.props} bodyGuid={props.match.params.bodyGuid} imageGuid={props.match.params.imageGuid}/>}/>
					<Route path="/admin/body/edit/:bodyGuid" render={props => <AdminBodyEdit {...this.props} bodyGuid={props.match.params.bodyGuid}/>}/>
					<Route path="/admin/image/new/:guid" render={props => <AdminImageNew {...this.props} bodyGuid={props.match.params.guid}/>}/>
					<Route path="/admin/body/list" render={() => <AdminBodyList {...this.props}/>}/>
					<Route path="/admin/body/new" render={() => <AdminBodyNew {...this.props}/>}/>
					<Route render={() => <Redirect to="/admin/body/list"/>}/>
				</Switch>
			</React.Fragment>
		);
	}
}

Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

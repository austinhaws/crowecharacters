import React from "react";
import {Route, Router, Switch} from "react-router";
import AdminHome from "./AdminHome";
import ImageSetList from "../ImageSet/ImageSetList";
import ImageSetEdit from "../ImageSet/ImageSetEdit";
import PropTypes from "prop-types";
import {history} from "../../Common/Routes";

const propTypes = {
	location: PropTypes.object.isRequired,
};
const defaultProps = {};

export default class Admin extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Router history={history}>
					<Switch>
						<Route path="/admin/imageSet/list" component={ImageSetList}/>

						<Route path="/admin/imageSet/edit/:guid" component={ImageSetEdit}/>
						<Route path="/admin/imageSet/edit" component={ImageSetEdit}/>

						<Route component={AdminHome}/>
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

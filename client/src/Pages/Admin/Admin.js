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
						{/*<Route path="/admin/body/edit/:bodyGuid/:imageGuid" render={props => <AdminBodyEditDEAD {...this.props} bodyGuid={props.match.params.bodyGuid} imageGuid={props.match.params.imageGuid}/>}/>*/}
						{/*<Route path="/admin/body/edit/:bodyGuid" render={props => <AdminBodyEditDEAD {...this.props} bodyGuid={props.match.params.bodyGuid}/>}/>*/}
						{/*<Route path="/admin/image/new/:guid" render={props => <AdminImageNewDEAD {...this.props} bodyGuid={props.match.params.guid}/>}/>*/}
						{/*<Route path="/admin/body/list" render={() => <AdminBodyListDEAD {...this.props}/>}/>*/}
						{/*<Route path="/admin/body/new" render={() => <AdminBodyNewDEAD {...this.props}/>}/>*/}
						<Route path="/admin/imageSet/edit/:guid" component={ImageSetEdit}/>
						<Route path="/admin/imageSet/list" component={ImageSetList}/>
						<Route component={AdminHome}/>
					</Switch>
				</Router>
			</React.Fragment>
		);
	}
}

Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

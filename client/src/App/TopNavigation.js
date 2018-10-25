import React from "react";
import PropTypes from "prop-types";
import routes from "../Common/Routes";
import Button from "dts-react-common/components/form/button/Button";
import roles from "../Common/Roles";

const propTypes = {
	pageTitle: PropTypes.string.isRequired,
	backUrl: PropTypes.string,
	canGoBack: PropTypes.bool,
};

const defaultProps = {
	canGoBack: false,
	backUrl: undefined,
};

export default class TopNavigation extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div className="top-nav-container">
					<div className="top-nav-container__top-opaque"/>
					<div className="top-nav-container__page-title">
						<div className="top-nav-container__page-title__menu">
							<Button onClick={routes.home} label="Home" className="top-nav-container__page-title__menu__menu-item"/>
							{roles.hasRole(roles.roles.ADMIN) ? <Button onClick={routes.admin.home} label="Admin" className="top-nav-container__page-title__menu__menu-item"/> : undefined}
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

TopNavigation.propTypes = propTypes;
TopNavigation.defaultProps = defaultProps;


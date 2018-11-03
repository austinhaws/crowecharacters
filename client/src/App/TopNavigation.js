import React from "react";
import PropTypes from "prop-types";
import routes from "../Common/Routes";
import Button from "dts-react-common/components/form/button/Button";
import roles from "../Common/Roles";
import {ajaxStatusCore} from "../Common/Webservice";

const propTypes = {
	pageTitle: PropTypes.string.isRequired,
	backUrl: PropTypes.string,
	canGoBack: PropTypes.bool,
};

const defaultProps = {
	canGoBack: false,
	backUrl: undefined,
};

const AJAX_STATUSES = {
	RUNNING: 'RUNNING',
	ENDED: 'ENDED',
	QUIET: 'QUIET',
};
const AJAX_STATUSES_TEXT = {
	RUNNING: 'Saving...',
	ENDED: 'Saved',
	QUIET: '',
};

export default class TopNavigation extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			ajaxStatus: AJAX_STATUSES.QUIET,
		};

		this.ajaxStatusChange = this.ajaxStatusChange.bind(this);

		this.timeout = undefined;

		this.callbackId = ajaxStatusCore.registerChangedCallback(this.ajaxStatusChange);
	}

	componentWillUnmount() {
		ajaxStatusCore.unregisterChangedCallback(this.callbackId);
	}

	ajaxStatusChange(ajaxId, isAjaxingStarting) {
		this.timeout && clearTimeout(this.timeout);

		let newStatus;
		if (isAjaxingStarting || this.state.ajaxStatus !== AJAX_STATUSES.QUIET) {
			newStatus = isAjaxingStarting ? AJAX_STATUSES.RUNNING : AJAX_STATUSES.ENDED;
		} else {
			// happens when app first loads and fetches data
			newStatus = AJAX_STATUSES.QUIET;
		}
		this.setState({ ajaxStatus: newStatus });

		// after ended, remove message after a while
		if (newStatus === AJAX_STATUSES.ENDED) {
			this.timeout = setTimeout(() => this.setState({ ajaxStatus: AJAX_STATUSES.QUIET }), 2000);
		}
	}

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
						<div className="top-nav-container__page-title__right">
							<div className="top-nav-container__page-title__right__status">{AJAX_STATUSES_TEXT[this.state.ajaxStatus]}</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

TopNavigation.propTypes = propTypes;
TopNavigation.defaultProps = defaultProps;


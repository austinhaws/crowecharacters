import React from "react";
import PropTypes from "prop-types";
import shared from "./Shared";

export default class TopNavigation extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div id="top-nav-container">
					<div id="top-opaque"/>
					<div id="page-title">
						{this.props.backUrl ? <div className="top-nav-back-arrow" onClick={() => this.props.history.push(this.props.backUrl)}>{shared.images.backArrow()}</div> : undefined}
						<div className="top-nav-title">{this.props.pageTitle}</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

TopNavigation.propTypes = {
	pageTitle: PropTypes.string.isRequired,
	backUrl: PropTypes.string,
	history: PropTypes.object,
};


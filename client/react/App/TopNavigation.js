import React from "react";
import PropTypes from "prop-types";

export default class TopNavigation extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div id="top-nav-container">
					<div id="top-opaque"></div>
					<div id="page-title">
						{this.props.pageTitle}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

TopNavigation.propTypes = {
	pageTitle: PropTypes.string.isRequired,
};


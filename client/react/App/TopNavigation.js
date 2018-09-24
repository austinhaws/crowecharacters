import React from "react";
import PropTypes from "prop-types";
import images from "../Common/Images";

const propTypes = {
	pageTitle: PropTypes.string.isRequired,
	backUrl: PropTypes.string,
	history: PropTypes.object,
	canGoBack: PropTypes.bool,
};

const defaultProps = {
	canGoBack: false,
	history: undefined,
	backUrl: undefined,
};

export default class TopNavigation extends React.Component {

	render() {
		return (
			<React.Fragment>
				<div id="top-nav-container">
					<div id="top-opaque"/>
					<div id="page-title">
						{(this.props.backUrl || this.props.canGoBack) ?
							<div className="top-nav-back-arrow" onClick={() => this.props.canGoBack ? this.props.history.goBack() : this.props.history.push(this.props.backUrl)}>{images.backArrow()}</div>
							: undefined}
						<div className="top-nav-title">{this.props.pageTitle}</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

TopNavigation.propTypes = propTypes;
TopNavigation.defaultProps = defaultProps;


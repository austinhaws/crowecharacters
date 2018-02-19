import React from "react";
import PropTypes from "prop-types";

export default class LeftPanel extends React.Component {
	render() {
		return (
			<div className="left-panel">
				<div className="opaque-background"></div>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

LeftPanel.propTypes = {
	children: PropTypes.any.isRequired,
};

import React from "react";
import PropTypes from "prop-types";

export default class MainPanel extends React.Component {
	render() {
		return (
			<div className="main-panel">
				{this.props.children}
			</div>
		);
	}
}

MainPanel.propTypes = {
	children: PropTypes.any.isRequired,
};

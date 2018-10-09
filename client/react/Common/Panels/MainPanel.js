import React from "react";
import PropTypes from "prop-types";

const propTypes = {
	children: PropTypes.any,
};
const defaultProps = {};

export default class MainPanel extends React.Component {
	render() {
		return (
			<div className="main-panel">
				{this.props.children}
			</div>
		);
	}
}

MainPanel.propTypes = propTypes;
MainPanel.defaultProps = defaultProps;

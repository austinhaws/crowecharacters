import React from "react";
import PropTypes from "prop-types";
import {joinClassNames} from "dts-react-common";

const propTypes = {
	children: PropTypes.any.isRequired,
	className: PropTypes.string,
};

const defaultProps = {
	className: undefined,
};

export default class LeftPanel extends React.Component {
	render() {
		return (
			<div className={joinClassNames('left-panel',  this.props.className)}>
				<div className="opaque-background"></div>
				<div className="content">
					{this.props.children}
				</div>
			</div>
		);
	}
}

LeftPanel.propTypes = propTypes;
LeftPanel.defaultProps = defaultProps;

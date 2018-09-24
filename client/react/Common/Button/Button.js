import React from "react";
import PropTypes from "prop-types";

const propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	isNotOpaque: PropTypes.bool,
};
const defaultProps = {};

export default class Button extends React.Component {
	render() {
		return (
			<div className="button-container">
				{this.props.isNotOpaque ? undefined : <div className="opaque-background"/>}
				<button
					className={this.props.className}
					onClick={this.props.onClick}
					disabled={this.props.disabled}
				>
					{this.props.title}
				</button>
			</div>
		);
	}
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;


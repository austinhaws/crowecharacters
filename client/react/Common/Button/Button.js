import React from "react";
import PropTypes from "prop-types";
import joinClasses from "../../App/Shared"

export default class Button extends React.Component {
	render() {
		return (
			<div className="button-container">
				{this.props.isNotOpaque ? undefined : <div className="opaque-background"/>}
				<button
					className={joinClasses.functions.joinClasses(this.props.className)}
					onClick={this.props.onClick}
					disabled={this.props.disabled}
				>
					{this.props.title}
				</button>
			</div>
		);
	}
}

Button.propTypes = {
	title: PropTypes.string.isRequired,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	isNotOpaque: PropTypes.bool,
};


import React from "react";
import PropTypes from "prop-types";
import shared from "../App/Shared";

export default class ToggleButton extends React.Component {
	render() {
		return (
			<div className="toggle-button" onClick={shared.functions.handleEvent(this.props.onToggle, false)}>
				<div className="toggle-box">{shared.images.roundBox()}</div>
				{(this.props.selected) ? <div className="toggle-check">{shared.images.checkMark()}</div> : undefined}
			</div>
		);
	}
}

ToggleButton.propTypes = {
	selected: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
};


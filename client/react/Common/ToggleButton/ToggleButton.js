import React from "react";
import PropTypes from "prop-types";
import images from "../../Common/Images";
import {handleEvent} from "dts-react-common";

const propTypes = {
	selected: PropTypes.bool.isRequired,
	onToggle: PropTypes.func.isRequired,
};
const defaultProps = {};

export default class ToggleButton extends React.Component {
	render() {
		return (
			<div className="toggle-button" onClick={handleEvent(this.props.onToggle, false)}>
				<div className="toggle-box">{images.roundBox()}</div>
				{(this.props.selected) ? <div className="toggle-check">{images.checkMark()}</div> : undefined}
			</div>
		);
	}
}

ToggleButton.propTypes = propTypes;
ToggleButton.defaultProps = defaultProps;

import React from "react";
import PropTypes from "prop-types";
import ToggleButton from "../ToggleButton/ToggleButton";

const propTypes = {
	// which image to show
	image: PropTypes.object.isRequired,

	// is this row selected
	selected: PropTypes.bool.isRequired,

	// called when the toggle button is clicked
	onToggle: PropTypes.func.isRequired,

	// called when the image row has been clicked: image => {}
	onSelect: PropTypes.func,

	children: PropTypes.any.isRequired,
};
const defaultProps = {};

export default class ImageToggleRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImages: undefined,
		};
	}

	render() {
		return (
			<div className="image-row">
				<ToggleButton selected={this.props.selected} onToggle={() => this.props.onToggle(this.props.image)}/>
				<div className="image-name">{this.props.children}</div>
			</div>
		);
	}
}

ImageToggleRow.propTypes = propTypes;
ImageToggleRow.defaultProps = defaultProps;

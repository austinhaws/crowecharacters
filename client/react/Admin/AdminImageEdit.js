import React from "react";
import PropTypes from "prop-types";

export default class AdminImageEdit extends React.Component {
	render() {
		return (
			<div>Show some things to edit</div>
		);
	}
}

AdminImageEdit.propTypes = {
	// image to edit
	image: PropTypes.object.isRequired,
	// which body the image belongs to
	body: PropTypes.object.isRequired,
};


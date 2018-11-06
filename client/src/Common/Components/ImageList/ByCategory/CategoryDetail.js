import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const propTypes = {
	category: PropTypes.object.isRequired,
	imagesInCategory: PropTypes.array.isRequired,
	selectedImageGuids: PropTypes.array.isRequired,

	// === events ===
	// called with image when image's add button is pressed
	onImageAdd: PropTypes.func.isRequired,
	// image selected to preview on the slider before it's added
	onImageTest: PropTypes.func.isRequired,
};
const defaultProps = {};

class CategoryDetail extends React.Component {
	render() {
		return (
			<div>
				show slider with ticks for each image; can then click and slide to see options; starts at "none"
				show name of item when picked in slider as hover over slider
				show add button to right of slider to actually add the image to the doll
			</div>
		);
	}
}

CategoryDetail.propTypes = propTypes;
CategoryDetail.defaultProps = defaultProps;

export default connect(state => {
	return {
		imageCategories: state.globalData.imageCategories,
	};
})(CategoryDetail);

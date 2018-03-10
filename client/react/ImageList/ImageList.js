import React from "react";
import PropTypes from "prop-types";
import ImageToggleRow from "./ImageToggleRow";
import clone from "clone";
import _ from "lodash";

export default class ImageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImages: [],
		};
	}

	toggleImage(image) {
		const newSelectedImages = clone(this.state.selectedImages);
		if (newSelectedImages.includes(image.guid)) {
			_.pull(newSelectedImages, image.guid);
		} else {
			newSelectedImages.push(image.guid);
		}
		this.setState({selectedImages: newSelectedImages});
		this.props.selectedChanged(newSelectedImages);
	}

	render() {
		return (
			<div className="images-list">
				{this.props.images.map(image => <ImageToggleRow key={image.guid} image={image} selected={this.state.selectedImages.includes(image.guid)} onToggle={this.toggleImage.bind(this)}/>)}
			</div>
		);
	}
}

ImageList.propTypes = {
	// the images to show
	images: PropTypes.array.isRequired,
	// which images are selected have changed
	selectedChanged: PropTypes.func.isRequired,
};


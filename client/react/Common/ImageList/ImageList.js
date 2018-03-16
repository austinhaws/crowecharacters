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
			editImage: undefined,
		};
	}

	selectImage(image) {
		this.setState({editImage: image.guid});
		// if editing an image, also show it
		if (!this.state.selectedImages.includes(image.guid)) {
			this.toggleImage(image);
		}
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
				{this.props.imageFiles.map(image =>
					<React.Fragment key={`imagetogglerow-${image.guid}`}>
						<ImageToggleRow
							image={image}
							selected={this.state.selectedImages.includes(image.guid)}
							onToggle={this.toggleImage.bind(this)}
							onSelect={this.selectImage.bind(this)}
						/>
						{
							(this.props.renderSelectedDetail && this.state.editImage === image.guid) ?
								<div className="image-list-detail">
									{this.props.renderSelectedDetail(image)}
								</div>
							: undefined
						}
					</React.Fragment>
				)}
			</div>
		);
	}
}

ImageList.propTypes = {
	// the images to show
	imageFiles: PropTypes.array.isRequired,
	// which images are selected have changed
	selectedChanged: PropTypes.func.isRequired,
	// which component to show for the detail editing of an image
	renderSelectedDetail: PropTypes.func,
};


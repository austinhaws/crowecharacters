import React from "react";
import PropTypes from "prop-types";
import ImageToggleRow from "./ImageToggleRow";
import clone from "clone";
import _ from "lodash";
import {handleEvent} from "dts-react-common";

const propTypes = {
	// the images to show
	imageFiles: PropTypes.array.isRequired,
	// which images are currently selected
	selectedImages: PropTypes.array.isRequired,

	// which images are selected have changed
	selectedChanged: PropTypes.func.isRequired,
	// which component to show for the detail editing of an image
	renderSelectedDetail: PropTypes.func,
	onDrop: PropTypes.func,
};

const defaultProps = {
	renderSelectedDetail: undefined,
	onDrop: undefined,
};

export default class ImageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			editImage: undefined,
		};
	}

	selectImage(image) {
		if (this.props.renderSelectedDetail) {
			this.setState({editImage: image.guid});
			// if editing an image, also show it
			if (!this.props.selectedImages.includes(image.guid)) {
				this.toggleImage(image);
			}
		} else {
			this.toggleImage(image);
		}
	}

	toggleImage(image) {
		const newSelectedImages = clone(this.props.selectedImages);
		if (newSelectedImages.includes(image.guid)) {
			_.pull(newSelectedImages, image.guid);
		} else {
			newSelectedImages.push(image.guid);
		}
		this.props.selectedChanged(newSelectedImages);
	}

	render() {
		return (
			<div
				className="images-list"
				onDrop={this.props.onDrop}
				onDragOver={handleEvent(() => {})}
			>
				{this.props.imageFiles.map(image => (
					<React.Fragment key={`imagetogglerow-${image.guid}`}>
						<ImageToggleRow
							image={image}
							selected={this.props.selectedImages.includes(image.guid)}
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
				))}
			</div>
		);
	}
}

ImageList.propTypes = propTypes;
ImageList.defaultProps = defaultProps;

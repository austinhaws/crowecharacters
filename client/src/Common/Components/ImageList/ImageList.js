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
	// content to show when editing the inline list item
	renderEditableDetail: PropTypes.func,
	onDrop: PropTypes.func,
};

const defaultProps = {
	onDrop: undefined,
	renderEditableDetail: undefined,
};

export default class ImageList extends React.Component {
	constructor(props) {
		super(props);

		this.filesDrop = this.filesDrop.bind(this);

		this.state = {
			// which image detail in the list is being edited
			editableDetailImageGuid: undefined,
		};
	}

	selectImage(image) {
		// check if items have a editable list item
		if (this.props.renderEditableDetail) {
			this.setState({ editableDetailImageGuid: image.guid });
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

	filesDrop(event) {
		event.preventDefault();
		event.stopPropagation();

		let files = [];

		if (event.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (let i = 0; i < event.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (event.dataTransfer.items[i].kind === 'file') {
					files.push(event.dataTransfer.items[i].getAsFile());
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (let i = 0; i < event.dataTransfer.files.length; i++) {
				files.push(event.dataTransfer.files[i].name);
			}
		}

		this.props.onDrop && this.props.onDrop(files);
	}

	render() {
		return (
			<div
				className="images-list"
				onDrop={this.props.onDrop ? this.filesDrop : undefined}
				onDragOver={handleEvent(() => {})}
			>
				{this.props.imageFiles.map(image => (
					<React.Fragment key={`imagetogglerow-${image.guid}`}>
						<ImageToggleRow
							image={image}
							selected={this.props.selectedImages.includes(image.guid)}
							onToggle={this.toggleImage.bind(this)}
							onSelect={this.selectImage.bind(this)}
						>
							{
								this.state.editableDetailImageGuid === image.guid ? (
									<div className="image-list-detail">
										{this.props.renderEditableDetail(image)}
									</div>
								): image.pretty_name
							}
						</ImageToggleRow>
					</React.Fragment>
				))}
			</div>
		);
	}
}

ImageList.propTypes = propTypes;
ImageList.defaultProps = defaultProps;

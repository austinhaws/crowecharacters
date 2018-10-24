import React from "react";
import PropTypes from "prop-types";
import {handleEvent} from "dts-react-common";

const propTypes = {
	// the images to show
	imageFiles: PropTypes.array.isRequired,

	// which images are currently selected
	selectedImages: PropTypes.array.isRequired,

	// files dropped on image list
	onDrop: PropTypes.func,

	// content to show for the image
	renderImageName: PropTypes.func.isRequired,
};

const defaultProps = {
	onDrop: undefined,
};

export default class ImageList extends React.Component {
	constructor(props) {
		super(props);

		this.filesDrop = this.filesDrop.bind(this);
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
				{this.props.imageFiles.map((image, imageIdx) => (
					<React.Fragment key={`imagetogglerow-${image.guid}`}>
						<div className="image-row">
							{this.props.renderImageName(image, imageIdx)}
						</div>
					</React.Fragment>
				))}
			</div>
		);
	}
}

ImageList.propTypes = propTypes;
ImageList.defaultProps = defaultProps;

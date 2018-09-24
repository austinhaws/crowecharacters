import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import MainPanel from "../Panels/MainPanel";
import BodyView from "../BodyView/BodyView";
import PropTypes from "prop-types";
import ImageList from "../Common/ImageList/ImageList";
import _ from "lodash";
import Slider from 'react-rangeslider';
import {handleEvent} from "dts-react-common";
import webservice from "../Common/Webservice";

const propTypes = {
	// body to edit
	bodyGuid: PropTypes.string.isRequired,

	// image to edit on the body (used if uploaded image and want to edit that image)
	imageGuide: PropTypes.string,

	// bodies to show
	bodies: PropTypes.array,

	history: PropTypes.object.isRequired,

	files: PropTypes.array.isRequired,
};

const defaultProps = {

};

export default class AdminBodyEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImages: [],
		};
		this.editingImage = undefined;
		this.imagesDropped = this.imagesDropped.bind(this);
	}

	renderSelectedDetail(imageFile) {
		// this is a render function so can't set state directly here
		if (!this.editingImage || this.editingImage.guid !== imageFile.guid) {
			this.editingImage = imageFile;
		}
		const body = this.props.bodies ? this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0] : undefined;
		const bodyImage = body ? body.data.images.find(bodyImage => bodyImage.fileGuid === imageFile.guid) : undefined;
		return (
			<div className="image-edit-detail-row">
				Z-Index: <Slider
					value={bodyImage.zIndex || 0}
					min={0}
					max={500}
					step={10}
					onChange={value => {
						this.editingImage.zIndex = value;
						bodyImage.zIndex = value;
						this.setState(this.state);
						webservice.body.save(body);
					}}
				/>
			</div>
		);
	}

	deleteSelectedImage() {
		if (this.state.selectedImages.length && confirm('Are you sure you want to delete all currently check marked images?')) {
			const body = this.props.bodies ? this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0] : undefined;
			if (body) {
				body.data.images = body.data.images.filter(image => !this.state.selectedImages.includes(image.fileGuid));
				webservice.body.save(body);
			}
		}
	}

	imagesDropped(event) {
		if (event.dataTransfer.items) {
			// Use DataTransferItemList interface to access the file(s)
			for (let i = 0; i < event.dataTransfer.items.length; i++) {
				// If dropped items aren't files, reject them
				if (event.dataTransfer.items[i].kind === 'file') {
					let file = event.dataTransfer.items[i].getAsFile();
					console.log('... file[' + i + '].name = ' + file.name);
				}
			}
		} else {
			// Use DataTransfer interface to access the file(s)
			for (let i = 0; i < event.dataTransfer.files.length; i++) {
				console.log('... file[' + i + '].name = ' + event.dataTransfer.files[i].name);
			}
		}
	}

	uploadFile(file) {
		webservice.file.upload(file, 'article')
			.then(fileGuid => {
				const body = this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0];
				if (!body.data.images) {
					body.data.images = [];
				}
				body.data.images.push({fileGuid: fileGuid, zIndex: 100, freeFloat: false});
				return webservice.body.save(body).then(() => fileGuid);
			})
			.then(fileGuid => webservice.file.all().then(fileGuid))
			.then(fileGuid => webservice.body.all(() => this.props.history.push(`/admin/body/edit/${this.props.bodyGuid}/${fileGuid}`)));

	}

	render() {
		const body = this.props.bodies ? this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0] : undefined;
		const fileImages = body ? body.data.images.map(image => this.props.files.filter(file => file.guid === image.fileGuid)[0]) : [];

		return (
			<React.Fragment>
				<TopNavigation
					pageTitle={`Admin - Body: ${body ? body.data.name : ''}`}
					backUrl="/admin"
					history={this.props.history}
				/>

				<LeftPanel>
					<ImageList
						imageFiles={fileImages}
						selectedChanged={newSelection => this.setState({selectedImages: newSelection})}
						selectedImages={this.state.selectedImages}
						renderSelectedDetail={this.renderSelectedDetail.bind(this)}
						onDrop={handleEvent(this.imagesDropped, this)}
					/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!_.size(this.state.selectedImages)} onClick={this.deleteSelectedImage.bind(this)}>-</button>
						Can drag and drop files here
						<button className="midget plusButton" disabled={this.state.bodyGuid} onClick={() => this.props.history.push(`/admin/image/new/${this.props.bodyGuid}`)}>+</button>
					</div>
				</LeftPanel>

				<MainPanel>
					<BodyView
						bodyGuid={this.props.bodyGuid}
						fileImages={fileImages.filter(image => this.state.selectedImages.includes(image.guid))}
					/>
				</MainPanel>

			</React.Fragment>
		);
	}
}

AdminBodyEdit.propTypes = propTypes;
AdminBodyEdit.defaultProps = defaultProps;


import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import MainPanel from "../Panels/MainPanel";
import BodyView from "../BodyView/BodyView";
import PropTypes from "prop-types";
import ImageList from "../Common/ImageList/ImageList";
import _ from "lodash";
import shared from "../App/Shared";

export default class AdminBodyEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImages: [],
		};
		this.editingImage = undefined;
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
				Z-Index: <input
					type="text"
					value={bodyImage.zIndex || ''}
					name="image-z-index"
					onChange={e => {
						this.editingImage.zIndex = e.target.value;
						bodyImage.zIndex = e.target.value;
						this.setState(this.state);
						shared.ajax.body.save(body);
					}}
				/>
			</div>
		);
	}

	render() {
		const body = this.props.bodies ? this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0] : undefined;
		const fileImages = body ? body.data.images.map(image => this.props.files.filter(file => file.guid === image.fileGuid)[0]) : [];

		return (
			<React.Fragment>
				<TopNavigation pageTitle={`Admin - Body: ${body ? body.data.name : ''}`}/>

				<LeftPanel>
					<ImageList
						imageFiles={fileImages}
						selectedChanged={newSelection => this.setState({selectedImages: newSelection})}
						selectedImages={this.state.selectedImages}
						renderSelectedDetail={this.renderSelectedDetail.bind(this)}
					/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!_.size(this.state.selectedImages)} onClick={() => console.log('minus button')}>-</button>
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

AdminBodyEdit.propTypes = {
	// body to edit
	bodyGuid: PropTypes.string.isRequired,
	// image to edit on the body (used if uploaded image and want to edit that image)
	imageGuide: PropTypes.string,
};


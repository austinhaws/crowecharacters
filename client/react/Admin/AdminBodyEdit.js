import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import MainPanel from "../Panels/MainPanel";
import BodyView from "../BodyView/BodyView";
import PropTypes from "prop-types";
import ImageList from "../ImageList/ImageList";

export default class AdminBodyEdit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedImages: [],
			imageDetails: {},
		};
	}

	renderSelectedDetail(image) {
		return (
			<div className="image-edit-detail-row">
				Z-Index: <input type="text" value="put something here" name="image-z-index"/>
			</div>
		);
	}

	render() {
		const body = this.props.bodies ? this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0] : undefined;
		const images = body ? body.data.images.map(imageGuid => this.props.files.filter(file => file.guid === imageGuid)[0]) : [];

		return (
			<React.Fragment>
				<TopNavigation pageTitle={`Admin - Body: ${body ? body.data.name : ''}`}/>

				<LeftPanel>
					<ImageList
						images={images}
						selectedChanged={newSelection => this.setState({selectedImages: newSelection})}
						renderSelectedDetail={this.renderSelectedDetail.bind(this)}
					/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!_.size(this.state.selectedImages)} onClick={() => console.log('minus button')}>-</button>
						<button className="midget plusButton" disabled={!this.state.bodyGuid} onClick={() => this.props.history.push(`/admin/image/new/${this.state.bodyGuid}`)}>+</button>
					</div>
				</LeftPanel>

				<MainPanel>
					<BodyView
						bodyGuid={this.props.bodyGuid}
						images={images.filter(image => this.state.selectedImages.includes(image.guid))}
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


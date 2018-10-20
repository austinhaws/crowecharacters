import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import webservice from "../../Common/Webservice";
import {dispatchFieldChanged} from "../../App/Reducers";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {delayedInput, TextInput} from "dts-react-common";
import ImageList from "../../Common/Components/ImageList/ImageList";
import {defaultState} from "../../App/Store";

const propTypes = {
	globalData: PropTypes.object.isRequired,
	match: PropTypes.object,
	imageSetEdit: PropTypes.object.isRequired,
};
const defaultProps = {
	match: undefined,
};

const DelayedTextInput = delayedInput(TextInput);

class ImageSetEdit extends React.Component {
	constructor(props) {
		super(props);

		this.imageSetEditFieldChange = this.imageSetEditFieldChange.bind(this);
		this.uploadFiles = this.uploadFiles.bind(this);
		this.reloadImageSet = this.reloadImageSet.bind(this);

		this.state = {
			selectedImages: [],
		};
	}

	componentWillReceiveProps(props) {
		if (props.match) {
			if (!props.imageSetEdit || props.match.params.guid !== props.imageSetEdit.guid) {
				this.reloadImageSet(props.match.params.guid);
			}
		} else {
			dispatchFieldChanged(undefined, 'imageSetEdit', defaultState.imageSetEdit);
		}
	}

	reloadImageSet(imageSetGuid) {
		webservice.imageSet.get(imageSetGuid)
			.then(imageSet => dispatchFieldChanged(undefined, 'imageSetEdit', imageSet));
	}

	imageSetEditFieldChange(field, value) {
		const saveData = Object.assign({}, this.props.imageSetEdit, { [field]: value });
		delete saveData.images;
		webservice.imageSet.save(saveData);

		dispatchFieldChanged('imageSetEdit', field, value);
	}

	uploadFiles(files) {
		files.forEach(file =>
			webservice.image.upload(file)
				.then(image => webservice.image.tieToImageSet(image.guid, this.props.imageSetEdit.guid))
				// reload to get new images list (easier than adding image to existing list) and makes sure it gets same information
				.then(() => this.reloadImageSet(this.props.imageSetEdit.guid))
		);
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle={`ImageSet - ${this.props.imageSetEdit.name}`} backUrl="/admin"/>
				<LeftPanel>
					<DelayedTextInput label="Name" field="name" onChange={this.imageSetEditFieldChange} showLabel={false} value={this.props.imageSetEdit.name}/>
					<ImageList
						imageFiles={this.props.imageSetEdit.images}
						selectedImages={this.state.selectedImages}
						selectedChanged={console.log}
						onDrop={this.uploadFiles}
					/>
				</LeftPanel>
				<MainPanel>
					show the image set images stacked in to the shown image
				</MainPanel>
			</React.Fragment>
		);
	}
}

ImageSetEdit.propTypes = propTypes;
ImageSetEdit.defaultProps = defaultProps;

export default connect(state => { return {
	imageSetEdit: state.imageSetEdit,
	globalData: state.globalData,
}; })(ImageSetEdit);

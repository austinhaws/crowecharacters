import React from "react";
import PropTypes from "prop-types";
import {dispatchField} from "../../App/Reducers";
import webservice from "../../Common/Webservice";
import {connect} from "react-redux";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";

const propTypes = {
	editDoll: PropTypes.object.isRequired,
};
const defaultProps = {};

class DollEdit extends React.Component {
	constructor(props) {
		super(props);

		this.checkChangedDoll(props);
	}

	componentWillReceiveProps(props) {
		this.checkChangedDoll(props);
	}

	checkChangedDoll(props) {
		// edit doll or new doll
		if (!props.editDoll.doll) {
			dispatchField('editDoll.doll', {});

		// - new doll: imageSetGuid
		} else if (props.match.params.imageSetGuid) {
			if (props.editDoll.doll.guid) {
				// a doll is in the store with a guid, so it must be old data
				dispatchField('editDoll.doll', { imageSetGuid: props.match.params.imageSetGuid });

			} else if (props.editDoll.doll.imageSetGuid !== props.match.params.imageSetGuid) {
				// set imageset so page loads
				dispatchField('editDoll.doll.imageSetGuid', props.match.params.imageSetGuid);
			}

			// check image set needs loaded
			if (!props.editDoll.imageSet || props.editDoll.imageSet.guid !== props.match.params.imageSetGuid) {
				webservice.imageSet.get(props.match.params.imageSetGuid).then(imageSet => dispatchField('editDoll.imageSet', imageSet));
				dispatchField('editDoll.imageSet', { guid: props.match.params.imageSetGuid });
			}

		// - edit doll: dollGuid
		} else if (props.match.params.dollGuid && props.editDoll.doll.guid !== props.match.params.dollGuid) {
			// clear any existing doll information and load from server
			dispatchField('editDoll.doll', { guid: props.match.params.dollGuid });
			webservice.doll.get(props.match.params.dollGuid).then(doll => dispatchField('editDoll.doll', doll));
		}
	}

	// changeSelectedImages(selectedImages) {
		// update redux
		// dispatchField('editDoll.doll.data.images', clone(selectedImages));
		//
		// // ajax save
		// const saveDoll = clone(this.props.editDoll.doll);
		// savedollService.data.images = clone(selectedImages);
		// webservice.doll.update(savedollService);
	// }

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle={(this.props.editDoll.doll && this.props.editDoll.doll.guid) ? 'Edit Character' : 'New Character'} />
				<LeftPanel>show images here</LeftPanel>
				<MainPanel>
					put your character here {(this.props.editDoll.doll && this.props.editDoll.doll.name) || 'no name here'}
				</MainPanel>
			</React.Fragment>
		);
	}
}

export default connect(state => {return { editDoll: state.editDoll }})(DollEdit);

DollEdit.propTypes = propTypes;
DollEdit.defaultProps = defaultProps;


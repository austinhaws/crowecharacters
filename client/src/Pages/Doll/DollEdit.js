import React from "react";
import PropTypes from "prop-types";
import {dispatchField, dispatchFieldCurry} from "../../App/Reducers";
import webservice from "../../Common/Webservice";
import {connect} from "react-redux";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import delayedInput from "dts-react-common/components/higher-order/DelayedInput";
import TextInput from "dts-react-common/components/form/text-input/TextInput";
import routes from "../../Common/Routes";
import ImageListByCategory from "../../Common/Components/ImageList/ByCategory/ImageListByCategory";

const propTypes = {
	editDoll: PropTypes.object.isRequired,
	account: PropTypes.object,
	match: PropTypes.object,
};
const defaultProps = {
	account: undefined,
	match: undefined,
};
const mapStateToProps = state => {return {
	editDoll: state.editDoll,
	account: state.account,
}};

const DelayedTextInput = delayedInput(TextInput);

class DollEdit extends React.Component {
	constructor(props) {
		super(props);

		this.fieldChange = this.fieldChange.bind(this);

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
				dispatchField('editDoll.doll', { image_set_guid: props.match.params.imageSetGuid });

			} else if (props.editDoll.doll.image_set_guid !== props.match.params.imageSetGuid) {
				// set imageset so page loads
				dispatchField('editDoll.doll.image_set_guid', props.match.params.imageSetGuid);
			}

			// check image set needs loaded
			if (!props.editDoll.imageSet || props.editDoll.imageSet.guid !== props.match.params.imageSetGuid) {
				dispatchField('editDoll.imageSet', { guid: props.match.params.imageSetGuid });
				webservice.imageSet.get(props.match.params.imageSetGuid)
					.then(dispatchFieldCurry('editDoll.imageSet'))
					.then(() => webservice.doll.all(props.account.guid))
					.then(dispatchFieldCurry('accountDolls'));
			}

		// - edit doll: dollGuid
		} else if (props.match.params.dollGuid && props.editDoll.doll.guid !== props.match.params.dollGuid) {
			// clear any existing doll information and load from server
			dispatchField('editDoll.doll', { guid: props.match.params.dollGuid });
			webservice.doll.get(props.match.params.dollGuid)
				.then(doll => {
					dispatchField('editDoll.doll', doll);
					return doll;
				})
				.then(doll => webservice.imageSet.get(doll.image_set_guid).then(dispatchFieldCurry('editDoll.imageSet')));
		}
	}

	fieldChange(field, value) {
		// go to edit page so that 'new' url doesn't cause the doll to be reset to just the imagesetid; since it's saved it's now an edit
		webservice.doll.save(this.props.account.guid, Object.assign(this.props.editDoll.doll, { name: value }))
			.then(doll => this.props.match.params.imageSetGuid ? routes.doll.edit(doll.guid) : dispatchField('editDoll.doll', doll));
	}

	render() {
		return (!this.props.editDoll.doll ? '' :
			<React.Fragment>
				<TopNavigation pageTitle={(this.props.editDoll.doll && this.props.editDoll.doll.guid) ? 'Edit Character' : 'New Character'} />
				<LeftPanel>
					<DelayedTextInput label="Name" field="name" onChange={this.fieldChange} showLabel={false} value={this.props.editDoll.doll.name ? this.props.editDoll.doll.name : ''}/>
					<ImageListByCategory
						images={this.props.editDoll.imageSet ? this.props.editDoll.imageSet.images : []}
						selectedImages={[]}
						selectedChanged={console.log}
					/>
				</LeftPanel>
				<MainPanel>
					put your character here {(this.props.editDoll.doll && this.props.editDoll.doll.name) || 'no name here'}
				</MainPanel>
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps)(DollEdit);

DollEdit.propTypes = propTypes;
DollEdit.defaultProps = defaultProps;

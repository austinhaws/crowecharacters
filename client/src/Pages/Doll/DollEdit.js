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
import Button from "dts-react-common/components/form/button/Button";
import BodyView from "../BodyView/BodyView";
import {defaultState, dispatchDefaultState} from "../../App/Store";

const propTypes = {
	editDoll: PropTypes.object.isRequired,
	globalData: PropTypes.object.isRequired,
	account: PropTypes.object,
	match: PropTypes.object,
	categoryDetailTestImageGuid: PropTypes.string,
};
const defaultProps = {
	account: undefined,
	match: undefined,
	categoryDetailTestImageGuid: undefined,
};
const mapStateToProps = state => {return {
	editDoll: state.editDoll,
	account: state.account,
	globalData: state.globalData,
	categoryDetailTestImageGuid: state.categoryDetailTestImageGuid,
}};

const DelayedTextInput = delayedInput(TextInput);

class DollEdit extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			testImageGuid: undefined,
		};

		this.fieldChange = this.fieldChange.bind(this);
		this.onImageAdd = this.onImageAdd.bind(this);
		this.onImageRemove = this.onImageRemove.bind(this);

		this.checkChangedDoll(props);
	}

	componentWillReceiveProps(props) {
		this.checkChangedDoll(props);
	}

	componentWillUnmount() {
		dispatchDefaultState('editDoll.doll');
	}

	checkChangedDoll(props) {
		// edit doll or new doll
		if (!props.editDoll.doll) {
			dispatchField('editDoll.doll', {});

		// - new doll: imageSetGuid
		} else if (props.match.params.imageSetGuid) {
			// keep track of current doll since dispatching doesn't update props just yet and doll may be saved later
			let useDoll = this.props.editDoll.doll;
			if (props.editDoll.doll.image_set_guid !== props.match.params.imageSetGuid) {
				useDoll = Object.assign({}, defaultState.editDoll.doll, { image_set_guid: props.match.params.imageSetGuid });
				dispatchField('editDoll.doll', useDoll);
			}

			// check image set needs loaded
			if (!props.editDoll.imageSet || props.editDoll.imageSet.guid !== props.match.params.imageSetGuid) {
				dispatchField('editDoll.imageSet', { guid: props.match.params.imageSetGuid });
				webservice.imageSet.get(props.match.params.imageSetGuid)
					.then(imageSet => {
						// if there are no images selected on the doll
						if (!useDoll.imageGuids) {
							// find all bodies in the imageset and give doll the first body
							const imageGuid = imageSet.images.filter(image => image.image_category_guid === 'body')[0].guid;
							webservice.doll.save(this.props.account.guid, useDoll)
								.then(doll => {
									webservice.doll.addImage(doll.guid, imageGuid);
									dispatchField('editDoll.doll', Object.assign(doll, { imageGuids: [imageGuid] }));
								});
						}
						return imageSet;
					})
					.then(dispatchFieldCurry('editDoll.imageSet'))
					.then(() => props.account &&
						webservice.doll.all(props.account.guid)
							.then(dispatchFieldCurry('accountDolls')));
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
		dispatchField(`editDoll.doll.${field}`, value);

		// go to edit page so that 'new' url doesn't cause the doll to be reset to just the imagesetid; since it's saved it's now an edit
		webservice.doll.save(this.props.account.guid, Object.assign(this.props.editDoll.doll, { name: value }))
			// is new doll but now has a guid so go to edit
			.then(doll => this.props.match.params.imageSetGuid && routes.doll.edit(doll.guid));
	}

	onImageAdd(image) {
		const doll = _.clone(this.props.editDoll.doll);
		doll.imageGuids.push(image.guid);
		dispatchField('editDoll.doll', doll);
		webservice.doll.addImage(doll.guid, image.guid);
	}

	onImageRemove(image) {
		const doll = _.clone(this.props.editDoll.doll);
		_.remove(doll.imageGuids, guid => guid === image.guid);
		dispatchField('editDoll.doll', doll);
		webservice.doll.removeImage(doll.guid, image.guid);
	}

	render() {
		const displayImages =
			this.props.editDoll &&
			this.props.editDoll.doll &&
			this.props.editDoll.doll.imageGuids &&
			this.props.editDoll.imageSet &&
			this.props.editDoll.imageSet.images &&
			this.props.editDoll.imageSet.images.filter(image =>
				image.guid === this.state.testImageGuid || this.props.editDoll.doll.imageGuids.includes(image.guid)
			);
		const displayImagesWithTest = (displayImages || []).concat(this.props.categoryDetailTestImageGuid ? this.props.editDoll.imageSet.images.filter(image => image.guid === this.props.categoryDetailTestImageGuid) : []);
		return (!this.props.editDoll.doll ? '' :
			<React.Fragment>
				<TopNavigation pageTitle={(this.props.editDoll.doll && this.props.editDoll.doll.guid) ? 'Edit Character' : 'New Character'} />
				<LeftPanel>
					<DelayedTextInput label="Name" field="name" onChange={this.fieldChange} showLabel={false} value={this.props.editDoll.doll.name ? this.props.editDoll.doll.name : ''}/>
					<ImageListByCategory
						images={(this.props.editDoll.imageSet && this.props.editDoll.imageSet.images) ? this.props.editDoll.imageSet.images : []}
						selectedImageGuids={displayImages ? displayImages.map(image => image.guid) : []}
						onImageAdd={image => this.onImageAdd(image)}
						onImageRemove={image => this.onImageRemove(image)}
					/>
				</LeftPanel>
				<MainPanel>
					{displayImagesWithTest ?
						<React.Fragment>
							<BodyView fileImages={displayImagesWithTest}/>
							<div className="bottom-buttons-container body-bottom">
								<Button
									label="Print"
									className="print-button"
									onClick={() => routes.character.print(this.props.editDoll.doll.guid)}
								/>
							</div>
						</React.Fragment>
						: undefined}

				</MainPanel>
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps)(DollEdit);

DollEdit.propTypes = propTypes;
DollEdit.defaultProps = defaultProps;

import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import webservice from "../../Common/Webservice";
import {dispatchFieldChanged} from "../../App/Reducers";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button, delayedInput, InputInformation, SelectInput, TextInput} from "dts-react-common";
import ImageList from "../../Common/Components/ImageList/ImageList";
import {defaultState} from "../../App/Store";
import _ from "lodash";
import BodyView from "../BodyView/BodyView";
import ConfirmationButton from "dts-react-common/components/form/confirmation-button/ConfirmationButton";
import ToggleButton from "../../Common/Components/ToggleButton/ToggleButton";

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
		this.renderEditableImage = this.renderEditableImage.bind(this);
		this.onDeleteImage = this.onDeleteImage.bind(this);
		this.onMoveUpDown = this.onMoveUpDown.bind(this);
		this.onImageCategoryChange = this.onImageCategoryChange.bind(this);
		this.toggleImage = this.toggleImage.bind(this);

		this.state = {
			selectedImageGuids: [],
			categoryOptions: [],
			// track which image's name is being edited
			editingImageGuid: undefined,
		};

		webservice.dataList.imageCategories()
			.then(categories => this.setState({ categoryOptions: categories.map(category => {return { value: category.guid, label: category.name };})}));

		this.checkPropsChange(props);
	}

	componentWillReceiveProps(props) {
		this.checkPropsChange(props);
	}

	checkPropsChange(props) {
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
		const imagesLength = this.props.imageSetEdit.images ? this.props.imageSetEdit.images.length : 0;
		files.forEach((file, fileIdx) =>
			webservice.image.upload(file)
				.then(image => webservice.image.tieToImageSet(image.guid, this.props.imageSetEdit.guid, imagesLength + fileIdx))
				// reload to get new images list (easier than adding image to existing list) and makes sure it gets same information
				.then(() => this.reloadImageSet(this.props.imageSetEdit.guid))
		);
	}

	toggleImage(image) {
		const newSelectedImages = this.state.selectedImageGuids.concat([]);
		if (newSelectedImages.includes(image.guid)) {
			_.pull(newSelectedImages, image.guid);
		} else {
			newSelectedImages.push(image.guid);
		}

		this.setState({ selectedImageGuids: newSelectedImages });
	}


	// allow editing the selected image's name and other details
	renderEditableImage(image, imageIdx) {
		return (
			<React.Fragment>
				<div className="image-row__row">
					<ToggleButton
						selected={this.state.selectedImageGuids.includes(image.guid)}
						onToggle={() => this.toggleImage(image)}
					/>
					<div className="image-row__image-name">
						{
							image.guid === this.state.editingImageGuid ?
								<DelayedTextInput
									field="selectedImageName"
									label="name"
									showLabel={false}
									value={image.pretty_name}
									onChange={(field, value) => {
										// find image in list to get its index
										const idx = _.findIndex(this.props.imageSetEdit.images, imageSetImage => imageSetImage.guid === image.guid);
										// dispatch to change that image's name
										dispatchFieldChanged(`imageSetEdit.images.${idx}`, 'pretty_name', value);

										// save to server
										image.pretty_name = value;
										webservice.image.save(image);
									}}
									setInitialFocus={true}
									onBlur={() => this.setState({ editingImageGuid: undefined })}
								/> : (
									<div className="images-list__image-detail">
										<div onClick={() => this.setState({ editingImageGuid: image.guid})}>
											{image.pretty_name}
										</div>
										<div>
											<ConfirmationButton
												onConfirm={() => this.onDeleteImage(image)}
												initialChildren={null}
												initialLabel="X"
												promptLabel="Delete"
												className="size-xsmall button"
											/>
										</div>
									</div>
								)

						}
					</div>
				</div>
				<div className="image-row__row">
					<div className="image-row__up-downs">
						{imageIdx === this.props.imageSetEdit.images.length - 1 ? undefined : <Button className="button size-xxxsmall" onClick={() => this.onMoveUpDown(image, false)} label="Z-Down"/>}
						{imageIdx === 0 ? undefined : <Button className="button size-xxxsmall" onClick={() => this.onMoveUpDown(image, true)} label="Z-Up"/>}
					</div>
					<SelectInput
						field="category"
						label="Category"
						showLabel={false}
						onChange={(field, value) => this.onImageCategoryChange(image, value)}
						options={this.state.categoryOptions}
						value={image.image_category_guid}
						size={InputInformation.SIZE.XSMALL}
						placeholder="Category..."
					/>
				</div>
			</React.Fragment>
		);
	}

	onDeleteImage(image) {
		webservice.image.delete(image.guid)
			.then(() => {
				// remove image from the list
				const idx = _.findIndex(this.props.imageSetEdit.images, imageSetImage => imageSetImage.guid === image.guid);
				this.props.imageSetEdit.images.splice(idx, 1);
				dispatchFieldChanged('imageSetEdit', 'images', this.props.imageSetEdit.images);
			});
	}

	onImageCategoryChange(image, categoryGuid) {
		webservice.image.tieToCategory(image.guid, categoryGuid);

		const imageIdx = _.findIndex(this.props.imageSetEdit.images, imageSetImage => imageSetImage.guid === image.guid);
		dispatchFieldChanged(`imageSetEdit.images.${imageIdx}`, 'image_category_guid', categoryGuid);
	}

	onMoveUpDown(image, moveUp) {
		const imageIdx = _.findIndex(this.props.imageSetEdit.images, imageSetImage => imageSetImage.guid === image.guid);
		let otherImageIdx = moveUp ? imageIdx - 1 : imageIdx + 1;

		const temp = this.props.imageSetEdit.images[imageIdx].z_index;
		this.props.imageSetEdit.images[imageIdx].z_index = this.props.imageSetEdit.images[otherImageIdx].z_index;
		this.props.imageSetEdit.images[otherImageIdx].z_index = temp;

		const image1 = this.props.imageSetEdit.images[imageIdx];
		const image2 = this.props.imageSetEdit.images[otherImageIdx];
		this.props.imageSetEdit.images.splice(imageIdx, 1, image2);
		this.props.imageSetEdit.images.splice(otherImageIdx, 1, image1);

		dispatchFieldChanged('imageSetEdit', 'images', this.props.imageSetEdit.images);

		webservice.imageSetXImage.save(this.props.imageSetEdit.images[imageIdx].guid, this.props.imageSetEdit.images[imageIdx].z_index);
		webservice.imageSetXImage.save(this.props.imageSetEdit.images[otherImageIdx].guid, this.props.imageSetEdit.images[otherImageIdx].z_index);
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle={`ImageSet - ${this.props.imageSetEdit.name}`} backUrl="/admin"/>
				<LeftPanel>
					<DelayedTextInput label="Name" field="name" onChange={this.imageSetEditFieldChange} showLabel={false} value={this.props.imageSetEdit.name}/>
					<ImageList
						imageFiles={this.props.imageSetEdit.images}
						selectedImages={this.state.selectedImageGuids}
						selectedChanged={this.selectedChanged}
						renderImageName={this.renderEditableImage}
						onDrop={this.uploadFiles}
				/>
				</LeftPanel>
				<MainPanel>
					<BodyView fileImages={this.props.imageSetEdit.images.filter(image => this.state.selectedImageGuids.includes(image.guid))}/>
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

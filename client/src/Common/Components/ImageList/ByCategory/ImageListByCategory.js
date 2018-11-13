import React from "react";
import PropTypes from "prop-types";
import webservice from "../../../Webservice";
import {dispatchField, dispatchFieldCurry} from "../../../../App/Reducers";
import {connect} from "react-redux";
import Category from "./Category";

const propTypes = {
	// the images to show
	images: PropTypes.array.isRequired,

	// which images are currently selected
	selectedImageGuids: PropTypes.array.isRequired,

	// user selected to add image
	onImageAdd: PropTypes.func.isRequired,

	// === From Store === //
	globalData: PropTypes.object.isRequired,
};

const defaultProps = {};

const mapStateToProps = state => {
	return {
		globalData: state.globalData,
	};
};

class ImageListByCategory extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedCategoryGuid: undefined,
		};

		this.categorySelect = this.categorySelect.bind(this);

		webservice.dataList.imageCategories().then(dispatchFieldCurry('globalData.imageCategories'));
	}

	categorySelect(category) {
		this.setState({
			selectedCategoryGuid: category.guid === this.state.selectedCategoryGuid ? undefined : category.guid,
		});
		dispatchField('categoryDetailTestImageGuid', undefined);
	}

	render() {
		// get categories for the images
		return (
			<div className="images-by-category-list">
				{this.props.globalData.imageCategories ?
					this.props.globalData.imageCategories.map(category => {
						const imagesInCategory = this.props.images.filter(image => image.image_category_guid === category.guid);
						return (
							imagesInCategory.length === 0 ? undefined : (
							<Category
								key={category.guid}
								categoryGuid={category.guid}
								imagesInCategory={imagesInCategory}
								selectedImageGuids={this.props.selectedImageGuids}
								onCategorySelect={this.categorySelect}
								isSelected={category.guid === this.state.selectedCategoryGuid}
								onImageAdd={this.props.onImageAdd}
								onImageRemove={this.props.onImageRemove}
							/>
						));
					}).filter(category => category)
					: undefined
				}
			</div>
		);
	}
}

ImageListByCategory.propTypes = propTypes;
ImageListByCategory.defaultProps = defaultProps;

export default connect(mapStateToProps)(ImageListByCategory);

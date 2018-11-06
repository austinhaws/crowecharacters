import React from "react";
import PropTypes from "prop-types";
import webservice from "../../../Webservice";
import {dispatchFieldCurry} from "../../../../App/Reducers";
import {connect} from "react-redux";
import Category from "./Category";

const propTypes = {
	// the images to show
	images: PropTypes.array.isRequired,

	// which images are currently selected
	selectedImages: PropTypes.array.isRequired,

	// user selected to add image
	onImageAdd: PropTypes.func.isRequired,
	// user hovering on slider on an image
	onImageTest: PropTypes.func.isRequired,

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

		this.imageTest = this.imageTest.bind(this);
		this.imageAdd = this.imageAdd.bind(this);

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
	}

	imageAdd(image) {
		console.log('image add', image);
	}

	imageTest(image) {
		console.log('image test', image);
	}

	render() {
		// get categories for the images
		return (
			<div className="images-by-category-list">
				{this.props.globalData.imageCategories ?
					this.props.globalData.imageCategories.map(category => (
						<Category
							key={category.guid}
							categoryGuid={category.guid}
							imagesInCategory={this.props.images.filter(image => image.image_category_guid === category.guid)}
							selectedImageGuids={[]}
							onCategorySelect={this.categorySelect}
							isSelected={category.guid === this.state.selectedCategoryGuid}
							onImageAdd={this.props.onImageAdd}
							onImageTest={this.props.onImageTest}
						/>
					))
					: undefined
				}
			</div>
		);
	}
}

ImageListByCategory.propTypes = propTypes;
ImageListByCategory.defaultProps = defaultProps;

export default connect(mapStateToProps)(ImageListByCategory);

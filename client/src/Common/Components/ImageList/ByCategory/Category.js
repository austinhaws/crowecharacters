import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _ from "lodash";
import {joinClassNames} from "dts-react-common";
import CategoryDetail from "./CategoryDetail";

const propTypes = {
	categoryGuid: PropTypes.string.isRequired,
	imagesInCategory: PropTypes.array.isRequired,
	selectedImageGuids: PropTypes.array.isRequired,
	isSelected: PropTypes.bool.isRequired,

	// form store
	imageCategories: PropTypes.array,

	// === events ===
	// category was selected: category => { }
	onCategorySelect: PropTypes.func.isRequired,
	onImageAdd: PropTypes.func.isRequired,
	// image selected to preview on the slider before it's added
	onImageTest: PropTypes.func.isRequired,
};

const defaultProps = {
	imageCategories: undefined,
};

class Category extends React.Component {
	render() {
		const category = _.find(this.props.imageCategories, category => category.guid === this.props.categoryGuid);
		return (
			<div
				className={joinClassNames('category', this.props.isSelected && 'selected')}
				onClick={() => this.props.onCategorySelect(category)}
			>
				{category ? <img src={`/img/categories/${category.image_file}`} title={category.name}/> : undefined}
				{this.props.isSelected ?
					<React.Fragment>
						<CategoryDetail
							category={category}
							selectedImageGuids={this.props.selectedImageGuids}
							imagesInCategory={this.props.imagesInCategory}
							onImageTest={this.props.onImageTest}
							onImageAdd={this.props.onImageAdd}
						/>
						<div className="category__selected-iamges">
							show all the currently selected images for this category
						</div>
					</React.Fragment>
					: undefined}
			</div>
		);
	}
}

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;

export default connect(state => {
	return {
		imageCategories: state.globalData.imageCategories,
	};
})(Category);
